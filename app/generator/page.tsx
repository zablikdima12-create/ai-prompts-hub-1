"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

export default function GeneratorPage() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("marketing");
  const [result, setResult] = useState("");
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("chatgpt");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-black text-center mb-4">
          Генератор промтов
        </h1>

        <p className="text-slate-400 text-center text-xl mb-12">
          Опишите задачу, а ИИ создаст для вас готовый промт
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <label className="block mb-3 text-lg font-bold">
  Название промта
</label>

<input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Например: SEO-статья про Tesla"
  className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 mb-8"
/>
        

          <label className="block mb-3 text-lg font-bold">
            Категория
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 mb-8"
          >
            <option value="marketing">Маркетинг</option>
            <option value="seo">SEO</option>
            <option value="design">Дизайн</option>
            <option value="programming">Программирование</option>
            <option value="universal">Универсальный</option>
          </select>
          <label className="block mb-3 text-lg font-bold">
  Модель ИИ
</label>

<select
  value={model}
  onChange={(e) => setModel(e.target.value)}
  className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 mb-8"
>
  <option value="chatgpt"> ChatGPT</option>
  <option value="claude"> Claude</option>
  <option value="gemini"> Gemini</option>
  <option value="midjourney"> Midjourney</option>
</select>

          <label className="block mb-3 text-lg font-bold">
            Что нужно сделать?
          </label>

          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Например: Создай промт для написания SEO-статьи про электромобили"
            className="w-full h-40 p-4 rounded-2xl bg-slate-800 border border-slate-700 mb-8 resize-none"
          />

<button
  onClick={async () => {
    setResult("Генерация...");
  
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          category,
          model,
        }),
      });
  
      const data = await response.json();
  
      setResult(data.result);
      const history = JSON.parse(
        localStorage.getItem("generationHistory") || "[]"
      );
      
      history.push({
        title,
        category,
        model,
        result: data.result,
        createdAt: Date.now(),
      });
      
      localStorage.setItem(
        "generationHistory",
        JSON.stringify(history)
      );
    } catch (error) {
      setResult("Ошибка подключения к ИИ");
      console.error(error);
    }
  }}
  className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-lg font-bold transition"
>
  Создать промт
</button>
{result && (
  <div className="mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-2">
  Сгенерированный промт
</h2>

<p className="text-slate-400 mb-6">
  Модель: {model} • Категория: {category}
</p>

    <pre className="whitespace-pre-wrap text-slate-300">
      {result}
    </pre>
    <div className= "mt-6">
        <CopyButton text={result} />
    </div>
    <div className="mt-6">
  <button
    onClick={() => {
      const savedPrompts = JSON.parse(
        localStorage.getItem("customPrompts") || "[]"
      );

      savedPrompts.push({
        title: title || "Без названия",
        text: result,
        createdAt: Date.now(),
      });

      localStorage.setItem(
        "customPrompts",
        JSON.stringify(savedPrompts)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }}
    className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-xl font-bold transition"
  >
    Сохранить промт
  </button>

  {saved && (
    <p className="text-green-400 mt-3">
      Промт сохранён
    </p>
  )}
</div>
  </div>
)}

        </div>

      </section>
    </main>
  );
}