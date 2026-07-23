'use client';

import { motion } from 'framer-motion';

const skillsData = [
  {
    category: 'Languages & Core',
    skills: [
      { name: 'Kotlin', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'C# (Unity)', level: 75 },
      { name: 'Java', level: 80 },
    ],
  },
  {
    category: 'Web & Systems',
    skills: [
      { name: 'Next.js (App Router)', level: 88 },
      { name: 'React', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Node.js & Express', level: 82 },
      { name: 'REST APIs', level: 87 },
    ],
  },
  {
    category: 'Mobile & Platforms',
    skills: [
      { name: 'Android SDK', level: 88 },
      { name: 'Jetpack Compose', level: 85 },
      { name: 'Unity Engine', level: 70 },
      { name: 'Vercel / Cloudflare', level: 80 },
      { name: 'Git / GitHub', level: 90 },
    ],
  },
  {
    category: 'Creative & Design',
    skills: [
      { name: 'UI Design (Figma)', level: 90 },
      { name: 'UX Wireframing', level: 85 },
      { name: 'Adobe Illustrator', level: 92 },
      { name: 'Adobe Photoshop', level: 88 },
      { name: 'Motion Graphics', level: 80 },
    ],
  },
];

export default function Skills() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
            Capabilities
          </span>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight sm:text-4xl">
            Technical Skill Matrix
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            A comprehensive mapping of Enosh Jaques&apos; cross-disciplinary competencies across
            coding languages, tools, and visual frameworks.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {skillsData.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              className="rounded-2xl border border-border-standard bg-bg-secondary/40 backdrop-blur-sm p-8"
            >
              <h3 className="font-display text-lg font-bold text-white tracking-tight mb-8">
                {group.category}
              </h3>

              <div className="space-y-6">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-text-secondary">{skill.level}%</span>
                    </div>
                    {/* Bar Indicator */}
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-accent-teal to-accent-cyan rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
