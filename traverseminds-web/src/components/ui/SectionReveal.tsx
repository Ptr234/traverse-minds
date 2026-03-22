"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type RevealVariant =
  | "fade-up"
  | "fade-blur"
  | "clip-up"
  | "clip-left"
  | "clip-right"
  | "clip-inset"
  | "slide-up"
  | "scale-fade"
  | "mask-wipe";

interface SectionRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  margin?: string;
  as?: "section" | "div" | "article";
}

const ease = [0.16, 1, 0.3, 1] as const;

const revealVariants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease },
    },
  },
  "fade-blur": {
    hidden: { opacity: 0, filter: "blur(20px)", scale: 0.96 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1, ease },
    },
  },
  "clip-up": {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      transition: { duration: 1, ease },
    },
  },
  "clip-left": {
    hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      transition: { duration: 1, ease },
    },
  },
  "clip-right": {
    hidden: { clipPath: "inset(0% 0% 0% 100%)", opacity: 0 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      transition: { duration: 1, ease },
    },
  },
  "clip-inset": {
    hidden: { clipPath: "inset(8% 8% 8% 8%)", opacity: 0, scale: 0.95 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease },
    },
  },
  "slide-up": {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease },
    },
  },
  "scale-fade": {
    hidden: { scale: 0.88, opacity: 0, filter: "blur(6px)" },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease },
    },
  },
  "mask-wipe": {
    hidden: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      opacity: 0,
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      transition: { duration: 1.2, ease },
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

function getTransition(
  variant: Variants,
): Record<string, unknown> {
  const visible = variant.visible;
  if (typeof visible === "object" && visible !== null && "transition" in visible) {
    return visible.transition as Record<string, unknown>;
  }
  return {};
}

export function SectionReveal({
  children,
  variant = "fade-up",
  className,
  delay = 0,
  duration,
  staggerChildren,
  once = true,
  margin = "-80px",
  as = "div",
}: SectionRevealProps) {
  const Component = motion[as] as typeof motion.div;
  const variantConfig = revealVariants[variant];

  const customVariants: Variants = staggerChildren
    ? {
        hidden: staggerContainer.hidden,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: variantConfig.hidden,
        visible: {
          ...variantConfig.visible,
          transition: {
            ...getTransition(variantConfig),
            delay,
            ...(duration ? { duration } : {}),
          },
        },
      };

  return (
    <Component
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* Stagger child — wrap each child item in a stagger container */
export function RevealItem({
  children,
  variant = "fade-up",
  className,
  duration,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  duration?: number;
}) {
  const variantConfig = revealVariants[variant];

  const customVariants: Variants = duration
    ? {
        hidden: variantConfig.hidden,
        visible: {
          ...variantConfig.visible,
          transition: {
            ...getTransition(variantConfig),
            duration,
          },
        },
      }
    : variantConfig;

  return (
    <motion.div variants={customVariants} className={className}>
      {children}
    </motion.div>
  );
}
