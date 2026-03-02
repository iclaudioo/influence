import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const ALL_MARKETING_CATEGORIES = [
  "marketing",
  "product_updates",
  "newsletter",
  "drip",
];

// ---------------------------------------------------------------------------
// Bilingual HTML templates
// ---------------------------------------------------------------------------

function unsubscribeSuccessHtml(language: string): string {
  const isNl = language === "nl";
  return `<!DOCTYPE html>
<html lang="${isNl ? "nl" : "en"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isNl ? "Uitgeschreven" : "Unsubscribed"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f4f4f7;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 48px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { color: #1a1a2e; margin-bottom: 12px; font-size: 24px; }
    p { color: #555555; line-height: 1.6; margin-bottom: 16px; }
    .subtle { font-size: 14px; color: #888888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#9989;</div>
    <h1>${isNl ? "Je bent uitgeschreven" : "You've been unsubscribed"}</h1>
    <p>${
      isNl
        ? "Je zult geen marketing e-mails meer ontvangen van Influence Circle. Eventuele transactionele e-mails (bevestigingen, etc.) worden nog wel verzonden."
        : "You will no longer receive marketing emails from Influence Circle. Transactional emails (confirmations, etc.) will still be sent when applicable."
    }</p>
    <p class="subtle">${
      isNl
        ? "Dit venster kan veilig worden gesloten."
        : "You can safely close this window."
    }</p>
  </div>
</body>
</html>`;
}

