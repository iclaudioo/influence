import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface AcademyDrip1Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#E8A317";

const content = {
  nl: {
    previewText: "Waarom employee advocacy de krachtigste groeimotor is",
    heading: "De kracht van employee advocacy",
    intro: (name: string) =>
      `Hoi ${name}, welkom bij Influence Academy! Vandaag duiken we in het onderwerp dat steeds meer bedrijven transformeert: employee advocacy.`,
    conceptHeading: "Waarom employee advocacy?",
    conceptText:
      "De statistieken spreken voor zich: content gedeeld door medewerkers krijgt 8x meer engagement dan content via bedrijfspagina's. Toch benut minder dan 15% van alle bedrijven dit potentieel.",
    stat1Title: "8x meer engagement",
    stat1Text:
      "Berichten van medewerkers worden als authentieker ervaren en genereren significant meer interactie dan corporate communicatie.",
    stat2Title: "561% meer bereik",
    stat2Text:
      "Het gecombineerde netwerk van medewerkers is gemiddeld 10x groter dan het bedrijfsnetwerk. Employee advocacy vergroot je bereik exponentieel.",
    stat3Title: "25% meer leads",
    stat3Text:
      "Bedrijven met een actief employee advocacy programma genereren tot 25% meer kwalitatieve leads via sociale kanalen.",
    stat4Title: "+40% employer branding",
    stat4Text:
      "Medewerkers die actief zijn op LinkedIn versterken niet alleen sales, maar ook het werkgeversmerk — cruciaal in de war for talent.",
    closing:
      "Employee advocacy is geen trend, het is de toekomst van B2B marketing. In onze volgende e-mail nemen we je mee in hoe onze masterclasses dit tot leven brengen.",
    cta: "Ontdek Influence Academy",
    greeting: "Met leergierige groeten,",
    team: "Het Influence Academy team",
  },
  en: {
    previewText: "Why employee advocacy is the most powerful growth engine",
    heading: "The power of employee advocacy",
    intro: (name: string) =>
      `Hi ${name}, welcome to Influence Academy! Today we dive into the topic that's transforming more and more companies: employee advocacy.`,
    conceptHeading: "Why employee advocacy?",
    conceptText:
      "The statistics speak for themselves: content shared by employees receives 8x more engagement than content via company pages. Yet fewer than 15% of all companies leverage this potential.",
    stat1Title: "8x more engagement",
    stat1Text:
      "Posts from employees are perceived as more authentic and generate significantly more interaction than corporate communications.",
    stat2Title: "561% more reach",
    stat2Text:
      "The combined network of employees is on average 10x larger than the company network. Employee advocacy multiplies your reach exponentially.",
    stat3Title: "25% more leads",
    stat3Text:
      "Companies with an active employee advocacy program generate up to 25% more qualified leads through social channels.",
    stat4Title: "+40% employer branding",
    stat4Text:
      "Employees who are active on LinkedIn strengthen not only sales but also the employer brand — crucial in the war for talent.",
    closing:
      "Employee advocacy is not a trend, it's the future of B2B marketing. In our next email, we'll show you how our masterclasses bring this to life.",
    cta: "Discover Influence Academy",
    greeting: "With eager regards,",
    team: "The Influence Academy team",
  },
};

export default function AcademyDrip1({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: AcademyDrip1Props) {
  const t = content[language];

  const statBlockStyle = {
    backgroundColor: "#FFFBEB",
    padding: "16px 20px",
    borderRadius: "6px",
    margin: "0 0 12px",
  };

  const statTitleStyle = {
    color: ACCENT,
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const statTextStyle = {
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
            color: "#4A5568",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 20px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.conceptText}
        </Text>

        <Section style={statBlockStyle}>
          <Text style={statTitleStyle}>{t.stat1Title}</Text>
          <Text style={statTextStyle}>{t.stat1Text}</Text>
        </Section>

        <Section style={statBlockStyle}>
          <Text style={statTitleStyle}>{t.stat2Title}</Text>
          <Text style={statTextStyle}>{t.stat2Text}</Text>
        </Section>

        <Section style={statBlockStyle}>
          <Text style={statTitleStyle}>{t.stat3Title}</Text>
          <Text style={statTextStyle}>{t.stat3Text}</Text>
        </Section>

        <Section style={{ ...statBlockStyle, margin: "0 0 24px" }}>
          <Text style={statTitleStyle}>{t.stat4Title}</Text>
          <Text style={statTextStyle}>{t.stat4Text}</Text>
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

        <CTAButton href="https://influencecircle.be/academy" accentColor={ACCENT}>
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
