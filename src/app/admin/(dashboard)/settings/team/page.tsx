import { createClient } from "@/lib/supabase/server";
import TeamManagement from "./TeamManagement";

export default async function TeamSettingsPage() {
  const supabase = await createClient();

  // Get the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // In a real app, you'd have a team_members table.
  // For now we show the current user and an invite flow.
  const currentUser = user
    ? {
        id: user.id,
        email: user.email ?? "",
        role: "owner" as const,
        created_at: user.created_at,
      }
    : null;

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
          <a
            href="/admin/settings"
            className="whitespace-nowrap pb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            General
          </a>
          <span className="relative whitespace-nowrap pb-3 text-sm font-medium text-[#02182B]">
            Team
            <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#02182B]" />
          </span>
        </nav>
      </div>

      <TeamManagement currentUser={currentUser} />
    </div>
  );
}
