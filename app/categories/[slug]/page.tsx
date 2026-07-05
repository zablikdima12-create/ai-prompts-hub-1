import { prompts } from "@/data/prompts";
import CopyButton from "@/components/CopyButton";
import FavoriteButton from "@/components/FavoriteButton";

export default async function CategoryPage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

const categoryPrompts =
prompts[slug as keyof typeof prompts];

if (!categoryPrompts) {
return (
<main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
<h1 className="text-4xl font-black">
Категория не найдена
</h1>
</main>
);
}

const categoryNames: Record<string, string> = {
marketing: "Маркетинг",
seo: "SEO",
design: "Дизайн",
programming: "Программирование",
};

return (
<main className="min-h-screen bg-slate-950 text-white">

  <section className="max-w-6xl mx-auto px-6 py-16">

    <h1 className="text-4xl md:text-5xl font-black mb-4 break-all">
  {categoryNames[slug] || slug}
</h1>

    <p className="text-slate-400 text-xl mb-12">
      Найдено промтов: {categoryPrompts.length}
    </p>

    <div className="space-y-6">
      {categoryPrompts.map((prompt, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {prompt.title}
            </h2>

            <FavoriteButton title={prompt.title} />
          </div>

          <p className="text-slate-400 mb-6">
            {prompt.text}
          </p>

          <CopyButton text={prompt.text} />
        </div>
      ))}
    </div>

  </section>

</main>

);
}