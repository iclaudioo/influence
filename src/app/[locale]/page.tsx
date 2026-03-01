import { HeroSection } from "@/components/sections/HeroSection";
import { ClientLogoBar } from "@/components/sections/ClientLogoBar";
import { PainPointSection } from "@/components/sections/PainPointSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { PillarGrid } from "@/components/sections/PillarGrid";
import { MirrorExposureSection } from "@/components/sections/MirrorExposureSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogoBar />
      <PainPointSection />
      <StatsBar />
      <PillarGrid />
      <MirrorExposureSection />
      <TestimonialSection />
      <CTABanner />
    </>
  );
}
