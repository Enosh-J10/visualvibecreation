'use client';

import { useState, useRef } from 'react';
import { MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';
import { MagneticWrapper } from '@/components/animations/MotionWrappers';
import Button from '@/components/ui/Button';
import { type TurnstileInstance } from '@marsidev/react-turnstile';
import { contactSchema } from '@/lib/contact-schema';
import dynamic from 'next/dynamic';

const Turnstile = dynamic(() => import('@marsidev/react-turnstile').then((mod) => mod.Turnstile), {
  ssr: false,
});

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState(''); // Honeypot
  const [turnstileToken, setTurnstileToken] = useState('');

  type VerificationState = 'loading' | 'ready' | 'verified' | 'expired' | 'error';

  const [verificationState, setVerificationState] = useState<VerificationState>('loading');
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@visualvibecreation.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTurnstile = () => {
    turnstileRef.current?.reset();
    setTurnstileToken('');
    setVerificationState('ready');
    setVerificationMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setFieldErrors({});

    // Validate fields (name, email, message)
    const validation = contactSchema.safeParse({
      name,
      email,
      message,
      turnstileToken,
      companyWebsite,
    });

    if (!validation.success) {
      const formatted = validation.error.format();
      const errors: typeof fieldErrors = {};
      if (formatted.name?._errors?.[0]) errors.name = formatted.name._errors[0];
      if (formatted.email?._errors?.[0]) errors.email = formatted.email._errors[0];
      if (formatted.message?._errors?.[0]) errors.message = formatted.message._errors[0];

      if (errors.name || errors.email || errors.message) {
        setFieldErrors(errors);
        setIsSubmitting(false);
        return;
      }
    }

    // Check Turnstile token explicitly
    if (verificationState !== 'verified' || !turnstileToken) {
      setVerificationMessage('Please complete the security verification.');
      setIsSubmitting(false);
      return;
    }

    const token = turnstileToken;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          turnstileToken: token,
          companyWebsite,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitStatus('error');

        if (data.code === 'TURNSTILE_EXPIRED') {
          setVerificationState('expired');
          setVerificationMessage('The security verification expired. Please verify again.');
          setErrorMessage('The security verification expired. Please verify again.');
        } else if (data.code === 'TURNSTILE_INVALID') {
          setVerificationState('error');
          setVerificationMessage('Verification failed. Please retry.');
          setErrorMessage('Verification failed. Please retry.');
        } else {
          setErrorMessage(data.message || 'Your message could not be sent right now.');
        }
      } else {
        setSubmitStatus('success');
        // Clear form on success
        setName('');
        setEmail('');
        setMessage('');
        setCompanyWebsite('');
        // Reset Turnstile
        resetTurnstile();
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Your message could not be sent right now.');
      console.error('Network error during submission:', err);
    } finally {
      setIsSubmitting(false);
    }
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
                Let&apos;s build something meaningful.
              </h2>
              <p className="mt-4 text-xs text-text-secondary leading-relaxed">
                Have a project, opportunity or idea to discuss? Send me a message and I’ll get back
                to you as soon as I can.
              </p>

              {/* Availability Indicator */}
              <div className="mt-6 flex items-center gap-3 w-fit rounded-full border border-border-standard bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Open to selected collaborations</span>
              </div>
            </div>

            {/* Email card */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Direct Email
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-xl border border-border-standard bg-bg-secondary/40 backdrop-blur-sm group hover:border-accent-teal/20 transition-all duration-300 min-w-0">
                <div className="min-w-0">
                  <p className="text-[10px] text-text-secondary font-mono uppercase tracking-wider block">
                    General & Business Inbox
                  </p>
                  <p
                    className="text-xs font-semibold text-white mt-0.5 break-words"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    hello@visualvibecreation.com
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="touch-target h-11 w-11 shrink-0 rounded-lg bg-white/5 hover:bg-accent-teal hover:text-bg-primary flex items-center justify-center text-text-secondary transition-all cursor-pointer self-start sm:self-center"
                  title="Copy Email Address"
                  aria-label="Copy direct email address to clipboard"
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
              {/* Privacy Note */}
              <div className="rounded-xl border border-border-standard bg-white/[0.02] p-4 text-xs text-text-secondary flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-accent-cyan" aria-hidden="true" />
                <span>
                  Your message is sent securely to my inbox. I will only use your details to respond
                  to this enquiry.
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from sight/tab index) */}
                <div className="absolute opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden">
                  <label htmlFor="companyWebsite">Company Website</label>
                  <input
                    type="text"
                    id="companyWebsite"
                    name="companyWebsite"
                    tabIndex={-1}
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-mono text-text-secondary uppercase tracking-wider block"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) {
                        setFieldErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full rounded-xl border border-border-standard bg-white/[0.01] px-4 py-3.5 text-xs text-white placeholder-white/10 outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all min-h-[44px]"
                    aria-invalid={fieldErrors.name ? 'true' : 'false'}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="text-xs text-red-400 mt-1" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono text-text-secondary uppercase tracking-wider block"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="e.g. john@example.com"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full rounded-xl border border-border-standard bg-white/[0.01] px-4 py-3.5 text-xs text-white placeholder-white/10 outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all min-h-[44px]"
                    aria-invalid={fieldErrors.email ? 'true' : 'false'}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="text-xs text-red-400 mt-1" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="message"
                      className="text-xs font-mono text-text-secondary uppercase tracking-wider block"
                    >
                      Your Message
                    </label>
                    <span className="text-[10px] font-mono text-text-muted" aria-live="polite">
                      {message.length} / 3000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (fieldErrors.message) {
                        setFieldErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder="Describe your design or development goals..."
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full rounded-xl border border-border-standard bg-white/[0.01] px-4 py-3.5 text-xs text-white placeholder-white/10 outline-none resize-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all min-h-[44px]"
                    aria-invalid={fieldErrors.message ? 'true' : 'false'}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="text-xs text-red-400 mt-1" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Turnstile verification */}
                <div className="space-y-2">
                  <div className="w-full overflow-hidden max-w-full min-h-[70px]">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={
                        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
                      }
                      onLoad={() => {
                        setVerificationState((current) =>
                          current === 'verified' ? current : 'ready',
                        );
                      }}
                      onSuccess={(token: string) => {
                        setTurnstileToken(token);
                        setVerificationState('verified');
                        setVerificationMessage(null);
                      }}
                      onExpire={() => {
                        setTurnstileToken('');
                        setVerificationState('expired');
                        setVerificationMessage(
                          'The security verification expired. Please verify again.',
                        );
                      }}
                      onError={() => {
                        setTurnstileToken('');
                        setVerificationState('error');
                        setVerificationMessage('Verification failed. Please retry.');
                      }}
                      options={{
                        theme: 'dark',
                        size: 'flexible',
                        refreshExpired: 'auto',
                        refreshTimeout: 'auto',
                        retry: 'auto',
                      }}
                    />
                  </div>
                  {verificationMessage && (
                    <p id="turnstile-error" className="text-xs text-red-400 mt-1" role="alert">
                      {verificationMessage}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="w-full space-y-4">
                  <MagneticWrapper className="w-full">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting || verificationState !== 'verified' || !turnstileToken}
                      className="w-full flex items-center justify-center gap-2 min-h-[44px]"
                      icon={isSubmitting ? undefined : <Send className="h-3.5 w-3.5" />}
                    >
                      {isSubmitting
                        ? 'Sending...'
                        : submitStatus === 'success'
                          ? 'Message sent'
                          : 'Send message'}
                    </Button>
                  </MagneticWrapper>

                  {/* Mailto fallback */}
                  <div className="text-center pt-2">
                    <p className="text-[11px] text-text-secondary">
                      Prefer email?{' '}
                      <a
                        href="mailto:hello@visualvibecreation.com"
                        className="text-accent-teal hover:text-accent-cyan underline transition-colors"
                      >
                        Write to hello@visualvibecreation.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* ARIA live status announcements */}
                <div aria-live="polite" className="mt-4">
                  {submitStatus === 'success' && (
                    <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-xs text-green-400 font-medium">
                      Thanks — your message has been sent. I&apos;ll respond as soon as I can.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400 font-medium">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
