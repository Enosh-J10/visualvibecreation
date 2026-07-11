import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact | Visual Vibe Creation",
  description: "Get in touch with Enosh Jaques at Visual Vibe Creation for premium coding, design, and motion graphics projects.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 w-full py-12">
      <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Get In Touch
        </h1>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          Have an app idea or design requirements? Write us a message or copy our direct channels.
        </p>
      </div>

      <ContactSection />
    </main>
  );
}