function preferencesUpdatedHtml(
  language: string,
  categories: string[]
): string {
  const isNl = language === "nl";
  const categoryLabels: Record<string, Record<string, string>> = {
    marketing: { en: "Marketing", nl: "Marketing" },
    product_updates: { en: "Product Updates", nl: "Productupdates" },
    newsletter: { en: "Newsletter", nl: "Nieuwsbrief" },
    drip: { en: "Automated Sequences", nl: "Automatische Reeksen" },
  };

  const unsubList = categories
    .map((c) => {
      const label = categoryLabels[c]
        ? categoryLabels[c][isNl ? "nl" : "en"]
        : c;
      return `<li>${label}</li>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="${isNl ? "nl" : "en"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isNl ? "Voorkeuren bijgewerkt" : "Preferences Updated"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f4f4f7;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 48px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { color: #1a1a2e; margin-bottom: 12px; font-size: 24px; }
    p { color: #555555; line-height: 1.6; margin-bottom: 16px; }
    ul { list-style: none; padding: 0; margin: 16px 0; }
    ul li { padding: 8px 0; color: #333; border-bottom: 1px solid #eee; }
    .subtle { font-size: 14px; color: #888888; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#9881;</div>
    <h1>${isNl ? "Voorkeuren bijgewerkt" : "Preferences Updated"}</h1>
    <p>${
      isNl
        ? "Je ontvangt geen e-mails meer voor de volgende categorieën:"
        : "You have been unsubscribed from the following categories:"
    }</p>
    <ul>${unsubList}</ul>
    <p class="subtle">${
      isNl
        ? "Dit venster kan veilig worden gesloten."
        : "You can safely close this window."
    }</p>
  </div>
</body>
</html>`;
}

function errorHtml(language: string, message: string): string {
  const isNl = language === "nl";
  return `<!DOCTYPE html>
<html lang="${isNl ? "nl" : "en"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isNl ? "Fout" : "Error"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f4f4f7;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 48px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .icon { font-size: 48px; margin-bottom: 16px; }
    h1 { color: #c0392b; margin-bottom: 12px; font-size: 24px; }
    p { color: #555555; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#9888;</div>
    <h1>${isNl ? "Er is iets misgegaan" : "Something went wrong"}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Token validation
// ---------------------------------------------------------------------------

async function validateToken(
  supabase: ReturnType<typeof createClient>,
  token: string
): Promise<{
  valid: boolean;
  tokenRecord?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  error?: string;
}> {
  if (!token) {
    return { valid: false, error: "No token provided" };
  }

  const { data: tokenRecord, error: tokenError } = await supabase
    .from("unsubscribe_tokens")
    .select("*")
    .eq("token", token)
    .maybeSingle();

  if (tokenError || !tokenRecord) {
    return { valid: false, error: "Invalid or unknown token" };
  }

  // Check if already used
  if (tokenRecord.used_at) {
    return { valid: false, error: "This unsubscribe link has already been used" };
  }

  // Check if expired
  if (tokenRecord.expires_at && new Date(tokenRecord.expires_at) < new Date()) {
    return { valid: false, error: "This unsubscribe link has expired" };
  }

  // Fetch the contact
  const { data: contact, error: contactError } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", tokenRecord.contact_id)
    .single();

  if (contactError || !contact) {
    return { valid: false, error: "Contact not found" };
  }

  return { valid: true, tokenRecord, contact };
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const url = new URL(req.url);

  try {
    // -----------------------------------------------------------------------
    // GET: One-click unsubscribe from all marketing categories
    // -----------------------------------------------------------------------
    if (req.method === "GET") {
      const token = url.searchParams.get("token") || "";

      const validation = await validateToken(supabase, token);

      if (!validation.valid) {
        // Try to guess language from query param or default to English
        const lang = url.searchParams.get("lang") || "en";
        const message =
          validation.error || "Invalid or expired unsubscribe link.";
        return new Response(errorHtml(lang, message), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
        });
      }

      const contact = validation.contact!;
      const tokenRecord = validation.tokenRecord!;
      const contactId = tokenRecord.contact_id as string;
      const language = (contact.language as string) || "en";

      // Mark token as used
      await supabase
        .from("unsubscribe_tokens")
        .update({ used_at: new Date().toISOString() })
        .eq("id", tokenRecord.id);

      // Unsubscribe from all marketing categories
      for (const category of ALL_MARKETING_CATEGORIES) {
        await supabase.from("email_preferences").upsert(
          {
            contact_id: contactId,
            category,
            subscribed: false,
          },
          { onConflict: "contact_id,category" }
        );
      }

      // Update contact status to unsubscribed
      await supabase
        .from("contacts")
        .update({ status: "unsubscribed" })
        .eq("id", contactId);

      // Cancel active flow enrollments
      await supabase
        .from("contact_flow_enrollments")
        .update({ status: "cancelled", next_action_at: null })
        .eq("contact_id", contactId)
        .eq("status", "active");

      return new Response(unsubscribeSuccessHtml(language), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // -----------------------------------------------------------------------
    // POST: Preference-based unsubscribe (specific categories)
    // -----------------------------------------------------------------------
    if (req.method === "POST") {
      let body: { token?: string; categories?: string[] };
      try {
        body = await req.json();
      } catch {
        return new Response(
          JSON.stringify({ error: "Invalid JSON body" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const token = body.token || "";
      const categories = body.categories || [];

      const validation = await validateToken(supabase, token);

      if (!validation.valid) {
        return new Response(
          JSON.stringify({ error: validation.error }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const contact = validation.contact!;
      const tokenRecord = validation.tokenRecord!;
      const contactId = tokenRecord.contact_id as string;
      const language = (contact.language as string) || "en";

      // Mark token as used
      await supabase
        .from("unsubscribe_tokens")
        .update({ used_at: new Date().toISOString() })
        .eq("id", tokenRecord.id);

      if (categories.length === 0) {
        // No specific categories = unsubscribe from all (same as GET)
        for (const category of ALL_MARKETING_CATEGORIES) {
          await supabase.from("email_preferences").upsert(
            {
              contact_id: contactId,
              category,
              subscribed: false,
            },
            { onConflict: "contact_id,category" }
          );
        }

        await supabase
          .from("contacts")
          .update({ status: "unsubscribed" })
          .eq("id", contactId);

        await supabase
          .from("contact_flow_enrollments")
          .update({ status: "cancelled", next_action_at: null })
          .eq("contact_id", contactId)
          .eq("status", "active");

        return new Response(
          JSON.stringify({
            success: true,
            unsubscribedFrom: ALL_MARKETING_CATEGORIES,
            html: unsubscribeSuccessHtml(language),
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Unsubscribe from specific categories only
      const validCategories = categories.filter((c) =>
        ALL_MARKETING_CATEGORIES.includes(c)
      );

      for (const category of validCategories) {
        await supabase.from("email_preferences").upsert(
          {
            contact_id: contactId,
            category,
            subscribed: false,
          },
          { onConflict: "contact_id,category" }
        );
      }

      // If all categories are now unsubscribed, update contact status
      const { data: remainingPrefs } = await supabase
        .from("email_preferences")
        .select("category")
        .eq("contact_id", contactId)
        .eq("subscribed", true);

      const hasRemainingSubscriptions =
        remainingPrefs && remainingPrefs.length > 0;

      if (!hasRemainingSubscriptions) {
        await supabase
          .from("contacts")
          .update({ status: "unsubscribed" })
          .eq("id", contactId);

        await supabase
          .from("contact_flow_enrollments")
          .update({ status: "cancelled", next_action_at: null })
          .eq("contact_id", contactId)
          .eq("status", "active");
      }

      return new Response(
        JSON.stringify({
          success: true,
          unsubscribedFrom: validCategories,
          html: preferencesUpdatedHtml(language, validCategories),
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // -----------------------------------------------------------------------
    // Other methods
    // -----------------------------------------------------------------------
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("unsubscribe error:", err);
    return new Response(
      errorHtml("en", "An unexpected error occurred. Please try again later."),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
});
