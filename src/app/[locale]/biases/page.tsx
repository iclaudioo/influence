import { getTranslations } from "next-intl/server";
import { BiasHero } from "@/components/sections/BiasHero";
import { BiasIntro } from "./BiasIntro";
import { BiasGrid } from "@/components/sections/BiasGrid";
import { ServiceCTA } from "@/components/sections/ServiceCTA";

export async function generateMetadata() {
  const t = await getTranslations("biases");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const ACCENT = "#d55d25";

export default function BiasesPage() {
  return (
    <>
      <BiasHero />
      <BiasIntro />
      <BiasGrid />
      <ServiceCTA namespace="biases" accentColor={ACCENT} />
    </>
  );
}
