"use client";

import { useEffect, useState } from "react";
import { prompts } from "@/data/prompts";
import CopyButton from "@/components/CopyButton";
import FavoriteButton from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(saved);
  }, []);

  const allPrompts = Object.entries(prompts).flatMap(
    ([category, categoryPrompts]) =>
      categoryPrompts.map((prompt) => ({
        ...prompt,
        category,
      }))
  );

  const favoritePrompts = allPrompts.filter((prompt) =>
    favorites.includes(prompt.title)
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-black text-center mb-4">
          Избранные промты
        </h1>

        <p className="text-slate-400 text-center text-xl mb-12">
          Ваши сохранённые промты всегда под рукой
        </p>

        {favoritePrompts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">⭐</div>

            <h2 className="text-3xl font-bold mb-4">
              Пока пусто
            </h2>

            <p className="text-slate-400">
              Добавляйте понравившиеся промты в избранное,
              и они появятся здесь.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-slate-300">
                Сохранено промтов: {favoritePrompts.length}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {favoritePrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-yellow-500 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        prompt.category === "marketing"
                          ? "bg-blue-500/20 text-blue-400"
                          : prompt.category === "seo"
                          ? "bg-green-500/20 text-green-400"
                          : prompt.category === "design"
                          ? "bg-pink-500/20 text-pink-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {prompt.category}
                    </span>

                    <FavoriteButton title={prompt.title} />
                  </div>

                  <h2 className="text-2xl font-bold mb-3">
                    {prompt.title}
                  </h2>

                  <p className="text-slate-400 mb-6">
                    {prompt.text}
                  </p>

                  <CopyButton text={prompt.text} />
                </div>
              ))}
            </div>
          </>
        )}

      </section>
    </main>
  );
}
