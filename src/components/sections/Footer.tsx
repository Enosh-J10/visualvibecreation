import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.05] bg-bg-secondary py-16 px-6 md:px-12 mt-auto">
      {/* Decorative Gradient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[500px] -translate-x-1/2 bg-accent-purple/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              Visual Vibe <span className="text-accent-blue">Creation</span>
            </span>
            <p className="mt-4 max-w-sm text-sm text-text-secondary leading-relaxed">
              Award-level modern digital studio. Specializing in high-end design, software development, video editing, and motion graphics.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com/Enosh-J10"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] hover:border-accent-purple hover:bg-accent-purple/10 text-text-secondary hover:text-white transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/enosh-jaques-b93817302"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] hover:border-accent-purple hover:bg-accent-purple/10 text-text-secondary hover:text-white transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/designer_visual_vibe_creations/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] hover:border-accent-purple hover:bg-accent-purple/10 text-text-secondary hover:text-white transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Services", href: "/services" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-white transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Studio Contacts</h4>
            <ul className="mt-4 space-y-3">
              {[
                "hello@visualvibecreation.com",
                "contact@visualvibecreation.com",
                "enosh@visualvibecreation.com",
              ].map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="group inline-flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{email}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.05] pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-text-secondary">
            &copy; {currentYear} Visual Vibe Creation. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            Designed and Developed by{" "}
            <span className="font-semibold text-white">Enosh Jaques</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
