"use client";

import React, { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Save, Building2, Mail, Globe } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";
import { useToast } from "@/components/admin/ui/Toast";

interface SettingsData {
  sender_name: string;
  sender_email: string;
  company_name: string;
  company_address: string;
  company_city: string;
  company_country: string;
  default_language: string;
}

interface SettingsFormProps {
  initialSettings: SettingsData;
}

const LANGUAGE_OPTIONS = [
  { value: "nl", label: "Nederlands" },
  { value: "en", label: "English" },
];

const COUNTRY_OPTIONS = [
  { value: "Netherlands", label: "Netherlands" },
  { value: "Belgium", label: "Belgium" },
  { value: "Germany", label: "Germany" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "France", label: "France" },
  { value: "United States", label: "United States" },
];

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const update = (field: keyof SettingsData, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = useCallback(async () => {
    setSaving(true);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("admin_settings").upsert(
      {
        id: "default",
        ...settings,
      },
      { onConflict: "id" }
    );

    setSaving(false);

    if (error) {
      toast("error", "Failed to save settings. Please try again.");
      return;
    }

    toast("success", "Settings saved successfully.");
  }, [settings, toast]);

  return (
    <div className="max-w-2xl space-y-8">
      {/* Sender settings */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
            <Mail className="h-4 w-4 text-[#d55d25]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Sender Information
            </h2>
            <p className="text-xs text-gray-500">
              This appears as the &quot;From&quot; in your emails
            </p>
          </div>
        </div>
        <div className="space-y-4 px-6 py-5">
          <Input
            label="Sender Name"
            value={settings.sender_name}
            onChange={(e) => update("sender_name", e.target.value)}
            placeholder="e.g. Influence Circle"
          />
          <Input
            label="Sender Email"
            type="email"
            value={settings.sender_email}
            onChange={(e) => update("sender_email", e.target.value)}
            placeholder="e.g. hello@influencecircle.nl"
          />
        </div>
      </section>

      {/* Company info */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02182B]/5">
            <Building2 className="h-4 w-4 text-[#02182B]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Company Information
            </h2>
            <p className="text-xs text-gray-500">
              Used in email footers for CAN-SPAM / GDPR compliance
            </p>
          </div>
        </div>
        <div className="space-y-4 px-6 py-5">
          <Input
            label="Company Name"
            value={settings.company_name}
            onChange={(e) => update("company_name", e.target.value)}
            placeholder="e.g. Influence Circle B.V."
          />
          <Input
            label="Address"
            value={settings.company_address}
            onChange={(e) => update("company_address", e.target.value)}
            placeholder="e.g. Keizersgracht 123"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={settings.company_city}
              onChange={(e) => update("company_city", e.target.value)}
              placeholder="e.g. Amsterdam"
            />
            <Select
              label="Country"
              options={COUNTRY_OPTIONS}
              value={settings.company_country}
              onChange={(e) => update("company_country", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Language */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
            <Globe className="h-4 w-4 text-[#A855F7]" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Default Language
            </h2>
            <p className="text-xs text-gray-500">
              Default language for new contacts and emails
            </p>
          </div>
        </div>
        <div className="px-6 py-5">
          <Select
            label="Language"
            options={LANGUAGE_OPTIONS}
            value={settings.default_language}
            onChange={(e) => update("default_language", e.target.value)}
          />
        </div>
      </section>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
