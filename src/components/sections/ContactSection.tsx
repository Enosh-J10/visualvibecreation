"use client";

import { useState } from "react";
import { MapPin, Copy, Check, Send, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const emails = [
  { label: "General & Hello", address: "hello@visualvibecreation.com" },
  { label: "Business Enquiries", address: "contact@visualvibecreation.com" },
  { label: "Technical Support", address: "support@visualvibecreation.com" },
  { label: "Direct Founder Inbox", address: "enosh@visualvibecreation.com" },
];

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-white/[0.03] bg-bg-secondary/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct info & Copy features */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
                Start a Conversation
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold text-white tracking-tight sm:text-4xl">
                Let&apos;s Create Something Visual
              </h2>
              <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                Reach out for freelance services, internship proposals, university queries, or general creative collaborations.
              </p>

              {/* Availability Indicator */}
              <div className="mt-6 flex items-center gap-3 w-fit rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Active Availability: Q3/Q4 2026</span>
              </div>
            </div>

            {/* Email addresses */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Direct Emails</h3>
              <div className="space-y-3">
                {emails.map((email) => (
                  <div
                    key={email.address}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.05] bg-bg-secondary/40 backdrop-blur-sm group hover:border-accent-purple/20 transition-all duration-300"
                  >
                    <div>
                      <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">
                        {email.label}
                      </p>
                      <p className="text-xs font-semibold text-white mt-0.5 break-all">{email.address}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(email.address)}
                      className="h-11 w-11 rounded-lg bg-white/5 hover:bg-accent-purple hover:text-white flex items-center justify-center text-text-secondary transition-all"
                      title="Copy Email"
                    >
                      {copiedEmail === email.address ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <MapPin className="h-4 w-4 text-accent-purple" />
              <span>Based in United Kingdom &bull; Remote Worldwide</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.05] bg-bg-secondary p-8 md:p-10 relative overflow-hidden flex flex-col justify-center">
            {/* Background Glow */}
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent-purple/5 blur-3xl" />

            <div className="space-y-6">
              {/* Submission Status Alert */}
              <div className="rounded-xl border border-accent-pink/20 bg-accent-pink/5 p-4 text-xs text-accent-pink flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-accent-pink" />
                <div>
                  <span className="font-bold uppercase tracking-wider block mb-1">Direct Submission Inactive</span>
                  <span>This contact form is for visual review only. Direct database relaying is not yet active. Please use the fallback email action below.</span>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    disabled
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.01] px-4 py-3.5 text-sm text-text-secondary placeholder-white/10 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    placeholder="e.g. john@example.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.01] px-4 py-3.5 text-sm text-text-secondary placeholder-white/10 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    disabled
                    rows={5}
                    placeholder="Describe your design or development goals..."
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.01] px-4 py-3.5 text-sm text-text-secondary placeholder-white/10 outline-none resize-none cursor-not-allowed"
                  />
                </div>

                <MagneticButton className="w-full">
                  <a
                    href="mailto:hello@visualvibecreation.com"
                    className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-bg-primary py-4 text-sm font-semibold hover:bg-accent-purple hover:text-white transition-all"
                  >
                    <span>Send Email (hello@visualvibecreation.com)</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
