import { useState, useEffect } from "react";
import {
  ChevronDown,
  MapPin,
  Mail,
  Instagram,
  Youtube,
  Menu,
  X,
  ArrowRight,
  Globe,
  RefreshCw,
} from "lucide-react";

const WORKSHOPS = [
  {
    emoji: "📖",
    title: "Korean for Beginners",
    tagline: "Start with Hangul, speak with confidence",
    sessions: 8,
    instructor: "Ji-Young Kim",
    tag: "Language",
  },
  {
    emoji: "💬",
    title: "Intermediate Korean",
    tagline: "Expand vocabulary and master natural grammar",
    sessions: 10,
    instructor: "Ji-Young Kim",
    tag: "Language",
  },
  {
    emoji: "🎙️",
    title: "Conversation Club",
    tagline: "Fluency through guided daily dialogue",
    sessions: 6,
    instructor: "Min-Jun Park",
    tag: "Language",
  },
  {
    emoji: "🥬",
    title: "Kimchi & Fermentation",
    tagline: "Ancient craft, living flavors from Korean tradition",
    sessions: 4,
    instructor: "Seo-Yeon Choi",
    tag: "Kitchen",
  },
  {
    emoji: "🍱",
    title: "Korean Temple Food",
    tagline: "Mindful cooking from mountain monasteries",
    sessions: 6,
    instructor: "Seo-Yeon Choi",
    tag: "Kitchen",
  },
  {
    emoji: "🔥",
    title: "K-BBQ Mastery",
    tagline: "The art and ritual of the Korean grill",
    sessions: 4,
    instructor: "Dae-Ho Jung",
    tag: "Kitchen",
  },
];

const INSTRUCTORS = [
  {
    name: "Ji-Young Kim",
    initials: "JK",
    specialty: "Language",
    bio: "Holds a master's in Korean linguistics from Seoul National University. Brings 12 years of immersive teaching experience with a focus on natural speech patterns and cultural context.",
    hue: "#C4714E",
    photo: "https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=600&h=750&fit=crop&auto=format",
    photoAlt: "Calligraphy instructor at work",
    workshops: ["Korean for Beginners", "Intermediate Korean"],
  },
  {
    name: "Seo-Yeon Choi",
    initials: "SC",
    specialty: "Cuisine",
    bio: "Trained under three generations of temple cooks in Jeollabuk-do. Bridges traditional fermentation craft with an accessible, meditative approach to home cooking.",
    hue: "#7D9B7E",
    photo: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=750&fit=crop&auto=format",
    photoAlt: "Korean dishes prepared by instructor",
    workshops: ["Kimchi & Fermentation", "Korean Temple Food"],
  },
  {
    name: "Min-Jun Park",
    initials: "MP",
    specialty: "Language",
    bio: "Former Korean Cultural Institute lecturer. Specialises in pronunciation, drama, and the spoken rhythms that textbooks miss.",
    hue: "#8A7D6B",
    photo: "https://images.unsplash.com/photo-1545038522-9bb451739ab9?w=600&h=750&fit=crop&auto=format",
    photoAlt: "Written Korean script close-up",
    workshops: ["Conversation Club"],
  },
];

const SESSIONS = [
  { day: "Monday", time: "6:30 PM", workshop: "Korean for Beginners", instructor: "Ji-Young Kim", format: "In-person" },
  { day: "Tuesday", time: "7:00 PM", workshop: "Kimchi & Fermentation", instructor: "Seo-Yeon Choi", format: "In-person" },
  { day: "Wednesday", time: "6:00 PM", workshop: "Intermediate Korean", instructor: "Ji-Young Kim", format: "Online" },
  { day: "Thursday", time: "5:30 PM", workshop: "Korean Temple Food", instructor: "Seo-Yeon Choi", format: "In-person" },
  { day: "Friday", time: "7:30 PM", workshop: "Conversation Club", instructor: "Min-Jun Park", format: "Online" },
  { day: "Saturday", time: "10:00 AM", workshop: "K-BBQ Mastery", instructor: "Dae-Ho Jung", format: "In-person" },
  { day: "Saturday", time: "2:00 PM", workshop: "Korean for Beginners", instructor: "Ji-Young Kim", format: "Online" },
];

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Workshops", id: "workshops" },
  { label: "Instructors", id: "instructors" },
  { label: "Schedule", id: "schedule" },
  { label: "Contact", id: "contact" },
];

