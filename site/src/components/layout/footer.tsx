"use client";

import { Mail, MapPin, Instagram, Youtube, ArrowRight } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer id="contact" className="pt-28 lg:pt-40 pb-12 px-6 border-t border-border">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 mb-24">
          <div>
            <p className="text-xs tracking-[0.35em] text-primary uppercase mb-6">Get In Touch</p>
            <h2 className="text-3xl lg:text-4xl font-normal text-foreground mb-10 leading-[1.2] font-display">
              Ready to begin?<br />
              <em className="not-italic text-primary">{"We'd love to hear from you."}</em>
            </h2>

            <div className="space-y-5">
              <a
                href="mailto:hello@hangukstudio.com"
                className="flex items-center gap-4 text-foreground/60 hover:text-primary transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <Mail size={14} />
                </div>
                <span className="text-sm">hello@hangukstudio.com</span>
              </a>
              <div className="flex items-center gap-4 text-foreground/60">
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                <span className="text-sm">Portugal · Workshops in your city</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/45 hover:text-primary hover:border-primary transition-all duration-200"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/45 hover:text-primary hover:border-primary transition-all duration-200"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-muted border border-border relative h-80 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=700&h=500&fit=crop&auto=format"
              alt="Korean calligraphy manuscript — ink on paper"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              style={{ filter: "sepia(0.3)" }}
            />
            <div className="relative text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <MapPin size={20} className="text-primary" />
              </div>
              <p className="text-sm text-foreground/70 font-medium">Portugal</p>
              <p className="text-sm text-foreground/50">Korean Culture Workshops</p>
            </div>
          </div>
        </div>

        <div className="mb-20 bg-primary rounded-2xl px-10 py-12 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-primary-foreground/70 text-xs tracking-[0.3em] uppercase mb-2">June 26–28, 2026</p>
            <h3 className="text-2xl lg:text-3xl font-normal text-primary-foreground font-display">
              Enrollment is now open.
            </h3>
          </div>
          <button
            onClick={() => scrollTo("workshops")}
            className="shrink-0 flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary-foreground/90 transition-colors group"
          >
            Reserve Your Place
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-primary tracking-[0.22em] font-display">한국</span>
            <span className="w-px h-4 bg-border" />
            <span className="text-xs tracking-[0.15em] text-foreground/45 uppercase">Hanguk Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo("workshops")} className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors">Terms</button>
            <span className="text-xs text-foreground/30">© 2026 Hanguk Studio. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
