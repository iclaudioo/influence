import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StructuredData } from "@/components/ui/StructuredData";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/constants";
import type { ServiceLine } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SocialShare } from "@/components/ui/SocialShare";
import { CaseDetailClient } from "./CaseDetailClient";

async function getCase(slug: string) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = await getCase(slug);
  if (!cs) return {};

  const title = locale === "nl" ? cs.title_nl : cs.title_en;
  const description =
    locale === "nl" ? cs.challenge_nl : cs.challenge_en;
  const override = await getSeoOverride(`/cases/${slug}`, locale);

  return buildMetadata({
    title: `${title} | Influence Circle`,
    description: description?.substring(0, 160) || "",
    path: `/cases/${slug}`,
    locale,
    override,
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = await getCase(slug);
  if (!cs) notFound();

  const t = await getTranslations({ locale, namespace: "cases" });

  const title = locale === "nl" ? cs.title_nl : cs.title_en;
  const challenge = locale === "nl" ? cs.challenge_nl : cs.challenge_en;
  const solution = locale === "nl" ? cs.solution_nl : cs.solution_en;
  const quote = locale === "nl" ? cs.quote_nl : cs.quote_en;
  const serviceLine = (cs.service_line as ServiceLine) || "labs";
  const accentColor = colors[serviceLine] || colors.labs;

  // Parse results JSONB
  let results: { label: string; value: number; suffix: string }[] = [];
  if (cs.results) {
    try {
      results = typeof cs.results === "string" ? JSON.parse(cs.results) : cs.results;
    } catch {
      results = [];
    }
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://influencecircle.com";
  const caseUrl = `${BASE_URL}${locale === "nl" ? "" : "/en"}/cases/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: challenge?.substring(0, 160) || "",
    author: {
      "@type": "Organization",
      name: "Influence Circle",
    },
    publisher: {
      "@type": "Organization",
      name: "Influence Circle",
      url: "https://influencecircle.com",
    },
    url: `https://influencecircle.com${locale === "nl" ? "" : "/en"}/cases/${slug}`,
  };

  return (
    <>
      <StructuredData data={structuredData} />

      {/* Breadcrumb */}
      <div className="bg-navy pt-24 pb-0">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Cases", href: "/cases" },
              { label: title ?? "" },
            ]}
          />
        </div>
      </div>

      <CaseDetailClient
        title={title}
        clientName={cs.client_name}
        clientRole={cs.client_role}
        clientCompany={cs.client_company}
        clientLogoUrl={cs.client_logo_url}
        challenge={challenge}
        solution={solution}
        quote={quote}
        results={results}
        accentColor={accentColor}
        challengeLabel={t("challenge")}
        approachLabel={t("approach")}
        resultsLabel={t("results")}
        similarResultLabel={t("similarResult")}
        bookCallLabel={t("bookCall")}
      />

      {/* Social share */}
      <div className="bg-navy section-padding">
        <div className="mx-auto max-w-7xl px-6">
          <SocialShare url={caseUrl} title={title ?? ""} />
        </div>
      </div>
    </>
  );
}
