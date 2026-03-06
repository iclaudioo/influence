"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar_url: string | null;
};

type Props = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotKey, setDotKey] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
    setDotKey((k) => k + 1);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next, testimonials.length]);

  const current = testimonials[activeIndex];
  if (!current) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start gap-8 md:gap-12">
        {/* Large decorative quote mark */}
        <span
          className="hidden md:block text-[200px] font-serif leading-none text-navy/[0.06] select-none -mt-12"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <div className="flex-1 pt-2 md:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Quote */}
              <blockquote className="border-l-[3px] border-labs/60 pl-8">
                <p className="text-2xl md:text-3xl lg:text-[2.1rem] font-serif text-navy italic leading-[1.4] tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 pl-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-labs overflow-hidden">
                  {current.avatar_url ? (
                    <img
                      src={current.avatar_url}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    current.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy">{current.name}</p>
                  <p className="text-navy/50 text-sm">
                    {current.title}, {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots with progress animation */}
          {testimonials.length > 1 && (
            <div className="mt-8 pl-8 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    setDotKey((k) => k + 1);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden ${
                    i === activeIndex
                      ? "w-8 bg-navy/15"
                      : "w-2 bg-navy/20 hover:bg-navy/30"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  {i === activeIndex && (
                    <span
                      key={dotKey}
                      className="absolute inset-0 rounded-full bg-labs origin-left"
                      style={{
                        animation: "dotProgress 6s linear forwards",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
