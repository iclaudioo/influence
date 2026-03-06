import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengeSection } from "@/components/sections/ChallengeSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DeliverablesGrid } from "@/components/sections/DeliverablesGrid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ServiceCTA } from "@/components/sections/ServiceCTA";

const ACCENT = "#E8A317";

export default function AcademyPage() {
  return (
    <>
      <ServiceHero namespace="academy" accentColor={ACCENT} layeredBlocks animatedCircles="academy" backgroundImage="/images/generated/heroes/academy-hero.png" breadcrumbLabel="Influence Academy" breadcrumbHref="/academy" />
      <ChallengeSection namespace="academy" accentColor={ACCENT} />
      <ProcessSteps namespace="academy" accentColor={ACCENT} />
      <DeliverablesGrid namespace="academy" accentColor={ACCENT} />
      <FAQAccordion namespace="academy" accentColor={ACCENT} />
      <FeaturedCases serviceLine="academy" limit={2} />
      <BlogPreview serviceLine="academy" />
      <ServiceCTA namespace="academy" accentColor={ACCENT} />
    </>
  );
}
