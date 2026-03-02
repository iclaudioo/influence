import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type EmailType =
  | "contact_confirmation"
  | "lead_notification"
  | "drip"
  | "welcome"
  | "reengagement"
  | "campaign";

interface SendEmailRequest {
  type: EmailType;
  contactId: string;
  data?: Record<string, unknown>;
}

const MARKETING_TYPES: EmailType[] = [
  "drip",
  "welcome",
  "reengagement",
  "campaign",
];

// ---------------------------------------------------------------------------
// Unsubscribe token helpers
// ---------------------------------------------------------------------------

async function generateUnsubscribeToken(
  supabase: ReturnType<typeof createClient>,
  contactId: string
): Promise<string> {
  const tokenBytes = new Uint8Array(32);
  crypto.getRandomValues(tokenBytes);
  const token = Array.from(tokenBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90); // 90 day expiry

  await supabase.from("unsubscribe_tokens").insert({
    contact_id: contactId,
    token,
    expires_at: expiresAt.toISOString(),
  });

  return token;
}

// ---------------------------------------------------------------------------
// HTML email templates
// ---------------------------------------------------------------------------

function baseLayout(body: string, preheader = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Influence Circle</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #1a1a2e; padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
    .body { padding: 32px 24px; color: #333333; line-height: 1.6; }
    .body h2 { color: #1a1a2e; }
    .btn { display: inline-block; background: #6c63ff; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; margin: 16px 0; }
    .footer { padding: 24px; text-align: center; font-size: 12px; color: #888888; background: #f4f4f7; }
    .footer a { color: #6c63ff; }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ""}
  <div class="container">
    <div class="header"><h1>Influence Circle</h1></div>
    <div class="body">${body}</div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Influence Circle. All rights reserved.<br/>
      {{UNSUBSCRIBE_LINK}}
    </div>
  </div>
</body>
</html>`;
}

function renderContactConfirmation(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "there";
  const confirmUrl = data.confirmUrl as string || "#";
  return {
    subject: "Please confirm your email address",
    html: baseLayout(
      `<h2>Welcome, ${name}!</h2>
       <p>Thank you for signing up. Please confirm your email address by clicking the button below.</p>
       <p style="text-align:center"><a class="btn" href="${confirmUrl}">Confirm Email</a></p>
       <p>If you did not sign up, you can safely ignore this email.</p>`,
      "Please confirm your email address"
    ),
  };
}

function renderLeadNotification(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "Unknown";
  const email = (data.email as string) || "";
  const company = (data.company as string) || "N/A";
  const service = (data.service as string) || "N/A";
  const message = (data.message as string) || "";
  return {
    subject: `New lead: ${name} (${service})`,
    html: baseLayout(
      `<h2>New Lead Received</h2>
       <table style="width:100%;border-collapse:collapse;">
         <tr><td style="padding:8px;font-weight:600;">Name</td><td style="padding:8px;">${name}</td></tr>
         <tr><td style="padding:8px;font-weight:600;">Email</td><td style="padding:8px;">${email}</td></tr>
         <tr><td style="padding:8px;font-weight:600;">Company</td><td style="padding:8px;">${company}</td></tr>
         <tr><td style="padding:8px;font-weight:600;">Service Interest</td><td style="padding:8px;">${service}</td></tr>
         ${message ? `<tr><td style="padding:8px;font-weight:600;">Message</td><td style="padding:8px;">${message}</td></tr>` : ""}
       </table>`
    ),
  };
}

function renderWelcome(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "there";
  const service = (data.service as string) || "";
  return {
    subject: "Welcome to Influence Circle",
    html: baseLayout(
      `<h2>Welcome aboard, ${name}!</h2>
       <p>We're thrilled to have you join the Influence Circle community${service ? ` and we're excited about your interest in <strong>${service}</strong>` : ""}.</p>
       <p>Here's what you can expect:</p>
       <ul>
         <li>Expert insights on digital strategy and branding</li>
         <li>Exclusive content tailored to your interests</li>
         <li>Updates on our latest offerings</li>
       </ul>
       <p>Stay tuned -- great things are coming your way.</p>`,
      "Welcome to Influence Circle"
    ),
  };
}

function renderDrip(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const subject = (data.subject as string) || "A message from Influence Circle";
  const body = (data.body as string) || "";
  const ctaText = (data.ctaText as string) || "";
  const ctaUrl = (data.ctaUrl as string) || "";
  return {
    subject,
    html: baseLayout(
      `${body}
       ${ctaText && ctaUrl ? `<p style="text-align:center"><a class="btn" href="${ctaUrl}">${ctaText}</a></p>` : ""}`,
      subject
    ),
  };
}

function renderReengagement(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "there";
  return {
    subject: "We miss you at Influence Circle",
    html: baseLayout(
      `<h2>Hey ${name}, it's been a while!</h2>
       <p>We noticed you haven't been around lately and wanted to check in. We've been working on some exciting new content and services that we think you'll love.</p>
       <p style="text-align:center"><a class="btn" href="${(data.returnUrl as string) || "#"}">See What's New</a></p>
       <p>If you're no longer interested, no hard feelings -- you can update your preferences below.</p>`,
      "We miss you -- come see what's new"
    ),
  };
}

function renderCampaign(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const subject = (data.subject as string) || "News from Influence Circle";
  const body = (data.body as string) || "";
  const ctaText = (data.ctaText as string) || "";
  const ctaUrl = (data.ctaUrl as string) || "";
  return {
    subject,
    html: baseLayout(
      `${body}
       ${ctaText && ctaUrl ? `<p style="text-align:center"><a class="btn" href="${ctaUrl}">${ctaText}</a></p>` : ""}`,
      subject
    ),
  };
}

function renderEmail(
  type: EmailType,
  data: Record<string, unknown>
): { subject: string; html: string } {
  switch (type) {
    case "contact_confirmation":
      return renderContactConfirmation(data);
    case "lead_notification":
      return renderLeadNotification(data);
    case "welcome":
      return renderWelcome(data);
    case "drip":
      return renderDrip(data);
    case "reengagement":
      return renderReengagement(data);
    case "campaign":
      return renderCampaign(data);
    default:
      throw new Error(`Unknown email type: ${type}`);
  }
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
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
    const fromEmail = Deno.env.get("FROM_EMAIL") || "hello@influencecircle.com";
    const siteUrl = Deno.env.get("SITE_URL") || "https://influencecircle.com";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { type, contactId, data = {} } = (await req.json()) as SendEmailRequest;

    if (!type || !contactId) {
      return new Response(
        JSON.stringify({ error: "type and contactId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch contact
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (contactError || !contact) {
      return new Response(
        JSON.stringify({ error: "Contact not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Merge contact data into template data
    const templateData: Record<string, unknown> = {
      name: contact.name,
      email: contact.email,
      company: contact.company,
      language: contact.language,
      ...data,
    };

    // Render email
    const { subject, html: rawHtml } = renderEmail(type, templateData);

    // Build headers for the Resend API call
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    };

    // Prepare Resend payload
    const isMarketing = MARKETING_TYPES.includes(type);
    let finalHtml = rawHtml;

    const resendPayload: Record<string, unknown> = {
      from: fromEmail,
      to: [contact.email],
      subject: (data.subject as string) || subject,
      html: "", // will be set below
    };

    // For marketing emails: add List-Unsubscribe header and generate token
    if (isMarketing) {
      const token = await generateUnsubscribeToken(supabase, contactId);
      const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${token}`;
      const functionUnsubscribeUrl = `${supabaseUrl}/functions/v1/unsubscribe?token=${token}`;

      finalHtml = finalHtml.replace(
        "{{UNSUBSCRIBE_LINK}}",
        `<a href="${functionUnsubscribeUrl}">Unsubscribe</a> | <a href="${functionUnsubscribeUrl}&preferences=true">Manage Preferences</a>`
      );

      resendPayload.headers = {
        "List-Unsubscribe": `<${functionUnsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      };
    } else {
      finalHtml = finalHtml.replace("{{UNSUBSCRIBE_LINK}}", "");
    }

    resendPayload.html = finalHtml;

    // Determine recipient -- lead_notification goes to admin, everything else to the contact
    if (type === "lead_notification") {
      const adminEmail = Deno.env.get("ADMIN_EMAIL") || fromEmail;
      resendPayload.to = [adminEmail];
    }

    // Send via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify(resendPayload),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: resendResult }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record in email_sends
    const { data: emailSend, error: insertError } = await supabase
      .from("email_sends")
      .insert({
        contact_id: contactId,
        resend_id: resendResult.id,
        subject: (data.subject as string) || subject,
        template: type,
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to record email send:", insertError);
    }

    // Update contact last_activity_at
    await supabase
      .from("contacts")
      .update({ last_activity_at: new Date().toISOString() })
      .eq("id", contactId);

    return new Response(
      JSON.stringify({
        success: true,
        emailSendId: emailSend?.id,
        resendId: resendResult.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-email error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
