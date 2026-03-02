import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../components/BaseLayout";
import { CTAButton } from "../../components/CTAButton";
import { getServiceColor, getServiceName } from "../../utils/colorTokens";
import type { ServiceLine } from "../../utils/colorTokens";

interface WelcomeEmailProps {
  name: string;
  service: ServiceLine;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const content = {
  nl: {
    previewText: "Welkom bij Influence Circle — Samen bouwen aan jouw invloed",
    heading: (name: string) => `Welkom, ${name}!`,
    intro:
      "Geweldig dat je deel uitmaakt van de Influence Circle community. We helpen ambitieuze professionals en bedrijven om hun online invloed te vergroten en echte resultaten te behalen.",
    ecosystemHeading: "Het Influence ecosysteem",
    ecosystemIntro:
      "Influence Circle bestaat uit vier gespecialiseerde pijlers, elk gericht op een cruciaal aspect van digitale groei:",
    labs: "Influence Labs — Datagedreven groeistrategieën en performance marketing die meetbare resultaten opleveren.",
    circle:
      "Influence Circle — Personal branding en thought leadership programma's die jouw zichtbaarheid vergroten.",
    studio:
      "Influence Studio — Professionele content creatie die jouw verhaal tot leven brengt.",
    academy:
      "Influence Academy — Trainingen en masterclasses die teams transformeren tot LinkedIn-experts.",
    nextSteps:
      "Op basis van je interesse houden we je op de hoogte van relevante inzichten, tips en kansen. Houd je inbox in de gaten!",
    cta: "Ontdek meer op onze website",
    greeting: "Tot snel,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText:
      "Welcome to Influence Circle — Let's build your influence together",
    heading: (name: string) => `Welcome, ${name}!`,
    intro:
      "Great to have you as part of the Influence Circle community. We help ambitious professionals and companies grow their online influence and achieve real results.",
    ecosystemHeading: "The Influence ecosystem",
    ecosystemIntro:
      "Influence Circle consists of four specialized pillars, each focused on a crucial aspect of digital growth:",
    labs: "Influence Labs — Data-driven growth strategies and performance marketing that deliver measurable results.",
    circle:
      "Influence Circle — Personal branding and thought leadership programs that amplify your visibility.",
    studio:
      "Influence Studio — Professional content creation that brings your story to life.",
    academy:
      "Influence Academy — Training and masterclasses that transform teams into LinkedIn experts.",
    nextSteps:
      "Based on your interest, we'll keep you updated with relevant insights, tips, and opportunities. Keep an eye on your inbox!",
    cta: "Discover more on our website",
    greeting: "See you soon,",
    team: "The Influence Circle team",
  },
};

export default function WelcomeEmail({
  name = "Gebruiker",
  service = "labs",
  language = "nl",
  unsubscribeUrl,
}: WelcomeEmailProps) {
  const t = content[language];
  const accentColor = getServiceColor(service);

  const pillarStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 12px",
    paddingLeft: "12px",
    borderLeft: "3px solid #E2E8F0",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  return (
    <BaseLayout
      previewText={t.previewText}
      accentColor={accentColor}
      unsubscribeUrl={unsubscribeUrl}
      language={language}
    >
      <Section style={{ padding: "32px" }}>
        <Heading
          as="h1"
          style={{
            color: "#02182B",
            fontSize: "26px",
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
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.intro}
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
          {t.ecosystemHeading}
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
          {t.ecosystemIntro}
        </Text>

        <Text style={{ ...pillarStyle, borderLeftColor: "#d55d25" }}>
          {t.labs}
        </Text>
        <Text style={{ ...pillarStyle, borderLeftColor: "#D7263D" }}>
          {t.circle}
        </Text>
        <Text style={{ ...pillarStyle, borderLeftColor: "#A855F7" }}>
          {t.studio}
        </Text>
        <Text style={{ ...pillarStyle, borderLeftColor: "#E8A317" }}>
          {t.academy}
        </Text>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "16px 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.nextSteps}
        </Text>

        <CTAButton
          href="https://influencecircle.be"
          accentColor={accentColor}
        >
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
