"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Workshop } from "@/types";

export default function WorkshopCard({ w }: { w: Workshop }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="group bg-card rounded-[16px] border border-border p-7 cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.08)"
          : "0 4px 20px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/workshops/${w.slug}`)}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="text-3xl leading-none">{w.emoji}</span>
        <span
          className={`text-[10px] px-3 py-1 rounded-full border tracking-widest uppercase ${
            w.tag === "Language"
              ? "border-primary/20 text-primary bg-primary/6"
              : "border-[#7D9B7E]/25 text-[#5A7A5B] bg-[#7D9B7E]/8"
          }`}
        >
          {w.tag}
        </span>
      </div>

      <h3 className="text-[19px] font-semibold text-foreground mb-2 leading-snug font-display">
        {w.title}
      </h3>
      <p className="text-sm text-foreground/52 leading-relaxed mb-6">{w.tagline}</p>

      <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-wide">
        <span className="px-2.5 py-1 rounded-full bg-muted text-foreground/50">{w.sessions} sessions</span>
        <span className="px-2.5 py-1 rounded-full bg-muted text-foreground/50">{w.duration}</span>
        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{w.price}</span>
      </div>

      {w.contains && (
        <p className="mt-3 text-[10px] text-foreground/40 tracking-wide">
          Contains: {w.contains}
        </p>
      )}

      <div className="mt-5">
        <span className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-xs py-3 rounded-full tracking-widest uppercase hover:bg-primary/90 transition-colors duration-200">
          Book Now{" "}
          <ArrowRight
            size={12}
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s ease" }}
          />
        </span>
      </div>
    </div>
  );
}
