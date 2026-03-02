import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StructuredData } from "@/components/ui/StructuredData";
import { CaseFilterClient } from "./CaseFilterClient";
import type { ServiceLine } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  const override = await getSeoOverride("/cases", locale);

  return buildMetadata({
    title: `${t("title")} | Influence Circle`,
    description: t("description"),
    path: "/cases",
    locale,
    override,
  });
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  const supabase = createServiceClient();

  const titleField = locale === "nl" ? "title_nl" : "title_en";
  const headlineField = locale === "nl" ? "headline_result_nl" : "headline_result_en";

  const { data: cases } = await supabase
    .from("case_studies")
    .select(
      `slug, ${titleField}, ${headlineField}, client_name, client_role, client_company, client_logo_url, service_line`
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const mappedCases = (cases || []).map((cs: Record<string, unknown>) => ({
    slug: cs.slug as string,
    title: (cs[titleField] as string) || "",
    clientName: (cs.client_name as string) || "",
    clientRole: (cs.client_role as string) || "",
    clientCompany: (cs.client_company as string) || "",
    clientLogoUrl: (cs.client_logo_url as string) || null,
    headlineResult: (cs[headlineField] as string) || "",
    serviceLine: (cs.service_line as ServiceLine) || "labs",
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("description"),
    url: `https://influencecircle.com${locale === "nl" ? "" : "/en"}/cases`,
  };

  return (
    <>
      <StructuredData data={structuredData} />

      {/* Hero */}
      <section className="bg-navy min-h-[40vh] flex items-center pt-24 pb-12">
        <Container>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Container>
      </section>

      {/* Cases */}
      <section className="section-padding bg-navy">
        <Container>
          <CaseFilterClient cases={mappedCases} locale={locale} />
        </Container>
      </section>
    </>
  );
}
