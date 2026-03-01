"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

export function StatsBar() {
  const t = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  return (
    <section className="bg-navy section-padding">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((stat, i) => (
            <div key={i}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
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
