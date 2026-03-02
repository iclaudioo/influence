"use client";

import { useState, useTransition } from "react";
import { Tag, Trash2, Download, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface BulkActionsBarProps {
  selectedIds: string[];
  onClear: () => void;
}

export default function BulkActionsBar({
  selectedIds,
  onClear,
}: BulkActionsBarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);

  if (selectedIds.length === 0) return null;

  function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = tagValue.trim().toLowerCase();
    if (!trimmed) return;

    startTransition(async () => {
      try {
        const supabase = createClient();
        const inserts = selectedIds.map((contactId) => ({
          contact_id: contactId,
          tag: trimmed,
        }));
        const { error } = await supabase
          .from("contact_tags")
          .upsert(inserts, { onConflict: "contact_id,tag" });

        if (error) throw error;
        setTagValue("");
        setShowTagInput(false);
        router.refresh();
      } catch (err) {
        console.error("Failed to add tags in bulk:", err);
      }
    });
  }

  function handleRemoveTag() {
    const tag = prompt("Enter the tag to remove from selected contacts:");
    if (!tag?.trim()) return;

    setIsRemoving(true);
    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("contact_tags")
          .delete()
          .in("contact_id", selectedIds)
          .eq("tag", tag.trim().toLowerCase());

        if (error) throw error;
        router.refresh();
      } catch (err) {
        console.error("Failed to remove tags in bulk:", err);
      } finally {
        setIsRemoving(false);
      }
    });
  }

  async function handleExport() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("contacts")
        .select("name, email, company, status, language, source, created_at")
        .in("id", selectedIds);

      if (error) throw error;
      if (!data || data.length === 0) return;

      const headers = Object.keys(data[0]);
      const csv = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((h) => {
              const val = String(row[h as keyof typeof row] ?? "");
              return val.includes(",") ? `"${val}"` : val;
            })
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contacts-export-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export contacts:", err);
    }
  }

  function handleDelete() {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedIds.length} contact(s)? This action cannot be undone.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("contacts")
          .delete()
          .in("id", selectedIds);

        if (error) throw error;
        onClear();
        router.refresh();
      } catch (err) {
        console.error("Failed to delete contacts:", err);
      }
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-6 py-3 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {selectedIds.length} contact{selectedIds.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Tag */}
          {showTagInput ? (
            <form onSubmit={handleAddTag} className="flex items-center gap-2">
              <input
                type="text"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                placeholder="Tag name..."
                autoFocus
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#02182B] focus:outline-none focus:ring-1 focus:ring-[#02182B]"
              />
              <button
                type="submit"
                disabled={isPending || !tagValue.trim()}
                className="inline-flex items-center gap-1 rounded-lg bg-[#02182B] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0a2540] transition-colors disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  "Apply"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTagInput(false);
                  setTagValue("");
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Tag className="h-3.5 w-3.5" />
              Add Tag
            </button>
          )}

          {/* Remove Tag */}
          <button
            onClick={handleRemoveTag}
            disabled={isRemoving}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Tag className="h-3.5 w-3.5" />
            Remove Tag
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
