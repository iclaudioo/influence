import { StructuredData } from "@/components/ui/StructuredData";
import { DossierHero } from "@/components/dossier/DossierHero";
import { ReputationModel } from "@/components/dossier/ReputationModel";
import { MethodeSection } from "@/components/dossier/MethodeSection";
import { DossierCTA } from "@/components/dossier/DossierCTA";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { CONTAINER_SCROLL } from "@/lib/animations";

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
      <DossierHero />
      <ContainerScroll {...CONTAINER_SCROLL.dramatic}>
        <ReputationModel />
      </ContainerScroll>
      <ContainerScroll {...CONTAINER_SCROLL.subtle}>
        <MethodeSection />
      </ContainerScroll>
      <ContainerScroll {...CONTAINER_SCROLL.landing} behindColor="#02182B">
        <DossierCTA />
      </ContainerScroll>
    </>
  );
}
