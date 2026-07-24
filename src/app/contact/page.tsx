import { Container } from '@/components/ui/Sections';
import ContactSection from '@/components/sections/ContactSection';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Enosh Jaques at Visual Vibe Creation for software development, UI/UX design, and motion graphics project inquiries.',
  path: '/contact',
});

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${siteConfig.url}/contact/#webpage`,
        url: `${siteConfig.url}/contact`,
        name: 'Contact Enosh Jaques — Visual Vibe Creation',
        description: 'Direct contact portal for software engineering and creative inquiries.',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/contact/#breadcrumb`,
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
            name: 'Contact',
            item: `${siteConfig.url}/contact`,
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
          Get In Touch
        </h1>
        <p className="mt-4 text-xs text-text-secondary leading-relaxed max-w-xl mx-auto">
          Have an app idea or design requirements? Write a message or copy my direct channels.
        </p>
      </Container>

      <ContactSection />
    </main>
  );
}
