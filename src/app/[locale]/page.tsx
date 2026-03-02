import { ScrollAtmosphere } from "@/components/ui/ScrollAtmosphere";
import { StructuredData } from "@/components/ui/StructuredData";
import { HeroSection } from "@/components/sections/HeroSection";
import { ClientLogoBar } from "@/components/sections/ClientLogoBar";
import { PainPointSection } from "@/components/sections/PainPointSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { PillarGrid } from "@/components/sections/PillarGrid";
import { MirrorExposureSection } from "@/components/sections/MirrorExposureSection";
import { MediaMentions } from "@/components/sections/MediaMentions";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { LinkedInShowcaseWrapper } from "@/components/sections/LinkedInShowcaseWrapper";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Influence Circle",
  url: "https://influencecircle.com",
  logo: "https://influencecircle.com/images/logos/logo-white.svg",
  description:
    "Reputation Architects voor Europese C-level leiders. Strategisch advies, personal branding, content creatie en training.",
  sameAs: ["https://linkedin.com/company/influencecircle", "https://x.com/influencecircle"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Dutch", "English"],
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <ScrollAtmosphere />
      <HeroSection />
      <ClientLogoBar />
      <PainPointSection />
      <StatsBar />
      <PillarGrid />
      <MirrorExposureSection />
      <MediaMentions />
      <TestimonialSection />
      <LinkedInShowcaseWrapper />
      <FeaturedCases />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
