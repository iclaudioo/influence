"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface EditLinkedInPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditLinkedInPostPage({ params }: EditLinkedInPostPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    hook: "",
    content: "",
    topic: "",
    hashtags: "",
    status: "draft",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function loadPost() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data } = await supabase
        .from("linkedin_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) {
        router.push("/admin/linkedin");
        return;
      }

      setForm({
        hook: data.hook ?? "",
        content: data.content ?? "",
        topic: data.topic ?? "",
        hashtags: Array.isArray(data.hashtags) ? data.hashtags.join(", ") : "",
        status: data.status ?? "draft",
      });
      setLoading(false);
    }

    loadPost();
  }, [id, router]);

  const handleSave = useCallback(async () => {
    if (!form.content.trim()) return;

    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const hashtagsArray = form.hashtags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("linkedin_posts")
      .update({
        hook: form.hook || null,
        content: form.content,
        topic: form.topic || null,
        hashtags: hashtagsArray,
        status: form.status,
        published_at: form.status === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      console.error("Failed to update LinkedIn post:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/linkedin");
  }, [form, id, router]);

  const handleDelete = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this LinkedIn post? This action cannot be undone.")) {
      return;
    }

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("linkedin_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete LinkedIn post:", error);
      return;
    }

    router.push("/admin/linkedin");
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#02182B]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/linkedin")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to LinkedIn
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit LinkedIn Post</h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !form.content.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl space-y-6">
        <Input
          label="Hook (opening line)"
          value={form.hook}
          onChange={(e) => updateField("hook", e.target.value)}
          placeholder="Attention-grabbing opening line"
        />

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
            placeholder="LinkedIn post content..."
          />
        </div>

        <Input
          label="Topic"
          value={form.topic}
          onChange={(e) => updateField("topic", e.target.value)}
          placeholder="e.g. Leadership, Personal Branding"
        />

        <Input
          label="Hashtags (komma-gescheiden)"
          value={form.hashtags}
          onChange={(e) => updateField("hashtags", e.target.value)}
          placeholder="#tag1, #tag2"
        />

        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
        />
      </div>
    </div>
  );
}
