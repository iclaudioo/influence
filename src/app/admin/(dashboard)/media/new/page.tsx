"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Save } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";

const TYPE_OPTIONS = [
  { value: "press", label: "Press" },
  { value: "podcast", label: "Podcast" },
  { value: "speaking", label: "Speaking" },
];

export default function NewMediaMentionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    outlet_name: "",
    logo_url: "",
    title: "",
    url: "",
    mention_date: "",
    type: "press",
    sort_order: "0",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = useCallback(async () => {
    if (!form.outlet_name.trim()) return;

    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("media_mentions").insert({
      outlet_name: form.outlet_name,
      logo_url: form.logo_url || null,
      title: form.title || null,
      url: form.url || null,
      mention_date: form.mention_date || null,
      type: form.type,
      sort_order: parseInt(form.sort_order, 10) || 0,
    });

    if (error) {
      console.error("Failed to create media mention:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/media");
  }, [form, router]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/media")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Media
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">New Media Mention</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !form.outlet_name.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Mention"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl space-y-6">
        <Input
          label="Outlet Name"
          value={form.outlet_name}
          onChange={(e) => updateField("outlet_name", e.target.value)}
          placeholder="e.g. Het Financieele Dagblad"
        />

        <Input
          label="Logo URL"
          value={form.logo_url}
          onChange={(e) => updateField("logo_url", e.target.value)}
          placeholder="https://..."
        />

        <Input
          label="Title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Article or mention title"
        />

        <Input
          label="URL"
          value={form.url}
          onChange={(e) => updateField("url", e.target.value)}
          placeholder="https://..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Mention Date"
            type="date"
            value={form.mention_date}
            onChange={(e) => updateField("mention_date", e.target.value)}
          />
          <Select
            label="Type"
            options={TYPE_OPTIONS}
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
          />
          <Input
            label="Sort Order"
            type="number"
            value={form.sort_order}
            onChange={(e) => updateField("sort_order", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
