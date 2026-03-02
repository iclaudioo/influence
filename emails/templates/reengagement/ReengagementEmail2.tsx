import { Heading, Text, Section, Hr, Link } from "@react-email/components";
import { BaseLayout } from "../../components/BaseLayout";
import { CTAButton } from "../../components/CTAButton";

interface ReengagementEmail2Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#02182B";

const content = {
  nl: {
    previewText: "Moeten we afscheid nemen? Laat ons weten wat je wilt",
    heading: "Moeten we afscheid nemen?",
    intro: (name: string) =>
      `Hoi ${name}, we sturen je al een tijdje e-mails, maar we merken dat je ze niet meer opent. Dat begrijpen we — je inbox is druk genoeg.`,
    questionText:
      "We willen je alleen berichten sturen die je waardevol vindt. Daarom vragen we het je eerlijk: wil je nog van ons horen?",
    option1Heading: "Ja, ik wil blijven!",
    option1Text:
      "Klik op de knop hieronder en je blijft onze inzichten, tips en exclusieve aanbiedingen ontvangen.",
    option2Heading: "Nee, bedankt",
    option2Text:
      "Geen hard feelings. Als je niet reageert, schrijven we je automatisch uit over 7 dagen om je inbox schoon te houden.",
    stayText:
      "Als je blijft, beloven we alleen content te sturen die echt waarde toevoegt. Kwaliteit boven kwantiteit, altijd.",
    cta: "Ja, ik wil blijven!",
    unsubscribeText: "Of ",
    unsubscribeLink: "schrijf me uit",
    greeting: "Met respect voor je inbox,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "Should we part ways? Let us know what you want",
    heading: "Should we part ways?",
    intro: (name: string) =>
      `Hi ${name}, we've been sending you emails for a while, but we notice you're no longer opening them. We get it — your inbox is busy enough.`,
    questionText:
      "We only want to send you messages you find valuable. So we're asking honestly: do you still want to hear from us?",
    option1Heading: "Yes, I want to stay!",
    option1Text:
      "Click the button below and you'll continue to receive our insights, tips, and exclusive offers.",
    option2Heading: "No, thanks",
    option2Text:
      "No hard feelings. If you don't respond, we'll automatically unsubscribe you in 7 days to keep your inbox clean.",
    stayText:
      "If you stay, we promise to only send content that truly adds value. Quality over quantity, always.",
    cta: "Yes, I want to stay!",
    unsubscribeText: "Or ",
    unsubscribeLink: "unsubscribe me",
    greeting: "With respect for your inbox,",
    team: "The Influence Circle team",
  },
};

export default function ReengagementEmail2({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: ReengagementEmail2Props) {
  const t = content[language];

  const optionBlockStyle = {
    backgroundColor: "#F8F9FA",
    padding: "20px",
    borderRadius: "6px",
    margin: "0 0 16px",
  };

  const optionTitleStyle = {
    color: "#02182B",
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const optionTextStyle = {
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
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.questionText}
        </Text>

        <Section style={optionBlockStyle}>
          <Text style={optionTitleStyle}>{t.option1Heading}</Text>
          <Text style={optionTextStyle}>{t.option1Text}</Text>
        </Section>

        <Section style={{ ...optionBlockStyle, margin: "0 0 24px" }}>
          <Text style={optionTitleStyle}>{t.option2Heading}</Text>
          <Text style={optionTextStyle}>{t.option2Text}</Text>
        </Section>

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
          {t.stayText}
        </Text>

        <CTAButton href="https://influencecircle.be/resubscribe" accentColor={ACCENT}>
          {t.cta}
        </CTAButton>

        {unsubscribeUrl && (
          <Text
            style={{
              color: "#718096",
              fontSize: "14px",
              textAlign: "center" as const,
              margin: "16px 0 0",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.unsubscribeText}
            <Link
              href={unsubscribeUrl}
              style={{ color: "#718096", textDecoration: "underline" }}
            >
              {t.unsubscribeLink}
            </Link>
          </Text>
        )}

        <Hr style={{ borderColor: "#E2E8F0", margin: "32px 0 24px" }} />

        <Text
          style={{
            color: "#4A5568",
            fontSize: "15px",
            margin: "0 0 4px",
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
