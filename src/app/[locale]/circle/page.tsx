import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengeSection } from "@/components/sections/ChallengeSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DeliverablesGrid } from "@/components/sections/DeliverablesGrid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ServiceCTA } from "@/components/sections/ServiceCTA";

const ACCENT = "#D7263D";

export default function CirclePage() {
  return (
    <>
      <ServiceHero namespace="circle" accentColor={ACCENT} networkNodes animatedCircles="circle" />
      <ChallengeSection namespace="circle" accentColor={ACCENT} />
      <ProcessSteps namespace="circle" accentColor={ACCENT} />
      <DeliverablesGrid namespace="circle" accentColor={ACCENT} />
      <FAQAccordion namespace="circle" accentColor={ACCENT} />
      <ServiceCTA namespace="circle" accentColor={ACCENT} />
    </>
  );
}
