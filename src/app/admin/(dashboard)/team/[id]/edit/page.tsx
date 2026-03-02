"use client";

import React, { useState, useEffect, useCallback, use } from "react";
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

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    linkedin_url: "",
    sort_order: "0",
    status: "draft",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function loadMember() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data } = await supabase
        .from("team_members")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) {
        router.push("/admin/team");
        return;
      }

      setForm({
        name: data.name ?? "",
        role: data.role ?? "",
        bio: data.bio ?? "",
        photo_url: data.photo_url ?? "",
        linkedin_url: data.linkedin_url ?? "",
        sort_order: String(data.sort_order ?? 0),
        status: data.status ?? "draft",
      });
      setLoading(false);
    }

    loadMember();
  }, [id, router]);

  const handleSave = useCallback(async () => {
    if (!form.name.trim()) return;

    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("team_members")
      .update({
        name: form.name,
        role: form.role || null,
        bio: form.bio || null,
        photo_url: form.photo_url || null,
        linkedin_url: form.linkedin_url || null,
        sort_order: parseInt(form.sort_order, 10) || 0,
        status: form.status,
      })
      .eq("id", id);

    if (error) {
      console.error("Failed to update team member:", error);
      setSaving(false);
      return;
    }

    router.push("/admin/team");
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
          onClick={() => router.push("/admin/team")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit Team Member</h1>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !form.name.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Member"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl space-y-6">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Full name"
        />

        <Input
          label="Role"
          value={form.role}
          onChange={(e) => updateField("role", e.target.value)}
          placeholder="e.g. Managing Partner"
        />

        <div className="w-full">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#02182B] focus:ring-[#02182B]/20"
            placeholder="Short biography..."
          />
        </div>

        <Input
          label="Photo URL"
          value={form.photo_url}
          onChange={(e) => updateField("photo_url", e.target.value)}
          placeholder="https://..."
        />

        <Input
          label="LinkedIn URL"
          value={form.linkedin_url}
          onChange={(e) => updateField("linkedin_url", e.target.value)}
          placeholder="https://linkedin.com/in/..."
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
