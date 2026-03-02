import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseCard } from "@/components/sections/CaseCard";
import { Link } from "@/i18n/navigation";
import { FeaturedCasesAnimated } from "./FeaturedCasesAnimated";
import type { ServiceLine } from "@/lib/constants";

type FeaturedCasesProps = {
  serviceLine?: ServiceLine;
  limit?: number;
};

export async function FeaturedCases({
  serviceLine,
  limit = 3,
}: FeaturedCasesProps) {
  const supabase = createServiceClient();
  const t = await getTranslations("featuredCases");
  const locale = await getLocale();

  let query = supabase
    .from("case_studies")
    .select(
      "slug, title, client_name, client_role, client_company, client_logo_url, headline_result, service_line",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (serviceLine) {
    query = query.eq("service_line", serviceLine);
  }

  const { data: cases, error } = await query;

  if (error || !cases || cases.length === 0) {
    return null;
  }

  return (
    <section className="bg-navy section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light
        />
        <FeaturedCasesAnimated>
          {cases.map((c: { slug: string; title: string; client_name: string; client_role: string; client_company: string; client_logo_url: string | null; headline_result: string; service_line: string }) => (
            <CaseCard
              key={c.slug}
              slug={c.slug}
              title={c.title}
              clientName={c.client_name}
              clientRole={c.client_role}
              clientCompany={c.client_company}
              clientLogoUrl={c.client_logo_url}
              headlineResult={c.headline_result}
              serviceLine={c.service_line as ServiceLine}
              locale={locale}
            />
          ))}
        </FeaturedCasesAnimated>
        <div className="mt-12 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            {t("viewAll")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
