"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ContactPage() {
  const t = useTranslations("contact");
  const nav = useTranslations("nav");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy min-h-[40vh] flex items-center pt-24 pb-12">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="eyebrow text-white/70 mb-4">
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold tracking-[-0.02em]"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 mt-6 max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Form + Info */}
      <section className="bg-off-white section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 text-center"
                >
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-navy text-lg">{t("form.success")}</p>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.company")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.service")}
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 bg-white">
                      <option value="">{t("form.servicePlaceholder")}</option>
                      <option value="labs">{nav("labs")}</option>
                      <option value="circle">{nav("circle")}</option>
                      <option value="studio">{nav("studio")}</option>
                      <option value="academy">{nav("academy")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary">
                    {t("form.submit")}
                  </Button>
                </motion.form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              className="lg:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeUp}
                className="bg-navy rounded-2xl p-8 text-white"
              >
                <h3 className="text-xl font-bold mb-6">{t("info.title")}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${t("info.email")}`}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {t("info.email")}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wide mb-1">
                      Telefoon
                    </p>
                    <a
                      href={`tel:${t("info.phone")}`}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {t("info.phone")}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wide mb-1">
                      Adres
                    </p>
                    <p className="text-white/80">{t("info.address")}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
