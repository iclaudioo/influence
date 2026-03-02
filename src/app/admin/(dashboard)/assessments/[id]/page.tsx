import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";

interface AssessmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AssessmentDetailPageProps) {
  const { id } = await params;
  return {
    title: `Assessment ${id} — Influence Circle Admin`,
  };
}

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

export default async function AssessmentDetailPage({
  params,
}: AssessmentDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: submission, error } = await supabase
    .from("assessment_submissions")
    .select("*, contacts(id, name, email, company, phone)")
    .eq("id", id)
    .single();

  if (error || !submission) {
    notFound();
  }

  const contact = submission.contacts as unknown as {
    id: string;
    name: string;
    email: string;
    company: string | null;
    phone: string | null;
  } | null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/assessments"
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assessments
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Assessment Detail
          </h1>
          <Badge variant={toolTypeVariant(submission.tool_type)}>
            {submission.tool_type}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Contact Information
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {contact?.name ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {contact?.email ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {contact?.company ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {contact?.phone ?? "—"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Score & Metadata */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Score & Details
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </dt>
              <dd className="mt-0.5 text-2xl font-bold text-[#02182B]">
                {submission.score ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tool Type
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {submission.tool_type}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted At
              </dt>
              <dd className="mt-0.5 text-sm text-gray-900">
                {submission.created_at
                  ? new Date(submission.created_at).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Results */}
      {submission.results && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Results</h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-800 font-mono whitespace-pre-wrap">
            {JSON.stringify(submission.results, null, 2)}
          </pre>
        </div>
      )}

      {/* Full Answers */}
      {submission.answers && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Full Answers
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-800 font-mono whitespace-pre-wrap">
            {JSON.stringify(submission.answers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
