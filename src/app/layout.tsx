import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CursorGlow from "@/components/animations/CursorGlow";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visual Vibe Creation | Independent Creative Digital Studio",
  description: "Visual Vibe Creation is a premium creative digital studio founded by Enosh Jaques, offering high-end software development, UI/UX design, mobile app development, motion graphics, and video editing services in the UK.",
  keywords: [
    "Visual Vibe Creation",
    "Enosh Jaques",
    "Software Developer UK",
    "Creative Digital Studio",
    "UI UX Design",
    "Web Development Portfolio",
    "Android App Development",
    "Game Developer Goa",
    "Motion Graphics UK",
  ],
  authors: [{ name: "Enosh Jaques", url: "https://github.com/Enosh-J10" }],
  creator: "Enosh Jaques",
  openGraph: {
    title: "Visual Vibe Creation | Independent Creative Digital Studio",
    description: "Premium software engineering and design portfolio by Enosh Jaques.",
    url: "https://visualvibecreation.com",
    siteName: "Visual Vibe Creation",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Vibe Creation | Independent Creative Digital Studio",
    description: "Premium software engineering and design portfolio by Enosh Jaques.",
  },
  alternates: {
    canonical: "https://visualvibecreation.com",
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
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-accent-purple/30 selection:text-white font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://visualvibecreation.com/#studio",
                  "name": "Visual Vibe Creation",
                  "url": "https://visualvibecreation.com",
                  "description": "Award-level creative digital studio delivering high-end design, software development, video editing, and motion graphics.",
                  "founder": {
                    "@type": "Person",
                    "name": "Enosh Jaques",
                    "jobTitle": "Founder & Lead Architect",
                    "sameAs": [
                      "https://github.com/Enosh-J10",
                      "https://www.linkedin.com/in/enosh-jaques-b93817302"
                    ]
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "United Kingdom"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "hello@visualvibecreation.com",
                    "contactType": "customer support"
                  }
                }
              ]
            })
          }}
        />
        <SmoothScroll>
          <CursorGlow />
          <Header />
          <div className="flex flex-col min-h-screen pt-20">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
