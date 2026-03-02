import { getTranslations } from "next-intl/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  const override = await getSeoOverride("/terms", locale);

  return buildMetadata({
    title: `${t("title")} | Influence Circle`,
    description:
      locale === "nl"
        ? "Lees de algemene voorwaarden van Influence Circle voor het gebruik van onze diensten."
        : "Read the terms and conditions of Influence Circle for the use of our services.",
    path: "/terms",
    locale,
    override,
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  const isNl = locale === "nl";
  const lastUpdatedDate = "1 maart 2026";

  return (
    <section className="section-padding pt-32 bg-navy min-h-screen">
      <Container className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t("title")}
        </h1>
        <p className="text-white/50 mb-12">
          {t("lastUpdated")}: {lastUpdatedDate}
        </p>

        {isNl ? <TermsContentNl /> : <TermsContentEn />}
      </Container>
    </section>
  );
}

/* ---------- Dutch content ---------- */

function TermsContentNl() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        1. Definities
      </h2>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">&ldquo;Influence Circle&rdquo;</strong> (hierna
          &ldquo;wij&rdquo;, &ldquo;ons&rdquo; of &ldquo;onze&rdquo;): de
          onderneming Influence Circle, gevestigd in Belgi&euml;, gespecialiseerd
          in personal branding, thought leadership en reputatiemanagement.
        </li>
        <li>
          <strong className="text-white/90">&ldquo;Opdrachtgever&rdquo;</strong> (hierna
          &ldquo;u&rdquo; of &ldquo;uw&rdquo;): de natuurlijke persoon of
          rechtspersoon die een overeenkomst aangaat met Influence Circle.
        </li>
        <li>
          <strong className="text-white/90">&ldquo;Diensten&rdquo;</strong>: alle door Influence
          Circle aangeboden diensten, waaronder maar niet beperkt tot personal
          branding trajecten, content strategie, thought leadership programma&apos;s,
          workshops en advies.
        </li>
        <li>
          <strong className="text-white/90">&ldquo;Overeenkomst&rdquo;</strong>: elke afspraak of
          verbintenis tussen Influence Circle en de Opdrachtgever, schriftelijk
          of digitaal bevestigd.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        2. Diensten
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle biedt strategische dienstverlening aan op het gebied van
        personal branding en thought leadership. Onze diensten omvatten vier
        pijlers:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">Labs:</strong> onderzoek en strategie, waaronder
          audits, doelgroepanalyses en positionering.
        </li>
        <li>
          <strong className="text-white/90">Circle:</strong> netwerk- en community-programma&apos;s
          voor thought leaders.
        </li>
        <li>
          <strong className="text-white/90">Studio:</strong> contentcreatie, waaronder tekst,
          video, fotografie en design.
        </li>
        <li>
          <strong className="text-white/90">Academy:</strong> opleidingen, workshops en
          coachingtrajecten.
        </li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        De specifieke omvang van de dienstverlening wordt vastgelegd in een
        individuele offerte of overeenkomst. Influence Circle spant zich in om de
        overeengekomen diensten naar beste kunnen uit te voeren
        (inspanningsverbintenis).
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        3. Intellectueel eigendom
      </h2>
      <p className="text-white/70 leading-relaxed">
        Alle intellectuele eigendomsrechten op door Influence Circle ontwikkelde
        materialen, methodieken, strategiedocumenten, ontwerpen, teksten en
        overige werken blijven eigendom van Influence Circle, tenzij schriftelijk
        anders overeengekomen.
      </p>
      <p className="text-white/70 leading-relaxed">
        De Opdrachtgever verkrijgt een niet-exclusief gebruiksrecht op het
        geleverde materiaal voor het overeengekomen doel. Verveelvoudiging,
        openbaarmaking of overdracht aan derden zonder voorafgaande
        schriftelijke toestemming is niet toegestaan.
      </p>
      <p className="text-white/70 leading-relaxed">
        Content die specifiek voor de persoonlijke branding van de Opdrachtgever
        wordt gecre&euml;erd (zoals LinkedIn-posts, biografieteksten en
        profielfoto&apos;s), wordt na volledige betaling eigendom van de Opdrachtgever.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        4. Aansprakelijkheid
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle streeft naar de hoogste kwaliteit in al haar diensten.
        Onze aansprakelijkheid is echter beperkt tot het bedrag dat voor de
        betreffende opdracht in rekening is gebracht.
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          Influence Circle is niet aansprakelijk voor indirecte schade, gevolgschade,
          gederfde winst of gemiste besparingen.
        </li>
        <li>
          Wij zijn niet aansprakelijk voor schade die het gevolg is van onjuiste
          of onvolledige informatie verstrekt door de Opdrachtgever.
        </li>
        <li>
          Influence Circle is niet verantwoordelijk voor resultaten van
          algoritmewijzigingen door derden (zoals LinkedIn of Google) die de
          zichtbaarheid van gecre&euml;erde content be&iuml;nvloeden.
        </li>
        <li>
          Claims dienen binnen 30 dagen na ontdekking van het gebrek
          schriftelijk te worden gemeld.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        5. Toepasselijk recht
      </h2>
      <p className="text-white/70 leading-relaxed">
        Op deze algemene voorwaarden en alle overeenkomsten tussen Influence
        Circle en de Opdrachtgever is het Belgisch recht van toepassing.
      </p>
      <p className="text-white/70 leading-relaxed">
        Eventuele geschillen die voortvloeien uit of verband houden met deze
        voorwaarden of de overeenkomst worden bij voorkeur in onderling overleg
        opgelost. Indien dat niet mogelijk is, worden geschillen voorgelegd aan
        de bevoegde rechtbanken van het gerechtelijk arrondissement waar
        Influence Circle is gevestigd.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        6. Contact
      </h2>
      <p className="text-white/70 leading-relaxed">
        Heeft u vragen over deze algemene voorwaarden? Neem dan contact met ons
        op:
      </p>
      <div className="text-white/70 leading-relaxed mt-4">
        <p>Influence Circle</p>
        <p>
          E-mail:{" "}
          <a
            href="mailto:info@influencecircle.com"
            className="text-[#d55d25] hover:underline"
          >
            info@influencecircle.com
          </a>
        </p>
      </div>
    </div>
  );
}

