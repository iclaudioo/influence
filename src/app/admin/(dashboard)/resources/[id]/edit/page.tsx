"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Save } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";

const SERVICE_OPTIONS = [
  { value: "", label: "Select service..." },
  { value: "executive-positioning", label: "Executive Positioning" },
  { value: "thought-leadership", label: "Thought Leadership" },
  { value: "corporate-influence", label: "Corporate Influence" },
  { value: "personal-branding", label: "Personal Branding" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

interface EditResourcePageProps {
  params: Promise<{ id: string }>;
}

export default function EditResourcePage({ params }: EditResourcePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title_nl: "",
    title_en: "",
    description_nl: "",
    description_en: "",
    file_url: "",
    cover_image_url: "",
    service_line: "",
    status: "draft",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function loadResource() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data } = await supabase
        .from("resources")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) {
        router.push("/admin/resources");
        return;
      }

      setForm({
        title_nl: data.title_nl ?? "",
        title_en: data.title_en ?? "",
        description_nl: data.description_nl ?? "",
        description_en: data.description_en ?? "",
        file_url: data.file_url ?? "",
        cover_image_url: data.cover_image_url ?? "",
        service_line: data.service_line ?? "",
        status: data.status ?? "draft",
      });
      setLoading(false);
    }

    loadResource();
  }, [id, router]);

  const handleSave = useCallback(async () => {
    if (!form.title_en.trim() && !form.title_nl.trim()) return;

    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("resources")
      .update({
        title_nl: form.title_nl || null,
        title_en: form.title_en || null,
        description_nl: form.description_nl || null,
        description_en: form.description_en || null,
        file_url: form.file_url || null,
        cover_image_url: form.cover_image_url || null,
        service_line: form.service_line || null,
        status: form.status,
      })
      .eq("id", id);

    if (error) {
      console.error("Failed to update resource:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/resources");
  }, [form, id, router]);

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
          onClick={() => router.push("/admin/resources")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resources
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit Resource</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || (!form.title_en.trim() && !form.title_nl.trim())}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Resource"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Title (NL)"
            value={form.title_nl}
            onChange={(e) => updateField("title_nl", e.target.value)}
            placeholder="Nederlandse titel"
          />
          <Input
            label="Title (EN)"
            value={form.title_en}
            onChange={(e) => updateField("title_en", e.target.value)}
            placeholder="English title"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description (NL)
            </label>
            <textarea
              value={form.description_nl}
              onChange={(e) => updateField("description_nl", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Nederlandse beschrijving..."
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description (EN)
            </label>
            <textarea
              value={form.description_en}
              onChange={(e) => updateField("description_en", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="English description..."
            />
          </div>
        </div>

        <Input
          label="File URL"
          value={form.file_url}
          onChange={(e) => updateField("file_url", e.target.value)}
          placeholder="https://..."
        />

        <Input
          label="Cover Image URL"
          value={form.cover_image_url}
          onChange={(e) => updateField("cover_image_url", e.target.value)}
          placeholder="https://..."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Service Line"
            options={SERVICE_OPTIONS}
            value={form.service_line}
            onChange={(e) => updateField("service_line", e.target.value)}
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
