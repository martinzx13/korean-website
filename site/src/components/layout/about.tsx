export default function About() {
  return (
    <section id="about" className="py-28 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-28 items-center">
        <div>
          <p className="text-xs tracking-[0.35em] text-primary uppercase mb-6">Our Philosophy</p>
          <h2 className="text-4xl lg:text-5xl font-normal leading-[1.18] text-foreground mb-8 font-display">
            Language is culture.<br />
            <em className="not-italic text-primary">Food is memory.</em>
          </h2>
          <div className="space-y-5 text-foreground/62 leading-[1.85] text-base lg:text-[17px] max-w-[440px]">
            <p>
              Hanguk Studio was founded on a simple belief: the deepest way to understand a culture is through its language and its table.
            </p>
            <p>
              We offer small, carefully curated workshops led by instructors who grew up inside these traditions — not just studied them. Every class is an invitation to slow down, pay attention, and connect.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-6">
            {[
              { value: "30", label: "per class" },
              { value: "3", label: "expert instructors" },
              { value: "2", label: "disciplines" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl lg:text-3xl font-semibold text-foreground font-display">{value}</p>
                <p className="text-xs text-foreground/45 mt-1.5 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-muted shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=1000&fit=crop&auto=format"
            alt="An overhead view of a spread of Korean dishes"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.9) saturate(0.92)" }}
          />
          <div className="absolute inset-0 rounded-[24px]" style={{ background: "rgba(212,93,58,0.04)" }} />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 rounded-xl px-5 py-3 border border-border/60 shadow-sm">
            <p className="text-xs text-foreground/75 tracking-wide">
              Korean table culture — <em className="font-display">bap sang</em> philosophy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
