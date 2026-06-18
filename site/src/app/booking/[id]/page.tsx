import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: booking } = await supabase
    .from("bookings")
    .select("*, session:sessions(date, start_time, end_time, workshop:workshops(title, slug))")
    .eq("id", id)
    .single();

  if (!booking) notFound();

  const s = booking.session as any;
  const totalEur = (booking.total_cents / 100).toFixed(0);
  const formatTime = (t: string) => t?.slice(0, 5) || t;

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-[500px] mx-auto text-center">
        {booking.status === "pending" && (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⏳</span>
            </div>
            <h1 className="text-3xl font-display text-foreground mb-3">Booking Pending</h1>
            <p className="text-foreground/50 text-sm mb-8">
              Thanks, {booking.name}! Your spot is reserved for 24h.
            </p>

            <div className="bg-card rounded-2xl border border-border p-6 text-left space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/50">Workshop</span>
                <span className="text-foreground">{s.workshop?.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/50">Date</span>
                <span className="text-foreground">{s.date} · {formatTime(s.start_time)}–{formatTime(s.end_time)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground/50">People</span>
                <span className="text-foreground">{booking.number_of_people}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-border">
                <span className="text-foreground/50">Total</span>
                <span className="text-foreground font-semibold">€{totalEur}</span>
              </div>
            </div>

            <div className="bg-muted rounded-2xl p-6 text-left">
              <h2 className="text-sm font-semibold text-foreground mb-4">How to Pay</h2>
              <div className="space-y-3 text-sm text-foreground/60">
                <p><strong className="text-foreground">Wise:</strong> <a href="https://wise.com/pay/me/juanm4246" target="_blank" rel="noopener noreferrer" className="text-primary underline">wise.com/pay/me/juanm4246</a></p>
                <p><strong className="text-foreground">MBWay:</strong> +351 937 254 422</p>
                <p><strong className="text-foreground">Bank Transfer:</strong> PT50 0033 0000 4563 0180 0200 5</p>
              </div>
              <p className="text-xs text-foreground/40 mt-4">Once your payment is confirmed, we&apos;ll send you the exact location by email.</p>
            </div>

            <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 mt-6 text-left">
              <p className="text-xs font-semibold text-amber-800 mb-2">Important</p>
              <ul className="text-xs text-amber-700 space-y-1.5">
                <li className="flex gap-2"><span>•</span> Do not close this page until you save the payment details above.</li>
                <li className="flex gap-2"><span>•</span> We also sent these instructions to <strong>{booking.email}</strong> — check your inbox (and spam).</li>
                <li className="flex gap-2"><span>•</span> You can refresh this page to check if your payment was confirmed.</li>
                <li className="flex gap-2"><span>•</span> After we confirm your payment, you&apos;ll receive a QR voucher by email.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href={`https://wa.me/351937254422?text=Hi%2C%20payment%20proof%20for%20booking%20${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[#20BD5A] transition-colors"
              >
                Send Payment Proof via WhatsApp
              </a>
              <p className="text-xs text-foreground/40 text-center">
                Or email us at{" "}
                <a href="mailto:juan.martinxz43@gmail.com" className="text-primary underline">juan.martinxz43@gmail.com</a>
              </p>
            </div>
          </>
        )}

        {booking.status === "paid" && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#7D9B7E]/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-3xl font-display text-foreground mb-3">You&apos;re Confirmed!</h1>
            <p className="text-foreground/50 text-sm mb-8">
              See you on {s.date} at {s.start_time}.
            </p>
            <Link
              href={`/booking/${id}/voucher`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              View Your Voucher
            </Link>
          </>
        )}

        <p className="mt-12 text-xs text-foreground/30">
          Booking ID: {id}
        </p>
      </div>
    </main>
  );
}
