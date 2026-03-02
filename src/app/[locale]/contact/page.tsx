"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tCal = useTranslations("calendly");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    gdprConsent: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          language: locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t("form.error"));
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("form.error"));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

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

      {/* Form + Calendly */}
      <section className="bg-off-white section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left column: Form */}
            <motion.div
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
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
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
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t("form.service")}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`${inputClass} bg-white`}
                    >
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
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* GDPR Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="gdprConsent"
                      id="gdprConsent"
                      required
                      checked={formData.gdprConsent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-navy/20 text-navy focus:ring-navy/20"
                    />
                    <label
                      htmlFor="gdprConsent"
                      className="text-sm text-navy/70"
                    >
                      {t("form.consent")}
                    </label>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <Button type="submit" variant="primary">
                    {loading ? t("form.sending") : t("form.submit")}
                  </Button>
                </motion.form>
              )}
            </motion.div>

            {/* Right column: Calendly */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp}>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  {tCal("title")}
                </h2>
                <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 overflow-hidden">
                  <CalendlyEmbed
                    variant="inline"
                    url="https://calendly.com/influencecircle"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
