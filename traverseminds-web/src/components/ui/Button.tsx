"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer tracking-wide",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand-green to-brand-teal text-white shadow-md hover:shadow-xl hover:translate-y-[-1px] hover:brightness-110 border border-transparent",
        secondary:
          "bg-gradient-to-r from-brand-amber to-brand-amber-light text-white shadow-md hover:shadow-xl hover:translate-y-[-1px] hover:brightness-105 border border-transparent",
        outline:
          "border-2 border-brand-green text-brand-green bg-transparent hover:bg-brand-green hover:text-white hover:shadow-md",
        ghost:
          "text-brand-medium bg-transparent hover:text-brand-charcoal hover:bg-brand-offwhite",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-lg uppercase tracking-wider",
        md: "h-11 px-6 text-sm rounded-lg",
        lg: "h-13 px-8 text-base rounded-xl min-h-[52px]",
        pill: "h-11 px-8 text-sm rounded-full",
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
    if (href) {
      return (
        <a href={href} className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </a>
      );
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
