import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface CircleDrip3Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#D7263D";

const content = {
  nl: {
    previewText: "De 5 pijlers van thought leadership",
    heading: "De 5 pijlers van thought leadership",
    intro: (name: string) =>
      `Hoi ${name}, na het Mirror Exposure Effect en een inspirerende case study is het tijd om concreet te worden. Dit zijn de 5 pijlers die elke sterke thought leader gemeen heeft.`,
    pillar1Title: "1. Authentieke positionering",
    pillar1Text:
      "Thought leadership begint bij weten wie je bent en waar je voor staat. Het gaat niet om een persona creëren, maar om je unieke combinatie van expertise, ervaring en perspectief helder te formuleren.",
    pillar2Title: "2. Consistente content cadans",
    pillar2Text:
      "De kracht zit in regelmaat. Eén post per week die waarde biedt is effectiever dan dagelijks posten zonder strategie. Kies een ritme dat je kunt volhouden en bouw daarop voort.",
    pillar3Title: "3. Storytelling met impact",
    pillar3Text:
      "Feiten informeren, verhalen transformeren. Deel je lessen, je fouten en je doorbraken. Mensen onthouden verhalen, geen bullet points.",
    pillar4Title: "4. Strategisch netwerken",
    pillar4Text:
      "Engagement is geen eenrichtingsverkeer. Reageer op anderen, bouw relaties op, deel het podium. De sterkste personal brands zijn gebouwd op gemeenschap.",
    pillar5Title: "5. Meten en optimaliseren",
    pillar5Text:
      "Welke content resoneert? Welke onderwerpen genereren de meeste gesprekken? Gebruik data om je strategie continu te verfijnen en je impact te vergroten.",
    closing:
      "Deze pijlers zijn het fundament van ons Influence Circle programma. Klaar om ze in de praktijk te brengen?",
    cta: "Bouw jouw thought leadership",
    greeting: "Met gedreven groeten,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "The 5 pillars of thought leadership",
    heading: "The 5 pillars of thought leadership",
    intro: (name: string) =>
      `Hi ${name}, after the Mirror Exposure Effect and an inspiring case study, it's time to get concrete. These are the 5 pillars that every strong thought leader has in common.`,
    pillar1Title: "1. Authentic positioning",
    pillar1Text:
      "Thought leadership starts with knowing who you are and what you stand for. It's not about creating a persona, but clearly articulating your unique combination of expertise, experience, and perspective.",
    pillar2Title: "2. Consistent content cadence",
    pillar2Text:
      "The power lies in regularity. One post per week that provides value is more effective than posting daily without strategy. Choose a rhythm you can sustain and build from there.",
    pillar3Title: "3. Storytelling with impact",
    pillar3Text:
      "Facts inform, stories transform. Share your lessons, your mistakes, and your breakthroughs. People remember stories, not bullet points.",
    pillar4Title: "4. Strategic networking",
    pillar4Text:
      "Engagement is not a one-way street. Respond to others, build relationships, share the stage. The strongest personal brands are built on community.",
    pillar5Title: "5. Measure and optimize",
    pillar5Text:
      "Which content resonates? Which topics generate the most conversations? Use data to continuously refine your strategy and amplify your impact.",
    closing:
      "These pillars form the foundation of our Influence Circle program. Ready to put them into practice?",
    cta: "Build your thought leadership",
    greeting: "With driven regards,",
    team: "The Influence Circle team",
  },
};

export default function CircleDrip3({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: CircleDrip3Props) {
  const t = content[language];

  const pillarBlockStyle = {
    backgroundColor: "#FFF5F5",
    padding: "20px",
    borderRadius: "6px",
    margin: "0 0 16px",
  };

  const pillarTitleStyle = {
    color: ACCENT,
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 6px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const pillarTextStyle = {
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

        <Section style={pillarBlockStyle}>
          <Text style={pillarTitleStyle}>{t.pillar1Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar1Text}</Text>
        </Section>

        <Section style={pillarBlockStyle}>
          <Text style={pillarTitleStyle}>{t.pillar2Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar2Text}</Text>
        </Section>

        <Section style={pillarBlockStyle}>
          <Text style={pillarTitleStyle}>{t.pillar3Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar3Text}</Text>
        </Section>

        <Section style={pillarBlockStyle}>
          <Text style={pillarTitleStyle}>{t.pillar4Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar4Text}</Text>
        </Section>

        <Section style={{ ...pillarBlockStyle, margin: "0 0 24px" }}>
          <Text style={pillarTitleStyle}>{t.pillar5Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar5Text}</Text>
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

        <CTAButton href="https://influencecircle.be/circle#contact" accentColor={ACCENT}>
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
