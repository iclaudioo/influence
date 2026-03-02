import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/sections/BlogCard";
import { Link } from "@/i18n/navigation";
import { BlogPreviewAnimated } from "./BlogPreviewAnimated";
import type { ServiceLine } from "@/lib/constants";

type BlogPreviewProps = {
  serviceLine?: ServiceLine;
  limit?: number;
};

export async function BlogPreview({
  serviceLine,
  limit = 3,
}: BlogPreviewProps) {
  const supabase = createServiceClient();
  const t = await getTranslations("blogPreview");
  const locale = await getLocale();

  let query = supabase
    .from("blog_posts")
    .select(
      "slug, title, excerpt, cover_image_url, category, service_line, read_time_minutes, published_at, author:team_members(name)",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (serviceLine) {
    query = query.eq("service_line", serviceLine);
  }

  const { data: posts, error } = await query;

  if (error || !posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-off-white section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light={false}
        />
        <BlogPreviewAnimated>
          {posts.map((post: { slug: string; title: string; excerpt: string; cover_image_url: string | null; category: string | null; service_line: string | null; read_time_minutes: number | null; published_at: string | null; author: unknown }) => {
            const authorName =
              post.author && typeof post.author === "object" && "name" in post.author
                ? (post.author as { name: string }).name
                : null;

            return (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.cover_image_url}
                category={post.category}
                authorName={authorName}
                publishedAt={post.published_at}
                serviceLine={post.service_line}
                readTime={post.read_time_minutes}
                locale={locale}
              />
            );
          })}
        </BlogPreviewAnimated>
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy/70 hover:text-navy transition-colors text-sm font-medium"
          >
            {t("viewAll")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
