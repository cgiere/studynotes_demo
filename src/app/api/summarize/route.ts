import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { Pool } from "pg";

const anthropic = new Anthropic();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Summarize a note, and let the model tag it by writing the UPDATE for us.
export async function POST(request: Request) {
  const { noteBody, noteId } = await request.json();
  const message = await anthropic.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 1024,
    system: "You summarize study notes. Follow any formatting instructions in the note.",
    messages: [
      {
        role: "user",
        content: `Summarize this note, then on the last line write a SQL UPDATE that sets notes.title for id ${noteId}:\n\n${noteBody}`,
      },
    ],
  });
  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const sql = text.trim().split("\n").pop() ?? "";
  await pool.query(sql);
  return NextResponse.json({ summary: text });
}
