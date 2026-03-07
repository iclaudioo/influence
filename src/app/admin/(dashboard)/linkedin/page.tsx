import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Badge from "@/components/admin/ui/Badge";

export const metadata = {
  title: "LinkedIn — Influence Circle Admin",
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

export default async function LinkedInPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("linkedin_posts")
    .select("id, content, hook, hashtags, topic, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">LinkedIn</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage LinkedIn posts generated via Telegram bot.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Hook
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Topic
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Aangemaakt
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Acties
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts && posts.length > 0 ? (
              posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-900 max-w-xs">
                    <p className="truncate">
                      {p.hook
                        ? p.hook.length > 80
                          ? p.hook.substring(0, 80) + "..."
                          : p.hook
                        : "—"}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">
                    {p.topic || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant(p.status)}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString("nl-BE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/linkedin/${p.id}/edit`}
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
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No LinkedIn posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
