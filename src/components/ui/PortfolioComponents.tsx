"use client";

import React from "react";
import { Download, ExternalLink, Globe, GitBranch } from "lucide-react";
import Button from "./Button";

// 1. Technology Badge
export function TechnologyBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-[10px] font-mono text-text-secondary bg-white/[0.01] border border-border-subtle px-2 py-0.5 rounded">
      {children}
    </span>
  );
}

// 2. Skill Badge
export function SkillBadge({ children, category = "dev" }: { children: React.ReactNode; category?: "creative" | "dev" | "technical" | "professional" }) {
  const colors = {
    creative: "border-accent-cyan bg-accent-cyan/5 text-accent-cyan",
    dev: "border-accent-teal bg-accent-teal/5 text-accent-cyan",
    technical: "border-border-standard bg-white/[0.01] text-text-primary",
    professional: "border-border-subtle bg-bg-secondary text-text-secondary",
  };

  return (
    <span className={`inline-flex items-center text-xs border px-3 py-1.5 rounded-lg select-none ${colors[category]}`}>
      {children}
    </span>
  );
}

// 3. Status Badge (Strict truthful labels)
export type ProjectStatusType =
  | "live"
  | "published"
  | "featured"
  | "award"
  | "new"
  | "comingsoon"
  | "inprogress"
  | "archived"
  | "experimental";

export function StatusBadge({ type = "live" }: { type?: ProjectStatusType }) {
  const labels: Record<ProjectStatusType, string> = {
    live: "Live Online",
    published: "Published",
    featured: "Featured",
    award: "Award Winning",
    new: "New",
    comingsoon: "Coming Soon",
    inprogress: "In Progress",
    archived: "Archived",
    experimental: "Experimental",
  };

  const colors: Record<ProjectStatusType, string> = {
    live: "border-green-500/30 bg-green-500/10 text-green-400",
    published: "border-accent-teal/30 bg-accent-teal/10 text-accent-cyan",
    featured: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    award: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
    new: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    comingsoon: "border-border-subtle bg-bg-secondary text-text-muted",
    inprogress: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    archived: "border-border-subtle bg-white/[0.01] text-text-secondary",
    experimental: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border ${colors[type]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span>{labels[type]}</span>
    </span>
  );
}

// 4. Tag
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase font-mono tracking-widest text-accent-teal">
      #{children}
    </span>
  );
}

// 5. Category Filter
export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Project filter tabs">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`touch-target px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
              isActive
                ? "bg-accent-teal text-bg-primary border-accent-teal shadow-md shadow-accent-teal/10"
                : "bg-transparent text-text-secondary border-border-subtle hover:border-border-strong hover:text-white"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// 6. Project Metadata Columns
export function ProjectMetadata({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-border-subtle">
      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <span className="text-xs text-text-primary font-medium">
        {value}
      </span>
    </div>
  );
}

// 7. Download Button
export function DownloadButton({
  href,
  label = "Download Asset",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Button variant="secondary" href={href} icon={<Download className="h-3.5 w-3.5" />} external>
      {label}
    </Button>
  );
}

// 8. External Links Group
export function ExternalLinkGroup({
  githubUrl,
  liveUrl,
}: {
  githubUrl?: string;
  liveUrl?: string;
}) {
  if (!githubUrl && !liveUrl) return null;

  return (
    <div className="flex items-center gap-3">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-xs text-text-secondary hover:text-white transition-colors"
        >
          <GitBranch className="h-3.5 w-3.5 text-accent-teal" />
          <span>Source Code</span>
          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
      {githubUrl && liveUrl && <span className="text-border-standard text-xs">|</span>}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-xs text-text-secondary hover:text-white transition-colors"
        >
          <Globe className="h-3.5 w-3.5 text-accent-cyan" />
          <span>Live Demo</span>
          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      )}
    </div>
  );
}
