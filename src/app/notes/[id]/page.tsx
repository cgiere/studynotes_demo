import { supabase } from "@/lib/supabase";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: note } = await supabase.from("notes").select("*").eq("id", id).single();
  if (!note) return <p>Note not found.</p>;

  return (
    <article>
      <h1>{note.title}</h1>
      {/* Notes support rich text */}
      <div dangerouslySetInnerHTML={{ __html: note.body }} />
    </article>
  );
}
