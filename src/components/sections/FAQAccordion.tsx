"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reveal, stagger } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function FAQAccordion({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.raw("faq.items") as Array<{ q: string; a: string }>;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white section-padding">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={reveal}>
            <SectionHeading
              title={t("faq.title")}
              centered
              light={false}
              accentColor={accentColor}
            />
          </motion.div>

          <div className="max-w-3xl mx-auto mt-12">
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={reveal}
                className={
                  index < items.length - 1 ? "border-b border-navy/10" : ""
                }
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center py-4 text-left group"
                >
                  <span
                    className="text-lg font-semibold pr-4 transition-colors duration-200"
                    style={{ color: openIndex === index ? accentColor : "#02182B" }}
                  >
                    {item.q}
                  </span>
                  <svg
                    className="w-5 h-5 text-navy/50 shrink-0 transition-transform duration-300"
                    style={{
                      transform:
                        openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-4 text-navy/70 leading-relaxed border-l-2 pl-4 ml-0"
                        style={{ borderColor: accentColor }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
