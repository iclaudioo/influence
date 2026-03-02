import { createClient } from "@/lib/supabase/server";
import { Users, UserCheck, Mail, MousePointerClick } from "lucide-react";
import StatCard from "@/components/admin/ui/StatCard";
import AudienceGrowthChart from "@/components/admin/charts/AudienceGrowthChart";
import Badge from "@/components/admin/ui/Badge";

export const metadata = {
  title: "Dashboard — Influence Circle Admin",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch total contacts count
  const { count: totalContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  // Fetch active subscribers count
  const { count: activeSubscribers } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  // Fetch average open rate and click rate from email_sends
  const { data: emailStats } = await supabase
    .from("email_sends")
    .select("open_count, click_count")
    .in("status", ["delivered", "opened", "clicked"]);

  const totalEmails = emailStats?.length ?? 0;
  const totalOpens =
    emailStats?.reduce((sum, e) => sum + (e.open_count > 0 ? 1 : 0), 0) ?? 0;
  const totalClicks =
    emailStats?.reduce((sum, e) => sum + (e.click_count > 0 ? 1 : 0), 0) ?? 0;

  const avgOpenRate =
    totalEmails > 0 ? ((totalOpens / totalEmails) * 100).toFixed(1) : "0.0";
  const avgClickRate =
    totalEmails > 0 ? ((totalClicks / totalEmails) * 100).toFixed(1) : "0.0";

  // Fetch recent campaigns (last 5)
  const { data: recentCampaigns } = await supabase
    .from("campaigns")
    .select("id, name, subject, status, total_recipients, total_opens, total_clicks, sent_at, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch recent activity (last 10 email events)
  const { data: recentActivity } = await supabase
    .from("email_sends")
    .select("id, subject, status, sent_at, opened_at, clicked_at, created_at, contact_id, contacts(name, email)")
    .order("created_at", { ascending: false })
    .limit(10);

  // Fetch audience growth data (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: growthData } = await supabase
    .from("contacts")
    .select("created_at")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: true });

  // Build cumulative audience growth data by day
  const audienceGrowthMap = new Map<string, number>();
  const baseCount = (totalContacts ?? 0) - (growthData?.length ?? 0);

  // Initialize all 30 days
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    audienceGrowthMap.set(key, 0);
  }

  // Count new contacts per day
  growthData?.forEach((c) => {
    const key = new Date(c.created_at).toISOString().split("T")[0];
    audienceGrowthMap.set(key, (audienceGrowthMap.get(key) ?? 0) + 1);
  });

  // Convert to cumulative
  let cumulative = baseCount;
  const audienceGrowth = Array.from(audienceGrowthMap.entries()).map(
    ([date, count]) => {
      cumulative += count;
      return {
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        contacts: cumulative,
      };
    }
  );

  const campaignStatusVariant = (status: string) => {
    switch (status) {
      case "sent":
        return "success" as const;
      case "sending":
        return "info" as const;
      case "scheduled":
        return "warning" as const;
      case "draft":
        return "default" as const;
      case "paused":
      case "cancelled":
        return "error" as const;
      default:
        return "default" as const;
    }
  };

  const emailStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
      case "opened":
      case "clicked":
        return "success" as const;
      case "sent":
      case "queued":
        return "info" as const;
      case "bounced":
      case "complained":
      case "failed":
        return "error" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your email marketing platform.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Contacts"
          value={totalContacts ?? 0}
          icon={Users}
          accentColor="#02182B"
        />
        <StatCard
          title="Active Subscribers"
          value={activeSubscribers ?? 0}
          icon={UserCheck}
          accentColor="#10b981"
        />
        <StatCard
          title="Avg. Open Rate"
          value={`${avgOpenRate}%`}
          icon={Mail}
          accentColor="#d55d25"
        />
        <StatCard
          title="Avg. Click Rate"
          value={`${avgClickRate}%`}
          icon={MousePointerClick}
          accentColor="#6366f1"
        />
      </div>

      {/* Audience Growth Chart */}
      <AudienceGrowthChart data={audienceGrowth} />

      {/* Two-column layout: Recent Campaigns + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Campaigns */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Campaigns
          </h3>
          {recentCampaigns && recentCampaigns.length > 0 ? (
            <div className="space-y-3">
              {recentCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {campaign.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {campaign.subject}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs text-gray-500">
                      <p>{campaign.total_recipients} sent</p>
                      <p>
                        {campaign.total_opens} opens / {campaign.total_clicks}{" "}
                        clicks
                      </p>
                    </div>
                    <Badge variant={campaignStatusVariant(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-8 text-center">
              No campaigns yet.
            </p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((event) => {
                const contact = event.contacts as unknown as {
                  name: string;
                  email: string;
                } | null;
                const contactName = contact?.name ?? contact?.email ?? "Unknown";
                const timestamp =
                  event.clicked_at ??
                  event.opened_at ??
                  event.sent_at ??
                  event.created_at;

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{contactName}</span>
                        {" — "}
                        <span className="text-gray-600">{event.subject}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {timestamp
                          ? new Date(timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </p>
                    </div>
                    <div className="ml-4 shrink-0">
                      <Badge variant={emailStatusVariant(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-8 text-center">
              No activity yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
