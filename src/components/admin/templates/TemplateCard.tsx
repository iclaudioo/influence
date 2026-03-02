"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Copy, Trash2, MoreVertical, FileText } from "lucide-react";

interface TemplateCardProps {
  id: string;
  name: string;
  category: string;
  lastEdited: string;
  previewHtml?: string;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  welcome: "#d55d25",
  drip: "#A855F7",
  newsletter: "#02182B",
  transactional: "#E8A317",
  promotional: "#D7263D",
};

export default function TemplateCard({
  id,
  name,
  category,
  lastEdited,
  previewHtml,
  onDuplicate,
  onDelete,
}: TemplateCardProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const categoryColor = categoryColors[category] ?? "#6b7280";

  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      {/* Preview thumbnail */}
      <div
        className="relative h-40 overflow-hidden border-b border-gray-100 bg-gray-50 cursor-pointer"
        onClick={() => router.push(`/admin/templates/${id}/edit`)}
      >
        {previewHtml ? (
          <div
            className="absolute inset-0 scale-50 origin-top-left pointer-events-none"
            style={{ width: "200%", height: "200%" }}
          >
            <div
              className="p-4 text-xs"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileText className="h-10 w-10 text-gray-200" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5">
          <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 opacity-0 transition-opacity group-hover:opacity-100 shadow-sm">
            Edit Template
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 truncate">{name}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
              <span className="text-xs text-gray-500 capitalize">
                {category}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Edited{" "}
              {new Date(lastEdited).toLocaleDateString("nl-NL", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Actions menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/admin/templates/${id}/edit`);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDuplicate(id);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(id);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
