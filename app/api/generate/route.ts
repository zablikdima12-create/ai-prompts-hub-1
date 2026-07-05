
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log(process.env.OPENROUTER_API_KEY);
    const { task, category, model } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
model: "openai/gpt-oss-120b:free",
          messages: [
            {
              role: "system",
              content:
                "Ты эксперт по созданию AI-промтов.",
            },
            {
              role: "user",
              content: `
Категория: ${category}
Модель: ${model}

Задача:
${task}
`,
            },
          ],
        }),
      }
    );

   
const data = await response.json();

console.log("STATUS:", response.status);
console.log("DATA:", data);

    return NextResponse.json({
      result:
        data.choices?.[0]?.message?.content ||
        "Ошибка генерации",
    });
  } catch (error) {
    return NextResponse.json(
      { result: "Ошибка сервера" },
      { status: 500 }
    );
  }
}