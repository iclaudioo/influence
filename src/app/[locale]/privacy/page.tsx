import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <section className="bg-off-white min-h-screen pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-navy font-normal tracking-[-0.04em] mb-8">
            {t("title")}
          </h1>
          <p className="text-navy/70 leading-relaxed">
            {t("content")}
          </p>
        </div>
      </Container>
    </section>
  );
}
