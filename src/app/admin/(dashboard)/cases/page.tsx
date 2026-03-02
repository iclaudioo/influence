import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";

export const metadata = {
  title: "Cases — Influence Circle Admin",
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

const serviceColors: Record<string, string> = {
  "executive-positioning": "bg-blue-100 text-blue-700",
  "thought-leadership": "bg-purple-100 text-purple-700",
  "corporate-influence": "bg-indigo-100 text-indigo-700",
  "personal-branding": "bg-pink-100 text-pink-700",
};

export default async function CasesPage() {
  const supabase = await createClient();

  const { data: cases } = await supabase
    .from("case_studies")
    .select("id, title_nl, title_en, client_name, service_line, status, published_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cases</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage case studies and client success stories.
          </p>
        </div>
        <Link
          href="/admin/cases/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
        >
          <Plus className="h-4 w-4" />
          New Case
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Client
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Service
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Published
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cases && cases.length > 0 ? (
              cases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {c.title_en || c.title_nl || "Untitled"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">
                    {c.client_name || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    {c.service_line ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          serviceColors[c.service_line] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {c.service_line}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant(c.status)}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {c.published_at
                      ? new Date(c.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/cases/${c.id}/edit`}
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
                  No case studies yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
