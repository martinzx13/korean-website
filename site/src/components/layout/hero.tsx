"use client";

import { ChevronDown, ArrowRight } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-stretch overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden>
        <span
          className="absolute top-24 right-[44%] text-[180px] font-bold leading-none font-display"
          style={{ color: "rgba(44,44,44,0.04)" }}
        >
          한
        </span>
        <span
          className="absolute bottom-24 left-6 text-[100px] font-bold leading-none font-display"
          style={{ color: "rgba(44,44,44,0.05)" }}
        >
          국
        </span>
        <span
          className="absolute top-1/2 -translate-y-1/2 left-[40%] text-[64px] font-light leading-none font-display"
          style={{ color: "rgba(44,44,44,0.04)" }}
        >
          어
        </span>
      </div>

      <div className="relative z-10 flex flex-col justify-center px-8 lg:px-20 pt-32 pb-24 w-full lg:w-[54%]">
        <p className="text-xs tracking-[0.38em] text-primary uppercase mb-8">
          Seoul · Language &amp; Kitchen
        </p>

        <h1 className="text-5xl lg:text-6xl xl:text-[72px] font-normal leading-[1.08] text-foreground mb-8 font-display">
          Discover<br />
          the Art of<br />
          <em className="not-italic text-primary">Korean</em><br />
          Culture
        </h1>

        <p className="text-base lg:text-lg text-foreground/58 leading-relaxed mb-10 max-w-sm">
          Intimate workshops in language and cuisine — designed to bring you close to the living culture of Korea, one lesson at a time.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => scrollTo("workshops")}
            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 transition-all duration-300"
          >
            Explore Workshops
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="flex items-center gap-2 text-sm text-foreground/55 px-6 py-4 border border-border rounded-full hover:border-foreground/30 hover:text-foreground transition-all duration-200"
          >
            Our Philosophy
          </button>
        </div>

        <div className="absolute bottom-10 left-8 lg:left-20 flex items-center gap-3 text-foreground/35">
          <div className="w-px h-12 bg-current" />
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </div>

      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[49%] bg-muted overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=960&h=1200&fit=crop&auto=format"
          alt="A hand holds a calligraphy brush, writing Korean characters on rice paper"
          className="w-full h-full object-cover object-center"
          style={{ filter: "sepia(0.12) brightness(0.9) saturate(0.88)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #FAF7F2 0%, #FAF7F2 8%, transparent 12%)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(212,93,58,0.04)" }} />

        <div className="absolute bottom-28 left-10 bg-white/90 border border-border/70 rounded-2xl px-6 py-5 shadow-lg">
          <p className="text-3xl font-semibold text-foreground font-display">2</p>
          <p className="text-xs text-foreground/45 tracking-widest mt-1 uppercase">Workshops available</p>
        </div>
        <div className="absolute top-40 right-8 bg-white/90 border border-border/70 rounded-2xl px-6 py-5 shadow-lg">
          <p className="text-3xl font-semibold text-foreground font-display">30</p>
          <p className="text-xs text-foreground/45 tracking-widest mt-1 uppercase">Spots per session</p>
        </div>
      </div>
    </section>
  );
}
