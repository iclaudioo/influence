import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../components/BaseLayout";
import { CTAButton } from "../../components/CTAButton";

interface FarewellEmailProps {
  name: string;
  language?: "nl" | "en";
}

const ACCENT = "#02182B";

const content = {
  nl: {
    previewText: "Je bent uitgeschreven — tot ziens en bedankt",
    heading: "Tot ziens en bedankt",
    intro: (name: string) =>
      `Hoi ${name}, je bent uitgeschreven van onze e-mails. We respecteren je keuze volledig.`,
    messageText:
      "We willen je bedanken voor de tijd die je met ons hebt doorgebracht. Het was een plezier om inzichten en kennis met je te delen.",
    doorOpen:
      "Mocht je ooit terugkomen, onze deur staat altijd open. Je kunt je op elk moment opnieuw inschrijven via onze website.",
    whatRemains: "Wat blijft:",
    remain1:
      "Je kunt onze website altijd bezoeken voor gratis inzichten en artikelen",
    remain2:
      "Volg ons op LinkedIn voor dagelijkse tips en updates",
    remain3:
      "Neem gerust contact op als je ooit vragen hebt — we helpen je graag",
    cta: "Bezoek onze website",
    farewell: "We wensen je het allerbeste,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "You've been unsubscribed — goodbye and thank you",
    heading: "Goodbye and thank you",
    intro: (name: string) =>
      `Hi ${name}, you've been unsubscribed from our emails. We fully respect your choice.`,
    messageText:
      "We want to thank you for the time you spent with us. It was a pleasure sharing insights and knowledge with you.",
    doorOpen:
      "Should you ever want to come back, our door is always open. You can re-subscribe at any time through our website.",
    whatRemains: "What remains:",
    remain1:
      "You can always visit our website for free insights and articles",
    remain2:
      "Follow us on LinkedIn for daily tips and updates",
    remain3:
      "Feel free to reach out if you ever have questions — we're happy to help",
    cta: "Visit our website",
    farewell: "We wish you all the best,",
    team: "The Influence Circle team",
  },
};

export default function FarewellEmail({
  name = "Gebruiker",
  language = "nl",
}: FarewellEmailProps) {
  const t = content[language];

  const remainStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px",
    paddingLeft: "12px",
    borderLeft: "3px solid #E2E8F0",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return (
    <BaseLayout
      previewText={t.previewText}
      accentColor={ACCENT}
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
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.intro(name)}
        </Text>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.messageText}
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
          {t.doorOpen}
        </Text>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 20px" }} />

        <Text
          style={{
            color: "#02182B",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.whatRemains}
        </Text>

        <Text style={remainStyle}>{t.remain1}</Text>
        <Text style={remainStyle}>{t.remain2}</Text>
        <Text style={{ ...remainStyle, margin: "0 0 24px" }}>
          {t.remain3}
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
          {t.farewell}
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
