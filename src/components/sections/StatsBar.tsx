"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const statColors = ["#0FA3B1", "#D7263D", "#A855F7", "#E8A317"];

export function StatsBar() {
  const t = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  return (
    <section className="grain relative overflow-hidden bg-navy section-padding">
      {/* Background color spots */}
      {statColors.map((color, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: "300px",
            height: "300px",
            left: `${i * 25}%`,
            top: "50%",
            transform: "translateY(-50%)",
            background: `radial-gradient(circle, ${color}12 0%, transparent 60%)`,
          }}
        />
      ))}

      <Container>
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((stat, i) => (
            <div key={i}>
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                accentColor={statColors[i]}
              />
              <p className="text-sm text-white/60 uppercase tracking-wide mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
