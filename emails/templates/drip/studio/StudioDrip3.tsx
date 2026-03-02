import { Heading, Text, Section } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface StudioDrip3Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#A855F7";

const content = {
  nl: {
    previewText: "Gratis content audit: Ontdek het potentieel van jouw content",
    heading: (name: string) => `${name}, klaar voor een content audit?`,
    intro:
      "We hebben je laten zien wat professionele content kan doen en welk framework wij hanteren. Nu willen we specifiek naar jouw situatie kijken.",
    offerHeading: "Gratis content audit",
    offerText:
      "Onze content experts analyseren je huidige online aanwezigheid en geven je een helder beeld van waar de grootste kansen liggen. Dit is wat je ontvangt:",
    item1: "Analyse van je huidige visuele identiteit en consistentie",
    item2: "Review van je top 10 best en slechtst presterende content",
    item3: "Benchmark ten opzichte van 3 concurrenten",
    item4: "Concreet actieplan met 5 prioriteiten",
    item5: "30 minuten persoonlijke bespreking van de resultaten",
    valueText:
      "Deze audit biedt normaal een waarde van €750, maar wij stellen hem beschikbaar voor bedrijven die serieus zijn over hun content. Geen verplichtingen achteraf.",
    limitText:
      "Vanwege de diepgang beperken we dit tot 3 audits per maand. Reageer snel om je plek te reserveren.",
    cta: "Vraag je gratis content audit aan",
    greeting: "Met creatieve energie,",
    team: "Het Influence Studio team",
  },
  en: {
    previewText: "Free content audit: Discover the potential of your content",
    heading: (name: string) => `${name}, ready for a content audit?`,
    intro:
      "We've shown you what professional content can do and which framework we use. Now we want to look specifically at your situation.",
    offerHeading: "Free content audit",
    offerText:
      "Our content experts will analyze your current online presence and give you a clear picture of where the biggest opportunities lie. Here's what you'll receive:",
    item1: "Analysis of your current visual identity and consistency",
    item2: "Review of your top 10 best and worst performing content",
    item3: "Benchmark against 3 competitors",
    item4: "Concrete action plan with 5 priorities",
    item5: "30-minute personal discussion of the results",
    valueText:
      "This audit normally has a value of €750, but we're making it available for companies that are serious about their content. No obligations afterward.",
    limitText:
      "Due to the depth involved, we limit this to 3 audits per month. Act quickly to reserve your spot.",
    cta: "Request your free content audit",
    greeting: "With creative energy,",
    team: "The Influence Studio team",
  },
};

export default function StudioDrip3({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: StudioDrip3Props) {
  const t = content[language];

  const checkItemStyle = {
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

        <Section
          style={{
            backgroundColor: "#FAF5FF",
            padding: "24px",
            borderRadius: "8px",
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
            {t.offerHeading}
          </Heading>

          <Text
            style={{
              color: "#02182B",
              fontSize: "14px",
              lineHeight: "22px",
              margin: "0 0 16px",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {t.offerText}
          </Text>

          <Text style={checkItemStyle}>{t.item1}</Text>
          <Text style={checkItemStyle}>{t.item2}</Text>
          <Text style={checkItemStyle}>{t.item3}</Text>
          <Text style={checkItemStyle}>{t.item4}</Text>
          <Text style={{ ...checkItemStyle, margin: "0" }}>{t.item5}</Text>
        </Section>

        <Text
          style={{
            color: "#02182B",
            fontSize: "15px",
            lineHeight: "24px",
            margin: "0 0 12px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.valueText}
        </Text>

        <Text
          style={{
            color: "#4A5568",
            fontSize: "14px",
            lineHeight: "22px",
            fontStyle: "italic",
            margin: "0 0 24px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {t.limitText}
        </Text>

        <CTAButton href="https://influencecircle.be/studio#audit" accentColor={ACCENT}>
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
