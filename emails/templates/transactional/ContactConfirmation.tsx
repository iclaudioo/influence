import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../components/BaseLayout";
import { CTAButton } from "../../components/CTAButton";
import { getServiceColor, getServiceName } from "../../utils/colorTokens";
import type { ServiceLine } from "../../utils/colorTokens";

interface ContactConfirmationProps {
  name: string;
  service: ServiceLine;
  language?: "nl" | "en";
}

const content = {
  nl: {
    previewText: "Bedankt voor je bericht — we nemen snel contact op",
    heading: (name: string) => `Bedankt, ${name}!`,
    received: "We hebben je bericht goed ontvangen.",
    serviceLabel: "Je interesse:",
    responseTime:
      "Ons team bekijkt je aanvraag en neemt binnen 24 uur contact met je op. We kijken ernaar uit om samen te werken!",
    cta: "Bezoek onze website",
    greeting: "Met vriendelijke groeten,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "Thanks for your message — we'll be in touch soon",
    heading: (name: string) => `Thank you, ${name}!`,
    received: "We have successfully received your message.",
    serviceLabel: "Your interest:",
    responseTime:
      "Our team will review your request and get back to you within 24 hours. We look forward to working together!",
    cta: "Visit our website",
    greeting: "Kind regards,",
    team: "The Influence Circle team",
  },
};

export default function ContactConfirmation({
  name = "Gebruiker",
  service = "labs",
  language = "nl",
}: ContactConfirmationProps) {
  const t = content[language];
  const accentColor = getServiceColor(service);
  const serviceName = getServiceName(service, language);

  return (
    <BaseLayout
      previewText={t.previewText}
      accentColor={accentColor}
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
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.received}
        </Text>

        <Section
          style={{
            backgroundColor: "#F8F9FA",
            padding: "16px 20px",
            borderRadius: "6px",
            borderLeft: `4px solid ${accentColor}`,
            margin: "0 0 24px",
          }}
        >
          <Text
            style={{
              color: "#4A5568",
              fontSize: "13px",
              margin: "0 0 4px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.serviceLabel}
          </Text>
          <Text
            style={{
              color: "#02182B",
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {serviceName}
          </Text>
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
          {t.responseTime}
        </Text>

        <CTAButton href="https://influencecircle.be" accentColor={accentColor}>
          {t.cta}
        </CTAButton>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "15px",
            lineHeight: "24px",
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
