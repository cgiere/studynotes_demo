import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const result = await pool.query(
    "SELECT id, title, body FROM notes WHERE title ILIKE '%" + q + "%' LIMIT 50",
  );
  return NextResponse.json(result.rows);
}
