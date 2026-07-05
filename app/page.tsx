import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <Image
          src="/logo.png"
          alt="AI Prompts Hub"
          width={120}
          height={120}
          className="mx-auto mb-8"
        />

        <h1 className="text-5xl md:text-7xl md:text-8xl font-black mb-6">
          AI Prompts Hub
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
    <h3 className="text-3xl font-bold text-cyan-400">
      120+
    </h3>
    <p className="text-slate-400">
      Промтов
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
    <h3 className="text-3xl font-bold text-purple-400">
      8
    </h3>
    <p className="text-slate-400">
      Категорий
    </p>
  </div>

  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
    <h3 className="text-3xl font-bold text-pink-400">
      ∞
    </h3>
    <p className="text-slate-400">
      Возможностей
    </p>
  </div>
</div>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12">
          Каталог лучших AI-промтов и генератор для создания
          собственных инструкций для ChatGPT, Claude и Gemini.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/prompts"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold transition"
          >
            Смотреть промты
          </Link>

          <Link
            href="/generator"
            className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-2xl font-bold transition"
          >
            Создать промт
          </Link>
        </div>

      </section>

      {/* Преимущества */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-black text-center mb-12">
          Возможности
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-3">
              Готовые промты
            </h3>

            <p className="text-slate-400">
              Коллекция качественных промтов для маркетинга,
              SEO, дизайна и программирования.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-3">
              Генератор
            </h3>

            <p className="text-slate-400">
              Создавайте собственные промты при помощи ИИ
              за несколько секунд.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-3">
              Избранное
            </h3>

            <p className="text-slate-400">
              Сохраняйте лучшие промты и возвращайтесь
              к ним в любое время.
            </p>
          </div>

        </div>

      </section>

      {/* Категории */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-black text-center mb-12">
          Популярные категории
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Link
            href="/categories/marketing"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-bold">
              Маркетинг
            </h3>
          </Link>

          <Link
            href="/categories/seo"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-bold">
              SEO
            </h3>
          </Link>

          <Link
            href="/categories/design"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-bold">
              Дизайн
            </h3>
          </Link>

          <Link
            href="/categories/programming"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-bold">
              Программирование
            </h3>
          </Link>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center">

          <h2 className="text-5xl font-black mb-6">
            Создай идеальный AI-промт
          </h2>

          <p className="text-xl text-blue-100 mb-8">
            Используй генератор и получай готовые промты
            за несколько секунд.
          </p>

          <Link
            href="/generator"
            className="inline-block bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold"
          >
            Открыть генератор
          </Link>

        </div>

      </section>

    </main>
  );
}