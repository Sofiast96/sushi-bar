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
          await sendMessage(chat_id, "Меню: Рол Філадельфія - 499 грн, Каліфорнія - 589 грн. Перейдіть на сайт для замовлення!");
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
