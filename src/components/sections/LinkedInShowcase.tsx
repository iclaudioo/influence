"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heart, MessageCircle, Repeat2, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LinkedInPost = {
  id: string;
  author_name: string;
  author_photo_url: string;
  post_text: string;
  engagement_stats: {
    likes: number;
    comments: number;
    reposts: number;
  };
  linkedin_url: string;
};

type Props = {
  posts: LinkedInPost[];
};

export function LinkedInShowcase({ posts }: Props) {
  const t = useTranslations("linkedin");

  if (!posts || posts.length === 0) {
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

        <div className="mt-12 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 snap-x snap-mandatory pb-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="min-w-[320px] max-w-[380px] flex-shrink-0 snap-start bg-navy-light border border-white/10 rounded-2xl p-6 flex flex-col"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={post.author_photo_url}
                    alt={post.author_name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="font-semibold text-white text-sm">
                    {post.author_name}
                  </span>
                </div>

                {/* Post text */}
                <p className="text-white/70 text-sm leading-relaxed line-clamp-4 flex-1">
                  {post.post_text}
                </p>

                {/* Engagement stats */}
                <div className="flex items-center gap-5 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Heart className="w-4 h-4" />
                    <span>{post.engagement_stats.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.engagement_stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Repeat2 className="w-4 h-4" />
                    <span>{post.engagement_stats.reposts}</span>
                  </div>
                </div>

                {/* LinkedIn link */}
                <a
                  href={post.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("viewOnLinkedIn")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
