import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, message, language, gdprConsent } =
      body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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
          name,
          company: company || null,
          language: language || "nl",
          source: "contact_form",
          message,
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
      console.error("Contact insert error:", contactError);
      return NextResponse.json(
        { error: "Failed to save contact." },
        { status: 500 },
      );
    }

    // Insert service interest if a service was selected
    if (service && contact) {
      const validServices = ["labs", "circle", "studio", "academy"];
      if (validServices.includes(service)) {
        await supabase.from("contact_service_interests").upsert(
          {
            contact_id: contact.id,
            service,
            engagement_level: "interested",
          },
          { onConflict: "contact_id,service" },
        );
      }
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

    // Send confirmation & notification emails via edge function
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

      await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          type: "contact_confirmation",
          contactId: contact.id,
          data: { name, email, service, message, language: language || "nl" },
        }),
      });
    } catch (emailError) {
      // Log but don't fail the request if email sending fails
      console.error("Email sending error:", emailError);
    }

    // Trigger automation flow enrollment
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

      await fetch(`${supabaseUrl}/functions/v1/trigger-flow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          trigger: "contact_created",
          contactId: contact.id,
          service,
        }),
      });
    } catch (flowError) {
      console.error("Flow trigger error:", flowError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
