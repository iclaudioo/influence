import { Heading, Text, Section, Row, Column } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";

interface WelcomeDrip3Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#d55d25";

const services = [
  {
    color: "#d55d25",
    bg: "#FFF5F0",
    nl: { name: "LABS", subtitle: "Strategie & Diagnose", desc: "Alles begint met een diagnose. Blue Ocean Strategy, Zero Based Thinking, Playing to Win — de strategische lens die uw concurrenten missen." },
    en: { name: "LABS", subtitle: "Strategy & Diagnosis", desc: "Everything starts with a diagnosis. Blue Ocean Strategy, Zero Based Thinking, Playing to Win — the strategic lens your competitors are missing." },
  },
  {
    color: "#D7263D",
    bg: "#FFF0F1",
    nl: { name: "CIRCLE", subtitle: "Netwerk & Positionering", desc: "Strategische positionering in de juiste netwerken. De juiste mensen kennen u, vertrouwen u en bevelen u aan." },
    en: { name: "CIRCLE", subtitle: "Network & Positioning", desc: "Strategic positioning in the right networks. The right people know you, trust you, and recommend you." },
  },
  {
    color: "#A855F7",
    bg: "#FAF5FF",
    nl: { name: "STUDIO", subtitle: "Creatie & Narratief", desc: "Premium content die resoneert. Van thought leadership artikelen tot visuele storytelling." },
    en: { name: "STUDIO", subtitle: "Creation & Narrative", desc: "Premium content that resonates. From thought leadership articles to visual storytelling." },
  },
  {
    color: "#E8A317",
    bg: "#FFFBEB",
    nl: { name: "ACADEMY", subtitle: "Borging & Training", desc: "Training en certificering zodat uw team uw reputatie autonoom kan versterken." },
    en: { name: "ACADEMY", subtitle: "Retention & Training", desc: "Training and certification so your team can autonomously strengthen your reputation." },
  },
];

const content = {
  nl: {
    previewText: "De reis van diagnose tot borging — Onze 4-stappen methode",
    heading: (name: string) => `${name}, zo brengen wij het model tot leven.`,
    intro: "Het model vertelt je waar je naartoe moet. Onze methode brengt je er. Vier service lines, sequentieel opgebouwd:",
    next: "Morgen sturen we je een persoonlijke uitnodiging. Geen verplichtingen, enkel een gesprek.",
    greeting: "Met ambitie,",
    team: "Het Influence Circle team",
  },
  en: {
    previewText: "From diagnosis to retention — Our 4-step method",
    heading: (name: string) => `${name}, this is how we bring the model to life.`,
    intro: "The model tells you where to go. Our method gets you there. Four service lines, built sequentially:",
    next: "Tomorrow we'll send you a personal invitation. No obligations, just a conversation.",
    greeting: "With ambition,",
    team: "The Influence Circle team",
  },
};

export default function WelcomeDrip3({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: WelcomeDrip3Props) {
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

        {services.map((svc, i) => {
          const s = svc[language];
          return (
            <Row key={i} style={{ marginBottom: "8px" }}>
              <Column style={{ padding: "16px", background: svc.bg, borderLeft: `4px solid ${svc.color}` }}>
                <Text style={{ margin: "0", fontWeight: "bold", fontSize: "14px", color: svc.color, fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {s.name} — {s.subtitle}
                </Text>
                <Text style={{ margin: "4px 0 0", fontSize: "13px", color: "#555", lineHeight: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}>
                  {s.desc}
                </Text>
              </Column>
            </Row>
          );
        })}

        <Text style={{ ...textStyle, marginTop: "24px" }}>{t.next}</Text>

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
