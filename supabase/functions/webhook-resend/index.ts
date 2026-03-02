import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Webhook } from "https://esm.sh/svix@1.15.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature, webhook-id, webhook-timestamp, webhook-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Event type definitions
// ---------------------------------------------------------------------------

interface ResendWebhookPayload {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
    click?: {
      link: string;
      timestamp: string;
    };
    [key: string]: unknown;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function cancelActiveEnrollments(
  supabase: ReturnType<typeof createClient>,
  contactId: string
): Promise<void> {
  await supabase
    .from("contact_flow_enrollments")
    .update({
      status: "cancelled",
      next_action_at: null,
    })
    .eq("contact_id", contactId)
    .eq("status", "active");
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const webhookSecret = Deno.env.get("RESEND_WEBHOOK_SECRET");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rawBody = await req.text();

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      const svixId =
        req.headers.get("svix-id") || req.headers.get("webhook-id") || "";
      const svixTimestamp =
        req.headers.get("svix-timestamp") ||
        req.headers.get("webhook-timestamp") ||
        "";
      const svixSignature =
        req.headers.get("svix-signature") ||
        req.headers.get("webhook-signature") ||
        "";

      const wh = new Webhook(webhookSecret);

      try {
        wh.verify(rawBody, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        });
      } catch (verifyError) {
        console.error("Webhook signature verification failed:", verifyError);
        return new Response(
          JSON.stringify({ error: "Invalid webhook signature" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    const payload: ResendWebhookPayload = JSON.parse(rawBody);
    const { type, data } = payload;
    const resendId = data.email_id;

    if (!resendId) {
      return new Response(
        JSON.stringify({ error: "No email_id in webhook payload" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Look up the email_send record by resend_id
    const { data: emailSend, error: lookupError } = await supabase
      .from("email_sends")
      .select("*")
      .eq("resend_id", resendId)
      .maybeSingle();

    if (lookupError) {
      console.error("Error looking up email send:", lookupError);
      return new Response(
        JSON.stringify({ error: "Database lookup failed" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!emailSend) {
      // We received a webhook for an email we didn't track -- ignore gracefully
      console.warn(`No email_send found for resend_id: ${resendId}`);
      return new Response(JSON.stringify({ success: true, ignored: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const contactId = emailSend.contact_id;
    const now = new Date().toISOString();

    switch (type) {
      // -------------------------------------------------------------------
      // email.delivered
      // -------------------------------------------------------------------
      case "email.delivered": {
        await supabase
          .from("email_sends")
          .update({
            status: "delivered",
            delivered_at: now,
          })
          .eq("id", emailSend.id);

        break;
      }

      // -------------------------------------------------------------------
      // email.opened
      // -------------------------------------------------------------------
      case "email.opened": {
        const updates: Record<string, unknown> = {
          open_count: (emailSend.open_count || 0) + 1,
        };

        // Set opened_at only the first time
        if (!emailSend.opened_at) {
          updates.opened_at = now;
          updates.status = "opened";
        }

        await supabase
          .from("email_sends")
          .update(updates)
          .eq("id", emailSend.id);

        // Update contact last_activity_at
        await supabase
          .from("contacts")
          .update({ last_activity_at: now })
          .eq("id", contactId);

        break;
      }

      // -------------------------------------------------------------------
      // email.clicked
      // -------------------------------------------------------------------
      case "email.clicked": {
        const clickUpdates: Record<string, unknown> = {
          click_count: (emailSend.click_count || 0) + 1,
        };

        // Set clicked_at only the first time
        if (!emailSend.clicked_at) {
          clickUpdates.clicked_at = now;
          clickUpdates.status = "clicked";
        }

        await supabase
          .from("email_sends")
          .update(clickUpdates)
          .eq("id", emailSend.id);

        // Log the clicked URL
        const clickedUrl = data.click?.link || "unknown";
        await supabase.from("email_link_clicks").insert({
          email_send_id: emailSend.id,
          url: clickedUrl,
          clicked_at: now,
        });

        // Update contact last_activity_at
        await supabase
          .from("contacts")
          .update({ last_activity_at: now })
          .eq("id", contactId);

        break;
      }

      // -------------------------------------------------------------------
      // email.bounced
      // -------------------------------------------------------------------
      case "email.bounced": {
        await supabase
          .from("email_sends")
          .update({
            status: "bounced",
            bounced_at: now,
          })
          .eq("id", emailSend.id);

        // Update contact status to bounced
        await supabase
          .from("contacts")
          .update({ status: "bounced" })
          .eq("id", contactId);

        // Cancel all active flow enrollments
        await cancelActiveEnrollments(supabase, contactId);

        break;
      }

      // -------------------------------------------------------------------
      // email.complained (spam complaint)
      // -------------------------------------------------------------------
      case "email.complained": {
        await supabase
          .from("email_sends")
          .update({ status: "complained" })
          .eq("id", emailSend.id);

        // Update contact status
        await supabase
          .from("contacts")
          .update({ status: "complained" })
          .eq("id", contactId);

        // Cancel all active flow enrollments
        await cancelActiveEnrollments(supabase, contactId);

        // Unsubscribe from all email categories
        const categories = [
          "marketing",
          "product_updates",
          "newsletter",
          "drip",
        ];
        for (const category of categories) {
          await supabase.from("email_preferences").upsert(
            {
              contact_id: contactId,
              category,
              subscribed: false,
            },
            { onConflict: "contact_id,category" }
          );
        }

        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${type}`);
    }

    return new Response(
      JSON.stringify({ success: true, event: type, emailSendId: emailSend.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("webhook-resend error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
