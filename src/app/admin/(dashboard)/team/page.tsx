import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";

export const metadata = {
  title: "Team — Influence Circle Admin",
};

const statusVariant = (status: string) => {
  switch (status) {
    case "published":
      return "success" as const;
    case "draft":
      return "default" as const;
    case "archived":
      return "warning" as const;
    default:
      return "default" as const;
  }
};

export default async function TeamPage() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("team_members")
    .select("id, name, role, photo_url, sort_order, status")
    .order("sort_order", { ascending: true });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage team members displayed on the website.
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
        >
          <Plus className="h-4 w-4" />
          New Member
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Photo
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Role
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Sort Order
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members && members.length > 0 ? (
              members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    {m.photo_url ? (
                      <img
                        src={m.photo_url}
                        alt={m.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500">
                        {m.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {m.name}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">
                    {m.role || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {m.sort_order ?? "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant(m.status)}>
                      {m.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/team/${m.id}/edit`}
                      className="text-[#d55d25] hover:text-[#c04d1a] font-medium text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No team members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
