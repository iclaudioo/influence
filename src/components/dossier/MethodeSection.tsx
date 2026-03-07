"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { MethodePhase } from "./MethodePhase";
import Image from "next/image";

const phases = [
  {
    number: "01",
    name: "LABS",
    color: "#d55d25",
    headlineKey: "labsHeadline",
    bodyKey: "labsBody",
    image: { src: "/images/dossier/labs-radar.png", alt: "Strategic diagnosis radar" },
  },
  {
    number: "02",
    name: "CIRCLE",
    color: "#D7263D",
    headlineKey: "circleHeadline",
    bodyKey: "circleBody",
    image: { src: "/images/dossier/circle-network.png", alt: "Network positioning diagram" },
  },
  {
    number: "03",
    name: "STUDIO",
    color: "#A855F7",
    headlineKey: "studioHeadline",
    bodyKey: "studioBody",
    image: { src: "/images/dossier/studio-grid.png", alt: "Content creation grid" },
  },
  {
    number: "04",
    name: "ACADEMY",
    color: "#E8A317",
    headlineKey: "academyHeadline",
    bodyKey: "academyBody",
    image: { src: "/images/dossier/academy-blocks.png", alt: "Training curriculum structure" },
  },
] as const;

export function MethodeSection() {
  const t = useTranslations("dossier");

  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  const inView0 = useInView(ref0, { margin: "-40% 0px -40% 0px" });
  const inView1 = useInView(ref1, { margin: "-40% 0px -40% 0px" });
  const inView2 = useInView(ref2, { margin: "-40% 0px -40% 0px" });
  const inView3 = useInView(ref3, { margin: "-40% 0px -40% 0px" });

  const refs = [ref0, ref1, ref2, ref3];
  const inViews = [inView0, inView1, inView2, inView3];

  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let lastInView = -1;
    inViews.forEach((isInView, i) => {
      if (isInView) lastInView = i;
    });
    if (lastInView >= 0) setActiveIndex(lastInView);
  }, [inView0, inView1, inView2, inView3]);

  return (
    <section className="relative">
      {/* Sticky progress bar */}
      <div className="sticky top-16 z-20 h-0.5 bg-[rgba(0,0,0,0.06)]">
        <motion.div
          className="h-full"
          style={{ backgroundColor: phases[activeIndex].color }}
          animate={{ width: `${((activeIndex + 1) / phases.length) * 100}%` }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-8">
        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1d1d1f]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("methodeLabel")}
        </motion.h2>
      </div>

      {/* Phases */}
      {phases.map((phase, i) => (
        <div key={phase.number} ref={refs[i]}>
          <MethodePhase
            number={phase.number}
            name={phase.name}
            color={phase.color}
            headline={t(phase.headlineKey)}
            body={t(phase.bodyKey)}
            isActive={activeIndex === i}
          >
            <Image
              src={phase.image.src}
              alt={phase.image.alt}
              width={600}
              height={600}
              className="w-full scale-[1.15]"
            />
          </MethodePhase>
        </div>
      ))}
    </section>
  );
}
