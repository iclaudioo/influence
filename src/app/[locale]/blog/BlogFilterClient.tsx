"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/sections/BlogCard";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { colors } from "@/lib/constants";
import type { ServiceLine } from "@/lib/constants";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string | null;
  serviceLine: string | null;
  readTime: number | null;
  publishedAt: string | null;
  authorName: string | null;
};

type Props = {
  posts: BlogPost[];
  locale: string;
};

const SERVICE_TABS: { key: ServiceLine | "all"; label: string; color?: string }[] = [
  { key: "all", label: "all" },
  { key: "labs", label: "Influence Labs", color: colors.labs },
  { key: "circle", label: "Influence Circle", color: colors.circle },
  { key: "studio", label: "Influence Studio", color: colors.studio },
  { key: "academy", label: "Influence Academy", color: colors.academy },
];

export function BlogFilterClient({ posts, locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<ServiceLine | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("blogFilter");

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return posts.filter((p) => {
      const matchesService =
        activeFilter === "all" || p.serviceLine === activeFilter;
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query);
      return matchesService && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("search")}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/20"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {SERVICE_TABS.map((tab) => {
          const isActive = activeFilter === tab.key;
          const label = tab.key === "all" ? t("all") : tab.label;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-white/60 border border-white/10 hover:border-white/30"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: tab.color || "#ffffff20",
                      boxShadow: tab.color ? `0 0 20px ${tab.color}30` : undefined,
                    }
                  : undefined
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Posts grid */}
      {filtered.length > 0 ? (
        <motion.div
          key={`${activeFilter}-${searchQuery}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <BlogCard
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                category={post.category}
                authorName={post.authorName}
                publishedAt={post.publishedAt}
                serviceLine={post.serviceLine}
                readTime={post.readTime}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-white/50 mb-4">{t("noResults")}</p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="text-sm text-white/40 underline hover:text-white/60 transition-colors"
          >
            {t("reset")}
          </button>
        </div>
      )}
    </>
  );
}
