"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Check, MapPin, Zap, ArrowUpRight, GraduationCap, Briefcase, Trophy, Play, Star, Sparkles, BookOpen, Layers } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Display,
  Headline,
  LeadParagraph,
  Body,
  Overline,
  GradientText,
} from "@/components/ui/Typography";
import {
  SectionWrapper,
  Container,
  SectionHeader,
  StatisticBlock,
} from "@/components/ui/Sections";
import { ExperienceCard } from "@/components/ui/Cards";
import { TechnologyBadge } from "@/components/ui/PortfolioComponents";
import { TimelineContainer, TimelineStep } from "@/components/ui/TimelineComponents";
import { PortraitImage, PhoneMockup } from "@/components/ui/ImageComponents";
import {
  FadeUp,
  ScaleReveal,
  MouseTilt,
  MagneticWrapper,
} from "@/components/animations/MotionWrappers";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@visualvibecreation.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close location popover on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    if (isLocationOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isLocationOpen]);

  // Close location popover on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLocationOpen(false);
      }
    };
    if (isLocationOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocationOpen]);

  return (
    <main className="flex-grow w-full relative">
      {/* Dynamic Background Spotlights & Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent-teal/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-3/4 left-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-cyan/3 blur-[150px] pointer-events-none z-0" />

      {/* 1. Identity Showcase (Hero Section) */}
      <section
        suppressHydrationWarning
        className="relative pt-8 pb-16 lg:pb-24 min-h-[80vh] flex flex-col justify-center overflow-hidden z-10"
        aria-label="Welcome and Introduction"
      >
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Identity Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <FadeUp delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-teal/20 bg-accent-teal/5 text-accent-cyan text-[11px] font-mono tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span>Available for selected collaborations</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Display className="font-extrabold leading-[1.05] tracking-tight">
                Creative Developer. <br />
                <GradientText variant="teal">Designer.</GradientText> <br />
                Founder.
              </Display>
            </FadeUp>

            <FadeUp delay={0.15}>
              <LeadParagraph className="max-w-xl">
                I build digital products, visual identities, and creative experiences. I am based in London, with roots in Cavelossim, South Goa.
              </LeadParagraph>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticWrapper>
                  <Button variant="cta" href="/projects">
                    View My Work
                  </Button>
                </MagneticWrapper>
                <Button variant="secondary" href="/contact">
                  Get In Touch
                </Button>
              </div>
            </FadeUp>

            {/* Interactive Location Control */}
            <FadeUp delay={0.25}>
              <div className="pt-6 flex flex-wrap items-center gap-4 border-t border-border-subtle max-w-lg">
                <div ref={locationRef} className="relative inline-block">
                  <button
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    aria-expanded={isLocationOpen}
                    aria-haspopup="true"
                    aria-controls="location-popover"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-standard bg-bg-secondary/40 hover:bg-bg-secondary hover:border-accent-teal/30 text-text-secondary hover:text-white transition-all text-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-teal outline-none"
                  >
                    <MapPin className="h-3.5 w-3.5 text-accent-teal shrink-0" />
                    <span>Based in London • From Cavelossim, South Goa</span>
                    <ChevronDownIcon className={`h-3 w-3 text-text-muted transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isLocationOpen && (
                      <motion.div
                        id="location-popover"
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 mb-3 w-72 p-4 rounded-xl border border-border-subtle bg-bg-secondary shadow-xl shadow-black/80 z-modal space-y-4 text-left"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-text-muted uppercase block">Current Location</span>
                          <span className="text-white text-xs font-semibold block">London, United Kingdom</span>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=London,+United+Kingdom"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:underline"
                            aria-label="Open London in Google Maps in a new tab"
                          >
                            <span>Open in Google Maps</span>
                            <ArrowUpRight className="h-3 w-3 shrink-0" />
                          </a>
                        </div>
                        
                        <div className="space-y-1 pt-3 border-t border-border-subtle">
                          <span className="text-[10px] font-mono text-text-muted uppercase block">Home</span>
                          <span className="text-white text-xs font-semibold block">Cavelossim, South Goa, India</span>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Cavelossim,+Goa,+India"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:underline"
                            aria-label="Open Cavelossim Goa in Google Maps in a new tab"
                          >
                            <span>Open in Google Maps</span>
                            <ArrowUpRight className="h-3 w-3 shrink-0" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 text-xs text-text-secondary bg-bg-secondary/40 border border-border-standard px-3.5 py-1.5 rounded-full select-none">
                  <Zap className="h-3.5 w-3.5 text-accent-cyan shrink-0" />
                  <span>Founder of Visual Vibe Creation</span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Portrait Container */}
          <div className="lg:col-span-5 flex justify-center">
            <ScaleReveal delay={0.2}>
              <MouseTilt>
                <div className="relative group p-2.5 rounded-2xl border border-border-standard bg-bg-secondary/40 shadow-2xl shadow-black/60 ring-1 ring-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/10 via-transparent to-accent-cyan/10 opacity-60 pointer-events-none" />
                  <PortraitImage
                    alt="Enosh Jaques Portrait Photograph"
                    className="w-[280px] max-w-full sm:w-[320px] rounded-xl object-cover object-center ring-1 ring-white/10"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg border border-border-subtle bg-bg-primary/90 backdrop-blur-sm z-10 text-left">
                    <span className="text-[9px] font-mono text-accent-cyan uppercase tracking-widest block">Studio Profile</span>
                    <span className="text-xs font-bold text-white block mt-0.5">Enosh Jaques</span>
                  </div>
                </div>
              </MouseTilt>
            </ScaleReveal>
          </div>
        </Container>
      </section>

      {/* 2. What I'm Building Now (Current Snapshot) */}
      <SectionWrapper className="py-20 bg-bg-secondary/30 border-t border-b border-border-subtle relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,var(--color-bg-secondary),transparent_70%)] pointer-events-none" />
        <Container variant="reading" className="relative z-10">
          <FadeUp>
            <div className="text-center space-y-8">
              <div className="space-y-2">
                <Overline className="text-accent-teal">Focus & Progression</Overline>
                <Headline className="font-bold text-white tracking-tight leading-tight">
                  What I&apos;m Building Now
                </Headline>
              </div>

              {/* Focus List */}
              <div className="grid grid-cols-1 gap-4 text-left">
                {[
                  {
                    title: "FinCalc on Google Play",
                    description: "My financial calculation app is live on Google Play, supporting calculations for margins, compound interest, and amortization plans.",
                    tag: "Android Release",
                    tagColor: "bg-accent-teal/15 text-accent-cyan border-accent-teal/20"
                  },
                  {
                    title: "Visual Vibe Creation",
                    description: "I run Visual Vibe Creation as my independent studio, designing branding, posters, cards, and custom graphics for client projects.",
                    tag: "Self-Employment",
                    tagColor: "bg-white/5 text-text-secondary border-border-standard"
                  },
                  {
                    title: "BTEC IT Level 3",
                    description: "I am preparing to start the final year of my BTEC Level 3 Information Technology course in September.",
                    tag: "Technical Education",
                    tagColor: "bg-white/5 text-text-secondary border-border-standard"
                  },
                  {
                    title: "Frontend Engineering",
                    description: "I am refining my web development skills, experimenting with Next.js structures, and designing future web utility apps.",
                    tag: "Skills Expansion",
                    tagColor: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20"
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-border-standard bg-bg-primary/50 hover:bg-bg-primary/80 hover:border-accent-teal/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-teal shrink-0" />
                        <span>{item.title}</span>
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border w-fit shrink-0 ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 3. Featured Project (FinCalc Flagship Case Study) */}
      <SectionWrapper className="py-24 relative">
        <Container>
          <SectionHeader
            overline="Flagship Mobile Application"
            title="Featured Work: FinCalc"
            subtitle="I designed and built this native Android tool to simplify interest and compound growth calculations."
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Phone Mockup side */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeUp delay={0.1}>
                <MouseTilt>
                  <div className="relative group p-1 bg-gradient-to-tr from-accent-teal/10 to-transparent rounded-[44px]">
                    <PhoneMockup
                      alt="FinCalc App interface screenshot on Android screen"
                      className="transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                </MouseTilt>
              </FadeUp>
            </div>

            {/* Study Narrative side */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <FadeUp delay={0.15}>
                <div className="space-y-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded border border-accent-teal/20 bg-accent-teal/5 text-accent-cyan text-[10px] font-mono uppercase tracking-wider">
                    Case Narrative
                  </span>
                  <Headline className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Why I built it
                  </Headline>
                  <Body className="text-text-secondary leading-relaxed">
                    I started building FinCalc because I wanted a simpler, faster way to work out loan plans and compound values on a phone. The process taught me how to take an idea from wireframes through formula structures, testing phases, and finally publishing on Google Play.
                  </Body>
                </div>
              </FadeUp>

              {/* Case Q&A Structure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    q: "What I created",
                    a: "I built a mobile calculation utility in Java, handling margin, compound interest, and amortization plans."
                  },
                  {
                    q: "What challenged me",
                    a: "I had to figure out formula logic paths for complex compound frequencies and handle view state changes when changing screen layouts."
                  },
                  {
                    q: "What I learned",
                    a: "I gained practical knowledge of Android lifecycles, layouts via XML, device testing, and Google Play Console structures."
                  },
                  {
                    q: "What I'll improve next",
                    a: "I plan to rebuild the core calculation systems in Kotlin and transition the layout files to Jetpack Compose."
                  }
                ].map((item, idx) => (
                  <FadeUp key={item.q} delay={0.18 + idx * 0.05}>
                    <div className="space-y-1.5 p-4 rounded-xl border border-border-subtle bg-bg-secondary/40">
                      <h4 className="font-display text-xs font-bold text-accent-cyan tracking-tight uppercase font-mono">
                        {item.q}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.a}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              {/* Technologies */}
              <FadeUp delay={0.35}>
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">
                    Technologies Utilized
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <TechnologyBadge>Java</TechnologyBadge>
                    <TechnologyBadge>Android SDK</TechnologyBadge>
                    <TechnologyBadge>XML Layouts</TechnologyBadge>
                    <TechnologyBadge>Git</TechnologyBadge>
                    <TechnologyBadge>Google Play Console</TechnologyBadge>
                  </div>
                </div>
              </FadeUp>

              {/* Action Buttons */}
              <FadeUp delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    variant="playstore"
                    href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
                    external
                  >
                    Google Play Store
                  </Button>
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:text-white transition-colors"
                  >
                    <span>Read Full Projects Index</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. My Journey (Timeline Section) */}
      <SectionWrapper className="py-24 bg-bg-secondary/20 border-t border-b border-border-subtle relative">
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Narrative Steps"
            title="My Journey"
            subtitle="The path of my studies, relocation milestones, and creative endeavors."
          />
          <FadeUp>
            <TimelineContainer>
              <TimelineStep 
                year="School Years" 
                title="Growing Up and Learning in Goa" 
                subtitle="St. Pius X Convent High School, Orlim"
                icon={<GraduationCap className="h-4 w-4 text-accent-teal" />}
              >
                <Body className="text-text-secondary">
                  I studied at St. Pius X Convent High School from my early school years through Standard 10 and completed my secondary education with distinction.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="Childhood and Teenage Years" 
                title="Creativity Beyond the Classroom" 
                subtitle="Goan Tiatr and Performing Experience"
                icon={<Sparkles className="h-4 w-4 text-accent-cyan" />}
              >
                <Body className="text-text-secondary">
                  Throughout my childhood and teenage years in Goa, I participated in traditional Goan tiatr productions. This helped me build confidence, stage awareness, teamwork, public communication and coordination under pressure.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="Standards 11 and 12" 
                title="Choosing a Technical Path" 
                subtitle="Rosary Higher Secondary School, Navelim"
                icon={<BookOpen className="h-4 w-4 text-accent-teal" />}
              >
                <Body className="text-text-secondary">
                  I completed Standards 11 and 12 in the Computer Technology stream, studying programming logic, databases, software applications and computer networks, and graduated with distinction.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="Established 2022" 
                title="Building My Independent Studio" 
                subtitle="Visual Vibe Creation"
                icon={<Layers className="h-4 w-4 text-accent-cyan" />}
              >
                <Body className="text-text-secondary">
                  I founded Visual Vibe Creation in 2022 to bring together graphic design, branding, posters, invitation cards, business cards, social-media graphics, photography, video editing and technology.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="2024" 
                title="Moving to London" 
                subtitle="West Thames College"
                icon={<MapPin className="h-4 w-4 text-accent-teal" />}
              >
                <Body className="text-text-secondary">
                  I moved to London and joined West Thames College. I completed the T Level Foundation with a D*D result and continued into BTEC Level 3 Information Technology.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="2025" 
                title="Expanding My Industry Experience" 
                subtitle="Asendia UK Internship"
                icon={<Briefcase className="h-4 w-4 text-accent-cyan" />}
              >
                <Body className="text-text-secondary">
                  I completed an IT support internship at Asendia UK in Hounslow, building my understanding of workplace technology, support processes and business operations.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="Google Play Release" 
                title="Publishing My First Android App" 
                subtitle="FinCalc"
                icon={<Play className="h-4 w-4 text-accent-cyan" />}
              >
                <Body className="text-text-secondary">
                  I designed, built and published FinCalc on Google Play, turning my Android development work into a publicly available product.
                </Body>
              </TimelineStep>

              <TimelineStep 
                year="Planned Next Step" 
                title="University and Future Projects" 
                subtitle="Higher Education Goals"
                icon={<Star className="h-4 w-4 text-accent-teal" />}
              >
                <Body className="text-text-secondary">
                  After completing my BTEC Level 3 course, I plan to progress to university and continue developing software, applications and creative digital projects.
                </Body>
              </TimelineStep>
            </TimelineContainer>
            
            <div className="text-center pt-8">
              <Button variant="secondary" href="/experience">
                View Full Timeline Details
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 5. Visual Vibe Creation Section (Editorial Split) */}
      <SectionWrapper className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Studio Info side */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <FadeUp>
                <div className="space-y-4">
                  <Overline className="text-accent-cyan">Independent Creative Studio</Overline>
                  <Headline className="font-bold text-white tracking-tight leading-tight">
                    Visual Vibe Creation
                  </Headline>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Visual Vibe Creation is my independent creative studio, where I combine graphic design, branding, visual media and technology.
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    I create posters, invitations, business cards, logos, branding assets, social-media graphics, photography, video edits and selected digital projects for clients.
                  </p>
                </div>
              </FadeUp>

              {/* Service Categories Grid */}
              <FadeUp delay={0.1}>
                <div className="pt-4 border-t border-border-subtle">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-3">
                    Studio Capabilities
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Posters & Layouts",
                      "Invitations & Cards",
                      "Business Cards",
                      "Logos & Branding",
                      "Social Media Assets",
                      "Video Editing",
                      "Visual Content",
                      "Photography",
                      "Web Utilities"
                    ].map((service) => (
                      <span key={service} className="px-3 py-2 rounded-lg border border-border-subtle bg-bg-secondary/40 text-[11px] text-text-secondary hover:text-white hover:border-accent-teal/30 hover:bg-bg-secondary transition-all">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="pt-4 flex items-center gap-3">
                  <StatisticBlock value="2022" label="Established" />
                  <div className="h-8 w-px bg-border-subtle mx-4" />
                  <StatisticBlock value="Studio" label="100% Independent" />
                </div>
              </FadeUp>
            </div>

            {/* Brand Logo Placeholder side */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeUp delay={0.2}>
                <div className="glass-surface p-8 rounded-2xl border border-border-standard w-full max-w-[340px] aspect-square flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-teal/20 bg-accent-teal/5 text-accent-cyan z-10">
                    <svg viewBox="0 0 100 100" className="h-6 w-6 text-accent-cyan fill-none stroke-current">
                      <circle cx="50" cy="50" r="40" strokeWidth="2" className="stroke-accent-teal/25" />
                      <circle cx="20" cy="30" r="3" fill="currentColor" stroke="none" />
                      <circle cx="80" cy="30" r="3" fill="currentColor" stroke="none" />
                      <circle cx="20" cy="70" r="3" fill="currentColor" stroke="none" />
                      <path d="M32 53 L50 35 L68 53" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M32 67 L50 49 L68 67" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="space-y-3 z-10">
                    <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase block">
                      Creative Studio Logo
                    </span>
                    <h4 className="font-display text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                      Visual Vibe Creation
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Custom visual identities, invitations, business cards, and video assets.
                    </p>
                    <Link
                      href="/portfolio"
                      className="group/btn inline-flex items-center gap-1 text-xs text-accent-cyan font-semibold hover:text-white transition-colors pt-2"
                    >
                      <span>Explore Creative Works</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. Selected Client & Creative Work */}
      <SectionWrapper className="py-24 bg-bg-secondary/10 border-t border-b border-border-subtle">
        <Container>
          <SectionHeader
            overline="Client & Creative Commissions"
            title="Selected Visual Work"
            subtitle="A preview of layouts, branding drafts, and sunset photography. I will update this section with real client project files."
          />

          {/* Varied Showcase Grid (1 large, 2 small) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Large Featured Card (Poster Category) */}
            <div className="lg:col-span-7">
              <FadeUp className="h-full">
                <div className="group relative h-full flex flex-col justify-between p-6 rounded-2xl border border-border-standard bg-bg-secondary/40 hover:border-accent-teal/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-bg-primary">
                    <Image
                      src="/assets/images/portfolio-poster-v3.png"
                      alt="Graphic Layout Poster showing visual event design and typography 'Design that Connects'"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="relative z-25 mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider">
                        Poster Layout
                      </span>
                      <span className="text-[10px] font-mono text-text-muted">Graphic Design</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">Event Poster Typography Layout</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      I designed custom typography placements and contrast balancing for promotional layouts.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Typography", "Layout"].map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-text-muted px-2 py-0.5 rounded border border-border-subtle bg-white/[0.01]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Two Smaller Side Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Card 1: Branding */}
              <FadeUp delay={0.1} className="h-full">
                <div className="group relative p-5 rounded-2xl border border-border-standard bg-bg-secondary/40 hover:border-accent-teal/35 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-bg-primary">
                    <Image
                      src="/assets/images/portfolio-branding-v3.png"
                      alt="Logo guidelines and monogram grid for EJ Brand Identity"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-accent-cyan uppercase tracking-wider">Monogram Guideline</span>
                      <span className="font-mono text-text-muted">Branding</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white">EJ Brand Identity Grid</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      I established grid alignments and geometries for branding monograms and logos.
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* Card 2: Photography */}
              <FadeUp delay={0.15} className="h-full">
                <div className="group relative p-5 rounded-2xl border border-border-standard bg-bg-secondary/40 hover:border-accent-teal/35 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-bg-primary">
                    <Image
                      src="/assets/images/goa-landscape-v3.png"
                      alt="Sunset silhouette photograph with palm trees and boats"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-accent-cyan uppercase tracking-wider font-semibold">Photography</span>
                      <span className="font-mono text-text-muted">Creative Media</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white">Sunset silhouette</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      A study in golden hour photography, capturing composition balance and natural contrast levels.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>

          <div className="text-center pt-12">
            <Button variant="secondary" href="/portfolio">
              Explore Full Portfolio Showcase
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. Future Explorations (Secondary) */}
      <SectionWrapper className="py-16 bg-bg-primary">
        <Container>
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <Overline className="text-text-muted">Product Pipeline</Overline>
            <Headline className="text-xl sm:text-2xl font-bold text-white">
              Future Explorations
            </Headline>
            <p className="text-xs text-text-secondary leading-relaxed">
              I am research-testing code paths and sketching drafts for these upcoming side projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Future Card 1: Game concept */}
            <FadeUp>
              <div className="p-6 rounded-xl border border-border-subtle bg-bg-secondary/30 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-text-muted shrink-0" />
                    <span className="text-[10px] font-mono uppercase text-text-muted tracking-widest">Concept Stage</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-white">Upcoming Mobile Game</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    I am working on mechanics drafts, asset styles, and setup logic for a mobile game.
                  </p>
                </div>
                <span className="text-[9px] font-mono text-text-muted uppercase border border-border-subtle px-2 py-0.5 rounded w-fit">
                  Research Stage
                </span>
              </div>
            </FadeUp>

            {/* Future Card 2: Web tools */}
            <FadeUp delay={0.1}>
              <div className="p-6 rounded-xl border border-border-subtle bg-bg-secondary/30 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-text-muted shrink-0" />
                    <span className="text-[10px] font-mono uppercase text-text-muted tracking-widest">Exploration Stage</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-white">Micro Web Utilities</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    I am prototyping small utilities that solve simple day-to-day workflow tasks while building my frontend skillset.
                  </p>
                </div>
                <span className="text-[9px] font-mono text-text-muted uppercase border border-border-subtle px-2 py-0.5 rounded w-fit">
                  Planning Stage
                </span>
              </div>
            </FadeUp>
          </div>
        </Container>
      </SectionWrapper>

      {/* 8. Experience Snapshot */}
      <SectionWrapper className="py-24 bg-bg-secondary/20 border-t border-b border-border-subtle">
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Employment History"
            title="Experience Snapshot"
            subtitle="A list of my past work placements, internships, and self-employed studio commissions."
          />
          <FadeUp>
            <div className="space-y-6">
              <ExperienceCard
                role="Founder and Self-Employed Creative"
                company="Visual Vibe Creation"
                period="2022 - Present"
                description="I create posters, invitations, business cards, logos, branding assets, social-media graphics, and custom visual assets. I manage design parameters, revisions, and deliveries independently."
              />
              <ExperienceCard
                role="IT Support Intern"
                company="Asendia UK"
                location="Hounslow, London, United Kingdom"
                period="January 2025"
                description="I completed an IT support internship at Asendia UK in Hounslow, where I learned how departments use technology in daily operations. I gained exposure to workplace systems, technical support processes, internal communication and how IT supports different business functions."
              />
              <ExperienceCard
                role="Industry Work Experience"
                company="Hadley Property Group"
                period="2024"
                description="I completed an industry placement learning about the property sector, preparing slideshow layouts, analyzing information, and pitching a property development design in a Dragon's Den-style group challenge."
              />
              <ExperienceCard
                role="IT Support Experience"
                company="Radisson Blu Resort, Goa"
                period="2021"
                description="I supported IT operations at the hotel, assisting with system checks, troubleshooting, device installations, hotel network setups, and technical request logs for staff."
              />
            </div>
            
            <div className="text-center pt-10">
              <Button variant="secondary" href="/experience">
                View Full Experience Log
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 9. Education Progression */}
      <SectionWrapper className="py-24">
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Academic Milestones"
            title="Education Progression"
            subtitle="My academic history, including IT courses and tech study directions."
          />
          <FadeUp>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  school: "West Thames College, London, United Kingdom",
                  degree: "BTEC Level 3 Information Technology",
                  period: "Sept 2024 - Present",
                  desc: "I completed the T Level Foundation programme with a verified D*D result. I am preparing to begin the second and final year of my BTEC Level 3 Information Technology course."
                },
                {
                  school: "Rosary Higher Secondary School, Navelim, South Goa, India",
                  degree: "Computer Technology Stream",
                  period: "2022 - 2023",
                  desc: "I completed Standards 11 and 12 in Computer Technology with distinction. My studies included programming logic, database systems, software applications and computer networks."
                },
                {
                  school: "St. Pius X Convent High School, Orlim, South Goa, India",
                  degree: "Secondary Education through Standard 10",
                  period: "Completed 2021",
                  desc: "I completed my school education through Standard 10 and graduated with distinction."
                },
                {
                  school: "University Computing Course",
                  degree: "Planned Next Step",
                  period: "Future Direction",
                  desc: "After completing BTEC Level 3, I plan to progress to a computing-related university course."
                }
              ].map((item) => (
                <div key={item.school} className="p-6 rounded-xl border border-border-standard bg-bg-secondary/40 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <h4 className="font-display text-sm font-bold text-white">{item.school}</h4>
                    <span className="text-xs text-accent-cyan font-semibold block">{item.degree}</span>
                    <p className="text-xs text-text-secondary leading-relaxed pt-2">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted uppercase shrink-0 pt-1 font-bold">
                    {item.period}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center pt-10">
              <Button variant="secondary" href="/education">
                View Full Education Records
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 10. Recognition & Leadership */}
      <SectionWrapper className="py-24 bg-bg-secondary/20 border-t border-b border-border-subtle">
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Recognition & Activity"
            title="Awards & Leadership"
            subtitle="My creative and academic accomplishments, focusing on leadership skills."
          />
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Award 1 */}
              <div className="p-6 rounded-xl border border-border-standard bg-bg-secondary/40 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <Trophy className="h-5 w-5 text-accent-teal" />
                  <h4 className="font-display text-sm font-bold text-white">Student Experience Student of the Year 2025–2026</h4>
                  <span className="text-[10px] font-mono text-text-muted uppercase block">West Thames College</span>
                  <p className="text-xs text-text-secondary leading-relaxed pt-1">
                    I received this college award in recognition of my academic work, helping classmates understand coding layouts and database setups.
                  </p>
                </div>
                <span className="text-[9px] font-mono text-accent-cyan border border-accent-teal/20 px-2 py-0.5 rounded w-fit">
                  Academic Award
                </span>
              </div>

              {/* Leadership 1 */}
              <div className="p-6 rounded-xl border border-border-standard bg-bg-secondary/40 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <Sparkles className="h-5 w-5 text-accent-cyan" />
                  <h4 className="font-display text-sm font-bold text-white">Goan Tiatr Performing Experience</h4>
                  <span className="text-[10px] font-mono text-text-muted uppercase block">Creative Participation</span>
                  <p className="text-xs text-text-secondary leading-relaxed pt-1">
                    I performed in traditional Goan stage plays. This helped me build my confidence, stage presence, public communication, and group coordination skills.
                  </p>
                </div>
                <span className="text-[9px] font-mono text-text-muted border border-border-subtle px-2 py-0.5 rounded w-fit">
                  Stage & Leadership
                </span>
              </div>
            </div>

            <div className="text-center pt-10">
              <Button variant="secondary" href="/awards">
                View Awards Details
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 11. Let's Build Together (Contact Section) */}
      <SectionWrapper id="contact" className="py-28 relative overflow-hidden">
        <Container variant="reading">
          <FadeUp>
            <div className="glass-surface p-8 md:p-12 rounded-2xl border border-border-standard text-center space-y-8 relative overflow-hidden group">
              <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <Overline className="text-accent-teal">Inquiries & Collaboration</Overline>
                <Headline className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Let&apos;s build something meaningful together.
                </Headline>
                <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                  Have a design project, digital idea, or opportunity to discuss? I am open to collaborations, freelance work, and conversations about creative technology.
                </p>
              </div>

              {/* Copy Email Area */}
              <div className="relative z-10 max-w-md mx-auto p-3 rounded-xl border border-border-standard bg-bg-primary flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2 pl-2">
                  <Mail className="h-4 w-4 text-accent-cyan shrink-0" />
                  <span className="text-xs text-text-primary font-mono select-all break-all">
                    hello@visualvibecreation.com
                  </span>
                </div>
                <Button
                  variant="primary"
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto min-h-[38px] h-9 px-4 rounded-lg bg-accent-teal text-bg-primary hover:bg-[#0b7c72]"
                >
                  {copied ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </span>
                  ) : (
                    <span>Copy Email</span>
                  )}
                </Button>
              </div>
              
              {/* Screen reader live region */}
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>

              {/* Direct links to socials */}
              <div className="relative z-10 pt-4 flex flex-wrap justify-center gap-4 text-xs">
                <a
                  href="https://github.com/Enosh-J10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <span className="text-text-muted">·</span>
                <a
                  href="https://www.linkedin.com/in/enosh-jaques-b93817302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <span className="text-text-muted">·</span>
                <a
                  href="https://www.instagram.com/designer_visual_vibe_creations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <span className="text-text-muted">·</span>
                <a
                  href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  Google Play
                </a>
              </div>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>
    </main>
  );
}

// Chevron helper
function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`h-3 w-3 ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
