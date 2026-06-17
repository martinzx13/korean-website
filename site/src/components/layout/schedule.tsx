"use client";

import { ArrowRight, Globe, MapPin } from "lucide-react";
import { SESSIONS } from "@/lib/data";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Schedule() {
  return (
    <section id="schedule" className="py-28 lg:py-40 px-6" style={{ background: "#F5F0E9" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-primary uppercase mb-4">When We Meet</p>
            <h2 className="text-4xl lg:text-5xl font-normal text-foreground font-display">
              Schedule
            </h2>
          </div>
          <p className="text-foreground/50 text-sm max-w-[260px] leading-relaxed">
            June 26–28, 2026 · All sessions in-person in Portugal.
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-border">
                {["Day", "Time", "Workshop", "Instructor", "Format"].map((h) => (
                  <th
                    key={h}
                    className="text-left pb-5 pr-6 text-xs tracking-[0.22em] uppercase text-foreground/38 font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SESSIONS.map((s, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 hover:bg-background/60 transition-colors duration-150"
                >
                  <td className="py-5 pr-6 text-sm font-medium text-foreground/75">{s.day}</td>
                  <td className="py-5 pr-6 text-sm text-foreground/55 tabular-nums">{s.time}</td>
                  <td className="py-5 pr-6 text-sm font-medium text-foreground font-display">{s.workshop}</td>
                  <td className="py-5 pr-6 text-sm text-foreground/55">{s.instructor}</td>
                  <td className="py-5">
                    {s.format === "Online" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#7D9B7E]/14 text-[#4A6B4A]">
                        <Globe size={10} /> Online
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                        <MapPin size={10} /> In-person
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 pt-4 text-center text-sm text-foreground/50">
          <p className="mb-1"><strong className="text-foreground/70">Language:</strong> €20/person · 3h</p>
          <p><strong className="text-foreground/70">Cooking:</strong> €50/person · €60/couple · 3h</p>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => scrollTo("workshops")}
            className="group flex items-center gap-3 text-sm text-foreground/55 hover:text-foreground border border-border hover:border-foreground/25 px-8 py-4 rounded-full transition-all duration-200"
          >
            Reserve your spot
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
