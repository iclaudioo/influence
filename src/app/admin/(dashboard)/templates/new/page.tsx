"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, Save } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";
import EmailEditor from "@/components/admin/editor/EmailEditor";
import EmailPreview from "@/components/admin/editor/EmailPreview";

const CATEGORY_OPTIONS = [
  { value: "welcome", label: "Welcome" },
  { value: "drip", label: "Drip" },
  { value: "newsletter", label: "Newsletter" },
  { value: "transactional", label: "Transactional" },
  { value: "promotional", label: "Promotional" },
];

export default function NewTemplatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("welcome");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [html, setHtml] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!name.trim()) return;

    setSaving(true);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("email_templates").insert({
      name,
      category,
      content,
      html,
    });

    if (error) {
      console.error("Failed to create template:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/templates");
  }, [name, category, content, html, router]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/templates")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">New Template</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Template"}
          </button>
        </div>
      </div>

      {/* Template settings */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
        <Input
          label="Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Welcome Email"
        />
        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Editor</h3>
          <EmailEditor content={content} onChange={setContent} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
          <EmailPreview
            html={html}
            subject={name || "Template Preview"}
          />
        </div>
      </div>
    </div>
  );
}