/* ---------- English content ---------- */

function TermsContentEn() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        1. Definitions
      </h2>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">&ldquo;Influence Circle&rdquo;</strong> (hereinafter
          &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;): the company
          Influence Circle, established in Belgium, specialising in personal
          branding, thought leadership and reputation management.
        </li>
        <li>
          <strong className="text-white/90">&ldquo;Client&rdquo;</strong> (hereinafter
          &ldquo;you&rdquo; or &ldquo;your&rdquo;): the natural person or legal
          entity entering into an agreement with Influence Circle.
        </li>
        <li>
          <strong className="text-white/90">&ldquo;Services&rdquo;</strong>: all services offered
          by Influence Circle, including but not limited to personal branding
          trajectories, content strategy, thought leadership programmes,
          workshops and advisory services.
        </li>
        <li>
          <strong className="text-white/90">&ldquo;Agreement&rdquo;</strong>: any arrangement or
          commitment between Influence Circle and the Client, confirmed in
          writing or digitally.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        2. Services
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle provides strategic services in the field of personal
        branding and thought leadership. Our services comprise four pillars:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">Labs:</strong> research and strategy, including audits,
          audience analysis and positioning.
        </li>
        <li>
          <strong className="text-white/90">Circle:</strong> networking and community programmes
          for thought leaders.
        </li>
        <li>
          <strong className="text-white/90">Studio:</strong> content creation, including
          copywriting, video, photography and design.
        </li>
        <li>
          <strong className="text-white/90">Academy:</strong> training, workshops and coaching
          programmes.
        </li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        The specific scope of services is defined in an individual proposal or
        agreement. Influence Circle endeavours to deliver the agreed services to
        the best of its ability (obligation of means).
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        3. Intellectual Property
      </h2>
      <p className="text-white/70 leading-relaxed">
        All intellectual property rights in materials, methodologies, strategy
        documents, designs, texts and other works developed by Influence Circle
        remain the property of Influence Circle, unless otherwise agreed in
        writing.
      </p>
      <p className="text-white/70 leading-relaxed">
        The Client obtains a non-exclusive right of use for the delivered
        material for the agreed purpose. Reproduction, publication or transfer to
        third parties without prior written consent is not permitted.
      </p>
      <p className="text-white/70 leading-relaxed">
        Content created specifically for the Client&apos;s personal branding (such as
        LinkedIn posts, biography texts and profile photos) becomes the property
        of the Client upon full payment.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        4. Liability
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle strives for the highest quality in all its services.
        However, our liability is limited to the amount charged for the relevant
        assignment.
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          Influence Circle is not liable for indirect damage, consequential
          damage, lost profits or missed savings.
        </li>
        <li>
          We are not liable for damage resulting from incorrect or incomplete
          information provided by the Client.
        </li>
        <li>
          Influence Circle is not responsible for results of algorithm changes by
          third parties (such as LinkedIn or Google) that affect the visibility
          of created content.
        </li>
        <li>
          Claims must be reported in writing within 30 days of discovering the
          deficiency.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        5. Applicable Law
      </h2>
      <p className="text-white/70 leading-relaxed">
        These terms and conditions and all agreements between Influence Circle
        and the Client are governed by Belgian law.
      </p>
      <p className="text-white/70 leading-relaxed">
        Any disputes arising from or relating to these terms or the agreement
        shall preferably be resolved by mutual consultation. If this is not
        possible, disputes shall be submitted to the competent courts of the
        judicial district in which Influence Circle is established.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        6. Contact
      </h2>
      <p className="text-white/70 leading-relaxed">
        If you have questions about these terms and conditions, please contact
        us:
      </p>
      <div className="text-white/70 leading-relaxed mt-4">
        <p>Influence Circle</p>
        <p>
          Email:{" "}
          <a
            href="mailto:info@influencecircle.com"
            className="text-[#d55d25] hover:underline"
          >
            info@influencecircle.com
          </a>
        </p>
      </div>
    </div>
  );
}
