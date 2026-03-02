import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const INACTIVITY_DAYS = 60;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate the inactivity threshold date
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - INACTIVITY_DAYS);
    const thresholdIso = thresholdDate.toISOString();

    // Find active contacts whose last_activity_at is older than the threshold
    const { data: inactiveContacts, error: contactsError } = await supabase
      .from("contacts")
      .select("id")
      .eq("status", "active")
      .lt("last_activity_at", thresholdIso);

    if (contactsError) {
      console.error("Error fetching inactive contacts:", contactsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch inactive contacts" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!inactiveContacts || inactiveContacts.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No inactive contacts found",
          triggered: 0,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Find all active re-engagement flows (trigger_type = 'inactivity')
    const { data: reengagementFlows } = await supabase
      .from("automation_flows")
      .select("id")
      .eq("trigger_type", "inactivity")
      .eq("status", "active");

    const reengagementFlowIds = (reengagementFlows || []).map((f) => f.id);

    let triggered = 0;
    let skipped = 0;

    for (const contact of inactiveContacts) {
      // Check if the contact is already enrolled in a re-engagement flow
      let alreadyEnrolled = false;

      if (reengagementFlowIds.length > 0) {
        const { data: existingEnrollment } = await supabase
          .from("contact_flow_enrollments")
          .select("id")
          .eq("contact_id", contact.id)
          .in("flow_id", reengagementFlowIds)
          .in("status", ["active", "completed"])
          .limit(1)
          .maybeSingle();

        alreadyEnrolled = !!existingEnrollment;
      }

      if (alreadyEnrolled) {
        skipped++;
        continue;
      }

      // Trigger the inactivity flow via the trigger-flow function
      try {
        const response = await fetch(
          `${supabaseUrl}/functions/v1/trigger-flow`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              trigger: "inactivity",
              contactId: contact.id,
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.enrollments && result.enrollments.length > 0) {
            triggered++;
          } else {
            skipped++;
          }
        } else {
          console.error(
            `Failed to trigger flow for contact ${contact.id}:`,
            await response.text()
          );
          skipped++;
        }
      } catch (triggerError) {
        console.error(
          `Error triggering flow for contact ${contact.id}:`,
          triggerError
        );
        skipped++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalInactive: inactiveContacts.length,
        triggered,
        skipped,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("detect-inactive error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
