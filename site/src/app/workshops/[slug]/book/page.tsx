"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Session {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  available_spots: number;
  workshop_title: string;
  workshop_category: string;
  price_cents: number;
  price_couple_cents: number | null;
}

export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [people, setPeople] = useState(1);
  const [isCouple, setIsCouple] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedAllergenRisk, setAcceptedAllergenRisk] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await supabase
        .from("session_availability")
        .select("*")
        .eq("workshop_slug", slug)
        .gt("available_spots", 0)
        .order("date")
        .order("start_time");

      if (data) {
        setSessions(data as Session[]);
        const uniqueDates = [...new Set(data.map((s: any) => s.date))] as string[];
        setDates(uniqueDates);
      }
    };
    fetchSessions();
  }, [slug]);

  const availableSessions = sessions.filter((s) => !selectedDate || s.date === selectedDate);
  const selected = sessions.find((s) => s.id === selectedSession);
  const isCooking = selected?.workshop_category === "cooking";

  const getTotal = () => {
    if (!selected) return 0;
    if (isCouple && selected.price_couple_cents) return selected.price_couple_cents;
    return selected.price_cents * people;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: selectedSession,
        name,
        email,
        phone,
        people,
        isCouple,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push(`/booking/${data.bookingId}`);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-3xl font-display text-foreground mb-2">
          Book Your Spot
        </h1>
        <p className="text-foreground/50 text-sm mb-10">
          {slug === "korean-language" ? "Language · €20/person · 3h" : "Cooking · €50/person · €60/couple · 3h"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Date */}
          <div>
            <label className="text-xs tracking-widest uppercase text-foreground/50 mb-3 block">Date</label>
            <div className="flex gap-2 flex-wrap">
              {dates.map((d) => {
                const label = new Date(d + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "short", month: "short", day: "numeric",
                });
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => { setSelectedDate(d); setSelectedSession(""); }}
                    className={`px-5 py-3 rounded-full text-sm border transition-all ${
                      selectedDate === d
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/60 hover:border-foreground/30"
                    }`}
                  >
                    <Calendar size={14} className="inline mr-2" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div>
              <label className="text-xs tracking-widest uppercase text-foreground/50 mb-3 block">Time</label>
              <div className="flex gap-2 flex-wrap">
                {availableSessions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSession(s.id)}
                    disabled={s.available_spots < 1}
                    className={`px-5 py-3 rounded-full text-sm border transition-all ${
                      selectedSession === s.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : s.available_spots < 1
                        ? "border-border/40 text-foreground/20 cursor-not-allowed"
                        : "border-border text-foreground/60 hover:border-foreground/30"
                    }`}
                  >
                    {s.start_time}–{s.end_time}
                    {s.available_spots < 5 && s.available_spots > 0 && (
                      <span className="ml-2 text-[10px] text-foreground/40">({s.available_spots} left)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* People */}
          {selected && (
            <div>
              <label className="text-xs tracking-widest uppercase text-foreground/50 mb-3 block">
                Number of People (max {selected.available_spots})
              </label>
              <div className="flex gap-2 items-center">
                {[1, 2, 3, 4].filter((n) => n <= selected.available_spots).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => { setPeople(n); if (n !== 2) setIsCouple(false); }}
                    className={`w-12 h-12 rounded-full border text-sm transition-all ${
                      people === n
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/60"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              {/* Couple pricing toggle — only for cooking, only when 2 people */}
              {isCooking && people === 2 && selected.price_couple_cents && (
                <label className="flex items-center gap-3 mt-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={isCouple}
                    onChange={(e) => setIsCouple(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-foreground/70">
                    Couple pricing — <strong>€60</strong> for 2 (instead of €100)
                  </span>
                </label>
              )}
            </div>
          )}

          {/* Contact info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-widest uppercase text-foreground/50 mb-2 block">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-foreground/50 mb-2 block">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs tracking-widest uppercase text-foreground/50 mb-2 block">Phone (optional)</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="+351 900 000 000"
              />
            </div>
          </div>

          {/* Total */}
          {selected && (
            <div className="p-5 rounded-xl bg-muted border border-border">
              <p className="text-sm text-foreground/50">Total</p>
              <p className="text-3xl font-display text-foreground mt-1">€{(getTotal() / 100).toFixed(0)}</p>
            </div>
          )}

          {/* Terms & Conditions */}
          {selected && (
            <div>
              <button
                type="button"
                onClick={() => setTermsOpen(!termsOpen)}
                className="flex items-center justify-between w-full p-4 rounded-xl border border-border bg-card text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <span className="font-medium">Terms & Conditions</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${termsOpen ? "rotate-180" : ""}`} />
              </button>

              {termsOpen && (
                <div className="mt-3 space-y-3">
                  <div className="p-4 rounded-xl border border-border bg-muted/50 text-sm text-foreground/60 space-y-2">
                    <p><strong className="text-foreground">Cancellation:</strong> You may cancel up to 24 hours before the session. Cancellations on the day of the event or no-shows are non-refundable.</p>
                    <p><strong className="text-foreground">Age:</strong> Participants must be 12+. Minors must be accompanied by an adult.</p>
                    <p><strong className="text-foreground">Contact:</strong> For questions or cancellations, email <a href="mailto:juan.martinxz43@gmail.com" className="text-primary underline">juan.martinxz43@gmail.com</a></p>
                  </div>

                  {isCooking && (
                    <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-sm space-y-2">
                      <p className="font-semibold text-amber-800">Allergen Notice</p>
                      <p className="text-amber-700">
                        Hanguk Studio operates in a facility that processes nuts, shellfish, soy, and gluten.
                        We cannot guarantee a 100% allergen-free environment.
                      </p>
                      <p className="text-amber-700">
                        If you have a severe allergy, we recommend our{" "}
                        <button
                          type="button"
                          onClick={() => router.push("/workshops/korean-language/book")}
                          className="text-amber-800 underline font-medium hover:text-amber-900"
                        >
                          Korean Language & Culture Immersion
                        </button>
                        {" "}— a 100% safe, non-food environment with the same authentic vibe.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 space-y-3">
                {isCooking && (
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={acceptedAllergenRisk}
                      onChange={(e) => setAcceptedAllergenRisk(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                    />
                    <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                      I understand the risks of cross-contamination and take full responsibility for my health during the event.
                    </span>
                  </label>
                )}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                  />
                  <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                    I accept the booking terms & conditions
                  </span>
                </label>
              </div>
            </div>
          )}

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !selectedSession || !acceptedTerms || (isCooking && !acceptedAllergenRisk)}
            className="w-full py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </main>
  );
}
