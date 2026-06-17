import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateQR, voucherData } from "@/lib/qr";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, session:sessions(date, start_time, end_time, workshop:workshops(title))")
    .eq("id", id)
    .single();

  if (error || !booking || !booking.qr_token) {
    return NextResponse.json({ error: "Booking not found or not confirmed" }, { status: 404 });
  }

  const s = booking.session as any;
  const data = voucherData(
    booking.id,
    s.workshop?.title || "",
    s.date,
    booking.name
  );

  const qrDataUrl = await generateQR(data);
  const base64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");

  return new NextResponse(Buffer.from(base64, "base64"), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
