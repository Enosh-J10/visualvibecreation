'use client';

import { motion } from 'framer-motion';
import { Palette, Terminal, Film, Monitor } from 'lucide-react';

const serviceCategories = [
  {
    title: 'UI/UX & Web Design',
    icon: Monitor,
    description:
      'Creating visually clean web interfaces focusing on pixel-perfect layouts, intuitive navigation, and consistent brand typography.',
    services: [
      'UI Design',
      'UX Design',
      'Website Design',
      'Frontend Development',
      'Website Development',
    ],
    color: 'from-accent-cyan/5 to-transparent',
  },
  {
    title: 'Software & Mobile Apps',
    icon: Terminal,
    description:
      'Developing lightweight mobile applications and custom desktop software tailored for optimal performance and native integration.',
    services: [
      'Android App Development',
      'Software Development',
      'Game Design',
      'Java/Kotlin systems',
    ],
    color: 'from-accent-teal/5 to-transparent',
  },
  {
    title: 'Graphic Design & Branding',
    icon: Palette,
    description:
      'Designing brand identity packages and monogram assets that communicate clearly across digital platforms.',
    services: [
      'Logo Design',
      'Brand Identity',
      'Poster Design',
      'Business Cards',
      'Social Media Design',
      'Digital Branding',
    ],
    color: 'from-accent-teal/5 to-transparent',
  },
  {
    title: 'Motion Graphics & Video',
    icon: Film,
    description:
      'Editing high-fidelity promotional clips, visual assets, transition kits, and engaging motion sequences.',
    services: ['Video Editing', 'Motion Graphics', 'VFX Compositing', 'Promotional Videos'],
    color: 'from-white/[0.01] to-transparent',
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
            Capabilities
          </span>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight sm:text-4xl">
            Digital Services
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            I provide a focused range of design and development capabilities to help ideas become
            clean digital products.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-border-standard bg-bg-secondary p-8 hover:border-accent-teal/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Accent Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03] border border-border-standard text-white group-hover:text-accent-cyan group-hover:border-accent-teal/20 transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-display mt-6 text-xl font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>

                  <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle space-y-2">
                  {cat.services.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-accent-teal" />
                      <span className="text-[11px] font-medium text-text-secondary group-hover:text-white transition-colors">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
