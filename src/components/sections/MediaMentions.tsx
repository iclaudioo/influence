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
    <section className="bg-navy section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light
        />
        <MediaMentionsGrid mentions={mentions as MediaMention[]} />
      </Container>
    </section>
  );
}
