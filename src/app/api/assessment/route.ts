import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, toolType, answers, score, results } = body;

    if (!contactId || !toolType) {
      return NextResponse.json(
        { error: "contactId and toolType are required." },
        { status: 400 },
      );
    }

    const validToolTypes = ["visibility_score", "roi_calculator"];
    if (!validToolTypes.includes(toolType)) {
      return NextResponse.json(
        { error: "Invalid tool type." },
        { status: 400 },
      );
    }

    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("assessment_submissions")
      .insert({
        contact_id: contactId,
        tool_type: toolType,
        answers: answers || {},
        score: score ?? null,
        results: results || {},
      })
      .select("id")
      .single();

    if (error) {
      console.error("Assessment insert error:", error);
      return NextResponse.json(
        { error: "Failed to save assessment." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Assessment submission error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
