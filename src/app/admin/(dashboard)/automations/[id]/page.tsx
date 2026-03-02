import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle, Clock } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import AutomationDetailClient from "./AutomationDetailClient";

interface AutomationDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusVariant = {
  draft: "default" as const,
  active: "success" as const,
  paused: "warning" as const,
  completed: "info" as const,
  cancelled: "error" as const,
};

export default async function AutomationDetailPage({
  params,
}: AutomationDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: flow } = await supabase
    .from("automation_flows")
    .select("*")
    .eq("id", id)
    .single();

  if (!flow) notFound();

  const { data: steps } = await supabase
    .from("flow_steps")
    .select("*")
    .eq("flow_id", id)
    .order("position", { ascending: true });

  const { data: enrollments } = await supabase
    .from("contact_flow_enrollments")
    .select("id, status, started_at, completed_at")
    .eq("flow_id", id);

  const activeCount =
    enrollments?.filter((e) => e.status === "active").length ?? 0;
  const completedCount =
    enrollments?.filter((e) => e.status === "completed").length ?? 0;
  const totalCount = enrollments?.length ?? 0;

  // Map flow steps to FlowNodeData format
  const flowNodes = [
    {
      id: "trigger-root",
      type: "trigger" as const,
      title: "Flow Trigger",
      config: {
        trigger_type: flow.trigger_type,
        ...(flow.trigger_config as Record<string, unknown>),
      },
      position: 0,
    },
    ...(steps ?? []).map(
      (step: Record<string, unknown>) => ({
        id: step.id as string,
        type: step.action as "delay" | "send_email" | "condition" | "update_contact" | "exit",
        title:
          step.action === "send_email"
            ? ((step.config as Record<string, unknown>)?.subject as string) ||
              "Send Email"
            : step.action === "delay"
              ? `Wait ${
                  (step.config as Record<string, unknown>)?.duration_hours ?? "?"
                }h`
              : step.action === "condition"
                ? "Condition"
                : step.action === "update_contact"
                  ? "Update Contact"
                  : "Exit",
        config: (step.config as Record<string, unknown>) ?? {},
        position: (step.position as number) + 1,
      })
    ),
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/automations"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Automations
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {flow.name}
            </h1>
            <Badge
              variant={
                statusVariant[
                  flow.status as keyof typeof statusVariant
                ] ?? "default"
              }
            >
              {flow.status}
            </Badge>
          </div>
        </div>
        {flow.description && (
          <p className="text-sm text-gray-500 mt-1">{flow.description}</p>
        )}
      </div>

      {/* Enrollment stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Total Enrolled
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Active</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="h-5 w-5 text-[#E8A317]" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {completedCount}
              </p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Completed
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Flow canvas + properties */}
      <AutomationDetailClient initialNodes={flowNodes} />
    </div>
  );
}
