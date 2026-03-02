import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface LabsDrip1Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const content = {
  nl: {
    previewText: "De 3 grootste groeibarrières die bedrijven tegenhouden",
    heading: (name: string) => `${name}, herken jij deze groeibarrières?`,
    intro:
      "Welkom bij Influence Labs! We helpen bedrijven om datagedreven te groeien. Maar voordat we het over oplossingen hebben, laten we eerst kijken naar wat de meeste bedrijven tegenhoudt.",
    barriersHeading: "De 3 grootste groeibarrières",
    barrier1Title: "1. Geen duidelijke data-strategie",
    barrier1Text:
      "Veel bedrijven verzamelen data, maar weten niet hoe ze die moeten inzetten. Zonder een helder framework blijven campagnes gebaseerd op onderbuikgevoel in plaats van bewezen inzichten.",
    barrier2Title: "2. Versnipperde marketingkanalen",
    barrier2Text:
      "Social media, SEA, e-mail, content... Wanneer elk kanaal apart wordt beheerd, mis je de synergie die exponentiële groei mogelijk maakt.",
    barrier3Title: "3. Focus op vanity metrics",
    barrier3Text:
      "Likes en volgers zijn leuk, maar genereren ze daadwerkelijk leads en omzet? De shift van bereik naar rendement is waar echte groei begint.",
    nextSteps:
      "In de komende dagen delen we concrete strategieën om deze barrières te doorbreken. Stay tuned!",
    cta: "Ontdek Influence Labs",
    greeting: "Groeigerichte groeten,",
    team: "Het Influence Labs team",
  },
  en: {
    previewText: "The 3 biggest growth barriers holding companies back",
    heading: (name: string) => `${name}, do you recognize these growth barriers?`,
    intro:
      "Welcome to Influence Labs! We help companies grow through data-driven strategies. But before we talk solutions, let's first look at what holds most companies back.",
    barriersHeading: "The 3 biggest growth barriers",
    barrier1Title: "1. No clear data strategy",
    barrier1Text:
      "Many companies collect data but don't know how to leverage it. Without a clear framework, campaigns remain based on gut feeling instead of proven insights.",
    barrier2Title: "2. Fragmented marketing channels",
    barrier2Text:
      "Social media, SEA, email, content... When each channel is managed separately, you miss the synergy that enables exponential growth.",
    barrier3Title: "3. Focus on vanity metrics",
    barrier3Text:
      "Likes and followers are nice, but do they actually generate leads and revenue? The shift from reach to ROI is where real growth begins.",
    nextSteps:
      "Over the coming days, we'll share concrete strategies to break through these barriers. Stay tuned!",
    cta: "Discover Influence Labs",
    greeting: "Growth-focused regards,",
    team: "The Influence Labs team",
  },
};

export default function LabsDrip1({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: LabsDrip1Props) {
  const t = content[language];

  const barrierTitleStyle = {
    color: ACCENT,
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const barrierTextStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 20px",
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
          {t.barriersHeading}
        </Heading>

        <Text style={barrierTitleStyle}>{t.barrier1Title}</Text>
        <Text style={barrierTextStyle}>{t.barrier1Text}</Text>

        <Text style={barrierTitleStyle}>{t.barrier2Title}</Text>
        <Text style={barrierTextStyle}>{t.barrier2Text}</Text>

        <Text style={barrierTitleStyle}>{t.barrier3Title}</Text>
        <Text style={barrierTextStyle}>{t.barrier3Text}</Text>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.nextSteps}
        </Text>

        <CTAButton href="https://influencecircle.be/labs" accentColor={ACCENT}>
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
