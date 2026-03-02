import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface CircleDrip2Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#D7263D";

const content = {
  nl: {
    previewText: "Case study: Van onzichtbaar naar thought leader in 6 maanden",
    heading: "Van onzichtbaar naar thought leader",
    intro: (name: string) =>
      `Hoi ${name}, eerder vertelden we je over het Mirror Exposure Effect. Vandaag laten we zien hoe een professional dit in de praktijk bracht.`,
    caseHeading: "De situatie",
    caseText:
      "Een senior consultant bij een gerenommeerd adviesbureau had 15 jaar ervaring, maar was online vrijwel onzichtbaar. Zijn expertise was enorm, maar niemand buiten zijn directe netwerk wist het. Nieuwe klanten kwamen uitsluitend via mond-tot-mondreclame.",
    approachHeading: "De aanpak",
    approach1:
      "Personal brand audit — Waar staat hij nu en waar wil hij naartoe?",
    approach2:
      "Content strategie — 3 kernthema's die zijn expertise en persoonlijkheid combineren",
    approach3:
      "LinkedIn optimalisatie — Profiel, netwerk en publicatiestrategie",
    approach4:
      "Wekelijkse begeleiding — Coaching op storytelling en engagement",
    resultsHeading: "De resultaten na 6 maanden",
    result1: "Van 500 naar 8.500+ relevante LinkedIn connecties",
    result2: "Gemiddeld 15.000 impressies per post",
    result3: "4 uitnodigingen als spreker op industrie-evenementen",
    result4: "3 nieuwe enterprise klanten direct via LinkedIn",
    result5: "Erkenning als thought leader in zijn vakgebied",
    closing:
      "Het verschil? Een strategische, consistente aanpak van personal branding. Niet harder werken, maar slimmer zichtbaar zijn.",
    cta: "Start jouw personal brand journey",
    greeting: "Met ambitieuze groeten,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "Case study: From invisible to thought leader in 6 months",
    heading: "From invisible to thought leader",
    intro: (name: string) =>
      `Hi ${name}, earlier we told you about the Mirror Exposure Effect. Today we show how a professional put this into practice.`,
    caseHeading: "The situation",
    caseText:
      "A senior consultant at a renowned advisory firm had 15 years of experience but was virtually invisible online. His expertise was vast, but nobody outside his direct network knew it. New clients came exclusively through word of mouth.",
    approachHeading: "The approach",
    approach1:
      "Personal brand audit — Where does he stand now and where does he want to go?",
    approach2:
      "Content strategy — 3 core themes combining expertise and personality",
    approach3:
      "LinkedIn optimization — Profile, network, and publication strategy",
    approach4:
      "Weekly guidance — Coaching on storytelling and engagement",
    resultsHeading: "The results after 6 months",
    result1: "From 500 to 8,500+ relevant LinkedIn connections",
    result2: "Average 15,000 impressions per post",
    result3: "4 invitations as speaker at industry events",
    result4: "3 new enterprise clients directly via LinkedIn",
    result5: "Recognition as thought leader in his field",
    closing:
      "The difference? A strategic, consistent approach to personal branding. Not working harder, but being smarter about visibility.",
    cta: "Start your personal brand journey",
    greeting: "With ambitious regards,",
    team: "The Influence Circle team",
  },
};

export default function CircleDrip2({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: CircleDrip2Props) {
  const t = content[language];

  const bulletStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px",
    paddingLeft: "12px",
    borderLeft: `3px solid ${ACCENT}`,
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const resultStyle = {
    color: ACCENT,
    fontSize: "15px",
    fontWeight: "bold" as const,
    lineHeight: "24px",
    margin: "0 0 8px",
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
            fontSize: "17px",
            fontWeight: "bold",
            margin: "0 0 8px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.caseHeading}
        </Heading>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "14px",
            lineHeight: "22px",
            margin: "0 0 20px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.caseText}
        </Text>

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
          {t.approachHeading}
        </Heading>

        <Text style={bulletStyle}>{t.approach1}</Text>
        <Text style={bulletStyle}>{t.approach2}</Text>
        <Text style={bulletStyle}>{t.approach3}</Text>
        <Text style={{ ...bulletStyle, margin: "0 0 20px" }}>
          {t.approach4}
        </Text>

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
          {t.resultsHeading}
        </Heading>

        <Text style={resultStyle}>{t.result1}</Text>
        <Text style={resultStyle}>{t.result2}</Text>
        <Text style={resultStyle}>{t.result3}</Text>
        <Text style={resultStyle}>{t.result4}</Text>
        <Text style={{ ...resultStyle, margin: "0 0 20px" }}>
          {t.result5}
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
