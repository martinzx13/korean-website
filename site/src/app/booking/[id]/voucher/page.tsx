import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { generateQR, voucherData } from "@/lib/qr";

export default async function VoucherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: booking } = await supabase
    .from("bookings")
    .select("*, session:sessions(date, start_time, end_time, workshop:workshops(title))")
    .eq("id", id)
    .single();

  if (!booking || booking.status !== "paid") notFound();

  const s = booking.session as any;
  const totalEur = (booking.total_cents / 100).toFixed(0);
  const formatTime = (t: string) => t?.slice(0, 5) || t;
  const qrData = voucherData(booking.id, s.workshop?.title || "", s.date, booking.name);
  const qrDataUrl = await generateQR(qrData);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-[500px] mx-auto">
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">Voucher</p>
          <h1 className="text-2xl font-display text-foreground mb-6">Hanguk Studio</h1>

          <div className="flex justify-center mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="Booking QR Code"
              className="w-48 h-48"
            />
          </div>

          <div className="text-left space-y-2 text-sm mb-6">
            <div className="flex justify-between"><span className="text-foreground/50">Name</span><span className="text-foreground">{booking.name}</span></div>
            <div className="flex justify-between"><span className="text-foreground/50">Workshop</span><span className="text-foreground">{s.workshop?.title}</span></div>
            <div className="flex justify-between"><span className="text-foreground/50">Date</span><span className="text-foreground">{s.date} · {formatTime(s.start_time)}–{formatTime(s.end_time)}</span></div>
            <div className="flex justify-between"><span className="text-foreground/50">Guests</span><span className="text-foreground">{booking.number_of_people}</span></div>
            <div className="flex justify-between pt-3 border-t border-border"><span className="text-foreground/50">Paid</span><span className="text-foreground font-semibold">€{totalEur}</span></div>
          </div>

          <p className="text-xs text-foreground/30">Booking #{booking.id.slice(0, 8)}</p>
        </div>
      </div>
    </main>
  );
}
