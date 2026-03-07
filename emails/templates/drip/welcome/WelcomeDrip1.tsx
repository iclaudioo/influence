import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";

interface WelcomeDrip1Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const content = {
  nl: {
    previewText: "Welkom bij Influence Circle — Dit kun je verwachten",
    heading: (name: string) => `Welkom, ${name}!`,
    intro:
      "Bedankt voor je interesse in Influence Circle. Wij zijn Reputation Architects — wij helpen Europese C-level leiders hun reputatie strategisch op te bouwen.",
    expectHeading: "Dit kun je de komende dagen verwachten:",
    expect1: "Ons Reputation Architecture Model — het denkmodel achter alles wat we doen",
    expect2: "Onze 4-stappen methode — van diagnose tot borging",
    expect3: "Een persoonlijke uitnodiging voor een vrijblijvend gesprek",
    noSpam: "Geen spam, enkel strategie. Elke email die je van ons ontvangt heeft een doel.",
    greeting: "Tot snel,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "Welcome to Influence Circle — Here's what to expect",
    heading: (name: string) => `Welcome, ${name}!`,
    intro:
      "Thank you for your interest in Influence Circle. We are Reputation Architects — we help European C-level leaders strategically build their reputation.",
    expectHeading: "Here's what to expect over the coming days:",
    expect1: "Our Reputation Architecture Model — the thinking framework behind everything we do",
    expect2: "Our 4-step method — from diagnosis to retention",
    expect3: "A personal invitation for a no-obligation conversation",
    noSpam: "No spam, only strategy. Every email you receive from us has a purpose.",
    greeting: "Talk soon,",
    team: "The Influence Circle team",
  },
};

export default function WelcomeDrip1({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: WelcomeDrip1Props) {
  const t = content[language];

  const textStyle = {
    color: "#02182B",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 24px" as const,
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const listItemStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px" as const,
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

        <Text style={textStyle}>{t.intro}</Text>

        <Text style={{ ...textStyle, fontWeight: "bold", margin: "0 0 12px" }}>
          {t.expectHeading}
        </Text>

        <Text style={listItemStyle}>&bull; {t.expect1}</Text>
        <Text style={listItemStyle}>&bull; {t.expect2}</Text>
        <Text style={{ ...listItemStyle, margin: "0 0 24px" }}>&bull; {t.expect3}</Text>

        <Text style={textStyle}>{t.noSpam}</Text>

        <Text style={{ color: "#4A5568", fontSize: "15px", margin: "32px 0 4px", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.greeting}
        </Text>
        <Text style={{ color: "#02182B", fontSize: "15px", fontWeight: "bold", margin: "0", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.team}
        </Text>
      </Section>
    </BaseLayout>
  );
}
