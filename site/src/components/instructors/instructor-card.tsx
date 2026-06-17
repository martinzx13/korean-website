"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import type { Instructor } from "@/types";

export default function InstructorCard({ inst }: { inst: Instructor }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer select-none"
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`Flip card to ${flipped ? "see photo of" : "learn more about"} ${inst.name}`}
    >
      <div
        className="relative"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          height: "420px",
        }}
      >
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden bg-muted"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={inst.photo}
            alt={inst.photoAlt}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.88) saturate(0.9)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${inst.hue}cc 0%, transparent 55%)`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <p className="text-[10px] tracking-[0.32em] uppercase text-white/70 mb-1">{inst.specialty}</p>
            <h3 className="text-2xl font-semibold text-white leading-tight font-display">
              {inst.name}
            </h3>
          </div>
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white/70">
            <RefreshCw size={13} />
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-[20px] border border-border flex flex-col justify-between p-7"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
          }}
        >
          <div className="h-1 rounded-full mb-6" style={{ backgroundColor: inst.hue, width: "40px" }} />

          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-semibold mb-5 font-display"
            style={{ backgroundColor: inst.hue }}
          >
            {inst.initials}
          </div>

          <div className="flex-1">
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-1" style={{ color: inst.hue }}>
              {inst.specialty}
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-4 leading-snug font-display">
              {inst.name}
            </h3>
            <p className="text-sm text-foreground/60 leading-[1.85]">{inst.bio}</p>
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-3">Teaches</p>
            <div className="flex flex-wrap gap-2">
              {inst.workshops.map((w) => (
                <span
                  key={w}
                  className="text-[11px] px-3 py-1.5 rounded-full border"
                  style={{ borderColor: `${inst.hue}40`, color: inst.hue, background: `${inst.hue}0d` }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          <button className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground/30 hover:text-foreground/60 transition-colors">
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      <p className="text-center text-[11px] text-foreground/30 mt-3 tracking-wide">
        {flipped ? "Click to see photo" : "Click to learn more"}
      </p>
    </div>
  );
}
