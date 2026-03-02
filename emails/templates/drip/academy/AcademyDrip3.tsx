import { Heading, Text, Section, Hr } from "@react-email/components";
import { BaseLayout } from "../../../components/BaseLayout";
import { CTAButton } from "../../../components/CTAButton";

interface AcademyDrip3Props {
  name: string;
  language?: "nl" | "en";
  unsubscribeUrl?: string;
}

const ACCENT = "#E8A317";

const content = {
  nl: {
    previewText: "3 praktische oefeningen om vandaag te starten op LinkedIn",
    heading: "3 oefeningen die je vandaag kunt doen",
    intro: (name: string) =>
      `Hoi ${name}, theorie is waardevol, maar actie is alles. Vandaag geven we je drie concrete oefeningen uit onze masterclass die je direct kunt toepassen.`,
    exercise1Title: "Oefening 1: De Expertise Map",
    exercise1Time: "15 minuten",
    exercise1Text:
      "Pak een leeg blad en teken drie cirkels die elkaar overlappen. Schrijf in de eerste cirkel je professionele expertise, in de tweede je persoonlijke passies, en in de derde wat je publiek nodig heeft. De overlapping is je content sweet spot — het onderwerp waar je authentiek, gepassioneerd en relevant bent.",
    exercise1Action:
      "Actie: Schrijf 5 contentideeën die in het midden van alle drie de cirkels vallen.",
    exercise2Title: "Oefening 2: De Hook Generator",
    exercise2Time: "20 minuten",
    exercise2Text:
      "De eerste twee regels van je LinkedIn post bepalen of iemand doorleest. Neem je laatste 5 posts en herschrijf de opening met deze formules: (1) Een verrassende statistiek, (2) Een contraire mening, (3) Een persoonlijk verhaal, (4) Een provocerende vraag, (5) Een voor-en-na contrast.",
    exercise2Action:
      "Actie: Herschrijf de hooks van je laatste 3 posts en vergelijk het engagement.",
    exercise3Title: "Oefening 3: Het 30-Dagen Contentplan",
    exercise3Time: "30 minuten",
    exercise3Text:
      "Plan je content voor de komende 30 dagen. Gebruik de 4-1-1 regel: voor elke 4 waardevolle posts (tips, inzichten), post je 1 persoonlijk verhaal en 1 directe promotie. Verdeel ze over 3 publicatiemomenten per week.",
    exercise3Action:
      "Actie: Open je agenda en plan minimaal 12 posts in voor de komende maand.",
    closing:
      "Deze oefeningen zijn een voorproefje van wat je in onze volledige masterclass leert — met persoonlijke begeleiding en directe feedback. Klaar voor meer?",
    cta: "Bekijk onze masterclasses",
    greeting: "Met praktische groeten,",
    team: "Het Influence Academy team",
  },
  en: {
    previewText: "3 practical exercises to start on LinkedIn today",
    heading: "3 exercises you can do today",
    intro: (name: string) =>
      `Hi ${name}, theory is valuable, but action is everything. Today we give you three concrete exercises from our masterclass that you can apply immediately.`,
    exercise1Title: "Exercise 1: The Expertise Map",
    exercise1Time: "15 minutes",
    exercise1Text:
      "Take a blank page and draw three overlapping circles. In the first circle, write your professional expertise; in the second, your personal passions; and in the third, what your audience needs. The overlap is your content sweet spot — the topic where you're authentic, passionate, and relevant.",
    exercise1Action:
      "Action: Write 5 content ideas that fall in the center of all three circles.",
    exercise2Title: "Exercise 2: The Hook Generator",
    exercise2Time: "20 minutes",
    exercise2Text:
      "The first two lines of your LinkedIn post determine whether someone reads on. Take your last 5 posts and rewrite the opening using these formulas: (1) A surprising statistic, (2) A contrarian opinion, (3) A personal story, (4) A provocative question, (5) A before-and-after contrast.",
    exercise2Action:
      "Action: Rewrite the hooks of your last 3 posts and compare the engagement.",
    exercise3Title: "Exercise 3: The 30-Day Content Plan",
    exercise3Time: "30 minutes",
    exercise3Text:
      "Plan your content for the next 30 days. Use the 4-1-1 rule: for every 4 valuable posts (tips, insights), post 1 personal story and 1 direct promotion. Spread them across 3 publishing moments per week.",
    exercise3Action:
      "Action: Open your calendar and schedule at least 12 posts for the coming month.",
    closing:
      "These exercises are a taste of what you learn in our full masterclass — with personal guidance and direct feedback. Ready for more?",
    cta: "View our masterclasses",
    greeting: "With practical regards,",
    team: "The Influence Academy team",
  },
};

export default function AcademyDrip3({
  name = "Gebruiker",
  language = "nl",
  unsubscribeUrl,
}: AcademyDrip3Props) {
  const t = content[language];

  const exerciseBlockStyle = {
    backgroundColor: "#FFFBEB",
    padding: "20px",
    borderRadius: "8px",
    margin: "0 0 20px",
  };

  const exerciseTitleStyle = {
    color: ACCENT,
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 2px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const exerciseTimeStyle = {
    color: "#718096",
    fontSize: "12px",
    margin: "0 0 8px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const exerciseTextStyle = {
    color: "#02182B",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 12px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const exerciseActionStyle = {
    color: "#02182B",
    fontSize: "14px",
    fontWeight: "bold" as const,
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

        <Section style={exerciseBlockStyle}>
          <Text style={exerciseTitleStyle}>{t.exercise1Title}</Text>
          <Text style={exerciseTimeStyle}>{t.exercise1Time}</Text>
          <Text style={exerciseTextStyle}>{t.exercise1Text}</Text>
          <Text style={exerciseActionStyle}>{t.exercise1Action}</Text>
        </Section>

        <Section style={exerciseBlockStyle}>
          <Text style={exerciseTitleStyle}>{t.exercise2Title}</Text>
          <Text style={exerciseTimeStyle}>{t.exercise2Time}</Text>
          <Text style={exerciseTextStyle}>{t.exercise2Text}</Text>
          <Text style={exerciseActionStyle}>{t.exercise2Action}</Text>
        </Section>

        <Section style={{ ...exerciseBlockStyle, margin: "0 0 24px" }}>
          <Text style={exerciseTitleStyle}>{t.exercise3Title}</Text>
          <Text style={exerciseTimeStyle}>{t.exercise3Time}</Text>
          <Text style={exerciseTextStyle}>{t.exercise3Text}</Text>
          <Text style={exerciseActionStyle}>{t.exercise3Action}</Text>
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

        <CTAButton href="https://influencecircle.be/academy#masterclasses" accentColor={ACCENT}>
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
