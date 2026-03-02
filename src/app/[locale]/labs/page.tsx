import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengeSection } from "@/components/sections/ChallengeSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DeliverablesGrid } from "@/components/sections/DeliverablesGrid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ServiceCTA } from "@/components/sections/ServiceCTA";

const ACCENT = "#d55d25";

export default function LabsPage() {
  return (
    <>
      <ServiceHero namespace="labs" accentColor={ACCENT} featured animatedCircles="orange" />
      <ChallengeSection namespace="labs" accentColor={ACCENT} />
      <ProcessSteps namespace="labs" accentColor={ACCENT} />
      <DeliverablesGrid namespace="labs" accentColor={ACCENT} />
      <FAQAccordion namespace="labs" accentColor={ACCENT} />
      <ServiceCTA namespace="labs" accentColor={ACCENT} />
    </>
  );
}
