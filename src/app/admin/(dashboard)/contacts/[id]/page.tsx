import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ContactProfile from "@/components/admin/contacts/ContactProfile";
import ContactTimeline from "@/components/admin/contacts/ContactTimeline";

interface ContactDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ContactDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: contact } = await supabase
    .from("contacts")
    .select("name")
    .eq("id", id)
    .single();

  return {
    title: contact
      ? `${contact.name} — Contacts — Influence Circle Admin`
      : "Contact Not Found",
  };
}

export default async function ContactDetailPage({
  params,
}: ContactDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch contact
  const { data: contact, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !contact) {
    notFound();
  }

  // Fetch related data in parallel
  const [tagsResult, interestsResult, preferencesResult, emailsResult, enrollmentsResult] =
    await Promise.all([
      supabase
        .from("contact_tags")
        .select("id, tag")
        .eq("contact_id", id)
        .order("created_at", { ascending: true }),
      supabase
        .from("contact_service_interests")
        .select("id, service, engagement_level")
        .eq("contact_id", id),
      supabase
        .from("email_preferences")
        .select("id, category, subscribed")
        .eq("contact_id", id),
      supabase
        .from("email_sends")
        .select("id, subject, status, sent_at, delivered_at, opened_at, clicked_at, bounced_at, created_at")
        .eq("contact_id", id)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("contact_flow_enrollments")
        .select("id, status, started_at, completed_at, automation_flows(name)")
        .eq("contact_id", id)
        .order("started_at", { ascending: false }),
    ]);

  const tags = tagsResult.data ?? [];
  const serviceInterests = interestsResult.data ?? [];
  const emailPreferences = preferencesResult.data ?? [];
  const emailSends = emailsResult.data ?? [];
  const flowEnrollments = enrollmentsResult.data ?? [];

  // Build timeline events from email sends and flow enrollments
  type TimelineEvent = {
    id: string;
    type:
      | "email_sent"
      | "email_delivered"
      | "email_opened"
      | "email_clicked"
      | "email_bounced"
      | "email_failed"
      | "flow_enrolled"
      | "flow_completed";
    description: string;
    detail?: string;
    timestamp: string;
  };

  const timelineEvents: TimelineEvent[] = [];

  emailSends.forEach((send) => {
    // Always show the send event
    if (send.sent_at) {
      timelineEvents.push({
        id: `${send.id}-sent`,
        type: "email_sent",
        description: `Email sent: "${send.subject}"`,
        timestamp: send.sent_at,
      });
    }

    if (send.delivered_at) {
      timelineEvents.push({
        id: `${send.id}-delivered`,
        type: "email_delivered",
        description: `Email delivered: "${send.subject}"`,
        timestamp: send.delivered_at,
      });
    }

    if (send.opened_at) {
      timelineEvents.push({
        id: `${send.id}-opened`,
        type: "email_opened",
        description: `Email opened: "${send.subject}"`,
        timestamp: send.opened_at,
      });
    }

    if (send.clicked_at) {
      timelineEvents.push({
        id: `${send.id}-clicked`,
        type: "email_clicked",
        description: `Link clicked in: "${send.subject}"`,
        timestamp: send.clicked_at,
      });
    }

    if (send.bounced_at) {
      timelineEvents.push({
        id: `${send.id}-bounced`,
        type: "email_bounced",
        description: `Email bounced: "${send.subject}"`,
        timestamp: send.bounced_at,
      });
    }

    if (send.status === "failed") {
      timelineEvents.push({
        id: `${send.id}-failed`,
        type: "email_failed",
        description: `Email failed: "${send.subject}"`,
        timestamp: send.created_at,
      });
    }
  });

  flowEnrollments.forEach((enrollment) => {
    const flow = enrollment.automation_flows as unknown as { name: string } | null;
    const flowName = flow?.name ?? "Unknown flow";

    timelineEvents.push({
      id: `${enrollment.id}-enrolled`,
      type: "flow_enrolled",
      description: `Enrolled in flow: "${flowName}"`,
      timestamp: enrollment.started_at,
    });

    if (enrollment.completed_at) {
      timelineEvents.push({
        id: `${enrollment.id}-completed`,
        type: "flow_completed",
        description: `Completed flow: "${flowName}"`,
        timestamp: enrollment.completed_at,
      });
    }
  });

  // Sort timeline events by timestamp descending
  timelineEvents.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      <ContactProfile
        contact={contact}
        tags={tags}
        serviceInterests={serviceInterests}
        emailPreferences={emailPreferences}
      />
      <ContactTimeline events={timelineEvents} />
    </div>
  );
}
