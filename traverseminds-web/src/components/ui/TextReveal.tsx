"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Word-by-word reveal ─────────────────────────── */

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
  margin?: string;
  variant?: "fade-up" | "slide-up" | "blur-in" | "clip-up";
}

const wordVariants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
  },
  "slide-up": {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.4, ease },
    },
  },
  "blur-in": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease },
    },
  },
  "clip-up": {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      transition: { duration: 0.5, ease },
    },
  },
};

export function TextReveal({
  children,
  className,
  style,
  as = "h2",
  delay = 0,
  staggerSpeed = 0.03,
  once = true,
  margin = "-80px",
  variant = "fade-up",
}: TextRevealProps) {
  const Tag = motion[as] as typeof motion.h2;
  
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      },
    },
  };

  if (typeof children !== "string") {
    return (
      <Tag
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        className={className}
        style={style}
      >
        <motion.span
          variants={wordVariants[variant]}
          className="inline-block"
        >
          {children}
        </motion.span>
      </Tag>
    );
  }

  const words = children.split(" ");

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
      style={style}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            variants={wordVariants[variant]}
            className="inline-block"
            aria-hidden
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}

/* ── Line reveal ── */

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
  margin?: string;
}

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export function LineReveal({
  children,
  className,
  delay = 0,
  staggerSpeed = 0.1,
  once = true,
  margin = "-60px",
}: LineRevealProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={lineVariant}>
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={lineVariant}>{children}</motion.div>
          )}
    </motion.div>
  );
}

/* ── Character reveal ── */

interface CharRevealProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "h3" | "h4";
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
  margin?: string;
}

const charVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease },
  },
};

export function CharReveal({
  children,
  className,
  as = "span",
  delay = 0,
  staggerSpeed = 0.02,
  once = true,
  margin = "-60px",
}: CharRevealProps) {
  const Tag = motion[as] as typeof motion.span;
  
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      },
    },
  };

  if (typeof children !== "string") {
    return (
      <Tag
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        className={className}
      >
        <motion.span variants={charVariant} className="inline-block">
          {children}
        </motion.span>
      </Tag>
    );
  }

  const chars = children.split("");

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
      aria-label={children}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={charVariant}
          className="inline-block"
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
