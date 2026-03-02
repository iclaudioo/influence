import type { MetadataRoute } from "next";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://influencecircle.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServiceClient();

  // Static pages
  const staticPages = [
    "/",
    "/labs",
    "/circle",
    "/studio",
    "/academy",
    "/about",
    "/contact",
    "/blog",
    "/cases",
    "/team",
    "/resources",
    "/tools/visibility-score",
    "/tools/roi-calculator",
    "/privacy",
    "/terms",
  ];

  const locales = ["nl", "en"];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${locale === "nl" ? "" : "/en"}${page === "/" ? "" : page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          nl: `${BASE_URL}${page === "/" ? "" : page}`,
          en: `${BASE_URL}/en${page === "/" ? "" : page}`,
        },
      },
    })),
  );

  // Published blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published");

  const blogEntries: MetadataRoute.Sitemap = (blogPosts || []).flatMap(
    (post: { slug: string; updated_at: string }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}${locale === "nl" ? "" : "/en"}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            nl: `${BASE_URL}/blog/${post.slug}`,
            en: `${BASE_URL}/en/blog/${post.slug}`,
          },
        },
      })),
  );

  // Published case studies
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("slug, updated_at")
    .eq("status", "published");

  const caseEntries: MetadataRoute.Sitemap = (caseStudies || []).flatMap(
    (cs: { slug: string; updated_at: string }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}${locale === "nl" ? "" : "/en"}/cases/${cs.slug}`,
        lastModified: new Date(cs.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            nl: `${BASE_URL}/cases/${cs.slug}`,
            en: `${BASE_URL}/en/cases/${cs.slug}`,
          },
        },
      })),
  );

  return [...staticEntries, ...blogEntries, ...caseEntries];
}
