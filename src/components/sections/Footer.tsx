"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, Play } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
];

const credentialLinks = [
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-bg-secondary py-16 px-6 md:px-12 mt-auto z-raised">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Identity & Social Badges Column */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="group flex items-center gap-3 select-none" aria-label="Enosh Jaques Home Page">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/ej-logo.jpg"
                  alt="EJ Monogram"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold text-white transition-colors group-hover:text-accent-cyan leading-none">
                  Enosh Jaques
                </span>
                <span className="text-[10px] text-text-secondary mt-1">
                  Creative Developer &amp; Founder of Visual Vibe Creation
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-xs text-text-secondary leading-relaxed">
              Visual Vibe Creation — the independent creative studio of Enosh Jaques. Building digital systems, visuals, and applications.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Enosh-J10"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all focus-visible:ring-2 focus-visible:ring-accent-teal outline-none"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/enosh-jaques-b93817302"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all focus-visible:ring-2 focus-visible:ring-accent-teal outline-none"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/designer_visual_vibe_creations/"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all focus-visible:ring-2 focus-visible:ring-accent-teal outline-none"
                aria-label="Instagram Page"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all focus-visible:ring-2 focus-visible:ring-accent-teal outline-none"
                aria-label="Google Play Store"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold block mb-4">
              Explore
            </span>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-text-secondary hover:text-white transition-colors duration-200 py-1 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials Column */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold block mb-4">
              Narrative
            </span>
            <ul className="space-y-2">
              {credentialLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-text-secondary hover:text-white transition-colors duration-200 py-1 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Contact Column */}
          <div>
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold block mb-4">
              Inquiries
            </span>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@visualvibecreation.com"
                  className="group inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors duration-200 py-1 max-w-full min-w-0"
                  style={{ overflowWrap: "anywhere" }}
                >
                  <Mail className="h-3.5 w-3.5 text-accent-teal shrink-0" />
                  <span className="break-all">hello@visualvibecreation.com</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </li>
              <li>
                <span className="text-[10px] text-text-muted block mt-2">
                  Independent Studio:
                </span>
                <span className="text-xs text-text-secondary block mt-0.5 font-mono">
                  Est. 2022
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Details */}
        <div className="mt-16 border-t border-border-subtle pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-[11px] text-text-muted">
          <div>
            Designed and developed by <span className="font-semibold text-text-secondary">Enosh Jaques</span>. &copy; {new Date().getUTCFullYear()}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Next.js</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
