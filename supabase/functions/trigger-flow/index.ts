import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type TriggerType =
  | "contact_created"
  | "tag_added"
  | "service_interest"
  | "manual"
  | "inactivity";

interface TriggerFlowRequest {
  trigger: TriggerType;
  contactId: string;
  service?: string;
  tag?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { trigger, contactId, service, tag } =
      (await req.json()) as TriggerFlowRequest;

    if (!trigger || !contactId) {
      return new Response(
        JSON.stringify({ error: "trigger and contactId are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify the contact exists
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .select("id, status")
      .eq("id", contactId)
      .single();

    if (contactError || !contact) {
      return new Response(
        JSON.stringify({ error: "Contact not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Don't enroll bounced or complained contacts
    if (contact.status === "bounced" || contact.status === "complained") {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Contact has status '${contact.status}', skipping enrollment`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Find matching active automation flows
    let flowQuery = supabase
      .from("automation_flows")
      .select("*")
      .eq("trigger_type", trigger)
      .eq("status", "active");

    const { data: flows, error: flowsError } = await flowQuery;

    if (flowsError) {
      console.error("Error fetching flows:", flowsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch automation flows" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!flows || flows.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No matching active flows found",
          enrollments: [],
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Filter flows by trigger_config matching
    const matchingFlows = flows.filter((flow) => {
      const config = flow.trigger_config || {};

      // For service_interest triggers, match the service field in config
      if (trigger === "service_interest" && service) {
        return config.service === service;
      }

      // For tag_added triggers, match the tag field in config
      if (trigger === "tag_added" && tag) {
        return config.tag === tag;
      }

      // For other triggers, any active flow with matching trigger_type qualifies
      return true;
    });

    if (matchingFlows.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No flows match the trigger configuration",
          enrollments: [],
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const enrollments: Array<{ flowId: string; enrollmentId: string }> = [];
    const skipped: Array<{ flowId: string; reason: string }> = [];

    for (const flow of matchingFlows) {
      // Check if contact is already enrolled in this flow (active enrollment)
      const { data: existingEnrollment } = await supabase
        .from("contact_flow_enrollments")
        .select("id")
        .eq("contact_id", contactId)
        .eq("flow_id", flow.id)
        .eq("status", "active")
        .maybeSingle();

      if (existingEnrollment) {
        skipped.push({
          flowId: flow.id,
          reason: "Contact already enrolled in this flow",
        });
        continue;
      }

      // Get the first step of the flow (position = 1 or lowest position)
      const { data: firstStep, error: stepError } = await supabase
        .from("flow_steps")
        .select("id")
        .eq("flow_id", flow.id)
        .order("position", { ascending: true })
        .limit(1)
        .single();

      if (stepError || !firstStep) {
        skipped.push({
          flowId: flow.id,
          reason: "Flow has no steps configured",
        });
        continue;
      }

      // Create enrollment
      const { data: enrollment, error: enrollError } = await supabase
        .from("contact_flow_enrollments")
        .insert({
          contact_id: contactId,
          flow_id: flow.id,
          current_step_id: firstStep.id,
          status: "active",
          next_action_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (enrollError) {
        console.error(
          `Failed to enroll contact in flow ${flow.id}:`,
          enrollError
        );
        skipped.push({
          flowId: flow.id,
          reason: `Enrollment failed: ${enrollError.message}`,
        });
        continue;
      }

      enrollments.push({
        flowId: flow.id,
        enrollmentId: enrollment.id,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        enrollments,
        skipped,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("trigger-flow error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
