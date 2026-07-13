/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useScrollController } from "@/context/ScrollContext";

const workSubLinks = [
  { name: "Projects Index", href: "/projects" },
  { name: "Creative Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
];

const journeySubLinks = [
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Leadership", href: "/leadership" },
  { name: "Awards", href: "/awards" },
  { name: "Certifications", href: "/certifications" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  const pathname = usePathname();
  const controller = useScrollController();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setIsWorkOpen(false);
      }
      if (journeyRef.current && !journeyRef.current.contains(e.target as Node)) {
        setIsJourneyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-dismiss dropdowns and mobile menu on pathname transitions
  useEffect(() => {
    setIsOpen(false);
    setIsWorkOpen(false);
    setIsJourneyOpen(false);
  }, [pathname]);

  // Mobile menu scroll lock contract coordinating with ScrollController
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      controller.stop();
    } else {
      document.body.style.overflow = "";
      controller.start();
    }
    return () => {
      document.body.style.overflow = "";
      controller.start();
    };
  }, [isOpen, controller]);

  // Escape key close & Mobile Focus Trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsWorkOpen(false);
        setIsJourneyOpen(false);
        if (isOpen) {
          setIsOpen(false);
          toggleButtonRef.current?.focus();
        }
      }

      if (e.key === "Tab" && isOpen && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Check active states
  const isWorkActive =
    pathname === "/projects" ||
    pathname.startsWith("/projects/") ||
    pathname === "/portfolio" ||
    pathname === "/services";

  const isJourneyActive =
    pathname === "/experience" ||
    pathname === "/education" ||
    pathname === "/leadership" ||
    pathname === "/awards" ||
    pathname === "/certifications";

  const isAboutActive = pathname === "/about";
  const isContactActive = pathname === "/contact";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
        scrolled
          ? "border-b border-border-subtle bg-bg-primary/75 backdrop-blur-md py-3.5 shadow-md shadow-black/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        {/* Monogram Logo */}
        <Link href="/" className="group flex items-center gap-3 select-none" aria-label="Enosh Jaques Home Page">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-teal/20 bg-accent-teal/5 transition-all duration-300 group-hover:border-accent-teal/50 group-hover:bg-accent-teal/10">
            <svg
              viewBox="0 0 100 100"
              className="h-5 w-5 text-accent-cyan fill-none stroke-current stroke-[8]"
              aria-hidden="true"
            >
              <path d="M20 20 h60 v15 H35 v15 h40 v15 H35 v15 h45" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-accent-cyan">
              Enosh Jaques
            </span>
            <span className="hidden xs:inline-block text-[9px] font-mono tracking-widest text-text-secondary uppercase">
              Visual Vibe Creation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8" role="navigation" aria-label="Main Navigation">
          {/* Home */}
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`relative py-1.5 text-[13px] font-medium transition-colors duration-200 ${
              pathname === "/" ? "text-white" : "text-text-secondary hover:text-white"
            }`}
          >
            <span>Home</span>
            {pathname === "/" && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-teal"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
          </Link>

          {/* About */}
          <Link
            href="/about"
            aria-current={isAboutActive ? "page" : undefined}
            className={`relative py-1.5 text-[13px] font-medium transition-colors duration-200 ${
              isAboutActive ? "text-white" : "text-text-secondary hover:text-white"
            }`}
          >
            <span>About</span>
            {isAboutActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-teal"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
          </Link>

          {/* Work Dropdown */}
          <div ref={workRef} className="relative">
            <button
              onClick={() => {
                setIsWorkOpen(!isWorkOpen);
                setIsJourneyOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={isWorkOpen}
              className={`relative flex items-center gap-1 py-1.5 text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                isWorkActive ? "text-white" : "text-text-secondary hover:text-white"
              }`}
            >
              <span>Work</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isWorkOpen ? "rotate-180" : ""}`} />
              {isWorkActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-teal"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <AnimatePresence>
              {isWorkOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border-subtle bg-bg-secondary p-2 shadow-lg shadow-black/40 z-modal"
                >
                  {workSubLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setIsWorkOpen(false)}
                      className="block rounded-md px-3 py-2 text-xs text-text-secondary hover:text-white hover:bg-white/[0.03] transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Journey Dropdown */}
          <div ref={journeyRef} className="relative">
            <button
              onClick={() => {
                setIsJourneyOpen(!isJourneyOpen);
                setIsWorkOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={isJourneyOpen}
              className={`relative flex items-center gap-1 py-1.5 text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                isJourneyActive ? "text-white" : "text-text-secondary hover:text-white"
              }`}
            >
              <span>Journey</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isJourneyOpen ? "rotate-180" : ""}`} />
              {isJourneyActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-teal"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
            <AnimatePresence>
              {isJourneyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-border-subtle bg-bg-secondary p-2 shadow-lg shadow-black/40 z-modal"
                >
                  {journeySubLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setIsJourneyOpen(false)}
                      className="block rounded-md px-3 py-2 text-xs text-text-secondary hover:text-white hover:bg-white/[0.03] transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            aria-current={isContactActive ? "page" : undefined}
            className={`relative py-1.5 text-[13px] font-medium transition-colors duration-200 ${
              isContactActive ? "text-white" : "text-text-secondary hover:text-white"
            }`}
          >
            <span>Contact</span>
            {isContactActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-teal"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
          </Link>
        </nav>

        {/* Social Icons & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-3 border-l border-border-subtle pl-5">
            <a
              href="https://github.com/Enosh-J10"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-text-secondary hover:text-white hover:border-border-standard hover:bg-white/[0.02] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/enosh-jaques-b93817302"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-text-secondary hover:text-white hover:border-border-standard hover:bg-white/[0.02] transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          <button
            ref={toggleButtonRef}
            onClick={() => {
              setIsOpen(!isOpen);
              setIsWorkOpen(false);
              setIsJourneyOpen(false);
            }}
            className="flex xl:hidden touch-target items-center justify-center p-2 rounded-lg border border-border-subtle bg-white/[0.01] text-text-secondary hover:text-white hover:bg-white/[0.03] transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Menu"
            aria-controls={isOpen ? "mobile-navigation-dialog" : undefined}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="xl:hidden fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm z-backdrop"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation-dialog"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
              className="xl:hidden fixed top-[65px] right-0 bottom-0 w-full sm:w-[320px] bg-bg-secondary border-l border-border-subtle p-6 z-modal flex flex-col justify-between overflow-y-auto"
            >
              <nav className="flex flex-col gap-6" aria-label="Mobile Navigation Panel">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors min-h-[44px] flex items-center px-4 rounded-lg ${
                    pathname === "/" ? "bg-accent-teal/10 text-accent-cyan" : "text-text-secondary hover:text-white"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors min-h-[44px] flex items-center px-4 rounded-lg ${
                    isAboutActive ? "bg-accent-teal/10 text-accent-cyan" : "text-text-secondary hover:text-white"
                  }`}
                >
                  About
                </Link>

                {/* Work Group */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase block px-4">
                    Work Capability
                  </span>
                  <div className="pl-4 flex flex-col gap-1 border-l border-border-subtle ml-4">
                    {workSubLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xs font-medium transition-colors min-h-[38px] flex items-center px-3 rounded ${
                          pathname === sub.href ? "text-accent-cyan bg-white/[0.02]" : "text-text-secondary hover:text-white"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Journey Group */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase block px-4">
                    Journey Details
                  </span>
                  <div className="pl-4 flex flex-col gap-1 border-l border-border-subtle ml-4">
                    {journeySubLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xs font-medium transition-colors min-h-[38px] flex items-center px-3 rounded ${
                          pathname === sub.href ? "text-accent-cyan bg-white/[0.02]" : "text-text-secondary hover:text-white"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors min-h-[44px] flex items-center px-4 rounded-lg ${
                    isContactActive ? "bg-accent-teal/10 text-accent-cyan" : "text-text-secondary hover:text-white"
                  }`}
                >
                  Contact
                </Link>
              </nav>

              <div className="border-t border-border-subtle pt-6 flex flex-col gap-4 mt-8">
                <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                  Social Links
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Enosh-J10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/enosh-jaques-b93817302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-border-standard bg-white/[0.01] text-text-secondary hover:text-white transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
