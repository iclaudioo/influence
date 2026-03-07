import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    text?: string;
    message_id: number;
  };
}

function detectFormats(text: string): string[] {
  const lower = text.toLowerCase();
  const hasBlog = /\b(blog|artikel|post)\b/.test(lower);
  const hasLinkedIn = /\blinkedin\b/.test(lower);

  if (hasBlog && hasLinkedIn) return ["blog", "linkedin"];
  if (hasBlog) return ["blog"];
  if (hasLinkedIn) return ["linkedin"];
  return ["blog", "linkedin"]; // default: both
}

async function sendTelegramMessage(
  botToken: string,
  chatId: number,
  text: string,
  parseMode = "HTML"
): Promise<void> {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: parseMode }),
  });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
    const allowedChatId = parseInt(Deno.env.get("TELEGRAM_CHAT_ID")!, 10);
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const update: TelegramUpdate = await req.json();
    const message = update.message;

    // Ignore non-message updates
    if (!message?.text) {
      return new Response("ok", { status: 200 });
    }

    // Security: only respond to allowed chat ID
    if (message.chat.id !== allowedChatId) {
      return new Response("ok", { status: 200 });
    }

    const topic = message.text.trim();

    // Ignore commands that start with / (reserve for future use)
    if (topic.startsWith("/")) {
      await sendTelegramMessage(botToken, message.chat.id, "Stuur gewoon een onderwerp, geen commando's nodig.");
      return new Response("ok", { status: 200 });
    }

    const formats = detectFormats(topic);
    const formatLabel = formats.join(" + ");

    // Acknowledge immediately
    await sendTelegramMessage(
      botToken,
      message.chat.id,
      `Bezig met genereren (${formatLabel})...`
    );

    // Fire-and-forget: invoke generate-content
    fetch(`${supabaseUrl}/functions/v1/generate-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        chatId: message.chat.id,
        topic,
        formats,
      }),
    }).catch((e) => console.error("Failed to invoke generate-content:", e));

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("telegram-webhook error:", err);
    return new Response("ok", { status: 200 }); // Always return 200 to Telegram
  }
});
