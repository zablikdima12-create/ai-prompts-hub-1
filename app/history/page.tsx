"use client";

import { useState } from "react";

type HistoryItem = {
  title?: string;
  category: string;
  result: string;
};

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const saved = JSON.parse(
    localStorage.getItem("generationHistory") || "[]"
  ) as HistoryItem[];
  return [...saved].reverse();
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-5xl mx-auto px-6 py-16">

      <button
  onClick={() => {
    const confirmed = confirm(
      "Удалить всю историю генераций?"
    );

    if (!confirmed) return;

    localStorage.removeItem("generationHistory");
    setHistory([]);
  }}
  className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold transition"
>
  Очистить историю
</button>

        {history.length === 0 ? (
          <p className="text-slate-400">
            Пока нет сгенерированных промтов.
          </p>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
              >
                <h2 className="text-2xl font-bold mb-3">
                  {item.title || "Без названия"}
                </h2>

                <p className="text-slate-400 mb-4">
                  {item.category}
                </p>

                <pre className="whitespace-pre-wrap text-slate-300">
                  {item.result}
                </pre>
                <button
  onClick={() => {
    const updated = history.filter(
      (_, i) => i !== index
    );

    setHistory(updated);

    localStorage.setItem(
      "generationHistory",
      JSON.stringify([...updated].reverse())
    );
  }}
  className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
>
  Удалить
</button>
              </div>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}
