import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { WORKSHOPS } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function WorkshopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workshop = WORKSHOPS.find((w) => w.slug === slug);
  if (!workshop) notFound();

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-[700px] mx-auto">
        <Link
          href="/#workshops"
          className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to workshops
        </Link>

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden mb-8 bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={workshop.slug === "kimchi-bossam" ? "/images/kimchi-bossam-hero.png" : "/images/korean-language-hero.png"}
            alt={workshop.slug === "kimchi-bossam" ? "Fresh kimchi and sliced bossam pork on a Korean dining table" : "Hand writing Korean Hangul characters on rice paper with a brush pen"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-display text-foreground mb-3">{workshop.title}</h1>
        <p className="text-foreground/50 text-lg mb-6">{workshop.tagline}</p>

        {/* Metadata pills */}
        <div className="flex flex-wrap gap-2 text-sm text-foreground/50 mb-10">
          <span className="px-3 py-1.5 rounded-full bg-muted">3 sessions</span>
          <span className="px-3 py-1.5 rounded-full bg-muted">{workshop.duration}</span>
          <span className="px-3 py-1.5 rounded-full bg-muted">{workshop.price}</span>
          {workshop.contains && (
            <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs">
              Contains allergens
            </span>
          )}
        </div>

        {/* ── Kimchi & Bossam ── */}
        {workshop.slug === "kimchi-bossam" && (
          <>
            {/* What You'll Make */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5">
              <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-normal mb-5">What You&apos;ll Make</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <span className="text-2xl leading-none mt-0.5">🥬</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Fresh Kimchi (Geotjeori)</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">Crisp napa cabbage coated in gochugaru, garlic, fish sauce, and sesame — made fresh, not fermented.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl leading-none mt-0.5">🥩</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Bossam (Boiled Pork Belly)</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">Tender pork shoulder slow-boiled with soy, ginger, garlic, and green onion. Sliced thin for wrapping.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5">
              <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-normal mb-5">What&apos;s Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "All ingredients and cooking equipment",
                  "Step-by-step guidance from instructor",
                  "Recipe card to take home",
                  "Tastings of both dishes",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={14} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Good to Know */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5">
              <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-normal mb-5">Good to Know</h2>
              <ul className="space-y-2.5 text-sm text-foreground/60">
                <li className="flex gap-3"><span className="text-foreground/30">•</span> One session per day (17:00–20:00)</li>
                <li className="flex gap-3"><span className="text-foreground/30">•</span> Couple price: <strong className="text-foreground/80">€60 for 2</strong> (instead of €100)</li>
                <li className="flex gap-3"><span className="text-foreground/30">•</span> All ingredients included — just bring yourself</li>
                <li className="flex gap-3"><span className="text-foreground/30">•</span> Ages 12+. Minors must be accompanied by an adult</li>
              </ul>
            </div>

            {/* Allergen line */}
            <p className="text-[11px] text-foreground/40 tracking-wide mb-8">
              Contains: {workshop.contains}
            </p>
          </>
        )}

        {/* ── Korean Language ── */}
        {workshop.slug === "korean-language" && (
          <>
            {/* What You'll Learn */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5">
              <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-normal mb-5">What You&apos;ll Learn</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <span className="text-2xl leading-none font-display text-foreground/70 mt-0.5">ㄱ</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Hangul Foundation</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">Write and read the Korean alphabet — consonants, vowels, and batchim.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl leading-none font-display text-foreground/70 mt-0.5">ㄴ</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Everyday Phrases</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">Greetings, introductions, and essential survival expressions for your first conversation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl leading-none font-display text-foreground/70 mt-0.5">ㄷ</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Cultural Context</p>
                    <p className="text-sm text-foreground/55 leading-relaxed">Understand the meanings and etiquette behind the language — formal vs. informal, age hierarchy, and more.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5">
              <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-normal mb-5">What&apos;s Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "All learning materials provided",
                  "Interactive practice with instructor",
                  "Hangul writing worksheet",
                  "Pronunciation guidance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={14} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Good to Know */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5">
              <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-normal mb-5">Good to Know</h2>
              <ul className="space-y-2.5 text-sm text-foreground/60">
                <li className="flex gap-3"><span className="text-foreground/30">•</span> Three sessions: Jun 26, 27, 28 (10:00–13:00)</li>
                <li className="flex gap-3"><span className="text-foreground/30">•</span> Each session builds on the last</li>
                <li className="flex gap-3"><span className="text-foreground/30">•</span> No experience needed — perfect for beginners</li>
                <li className="flex gap-3"><span className="text-foreground/30">•</span> Ages 12+. Minors must be accompanied by an adult</li>
              </ul>
            </div>
          </>
        )}

        {/* CTA */}
        <Link
          href={`/workshops/${workshop.slug}/book`}
          className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 w-full"
        >
          Book Your Spot <ArrowRight size={15} />
        </Link>
      </div>
    </main>
  );
}
