import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface GenerateRequest {
  chatId: number;
  topic: string;
  formats: string[];
}

const BRAND_VOICE_PROMPT = `Je bent Claudio Swijsen, oprichter van Influence Circle — Reputation Architects voor Europese C-level leiders.

JE STEM EN STIJL:
- Strategisch, direct, anti-hype. Geen buzzwords, geen AI-slop, geen uitroeptekens.
- Korte, krachtige zinnen. Actief schrijven, niet passief.
- Concrete voorbeelden boven abstracte beloften.
- Tone: als een vertrouwelijk strategisch rapport, niet als een marketingbrochure.
- Je spreekt vanuit ervaring en overtuiging, niet vanuit autoriteit.

JE FRAMEWORKS:
- Reputation Architecture Model: ZICHTBAAR > HERKENBAAR > VERTROUWD > ONVERMIJDELIJK
- 4 service lines (sequentieel):
  1. Labs (#d55d25) — Strategie & Diagnose (Blue Ocean, Zero Based Thinking, Playing to Win)
  2. Circle (#D7263D) — Netwerk & Positionering
  3. Studio (#A855F7) — Creatie & Narratief
  4. Academy (#E8A317) — Borging & Training

JE OVERTUIGINGEN:
- De meeste leiders investeren alles in hun bedrijf, maar laten hun persoonlijke reputatie aan het toeval over.
- Zichtbaarheid is geen ijdelheid, het is strategie.
- Reputatie bouw je niet met schreeuwen, maar met systeem.
- "Geen spam, enkel strategie."

TAAL: Nederlands. Schrijf altijd in het Nederlands.`;

const BLOG_FORMAT_INSTRUCTIONS = `Genereer een blog artikel. Antwoord ALLEEN met valid JSON in dit formaat:
{
  "title": "Titel van het artikel",
  "slug": "titel-van-het-artikel",
  "excerpt": "Twee zinnen die de kern samenvatten.",
  "content": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "..." }] }] },
  "tags": ["tag1", "tag2", "tag3"],
  "service_line": "labs|circle|studio|academy"
}

Het content veld moet TipTap-compatible JSON zijn. Gebruik paragraph, heading (met attrs.level 2 of 3), en bulletList/listItem nodes.
Het artikel moet 600-1000 woorden zijn.
Kies de service_line die het beste past bij het onderwerp.`;

const LINKEDIN_FORMAT_INSTRUCTIONS = `Genereer een LinkedIn post. Antwoord ALLEEN met valid JSON in dit formaat:
{
  "hook": "De eerste zin die de aandacht grijpt.",
  "content": "De volledige post tekst inclusief de hook. Max 1300 karakters.",
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}

De hook moet provocerend of inzichtgevend zijn. Geen vragen als hook.
Gebruik witregels voor leesbaarheid. Geen emoji's.`;

async function sendTelegramMessage(
  botToken: string,
  chatId: number,
  text: string,
): Promise<void> {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += 4000) {
    chunks.push(text.slice(i, i + 4000));
  }
  for (const chunk of chunks) {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: chunk, parse_mode: "HTML" }),
    });
  }
}

async function generateWithClaude(
  apiKey: string,
  topic: string,
  formatInstructions: string
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: BRAND_VOICE_PROMPT,
      messages: [
        {
          role: "user",
          content: `Onderwerp: ${topic}\n\n${formatInstructions}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text ?? "";
}

function extractJson(raw: string): string {
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  return match ? match[1].trim() : raw.trim();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY") || "";

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let chatId = 0;

  try {
    const { chatId: cid, topic, formats } = (await req.json()) as GenerateRequest;
    chatId = cid;

    // --- BLOG ---
    if (formats.includes("blog")) {
      try {
        const raw = await generateWithClaude(anthropicApiKey, topic, BLOG_FORMAT_INSTRUCTIONS);
        const blog = JSON.parse(extractJson(raw));

        const { data: post, error } = await supabase
          .from("blog_posts")
          .insert({
            title_nl: blog.title,
            title_en: blog.title,
            slug: blog.slug + "-" + Date.now(),
            excerpt_nl: blog.excerpt,
            content_nl: blog.content,
            tags: blog.tags,
            service_line: ["labs", "circle", "studio", "academy"].includes(blog.service_line)
              ? blog.service_line
              : null,
            status: "draft",
          })
          .select("id")
          .single();

        if (error) throw error;

        const siteUrl = Deno.env.get("SITE_URL") || "https://influence.be";
        const preview = blog.excerpt || blog.title;

        await sendTelegramMessage(
          botToken,
          chatId,
          `<b>BLOG DRAFT OPGESLAGEN</b>\n\n` +
          `<b>Titel:</b> ${blog.title}\n` +
          `<b>Tags:</b> ${(blog.tags || []).join(", ")}\n` +
          `<b>Service line:</b> ${blog.service_line || "—"}\n\n` +
          `<b>Preview:</b>\n${preview}\n\n` +
          `Bewerk: ${siteUrl}/admin/blog/${post.id}/edit`
        );
      } catch (e) {
        console.error("Blog generation error:", e);
        await sendTelegramMessage(botToken, chatId, "Blog generatie mislukt. Probeer opnieuw.");
      }
    }

    // --- LINKEDIN ---
    if (formats.includes("linkedin")) {
      try {
        const raw = await generateWithClaude(anthropicApiKey, topic, LINKEDIN_FORMAT_INSTRUCTIONS);
        const li = JSON.parse(extractJson(raw));

        const { error } = await supabase
          .from("linkedin_posts")
          .insert({
            content: li.content,
            hook: li.hook,
            hashtags: li.hashtags,
            topic,
          });

        if (error) throw error;

        await sendTelegramMessage(
          botToken,
          chatId,
          `<b>LINKEDIN DRAFT OPGESLAGEN</b>\n\n` +
          `<b>Hook:</b> ${li.hook}\n\n` +
          `${li.content}\n\n` +
          `${(li.hashtags || []).join(" ")}`
        );
      } catch (e) {
        console.error("LinkedIn generation error:", e);
        await sendTelegramMessage(botToken, chatId, "LinkedIn generatie mislukt. Probeer opnieuw.");
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generate-content error:", err);
    if (chatId) {
      await sendTelegramMessage(botToken, chatId, "Generatie mislukt. Probeer opnieuw.").catch(() => {});
    }
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
