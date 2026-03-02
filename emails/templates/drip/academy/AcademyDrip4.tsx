import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface AcademyDrip4Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#E8A317";

const content = {
  nl: {
    previewText: "Early-bird: Komende masterclasses met exclusieve korting",
    heading: "Komende programma's + early-bird korting",
    intro: (name: string) =>
      `Hoi ${name}, we hebben je de waarde van employee advocacy laten zien, ons programma gepresenteerd en praktische oefeningen gedeeld. Nu is het moment om in actie te komen.`,
    upcomingHeading: "Komende masterclasses",
    program1Title: "LinkedIn Masterclass — Halve dag",
    program1Date: "Maandelijks beschikbaar",
    program1Text:
      "De ideale introductie voor teams die snel aan de slag willen met LinkedIn. Profieloptimalisatie, content basics en eerste publicatie — alles in 4 intensieve uren.",
    program2Title: "Employee Advocacy Bootcamp — 2 dagen",
    program2Date: "Elk kwartaal",
    program2Text:
      "Het complete programma voor organisaties die een duurzaam advocacy programma willen opzetten. Van strategie tot implementatie, inclusief tooling en templates.",
    program3Title: "LinkedIn Leadership Programma — 6 weken",
    program3Date: "Start elke 2 maanden",
    program3Text:
      "Ons meest uitgebreide programma voor senior professionals en management teams. Wekelijkse sessies met persoonlijke coaching, content reviews en groei-tracking.",
    earlyBirdHeading: "Early-bird aanbieding",
    earlyBirdText:
      "Schrijf je deze maand in en ontvang 15% early-bird korting op elk programma. Bovendien krijg je gratis toegang tot onze exclusieve LinkedIn toolkit met templates, schrijfformules en een contentkalender.",
    earlyBirdNote:
      "Deze aanbieding is geldig voor inschrijvingen in de komende 14 dagen en voor maximaal 3 deelnemers per organisatie.",
    cta: "Schrijf je in met early-bird korting",
    ps: "P.S. Twijfel je nog? Plan een gratis oriëntatiegesprek van 20 minuten waarin we samen bekijken welk programma het beste bij jouw team past.",
    greeting: "Met ambitieuze groeten,",
    team: "Het Influence Academy team",
  },
  en: {
    previewText: "Early-bird: Upcoming masterclasses with exclusive discount",
    heading: "Upcoming programs + early-bird discount",
    intro: (name: string) =>
      `Hi ${name}, we've shown you the value of employee advocacy, presented our program, and shared practical exercises. Now is the moment to take action.`,
    upcomingHeading: "Upcoming masterclasses",
    program1Title: "LinkedIn Masterclass — Half-day",
    program1Date: "Available monthly",
    program1Text:
      "The ideal introduction for teams that want to get started with LinkedIn quickly. Profile optimization, content basics, and first publication — all in 4 intensive hours.",
    program2Title: "Employee Advocacy Bootcamp — 2 days",
    program2Date: "Every quarter",
    program2Text:
      "The complete program for organizations that want to set up a sustainable advocacy program. From strategy to implementation, including tooling and templates.",
    program3Title: "LinkedIn Leadership Program — 6 weeks",
    program3Date: "Starts every 2 months",
    program3Text:
      "Our most comprehensive program for senior professionals and management teams. Weekly sessions with personal coaching, content reviews, and growth tracking.",
    earlyBirdHeading: "Early-bird offer",
    earlyBirdText:
      "Sign up this month and receive a 15% early-bird discount on any program. Plus, get free access to our exclusive LinkedIn toolkit with templates, writing formulas, and a content calendar.",
    earlyBirdNote:
      "This offer is valid for registrations in the next 14 days and for a maximum of 3 participants per organization.",
    cta: "Sign up with early-bird discount",
    ps: "P.S. Still unsure? Schedule a free 20-minute orientation call where we'll explore which program best fits your team.",
    greeting: "With ambitious regards,",
    team: "The Influence Academy team",
  },
};

export default function AcademyDrip4({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: AcademyDrip4Props) {
  const t = content[language];

  const programBlockStyle = {
    backgroundColor: "#FFFBEB",
    padding: "20px",
    borderRadius: "6px",
    margin: "0 0 12px",
  };

  const programTitleStyle = {
    color: ACCENT,
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 2px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const programDateStyle = {
    color: "#718096",
    fontSize: "12px",
    margin: "0 0 8px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const programTextStyle = {
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
            margin: "0 0 16px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.upcomingHeading}
        </Heading>

        <Section style={programBlockStyle}>
          <Text style={programTitleStyle}>{t.program1Title}</Text>
          <Text style={programDateStyle}>{t.program1Date}</Text>
          <Text style={programTextStyle}>{t.program1Text}</Text>
        </Section>

        <Section style={programBlockStyle}>
          <Text style={programTitleStyle}>{t.program2Title}</Text>
          <Text style={programDateStyle}>{t.program2Date}</Text>
          <Text style={programTextStyle}>{t.program2Text}</Text>
        </Section>

        <Section style={{ ...programBlockStyle, margin: "0 0 24px" }}>
          <Text style={programTitleStyle}>{t.program3Title}</Text>
          <Text style={programDateStyle}>{t.program3Date}</Text>
          <Text style={programTextStyle}>{t.program3Text}</Text>
        </Section>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 24px" }} />

        <Section
          style={{
            backgroundColor: "#FEF3C7",
            padding: "24px",
            borderRadius: "8px",
            borderLeft: `4px solid ${ACCENT}`,
            margin: "0 0 24px",
          }}
        >
          <Heading
            as="h2"
            style={{
              color: ACCENT,
              fontSize: "18px",
              fontWeight: "bold",
              margin: "0 0 8px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.earlyBirdHeading}
          </Heading>

          <Text
            style={{
              color: "#02182B",
              fontSize: "15px",
              lineHeight: "24px",
              margin: "0 0 8px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.earlyBirdText}
          </Text>

          <Text
            style={{
              color: "#4A5568",
              fontSize: "13px",
              fontStyle: "italic",
              margin: "0",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.earlyBirdNote}
          </Text>
        </Section>

        <CTAButton href="https://influencecircle.be/academy#inschrijven" accentColor={ACCENT}>
          {t.cta}
        </CTAButton>

        <Text
          style={{
            color: ACCENT,
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: "bold",
            margin: "24px 0 0",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.ps}
        </Text>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "15px",
            margin: "24px 0 4px",
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
