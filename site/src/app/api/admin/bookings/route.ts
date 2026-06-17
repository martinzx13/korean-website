import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const pwd = req.headers.get("x-admin-password");
  if (pwd !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: sessions, error: sError } = await supabase
    .from("session_availability")
    .select("*")
    .order("date")
    .order("start_time");

  const { data: bookings, error: bError } = await supabase
    .from("bookings")
    .select("*, session:sessions(date, start_time, end_time, workshop:workshops(title))")
    .order("created_at", { ascending: false });

  if (bError) {
    return NextResponse.json({ error: bError.message }, { status: 500 });
  }

  return NextResponse.json({ bookings, sessions });
}
