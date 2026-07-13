"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Calendar, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import { TechnologyBadge } from "./PortfolioComponents";
import { ASSET_REGISTRY } from "@/data/assets";
import { DevAssetPlaceholder } from "./ImageComponents";

// Reusable card wrapper that adds interactive scale/glow transitions
function CardWrapper({
  children,
  className = "",
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const hoverScale = interactive && !shouldReduceMotion ? 1.015 : 1;

  return (
    <motion.div
      whileHover={interactive ? { scale: hoverScale } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`card-standard ${interactive ? "card-interactive" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 1. Project Card
export function ProjectCard({
  title,
  description,
  category,
  imageSrc,
  href,
  tags = [],
}: {
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  href: string;
  tags?: string[];
}) {
  return (
    <CardWrapper className="flex flex-col h-full overflow-hidden group">
      {/* Aspect Ratio Box to prevent layout shifts */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-bg-secondary border border-border-subtle">
        {(() => {
          const entry = Object.values(ASSET_REGISTRY).find((e) => e.intendedPath === imageSrc);
          const isMissing = !entry || entry.status === "missing";

          if (isMissing) {
            return (
              <DevAssetPlaceholder
                label={entry?.label || "Visual Work"}
                dimensions={entry?.dimensions || "1200 x 675 px"}
                className="w-full h-full border-none bg-transparent"
              />
            );
          }

          return (
            <Image
              src={imageSrc}
              alt={`Screenshot showing project: ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority={false}
              loading="lazy"
            />
          );
        })()}
        <div className="absolute top-3 left-3 z-10">
          <span className="badge-accent uppercase tracking-widest text-[9px] bg-bg-primary/80 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between pt-5 space-y-4">
        <div className="space-y-2">
          <Link href={href} className="group-hover:text-accent-cyan transition-colors inline-flex items-center gap-1.5 focus:outline-none">
            <span className="font-display text-base font-bold text-white group-hover:text-accent-cyan">
              {title}
            </span>
            <ArrowUpRight className="h-4 w-4 text-text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <TechnologyBadge key={tag}>{tag}</TechnologyBadge>
            ))}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

// 2. Experience Card
export function ExperienceCard({
  role,
  company,
  location,
  period,
  description,
  bullets = [],
}: {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <CardWrapper interactive={false} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
        <div>
          <h4 className="font-display text-base font-bold text-white">{role}</h4>
          <span className="text-xs text-accent-cyan font-mono tracking-wider">{company}</span>
          {location && (
            <span className="text-[10px] text-text-muted block mt-0.5">{location}</span>
          )}
        </div>
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-text-secondary bg-white/[0.02] border border-border-subtle px-2.5 py-1 rounded-md max-w-max shrink-0">
          <Calendar className="h-3 w-3 text-accent-teal" />
          <span>{period}</span>
        </div>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
      {bullets.length > 0 && (
        <ul className="space-y-2 pl-4 border-l border-border-standard">
          {bullets.map((b, idx) => (
            <li key={idx} className="text-xs text-text-secondary list-disc pl-1 leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}
    </CardWrapper>
  );
}

// 3. Certification Card
export function CertificationCard({
  name,
  issuer,
  date,
  credentialUrl,
}: {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}) {
  return (
    <CardWrapper className="flex items-center justify-between gap-4 group">
      <div className="space-y-1">
        <h4 className="font-display text-xs font-bold text-white leading-snug group-hover:text-accent-cyan transition-colors">
          {name}
        </h4>
        <div className="flex items-center gap-2 text-[10px] text-text-secondary font-mono">
          <span>{issuer}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-colors"
          aria-label={`Verify credential: ${name}`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </CardWrapper>
  );
}

// 4. Award Card
export function AwardCard({
  title,
  issuer,
  date,
  description,
}: {
  title: string;
  issuer: string;
  date: string;
  description: string;
}) {
  return (
    <CardWrapper interactive={true} className="flex gap-4 items-start group">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent-teal/20 bg-accent-teal/5 text-accent-cyan group-hover:bg-accent-teal/15 transition-all">
        <Award className="h-5 w-5" />
      </div>
      <div className="space-y-1.5 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h4 className="font-display text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
            {title}
          </h4>
          <span className="text-[10px] font-mono text-text-secondary">{date}</span>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-accent-teal block">
          {issuer}
        </span>
        <p className="text-xs text-text-secondary leading-relaxed pt-1">
          {description}
        </p>
      </div>
    </CardWrapper>
  );
}

// 5. Service Card
export function ServiceCard({
  title,
  description,
  capabilities = [],
  icon,
}: {
  title: string;
  description: string;
  capabilities?: string[];
  icon: React.ReactNode;
}) {
  return (
    <CardWrapper className="flex flex-col justify-between h-full space-y-6 group">
      <div className="space-y-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-accent-cyan group-hover:border-accent-teal/40 group-hover:bg-accent-teal/10 transition-all">
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="font-display text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
            {title}
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {capabilities.length > 0 && (
        <div className="border-t border-border-subtle pt-4 space-y-1.5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
            Deliverables
          </span>
          <div className="flex flex-wrap gap-1">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[10px] px-2 py-0.5 rounded bg-white/[0.02] border border-border-subtle text-text-secondary"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      )}
    </CardWrapper>
  );
}

// 6. Timeline Card
export function TimelineCard({
  title,
  subtitle,
  date,
  description,
  isEducation = false,
}: {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  isEducation?: boolean;
}) {
  return (
    <div className="relative pl-8 group">
      {/* Node pin */}
      <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-teal border border-bg-primary z-10 transition-transform duration-300 group-hover:scale-125 shadow shadow-accent-teal/50" />
      
      <CardWrapper className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h4 className="font-display text-sm font-bold text-white">{title}</h4>
            <span className="text-xs text-text-secondary font-medium">{subtitle}</span>
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-mono text-accent-cyan bg-accent-teal/10 px-2 py-0.5 rounded border border-accent-teal/20 self-start sm:self-center">
            {isEducation ? <GraduationCap className="h-3 w-3" /> : <Briefcase className="h-3 w-3" />}
            <span>{date}</span>
          </div>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
      </CardWrapper>
    </div>
  );
}
