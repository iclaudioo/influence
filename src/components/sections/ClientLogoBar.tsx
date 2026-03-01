import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

const placeholderClients = [
  "Client 1",
  "Client 2",
  "Client 3",
  "Client 4",
  "Client 5",
  "Client 6",
];

export async function ClientLogoBar() {
  const t = await getTranslations("clients");

  return (
    <section className="bg-navy-light/50 py-8 border-b border-white/5">
      <Container>
        <p className="text-sm uppercase tracking-[0.15em] font-medium text-gold/60 text-center mb-6">
          {t("label")}
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {placeholderClients.map((client) => (
            <span
              key={client}
              className="text-white/30 text-lg font-semibold tracking-wide select-none"
            >
              {client}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
