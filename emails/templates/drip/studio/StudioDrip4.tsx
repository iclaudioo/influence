import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface StudioDrip4Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#A855F7";

const content = {
  nl: {
    previewText: "Laatste kans: Laat je content voor je werken",
    heading: (name: string) => `${name}, laat je content voor je werken`,
    intro:
      "De afgelopen weken hebben we ons portfolio gedeeld, ons content framework onthuld en een gratis audit aangeboden. Vandaag sluiten we af met een verhaal dat het allemaal samenbrengt.",
    testimonialHeading: "Wat onze klanten zeggen",
    testimonialQuote:
      "\"Influence Studio heeft de manier waarop we communiceren volledig getransformeerd. Vroeger was onze content een bijzaak — nu is het onze sterkste troef. De video's die ze produceerden genereerden meer engagement in één maand dan al onze vorige content samen in een heel jaar. Het team denkt niet alleen creatief, maar ook strategisch.\"",
    testimonialAuthor: "— CEO, Scale-up in de techsector",
    closingHeading: "Jouw content, jouw verhaal",
    closingText:
      "Elk merk heeft een verhaal dat het waard is om te vertellen. De vraag is niet of je content nodig hebt, maar hoe goed die content jouw merk vertegenwoordigt. Wij helpen je om van goed naar onvergetelijk te gaan.",
    cta: "Start je content journey",
    ps: "P.S. Neem deze week nog contact op en ontvang een gratis moodboard en concept voorstel voor jouw merk — ter waarde van €400.",
    greeting: "Met passie voor verhalen,",
    team: "Het Influence Studio team",
  },
  en: {
    previewText: "Last chance: Let your content work for you",
    heading: (name: string) => `${name}, let your content work for you`,
    intro:
      "Over the past weeks, we've shared our portfolio, revealed our content framework, and offered a free audit. Today we close with a story that brings it all together.",
    testimonialHeading: "What our clients say",
    testimonialQuote:
      "\"Influence Studio completely transformed the way we communicate. Our content used to be an afterthought — now it's our strongest asset. The videos they produced generated more engagement in one month than all our previous content combined in an entire year. The team doesn't just think creatively, but strategically too.\"",
    testimonialAuthor: "— CEO, Tech scale-up",
    closingHeading: "Your content, your story",
    closingText:
      "Every brand has a story worth telling. The question isn't whether you need content, but how well that content represents your brand. We help you go from good to unforgettable.",
    cta: "Start your content journey",
    ps: "P.S. Get in touch this week and receive a free moodboard and concept proposal for your brand — valued at €400.",
    greeting: "With a passion for stories,",
    team: "The Influence Studio team",
  },
};

export default function StudioDrip4({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: StudioDrip4Props) {
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

        <CTAButton href="https://influencecircle.be/studio#contact" accentColor={ACCENT}>
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
