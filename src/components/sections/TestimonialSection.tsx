"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { stagger, reveal } from "@/lib/animations";

export function TestimonialSection() {
  const t = useTranslations("testimonials");

  const items = t.raw("items") as Array<{
    quote: string;
    name: string;
    title: string;
    company: string;
  }>;

  return (
    <section className="bg-off-white section-padding">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow text-gold text-center mb-4">{t("eyebrow")}</p>
          <h2 className="font-serif font-normal tracking-[-0.04em] text-4xl md:text-5xl text-navy text-center">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={reveal}>
              <div className="flex items-center gap-4 mb-4">
                {/* Photo placeholder */}
                <div className="w-12 h-12 rounded-full bg-navy/10 border border-navy/10 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy">{item.name}</p>
                  <p className="text-navy/50 text-sm">
                    {item.title}, {item.company}
                  </p>
                </div>
              </div>
              <blockquote className="border-l-2 border-gold pl-6">
                <p className="font-serif text-navy/80 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
