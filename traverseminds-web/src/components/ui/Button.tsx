"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
  GatesNotes Button Spec:
  - Primary: bg #313439, hover #000, text white, 4px radius, 12px 16px padding
  - Font: 16px, weight 500, line-height 100%
  - Transition: all .35s cubic-bezier(.215,.61,.355,1)
*/

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#313439] text-white rounded-sm hover:bg-[#000000]",
        secondary:
          "bg-[#212429] text-white rounded-sm hover:bg-[#000000]",
        outline:
          "border border-[rgba(81,84,89,0.64)] bg-white text-[#000000] rounded-sm hover:bg-[#000000] hover:text-white",
        ghost:
          "text-[#515459] bg-transparent rounded-sm hover:text-[#000000] hover:bg-[#f0f1f4]",
        "outline-dark":
          "border border-[rgba(81,84,89,0.64)] bg-transparent text-white rounded-sm hover:bg-white hover:text-[#000000]",
        tag:
          "border border-[rgba(81,84,89,0.64)] bg-white text-[#000000] rounded-sm hover:bg-[#000000] hover:text-white text-xs capitalize",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "py-3 px-4 text-base",
        lg: "py-3.5 px-5 text-base",
        xl: "py-4 px-6 text-lg",
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
  ({ className, variant, size, href, children, style, ...props }, ref) => {
    const transitionStyle = {
      transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
      lineHeight: "100%",
      fontWeight: 500,
      ...style,
    };

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant, size, className }))} style={transitionStyle}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={cn(buttonVariants({ variant, size, className }))} style={transitionStyle}>
          {children}
        </Link>
      );
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} style={transitionStyle} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
