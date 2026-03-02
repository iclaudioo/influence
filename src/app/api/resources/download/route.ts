import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadMagnetId, contactId } = body;

    if (!leadMagnetId) {
      return NextResponse.json(
        { error: "leadMagnetId is required." },
        { status: 400 },
      );
    }

    const supabase = createServiceClient();

    // Get the lead magnet to retrieve the file URL
    const { data: leadMagnet, error: fetchError } = await supabase
      .from("lead_magnets")
      .select("id, file_url, download_count")
      .eq("id", leadMagnetId)
      .single();

    if (fetchError || !leadMagnet) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 404 },
      );
    }

    // Insert download record if contactId is provided
    if (contactId) {
      await supabase.from("lead_magnet_downloads").insert({
        lead_magnet_id: leadMagnetId,
        contact_id: contactId,
        downloaded_at: new Date().toISOString(),
      });
    }

    // Increment download count
    await supabase
      .from("lead_magnets")
      .update({ download_count: (leadMagnet.download_count || 0) + 1 })
      .eq("id", leadMagnetId);

    return NextResponse.json({ fileUrl: leadMagnet.file_url });
  } catch (error) {
    console.error("Resource download error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
