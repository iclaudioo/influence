"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { reveal, stagger } from "@/lib/animations";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xplaceholder", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy min-h-[40vh] flex items-center pt-24 pb-12">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={reveal} className="mb-4">
              <div className="w-8 h-px bg-gold" />
            </motion.div>
            <motion.p variants={reveal} className="eyebrow text-gold/60 mb-4">
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={reveal}
              className="font-serif text-5xl md:text-6xl font-normal tracking-[-0.04em]"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={reveal}
              className="text-lg md:text-xl text-white/70 mt-6 max-w-xl"
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
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  variants={reveal}
                  className="bg-white rounded-2xl p-8 text-center"
                >
                  <h3 className="font-serif text-2xl text-navy mb-4">{t("form.successTitle")}</h3>
                  <p className="text-navy/70">{t("form.success")}</p>
                  <p className="text-navy/50 text-sm mt-4">{t("form.successNextStep")}</p>
                </motion.div>
              ) : (
                <motion.form
                  variants={reveal}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm">{t("form.error")}</p>
                  )}
                  <Button type="submit" variant="primary">
                    {t("form.submit")}
                  </Button>
                </motion.form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              className="lg:col-span-2"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={reveal}
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
                      {t("info.phoneLabel")}
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
                      {t("info.addressLabel")}
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
