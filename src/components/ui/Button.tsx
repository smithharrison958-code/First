"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "wood" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  as?: "button" | "div";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#1A1A1A] text-[#FAFAF7] hover:bg-[#2D2D2D] focus-visible:ring-[#1A1A1A] shadow-sm hover:shadow-md active:scale-[0.98]",
      secondary:
        "bg-[#C4956A] text-white hover:bg-[#A47850] focus-visible:ring-[#C4956A] shadow-sm hover:shadow-md active:scale-[0.98]",
      ghost:
        "bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/6 focus-visible:ring-[#1A1A1A] active:scale-[0.98]",
      outline:
        "border border-[#1A1A1A]/20 bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAFAF7] focus-visible:ring-[#1A1A1A] active:scale-[0.98]",
      wood:
        "bg-[#C4956A] text-white border border-[#C4956A] hover:bg-transparent hover:text-[#C4956A] focus-visible:ring-[#C4956A] active:scale-[0.98] transition-colors duration-300",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-4 text-xs rounded",
      md: "h-10 px-6 text-sm rounded",
      lg: "h-12 px-8 text-sm rounded",
      xl: "h-14 px-10 text-base rounded",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
            {children && <span>{children}</span>}
            {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Motion-enhanced button for hero CTAs
export const MotionButton = motion.create(Button);

export default Button;
