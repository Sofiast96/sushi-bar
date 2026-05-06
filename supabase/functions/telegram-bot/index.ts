import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function sendMessage(chat_id: number, text: string) {
  await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text }),
  });
}

serve(async (req) => {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      if (body.message) {
        const chat_id = body.message.chat.id;
        const text = body.message.text || "";

        if (text.startsWith("/start")) {
          await sendMessage(chat_id, "Ласкаво просимо до Sushi Bot! Використовуйте /order для перегляду меню.");
        } else if (text.startsWith("/order")) {
          await sendMessage(chat_id, 
  "🍣 Роли:\n" +
  "• Філадельфія (8 шт) - 499 грн\n" +
  "• Каліфорнія в ікрі (8 шт) - 589 грн\n" +
  "• Рол з тунцем (8 шт) - 469 грн\n" +
  "• Дракон мікс (8 шт) - 619 грн\n" +
  "• Чорний Дракон (8 шт) - 650 грн\n" +
  "• Веган Макі (6 шт) - 299 грн\n\n" +
  "🍱 Сети:\n" +
  "• Сакура (32 шт) - 1599 грн\n" +
  "• Дракони (24 шт) - 1299 грн\n" +
  "• Кілограм щастя (40 шт) - 1100 грн\n\n" +
  "🥤 Напої:\n" +
  "• Лимонад Цитрус - 95 грн\n" +
  "• Матча Лате - 120 грн\n" +
  "• Кока-Кола - 65 грн\n" +
  "• Мохіто - 110 грн\n\n" +
  "Перейдіть на сайт для замовлення!"
);
        } else {
          await sendMessage(chat_id, "Я не розумію. Використовуйте /start або /order");
        }
      }
    } catch (error) {
      console.error("Error processing update:", error);
    }
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
