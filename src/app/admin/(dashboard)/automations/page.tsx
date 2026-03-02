import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Workflow, Users, Zap } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";

const statusVariant = {
  draft: "default" as const,
  active: "success" as const,
  paused: "warning" as const,
  completed: "info" as const,
  cancelled: "error" as const,
};

const triggerLabels: Record<string, string> = {
  contact_created: "Contact Created",
  tag_added: "Tag Added",
  service_interest: "Service Interest",
  manual: "Manual",
  inactivity: "Inactivity",
};

export default async function AutomationsPage() {
  const supabase = await createClient();

  const { data: flows } = await supabase
    .from("automation_flows")
    .select("*, contact_flow_enrollments(count)")
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Build automated email flows and workflows
          </p>
        </div>
        <Link
          href="/admin/automations/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
        >
          <Plus className="h-4 w-4" />
          New Automation
        </Link>
      </div>

      {/* Automation list */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Automation
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Trigger
                </div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Enrolled
                </div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {!flows || flows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  <Workflow className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  No automations yet. Create your first automation flow.
                </td>
              </tr>
            ) : (
              flows.map(
                (flow: Record<string, unknown>) => {
                  const enrollments = flow.contact_flow_enrollments as
                    | { count: number }[]
                    | null;
                  const enrollmentCount = enrollments?.[0]?.count ?? 0;

                  return (
                    <tr
                      key={flow.id as string}
                      className="border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50"
                    >
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/admin/automations/${flow.id}`}
                          className="block"
                        >
                          <p className="font-medium text-gray-900">
                            {flow.name as string}
                          </p>
                          {flow.description ? (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {String(flow.description)}
                            </p>
                          ) : null}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            statusVariant[
                              flow.status as keyof typeof statusVariant
                            ] ?? "default"
                          }
                        >
                          {flow.status as string}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {triggerLabels[flow.trigger_type as string] ??
                          (flow.trigger_type as string)}
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {enrollmentCount.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">
                        {new Date(
                          flow.created_at as string
                        ).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
