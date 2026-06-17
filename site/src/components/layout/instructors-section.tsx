import { INSTRUCTORS } from "@/lib/data";
import InstructorCard from "@/components/instructors/instructor-card";

export default function InstructorsSection() {
  return (
    <section id="instructors" className="py-28 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <p className="text-xs tracking-[0.35em] text-primary uppercase mb-4">Who Teaches</p>
          <h2 className="text-4xl lg:text-5xl font-normal text-foreground font-display">
            Our Instructors
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-[700px] mx-auto">
          {INSTRUCTORS.map((inst) => (
            <InstructorCard key={inst.name} inst={inst} />
          ))}
        </div>

        <div className="mt-24 relative h-64 rounded-[20px] overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1400&h=500&fit=crop&auto=format"
            alt="Cooked Korean food presented in white ceramic bowls"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.82) saturate(0.88)", objectPosition: "center 40%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(250,247,242,0.6) 0%, rgba(250,247,242,0.1) 60%, transparent 100%)" }}
          />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <p className="text-2xl lg:text-3xl font-normal text-foreground max-w-sm font-display">
              <em>&ldquo;Cooking is the first language Korea taught me.&rdquo;</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
