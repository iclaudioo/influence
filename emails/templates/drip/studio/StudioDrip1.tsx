import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface StudioDrip1Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#A855F7";

const content = {
  nl: {
    previewText: "Influence Studio: Content die het verschil maakt",
    heading: "Content die het verschil maakt",
    intro: (name: string) =>
      `Hoi ${name}, welkom bij Influence Studio! Wij geloven dat professionele content het verschil maakt tussen gezien worden en genegeerd worden. Laat ons je laten zien wat we bedoelen.`,
    showcaseHeading: "Ons portfolio in een notendop",
    showcaseIntro:
      "Van strategie tot creatie — elk project begint met een verhaal en eindigt met impact. Dit zijn de drie pijlers van ons creatieve werk:",
    pillar1Title: "Video content",
    pillar1Text:
      "Korte, krachtige video's die de aandacht grijpen op LinkedIn, Instagram en andere platforms. Van testimonials tot brand stories, van interviews tot event coverage.",
    pillar2Title: "Visuele identiteit",
    pillar2Text:
      "Consistente visuele branding die je herkenbaarheid vergroot. Templatesystemen, social media graphics en presentatiedesigns die bij jouw merk passen.",
    pillar3Title: "Geschreven content",
    pillar3Text:
      "Thought leadership artikelen, LinkedIn posts, captions en blogcontent die jouw expertise vertaalt naar boeiende verhalen.",
    closing:
      "Benieuwd naar ons volledige portfolio en recente projecten? Bezoek onze website en ontdek wat professionele content voor jouw merk kan doen.",
    cta: "Bekijk ons portfolio",
    greeting: "Met creatieve groeten,",
    team: "Het Influence Studio team",
  },
  en: {
    previewText: "Influence Studio: Content that makes the difference",
    heading: "Content that makes the difference",
    intro: (name: string) =>
      `Hi ${name}, welcome to Influence Studio! We believe that professional content makes the difference between being seen and being ignored. Let us show you what we mean.`,
    showcaseHeading: "Our portfolio in a nutshell",
    showcaseIntro:
      "From strategy to creation — every project starts with a story and ends with impact. These are the three pillars of our creative work:",
    pillar1Title: "Video content",
    pillar1Text:
      "Short, powerful videos that capture attention on LinkedIn, Instagram, and other platforms. From testimonials to brand stories, from interviews to event coverage.",
    pillar2Title: "Visual identity",
    pillar2Text:
      "Consistent visual branding that increases your recognition. Template systems, social media graphics, and presentation designs that match your brand.",
    pillar3Title: "Written content",
    pillar3Text:
      "Thought leadership articles, LinkedIn posts, captions, and blog content that translates your expertise into compelling stories.",
    closing:
      "Curious about our full portfolio and recent projects? Visit our website and discover what professional content can do for your brand.",
    cta: "View our portfolio",
    greeting: "With creative regards,",
    team: "The Influence Studio team",
  },
};

export default function StudioDrip1({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: StudioDrip1Props) {
  const t = content[language];

  const pillarStyle = {
    backgroundColor: "#FAF5FF",
    padding: "20px",
    borderRadius: "6px",
    margin: "0 0 12px",
  };

  const pillarTitleStyle = {
    color: ACCENT,
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 4px",
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
          {t.showcaseHeading}
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
          {t.showcaseIntro}
        </Text>

        <Section style={pillarStyle}>
          <Text style={pillarTitleStyle}>{t.pillar1Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar1Text}</Text>
        </Section>

        <Section style={pillarStyle}>
          <Text style={pillarTitleStyle}>{t.pillar2Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar2Text}</Text>
        </Section>

        <Section style={{ ...pillarStyle, margin: "0 0 24px" }}>
          <Text style={pillarTitleStyle}>{t.pillar3Title}</Text>
          <Text style={pillarTextStyle}>{t.pillar3Text}</Text>
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

        <CTAButton href="https://influencecircle.be/studio" accentColor={ACCENT}>
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
