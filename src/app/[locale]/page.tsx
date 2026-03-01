import { HeroSection } from "@/components/sections/HeroSection";
import { ClientLogoBar } from "@/components/sections/ClientLogoBar";
import { ThesisStatement } from "@/components/sections/ThesisStatement";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { MirrorExposureSection } from "@/components/sections/MirrorExposureSection";
import { ServicesList } from "@/components/sections/ServicesList";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogoBar />
      <ThesisStatement />
      <CaseStudySection />
      <MirrorExposureSection />
      <ServicesList />
      <TestimonialSection />
      <FounderSection />
      <CTABanner />
    </>
  );
}
