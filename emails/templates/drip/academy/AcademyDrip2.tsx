import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface AcademyDrip2Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#E8A317";

const content = {
  nl: {
    previewText: "Onze masterclasses: Van theorie naar LinkedIn-impact",
    heading: "Masterclasses die teams transformeren",
    intro: (name: string) =>
      `Hoi ${name}, eerder deelden we de kracht van employee advocacy. Vandaag laten we je zien hoe onze masterclasses dit in de praktijk brengen.`,
    overviewHeading: "Het Influence Academy programma",
    overviewText:
      "Onze masterclasses zijn geen standaard trainingen. Ze zijn interactief, praktijkgericht en afgestemd op jouw organisatie. Elk programma combineert strategie met directe implementatie.",
    module1Title: "Module 1: LinkedIn Fundament",
    module1Text:
      "Profieloptimalisatie, netwerken strategie en het begrijpen van het LinkedIn-algoritme. Elke deelnemer gaat naar huis met een volledig geoptimaliseerd profiel.",
    module2Title: "Module 2: Content Creatie",
    module2Text:
      "Van blanco pagina naar publicatie. Schrijftechnieken, content formats en een persoonlijk contentplan voor de komende 30 dagen.",
    module3Title: "Module 3: Engagement & Groei",
    module3Text:
      "Community building, slimme engagement-strategieën en het opbouwen van een netwerk dat zakelijke kansen genereert.",
    module4Title: "Module 4: Employee Advocacy Programma",
    module4Text:
      "Het opzetten van een duurzaam programma binnen je organisatie. Van intern draagvlak tot meetbare resultaten.",
    formatHeading: "Flexibele formats",
    format1: "Halve dag workshop (4 uur) — Intensieve deep-dive in één module",
    format2: "Volledige dag training (8 uur) — Twee modules met hands-on oefeningen",
    format3: "6-weeks programma — Alle modules met wekelijkse coaching",
    format4: "Op maat — Programma aangepast aan jouw specifieke behoeften",
    closing:
      "Elke masterclass wordt gegeven door ervaren LinkedIn-experts met een bewezen track record. Benieuwd naar de mogelijkheden voor jouw team?",
    cta: "Bekijk het volledige aanbod",
    greeting: "Met educatieve groeten,",
    team: "Het Influence Academy team",
  },
  en: {
    previewText: "Our masterclasses: From theory to LinkedIn impact",
    heading: "Masterclasses that transform teams",
    intro: (name: string) =>
      `Hi ${name}, earlier we shared the power of employee advocacy. Today we show you how our masterclasses put this into practice.`,
    overviewHeading: "The Influence Academy program",
    overviewText:
      "Our masterclasses are not standard trainings. They are interactive, practice-oriented, and tailored to your organization. Each program combines strategy with direct implementation.",
    module1Title: "Module 1: LinkedIn Foundation",
    module1Text:
      "Profile optimization, networking strategy, and understanding the LinkedIn algorithm. Each participant leaves with a fully optimized profile.",
    module2Title: "Module 2: Content Creation",
    module2Text:
      "From blank page to publication. Writing techniques, content formats, and a personal content plan for the next 30 days.",
    module3Title: "Module 3: Engagement & Growth",
    module3Text:
      "Community building, smart engagement strategies, and building a network that generates business opportunities.",
    module4Title: "Module 4: Employee Advocacy Program",
    module4Text:
      "Setting up a sustainable program within your organization. From internal buy-in to measurable results.",
    formatHeading: "Flexible formats",
    format1: "Half-day workshop (4 hours) — Intensive deep-dive into one module",
    format2: "Full-day training (8 hours) — Two modules with hands-on exercises",
    format3: "6-week program — All modules with weekly coaching",
    format4: "Custom — Program adapted to your specific needs",
    closing:
      "Every masterclass is delivered by experienced LinkedIn experts with a proven track record. Curious about the possibilities for your team?",
    cta: "View the full program",
    greeting: "With educational regards,",
    team: "The Influence Academy team",
  },
};

export default function AcademyDrip2({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: AcademyDrip2Props) {
  const t = content[language];

  const moduleBlockStyle = {
    backgroundColor: "#FFFBEB",
    padding: "16px 20px",
    borderRadius: "6px",
    margin: "0 0 12px",
  };

  const moduleTitleStyle = {
    color: ACCENT,
    fontSize: "15px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const moduleTextStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const formatStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px",
    paddingLeft: "12px",
    borderLeft: `3px solid ${ACCENT}`,
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
          {t.overviewHeading}
        </Heading>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.overviewText}
        </Text>

        <Section style={moduleBlockStyle}>
          <Text style={moduleTitleStyle}>{t.module1Title}</Text>
          <Text style={moduleTextStyle}>{t.module1Text}</Text>
        </Section>

        <Section style={moduleBlockStyle}>
          <Text style={moduleTitleStyle}>{t.module2Title}</Text>
          <Text style={moduleTextStyle}>{t.module2Text}</Text>
        </Section>

        <Section style={moduleBlockStyle}>
          <Text style={moduleTitleStyle}>{t.module3Title}</Text>
          <Text style={moduleTextStyle}>{t.module3Text}</Text>
        </Section>

        <Section style={{ ...moduleBlockStyle, margin: "0 0 24px" }}>
          <Text style={moduleTitleStyle}>{t.module4Title}</Text>
          <Text style={moduleTextStyle}>{t.module4Text}</Text>
        </Section>

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
          {t.formatHeading}
        </Heading>

        <Text style={formatStyle}>{t.format1}</Text>
        <Text style={formatStyle}>{t.format2}</Text>
        <Text style={formatStyle}>{t.format3}</Text>
        <Text style={{ ...formatStyle, margin: "0 0 24px" }}>
          {t.format4}
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

        <CTAButton href="https://influencecircle.be/academy#programma" accentColor={ACCENT}>
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
