"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "text"
  | "icon"
  | "github"
  | "linkedin"
  | "playstore"
  | "cta";

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "onScroll"
  > {
  variant?: ButtonVariant;
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  children?: React.ReactNode;
}

const MotionLink = motion.create(Link);

export default function Button({
  variant = "primary",
  href,
  loading = false,
  disabled = false,
  icon,
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  // Common classes
  const baseClasses =
    "touch-target inline-flex items-center justify-center gap-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary outline-none min-h-[44px]";

  // Variant definitions
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-accent-cyan text-bg-primary hover:bg-[#8be5ee] active:bg-[#72cbd5] px-6",
    secondary:
      "bg-bg-secondary text-text-primary border border-border-standard hover:border-border-strong hover:bg-white/[0.02] active:bg-white/[0.05] px-6",
    ghost:
      "bg-transparent text-text-secondary hover:text-white hover:bg-white/[0.03] px-5",
    text:
      "bg-transparent text-accent-cyan hover:text-white hover:underline px-0 min-h-0 py-1.5",
    icon:
      "bg-transparent text-text-secondary hover:text-white hover:border-border-standard hover:bg-white/[0.02] border border-transparent h-11 w-11",
    github:
      "bg-[#24292e] text-white hover:bg-[#2f363d] active:bg-[#24292e] border border-border-standard px-6",
    linkedin:
      "bg-[#0077b5] text-white hover:bg-[#006097] active:bg-[#0077b5] border border-border-standard px-6",
    playstore:
      "bg-bg-secondary text-white hover:bg-white/[0.02] border border-border-standard px-6 shadow-md",
    cta:
      "bg-accent-teal text-bg-primary hover:bg-[#0b7c72] active:bg-[#09635b] px-7 shadow-lg shadow-accent-teal/10",
  };

  // Disabled styling overrides (not color alone, changes cursor, border, and text shading)
  const isButtonDisabled = disabled || loading;
  const disabledClasses = isButtonDisabled
    ? "bg-bg-secondary/80 text-text-muted border-border-subtle cursor-not-allowed hover:bg-bg-secondary/80 hover:text-text-muted hover:border-border-subtle hover:scale-100 active:scale-100 pointer-events-none opacity-50"
    : "";

  const finalClasses = `${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`;

  // Interactive motion tags
  const hoverScale = shouldReduceMotion ? 1 : 1.02;
  const tapScale = shouldReduceMotion ? 1 : 0.98;

  const content = (
    <>
      {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-current shrink-0" />}
      {!loading && icon && <span className="shrink-0">{icon}</span>}
      {children}
      {/* Brand icon fallbacks */}
      {!loading && variant === "github" && <GithubIcon className="h-4 w-4 shrink-0" />}
      {!loading && variant === "linkedin" && <LinkedinIcon className="h-4 w-4 shrink-0" />}
      {!loading && variant === "playstore" && <Play className="h-4 w-4 fill-current shrink-0" />}
      {!loading && external && variant !== "github" && variant !== "linkedin" && variant !== "playstore" && (
        <ArrowUpRight className="h-3.5 w-3.5 text-current shrink-0" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={finalClasses}
          whileHover={{ scale: hoverScale }}
          whileTap={{ scale: tapScale }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink
        href={href}
        className={finalClasses}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      disabled={isButtonDisabled}
      className={finalClasses}
      whileHover={isButtonDisabled ? {} : { scale: hoverScale }}
      whileTap={isButtonDisabled ? {} : { scale: tapScale }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
