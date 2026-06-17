import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendPendingEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, name, email, phone, people, isCouple } = await req.json();

    if (!sessionId || !name || !email || !people) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Atomic booking: locks session row, checks availability, inserts in one DB call
    const { data, error } = await supabase.rpc("create_booking", {
      p_session_id: sessionId,
      p_name: name,
      p_email: email,
      p_phone: phone || "",
      p_people: people,
      p_is_couple: isCouple || false,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("not enough spots")) {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }
      if (msg.includes("session not found")) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const bookingId = data.bookingId as string;
    const totalCents = data.totalCents as number;

    // Fetch session info for the email
    const { data: session } = await supabase
      .from("session_availability")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (session) {
      const totalEur = (totalCents / 100).toFixed(0);
      const formatTime = (t: string) => t?.slice(0, 5) || t;
      await sendPendingEmail(
        email,
        name,
        session.workshop_title,
        session.date,
        `${formatTime(session.start_time)}–${formatTime(session.end_time)}`,
        totalEur,
        bookingId
      );
    }

    return NextResponse.json({
      bookingId,
      totalCents,
      session: session
        ? {
            date: session.date,
            startTime: session.start_time,
            endTime: session.end_time,
            workshop: session.workshop_title,
          }
        : null,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
