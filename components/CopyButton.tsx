"use client";

export default function CopyButton({
  text,
}: {
  text: string;
}) {
  const copyPrompt = async () => {
    await navigator.clipboard.writeText(text);
    alert("Промт скопирован!");
  };

  return (
    <button
      onClick={copyPrompt}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Копировать
    </button>
  );
}