const display: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
const body: React.CSSProperties = { fontFamily: "'Noto Sans KR', 'Inter', sans-serif" };

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background text-foreground" style={body}>

      {/* ─────────────── Nav ─────────────── */}
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
            <span className="text-sm text-primary tracking-[0.25em]" style={display}>한국</span>
            <span className="w-px h-5 bg-border" />
            <span className="text-xs tracking-[0.18em] text-foreground/60 uppercase">Hanguk Studio</span>
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
            onClick={() => scrollTo("contact")}
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
              onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
              className="mt-4 bg-primary text-primary-foreground text-sm px-6 py-3.5 rounded-full tracking-wide w-full"
            >
              Enroll Now
            </button>
          </div>
        )}
      </nav>

      {/* ─────────────── Hero ─────────────── */}
      <section id="hero" className="relative min-h-screen flex items-stretch overflow-hidden">
        {/* Decorative Korean characters */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden>
          <span
            className="absolute top-24 right-[44%] text-[180px] font-bold leading-none"
            style={{ ...display, color: "rgba(44,44,44,0.025)" }}
          >
            한
          </span>
          <span
            className="absolute bottom-24 left-6 text-[100px] font-bold leading-none"
            style={{ ...display, color: "rgba(44,44,44,0.03)" }}
          >
            국
          </span>
          <span
            className="absolute top-1/2 -translate-y-1/2 left-[40%] text-[64px] font-light leading-none"
            style={{ ...display, color: "rgba(44,44,44,0.025)" }}
          >
            어
          </span>
        </div>

        {/* Left — content */}
        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-20 pt-32 pb-24 w-full lg:w-[54%]">
          <p
            className="text-xs tracking-[0.38em] text-primary uppercase mb-8"
          >
            Seoul · Language &amp; Kitchen
          </p>

          <h1
            className="text-5xl lg:text-6xl xl:text-[72px] font-normal leading-[1.08] text-foreground mb-8"
            style={display}
          >
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

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-8 lg:left-20 flex items-center gap-3 text-foreground/35">
            <div className="w-px h-12 bg-current" />
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>

        {/* Right — atmospheric photo */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[49%] bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=960&h=1200&fit=crop&auto=format"
            alt="A hand holds a calligraphy brush, writing Korean characters on rice paper"
            className="w-full h-full object-cover object-center"
            style={{ filter: "sepia(0.12) brightness(0.9) saturate(0.88)" }}
          />
          {/* Gradient bleed into left panel */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #FAF7F2 0%, transparent 22%)" }}
          />
          {/* Warm tint */}
          <div className="absolute inset-0" style={{ background: "rgba(212,93,58,0.04)" }} />

          {/* Floating info cards */}
          <div className="absolute bottom-28 left-10 bg-background/92 backdrop-blur-sm border border-border rounded-2xl px-6 py-5 shadow-lg">
            <p className="text-3xl font-semibold text-foreground" style={display}>6</p>
            <p className="text-xs text-foreground/45 tracking-widest mt-1 uppercase">Unique workshops</p>
          </div>
          <div className="absolute top-40 right-8 bg-background/92 backdrop-blur-sm border border-border rounded-2xl px-6 py-5 shadow-lg">
            <p className="text-3xl font-semibold text-foreground" style={display}>340+</p>
            <p className="text-xs text-foreground/45 tracking-widest mt-1 uppercase">Students this year</p>
          </div>
        </div>
      </section>

      {/* ─────────────── About ─────────────── */}
      <section id="about" className="py-28 lg:py-40 px-6">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-28 items-center">
          {/* Text */}
          <div>
            <p className="text-xs tracking-[0.35em] text-primary uppercase mb-6">Our Philosophy</p>
            <h2
              className="text-4xl lg:text-5xl font-normal leading-[1.18] text-foreground mb-8"
              style={display}
            >
              Language is culture.<br />
              <em>Food is memory.</em>
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
                { value: "≤ 12", label: "per class" },
                { value: "4", label: "expert instructors" },
                { value: "2", label: "disciplines" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl lg:text-3xl font-semibold text-foreground" style={display}>{value}</p>
                  <p className="text-xs text-foreground/45 mt-1.5 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-muted shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=1000&fit=crop&auto=format"
              alt="An overhead view of a spread of Korean dishes — various small bowls, banchan, and main plates"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.9) saturate(0.92)" }}
            />
            <div
              className="absolute inset-0 rounded-[24px]"
              style={{ background: "rgba(212,93,58,0.04)" }}
            />
            {/* Caption pill */}
            <div className="absolute bottom-6 left-6 right-6 bg-background/88 backdrop-blur-sm rounded-xl px-5 py-3 border border-border/60">
              <p className="text-xs text-foreground/55 tracking-wide">
                Korean table culture — <em style={display}>bap sang</em> philosophy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Workshops ─────────────── */}
      <section id="workshops" className="py-28 lg:py-40 px-6" style={{ background: "#F5F0E9" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs tracking-[0.35em] text-primary uppercase mb-4">What We Offer</p>
              <h2 className="text-4xl lg:text-5xl font-normal text-foreground" style={display}>
                Workshops
              </h2>
            </div>
            <p className="text-foreground/50 text-sm max-w-[280px] leading-relaxed">
              Six courses spanning language, conversation, and traditional Korean kitchen craft.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKSHOPS.map((w) => (
              <WorkshopCard key={w.title} w={w} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Instructors ─────────────── */}
      <section id="instructors" className="py-28 lg:py-40 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.35em] text-primary uppercase mb-4">Who Teaches</p>
            <h2 className="text-4xl lg:text-5xl font-normal text-foreground" style={display}>
              Our Instructors
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTRUCTORS.map((inst) => (
              <InstructorCard key={inst.name} inst={inst} />
            ))}
          </div>

          {/* Editorial food photo banner */}
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
              <p className="text-2xl lg:text-3xl font-normal text-foreground max-w-sm" style={display}>
                <em>"Cooking is the first language Korea taught me."</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Schedule ─────────────── */}
      <section id="schedule" className="py-28 lg:py-40 px-6" style={{ background: "#F5F0E9" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs tracking-[0.35em] text-primary uppercase mb-4">When We Meet</p>
              <h2 className="text-4xl lg:text-5xl font-normal text-foreground" style={display}>
                Schedule
              </h2>
            </div>
            <p className="text-foreground/50 text-sm max-w-[260px] leading-relaxed">
              All times Seoul Standard Time (KST). Online sessions via Zoom.
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
                    <td className="py-5 pr-6 text-sm font-medium text-foreground" style={display}>{s.workshop}</td>
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

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-3 text-sm text-foreground/55 hover:text-foreground border border-border hover:border-foreground/25 px-8 py-4 rounded-full transition-all duration-200"
            >
              Reserve your spot
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────── Contact / Footer ─────────────── */}
      <footer id="contact" className="pt-28 lg:pt-40 pb-12 px-6 border-t border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 mb-24">
            {/* Left */}
            <div>
              <p className="text-xs tracking-[0.35em] text-primary uppercase mb-6">Get In Touch</p>
              <h2
                className="text-3xl lg:text-4xl font-normal text-foreground mb-10 leading-[1.2]"
                style={display}
              >
                Ready to begin?<br />
                <em>{"We'd love to hear from you."}</em>
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
                  <span className="text-sm">Insadong Cultural District, Seoul · Online worldwide</span>
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

            {/* Map placeholder */}
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
                <p className="text-sm text-foreground/70 font-medium">Insadong, Jongno-gu</p>
                <p className="text-sm text-foreground/50">Seoul, South Korea · 03144</p>
                <button className="mt-5 text-xs text-primary border border-primary/25 bg-primary/5 px-5 py-2 rounded-full hover:bg-primary/10 transition-colors">
                  Open in Maps
                </button>
              </div>
            </div>
          </div>

          {/* CTA band */}
          <div className="mb-20 bg-primary rounded-2xl px-10 py-12 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-primary-foreground/70 text-xs tracking-[0.3em] uppercase mb-2">Spring term 2026</p>
              <h3 className="text-2xl lg:text-3xl font-normal text-primary-foreground" style={display}>
                Enrollment is now open.
              </h3>
            </div>
            <button className="shrink-0 flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary-foreground/90 transition-colors group">
              Reserve Your Place
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-primary tracking-[0.22em]" style={display}>한국</span>
              <span className="w-px h-4 bg-border" />
              <span className="text-xs tracking-[0.15em] text-foreground/45 uppercase">Hanguk Studio</span>
            </div>
            <p className="text-xs text-foreground/30">© 2026 Hanguk Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─── */

function WorkshopCard({ w }: { w: typeof WORKSHOPS[number] }) {
  const [hovered, setHovered] = useState(false);

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

      <h3 className="text-[19px] font-semibold text-foreground mb-2 leading-snug" style={display}>
        {w.title}
      </h3>
      <p className="text-sm text-foreground/52 leading-relaxed mb-6">{w.tagline}</p>

      <div className="flex items-center justify-between text-[11px] text-foreground/38 tracking-wide">
        <span>{w.sessions} sessions</span>
        <span className="mx-2 text-foreground/20">·</span>
        <span>{w.instructor}</span>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <span className="flex items-center gap-2 text-[11px] text-foreground/40 group-hover:text-primary transition-colors duration-200 tracking-wide uppercase">
          Learn More{" "}
          <ArrowRight
            size={11}
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s ease" }}
          />
        </span>
      </div>
    </div>
  );
}

function InstructorCard({ inst }: { inst: typeof INSTRUCTORS[number] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`Flip card to ${flipped ? "see photo of" : "learn more about"} ${inst.name}`}
    >
      {/* Flip container */}
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          height: "420px",
        }}
      >
        {/* ── FRONT — photo ── */}
        <div
          className="absolute inset-0 rounded-[20px] overflow-hidden bg-muted"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <img
            src={inst.photo}
            alt={inst.photoAlt}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.88) saturate(0.9)" }}
          />
          {/* Warm gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${inst.hue}cc 0%, transparent 55%)`,
            }}
          />
          {/* Name on front */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <p className="text-[10px] tracking-[0.32em] uppercase text-white/70 mb-1">{inst.specialty}</p>
            <h3 className="text-2xl font-semibold text-white leading-tight" style={display}>
              {inst.name}
            </h3>
          </div>
          {/* Flip hint */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white/70">
            <RefreshCw size={13} />
          </div>
        </div>

        {/* ── BACK — info ── */}
        <div
          className="absolute inset-0 rounded-[20px] border border-border flex flex-col justify-between p-7"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 rounded-full mb-6" style={{ backgroundColor: inst.hue, width: "40px" }} />

          {/* Monogram */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-semibold mb-5"
            style={{ backgroundColor: inst.hue, ...display }}
          >
            {inst.initials}
          </div>

          <div className="flex-1">
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-1" style={{ color: inst.hue }}>
              {inst.specialty}
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-4 leading-snug" style={display}>
              {inst.name}
            </h3>
            <p className="text-sm text-foreground/60 leading-[1.85]">{inst.bio}</p>
          </div>

          {/* Workshops taught */}
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

          {/* Flip back hint */}
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
