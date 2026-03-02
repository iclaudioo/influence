import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../components/BaseLayout";
import { getServiceColor, getServiceName } from "../../utils/colorTokens";
import type { ServiceLine } from "../../utils/colorTokens";

interface LeadNotificationProps {
  name: string;
  email: string;
  company?: string;
  service: ServiceLine;
  message: string;
  language?: "nl" | "en";
}

const content = {
  nl: {
    previewText: "Nieuw contactverzoek ontvangen",
    heading: "Nieuw contactverzoek",
    subtitle: "Er is een nieuw bericht binnengekomen via het contactformulier.",
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Bedrijf",
    serviceLabel: "Service",
    messageLabel: "Bericht",
    noCompany: "Niet opgegeven",
  },
  en: {
    previewText: "New contact request received",
    heading: "New Contact Request",
    subtitle: "A new message has been received through the contact form.",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    serviceLabel: "Service",
    messageLabel: "Message",
    noCompany: "Not provided",
  },
};

export default function LeadNotification({
  name = "Onbekend",
  email = "onbekend@email.com",
  company,
  service = "labs",
  message = "",
  language = "nl",
}: LeadNotificationProps) {
  const t = content[language];
  const accentColor = getServiceColor(service);
  const serviceName = getServiceName(service, language);

  const labelStyle = {
    color: "#718096",
    fontSize: "12px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    margin: "0 0 2px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const valueStyle = {
    color: "#02182B",
    fontSize: "15px",
    lineHeight: "22px",
    margin: "0 0 16px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return (
    <BaseLayout
      previewText={`${t.previewText} — ${name}`}
      accentColor={accentColor}
      language={language}
    >
      <Section style={{ padding: "32px" }}>
        <Heading
          as="h1"
          style={{
            color: "#02182B",
            fontSize: "22px",
            fontWeight: "bold",
            margin: "0 0 8px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.heading}
        </Heading>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.subtitle}
        </Text>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 24px" }} />

        <Text style={labelStyle}>{t.nameLabel}</Text>
        <Text style={valueStyle}>{name}</Text>

        <Text style={labelStyle}>{t.emailLabel}</Text>
        <Text style={valueStyle}>{email}</Text>

        <Text style={labelStyle}>{t.companyLabel}</Text>
        <Text style={valueStyle}>{company || t.noCompany}</Text>

        <Text style={labelStyle}>{t.serviceLabel}</Text>
        <Text style={{ ...valueStyle, color: accentColor, fontWeight: "bold" }}>
          {serviceName}
        </Text>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 16px" }} />

        <Text style={labelStyle}>{t.messageLabel}</Text>
        <Section
          style={{
            backgroundColor: "#F8F9FA",
            padding: "16px 20px",
            borderRadius: "6px",
            margin: "8px 0 0",
          }}
        >
          <Text
            style={{
              color: "#02182B",
              fontSize: "14px",
              lineHeight: "22px",
              margin: "0",
              whiteSpace: "pre-wrap" as const,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {message}
          </Text>
        </Section>
      </Section>
    </BaseLayout>
  );
}
