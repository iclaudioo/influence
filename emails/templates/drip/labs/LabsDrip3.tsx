import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface LabsDrip3Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const content = {
  nl: {
    previewText: "Exclusief: Gratis groei-audit voor jouw bedrijf",
    heading: (name: string) => `${name}, klaar voor jouw groei-audit?`,
    intro:
      "We merken dat je geïnteresseerd bent in datagedreven groei — en dat waarderen we. Daarom willen we je iets exclusiefs aanbieden.",
    offerHeading: "Gratis groei-audit",
    offerText:
      "Onze experts analyseren jouw huidige digitale marketingstrategie en identificeren de grootste kansen voor verbetering. Dit is wat je krijgt:",
    item1: "Analyse van je huidige kanaalperformance",
    item2: "Benchmark ten opzichte van je industrie",
    item3: "Top 3 quick wins die je direct kunt implementeren",
    item4: "Gepersonaliseerd groeiadvies op maat van je doelen",
    valueText:
      "Deze audit is normaal onderdeel van ons consultingpakket, maar we bieden hem gratis aan voor geïnteresseerde bedrijven. Geen verplichtingen, geen verkooppraatje — puur waarde.",
    limitText:
      "We kunnen maximaal 5 audits per maand uitvoeren om de kwaliteit te garanderen. Reageer snel om je plek te claimen.",
    cta: "Claim je gratis groei-audit",
    greeting: "Met strategische groeten,",
    team: "Het Influence Labs team",
  },
  en: {
    previewText: "Exclusive: Free growth audit for your company",
    heading: (name: string) => `${name}, ready for your growth audit?`,
    intro:
      "We notice you're interested in data-driven growth — and we appreciate that. That's why we'd like to offer you something exclusive.",
    offerHeading: "Free growth audit",
    offerText:
      "Our experts will analyze your current digital marketing strategy and identify the biggest opportunities for improvement. Here's what you'll get:",
    item1: "Analysis of your current channel performance",
    item2: "Benchmark against your industry",
    item3: "Top 3 quick wins you can implement immediately",
    item4: "Personalized growth advice tailored to your goals",
    valueText:
      "This audit is normally part of our consulting package, but we're offering it for free to interested companies. No obligations, no sales pitch — just pure value.",
    limitText:
      "We can conduct a maximum of 5 audits per month to ensure quality. Act quickly to claim your spot.",
    cta: "Claim your free growth audit",
    greeting: "With strategic regards,",
    team: "The Influence Labs team",
  },
};

export default function LabsDrip3({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: LabsDrip3Props) {
  const t = content[language];

  const checkItemStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px",
    paddingLeft: "12px",
    borderLeft: `3px solid ${ACCENT}`,
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return (
    <BaseLayout
      previewText={t.previewText}
      accentColor={ACCENT}
      unsubscribeUrl={unsubscribeUrl}
      language={language}
    >
      <Section style={{ padding: "32px" }}>
        <Heading
          as="h1"
          style={{
            color: "#02182B",
            fontSize: "24px",
            fontWeight: "bold",
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.heading(name)}
        </Heading>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.intro}
        </Text>

        <Section
          style={{
            backgroundColor: "#FFF7ED",
            padding: "24px",
            borderRadius: "8px",
            margin: "0 0 24px",
          }}
        >
          <Heading
            as="h2"
            style={{
              color: ACCENT,
              fontSize: "18px",
              fontWeight: "bold",
              margin: "0 0 8px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.offerHeading}
          </Heading>

          <Text
            style={{
              color: "#02182B",
              fontSize: "14px",
              lineHeight: "22px",
              margin: "0 0 16px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.offerText}
          </Text>

          <Text style={checkItemStyle}>{t.item1}</Text>
          <Text style={checkItemStyle}>{t.item2}</Text>
          <Text style={checkItemStyle}>{t.item3}</Text>
          <Text style={{ ...checkItemStyle, margin: "0" }}>{t.item4}</Text>
        </Section>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.valueText}
        </Text>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "14px",
            lineHeight: "22px",
            fontStyle: "italic",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.limitText}
        </Text>

        <CTAButton href="https://influencecircle.be/labs#audit" accentColor={ACCENT}>
          {t.cta}
        </CTAButton>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "15px",
            margin: "32px 0 4px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.greeting}
        </Text>
        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            fontWeight: "bold",
            margin: "0",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.team}
        </Text>
      </Section>
    </BaseLayout>
  );
}
