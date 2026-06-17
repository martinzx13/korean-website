"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  number_of_people: number;
  total_cents: number;
  status: string;
  is_couple: boolean;
  created_at: string;
  session: {
    date: string;
    start_time: string;
    end_time: string;
    workshop: { title: string };
  };
}

interface SessionInfo {
  id: string;
  workshop_title: string;
  workshop_category: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  available_spots: number;
}

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const pwd = searchParams.get("pwd") || "";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/bookings", {
        headers: { "x-admin-password": pwd },
      });
      if (!res.ok) {
        setError("Unauthorized — wrong password");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setBookings(data.bookings);
      setSessions(data.sessions);
      setLoading(false);
    };
    fetchData();
  }, [pwd]);

  const markPaid = async (id: string) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": pwd },
      body: JSON.stringify({ status: "paid" }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "paid" } : b))
      );
    }
  };

  const deleteBooking = async (id: string) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": pwd },
    });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  if (loading) return <main className="min-h-screen bg-background pt-32 px-6"><p className="text-center">Loading...</p></main>;
  if (error) return <main className="min-h-screen bg-background pt-32 px-6"><p className="text-center text-destructive">{error}</p></main>;

  return (
    <main className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-2xl font-display text-foreground mb-2">Bookings</h1>
        <p className="text-xs text-foreground/40 tracking-wider uppercase mb-8">Admin Dashboard</p>

        {/* Session availability summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {sessions.map((s) => {
            const booked = s.capacity - s.available_spots;
            const pct = s.capacity > 0 ? (booked / s.capacity) * 100 : 0;
            const dateLabel = new Date(s.date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "short", month: "short", day: "numeric",
            });
            return (
              <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.workshop_title}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">{dateLabel} · {s.start_time?.slice(0, 5)}–{s.end_time?.slice(0, 5)}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider ${
                    s.available_spots === 0 ? "bg-red-100 text-red-600" :
                    s.available_spots <= 5 ? "bg-amber-100 text-amber-700" :
                    "bg-[#7D9B7E]/10 text-[#4A6B4A]"
                  }`}>
                    {s.available_spots} free
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: pct >= 90 ? "#ef4444" : pct >= 50 ? "#D45D3A" : "#7D9B7E",
                    }}
                  />
                </div>
                <p className="text-[11px] text-foreground/40 mt-2">{booked}/{s.capacity} booked</p>
              </div>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                {["Status", "Name", "Email", "Workshop", "Date", "People", "Total", ""].map((h) => (
                  <th key={h} className="text-left pb-4 pr-4 text-xs tracking-[0.2em] uppercase text-foreground/40 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 pr-4">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      b.status === "paid" ? "bg-[#7D9B7E]/10 text-[#4A6B4A]" :
                      b.status === "pending" ? "bg-primary/10 text-primary" : "bg-muted text-foreground/40"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-sm text-foreground">{b.name}</td>
                  <td className="py-4 pr-4 text-sm text-foreground/60">{b.email}</td>
                  <td className="py-4 pr-4 text-sm text-foreground">{b.session.workshop.title}</td>
                  <td className="py-4 pr-4 text-sm text-foreground/60 tabular-nums">{b.session.date} {b.session.start_time?.slice(0, 5)}</td>
                  <td className="py-4 pr-4 text-sm text-foreground/60">{b.number_of_people}{b.is_couple ? " (couple)" : ""}</td>
                  <td className="py-4 pr-4 text-sm text-foreground/60">€{(b.total_cents / 100).toFixed(0)}</td>
                  <td className="py-4">
                    {b.status === "pending" && (
                      <>
                        <button
                          onClick={() => markPaid(b.id)}
                          className="text-[11px] px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mr-2"
                        >
                          Mark Paid
                        </button>
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="text-[11px] px-4 py-2 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-foreground/30 text-sm">No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
