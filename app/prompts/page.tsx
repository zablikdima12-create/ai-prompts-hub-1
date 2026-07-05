"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
  useState("Все");
  const [sortBy, setSortBy] = useState("new");

  useEffect(() => {
    async function loadPrompts() {
      const { data } = await supabase
      .from("prompts")
      .select("*")
      .eq("is_public", true)

      setPrompts(data || []);
    }

    loadPrompts();
  }, []);
  const categories = [
    "Все",
    ...new Set(
      prompts.map(
        (prompt) => prompt.category
      )
    ),
  ];

  const filteredPrompts = prompts.filter(
    (prompt) => {
      const matchesSearch =
        prompt.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        prompt.content
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        prompt.category
          ?.toLowerCase()
          .includes(search.toLowerCase());
  
      const matchesCategory =
        selectedCategory === "Все" ||
        prompt.category === selectedCategory;
  
      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );
  const sortedPrompts = [...filteredPrompts].sort(
    (a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(
          b.title
        );
      }
  
      if (sortBy === "category") {
        return a.category.localeCompare(
          b.category
        );
      }
  
      return b.id - a.id;
    }
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Промты
      </h1>

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="🔍 Поиск промтов..."
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8"
      />
      <div className="flex gap-3 flex-wrap mb-8">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() =>
        setSelectedCategory(category)
      }
      className={`px-4 py-2 rounded-xl transition ${
        selectedCategory === category
          ? "bg-blue-600 text-white"
          : "bg-slate-900 text-slate-300 hover:bg-slate-800"
      }`}
    >
      {category}
    </button>
  ))}
  <select
  value={sortBy}
  onChange={(e) =>
    setSortBy(e.target.value)
  }
  className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-8"
>
  <option value="new">
    Сначала новые
  </option>

  <option value="title">
    По названию
  </option>

  <option value="category">
    По категории
  </option>
</select>
</div>

      <div className="grid gap-4">
      {sortedPrompts.map((prompt) => (
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
              onClick={() =>
                navigator.clipboard.writeText(
                  prompt.content
                )
              }
              className="mt-4 bg-blue-600 px-4 py-2 rounded-xl"
            >
              Копировать
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}