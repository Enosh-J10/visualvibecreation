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
  { name: "Leadership", href: "/leadership" },
  { name: "Awards", href: "/awards" },
  { name: "Certifications", href: "/certifications" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle bg-bg-secondary py-16 px-6 md:px-12 mt-auto z-raised">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Identity & Social Badges Column */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="group flex items-center gap-3 select-none" aria-label="Enosh Jaques Home Page">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-teal/20 bg-accent-teal/5">
                <svg viewBox="0 0 100 100" className="h-4 w-4 text-accent-cyan fill-none stroke-current stroke-[8]" aria-hidden="true">
                  <path d="M20 20 h60 v15 H35 v15 h40 v15 H35 v15 h45" />
                </svg>
              </div>
              <span className="font-display text-base font-bold text-white transition-colors group-hover:text-accent-cyan">
                Enosh Jaques
              </span>
            </Link>
            <p className="max-w-sm text-xs text-text-secondary leading-relaxed">
              Creative Developer, Designer and Founder of Visual Vibe Creation. Originally from Goa, currently based in London, building premium digital systems, visuals, and applications.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Enosh-J10"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-9 w-9 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/enosh-jaques-b93817302"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-9 w-9 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/designer_visual_vibe_creations/"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-9 w-9 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all"
                aria-label="Instagram Page"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target flex h-9 w-9 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white hover:border-border-strong hover:bg-white/[0.03] transition-all"
                aria-label="Google Play Store Account"
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
                  className="group inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors duration-200 py-1"
                >
                  <Mail className="h-3.5 w-3.5 text-accent-teal" />
                  <span>hello@visualvibecreation.com</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <span className="text-[10px] text-text-muted block mt-2">
                  Independent Studio:
                </span>
                <span className="text-xs text-text-secondary block mt-0.5">
                  Visual Vibe Creation (Est. 2022)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Details */}
        <div className="mt-16 border-t border-border-subtle pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-[11px] text-text-muted">
          <div>
            &copy; {currentYear} <span className="font-semibold text-text-secondary">Enosh Olencio Jaques</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-text-secondary font-medium">Next.js</span>
            <span>·</span>
            <span className="text-text-secondary font-medium">TypeScript</span>
            <span>·</span>
            <span className="text-text-secondary font-medium">Tailwind CSS v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
