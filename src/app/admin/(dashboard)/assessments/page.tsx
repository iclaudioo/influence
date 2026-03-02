import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Badge from "@/components/admin/ui/Badge";

export const metadata = {
  title: "Assessments — Influence Circle Admin",
};

const toolTypeVariant = (type: string) => {
  switch (type) {
    case "influence-scan":
      return "info" as const;
    case "leadership-assessment":
      return "success" as const;
    case "brand-audit":
      return "warning" as const;
    default:
      return "default" as const;
  }
};

export default async function AssessmentsPage() {
  const supabase = await createClient();

  const { data: submissions } = await supabase
    .from("assessment_submissions")
    .select("id, tool_type, score, created_at, contact_id, contacts(email)")
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-sm text-gray-500 mt-1">
            View assessment submissions and scores.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Contact Email
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Tool Type
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Score
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions && submissions.length > 0 ? (
              submissions.map((s) => {
                const contact = s.contacts as unknown as { email: string } | null;
                return (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/assessments/${s.id}`}
                        className="text-[#d55d25] hover:text-[#c04d1a] font-medium"
                      >
                        {contact?.email ?? "Unknown"}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={toolTypeVariant(s.tool_type)}>
                        {s.tool_type}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">
                      {s.score ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">
                      {s.created_at
                        ? new Date(s.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No assessment submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
