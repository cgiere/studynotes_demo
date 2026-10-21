"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [users, setUsers] = useState<{ id: string; display_name: string; role: string }[]>([]);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("role") === "admin";

  useEffect(() => {
    supabase.from("profiles").select("*").then(({ data }) => setUsers(data ?? []));
  }, []);

  if (!isAdmin) return <p>Admins only.</p>;

  return (
    <main>
      <h1>All users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.display_name} ({u.role})
            <button onClick={() => supabase.from("profiles").delete().eq("id", u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
