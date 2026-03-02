import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface LabsDrip4Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const content = {
  nl: {
    previewText: "Laatste kans: Start jouw groeitraject met Influence Labs",
    heading: (name: string) => `${name}, ben je klaar om te groeien?`,
    intro:
      "De afgelopen weken hebben we inzichten gedeeld over datagedreven groei, een krachtige case study, en een exclusieve audit-aanbieding. Vandaag sluiten we af met de stem van iemand die het heeft meegemaakt.",
    testimonialHeading: "Wat onze klanten zeggen",
    testimonialQuote:
      "\"Influence Labs heeft onze hele benadering van digitale marketing veranderd. We gingen van versnipperde campagnes naar een geïntegreerde strategie die meetbare resultaten opleverde. Na 6 maanden verdubbelde onze leadgeneratie en daalde de cost per lead met 40%. Het team begrijpt niet alleen data — ze begrijpen business.\"",
    testimonialAuthor: "— Marketing Director, B2B SaaS bedrijf",
    closingHeading: "De volgende stap is aan jou",
    closingText:
      "Groei begint met een eerste stap. Of je nu klaar bent voor een volledig groeitraject of eerst een vrijblijvend gesprek wilt, wij staan voor je klaar.",
    cta: "Start je groeitraject",
    ps: "P.S. Reageer binnen 7 dagen en ontvang een gratis concurrentie-analyse ter waarde van €500 bij je eerste consultatie.",
    greeting: "Met warme groeten,",
    team: "Het Influence Labs team",
  },
  en: {
    previewText: "Last chance: Start your growth journey with Influence Labs",
    heading: (name: string) => `${name}, are you ready to grow?`,
    intro:
      "Over the past weeks, we've shared insights about data-driven growth, a powerful case study, and an exclusive audit offer. Today we close with the voice of someone who experienced it firsthand.",
    testimonialHeading: "What our clients say",
    testimonialQuote:
      "\"Influence Labs transformed our entire approach to digital marketing. We went from fragmented campaigns to an integrated strategy that delivered measurable results. After 6 months, our lead generation doubled and cost per lead dropped by 40%. The team doesn't just understand data — they understand business.\"",
    testimonialAuthor: "— Marketing Director, B2B SaaS company",
    closingHeading: "The next step is yours",
    closingText:
      "Growth starts with a first step. Whether you're ready for a full growth program or just want a no-obligation conversation, we're here for you.",
    cta: "Start your growth journey",
    ps: "P.S. Respond within 7 days and receive a free competitive analysis worth €500 with your first consultation.",
    greeting: "With warm regards,",
    team: "The Influence Labs team",
  },
};

export default function LabsDrip4({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: LabsDrip4Props) {
  const t = content[language];

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
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.testimonialHeading}
        </Heading>

        <Section
          style={{
            backgroundColor: "#F8F9FA",
            padding: "24px",
            borderRadius: "8px",
            borderLeft: `4px solid ${ACCENT}`,
            margin: "0 0 8px",
          }}
        >
          <Text
            style={{
              color: "#02182B",
              fontSize: "15px",
              lineHeight: "26px",
              fontStyle: "italic",
              margin: "0",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.testimonialQuote}
          </Text>
        </Section>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "13px",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.testimonialAuthor}
        </Text>

        <Hr style={{ borderColor: "#E2E8F0", margin: "0 0 24px" }} />

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
          {t.closingHeading}
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
          {t.closingText}
        </Text>

        <CTAButton href="https://influencecircle.be/labs#contact" accentColor={ACCENT}>
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
