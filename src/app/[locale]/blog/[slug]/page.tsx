import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { StructuredData } from "@/components/ui/StructuredData";
import { TipTapRenderer, TipTapNode } from "@/components/ui/TipTapRenderer";
import { CTABanner } from "@/components/sections/CTABanner";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogArticleClient } from "./BlogArticleClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SocialShare } from "@/components/ui/SocialShare";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { colors } from "@/lib/constants";
import type { ServiceLine } from "@/lib/constants";

/* ---------- Types ---------- */

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/* ---------- Metadata ---------- */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = createServiceClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title_nl, title_en, excerpt_nl, excerpt_en, cover_image_url, meta_title, meta_description")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    return buildMetadata({
      title: "Blog — Influence Circle",
      description: "Blog article",
      path: `/blog/${slug}`,
      locale,
    });
  }

  const title =
    locale === "nl"
      ? (post.title_nl ?? post.title_en)
      : (post.title_en ?? post.title_nl);
  const excerpt =
    locale === "nl"
      ? (post.excerpt_nl ?? post.excerpt_en)
      : (post.excerpt_en ?? post.excerpt_nl);

  return buildMetadata({
    title: post.meta_title ?? `${title} — Influence Circle`,
    description: post.meta_description ?? excerpt ?? "",
    path: `/blog/${slug}`,
    locale,
    ogImage: post.cover_image_url ?? undefined,
  });
}

/* ---------- Page ---------- */

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const supabase = createServiceClient();
  const t = await getTranslations({ locale, namespace: "blog" });

  // Fetch post with author join
  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      "*, author:team_members(id, name, role_nl, role_en, photo_url, linkedin_url)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  const title =
    locale === "nl"
      ? (post.title_nl ?? post.title_en)
      : (post.title_en ?? post.title_nl);
  const excerpt =
    locale === "nl"
      ? (post.excerpt_nl ?? post.excerpt_en)
      : (post.excerpt_en ?? post.excerpt_nl);
  const content =
    locale === "nl"
      ? (post.content_nl ?? post.content_en)
      : (post.content_en ?? post.content_nl);

  const author = post.author as unknown as {
    id: string;
    name: string;
    role_nl: string | null;
    role_en: string | null;
    photo_url: string | null;
    linkedin_url: string | null;
  } | null;

  const authorRole =
    locale === "nl"
      ? (author?.role_nl ?? author?.role_en)
      : (author?.role_en ?? author?.role_nl);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        locale === "nl" ? "nl-BE" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : null;

  // Fetch related articles (same service line, different slug)
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title_nl, title_en, excerpt_nl, excerpt_en, cover_image_url, category, service_line, read_time, published_at, author:team_members(name)"
    )
    .eq("status", "published")
    .eq("service_line", post.service_line ?? "")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(3);

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://influencecircle.com";
  const articleUrl = `${BASE_URL}${locale === "nl" ? "" : "/en"}/blog/${slug}`;

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    url: articleUrl,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: author.linkedin_url ?? undefined,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Influence Circle",
      url: BASE_URL,
    },
  };

  return (
    <>
      <StructuredData data={articleStructuredData} />

      {/* Reading progress */}
      <ReadingProgress color={colors[(post.service_line as ServiceLine) || "labs"] || colors.labs} />

      {/* Track view on client */}
      <BlogArticleClient slug={slug} />

      {/* Cover image */}
      {post.cover_image_url && (
        <section className="relative h-[50vh] min-h-[400px] w-full bg-navy pt-20">
          <Image
            src={post.cover_image_url}
            alt={title ?? ""}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02182B] via-[#02182B]/50 to-transparent" />
        </section>
      )}

      {/* Article content */}
      <section className={`bg-navy ${post.cover_image_url ? "-mt-32 relative z-10" : "pt-32"} pb-16`}>
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: title ?? "" },
              ]}
            />

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {title}
            </h1>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
              {formattedDate && <span>{formattedDate}</span>}
              {post.read_time && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>
                    {post.read_time} min {locale === "nl" ? "leestijd" : "read"}
                  </span>
                </>
              )}
              {post.category && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
                    {post.category}
                  </span>
                </>
              )}
            </div>

            {/* Author card */}
            {author && (
              <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                {author.photo_url && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={author.photo_url}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-white">{author.name}</p>
                  {authorRole && (
                    <p className="text-sm text-white/50">{authorRole}</p>
                  )}
                </div>
                {author.linkedin_url && (
                  <a
                    href={author.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto shrink-0 rounded-lg border border-white/10 p-2 text-white/50 transition-colors hover:border-white/20 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Social share */}
            <div className="mt-8">
              <SocialShare url={articleUrl} title={title ?? ""} />
            </div>

            {/* Divider */}
            <hr className="my-10 border-t border-white/10" />

            {/* Article body */}
            <article className="prose-custom">
              <TipTapRenderer content={content as unknown as TipTapNode | null} />
            </article>
          </div>
        </Container>
      </section>

      {/* Related articles */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-navy section-padding border-t border-white/5">
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-white">
              {locale === "nl" ? "Gerelateerde artikelen" : "Related articles"}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp: { id: string; slug: string; title_nl: string | null; title_en: string | null; excerpt_nl: string | null; excerpt_en: string | null; cover_image_url: string | null; category: string | null; service_line: string | null; read_time: number | null; published_at: string | null; author: unknown }) => {
                const rpTitle =
                  locale === "nl"
                    ? (rp.title_nl ?? rp.title_en)
                    : (rp.title_en ?? rp.title_nl);
                const rpExcerpt =
                  locale === "nl"
                    ? (rp.excerpt_nl ?? rp.excerpt_en)
                    : (rp.excerpt_en ?? rp.excerpt_nl);
                const rpAuthor = rp.author as { name: string } | null;

                return (
                  <BlogCard
                    key={rp.id}
                    slug={rp.slug}
                    title={rpTitle ?? ""}
                    excerpt={rpExcerpt ?? ""}
                    coverImage={rp.cover_image_url}
                    category={rp.category}
                    authorName={rpAuthor?.name ?? null}
                    publishedAt={rp.published_at}
                    serviceLine={rp.service_line}
                    readTime={rp.read_time}
                    locale={locale}
                  />
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CTABanner />
    </>
  );
}
