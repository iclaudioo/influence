"use client";

import { useState, useTransition } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Tag {
  id: string;
  tag: string;
}

interface TagManagerProps {
  contactId: string;
  initialTags: Tag[];
}

export default function TagManager({ contactId, initialTags }: TagManagerProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [newTag, setNewTag] = useState("");
  const [isPending, startTransition] = useTransition();
  const [removingId, setRemovingId] = useState<string | null>(null);

  function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newTag.trim().toLowerCase();
    if (!trimmed) return;
    if (tags.some((t) => t.tag === trimmed)) {
      setNewTag("");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("contact_tags")
          .insert({ contact_id: contactId, tag: trimmed })
          .select("id, tag")
          .single();

        if (error) throw error;
        if (data) {
          setTags((prev) => [...prev, data]);
        }
        setNewTag("");
      } catch (err) {
        console.error("Failed to add tag:", err);
      }
    });
  }

  function handleRemoveTag(tagId: string) {
    setRemovingId(tagId);
    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("contact_tags")
          .delete()
          .eq("id", tagId);

        if (error) throw error;
        setTags((prev) => prev.filter((t) => t.id !== tagId));
      } catch (err) {
        console.error("Failed to remove tag:", err);
      } finally {
        setRemovingId(null);
      }
    });
  }

  return (
    <div className="space-y-3">
      {/* Existing Tags */}
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {t.tag}
              <button
                onClick={() => handleRemoveTag(t.id)}
                disabled={removingId === t.id}
                className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors disabled:opacity-50"
                aria-label={`Remove tag ${t.tag}`}
              >
                {removingId === t.id ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No tags yet.</p>
      )}

      {/* Add Tag Form */}
      <form onSubmit={handleAddTag} className="flex items-center gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag..."
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#02182B] focus:outline-none focus:ring-1 focus:ring-[#02182B]"
        />
        <button
          type="submit"
          disabled={isPending || !newTag.trim()}
          className="inline-flex items-center gap-1 rounded-lg bg-[#02182B] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0a2540] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          Add
        </button>
      </form>
    </div>
  );
}
