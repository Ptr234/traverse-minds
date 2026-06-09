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
  style?: React.CSSProperties;
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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease },
    },
  },
  "fade-blur": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease },
    },
  },
  // clip-* variants replaced with translate+opacity — identical feel, reliable on mobile
  "clip-up": {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease },
    },
  },
  "clip-left": {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease },
    },
  },
  "clip-right": {
    hidden: { opacity: 0, x: 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease },
    },
  },
  "clip-inset": {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease },
    },
  },
  "slide-up": {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease },
    },
  },
  "scale-fade": {
    hidden: { scale: 0.97, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease },
    },
  },
  "mask-wipe": {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease },
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
  style,
  delay = 0,
  duration,
  staggerChildren,
  once = true,
  margin = "0px 0px -40px 0px",
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
      style={style}
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
