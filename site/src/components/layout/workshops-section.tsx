import { WORKSHOPS } from "@/lib/data";
import WorkshopCard from "@/components/workshops/workshop-card";

export default function WorkshopsSection() {
  return (
    <section id="workshops" className="py-28 lg:py-40 px-6" style={{ background: "#F5F0E9" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-primary uppercase mb-4">What We Offer</p>
            <h2 className="text-4xl lg:text-5xl font-normal text-foreground font-display">
              Workshops
            </h2>
          </div>
          <p className="text-foreground/50 text-sm max-w-[280px] leading-relaxed">
            Two workshops spanning language and traditional Korean kitchen craft.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-[700px] mx-auto">
          {WORKSHOPS.map((w) => (
            <WorkshopCard key={w.title} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
