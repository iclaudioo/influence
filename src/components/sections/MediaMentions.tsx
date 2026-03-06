import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaMentionsGrid } from "./MediaMentionsGrid";

type MediaMention = {
  id: string;
  name: string;
  logo_url: string;
  url: string;
  sort_order: number;
};

export async function MediaMentions() {
  const supabase = createServiceClient();
  const t = await getTranslations("media");

  const { data: mentions, error } = await supabase
    .from("media_mentions")
    .select("id, name, logo_url, url, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !mentions || mentions.length === 0) {
    return null;
  }

  return (
    <section className="bg-navy section-padding relative overflow-hidden">
      {/* Bottom gradient bridge to cream */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream/8 to-transparent pointer-events-none" />
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light
          size="sm"
        />
        <MediaMentionsGrid mentions={mentions as MediaMention[]} />
      </Container>
    </section>
  );
}
