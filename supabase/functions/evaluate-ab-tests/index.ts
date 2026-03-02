import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Default confidence threshold: 1.645 for 90% confidence (one-tailed)
const DEFAULT_CONFIDENCE_THRESHOLD = 1.645;
const DEFAULT_MIN_SAMPLE_SIZE = 30;
const DEFAULT_WAIT_HOURS = 48;

// ---------------------------------------------------------------------------
// Statistical helpers
// ---------------------------------------------------------------------------

/**
 * Calculate the z-score for the difference between two proportions.
 *
 * p1 = open rate for variant A
 * p2 = open rate for variant B
 * n1 = sends for variant A
 * n2 = sends for variant B
 */
function calculateZScore(
  p1: number,
  p2: number,
  n1: number,
  n2: number
): number {
  // Pooled proportion
  const pPool = (p1 * n1 + p2 * n2) / (n1 + n2);
  const qPool = 1 - pPool;

  // Standard error
  const se = Math.sqrt(pPool * qPool * (1 / n1 + 1 / n2));

  if (se === 0) return 0;

  return (p1 - p2) / se;
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

    // Find undecided A/B tests
    const { data: pendingTests, error: testsError } = await supabase
      .from("ab_tests")
      .select("*")
      .is("winner", null);

    if (testsError) {
      console.error("Error fetching A/B tests:", testsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch A/B tests" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!pendingTests || pendingTests.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No pending A/B tests to evaluate",
          evaluated: 0,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const now = new Date();
    let evaluated = 0;
    let skipped = 0;
    const results: Array<{
      testId: string;
      name: string;
      winner: string | null;
      reason: string;
    }> = [];

    for (const test of pendingTests) {
      const waitHours =
        (test.wait_hours as number) || DEFAULT_WAIT_HOURS;
      const minSampleSize =
        (test.min_sample_size as number) || DEFAULT_MIN_SAMPLE_SIZE;
      const confidenceThreshold =
        (test.confidence_threshold as number) || DEFAULT_CONFIDENCE_THRESHOLD;

      // Check if enough time has passed since the test was created
      const createdAt = new Date(test.created_at);
      const waitUntil = new Date(
        createdAt.getTime() + waitHours * 60 * 60 * 1000
      );

      if (now < waitUntil) {
        skipped++;
        results.push({
          testId: test.id,
          name: test.name,
          winner: null,
          reason: `Waiting until ${waitUntil.toISOString()} (${waitHours}h after creation)`,
        });
        continue;
      }

      const variantASends = test.variant_a_sends || 0;
      const variantBSends = test.variant_b_sends || 0;
      const variantAOpens = test.variant_a_opens || 0;
      const variantBOpens = test.variant_b_opens || 0;

      // Check minimum sample size for both variants
      if (variantASends < minSampleSize || variantBSends < minSampleSize) {
        skipped++;
        results.push({
          testId: test.id,
          name: test.name,
          winner: null,
          reason: `Insufficient sample size: A=${variantASends}/${minSampleSize}, B=${variantBSends}/${minSampleSize}`,
        });
        continue;
      }

      // Calculate open rates
      const openRateA = variantASends > 0 ? variantAOpens / variantASends : 0;
      const openRateB = variantBSends > 0 ? variantBOpens / variantBSends : 0;

      // Calculate z-score
      const zScore = calculateZScore(
        openRateA,
        openRateB,
        variantASends,
        variantBSends
      );

      let winner: string | null = null;
      let reason = "";

      if (Math.abs(zScore) >= confidenceThreshold) {
        // Statistically significant difference
        winner = zScore > 0 ? "a" : "b";
        reason = `z-score=${zScore.toFixed(3)}, A open rate=${(openRateA * 100).toFixed(1)}%, B open rate=${(openRateB * 100).toFixed(1)}%`;
      } else {
        // If enough time has passed (e.g., double the wait period) and still no winner, pick the better one
        const extendedWaitUntil = new Date(
          createdAt.getTime() + waitHours * 2 * 60 * 60 * 1000
        );

        if (now >= extendedWaitUntil) {
          // Declare a winner based on best observed rate (even without significance)
          if (openRateA !== openRateB) {
            winner = openRateA > openRateB ? "a" : "b";
            reason = `No significance after extended wait. z-score=${zScore.toFixed(3)}, A=${(openRateA * 100).toFixed(1)}%, B=${(openRateB * 100).toFixed(1)}%. Best observed rate chosen.`;
          } else {
            winner = "a"; // Default to variant A for ties
            reason = `Tied open rates after extended wait (${(openRateA * 100).toFixed(1)}%). Defaulting to variant A.`;
          }
        } else {
          skipped++;
          results.push({
            testId: test.id,
            name: test.name,
            winner: null,
            reason: `Not significant yet: z-score=${zScore.toFixed(3)} (threshold=${confidenceThreshold}), A=${(openRateA * 100).toFixed(1)}%, B=${(openRateB * 100).toFixed(1)}%`,
          });
          continue;
        }
      }

      // Update the A/B test with the winner
      const { error: updateError } = await supabase
        .from("ab_tests")
        .update({
          winner,
          decided_at: now.toISOString(),
        })
        .eq("id", test.id);

      if (updateError) {
        console.error(
          `Failed to update A/B test ${test.id}:`,
          updateError
        );
        results.push({
          testId: test.id,
          name: test.name,
          winner: null,
          reason: `Update failed: ${updateError.message}`,
        });
        continue;
      }

      evaluated++;
      results.push({
        testId: test.id,
        name: test.name,
        winner,
        reason,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        evaluated,
        skipped,
        total: pendingTests.length,
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("evaluate-ab-tests error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
