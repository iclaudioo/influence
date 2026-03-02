import { Section, Text, Link, Hr } from "@react-email/components";

interface FooterProps {
  unsubscribeUrl?: string;
  language?: "nl" | "en";
}

const copy = {
  nl: {
    company: "Influence Circle | Antwerpen, België",
    privacy: "Privacybeleid",
    unsubscribe: "Uitschrijven",
    rights: "Alle rechten voorbehouden.",
  },
  en: {
    company: "Influence Circle | Antwerpen, België",
    privacy: "Privacy Policy",
    unsubscribe: "Unsubscribe",
    rights: "All rights reserved.",
  },
};

export function Footer({ unsubscribeUrl, language = "nl" }: FooterProps) {
  const t = copy[language];

  return (
    <Section style={{ padding: "32px 32px 40px" }}>
      <Hr
        style={{
          borderColor: "#E2E8F0",
          margin: "0 0 24px",
        }}
      />

      <Text
        style={{
          color: "#718096",
          fontSize: "13px",
          lineHeight: "20px",
          margin: "0 0 8px",
          textAlign: "center" as const,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {t.company}
      </Text>

      <Text
        style={{
          color: "#718096",
          fontSize: "13px",
          lineHeight: "20px",
          margin: "0 0 8px",
          textAlign: "center" as const,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        &copy; {new Date().getFullYear()} Influence Circle. {t.rights}
      </Text>

      <Text
        style={{
          color: "#718096",
          fontSize: "13px",
          lineHeight: "20px",
          margin: "0",
          textAlign: "center" as const,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <Link
          href="https://influencecircle.be/privacy"
          style={{ color: "#718096", textDecoration: "underline" }}
        >
          {t.privacy}
        </Link>
        {unsubscribeUrl && (
          <>
            {" | "}
            <Link
              href={unsubscribeUrl}
              style={{ color: "#718096", textDecoration: "underline" }}
            >
              {t.unsubscribe}
            </Link>
          </>
        )}
      </Text>
    </Section>
  );
}
