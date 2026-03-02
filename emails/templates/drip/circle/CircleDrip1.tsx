import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface CircleDrip1Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#D7263D";

const content = {
  nl: {
    previewText: "Het Mirror Exposure Effect: waarom zichtbaarheid alles is",
    heading: "Het Mirror Exposure Effect",
    intro: (name: string) =>
      `Hoi ${name}, welkom bij Influence Circle! Vandaag introduceren we een concept dat de kern vormt van alles wat we doen: het Mirror Exposure Effect.`,
    conceptHeading: "Wat is het Mirror Exposure Effect?",
    conceptText1:
      "Psychologisch onderzoek toont aan dat mensen een voorkeur ontwikkelen voor dingen — en mensen — die ze vaker zien. Dit heet het Mere Exposure Effect. Maar bij personal branding gaat het verder.",
    conceptText2:
      "Het Mirror Exposure Effect combineert herhaalde zichtbaarheid met herkenning. Wanneer jouw publiek zichzelf herkent in jouw verhaal, ontstaat er een diepere connectie dan bij gewone naamsbekendheid.",
    pillar1Title: "Zichtbaarheid",
    pillar1Text:
      "Consequent aanwezig zijn op de platforms waar jouw doelgroep actief is. Niet eenmalig, maar structureel.",
    pillar2Title: "Herkenbaarheid",
    pillar2Text:
      "Content creëren die resonieert. Verhalen delen waar jouw publiek zich in herkent.",
    pillar3Title: "Vertrouwen",
    pillar3Text:
      "Door consistent waarde te bieden, bouw je het vertrouwen op dat nodig is voor zakelijke relaties.",
    closing:
      "In de komende e-mails duiken we dieper in hoe je dit effect kunt inzetten voor jouw personal brand. Benieuwd naar meer?",
    cta: "Ontdek Influence Circle",
    greeting: "Met inspirerende groeten,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "The Mirror Exposure Effect: why visibility is everything",
    heading: "The Mirror Exposure Effect",
    intro: (name: string) =>
      `Hi ${name}, welcome to Influence Circle! Today we introduce a concept that forms the core of everything we do: the Mirror Exposure Effect.`,
    conceptHeading: "What is the Mirror Exposure Effect?",
    conceptText1:
      "Psychological research shows that people develop a preference for things — and people — they see more often. This is called the Mere Exposure Effect. But with personal branding, it goes further.",
    conceptText2:
      "The Mirror Exposure Effect combines repeated visibility with recognition. When your audience sees themselves reflected in your story, a deeper connection emerges than with mere name recognition.",
    pillar1Title: "Visibility",
    pillar1Text:
      "Being consistently present on the platforms where your target audience is active. Not once, but structurally.",
    pillar2Title: "Recognition",
    pillar2Text:
      "Creating content that resonates. Sharing stories that your audience can identify with.",
    pillar3Title: "Trust",
    pillar3Text:
      "By consistently providing value, you build the trust needed for business relationships.",
    closing:
      "In the coming emails, we'll dive deeper into how you can leverage this effect for your personal brand. Curious to learn more?",
    cta: "Discover Influence Circle",
    greeting: "With inspiring regards,",
    team: "The Influence Circle team",
  },
};

export default function CircleDrip1({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: CircleDrip1Props) {
  const t = content[language];

  const pillarStyle = {
    backgroundColor: "#FFF5F5",
    padding: "16px 20px",
    borderRadius: "6px",
    margin: "0 0 12px",
  };

  const pillarTitleStyle = {
    color: ACCENT,
    fontSize: "15px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const pillarTextStyle = {
    color: "#02182B",
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
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0 0 8px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.conceptHeading}
        </Heading>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.conceptText1}
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
          {t.conceptText2}
        </Text>

        <Section style={pillarStyle}>
          <Text style={pillarTitleStyle}>{t.pillar1Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar1Text}</Text>
        </Section>

        <Section style={pillarStyle}>
          <Text style={pillarTitleStyle}>{t.pillar2Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar2Text}</Text>
        </Section>

        <Section style={{ ...pillarStyle, margin: "0 0 24px" }}>
          <Text style={pillarTitleStyle}>{t.pillar3Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar3Text}</Text>
        </Section>

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

        <CTAButton href="https://influencecircle.be/circle" accentColor={ACCENT}>
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
