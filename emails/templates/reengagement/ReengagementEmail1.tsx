import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../components/BaseLayout";
import { CTAButton } from "../../components/CTAButton";

interface ReengagementEmail1Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#02182B";

const content = {
  nl: {
    previewText: "We missen je — en hebben iets nieuws te delen",
    heading: (name: string) => `${name}, we missen je!`,
    intro:
      "Het is even geleden dat we iets van je gehoord hebben. We wilden even inchecken en onze beste recente content met je delen — voor het geval je het gemist hebt.",
    contentHeading: "Dit heb je misschien gemist",
    article1Title: "De toekomst van B2B marketing op LinkedIn",
    article1Text:
      "Hoe verandert het LinkedIn-algoritme in 2026 en wat betekent dit voor je strategie? Een complete analyse met actionable tips.",
    article2Title: "Employee advocacy: Van pilot naar programma",
    article2Text:
      "Praktische stappen om je employee advocacy initiatief te schalen van een kleine test naar een organisatiebreed programma.",
    article3Title: "Content die converteert: Het 80/20 principe",
    article3Text:
      "Ontdek welke 20% van je content 80% van je resultaten oplevert en hoe je dit inzicht kunt gebruiken om slimmer te werken.",
    closing:
      "We blijven werken aan waardevolle inzichten en praktische tools. We hopen je snel weer te zien!",
    cta: "Bezoek onze website",
    greeting: "Met warme groeten,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "We miss you — and have something new to share",
    heading: (name: string) => `${name}, we miss you!`,
    intro:
      "It's been a while since we last heard from you. We wanted to check in and share our best recent content with you — in case you missed it.",
    contentHeading: "You might have missed this",
    article1Title: "The future of B2B marketing on LinkedIn",
    article1Text:
      "How is the LinkedIn algorithm changing in 2026 and what does this mean for your strategy? A complete analysis with actionable tips.",
    article2Title: "Employee advocacy: From pilot to program",
    article2Text:
      "Practical steps to scale your employee advocacy initiative from a small test to an organization-wide program.",
    article3Title: "Content that converts: The 80/20 principle",
    article3Text:
      "Discover which 20% of your content delivers 80% of your results and how you can use this insight to work smarter.",
    closing:
      "We continue to work on valuable insights and practical tools. We hope to see you again soon!",
    cta: "Visit our website",
    greeting: "With warm regards,",
    team: "The Influence Circle team",
  },
};

export default function ReengagementEmail1({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: ReengagementEmail1Props) {
  const t = content[language];

  const articleBlockStyle = {
    padding: "16px 0",
    borderBottom: "1px solid #E2E8F0",
  };

  const articleTitleStyle = {
    color: "#02182B",
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const articleTextStyle = {
    color: "#4A5568",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0",
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

        <Heading
          as="h2"
          style={{
            color: "#02182B",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.contentHeading}
        </Heading>

        <Section style={articleBlockStyle}>
          <Text style={articleTitleStyle}>{t.article1Title}</Text>
          <Text style={articleTextStyle}>{t.article1Text}</Text>
        </Section>

        <Section style={articleBlockStyle}>
          <Text style={articleTitleStyle}>{t.article2Title}</Text>
          <Text style={articleTextStyle}>{t.article2Text}</Text>
        </Section>

        <Section style={{ ...articleBlockStyle, borderBottom: "none", padding: "16px 0 0" }}>
          <Text style={articleTitleStyle}>{t.article3Title}</Text>
          <Text style={articleTextStyle}>{t.article3Text}</Text>
        </Section>

        <Hr style={{ borderColor: "#E2E8F0", margin: "24px 0" }} />

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.closing}
        </Text>

        <CTAButton href="https://influencecircle.be" accentColor={ACCENT}>
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
