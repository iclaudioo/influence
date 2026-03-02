"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Save } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export default function NewLinkedInPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    author_name: "",
    author_photo_url: "",
    post_text: "",
    post_image_url: "",
    likes: "0",
    comments: "0",
    reposts: "0",
    linkedin_url: "",
    sort_order: "0",
    status: "draft",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = useCallback(async () => {
    if (!form.author_name.trim()) return;

    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("linkedin_posts").insert({
      author_name: form.author_name,
      author_photo_url: form.author_photo_url || null,
      post_text: form.post_text || null,
      post_image_url: form.post_image_url || null,
      likes: parseInt(form.likes, 10) || 0,
      comments: parseInt(form.comments, 10) || 0,
      reposts: parseInt(form.reposts, 10) || 0,
      linkedin_url: form.linkedin_url || null,
      sort_order: parseInt(form.sort_order, 10) || 0,
      status: form.status,
    });

    if (error) {
      console.error("Failed to create LinkedIn post:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/linkedin");
  }, [form, router]);

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
          <h1 className="text-2xl font-bold text-gray-900">New LinkedIn Post</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !form.author_name.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Author Name"
            value={form.author_name}
            onChange={(e) => updateField("author_name", e.target.value)}
            placeholder="Full name"
          />
          <Input
            label="Author Photo URL"
            value={form.author_photo_url}
            onChange={(e) => updateField("author_photo_url", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Post Text
          </label>
          <textarea
            value={form.post_text}
            onChange={(e) => updateField("post_text", e.target.value)}
            rows={6}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
            placeholder="LinkedIn post content..."
          />
        </div>

        <Input
          label="Post Image URL"
          value={form.post_image_url}
          onChange={(e) => updateField("post_image_url", e.target.value)}
          placeholder="https://..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Likes"
            type="number"
            value={form.likes}
            onChange={(e) => updateField("likes", e.target.value)}
          />
          <Input
            label="Comments"
            type="number"
            value={form.comments}
            onChange={(e) => updateField("comments", e.target.value)}
          />
          <Input
            label="Reposts"
            type="number"
            value={form.reposts}
            onChange={(e) => updateField("reposts", e.target.value)}
          />
        </div>

        <Input
          label="LinkedIn URL"
          value={form.linkedin_url}
          onChange={(e) => updateField("linkedin_url", e.target.value)}
          placeholder="https://linkedin.com/posts/..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Sort Order"
            type="number"
            value={form.sort_order}
            onChange={(e) => updateField("sort_order", e.target.value)}
          />
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
