import ServicesGrid from "@/components/sections/ServicesGrid";

export const metadata = {
  title: "Services | Visual Vibe Creation",
  description: "High-end design, software, video editing, motion graphics, and mobile development services by Visual Vibe Creation.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1 w-full py-12">
      <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Services & Capabilities
        </h1>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          From visual branding assets to high-end application stacks. Here is how we design and deploy.
        </p>
      </div>

      <ServicesGrid />

      {/* FAQ or Process Section to add visual value */}
      <section className="relative px-6 md:px-12 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.05] bg-bg-secondary/40 p-8 md:p-12">
          <h2 className="font-display text-2xl font-bold text-white tracking-tight text-center">
            Our Work Process
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent-purple">01 / DISCOVER</span>
              <h4 className="text-sm font-semibold text-white">Understand & Draft</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Detailing requirements, sketching wireframes, and defining colors and architecture.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent-blue">02 / CREATE</span>
              <h4 className="text-sm font-semibold text-white">Code & Render</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Writing typescript systems, developing interfaces, and composting graphics layers.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent-pink">03 / LAUNCH</span>
              <h4 className="text-sm font-semibold text-white">Test & Deploy</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Conducting lighthouse reviews, securing domain routing, and publishing live onto Vercel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
