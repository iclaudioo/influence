import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, gdprConsent, leadSource, language } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    if (!gdprConsent) {
      return NextResponse.json(
        { error: "GDPR consent is required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    const validLeadSources = [
      "contact_form",
      "blog",
      "assessment",
      "lead_magnet",
      "newsletter",
    ];
    const source = validLeadSources.includes(leadSource)
      ? leadSource
      : "newsletter";

    const supabase = createServiceClient();

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // Upsert contact (update if email already exists)
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .upsert(
        {
          email: email.toLowerCase().trim(),
          name: name || "",
          language: language || "nl",
          source: "contact_form",
          lead_source: source,
          gdpr_consent: true,
          gdpr_consent_at: new Date().toISOString(),
          gdpr_consent_ip: ip,
          last_activity_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();

    if (contactError) {
      console.error("Lead insert error:", contactError);
      return NextResponse.json(
        { error: "Failed to save lead." },
        { status: 500 },
      );
    }

    // Create default email preferences
    if (contact) {
      const categories = ["transactional", "marketing", "drip", "newsletter"];
      for (const category of categories) {
        await supabase.from("email_preferences").upsert(
          {
            contact_id: contact.id,
            category,
            subscribed: true,
          },
          { onConflict: "contact_id,category" },
        );
      }
    }

    return NextResponse.json({ success: true, contactId: contact?.id ?? null });
  } catch (error) {
    console.error("Lead form error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
