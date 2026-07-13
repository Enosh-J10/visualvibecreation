"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Check, MapPin, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Display,
  Headline,
  LeadParagraph,
  Body,
  Overline,
  GradientText,
  StatusLabel,
} from "@/components/ui/Typography";
import {
  SectionWrapper,
  Container,
  SectionHeader,
  StatisticBlock,
  GridWrapper,
  HeroBackground,
} from "@/components/ui/Sections";
import { ProjectCard, ExperienceCard, AwardCard } from "@/components/ui/Cards";
import { TechnologyBadge } from "@/components/ui/PortfolioComponents";
import { TimelineContainer, TimelineStep } from "@/components/ui/TimelineComponents";
import { PortraitImage, PhoneMockup } from "@/components/ui/ImageComponents";
import {
  FadeUp,
  ScaleReveal,
  MouseTilt,
  MagneticWrapper,
} from "@/components/animations/MotionWrappers";
import EmptyStatePlaceholder from "@/components/ui/EmptyStates";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@visualvibecreation.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 w-full relative">
      {/* 1. Identity Showcase (Hero Section) */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        <HeroBackground />
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Identity Text */}
          <div className="lg:col-span-7 space-y-6">
            <FadeUp delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-teal/20 bg-accent-teal/5 text-accent-cyan text-[11px] font-mono tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span>Available for collaborations</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Display className="font-extrabold leading-[1.05]">
                Creative Developer. <br />
                <GradientText variant="teal">Designer.</GradientText> <br />
                Founder.
              </Display>
            </FadeUp>

            <FadeUp delay={0.15}>
              <LeadParagraph className="max-w-xl">
                Building digital products, visual identities and modern web experiences from London, with roots in Goa, India.
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
                <Button variant="ghost" href="/contact">
                  Get In Touch
                </Button>
              </div>
            </FadeUp>

            {/* Status Lines */}
            <FadeUp delay={0.25}>
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-text-secondary border-t border-border-subtle max-w-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent-teal" />
                  <span>Based in London • Originally from Goa</span>
                </div>
                <span className="hidden sm:inline text-text-muted">|</span>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent-cyan" />
                  <span>Founder of Visual Vibe Creation</span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Portrait Image column */}
          <div className="lg:col-span-5 flex justify-center">
            <ScaleReveal delay={0.2}>
              <MouseTilt>
                <PortraitImage
                  src="/assets/images/enosh-portrait.jpg"
                  alt="Enosh Jaques Portrait Photograph"
                  className="w-[280px] max-w-full sm:w-[320px] rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10"
                />
              </MouseTilt>
            </ScaleReveal>
          </div>
        </Container>
      </section>

      {/* 2. Current Snapshot */}
      <SectionWrapper>
        <Container variant="reading">
          <FadeUp>
            <div className="text-center space-y-6">
              <Overline>Current Snapshot</Overline>
              <Headline className="font-bold text-white tracking-tight leading-tight">
                Focus & Progression
              </Headline>
              <div className="glass-surface p-6 rounded-xl border border-border-subtle text-left space-y-4">
                <div className="flex items-center gap-3">
                  <StatusLabel type="info">Active Growth</StatusLabel>
                  <span className="text-xs text-text-muted font-mono">Status Update</span>
                </div>
                <Body className="text-text-secondary">
                  Currently preparing to begin the second and final year of my BTEC Level 3 Information Technology course at West Thames College in September, before progressing to university.
                </Body>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border-subtle text-xs text-text-secondary">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-text-muted uppercase block">Academic Milestone</span>
                    <span className="text-white font-medium">Completed T Level Foundation with verified D*D grade</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-text-muted uppercase block">Direct Action</span>
                    <span className="text-white font-medium">Released FinCalc, an Android app on Google Play Store</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 3. Featured Project (FinCalc Flagship) */}
      <SectionWrapper>
        <Container>
          <SectionHeader
            overline="Flagship Engineering"
            title="Technical Case Study: FinCalc"
            subtitle="My first published Android application, built from scratch to verify software development, design, and calculation logic."
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Phone Mockup side */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeUp delay={0.1}>
                <MouseTilt>
                  <PhoneMockup
                    src="/assets/images/fincalc-phone.jpg"
                    alt="FinCalc App interface screenshot on Android screen"
                  />
                </MouseTilt>
              </FadeUp>
            </div>

            {/* Study Narrative side */}
            <div className="lg:col-span-7 space-y-6">
              <FadeUp delay={0.15}>
                <div className="space-y-4">
                  <span className="badge-accent uppercase tracking-widest text-[9px]">Case Narrative</span>
                  <Headline className="text-xl sm:text-2xl font-bold text-white">
                    Solving Financial Margin Calculation Clumsiness
                  </Headline>
                  <Body className="text-text-secondary leading-relaxed">
                    I built FinCalc to solve a personal frustration: calculating profit margins and compound interest quickly on my phone was clumsy. Instead of copying template scripts, I wrote the calculation structures from scratch in Java.
                  </Body>
                  <Body className="text-text-secondary leading-relaxed">
                    This project taught me the importance of component lifecycle states, layout memory footprint, and material design systems. It transformed my development approach, showing me that clean UX is just as critical as clean code.
                  </Body>
                </div>
              </FadeUp>

              {/* Technologies */}
              <FadeUp delay={0.2}>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">
                    Technologies Explored & Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <TechnologyBadge>Android SDK</TechnologyBadge>
                    <TechnologyBadge>Java</TechnologyBadge>
                    <TechnologyBadge>XML Layouts</TechnologyBadge>
                    <TechnologyBadge>Git</TechnologyBadge>
                    <TechnologyBadge>Google Play Console</TechnologyBadge>
                  </div>
                </div>
              </FadeUp>

              {/* Action Buttons */}
              <FadeUp delay={0.25}>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="playstore"
                    href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
                    external
                  >
                    Google Play Store
                  </Button>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan hover:text-white transition-colors"
                  >
                    <span>Read Full Projects List</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. Journey Preview */}
      <SectionWrapper>
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Narrative Progression"
            title="Chronological Steps"
            subtitle="A preview of my transition across regions, technologies, and creative disciplines."
          />
          <FadeUp>
            <TimelineContainer>
              <TimelineStep year="2021" title="Orlim, Goa" subtitle="Where It Started">
                <Body className="text-text-secondary">
                  Developing early visual curiosity, taking photos of quiet landscapes, and learning the basics of design.
                </Body>
              </TimelineStep>
              <TimelineStep year="2022" title="Creative Initiatives" subtitle="Discovering Tiatr Theater">
                <Body className="text-text-secondary">
                  Performed in traditional Goan tiatr theater before live audiences of more than 500 people, learning coordination under pressure.
                </Body>
              </TimelineStep>
              <TimelineStep year="2022" title="Studio Foundation" subtitle="Building Visual Vibe Creation">
                <Body className="text-text-secondary">
                  Founded my independent creative studio to combine branding design, video editing, and code.
                </Body>
              </TimelineStep>
              <TimelineStep year="2024" title="Transition to London" subtitle="West Thames College">
                <Body className="text-text-secondary">
                  Moving to London, adapting to a global tech capital, and completing the T Level Foundation with a D*D result.
                </Body>
              </TimelineStep>
              <TimelineStep year="2026+" title="Looking Ahead" subtitle="University Studies">
                <Body className="text-text-secondary">
                  Planning to study Computer Science or Software Engineering at university.
                </Body>
              </TimelineStep>
            </TimelineContainer>
            
            <div className="text-center pt-8">
              <Button variant="secondary" href="/experience">
                Explore Full Journey details
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 5. Visual Vibe Creation Studio */}
      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Studio Info side */}
            <div className="lg:col-span-7 space-y-6">
              <FadeUp>
                <div className="space-y-4">
                  <Overline>Independent Studio</Overline>
                  <Headline className="font-bold text-white tracking-tight leading-tight">
                    Visual Vibe Creation
                  </Headline>
                  <Body className="text-text-secondary leading-relaxed">
                    Visual Vibe Creation is my independent creative studio where I combine design, branding and technology to help ideas become engaging digital experiences.
                  </Body>
                  <Body className="text-text-secondary leading-relaxed">
                    It serves as the umbrella for all my client freelance work, design assets, video editing commissions, and visual projects, ensuring everything is presented with a consistent premium standard.
                  </Body>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="pt-4 border-t border-border-subtle grid grid-cols-2 gap-4">
                  <StatisticBlock value="2022" label="Established" />
                  <StatisticBlock value="100%" label="Independent" />
                </div>
              </FadeUp>
            </div>

            {/* Brand Logo / Artwork Mock side */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeUp delay={0.15}>
                <div className="glass-surface p-8 rounded-2xl border border-border-subtle w-full max-w-[340px] aspect-square flex flex-col justify-between group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-teal/20 bg-accent-teal/5 text-accent-cyan">
                    <svg viewBox="0 0 100 100" className="h-6 w-6 text-accent-cyan fill-none stroke-current stroke-[8]">
                      <path d="M20 20 h60 v15 H35 v15 h40 v15 H35 v15 h45" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase block">
                      Brand Mark
                    </span>
                    <h4 className="font-display text-base font-bold text-white group-hover:text-accent-cyan transition-colors">
                      Visual Vibe Creation
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Handcrafted branding designs and video editing assets.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. Selected Work (Portfolio Cards) */}
      <SectionWrapper>
        <Container>
          <SectionHeader
            overline="Creative Portfolio"
            title="Selected Visual Work"
            subtitle="A selection of graphic assets, branding, and photography themes."
          />
          <GridWrapper cols={3}>
            {/* Poster design preview */}
            <ProjectCard
              title="Graphic Layout Poster"
              description="High-contrast layout detailing visual event design and poster typography."
              category="Graphic Design"
              imageSrc="/assets/images/portfolio-poster.jpg"
              href="/portfolio"
              tags={["Typography", "Layout"]}
            />

            {/* Monogram branding preview */}
            <ProjectCard
              title="EJ Monogram Architecture"
              description="Logo guidelines and geometric monogram grid for visual brand identities."
              category="Branding"
              imageSrc="/assets/images/portfolio-branding.jpg"
              href="/portfolio"
              tags={["Logo", "Branding"]}
            />

            {/* Photography theme preview */}
            <ProjectCard
              title="Sunset at Orlim"
              description="High-contrast sunset silhouette photography theme capturing natural Goa landscapes."
              category="Photography"
              imageSrc="/assets/images/goa-landscape.jpg"
              href="/portfolio"
              tags={["Nature", "Sunset"]}
            />
          </GridWrapper>

          {/* Placeholders for upcoming work */}
          <div className="mt-12 pt-12 border-t border-border-subtle">
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-6">
              Future Exploration Pipelines
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmptyStatePlaceholder
                title="Upcoming Mobile Game"
                description="Currently in the planning and concept stage. Researching gameplay logic and graphic elements."
                type="game"
              />
              <EmptyStatePlaceholder
                title="Micro Web Utilities"
                description="Currently exploring data structure visualization layouts. Concept stage research project."
                type="web"
              />
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. Experience Snapshot */}
      <SectionWrapper>
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Employment History"
            title="Experience Snapshot"
            subtitle="Work experiences and internships focused on client communication and technical systems support."
          />
          <FadeUp>
            <div className="space-y-6">
              <ExperienceCard
                role="Founder & Creative"
                company="Visual Vibe Creation (Self-Employed)"
                period="2022 - Present"
                description="Independently designing visual identities, logos, event poster assets, and video edits for remote clients. Focus was placed on matching custom client requirements and managing project timelines."
              />
              <ExperienceCard
                role="IT Service Desk Placement"
                company="Hadley Group"
                period="2024"
                description="Assisted in database operations, network setup configurations, and hardware troubleshooting. Learnt how to resolve software challenges in a corporate database environment under strict security standards."
              />
              <ExperienceCard
                role="Hospitality Placement"
                company="Radisson Blu Resort, Goa"
                period="2021"
                description="Supported hospitality service desks and booking structures. Learnt customer psychology, communication etiquette, and workflow efficiency under high-pressure customer service situations."
              />
            </div>
            
            <div className="text-center pt-8">
              <Button variant="secondary" href="/experience">
                View Full Timeline
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 8. Education Snapshot */}
      <SectionWrapper>
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Academic Path"
            title="Education Timeline"
            subtitle="Consistently achieving distinctions and preparing for higher computer science studies."
          />
          <FadeUp>
            <TimelineContainer>
              <TimelineStep year="Sept 2024 - Present" title="West Thames College, London" subtitle="BTEC Level 3 Information Technology">
                <Body className="text-text-secondary">
                  Completed BTEC T Level Foundation year with a verified distinction D*D result. Currently preparing to start Year 2 in September, before progressing to university.
                </Body>
              </TimelineStep>
              <TimelineStep year="2022 - 2023" title="Rosary Higher Secondary School, Goa" subtitle="Computer Technology Stream">
                <Body className="text-text-secondary">
                  Achieved 75% Distinction in Computer Technology. Focus subjects included Database Management, Programming Logic, and Computer Networks.
                </Body>
              </TimelineStep>
              <TimelineStep year="Completed 2021" title="St. Pius X High School, Goa" subtitle="Secondary School Certificate">
                <Body className="text-text-secondary">
                  Graduated with a 79% Distinction. Developed fundamental mathematics and analytical skills.
                </Body>
              </TimelineStep>
            </TimelineContainer>
            
            <div className="text-center pt-8">
              <Button variant="secondary" href="/education">
                View Education Progression
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 9. Awards & Leadership */}
      <SectionWrapper>
        <Container variant="reading">
          <SectionHeader
            align="center"
            overline="Recognition"
            title="Awards & Leadership"
            subtitle="Milestones showcasing academic dedication and stage confidence."
          />
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AwardCard
                title="Student of the Year"
                issuer="West Thames College"
                date="2024"
                description="Awarded for consistent academic performance during the T Level Foundation course, alongside helping peers with programming logic."
              />
              <AwardCard
                title="Goan Tiatr Theatre"
                issuer="Stage Coordination"
                date="2022"
                description="Performed before live audiences of 500+ people. Learnt public speech control, crowd engagement, and stage setup collaboration."
              />
            </div>
            
            <div className="text-center pt-8">
              <Button variant="secondary" href="/awards">
                View Awards Details
              </Button>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>

      {/* 10. Let's Build Together (Contact Section) */}
      <SectionWrapper id="contact">
        <Container variant="reading">
          <FadeUp>
            <div className="glass-surface p-8 md:p-12 rounded-2xl border border-border-subtle text-center space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <Overline>Inquiries & Collaboration</Overline>
                <Headline className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Let&apos;s build something meaningful together.
                </Headline>
                <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                  Whether you want to discuss university progression, tech partnerships, design projects, or code, feel free to reach out.
                </p>
              </div>

              {/* Copy Email Area */}
              <div className="relative z-10 max-w-md mx-auto p-4 rounded-xl border border-border-standard bg-bg-primary flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent-cyan" />
                  <span className="text-xs text-text-primary font-mono select-all">
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

              {/* Direct links to socials */}
              <div className="relative z-10 pt-4 flex justify-center gap-4 text-xs">
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
              </div>
            </div>
          </FadeUp>
        </Container>
      </SectionWrapper>
    </main>
  );
}
