"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, Save } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";
import FlowCanvas from "@/components/admin/automations/FlowCanvas";
import NodeProperties from "@/components/admin/automations/NodeProperties";
import type { FlowNodeData, FlowNodeType } from "@/components/admin/automations/FlowNode";

const TRIGGER_TYPE_OPTIONS = [
  { value: "contact_created", label: "Contact Created" },
  { value: "tag_added", label: "Tag Added" },
  { value: "service_interest", label: "Service Interest Added" },
  { value: "manual", label: "Manual Enrollment" },
  { value: "inactivity", label: "Inactivity Trigger" },
];

export default function NewAutomationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [triggerType, setTriggerType] = useState("contact_created");
  const [triggerConfig, setTriggerConfig] = useState<Record<string, unknown>>(
    {}
  );
  const [nodes, setNodes] = useState<FlowNodeData[]>([
    {
      id: "trigger-1",
      type: "trigger",
      title: "Flow Trigger",
      config: { trigger_type: "contact_created" },
      position: 0,
    },
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  const handleAddNode = useCallback(
    (type: FlowNodeType, afterIndex: number) => {
      const newNode: FlowNodeData = {
        id: `node-${Date.now()}`,
        type,
        title:
          type === "send_email"
            ? "Send Email"
            : type === "delay"
              ? "Wait"
              : type === "condition"
                ? "Check Condition"
                : type === "update_contact"
                  ? "Update Contact"
                  : type === "exit"
                    ? "End Flow"
                    : "New Step",
        config:
          type === "delay"
            ? { duration_hours: 24 }
            : type === "condition"
              ? { field: "language", operator: "equals", value: "" }
              : {},
        position: afterIndex,
      };

      setNodes((prev) => {
        const updated = prev.map((n) =>
          n.position >= afterIndex
            ? { ...n, position: n.position + 1 }
            : n
        );
        return [...updated, newNode].sort((a, b) => a.position - b.position);
      });

      setSelectedNodeId(newNode.id);
    },
    []
  );

  const handleUpdateNode = useCallback(
    (nodeId: string, updates: Partial<FlowNodeData>) => {
      setNodes((prev) =>
        prev.map((n) => (n.id === nodeId ? { ...n, ...updates } : n))
      );
    },
    []
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prev) => {
        const filtered = prev.filter((n) => n.id !== nodeId);
        return filtered.map((n, i) => ({ ...n, position: i }));
      });
      if (selectedNodeId === nodeId) setSelectedNodeId(null);
    },
    [selectedNodeId]
  );

  const handleSave = useCallback(async () => {
    if (!name.trim()) return;

    setSaving(true);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Create the flow
    const { data: flow, error: flowError } = await supabase
      .from("automation_flows")
      .insert({
        name,
        description,
        trigger_type: triggerType,
        trigger_config: triggerConfig,
        status: "draft",
      })
      .select()
      .single();

    if (flowError || !flow) {
      console.error("Failed to create flow:", flowError);
      setSaving(false);
      return;
    }

    // Create flow steps (skip the trigger node)
    const steps = nodes
      .filter((n) => n.type !== "trigger")
      .map((n) => ({
        flow_id: flow.id,
        position: n.position,
        action: n.type,
        config: n.config,
      }));

    if (steps.length > 0) {
      const { error: stepsError } = await supabase
        .from("flow_steps")
        .insert(steps);

      if (stepsError) {
        console.error("Failed to create steps:", stepsError);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/automations");
  }, [name, description, triggerType, triggerConfig, nodes, router]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/automations")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Automations
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">New Automation</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Flow"}
          </button>
        </div>
      </div>

      {/* Flow setup */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Input
          label="Automation Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Welcome Drip Campaign"
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description..."
        />
        <Select
          label="Trigger Type"
          options={TRIGGER_TYPE_OPTIONS}
          value={triggerType}
          onChange={(e) => {
            setTriggerType(e.target.value);
            setTriggerConfig({});
            // Also update the trigger node
            const triggerNode = nodes.find((n) => n.type === "trigger");
            if (triggerNode) {
              handleUpdateNode(triggerNode.id, {
                config: { trigger_type: e.target.value },
              });
            }
          }}
        />
      </div>

      {/* Flow builder */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Canvas */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 min-h-[500px] overflow-auto">
          <FlowCanvas
            nodes={nodes}
            selectedNodeId={selectedNodeId}
            onNodeClick={setSelectedNodeId}
            onAddNode={handleAddNode}
          />
        </div>

        {/* Properties panel */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm min-h-[500px]">
          <NodeProperties
            node={selectedNode}
            onUpdate={handleUpdateNode}
            onDelete={handleDeleteNode}
            onClose={() => setSelectedNodeId(null)}
          />
        </div>
      </div>
    </div>
  );
}
