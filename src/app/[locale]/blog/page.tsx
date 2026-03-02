import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StructuredData } from "@/components/ui/StructuredData";
import { BlogCard } from "@/components/sections/BlogCard";

/* ---------- Metadata ---------- */

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const override = await getSeoOverride("/blog", locale);

  return buildMetadata({
    title: locale === "nl" ? "Blog — Influence Circle" : "Blog — Influence Circle",
    description:
      locale === "nl"
        ? "Ontdek inzichten, trends en strategieën over personal branding, thought leadership en reputatiemanagement."
        : "Discover insights, trends and strategies on personal branding, thought leadership and reputation management.",
    path: "/blog",
    locale,
    override,
  });
}

/* ---------- Page ---------- */

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const supabase = createServiceClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title_nl, title_en, excerpt_nl, excerpt_en, cover_image_url, category, service_line, read_time, published_at, author:team_members(name)"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://influencecircle.com";

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Influence Circle Blog",
    url: `${BASE_URL}${locale === "nl" ? "" : "/en"}/blog`,
    description:
      locale === "nl"
        ? "Inzichten over personal branding en thought leadership"
        : "Insights on personal branding and thought leadership",
    publisher: {
      "@type": "Organization",
      name: "Influence Circle",
      url: BASE_URL,
    },
  };

  return (
    <>
      <StructuredData data={blogStructuredData} />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-16">
        <Container>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            centered
            light
            accentColor="#d55d25"
          />
        </Container>
      </section>

      {/* Posts grid */}
      <section className="bg-navy section-padding">
        <Container>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: { id: string; slug: string; title_nl: string | null; title_en: string | null; excerpt_nl: string | null; excerpt_en: string | null; cover_image_url: string | null; category: string | null; service_line: string | null; read_time: number | null; published_at: string | null; author: unknown }) => {
                const title =
                  locale === "nl"
                    ? (post.title_nl ?? post.title_en)
                    : (post.title_en ?? post.title_nl);
                const excerpt =
                  locale === "nl"
                    ? (post.excerpt_nl ?? post.excerpt_en)
                    : (post.excerpt_en ?? post.excerpt_nl);
                const author = post.author as { name: string } | null;

                return (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={title ?? ""}
                    excerpt={excerpt ?? ""}
                    coverImage={post.cover_image_url}
                    category={post.category}
                    authorName={author?.name ?? null}
                    publishedAt={post.published_at}
                    serviceLine={post.service_line}
                    readTime={post.read_time}
                    locale={locale}
                  />
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-white/50">{t("noPosts")}</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
