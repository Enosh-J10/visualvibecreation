import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Display({ children, className = "", id }: TypographyProps) {
  return (
    <h1 id={id} className={`text-display-xl tracking-tight text-white ${className}`}>
      {children}
    </h1>
  );
}

export function Headline({ children, className = "", id }: TypographyProps) {
  return (
    <h2 id={id} className={`text-display tracking-tight text-white ${className}`}>
      {children}
    </h2>
  );
}

export function SectionTitle({ children, className = "", id }: TypographyProps) {
  return (
    <h3 id={id} className={`text-h1 tracking-tight text-white ${className}`}>
      {children}
    </h3>
  );
}

export function LeadParagraph({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-lead leading-relaxed text-text-secondary ${className}`}>
      {children}
    </p>
  );
}

export function Body({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-body leading-relaxed text-text-primary ${className}`}>
      {children}
    </p>
  );
}

export function Caption({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-caption block ${className}`}>
      {children}
    </span>
  );
}

export function Overline({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-overline block uppercase tracking-widest ${className}`}>
      {children}
    </span>
  );
}

export function Quote({ children, author, className = "" }: TypographyProps & { author?: string }) {
  return (
    <blockquote className={`border-l-2 border-accent-teal pl-4 italic text-text-secondary my-4 ${className}`}>
      <p className="text-body leading-relaxed">“{children}”</p>
      {author && (
        <cite className="text-caption not-italic block mt-2 text-text-muted">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}

export function HighlightText({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-white font-semibold ${className}`}>
      {children}
    </span>
  );
}

export function GradientText({ children, className = "", variant = "standard" }: TypographyProps & { variant?: "standard" | "teal" }) {
  const gradientClass = variant === "teal" ? "text-gradient-teal" : "text-gradient";
  return (
    // suppressHydrationWarning: a cursor-enhancement browser extension injects
    // "cursor-hover" into className before React hydrates. This is a third-party
    // DOM modification — not a code bug — so suppression is correct here.
    <span suppressHydrationWarning className={`${gradientClass} font-bold ${className}`}>
      {children}
    </span>
  );
}

export function StatusLabel({ children, className = "", type = "info" }: TypographyProps & { type?: "info" | "success" | "warning" | "error" }) {
  const borderColors = {
    info: "border-accent-cyan bg-accent-cyan/10 text-accent-cyan",
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border ${borderColors[type]} ${className}`}>
      <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
      <span>{children}</span>
    </span>
  );
}
