"use client";

import React, { useState, useCallback } from "react";
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

export default function NewCasePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title_nl: "",
    title_en: "",
    slug: "",
    client_name: "",
    client_role: "",
    client_company: "",
    client_logo_url: "",
    client_photo_url: "",
    challenge_nl: "",
    challenge_en: "",
    solution_nl: "",
    solution_en: "",
    results: "",
    quote_nl: "",
    quote_en: "",
    service_line: "",
    cover_image_url: "",
    status: "draft",
    published_at: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = useCallback(async () => {
    if (!form.title_en.trim() && !form.title_nl.trim()) return;

    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let parsedResults = null;
    if (form.results.trim()) {
      try {
        parsedResults = JSON.parse(form.results);
      } catch {
        alert("Invalid JSON in results field");
        setSaving(false);
        return;
      }
    }

    const { error } = await supabase.from("case_studies").insert({
      title_nl: form.title_nl || null,
      title_en: form.title_en || null,
      slug: form.slug || null,
      client_name: form.client_name || null,
      client_role: form.client_role || null,
      client_company: form.client_company || null,
      client_logo_url: form.client_logo_url || null,
      client_photo_url: form.client_photo_url || null,
      challenge_nl: form.challenge_nl || null,
      challenge_en: form.challenge_en || null,
      solution_nl: form.solution_nl || null,
      solution_en: form.solution_en || null,
      results: parsedResults,
      quote_nl: form.quote_nl || null,
      quote_en: form.quote_en || null,
      service_line: form.service_line || null,
      cover_image_url: form.cover_image_url || null,
      status: form.status,
      published_at: form.published_at || null,
    });

    if (error) {
      console.error("Failed to create case study:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/cases");
  }, [form, router]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/cases")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cases
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">New Case Study</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || (!form.title_en.trim() && !form.title_nl.trim())}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Case"}
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

        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          placeholder="case-study-slug"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            label="Client Name"
            value={form.client_name}
            onChange={(e) => updateField("client_name", e.target.value)}
            placeholder="John Doe"
          />
          <Input
            label="Client Role"
            value={form.client_role}
            onChange={(e) => updateField("client_role", e.target.value)}
            placeholder="CEO"
          />
          <Input
            label="Client Company"
            value={form.client_company}
            onChange={(e) => updateField("client_company", e.target.value)}
            placeholder="Acme Inc."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Client Logo URL"
            value={form.client_logo_url}
            onChange={(e) => updateField("client_logo_url", e.target.value)}
            placeholder="https://..."
          />
          <Input
            label="Client Photo URL"
            value={form.client_photo_url}
            onChange={(e) => updateField("client_photo_url", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Challenge (NL)
            </label>
            <textarea
              value={form.challenge_nl}
              onChange={(e) => updateField("challenge_nl", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Beschrijf de uitdaging..."
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Challenge (EN)
            </label>
            <textarea
              value={form.challenge_en}
              onChange={(e) => updateField("challenge_en", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Describe the challenge..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Solution (NL)
            </label>
            <textarea
              value={form.solution_nl}
              onChange={(e) => updateField("solution_nl", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Beschrijf de oplossing..."
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Solution (EN)
            </label>
            <textarea
              value={form.solution_en}
              onChange={(e) => updateField("solution_en", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Describe the solution..."
            />
          </div>
        </div>

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Results (JSON)
          </label>
          <textarea
            value={form.results}
            onChange={(e) => updateField("results", e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-mono text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
            placeholder='[{"label": "Revenue Growth", "value": 45, "suffix": "%"}]'
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Quote (NL)
            </label>
            <textarea
              value={form.quote_nl}
              onChange={(e) => updateField("quote_nl", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Klant citaat..."
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Quote (EN)
            </label>
            <textarea
              value={form.quote_en}
              onChange={(e) => updateField("quote_en", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
              placeholder="Client quote..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <Input
            label="Published At"
            type="date"
            value={form.published_at}
            onChange={(e) => updateField("published_at", e.target.value)}
          />
        </div>

        <Input
          label="Cover Image URL"
          value={form.cover_image_url}
          onChange={(e) => updateField("cover_image_url", e.target.value)}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
