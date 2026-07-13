"use client";

import React from "react";
import { Sparkles, Code2, Monitor, Gamepad2 } from "lucide-react";
import { StatusBadge } from "./PortfolioComponents";

interface PlaceholderProps {
  title: string;
  description: string;
  type?: "app" | "web" | "game" | "general";
}

export default function EmptyStatePlaceholder({
  title,
  description,
  type = "general",
}: PlaceholderProps) {
  const icons = {
    app: <Code2 className="h-6 w-6 text-accent-cyan" />,
    web: <Monitor className="h-6 w-6 text-accent-teal" />,
    game: <Gamepad2 className="h-6 w-6 text-accent-cyan" />,
    general: <Sparkles className="h-6 w-6 text-text-muted" />,
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary/25 p-8 flex flex-col justify-between h-full min-h-[220px] group transition-all duration-300 hover:border-border-standard">
      {/* Decorative Grid Overlay inside placeholder */}
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-subtle bg-white/[0.01] text-text-muted transition-transform duration-300 group-hover:scale-105">
          {icons[type]}
        </div>
        <div className="space-y-1.5">
          <h4 className="font-display text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
            {title}
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-6 relative z-10">
        <StatusBadge type="comingsoon" />
      </div>
    </div>
  );
}
