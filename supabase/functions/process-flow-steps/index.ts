import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_ENROLLMENTS_PER_RUN = 50;

type StepAction =
  | "send_email"
  | "delay"
  | "condition"
  | "update_contact"
  | "exit";

interface FlowStep {
  id: string;
  flow_id: string;
  position: number;
  action: StepAction;
  config: Record<string, unknown>;
}

interface Enrollment {
  id: string;
  contact_id: string;
  flow_id: string;
  current_step_id: string;
  status: string;
  next_action_at: string;
}

// ---------------------------------------------------------------------------
// Helper: get the next step in the flow by position
// ---------------------------------------------------------------------------

async function getNextStep(
  supabase: ReturnType<typeof createClient>,
  flowId: string,
  currentPosition: number
): Promise<FlowStep | null> {
  const { data, error } = await supabase
    .from("flow_steps")
    .select("*")
    .eq("flow_id", flowId)
    .gt("position", currentPosition)
    .order("position", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching next step:", error);
    return null;
  }

  return data;
}

// ---------------------------------------------------------------------------
// Helper: get a specific step by ID
// ---------------------------------------------------------------------------

async function getStepById(
  supabase: ReturnType<typeof createClient>,
  stepId: string
): Promise<FlowStep | null> {
  const { data, error } = await supabase
    .from("flow_steps")
    .select("*")
    .eq("id", stepId)
    .single();

  if (error) {
    console.error("Error fetching step by ID:", error);
    return null;
  }

  return data;
}

// ---------------------------------------------------------------------------
// Helper: advance enrollment to a specific step or complete
// ---------------------------------------------------------------------------

async function advanceEnrollment(
  supabase: ReturnType<typeof createClient>,
  enrollmentId: string,
  nextStep: FlowStep | null,
  delayHours = 0
): Promise<void> {
  if (!nextStep) {
    // No more steps -- mark enrollment as completed
    await supabase
      .from("contact_flow_enrollments")
      .update({
        status: "completed",
        current_step_id: null,
        next_action_at: null,
      })
      .eq("id", enrollmentId);
    return;
  }

  const nextActionAt = new Date();
  nextActionAt.setTime(nextActionAt.getTime() + delayHours * 60 * 60 * 1000);

  await supabase
    .from("contact_flow_enrollments")
    .update({
      current_step_id: nextStep.id,
      next_action_at: nextActionAt.toISOString(),
    })
    .eq("id", enrollmentId);
}

// ---------------------------------------------------------------------------
// Step executors
// ---------------------------------------------------------------------------

