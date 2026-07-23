import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/animations/SmoothScroll';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SplashWrapper from '@/components/SplashWrapper';
import InteractiveBackground from '@/components/animations/InteractiveBackground';
import { siteConfig } from '@/lib/site-config';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Visual Vibe Creation | Independent Creative Digital Studio',
  description:
    'Visual Vibe Creation is the independent creative digital studio founded by Enosh Jaques, offering software development, UI/UX design, mobile app development, motion graphics, and video editing services in the UK.',
  keywords: [
    'Visual Vibe Creation',
    'Enosh Jaques',
    'Software Developer UK',
    'Creative Digital Studio',
    'UI UX Design',
    'Web Development Portfolio',
    'Android App Development',
    'Game Developer Goa',
    'Motion Graphics UK',
  ],
  authors: [{ name: 'Enosh Jaques', url: 'https://github.com/Enosh-J10' }],
  creator: 'Enosh Jaques',
  openGraph: {
    title: 'Visual Vibe Creation | Independent Creative Digital Studio',
    description: 'Software engineering and design portfolio by Enosh Jaques.',
    url: siteConfig.url,
    siteName: 'Visual Vibe Creation',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Vibe Creation | Independent Creative Digital Studio',
    description: 'Software engineering and design portfolio by Enosh Jaques.',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/assets/images/ej-logo.jpg',
    apple: '/assets/images/ej-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'ProfessionalService',
                  '@id': `${siteConfig.url}/#studio`,
                  name: 'Visual Vibe Creation',
                  url: siteConfig.url,
                  description:
                    'Independent creative digital studio of Enosh Jaques delivering design, software development, video editing, and motion graphics.',
                  founder: {
                    '@type': 'Person',
                    name: 'Enosh Jaques',
                    jobTitle: 'Founder & Creative Developer',
                    sameAs: [
                      'https://github.com/Enosh-J10',
                      'https://www.linkedin.com/in/enosh-jaques-b93817302',
                    ],
                  },
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'United Kingdom',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'hello@visualvibecreation.com',
                    contactType: 'customer support',
                  },
                },
              ],
            }),
          }}
        />
        <SplashWrapper>
          <SmoothScroll>
            <InteractiveBackground />
            <ScrollProgress />
            <Header />
            <div className="relative z-10 flex flex-col min-h-screen pt-[var(--header-height,68px)]">
              {children}
            </div>
            <Footer />
          </SmoothScroll>
        </SplashWrapper>
      </body>
    </html>
  );
}
