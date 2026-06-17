"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3"
        >
          <span className="text-sm text-primary tracking-[0.25em] font-display">
            한국
          </span>
          <span className="w-px h-5 bg-border" />
          <span className="text-xs tracking-[0.18em] text-foreground/60 uppercase">
            Hanguk Studio
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-foreground/55 hover:text-foreground tracking-wide transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("workshops")}
          className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground text-xs px-6 py-2.5 rounded-full tracking-widest uppercase hover:bg-primary/90 transition-all duration-200"
        >
          Enroll
        </button>

        <button
          className="lg:hidden p-2 text-foreground/70"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
              className="text-left text-base text-foreground/70 hover:text-foreground py-3 border-b border-border/40 transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo("workshops"); setMenuOpen(false); }}
            className="mt-4 bg-primary text-primary-foreground text-sm px-6 py-3.5 rounded-full tracking-wide w-full"
          >
            Enroll Now
          </button>
        </div>
      )}
    </nav>
  );
}
