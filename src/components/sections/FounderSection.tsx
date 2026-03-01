"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { stagger, reveal } from "@/lib/animations";

export function FounderSection() {
  const t = useTranslations("about.founder");

  const credentials = t.raw("credentials") as string[];

  return (
    <section className="bg-navy section-padding">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
        >
          {/* Photo placeholder — 3 cols */}
          <motion.div variants={reveal} className="lg:col-span-3">
            <div className="aspect-[4/5] bg-navy-light border border-white/10 flex items-center justify-center">
              <span className="text-white/20 text-sm uppercase tracking-wider">Photo</span>
            </div>
          </motion.div>

          {/* Bio — 2 cols */}
          <motion.div variants={reveal} className="lg:col-span-2">
            <p className="eyebrow text-gold/60 mb-4">{t("eyebrow")}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-normal tracking-[-0.04em] mb-2">
              {t("name")}
            </h3>
            <p className="text-white/50 mb-6">{t("title")}</p>
            <p className="text-white/70 leading-relaxed mb-8">{t("bio")}</p>

            {/* Credential signals */}
            <div className="space-y-3 mb-8">
              {credentials.map((credential, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-4 h-px bg-gold" />
                  <span className="text-white/60 text-sm">{credential}</span>
                </div>
              ))}
            </div>

            <Button href="/about" variant="secondary" accentColor="#C4A265">
              {t("cta")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
