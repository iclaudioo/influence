import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface StudioDrip2Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#A855F7";

const content = {
  nl: {
    previewText: "Het content framework dat topmerken gebruiken",
    heading: "Het content framework voor groei",
    intro: (name: string) =>
      `Hoi ${name}, eerder deelden we ons portfolio. Vandaag onthullen we het framework dat achter al onze succesvolle projecten zit.`,
    frameworkHeading: "Het 4C Content Framework",
    frameworkIntro:
      "Elk stuk content dat we creëren volgt dit bewezen framework. Het verschil tussen content die presteert en content die verdwijnt in de ruis.",
    step1Title: "1. Context — Ken je publiek",
    step1Text:
      "Voordat je één woord schrijft of één frame filmt, moet je begrijpen wie je aanspreekt. Wat zijn hun pijnpunten? Welke taal spreken ze? Waar bevinden ze zich in hun klantreis?",
    step2Title: "2. Concept — Maak het onvergetelijk",
    step2Text:
      "Een sterk concept is het verschil tussen scrollen en stoppen. Werk met hooks, verrassende invalshoeken en formaten die de aandacht vasthouden.",
    step3Title: "3. Craft — Maak het professioneel",
    step3Text:
      "Kwaliteit is niet onderhandelbaar. Van lichtinval tot kleurgebruik, van schrijfstijl tot timing — elk detail telt in de perceptie van jouw merk.",
    step4Title: "4. Conversion — Stuur naar actie",
    step4Text:
      "Goede content inspireert, maar geweldige content zet aan tot actie. Elke creatie heeft een doel en een duidelijke volgende stap voor je publiek.",
    closing:
      "Dit framework is de basis van alles wat we bij Influence Studio doen. Benieuwd hoe we het voor jou kunnen toepassen?",
    cta: "Bespreek jouw content strategie",
    greeting: "Met strategische creativiteit,",
    team: "Het Influence Studio team",
  },
  en: {
    previewText: "The content framework top brands use",
    heading: "The content framework for growth",
    intro: (name: string) =>
      `Hi ${name}, earlier we shared our portfolio. Today we reveal the framework behind all our successful projects.`,
    frameworkHeading: "The 4C Content Framework",
    frameworkIntro:
      "Every piece of content we create follows this proven framework. The difference between content that performs and content that disappears in the noise.",
    step1Title: "1. Context — Know your audience",
    step1Text:
      "Before you write one word or film one frame, you need to understand who you're addressing. What are their pain points? What language do they speak? Where are they in their customer journey?",
    step2Title: "2. Concept — Make it unforgettable",
    step2Text:
      "A strong concept is the difference between scrolling and stopping. Work with hooks, surprising angles, and formats that hold attention.",
    step3Title: "3. Craft — Make it professional",
    step3Text:
      "Quality is non-negotiable. From lighting to color usage, from writing style to timing — every detail counts in the perception of your brand.",
    step4Title: "4. Conversion — Drive to action",
    step4Text:
      "Good content inspires, but great content drives action. Every creation has a purpose and a clear next step for your audience.",
    closing:
      "This framework is the foundation of everything we do at Influence Studio. Curious how we can apply it for you?",
    cta: "Discuss your content strategy",
    greeting: "With strategic creativity,",
    team: "The Influence Studio team",
  },
};

export default function StudioDrip2({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: StudioDrip2Props) {
  const t = content[language];

  const stepBlockStyle = {
    backgroundColor: "#FAF5FF",
    padding: "20px",
    borderRadius: "6px",
    margin: "0 0 12px",
  };

  const stepTitleStyle = {
    color: ACCENT,
    fontSize: "15px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const stepTextStyle = {
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
          {t.frameworkHeading}
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
          {t.frameworkIntro}
        </Text>

        <Section style={stepBlockStyle}>
          <Text style={stepTitleStyle}>{t.step1Title}</Text>
          <Text style={stepTextStyle}>{t.step1Text}</Text>
        </Section>

        <Section style={stepBlockStyle}>
          <Text style={stepTitleStyle}>{t.step2Title}</Text>
          <Text style={stepTextStyle}>{t.step2Text}</Text>
        </Section>

        <Section style={stepBlockStyle}>
          <Text style={stepTitleStyle}>{t.step3Title}</Text>
          <Text style={stepTextStyle}>{t.step3Text}</Text>
        </Section>

        <Section style={{ ...stepBlockStyle, margin: "0 0 24px" }}>
          <Text style={stepTitleStyle}>{t.step4Title}</Text>
          <Text style={stepTextStyle}>{t.step4Text}</Text>
        </Section>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 24px" }} />

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

        <CTAButton href="https://influencecircle.be/studio#contact" accentColor={ACCENT}>
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
