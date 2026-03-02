"use client";

import React, { useState } from "react";
import FlowCanvas from "@/components/admin/automations/FlowCanvas";
import NodeProperties from "@/components/admin/automations/NodeProperties";
import type { FlowNodeData } from "@/components/admin/automations/FlowNode";

interface AutomationDetailClientProps {
  initialNodes: FlowNodeData[];
}

export default function AutomationDetailClient({
  initialNodes,
}: AutomationDetailClientProps) {
  const [nodes] = useState<FlowNodeData[]>(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      {/* Canvas (read-only view) */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 min-h-[500px] overflow-auto">
        <FlowCanvas
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onNodeClick={setSelectedNodeId}
          readOnly
        />
      </div>

      {/* Properties panel */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm min-h-[500px]">
        <NodeProperties
          node={selectedNode}
          onUpdate={() => {}}
          onDelete={() => {}}
          onClose={() => setSelectedNodeId(null)}
        />
      </div>
    </div>
  );
}