async function executeSendEmail(
  supabase: ReturnType<typeof createClient>,
  enrollment: Enrollment,
  step: FlowStep
): Promise<void> {
  const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const config = step.config;
  const emailType = (config.email_type as string) || "drip";
  const data = (config.email_data as Record<string, unknown>) || {};

  // If this step is part of an A/B test, choose variant
  const { data: abTest } = await supabase
    .from("ab_tests")
    .select("*")
    .eq("flow_step_id", step.id)
    .is("winner", null)
    .maybeSingle();

  if (abTest) {
    const splitPct = abTest.split_percentage || 50;
    const useVariantA = Math.random() * 100 < splitPct;
    data.subject = useVariantA
      ? abTest.variant_a_subject
      : abTest.variant_b_subject;
    data._ab_test_id = abTest.id;
    data._ab_variant = useVariantA ? "a" : "b";
  }

  // Call the send-email function
  const response = await fetch(
    `${supabaseUrl}/functions/v1/send-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        type: emailType,
        contactId: enrollment.contact_id,
        data,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `send-email failed for enrollment ${enrollment.id}:`,
      errorBody
    );
    // Don't throw -- we'll still advance to avoid getting stuck
  }

  // If A/B test, increment the send count for the variant
  if (abTest && data._ab_variant) {
    const variant = data._ab_variant as string;
    const field =
      variant === "a" ? "variant_a_sends" : "variant_b_sends";
    await supabase.rpc("increment_field", {
      table_name: "ab_tests",
      row_id: abTest.id,
      field_name: field,
      increment_by: 1,
    }).then(({ error }) => {
      // Fallback: manual update if RPC doesn't exist
      if (error) {
        supabase
          .from("ab_tests")
          .update({ [field]: (abTest[field] || 0) + 1 })
          .eq("id", abTest.id);
      }
    });
  }

  // Advance to next step
  const nextStep = await getNextStep(supabase, step.flow_id, step.position);
  await advanceEnrollment(supabase, enrollment.id, nextStep);
}

async function executeDelay(
  supabase: ReturnType<typeof createClient>,
  enrollment: Enrollment,
  step: FlowStep
): Promise<void> {
  const durationHours =
    (step.config.duration_hours as number) || 24;

  // Get the next step after the delay
  const nextStep = await getNextStep(supabase, step.flow_id, step.position);
  await advanceEnrollment(supabase, enrollment.id, nextStep, durationHours);
}

async function executeCondition(
  supabase: ReturnType<typeof createClient>,
  enrollment: Enrollment,
  step: FlowStep
): Promise<void> {
  const config = step.config;
  const conditionType = config.condition as string;
  let result = false;

  switch (conditionType) {
    case "email_opened": {
      // Check if the last email sent to this contact was opened
      const { data: lastEmail } = await supabase
        .from("email_sends")
        .select("open_count")
        .eq("contact_id", enrollment.contact_id)
        .order("sent_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      result = (lastEmail?.open_count || 0) > 0;
      break;
    }
    case "email_clicked": {
      // Check if the last email sent was clicked
      const { data: lastEmail } = await supabase
        .from("email_sends")
        .select("click_count")
        .eq("contact_id", enrollment.contact_id)
        .order("sent_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      result = (lastEmail?.click_count || 0) > 0;
      break;
    }
    case "has_service_interest": {
      // Check if contact is interested in a specific service
      const serviceToCheck = config.service as string;
      const { data: interest } = await supabase
        .from("contact_service_interests")
        .select("id")
        .eq("contact_id", enrollment.contact_id)
        .eq("service", serviceToCheck)
        .maybeSingle();

      result = !!interest;
      break;
    }
    case "contact_field": {
      // Check a contact field value
      const field = config.field as string;
      const expectedValue = config.value;
      const { data: contact } = await supabase
        .from("contacts")
        .select(field)
        .eq("id", enrollment.contact_id)
        .single();

      result = contact ? contact[field] === expectedValue : false;
      break;
    }
    default:
      console.warn(`Unknown condition type: ${conditionType}`);
      result = false;
  }

  // Branch based on result
  const targetStepId = result
    ? (config.true_step_id as string)
    : (config.false_step_id as string);

  if (targetStepId) {
    const targetStep = await getStepById(supabase, targetStepId);
    await advanceEnrollment(supabase, enrollment.id, targetStep);
  } else {
    // If no branch step defined, advance sequentially
    const nextStep = await getNextStep(supabase, step.flow_id, step.position);
    await advanceEnrollment(supabase, enrollment.id, nextStep);
  }
}

async function executeUpdateContact(
  supabase: ReturnType<typeof createClient>,
  enrollment: Enrollment,
  step: FlowStep
): Promise<void> {
  const updates = (step.config.updates as Record<string, unknown>) || {};

  if (Object.keys(updates).length > 0) {
    await supabase
      .from("contacts")
      .update(updates)
      .eq("id", enrollment.contact_id);
  }

  // If there's a service interest to add
  if (step.config.add_service_interest) {
    const service = step.config.add_service_interest as string;
    const engagementLevel =
      (step.config.engagement_level as string) || "interested";
    await supabase.from("contact_service_interests").upsert(
      {
        contact_id: enrollment.contact_id,
        service,
        engagement_level: engagementLevel,
      },
      { onConflict: "contact_id,service" }
    );
  }

  const nextStep = await getNextStep(supabase, step.flow_id, step.position);
  await advanceEnrollment(supabase, enrollment.id, nextStep);
}

async function executeExit(
  supabase: ReturnType<typeof createClient>,
  enrollment: Enrollment
): Promise<void> {
  await supabase
    .from("contact_flow_enrollments")
    .update({
      status: "completed",
      current_step_id: null,
      next_action_at: null,
    })
    .eq("id", enrollment.id);
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch enrollments that are due for processing
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from("contact_flow_enrollments")
      .select("*")
      .eq("status", "active")
      .lte("next_action_at", new Date().toISOString())
      .not("current_step_id", "is", null)
      .order("next_action_at", { ascending: true })
      .limit(MAX_ENROLLMENTS_PER_RUN);

    if (enrollmentsError) {
      console.error("Error fetching enrollments:", enrollmentsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch enrollments" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!enrollments || enrollments.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No enrollments to process",
          processed: 0,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let processed = 0;
    let errors = 0;

    for (const enrollment of enrollments) {
      try {
        // Fetch the current step
        const step = await getStepById(supabase, enrollment.current_step_id);

        if (!step) {
          console.error(
            `Step ${enrollment.current_step_id} not found for enrollment ${enrollment.id}`
          );
          // Mark enrollment as errored
          await supabase
            .from("contact_flow_enrollments")
            .update({ status: "errored" })
            .eq("id", enrollment.id);
          errors++;
          continue;
        }

        // Execute the step based on its action
        switch (step.action) {
          case "send_email":
            await executeSendEmail(supabase, enrollment, step);
            break;
          case "delay":
            await executeDelay(supabase, enrollment, step);
            break;
          case "condition":
            await executeCondition(supabase, enrollment, step);
            break;
          case "update_contact":
            await executeUpdateContact(supabase, enrollment, step);
            break;
          case "exit":
            await executeExit(supabase, enrollment);
            break;
          default:
            console.warn(`Unknown step action: ${step.action}`);
            // Advance past unknown steps
            const nextStep = await getNextStep(
              supabase,
              step.flow_id,
              step.position
            );
            await advanceEnrollment(supabase, enrollment.id, nextStep);
        }

        processed++;
      } catch (stepError) {
        console.error(
          `Error processing enrollment ${enrollment.id}:`,
          stepError
        );
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed,
        errors,
        total: enrollments.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("process-flow-steps error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
