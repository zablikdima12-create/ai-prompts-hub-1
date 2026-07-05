import Link from "next/link";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black text-center mb-4">
          Категории
        </h1>

        <p className="text-slate-400 text-center text-xl mb-16">
          Выберите категорию и найдите нужные промты
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/categories/marketing"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:scale-[1.02] transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              Маркетинг
            </h2>

            <p className="text-slate-400">
              Контент-планы, реклама, стратегии продвижения и SMM.
            </p>
          </Link>

          <Link
            href="/categories/seo"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-500 hover:scale-[1.02] transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              SEO
            </h2>

            <p className="text-slate-400">
              SEO-статьи, ключевые слова и оптимизация сайтов.
            </p>
          </Link>

          <Link
            href="/categories/design"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-pink-500 hover:scale-[1.02] transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              Дизайн
            </h2>

            <p className="text-slate-400">
              Логотипы, баннеры, UI/UX и графический дизайн.
            </p>
          </Link>

          <Link
            href="/categories/programming"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-yellow-500 hover:scale-[1.02] transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              Программирование
            </h2>

            <p className="text-slate-400">
              React, Next.js, Python, API и автоматизация.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
  