"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import React from "react";

export function FeaturedCasesAnimated({
  children,
}: {
  children: React.ReactNode;
}) {
  const childArray = React.Children.toArray(children);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
    >
      {childArray.map((child, i) => (
        <motion.div key={i} variants={fadeUp}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
