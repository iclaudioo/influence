"use client";

import { motion } from "motion/react";
import clsx from "clsx";

interface BackgroundCirclesProps {
    className?: string;
    variant?: keyof typeof COLOR_VARIANTS;
}

const COLOR_VARIANTS = {
    labs: {
        border: [
            "border-[#d55d25]/60",
            "border-orange-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-[#d55d25]/30",
        glow: "#d55d25",
    },
    circle: {
        border: [
            "border-[#D7263D]/60",
            "border-rose-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-[#D7263D]/30",
        glow: "#D7263D",
    },
    studio: {
        border: [
            "border-[#A855F7]/60",
            "border-fuchsia-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-[#A855F7]/30",
        glow: "#A855F7",
    },
    academy: {
        border: [
            "border-[#E8A317]/60",
            "border-yellow-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-[#E8A317]/30",
        glow: "#E8A317",
    },
    gold: {
        border: [
            "border-[#C4A265]/60",
            "border-amber-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-[#C4A265]/30",
        glow: "#C4A265",
    },
    orange: {
        border: [
            "border-[#d55d25]/60",
            "border-orange-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-[#d55d25]/30",
        glow: "#d55d25",
    },
} as const;

const AnimatedGrid = () => (
    <motion.div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
        animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
        }}
    >
        <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-10" />
    </motion.div>
);

export function BackgroundCircles({
    className,
    variant = "labs",
}: BackgroundCirclesProps) {
    const variantStyles = COLOR_VARIANTS[variant];

    return (
        <div
            className={clsx(
                "absolute inset-0 overflow-hidden",
                className
            )}
        >
            <AnimatedGrid />
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px]"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={clsx(
                            "absolute inset-0 rounded-full",
                            "border-2 bg-gradient-to-br to-transparent",
                            variantStyles.border[i],
                            variantStyles.gradient
                        )}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0.3, 1.8 + i * 0.4, 1.5 + i * 0.3],
                            opacity: [0, 0.9, 0.6 - i * 0.1],
                            rotate: 360,
                        }}
                        transition={{
                            scale: {
                                duration: 8 + i * 2,
                                ease: "easeOut",
                            },
                            opacity: {
                                duration: 6 + i * 1.5,
                                ease: "easeOut",
                            },
                            rotate: {
                                duration: 30 + i * 10,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                                delay: 5,
                            },
                        }}
                    />
                ))}
            </motion.div>

            <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
                <div
                    className="absolute inset-0 blur-[120px]"
                    style={{ background: `radial-gradient(ellipse at center, ${variantStyles.glow}30 0%, transparent 70%)` }}
                />
                <div
                    className="absolute inset-0 blur-[80px]"
                    style={{ background: `radial-gradient(ellipse at center, ${variantStyles.glow}15 0%, transparent 70%)` }}
                />
            </div>
        </div>
    );
}
