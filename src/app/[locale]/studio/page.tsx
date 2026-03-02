import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengeSection } from "@/components/sections/ChallengeSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DeliverablesGrid } from "@/components/sections/DeliverablesGrid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ServiceCTA } from "@/components/sections/ServiceCTA";

const ACCENT = "#A855F7";

export default function StudioPage() {
  return (
    <>
      <ServiceHero namespace="studio" accentColor={ACCENT} gradientMesh animatedCircles="studio" />
      <ChallengeSection namespace="studio" accentColor={ACCENT} />
      <ProcessSteps namespace="studio" accentColor={ACCENT} />
      <DeliverablesGrid namespace="studio" accentColor={ACCENT} />
      <FAQAccordion namespace="studio" accentColor={ACCENT} />
      <FeaturedCases serviceLine="studio" limit={2} />
      <BlogPreview serviceLine="studio" />
      <ServiceCTA namespace="studio" accentColor={ACCENT} />
    </>
  );
}
