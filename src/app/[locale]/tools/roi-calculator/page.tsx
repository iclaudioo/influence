import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROICalculator } from "@/components/tools/ROICalculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roiCalculator" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ROICalculatorPage() {
  const t = await getTranslations("roiCalculator");

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
        <ROICalculator />
      </Container>
    </section>
  );
}
