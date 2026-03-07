import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type EmailType =
  | "contact_confirmation"
  | "lead_notification"
  | "drip"
  | "welcome"
  | "reengagement"
  | "campaign";

interface SendEmailRequest {
  type: EmailType;
  contactId: string;
  data?: Record<string, unknown>;
}

const MARKETING_TYPES: EmailType[] = [
  "drip",
  "welcome",
  "reengagement",
  "campaign",
];

// ---------------------------------------------------------------------------
// Unsubscribe token helpers
// ---------------------------------------------------------------------------

async function generateUnsubscribeToken(
  supabase: ReturnType<typeof createClient>,
  contactId: string
): Promise<string> {
  const tokenBytes = new Uint8Array(32);
  crypto.getRandomValues(tokenBytes);
  const token = Array.from(tokenBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90); // 90 day expiry

  await supabase.from("unsubscribe_tokens").insert({
    contact_id: contactId,
    token,
    expires_at: expiresAt.toISOString(),
  });

  return token;
}

// ---------------------------------------------------------------------------
// HTML email templates
// ---------------------------------------------------------------------------

function baseLayout(body: string, preheader = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Influence Circle</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #1a1a2e; padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
    .body { padding: 32px 24px; color: #333333; line-height: 1.6; }
    .body h2 { color: #1a1a2e; }
    .btn { display: inline-block; background: #6c63ff; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; margin: 16px 0; }
    .footer { padding: 24px; text-align: center; font-size: 12px; color: #888888; background: #f4f4f7; }
    .footer a { color: #6c63ff; }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ""}
  <div class="container">
    <div class="header"><h1>Influence Circle</h1></div>
    <div class="body">${body}</div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Influence Circle. All rights reserved.<br/>
      {{UNSUBSCRIBE_LINK}}
    </div>
  </div>
</body>
</html>`;
}

function renderContactConfirmation(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "there";
  const confirmUrl = data.confirmUrl as string || "#";
  return {
    subject: "Please confirm your email address",
    html: baseLayout(
      `<h2>Welcome, ${name}!</h2>
       <p>Thank you for signing up. Please confirm your email address by clicking the button below.</p>
       <p style="text-align:center"><a class="btn" href="${confirmUrl}">Confirm Email</a></p>
       <p>If you did not sign up, you can safely ignore this email.</p>`,
      "Please confirm your email address"
    ),
  };
}

function renderLeadNotification(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "Unknown";
  const email = (data.email as string) || "";
  const company = (data.company as string) || "N/A";
  const service = (data.service as string) || "N/A";
  const message = (data.message as string) || "";
  return {
    subject: `New lead: ${name} (${service})`,
    html: baseLayout(
      `<h2>New Lead Received</h2>
       <table style="width:100%;border-collapse:collapse;">
         <tr><td style="padding:8px;font-weight:600;">Name</td><td style="padding:8px;">${name}</td></tr>
         <tr><td style="padding:8px;font-weight:600;">Email</td><td style="padding:8px;">${email}</td></tr>
         <tr><td style="padding:8px;font-weight:600;">Company</td><td style="padding:8px;">${company}</td></tr>
         <tr><td style="padding:8px;font-weight:600;">Service Interest</td><td style="padding:8px;">${service}</td></tr>
         ${message ? `<tr><td style="padding:8px;font-weight:600;">Message</td><td style="padding:8px;">${message}</td></tr>` : ""}
       </table>`
    ),
  };
}

function renderWelcome(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "there";
  const service = (data.service as string) || "";
  return {
    subject: "Welcome to Influence Circle",
    html: baseLayout(
      `<h2>Welcome aboard, ${name}!</h2>
       <p>We're thrilled to have you join the Influence Circle community${service ? ` and we're excited about your interest in <strong>${service}</strong>` : ""}.</p>
       <p>Here's what you can expect:</p>
       <ul>
         <li>Expert insights on digital strategy and branding</li>
         <li>Exclusive content tailored to your interests</li>
         <li>Updates on our latest offerings</li>
       </ul>
       <p>Stay tuned -- great things are coming your way.</p>`,
      "Welcome to Influence Circle"
    ),
  };
}

function renderWelcomeDrip(
  template: string,
  name: string,
  language: string
): { subject: string; html: string } {
  const isNl = language !== "en";
  const siteUrl = Deno.env.get("SITE_URL") || "https://influencecircle.be";

  switch (template) {
    case "welcome_drip_1": {
      const subject = isNl
        ? "Welkom bij Influence Circle — Dit kun je verwachten"
        : "Welcome to Influence Circle — Here's what to expect";
      return {
        subject,
        html: baseLayout(
          `<h2>${isNl ? `Welkom, ${name}!` : `Welcome, ${name}!`}</h2>
           <p>${isNl
             ? "Bedankt voor je interesse in Influence Circle. Wij zijn Reputation Architects — wij helpen Europese C-level leiders hun reputatie strategisch op te bouwen."
             : "Thank you for your interest in Influence Circle. We are Reputation Architects — we help European C-level leaders strategically build their reputation."
           }</p>
           <p><strong>${isNl ? "Dit kun je de komende dagen verwachten:" : "Here's what to expect over the coming days:"}</strong></p>
           <ul>
             <li>${isNl ? "Ons Reputation Architecture Model — het denkmodel achter alles wat we doen" : "Our Reputation Architecture Model — the thinking framework behind everything we do"}</li>
             <li>${isNl ? "Onze 4-stappen methode — van diagnose tot borging" : "Our 4-step method — from diagnosis to retention"}</li>
             <li>${isNl ? "Een persoonlijke uitnodiging voor een vrijblijvend gesprek" : "A personal invitation for a no-obligation conversation"}</li>
           </ul>
           <p>${isNl
             ? "Geen spam, enkel strategie. Elke email die je van ons ontvangt heeft een doel."
             : "No spam, only strategy. Every email you receive from us has a purpose."
           }</p>
           <p>${isNl ? "Tot snel," : "Talk soon,"}<br/><strong>${isNl ? "Het Influence Circle team" : "The Influence Circle team"}</strong></p>`,
          subject
        ),
      };
    }

    case "welcome_drip_2": {
      const subject = isNl
        ? "Het Reputation Architecture Model — Van zichtbaar naar onvermijdelijk"
        : "The Reputation Architecture Model — From visible to inevitable";
      return {
        subject,
        html: baseLayout(
          `<h2>${isNl ? `${name}, zo bouwen wij reputaties.` : `${name}, this is how we build reputations.`}</h2>
           <p>${isNl
             ? "Elke reputatie doorloopt vier fasen. Wij noemen dit het Reputation Architecture Model:"
             : "Every reputation goes through four phases. We call this the Reputation Architecture Model:"
           }</p>
           <table style="width:100%;border-collapse:collapse;margin:24px 0;">
             <tr>
               <td style="padding:12px;background:#f8f9fa;border-left:4px solid #d55d25;">
                 <strong>${isNl ? "1. ZICHTBAAR" : "1. VISIBLE"}</strong><br/>
                 <span style="color:#555;">${isNl ? "Ze weten dat je bestaat" : "They know you exist"}</span>
               </td>
             </tr>
             <tr>
               <td style="padding:12px;background:#ffffff;border-left:4px solid #D7263D;">
                 <strong>${isNl ? "2. HERKENBAAR" : "2. RECOGNISABLE"}</strong><br/>
                 <span style="color:#555;">${isNl ? "Ze weten wie je bent" : "They know who you are"}</span>
               </td>
             </tr>
             <tr>
               <td style="padding:12px;background:#f8f9fa;border-left:4px solid #A855F7;">
                 <strong>${isNl ? "3. VERTROUWD" : "3. TRUSTED"}</strong><br/>
                 <span style="color:#555;">${isNl ? "Ze geloven wat je zegt" : "They believe what you say"}</span>
               </td>
             </tr>
             <tr>
               <td style="padding:12px;background:#ffffff;border-left:4px solid #E8A317;">
                 <strong>${isNl ? "4. ONVERMIJDELIJK" : "4. INEVITABLE"}</strong><br/>
                 <span style="color:#555;">${isNl ? "Ze kiezen jou" : "They choose you"}</span>
               </td>
             </tr>
           </table>
           <p>${isNl
             ? "De meeste leiders stoppen bij zichtbaarheid. Wij bouwen door tot onvermijdelijkheid."
             : "Most leaders stop at visibility. We build through to inevitability."
           }</p>
           <p>${isNl
             ? "In onze volgende email laten we zien hoe onze methode dit model tot leven brengt."
             : "In our next email, we'll show you how our method brings this model to life."
           }</p>
           <p>${isNl ? "Strategische groeten," : "Strategic regards,"}<br/><strong>${isNl ? "Het Influence Circle team" : "The Influence Circle team"}</strong></p>`,
          subject
        ),
      };
    }

    case "welcome_drip_3": {
      const subject = isNl
        ? "De reis van diagnose tot borging — Onze 4-stappen methode"
        : "From diagnosis to retention — Our 4-step method";
      return {
        subject,
        html: baseLayout(
          `<h2>${isNl ? `${name}, zo brengen wij het model tot leven.` : `${name}, this is how we bring the model to life.`}</h2>
           <p>${isNl
             ? "Het model vertelt je waar je naartoe moet. Onze methode brengt je er. Vier service lines, sequentieel opgebouwd:"
             : "The model tells you where to go. Our method gets you there. Four service lines, built sequentially:"
           }</p>
           <table style="width:100%;border-collapse:collapse;margin:24px 0;">
             <tr>
               <td style="padding:16px;background:#FFF5F0;border-left:4px solid #d55d25;margin-bottom:8px;">
                 <strong style="color:#d55d25;">LABS — ${isNl ? "Strategie & Diagnose" : "Strategy & Diagnosis"}</strong><br/>
                 <span style="color:#555;font-size:14px;">${isNl
                   ? "Alles begint met een diagnose. Blue Ocean Strategy, Zero Based Thinking, Playing to Win — de strategische lens die uw concurrenten missen."
                   : "Everything starts with a diagnosis. Blue Ocean Strategy, Zero Based Thinking, Playing to Win — the strategic lens your competitors are missing."
                 }</span>
               </td>
             </tr>
             <tr><td style="height:8px;"></td></tr>
             <tr>
               <td style="padding:16px;background:#FFF0F1;border-left:4px solid #D7263D;">
                 <strong style="color:#D7263D;">CIRCLE — ${isNl ? "Netwerk & Positionering" : "Network & Positioning"}</strong><br/>
                 <span style="color:#555;font-size:14px;">${isNl
                   ? "Strategische positionering in de juiste netwerken. De juiste mensen kennen u, vertrouwen u en bevelen u aan."
                   : "Strategic positioning in the right networks. The right people know you, trust you, and recommend you."
                 }</span>
               </td>
             </tr>
             <tr><td style="height:8px;"></td></tr>
             <tr>
               <td style="padding:16px;background:#FAF5FF;border-left:4px solid #A855F7;">
                 <strong style="color:#A855F7;">STUDIO — ${isNl ? "Creatie & Narratief" : "Creation & Narrative"}</strong><br/>
                 <span style="color:#555;font-size:14px;">${isNl
                   ? "Premium content die resoneert. Van thought leadership artikelen tot visuele storytelling."
                   : "Premium content that resonates. From thought leadership articles to visual storytelling."
                 }</span>
               </td>
             </tr>
             <tr><td style="height:8px;"></td></tr>
             <tr>
               <td style="padding:16px;background:#FFFBEB;border-left:4px solid #E8A317;">
                 <strong style="color:#E8A317;">ACADEMY — ${isNl ? "Borging & Training" : "Retention & Training"}</strong><br/>
                 <span style="color:#555;font-size:14px;">${isNl
                   ? "Training en certificering zodat uw team uw reputatie autonoom kan versterken."
                   : "Training and certification so your team can autonomously strengthen your reputation."
                 }</span>
               </td>
             </tr>
           </table>
           <p>${isNl
             ? "Morgen sturen we je een persoonlijke uitnodiging. Geen verplichtingen, enkel een gesprek."
             : "Tomorrow we'll send you a personal invitation. No obligations, just a conversation."
           }</p>
           <p>${isNl ? "Met ambitie," : "With ambition,"}<br/><strong>${isNl ? "Het Influence Circle team" : "The Influence Circle team"}</strong></p>`,
          subject
        ),
      };
    }

    case "welcome_drip_4": {
      const subject = isNl
        ? "Laten we kennismaken — Plan een vrijblijvend gesprek"
        : "Let's get acquainted — Schedule a free consultation";
      return {
        subject,
        html: baseLayout(
          `<h2>${isNl ? `${name}, laten we kennismaken.` : `${name}, let's get acquainted.`}</h2>
           <p>${isNl
             ? "De afgelopen dagen heb je gezien hoe wij reputaties bouwen — van het model tot de methode. Nu is het aan jou."
             : "Over the past few days, you've seen how we build reputations — from the model to the method. Now it's your turn."
           }</p>
           <p>${isNl
             ? "We bieden een vrijblijvend strategiegesprek aan waarin we:"
             : "We offer a no-obligation strategy session where we:"
           }</p>
           <ul>
             <li>${isNl ? "Uw huidige reputatiepositie analyseren" : "Analyse your current reputation position"}</li>
             <li>${isNl ? "De grootste kansen identificeren" : "Identify the biggest opportunities"}</li>
             <li>${isNl ? "Een concreet eerste actieplan schetsen" : "Outline a concrete first action plan"}</li>
           </ul>
           <p>${isNl
             ? "Geen verkooppraatje, geen verplichtingen. Enkel een eerlijk gesprek over waar u staat en waar u naartoe kunt."
             : "No sales pitch, no obligations. Just an honest conversation about where you stand and where you can go."
           }</p>
           <p style="text-align:center"><a class="btn" href="${siteUrl}/contact">${isNl ? "Plan een gesprek" : "Schedule a call"}</a></p>
           <p>${isNl
             ? "Ik kijk ernaar uit."
             : "I look forward to it."
           }</p>
           <p>${isNl ? "Hartelijke groeten," : "Warm regards,"}<br/><strong>Claudio Swijsen</strong><br/><span style="color:#888;">Founder, Influence Circle</span></p>`,
          subject
        ),
      };
    }

    default:
      return {
        subject: "A message from Influence Circle",
        html: baseLayout(`<p>Thank you for being part of Influence Circle.</p>`),
      };
  }
}

function renderDrip(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const template = data.template as string;
  const language = (data.language as string) || "nl";
  const name = (data.name as string) || (language === "nl" ? "daar" : "there");

  // Template-based drip emails
  if (template?.startsWith("welcome_drip_")) {
    const rendered = renderWelcomeDrip(template, name, language);
    // Allow flow step to override subject based on language
    const subject = language === "en"
      ? (data.subject_en as string) || rendered.subject
      : (data.subject_nl as string) || rendered.subject;
    return { subject, html: rendered.html };
  }

  // Fallback: existing raw subject/body behavior
  const subject = (data.subject as string) || "A message from Influence Circle";
  const body = (data.body as string) || "";
  const ctaText = (data.ctaText as string) || "";
  const ctaUrl = (data.ctaUrl as string) || "";
  return {
    subject,
    html: baseLayout(
      `${body}
       ${ctaText && ctaUrl ? `<p style="text-align:center"><a class="btn" href="${ctaUrl}">${ctaText}</a></p>` : ""}`,
      subject
    ),
  };
}

function renderReengagement(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const name = (data.name as string) || "there";
  return {
    subject: "We miss you at Influence Circle",
    html: baseLayout(
      `<h2>Hey ${name}, it's been a while!</h2>
       <p>We noticed you haven't been around lately and wanted to check in. We've been working on some exciting new content and services that we think you'll love.</p>
       <p style="text-align:center"><a class="btn" href="${(data.returnUrl as string) || "#"}">See What's New</a></p>
       <p>If you're no longer interested, no hard feelings -- you can update your preferences below.</p>`,
      "We miss you -- come see what's new"
    ),
  };
}

function renderCampaign(
  data: Record<string, unknown>
): { subject: string; html: string } {
  const subject = (data.subject as string) || "News from Influence Circle";
  const body = (data.body as string) || "";
  const ctaText = (data.ctaText as string) || "";
  const ctaUrl = (data.ctaUrl as string) || "";
  return {
    subject,
    html: baseLayout(
      `${body}
       ${ctaText && ctaUrl ? `<p style="text-align:center"><a class="btn" href="${ctaUrl}">${ctaText}</a></p>` : ""}`,
      subject
    ),
  };
}

function renderEmail(
  type: EmailType,
  data: Record<string, unknown>
): { subject: string; html: string } {
  switch (type) {
    case "contact_confirmation":
      return renderContactConfirmation(data);
    case "lead_notification":
      return renderLeadNotification(data);
    case "welcome":
      return renderWelcome(data);
    case "drip":
      return renderDrip(data);
    case "reengagement":
      return renderReengagement(data);
    case "campaign":
      return renderCampaign(data);
    default:
      throw new Error(`Unknown email type: ${type}`);
  }
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
    const fromEmail = Deno.env.get("FROM_EMAIL") || "hello@influencecircle.com";
    const siteUrl = Deno.env.get("SITE_URL") || "https://influencecircle.com";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { type, contactId, data = {} } = (await req.json()) as SendEmailRequest;

    if (!type || !contactId) {
      return new Response(
        JSON.stringify({ error: "type and contactId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch contact
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (contactError || !contact) {
      return new Response(
        JSON.stringify({ error: "Contact not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Merge contact data into template data
    const templateData: Record<string, unknown> = {
      name: contact.name,
      email: contact.email,
      company: contact.company,
      language: contact.language,
      ...data,
    };

    // Render email
    const { subject, html: rawHtml } = renderEmail(type, templateData);

    // Build headers for the Resend API call
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    };

    // Prepare Resend payload
    const isMarketing = MARKETING_TYPES.includes(type);
    let finalHtml = rawHtml;

    const resendPayload: Record<string, unknown> = {
      from: fromEmail,
      to: [contact.email],
      subject: (data.subject as string) || subject,
      html: "", // will be set below
    };

    // For marketing emails: add List-Unsubscribe header and generate token
    if (isMarketing) {
      const token = await generateUnsubscribeToken(supabase, contactId);
      const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${token}`;
      const functionUnsubscribeUrl = `${supabaseUrl}/functions/v1/unsubscribe?token=${token}`;

      finalHtml = finalHtml.replace(
        "{{UNSUBSCRIBE_LINK}}",
        `<a href="${functionUnsubscribeUrl}">Unsubscribe</a> | <a href="${functionUnsubscribeUrl}&preferences=true">Manage Preferences</a>`
      );

      resendPayload.headers = {
        "List-Unsubscribe": `<${functionUnsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      };
    } else {
      finalHtml = finalHtml.replace("{{UNSUBSCRIBE_LINK}}", "");
    }

    resendPayload.html = finalHtml;

    // Determine recipient -- lead_notification goes to admin, everything else to the contact
    if (type === "lead_notification") {
      const adminEmail = Deno.env.get("ADMIN_EMAIL") || fromEmail;
      resendPayload.to = [adminEmail];
    }

    // Send via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify(resendPayload),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendResult);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: resendResult }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record in email_sends
    const { data: emailSend, error: insertError } = await supabase
      .from("email_sends")
      .insert({
        contact_id: contactId,
        resend_id: resendResult.id,
        subject: (data.subject as string) || subject,
        template: type,
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to record email send:", insertError);
    }

    // Update contact last_activity_at
    await supabase
      .from("contacts")
      .update({ last_activity_at: new Date().toISOString() })
      .eq("id", contactId);

    return new Response(
      JSON.stringify({
        success: true,
        emailSendId: emailSend?.id,
        resendId: resendResult.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-email error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
