"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Prompt = {
  id: string;
  title: string;
  content: string;
  category: string;
};

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    async function loadPrompts() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data } = await supabase
        .from("prompts")
        .select("*")
        .eq("user_id", session.user.id);

      setPrompts(data || []);
    }

    loadPrompts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Мои промты
      </h1>

      {prompts.length === 0 ? (
        <p className="text-slate-400">
          У вас пока нет промтов
        </p>
      ) : (
        <div className="grid gap-4">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold">
                {prompt.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {prompt.content}
              </p>

              <p className="mt-2 text-slate-500">
                {prompt.category}
              </p>
              <button
  onClick={async () => {
    const confirmed = confirm(
      "Удалить промт?"
    );

    if (!confirmed) return;

    await supabase
      .from("prompts")
      .delete()
      .eq("id", prompt.id);

    setPrompts((prev) =>
      prev.filter((p) => p.id !== prompt.id)
    );
  }}
  className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
>
  Удалить
</button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}