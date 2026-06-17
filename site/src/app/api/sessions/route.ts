import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const workshopSlug = searchParams.get("workshop");

  let query = supabase
    .from("session_availability")
    .select("*")
    .gt("available_spots", 0);

  if (date) query = query.eq("date", date);
  if (workshopSlug) query = query.eq("workshop_slug", workshopSlug);

  query = query.order("date").order("start_time");

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
