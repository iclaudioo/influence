import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";

interface WelcomeDrip2Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const steps = [
  { color: "#d55d25", nl: { name: "ZICHTBAAR", desc: "Ze weten dat je bestaat" }, en: { name: "VISIBLE", desc: "They know you exist" } },
  { color: "#D7263D", nl: { name: "HERKENBAAR", desc: "Ze weten wie je bent" }, en: { name: "RECOGNISABLE", desc: "They know who you are" } },
  { color: "#A855F7", nl: { name: "VERTROUWD", desc: "Ze geloven wat je zegt" }, en: { name: "TRUSTED", desc: "They believe what you say" } },
  { color: "#E8A317", nl: { name: "ONVERMIJDELIJK", desc: "Ze kiezen jou" }, en: { name: "INEVITABLE", desc: "They choose you" } },
];

const content = {
  nl: {
    previewText: "Het Reputation Architecture Model — Van zichtbaar naar onvermijdelijk",
    heading: (name: string) => `${name}, zo bouwen wij reputaties.`,
    intro: "Elke reputatie doorloopt vier fasen. Wij noemen dit het Reputation Architecture Model:",
    payoff: "De meeste leiders stoppen bij zichtbaarheid. Wij bouwen door tot onvermijdelijkheid.",
    next: "In onze volgende email laten we zien hoe onze methode dit model tot leven brengt.",
    greeting: "Strategische groeten,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "The Reputation Architecture Model — From visible to inevitable",
    heading: (name: string) => `${name}, this is how we build reputations.`,
    intro: "Every reputation goes through four phases. We call this the Reputation Architecture Model:",
    payoff: "Most leaders stop at visibility. We build through to inevitability.",
    next: "In our next email, we'll show you how our method brings this model to life.",
    greeting: "Strategic regards,",
    team: "The Influence Circle team",
  },
};

export default function WelcomeDrip2({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: WelcomeDrip2Props) {
  const t = content[language];

  const textStyle = {
    color: "#02182B",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 24px" as const,
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

        <Text style={textStyle}>{t.intro}</Text>

        {steps.map((step, i) => {
          const s = step[language];
          return (
            <Row key={i} style={{ marginBottom: "8px" }}>
              <Column style={{ padding: "12px", borderLeft: `4px solid ${step.color}`, background: i % 2 === 0 ? "#f8f9fa" : "#ffffff" }}>
                <Text style={{ margin: "0", fontWeight: "bold", fontSize: "14px", color: "#02182B", fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {i + 1}. {s.name}
                </Text>
                <Text style={{ margin: "4px 0 0", fontSize: "13px", color: "#555", fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {s.desc}
                </Text>
              </Column>
            </Row>
          );
        })}

        <Text style={{ ...textStyle, marginTop: "24px" }}>{t.payoff}</Text>
        <Text style={textStyle}>{t.next}</Text>

        <Text style={{ color: "#4A5568", fontSize: "15px", margin: "32px 0 4px", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.greeting}
        </Text>
        <Text style={{ color: "#02182B", fontSize: "15px", fontWeight: "bold", margin: "0", fontFamily: "Arial, Helvetica, sans-serif" }}>
          {t.team}
        </Text>
      </Section>
    </BaseLayout>
  );
}
