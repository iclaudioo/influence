import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface LabsDrip2Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const content = {
  nl: {
    previewText: "Case study: Hoe een B2B-bedrijf 3x meer leads genereerde",
    heading: "Van stagnatie naar 3x meer leads",
    intro: (name: string) =>
      `Hoi ${name}, eerder deelden we de 3 grootste groeibarrières. Vandaag laten we zien hoe een klant deze barrières doorbrak en opmerkelijke resultaten behaalde.`,
    caseHeading: "De situatie",
    caseText:
      "Een middelgroot B2B-technologiebedrijf investeerde maandelijks flink in digitale marketing, maar zag amper resultaat. De leads waren van lage kwaliteit en het salesteam had moeite om afspraken in te plannen.",
    approachHeading: "Onze aanpak",
    approach1: "Volledige audit van alle digitale kanalen en datastromen",
    approach2:
      "Implementatie van een unified tracking-systeem met duidelijke KPI's",
    approach3:
      "Herstructurering van de campagnestrategie op basis van data-inzichten",
    approach4: "A/B testing framework voor continue optimalisatie",
    resultsHeading: "De resultaten na 90 dagen",
    result1: "+210% meer gekwalificeerde leads",
    result2: "-35% kosten per acquisitie",
    result3: "+180% meer demo-aanvragen",
    result4: "ROI van 5.2x op de marketinginvestering",
    closing:
      "Dit is geen uitzondering — het is wat er mogelijk is wanneer strategie en data samenkomen. Benieuwd wat dit voor jouw bedrijf kan betekenen?",
    cta: "Plan een gratis strategiegesprek",
    greeting: "Data-driven groeten,",
    team: "Het Influence Labs team",
  },
  en: {
    previewText: "Case study: How a B2B company generated 3x more leads",
    heading: "From stagnation to 3x more leads",
    intro: (name: string) =>
      `Hi ${name}, earlier we shared the 3 biggest growth barriers. Today we show how a client broke through these barriers and achieved remarkable results.`,
    caseHeading: "The situation",
    caseText:
      "A mid-sized B2B technology company was investing heavily in digital marketing every month, but barely seeing results. Lead quality was low and the sales team struggled to book meetings.",
    approachHeading: "Our approach",
    approach1: "Full audit of all digital channels and data flows",
    approach2:
      "Implementation of a unified tracking system with clear KPIs",
    approach3:
      "Restructuring of the campaign strategy based on data insights",
    approach4: "A/B testing framework for continuous optimization",
    resultsHeading: "The results after 90 days",
    result1: "+210% more qualified leads",
    result2: "-35% cost per acquisition",
    result3: "+180% more demo requests",
    result4: "5.2x ROI on marketing investment",
    closing:
      "This is not an exception — it's what's possible when strategy and data come together. Curious what this could mean for your company?",
    cta: "Schedule a free strategy call",
    greeting: "Data-driven regards,",
    team: "The Influence Labs team",
  },
};

export default function LabsDrip2({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: LabsDrip2Props) {
  const t = content[language];

  const bulletStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px",
    paddingLeft: "12px",
    borderLeft: `3px solid ${ACCENT}`,
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const resultStyle = {
    color: ACCENT,
    fontSize: "15px",
    fontWeight: "bold" as const,
    lineHeight: "24px",
    margin: "0 0 8px",
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
          {t.heading}
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
          {t.intro(name)}
        </Text>

        <Heading
          as="h2"
          style={{
            color: "#02182B",
            fontSize: "17px",
            fontWeight: "bold",
            margin: "0 0 8px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.caseHeading}
        </Heading>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "14px",
            lineHeight: "22px",
            margin: "0 0 20px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.caseText}
        </Text>

        <Heading
          as="h2"
          style={{
            color: "#02182B",
            fontSize: "17px",
            fontWeight: "bold",
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.approachHeading}
        </Heading>

        <Text style={bulletStyle}>{t.approach1}</Text>
        <Text style={bulletStyle}>{t.approach2}</Text>
        <Text style={bulletStyle}>{t.approach3}</Text>
        <Text style={{ ...bulletStyle, margin: "0 0 20px" }}>
          {t.approach4}
        </Text>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 20px" }} />

        <Heading
          as="h2"
          style={{
            color: "#02182B",
            fontSize: "17px",
            fontWeight: "bold",
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.resultsHeading}
        </Heading>

        <Text style={resultStyle}>{t.result1}</Text>
        <Text style={resultStyle}>{t.result2}</Text>
        <Text style={resultStyle}>{t.result3}</Text>
        <Text style={{ ...resultStyle, margin: "0 0 20px" }}>
          {t.result4}
        </Text>

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

        <CTAButton href="https://influencecircle.be/labs#contact" accentColor={ACCENT}>
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
