import { Container } from "@/components/ui/Sections";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact | Visual Vibe Creation",
  description: "Get in touch with Enosh Jaques at Visual Vibe Creation for premium coding, design, and motion graphics projects.",
};

export default function ContactPage() {
  return (
    <main className="flex-grow w-full py-12">
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
