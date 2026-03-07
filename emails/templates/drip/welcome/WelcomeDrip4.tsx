import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface WelcomeDrip4Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const content = {
  nl: {
    previewText: "Laten we kennismaken — Plan een vrijblijvend gesprek",
    heading: (name: string) => `${name}, laten we kennismaken.`,
    intro: "De afgelopen dagen heb je gezien hoe wij reputaties bouwen — van het model tot de methode. Nu is het aan jou.",
    offerIntro: "We bieden een vrijblijvend strategiegesprek aan waarin we:",
    offer1: "Uw huidige reputatiepositie analyseren",
    offer2: "De grootste kansen identificeren",
    offer3: "Een concreet eerste actieplan schetsen",
    noSales: "Geen verkooppraatje, geen verplichtingen. Enkel een eerlijk gesprek over waar u staat en waar u naartoe kunt.",
    cta: "Plan een gesprek",
    closing: "Ik kijk ernaar uit.",
    greeting: "Hartelijke groeten,",
    senderName: "Claudio Swijsen",
    senderTitle: "Founder, Influence Circle",
  },
  en: {
    previewText: "Let's get acquainted — Schedule a free consultation",
    heading: (name: string) => `${name}, let's get acquainted.`,
    intro: "Over the past few days, you've seen how we build reputations — from the model to the method. Now it's your turn.",
    offerIntro: "We offer a no-obligation strategy session where we:",
    offer1: "Analyse your current reputation position",
    offer2: "Identify the biggest opportunities",
    offer3: "Outline a concrete first action plan",
    noSales: "No sales pitch, no obligations. Just an honest conversation about where you stand and where you can go.",
    cta: "Schedule a call",
    closing: "I look forward to it.",
    greeting: "Warm regards,",
    senderName: "Claudio Swijsen",
    senderTitle: "Founder, Influence Circle",
  },
};

export default function WelcomeDrip4({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: WelcomeDrip4Props) {
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
          {t.offerIntro}
        </Text>

        <Text style={listItemStyle}>&bull; {t.offer1}</Text>
        <Text style={listItemStyle}>&bull; {t.offer2}</Text>
        <Text style={{ ...listItemStyle, margin: "0 0 24px" }}>&bull; {t.offer3}</Text>

        <Text style={textStyle}>{t.noSales}</Text>

        <CTAButton href="https://influencecircle.be/contact" accentColor={ACCENT}>
          {t.cta}
        </CTAButton>

        <Text style={{ ...textStyle, marginTop: "24px" }}>{t.closing}</Text>

        <Text style={{ color: "#4A5568", fontSize: "15px", margin: "32px 0 4px", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.greeting}
        </Text>
        <Text style={{ color: "#02182B", fontSize: "15px", fontWeight: "bold", margin: "0", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.senderName}
        </Text>
        <Text style={{ color: "#888", fontSize: "13px", margin: "2px 0 0", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.senderTitle}
        </Text>
      </Section>
    </BaseLayout>
  );
}
