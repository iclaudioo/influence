import { createClient } from "@/lib/supabase/server";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();

  // Try to load existing settings
  const { data: settings } = await supabase
    .from("admin_settings")
    .select("*")
    .single();

  const defaultSettings = {
    sender_name: settings?.sender_name ?? "Influence Circle",
    sender_email: settings?.sender_email ?? "hello@influencecircle.nl",
    company_name: settings?.company_name ?? "Influence Circle",
    company_address: settings?.company_address ?? "",
    company_city: settings?.company_city ?? "",
    company_country: settings?.company_country ?? "Netherlands",
    default_language: settings?.default_language ?? "nl",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and sending preferences
        </p>
      </div>

      {/* Settings navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex gap-6" aria-label="Settings tabs">
          <span className="relative whitespace-nowrap pb-3 text-sm font-medium text-[#02182B]">
            General
            <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#02182B]" />
          </span>
          <a
            href="/admin/settings/team"
            className="whitespace-nowrap pb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Team
          </a>
        </nav>
      </div>

      <SettingsForm initialSettings={defaultSettings} />
    </div>
  );
}
