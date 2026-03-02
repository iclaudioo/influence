"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeIn, staggerContainer } from "@/lib/animations";

type MediaMention = {
  id: string;
  name: string;
  logo_url: string;
  url: string;
  sort_order: number;
};

type Props = {
  mentions: MediaMention[];
};

export function MediaMentionsGrid({ mentions }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12 items-center justify-items-center"
    >
      {mentions.map((mention) => (
        <motion.a
          key={mention.id}
          variants={fadeIn}
          href={mention.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <Image
            src={mention.logo_url}
            alt={mention.name}
            width={120}
            height={48}
            className="object-contain"
          />
        </motion.a>
      ))}
    </motion.div>
  );
}
