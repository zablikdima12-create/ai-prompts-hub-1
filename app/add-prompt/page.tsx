"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddPromptPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
  
      if (!session?.user) {
        alert("Сначала войдите в аккаунт");
        return;
      }
  
      const result = await supabase
        .from("prompts")
        .insert([
          {
            title,
            content,
            category,
            user_id: session.user.id,
          },
        ])
        .select();
  
      console.log("FULL RESULT:", result);
  
      if (result.error) {
        alert(result.error.message);
        return;
      }
  
      if (!result.data || result.data.length === 0) {
        alert("Запись не сохранилась");
        return;
      }
  
      alert("Промт добавлен");
  
      setTitle("");
      setContent("");
      setCategory("");
    } catch (e) {
      console.log(e);
      alert("Ошибка соединения");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Добавить промт
      </h1>

      <div className="flex flex-col gap-4 max-w-xl">
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Название"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Текст промта"
          className="bg-slate-900 p-4 rounded-xl h-40"
        />

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="Категория"
          className="bg-slate-900 p-4 rounded-xl"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 p-4 rounded-xl hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>
    </main>
  );
}