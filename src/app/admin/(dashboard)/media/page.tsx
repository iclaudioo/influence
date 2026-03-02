import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";

export const metadata = {
  title: "Media — Influence Circle Admin",
};

const typeVariant = (type: string) => {
  switch (type) {
    case "press":
      return "info" as const;
    case "podcast":
      return "success" as const;
    case "speaking":
      return "warning" as const;
    default:
      return "default" as const;
  }
};

export default async function MediaPage() {
  const supabase = await createClient();

  const { data: mentions } = await supabase
    .from("media_mentions")
    .select("id, outlet_name, logo_url, title, url, mention_date, type, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage media mentions, press coverage, and speaking appearances.
          </p>
        </div>
        <Link
          href="/admin/media/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
        >
          <Plus className="h-4 w-4" />
          New Mention
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Logo
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Outlet
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Type
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                URL
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mentions && mentions.length > 0 ? (
              mentions.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    {m.logo_url ? (
                      <img
                        src={m.logo_url}
                        alt={m.outlet_name}
                        className="h-8 w-8 rounded object-contain"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-xs font-semibold text-gray-500">
                        {m.outlet_name?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {m.outlet_name || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={typeVariant(m.type)}>
                      {m.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {m.mention_date
                      ? new Date(m.mention_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    {m.url ? (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm truncate block max-w-[200px]"
                      >
                        {m.url}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/media/${m.id}/edit`}
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
                  No media mentions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
