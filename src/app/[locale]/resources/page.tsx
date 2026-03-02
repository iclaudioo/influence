import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResourceCard } from "@/components/sections/ResourceCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  const override = await getSeoOverride("/resources", locale);

  return buildMetadata({
    title: `${t("title")} | Influence Circle`,
    description: t("description"),
    path: "/resources",
    locale,
    override,
  });
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  const supabase = createServiceClient();

  const { data: resources, error } = await supabase
    .from("lead_magnets")
    .select(
      "id, title, description, cover_image_url, service, download_count, file_url",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Hero */}
      <section className="bg-navy min-h-[40vh] flex items-center pt-24 pb-12">
        <Container>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            light
          />
        </Container>
      </section>

      {/* Resources Grid */}
      <section className="bg-navy section-padding">
        <Container>
          {!resources || resources.length === 0 ? (
            <p className="text-white/60 text-center py-12">
              {t("noResources")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource: { id: string; title: string; description: string; cover_image_url: string | null; service: string | null; download_count: number; file_url: string }) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
