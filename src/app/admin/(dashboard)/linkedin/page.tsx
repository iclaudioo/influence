import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
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
    .select("id, author_name, post_text, status, sort_order")
    .order("sort_order", { ascending: true });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">LinkedIn</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage featured LinkedIn posts displayed on the website.
          </p>
        </div>
        <Link
          href="/admin/linkedin/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Author
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Post Preview
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
            {posts && posts.length > 0 ? (
              posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {p.author_name || "—"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700 max-w-md">
                    <p className="truncate">
                      {p.post_text
                        ? p.post_text.length > 120
                          ? p.post_text.substring(0, 120) + "..."
                          : p.post_text
                        : "—"}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant(p.status)}>
                      {p.status}
                    </Badge>
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
                  colSpan={4}
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
