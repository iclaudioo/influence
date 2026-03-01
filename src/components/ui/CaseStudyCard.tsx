"use client";

import { motion } from "motion/react";
import { reveal } from "@/lib/animations";

type Props = {
  metric: string;
  client: string;
  result: string;
  featured?: boolean;
};

export function CaseStudyCard({ metric, client, result, featured = false }: Props) {
  return (
    <motion.div
      variants={reveal}
      className={`border border-white/10 p-8 ${featured ? "p-10" : ""}`}
    >
      <p className="eyebrow text-white/50 mb-4">{client}</p>
      <p className={`font-serif text-gold ${featured ? "text-5xl md:text-6xl" : "text-4xl"} mb-4`}>
        {metric}
      </p>
      <p className="text-white/70 leading-relaxed">{result}</p>
    </motion.div>
  );
}
