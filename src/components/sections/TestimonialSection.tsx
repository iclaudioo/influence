import { getLocale, getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { TestimonialCarousel } from "./TestimonialCarousel";

type Props = {
  serviceLine?: string;
};

export async function TestimonialSection({ serviceLine }: Props) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "testimonial" });
  const supabase = createServiceClient();

  let query = supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order");

  if (serviceLine) {
    query = query.eq("service_line", serviceLine);
  }

  const { data: dbTestimonials } = await query;

  // Map DB rows to locale-aware testimonials
  const testimonials =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials.map((row: { id: string; quote_nl: string; quote_en: string; name: string; title: string; company: string; avatar_url: string | null }) => ({
          id: row.id,
          quote: locale === "nl" ? row.quote_nl : row.quote_en,
          name: row.name,
          title: row.title,
          company: row.company,
          avatar_url: row.avatar_url,
        }))
      : [
          {
            id: "fallback",
            quote: t("quote"),
            name: t("name"),
            title: t("title"),
            company: t("company"),
            avatar_url: null,
          },
        ];

  return (
    <section className="bg-cream section-padding relative overflow-hidden">
      {/* Top gradient bridge from dark */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-navy/8 to-transparent pointer-events-none" />
      {/* Subtle decorative elements */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(213,93,37,0.05) 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 60%)" }}
      />
      {/* Bottom gradient bridge to dark */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-navy/8 to-transparent pointer-events-none" />

      <Container>
        <TestimonialCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
