# Telegram Content Bot — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Telegram bot that generates blog and LinkedIn drafts in the Influence Circle brand voice via Claude API, saves them to Supabase, and sends previews back in Telegram.

**Architecture:** Two Supabase edge functions: `telegram-webhook` (fast ack, invokes second function) and `generate-content` (calls Claude API, saves drafts, replies via Telegram). New `linkedin_posts` table for LinkedIn drafts.

**Tech Stack:** Deno (Supabase edge functions), Anthropic SDK, Telegram Bot API, Supabase JS client.

**Design doc:** `docs/plans/2026-03-07-telegram-content-bot-design.md`

---

### Task 1: Database Migration — linkedin_posts table

**Files:**
- Create: `supabase/migrations/006_linkedin_posts.sql`

**Step 1: Write the migration**

```sql
-- ============================================================
-- Influence Circle — LinkedIn Posts table
-- Stores AI-generated LinkedIn draft posts from Telegram bot
-- ============================================================

CREATE TABLE linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  hook TEXT,
  hashtags TEXT[] DEFAULT '{}',
  topic TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON linkedin_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: only authenticated users (admin) can access
ALTER TABLE linkedin_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access on linkedin_posts"
  ON linkedin_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

**Step 2: Apply migration via Supabase MCP**

Run: `mcp__supabase__apply_migration` with project_id `hwplkdmjigtbciladtoh`, name `linkedin_posts`, and the SQL above.

**Step 3: Verify**

Run: `mcp__supabase__execute_sql` — `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'linkedin_posts' ORDER BY ordinal_position;`
Expected: 8 columns (id, content, hook, hashtags, topic, status, created_at, published_at, updated_at)

**Step 4: Commit**

```bash
git add supabase/migrations/006_linkedin_posts.sql
git commit -m "feat: add linkedin_posts table for Telegram bot drafts"
```

---

### Task 2: Edge Function — telegram-webhook

**Files:**
- Create: `supabase/functions/telegram-webhook/index.ts`

**Step 1: Write the webhook handler**

This function receives Telegram updates, validates the sender, detects the desired format, sends an acknowledgment, and invokes `generate-content`.

```ts
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
    const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
```

**Step 2: Commit**

```bash
git add supabase/functions/telegram-webhook/index.ts
git commit -m "feat: add telegram-webhook edge function"
```

---

### Task 3: Edge Function — generate-content

**Files:**
- Create: `supabase/functions/generate-content/index.ts`

**Step 1: Write the content generation function**

This function calls Claude API, saves drafts, and replies via Telegram.

```ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.39.0";

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
  // Telegram max message length is 4096
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
  anthropic: Anthropic,
  topic: string,
  formatInstructions: string
): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `Onderwerp: ${topic}\n\n${formatInstructions}`,
      },
    ],
    system: BRAND_VOICE_PROMPT,
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock?.text ?? "";
}

function extractJson(raw: string): string {
  // Strip markdown code fences if present
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  return match ? match[1].trim() : raw.trim();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
  const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY")!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const anthropic = new Anthropic({ apiKey: anthropicApiKey });

  let chatId = 0;

  try {
    const { chatId: cid, topic, formats } = (await req.json()) as GenerateRequest;
    chatId = cid;

    // --- BLOG ---
    if (formats.includes("blog")) {
      try {
        const raw = await generateWithClaude(anthropic, topic, BLOG_FORMAT_INSTRUCTIONS);
        const blog = JSON.parse(extractJson(raw));

        const { data: post, error } = await supabase
          .from("blog_posts")
          .insert({
            title_nl: blog.title,
            title_en: blog.title, // NOT NULL — use NL as placeholder
            slug: blog.slug + "-" + Date.now(), // ensure uniqueness
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
        const raw = await generateWithClaude(anthropic, topic, LINKEDIN_FORMAT_INSTRUCTIONS);
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
```

**Step 2: Commit**

```bash
git add supabase/functions/generate-content/index.ts
git commit -m "feat: add generate-content edge function with Claude API"
```

---

### Task 4: Deploy Edge Functions & Set Secrets

**Step 1: Set Telegram + Anthropic secrets on Supabase**

You need to manually set these via Supabase dashboard or CLI:

```bash
supabase secrets set TELEGRAM_BOT_TOKEN=<your-bot-token>
supabase secrets set TELEGRAM_CHAT_ID=<your-chat-id>
supabase secrets set ANTHROPIC_API_KEY=<your-api-key>
```

To find your chat ID: message your bot, then visit `https://api.telegram.org/bot<TOKEN>/getUpdates` and look for `message.chat.id`.

**Step 2: Deploy both edge functions**

```bash
cd /Users/claudioswijsen/Desktop/CC\ Masterclass/influence-circle
supabase functions deploy telegram-webhook --no-verify-jwt
supabase functions deploy generate-content
```

Note: `telegram-webhook` needs `--no-verify-jwt` because Telegram sends raw POST requests without auth headers. `generate-content` keeps JWT verification since it's called internally with the service role key.

**Step 3: Set Telegram webhook**

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://hwplkdmjigtbciladtoh.supabase.co/functions/v1/telegram-webhook"}'
```

Expected: `{"ok":true,"result":true,"description":"Webhook was set"}`

**Step 4: Test end-to-end**

Send a message to your bot: "Blog over de kracht van strategische onzichtbaarheid"
Expected:
1. Bot replies "Bezig met genereren (blog)..."
2. After 10-20 seconds, bot replies with blog draft preview
3. Draft appears in Supabase `blog_posts` table with status `draft`

**Step 5: Commit any adjustments**

```bash
git add -A
git commit -m "chore: deployment config for telegram bot functions"
```

---

## Implementation Order

1. Task 1 — Migration (linkedin_posts table)
2. Task 2 — telegram-webhook edge function
3. Task 3 — generate-content edge function
4. Task 4 — Deploy, set secrets, register webhook, test

## Environment Variables Summary

| Variable | Where | Notes |
|----------|-------|-------|
| `TELEGRAM_BOT_TOKEN` | Supabase secrets | From @BotFather |
| `TELEGRAM_CHAT_ID` | Supabase secrets | Your personal chat ID |
| `ANTHROPIC_API_KEY` | Supabase secrets | Claude API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Already set | Used by edge functions |
| `SUPABASE_SERVICE_ROLE_KEY` | Already set | Used by edge functions |
| `SITE_URL` | Already set | For admin links in Telegram messages |
