import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendConfirmedEmail, notifyAdmin } from "@/lib/email";
import { generateQR, voucherData } from "@/lib/qr";
import crypto from "crypto";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pwd = req.headers.get("x-admin-password");
  if (pwd !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (body.status === "paid") {
    // Generate QR token
    const qrToken = crypto.randomUUID();

    // Get booking details
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("*, session:sessions(date, start_time, end_time, workshop:workshops(title))")
      .eq("id", id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update status
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "paid", paid_at: new Date().toISOString(), qr_token: qrToken })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Send emails
    const s = booking.session as any;
    const totalEur = ((booking.total_cents || 0) / 100).toFixed(0);
    const voucherUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/booking/${id}/voucher`;
    const formatTime = (t: string) => t?.slice(0, 5) || t;

    await Promise.all([
      sendConfirmedEmail(booking.email, booking.name, s.workshop?.title || "", s.date, `${formatTime(s.start_time)}–${formatTime(s.end_time)}`, voucherUrl),
      notifyAdmin(s.workshop?.title || "", booking.name, booking.email, booking.number_of_people, totalEur),
    ]);

    return NextResponse.json({ status: "paid", qrToken });
  }

  const { error: updateError } = await supabase
    .from("bookings")
    .update({ status: body.status })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status: body.status });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pwd = req.headers.get("x-admin-password");
  if (pwd !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: "deleted" });
}
