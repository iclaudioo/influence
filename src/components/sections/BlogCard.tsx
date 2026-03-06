import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

/* ---------- Service line colors ---------- */

const serviceLineColors: Record<string, string> = {
  labs: "#d55d25",
  circle: "#D7263D",
  studio: "#A855F7",
  academy: "#E8A317",
};

const serviceLineLabels: Record<string, string> = {
  labs: "Influence Labs",
  circle: "Influence Circle",
  studio: "Influence Studio",
  academy: "Influence Academy",
};

/* ---------- Props ---------- */

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string | null;
  authorName: string | null;
  publishedAt: string | null;
  serviceLine: string | null;
  readTime: number | null;
  locale: string;
}

/* ---------- Component ---------- */

export function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  category,
  authorName,
  publishedAt,
  serviceLine,
  readTime,
  locale,
}: BlogCardProps) {
  const serviceColor = serviceLine
    ? serviceLineColors[serviceLine] ?? "#d55d25"
    : null;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(locale === "nl" ? "nl-BE" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const hoverColor = serviceColor || "#d55d25";

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0a2540] transition-all duration-500 hover:border-white/20 hover:-translate-y-1.5"
      style={{
        "--card-hover-color": hoverColor,
      } as React.CSSProperties}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center" style={{
            background: serviceColor
              ? `linear-gradient(135deg, ${serviceColor}15, transparent 60%)`
              : "linear-gradient(135deg, rgba(213,93,37,0.08), transparent 60%)",
          }}>
            <span className="text-5xl font-serif italic text-white/10 select-none">IC</span>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${hoverColor}30, transparent 60%)`,
          }}
        />
      </div>

      {/* Accent line */}
      {serviceColor && (
        <div
          className="h-px w-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, ${serviceColor}, transparent)` }}
        />
      )}

      {/* Content */}
      <div className="p-5">
        {/* Badges */}
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          {serviceLine && serviceColor && (
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
              style={{ backgroundColor: serviceColor }}
            >
              {serviceLineLabels[serviceLine] ?? serviceLine}
            </span>
          )}
          {category && (
            <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
              {category}
            </span>
          )}
        </div>

        {/* Title — hover uses service line color */}
        <h3 className="text-lg font-bold text-white transition-colors duration-300 line-clamp-2">
          <span className="group-hover:text-[var(--card-hover-color)] transition-colors duration-300">
            {title}
          </span>
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-sm text-white/60 line-clamp-2">{excerpt}</p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-3 text-xs text-white/40">
          {authorName && <span>{authorName}</span>}
          {authorName && formattedDate && (
            <span className="h-1 w-1 rounded-full bg-white/30" />
          )}
          {formattedDate && <span>{formattedDate}</span>}
          {(authorName || formattedDate) && readTime && (
            <span className="h-1 w-1 rounded-full bg-white/30" />
          )}
          {readTime && (
            <span>
              {readTime} min {locale === "nl" ? "leestijd" : "read"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
