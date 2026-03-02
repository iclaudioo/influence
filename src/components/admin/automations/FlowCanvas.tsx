"use client";

import React from "react";
import FlowNode from "./FlowNode";
import FlowConnector from "./FlowConnector";
import NodeTypePicker from "./NodeTypePicker";
import type { FlowNodeData, FlowNodeType } from "./FlowNode";

interface FlowCanvasProps {
  nodes: FlowNodeData[];
  selectedNodeId: string | null;
  onNodeClick: (nodeId: string) => void;
  onAddNode?: (type: FlowNodeType, afterIndex: number) => void;
  readOnly?: boolean;
}

export default function FlowCanvas({
  nodes,
  selectedNodeId,
  onNodeClick,
  onAddNode,
  readOnly = false,
}: FlowCanvasProps) {
  const sortedNodes = [...nodes].sort((a, b) => a.position - b.position);

  return (
    <div className="flex flex-col items-center py-6">
      {sortedNodes.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-8 py-10 text-center">
            <p className="text-sm font-medium text-gray-500">
              No steps yet. Add a trigger to get started.
            </p>
            {onAddNode && !readOnly && (
              <div className="mt-4">
                <NodeTypePicker
                  onSelect={(type) => onAddNode(type, 0)}
                  excludeTypes={[]}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        sortedNodes.map((node, index) => {
          const isLast = index === sortedNodes.length - 1;
          const isCondition = node.type === "condition";

          return (
            <React.Fragment key={node.id}>
              <FlowNode
                node={node}
                selected={selectedNodeId === node.id}
                onClick={onNodeClick}
              />

              {!isLast && (
                <>
                  {isCondition ? (
                    <div className="flex gap-16">
                      <FlowConnector isCondition branchLabel="yes" />
                      <FlowConnector isCondition branchLabel="no" />
                    </div>
                  ) : (
                    <FlowConnector />
                  )}
                </>
              )}

              {/* Add node button between steps */}
              {!readOnly && onAddNode && !isLast && (
                <div className="py-1">
                  <NodeTypePicker
                    onSelect={(type) => onAddNode(type, index + 1)}
                    excludeTypes={["trigger"]}
                  />
                </div>
              )}

              {/* Add node at the end */}
              {!readOnly && onAddNode && isLast && node.type !== "exit" && (
                <>
                  <FlowConnector />
                  <NodeTypePicker
                    onSelect={(type) => onAddNode(type, index + 1)}
                    excludeTypes={["trigger"]}
                  />
                </>
              )}
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}
