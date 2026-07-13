"use client";

import { useState } from "react";
import { MapPin, Copy, Check, Send, Sparkles } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MotionWrappers";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@visualvibecreation.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct info & Copy features */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
                Start a Conversation
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold text-white tracking-tight sm:text-4xl">
                Let&apos;s Create Something Visual
              </h2>
              <p className="mt-4 text-xs text-text-secondary leading-relaxed">
                Reach out for freelance services, design requirements, university queries, or general creative collaborations.
              </p>

              {/* Availability Indicator */}
              <div className="mt-6 flex items-center gap-3 w-fit rounded-full border border-border-standard bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Active Availability: Q3/Q4 2026</span>
              </div>
            </div>

            {/* Email card */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Direct Email</h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-xl border border-border-standard bg-bg-secondary/40 backdrop-blur-sm group hover:border-accent-teal/20 transition-all duration-300 min-w-0">
                <div className="min-w-0">
                  <p className="text-[10px] text-text-secondary font-mono uppercase tracking-wider block">
                    General & Business Inbox
                  </p>
                  <p className="text-xs font-semibold text-white mt-0.5 break-words" style={{ overflowWrap: "anywhere" }}>hello@visualvibecreation.com</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="touch-target h-11 w-11 shrink-0 rounded-lg bg-white/5 hover:bg-accent-teal hover:text-bg-primary flex items-center justify-center text-text-secondary transition-all cursor-pointer self-start sm:self-center"
                  title="Copy Email"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-current" />
                  ) : (
                    <Copy className="h-4 w-4 text-current" />
                  )}
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <MapPin className="h-4 w-4 text-accent-teal" />
              <span>Based in London, United Kingdom &bull; Remote Worldwide</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-border-standard bg-bg-secondary p-8 md:p-10 relative overflow-hidden flex flex-col justify-center">
            {/* Background Glow */}
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent-teal/5 blur-3xl" />

            <div className="space-y-6">
              {/* Submission Status Alert */}
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-xs text-yellow-500 flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider block mb-1">Direct Submission Inactive</span>
                  <span>This contact form is for visual review only. Direct database relaying is not yet active. Please use the direct email action below.</span>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    disabled
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-border-standard bg-white/[0.01] px-4 py-3.5 text-xs text-text-secondary placeholder-white/10 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    placeholder="e.g. john@example.com"
                    className="w-full rounded-xl border border-border-standard bg-white/[0.01] px-4 py-3.5 text-xs text-text-secondary placeholder-white/10 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    disabled
                    rows={5}
                    placeholder="Describe your design or development goals..."
                    className="w-full rounded-xl border border-border-standard bg-white/[0.01] px-4 py-3.5 text-xs text-text-secondary placeholder-white/10 outline-none resize-none cursor-not-allowed"
                  />
                </div>

                <div className="w-full">
                  <MagneticWrapper className="w-full">
                    <Button
                      variant="primary"
                      href="mailto:hello@visualvibecreation.com"
                      className="w-full"
                      icon={<Send className="h-3.5 w-3.5" />}
                    >
                      Send Email (hello@visualvibecreation.com)
                    </Button>
                  </MagneticWrapper>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
