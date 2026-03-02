import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisibilityWizard } from "@/components/tools/VisibilityWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visibilityScore" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function VisibilityScorePage() {
  const t = await getTranslations("visibilityScore");

  return (
    <section className="bg-navy section-padding pt-32 min-h-screen">
      <Container>
        <div className="mb-16">
          <SectionHeading
            eyebrow={t("title")}
            title={t("description")}
            centered
            light
            accentColor="#d55d25"
          />
        </div>
        <VisibilityWizard />
      </Container>
    </section>
  );
}
