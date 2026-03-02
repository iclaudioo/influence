import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// GET: Right to access — export personal data as JSON
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contactId = searchParams.get("contactId");
  const token = searchParams.get("token");

  if (!contactId || !token) {
    return NextResponse.json({ error: "Missing parameters." }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Validate token
  const { data: tokenData } = await supabase
    .from("unsubscribe_tokens")
    .select("contact_id, expires_at")
    .eq("token", token)
    .eq("contact_id", contactId)
    .single();

  if (!tokenData || new Date(tokenData.expires_at) < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired token." },
      { status: 403 },
    );
  }

  // Fetch all personal data
  const [
    { data: contact },
    { data: tags },
    { data: serviceInterests },
    { data: preferences },
    { data: emailSends },
    { data: enrollments },
  ] = await Promise.all([
    supabase.from("contacts").select("*").eq("id", contactId).single(),
    supabase.from("contact_tags").select("tag, created_at").eq("contact_id", contactId),
    supabase
      .from("contact_service_interests")
      .select("service, engagement_level, created_at")
      .eq("contact_id", contactId),
    supabase
      .from("email_preferences")
      .select("category, subscribed, updated_at")
      .eq("contact_id", contactId),
    supabase
      .from("email_sends")
      .select("subject, template, status, sent_at, delivered_at, opened_at, clicked_at")
      .eq("contact_id", contactId)
      .order("created_at", { ascending: false }),
    supabase
      .from("contact_flow_enrollments")
      .select("flow_id, status, started_at, completed_at")
      .eq("contact_id", contactId),
  ]);

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    contact: contact
      ? {
          name: contact.name,
          email: contact.email,
          company: contact.company,
          language: contact.language,
          source: contact.source,
          status: contact.status,
          gdprConsent: contact.gdpr_consent,
          gdprConsentAt: contact.gdpr_consent_at,
          createdAt: contact.created_at,
          lastActivityAt: contact.last_activity_at,
        }
      : null,
    tags: tags?.map((tag: { tag: string }) => tag.tag) ?? [],
    serviceInterests: serviceInterests ?? [],
    emailPreferences: preferences ?? [],
    emailHistory: emailSends ?? [],
    flowEnrollments: enrollments ?? [],
  });
}

// DELETE: Right to erasure — anonymize and delete personal data
export async function DELETE(request: NextRequest) {
  try {
    const { contactId, token } = await request.json();

    if (!contactId || !token) {
      return NextResponse.json(
        { error: "Missing parameters." },
        { status: 400 },
      );
    }

    const supabase = createServiceClient();

    // Validate token
    const { data: tokenData } = await supabase
      .from("unsubscribe_tokens")
      .select("contact_id, expires_at")
      .eq("token", token)
      .eq("contact_id", contactId)
      .single();

    if (!tokenData || new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 403 },
      );
    }

    // Cancel all active flow enrollments
    await supabase
      .from("contact_flow_enrollments")
      .update({ status: "cancelled" })
      .eq("contact_id", contactId)
      .eq("status", "active");

    // Anonymize email sends (keep for analytics, remove PII)
    await supabase
      .from("email_sends")
      .update({ subject: "[DELETED]", template: "[DELETED]" })
      .eq("contact_id", contactId);

    // Delete all related records
    await Promise.all([
      supabase.from("contact_tags").delete().eq("contact_id", contactId),
      supabase
        .from("contact_service_interests")
        .delete()
        .eq("contact_id", contactId),
      supabase
        .from("email_preferences")
        .delete()
        .eq("contact_id", contactId),
      supabase
        .from("unsubscribe_tokens")
        .delete()
        .eq("contact_id", contactId),
    ]);

    // Anonymize contact (keep on suppression list to prevent re-enrollment)
    const anonymizedEmail = `deleted-${contactId}@anonymized.local`;
    await supabase
      .from("contacts")
      .update({
        name: "[DELETED]",
        email: anonymizedEmail,
        company: null,
        message: null,
        gdpr_consent_ip: null,
        status: "suppressed",
      })
      .eq("id", contactId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GDPR deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
