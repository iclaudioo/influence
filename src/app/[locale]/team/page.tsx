import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StructuredData } from "@/components/ui/StructuredData";
import { TeamGridClient } from "./TeamGridClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  const override = await getSeoOverride("/team", locale);

  return buildMetadata({
    title: `${t("title")} | Influence Circle`,
    description: t("description"),
    path: "/team",
    locale,
    override,
  });
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  const supabase = createServiceClient();

  const bioField = locale === "nl" ? "bio_nl" : "bio_en";
  const roleField = locale === "nl" ? "role_nl" : "role_en";

  const { data: members } = await supabase
    .from("team_members")
    .select(`name, ${roleField}, ${bioField}, photo_url, linkedin_url`)
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  type MappedMember = {
    name: string;
    role: string;
    bio: string;
    photoUrl: string | null;
    linkedinUrl: string | null;
  };

  const mappedMembers: MappedMember[] = (members || []).map((m: Record<string, unknown>) => ({
    name: (m.name as string) || "",
    role: (m[roleField] as string) || "",
    bio: (m[bioField] as string) || "",
    photoUrl: (m.photo_url as string) || null,
    linkedinUrl: (m.linkedin_url as string) || null,
  }));

  const structuredDataItems = mappedMembers.map((m: MappedMember) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    image: m.photoUrl || undefined,
    sameAs: m.linkedinUrl ? [m.linkedinUrl] : undefined,
    worksFor: {
      "@type": "Organization",
      name: "Influence Circle",
    },
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("title"),
    description: t("description"),
    url: `https://influencecircle.com${locale === "nl" ? "" : "/en"}/team`,
    mainEntity: structuredDataItems,
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

      {/* Team grid */}
      <section className="section-padding bg-navy">
        <Container>
          <TeamGridClient
            members={mappedMembers}
            viewLinkedInLabel={t("viewLinkedIn")}
          />
        </Container>
      </section>
    </>
  );
}
