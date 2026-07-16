import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = "", id }: SectionProps) {
  return (
    <section
      suppressHydrationWarning
      id={id}
      className={`relative py-[--spacing-section] border-t border-border-subtle overflow-hidden bg-bg-primary ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({ children, className = "", variant = "standard" }: SectionProps & { variant?: "standard" | "reading" | "wide" }) {
  const containerClasses = {
    standard: "container-standard",
    reading: "container-reading",
    wide: "container-wide",
  };

  return (
    <div suppressHydrationWarning className={`${containerClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({
  overline,
  title,
  subtitle,
  className = "",
  align = "left",
}: {
  overline?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl mb-12 ${alignmentClass} ${className}`}>
      {overline && (
        <span className="text-overline uppercase tracking-widest block mb-2">
          {overline}
        </span>
      )}
      <h3 className="text-h1 font-bold text-white tracking-tight leading-tight">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-border-subtle my-[--spacing-lg] ${className}`} />;
}

export function GlassPanel({ children, className = "" }: SectionProps) {
  return (
    <div className={`glass-surface p-6 shadow-lg shadow-black/5 ${className}`}>
      {children}
    </div>
  );
}

export function StatisticBlock({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 rounded-xl border border-border-subtle bg-bg-secondary/40 ${className}`}>
      <span className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
        {value}
      </span>
      <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase">
        {label}
      </span>
    </div>
  );
}

export function GridWrapper({ children, className = "", cols = 3 }: SectionProps & { cols?: 2 | 3 | 4 }) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-[--spacing-gutter] ${columnClasses[cols]} ${className}`}>
      {children}
    </div>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Structural Grids */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      {/* Subtle Cyan ambient light */}
      <div className="absolute -top-[20%] left-1/4 h-[50%] w-[50%] rounded-full bg-accent-cyan/5 blur-[120px] animate-glow" />
      {/* Subtle Teal ambient light */}
      <div className="absolute -top-[10%] right-1/4 h-[40%] w-[45%] rounded-full bg-accent-teal/5 blur-[100px] animate-float" />
    </div>
  );
}
