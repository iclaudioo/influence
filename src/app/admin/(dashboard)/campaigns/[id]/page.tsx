import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import CampaignStats from "@/components/admin/campaigns/CampaignStats";

interface CampaignDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusVariant = {
  draft: "default" as const,
  scheduled: "info" as const,
  sending: "warning" as const,
  sent: "success" as const,
  paused: "warning" as const,
  cancelled: "error" as const,
};

export default async function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();

  if (!campaign) notFound();

  // Get campaign sends with email status
  const { data: campaignSends } = await supabase
    .from("campaign_sends")
    .select(
      `
      id,
      email_send_id,
      email_sends (
        id,
        contact_id,
        subject,
        status,
        open_count,
        click_count,
        sent_at,
        delivered_at,
        opened_at,
        clicked_at,
        bounced_at,
        contacts (
          id,
          email,
          name
        )
      )
    `
    )
    .eq("campaign_id", id);

  // Calculate stats
  const sends = campaignSends ?? [];
  const delivered = sends.filter(
    (s: Record<string, unknown>) =>
      (s.email_sends as Record<string, unknown>)?.status === "delivered" ||
      (s.email_sends as Record<string, unknown>)?.status === "opened" ||
      (s.email_sends as Record<string, unknown>)?.status === "clicked"
  ).length;
  const opened = sends.filter(
    (s: Record<string, unknown>) =>
      (s.email_sends as Record<string, unknown>)?.status === "opened" ||
      (s.email_sends as Record<string, unknown>)?.status === "clicked"
  ).length;
  const clicked = sends.filter(
    (s: Record<string, unknown>) =>
      (s.email_sends as Record<string, unknown>)?.status === "clicked"
  ).length;
  const bounced = sends.filter(
    (s: Record<string, unknown>) =>
      (s.email_sends as Record<string, unknown>)?.status === "bounced"
  ).length;

  const emailStatusVariant: Record<
    string,
    "success" | "warning" | "error" | "info" | "default"
  > = {
    queued: "default",
    sent: "info",
    delivered: "success",
    opened: "success",
    clicked: "success",
    bounced: "error",
    complained: "error",
    failed: "error",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/campaigns"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {campaign.name}
            </h1>
            <Badge
              variant={
                statusVariant[
                  campaign.status as keyof typeof statusVariant
                ] ?? "default"
              }
            >
              {campaign.status}
            </Badge>
          </div>
          {campaign.status === "draft" && (
            <Link
              href={`/admin/campaigns/${id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Subject: {campaign.subject}
        </p>
      </div>

      {/* Stats dashboard */}
      <CampaignStats
        delivered={delivered}
        opened={opened}
        clicked={clicked}
        bounced={bounced}
        totalRecipients={campaign.total_recipients}
      />

      {/* Recipient list */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recipients ({sends.length})
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Opens
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Clicks
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sent At
                </th>
              </tr>
            </thead>
            <tbody>
              {sends.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-gray-400"
                  >
                    No recipients yet.
                  </td>
                </tr>
              ) : (
                sends.map((send: Record<string, unknown>) => {
                  const emailSend = send.email_sends as Record<
                    string,
                    unknown
                  > | null;
                  const contact = emailSend?.contacts as Record<
                    string,
                    unknown
                  > | null;

                  return (
                    <tr
                      key={send.id as string}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="font-medium text-gray-900">
                            {(contact?.name as string) ?? "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(contact?.email as string) ?? ""}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            emailStatusVariant[
                              (emailSend?.status as string) ?? "queued"
                            ] ?? "default"
                          }
                        >
                          {(emailSend?.status as string) ?? "queued"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {(emailSend?.open_count as number) ?? 0}
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {(emailSend?.click_count as number) ?? 0}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">
                        {emailSend?.sent_at
                          ? new Date(
                              emailSend.sent_at as string
                            ).toLocaleString("nl-NL")
                          : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
