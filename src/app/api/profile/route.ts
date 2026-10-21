import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Update the current user's profile.
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("profiles")
    .update(body)
    .eq("id", body.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
