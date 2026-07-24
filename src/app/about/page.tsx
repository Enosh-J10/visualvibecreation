import { Container } from '@/components/ui/Sections';
import Intro from '@/components/sections/Intro';
import Timeline from '@/components/sections/Timeline';
import Skills from '@/components/sections/Skills';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Learn more about Enosh Jaques, the creative journey, technical skills, and software engineering background at Visual Vibe Creation.',
  path: '/about',
});

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteConfig.url}/about/#webpage`,
        url: `${siteConfig.url}/about`,
        name: 'About Enosh Jaques — Visual Vibe Creation',
        description:
          'Software developer and creative founder story, skills breakdown, and career timeline.',
        mainEntity: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/about/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: `${siteConfig.url}/about`,
          },
        ],
      },
    ],
  };

  return (
    <main className="flex-grow w-full py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container variant="standard" className="text-center mb-16 pt-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          The Creative Journey
        </h1>
        <p className="mt-4 text-xs text-text-secondary leading-relaxed max-w-xl mx-auto">
          Driven by engineering precision and designed with cinematic style. Read about my origins,
          tools, and technical timeline.
        </p>
      </Container>

      <Intro />
      <Skills />
      <Timeline />
    </main>
  );
}
