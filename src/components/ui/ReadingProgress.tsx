"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

type Props = {
  color?: string;
};

export function ReadingProgress({ color = "#d55d25" }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-[3px]"
      style={{
        width: `${progress}%`,
        backgroundColor: color,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
    />
  );
}
