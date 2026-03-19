"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] cursor-pointer overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 hover:brightness-110 hover:scale-[1.02]",
        secondary:
          "bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-primary-light",
        outline:
          "border border-border-light bg-transparent text-primary rounded-full hover:border-accent hover:text-accent hover:bg-accent-muted",
        ghost:
          "text-brand-medium bg-transparent rounded-full hover:text-primary hover:bg-surface-elevated",
        "outline-dark":
          "border border-white/10 bg-white/5 text-white rounded-full backdrop-blur-sm hover:border-accent hover:bg-accent/10 hover:text-accent",
      },
      size: {
        sm: "h-9 px-5 text-xs tracking-wider uppercase font-bold gap-2",
        md: "h-11 px-7 text-sm gap-2",
        lg: "h-14 px-10 text-base gap-3",
        xl: "h-16 px-12 text-lg gap-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const shimmer = (
      <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
    );

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant, size, className }))}>
            {(variant === "primary" || variant === "secondary") && shimmer}
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={cn(buttonVariants({ variant, size, className }))}>
          {(variant === "primary" || variant === "secondary") && shimmer}
          {children}
        </Link>
      );
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {(variant === "primary" || variant === "secondary") && shimmer}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
