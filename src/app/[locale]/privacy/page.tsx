import { getTranslations } from "next-intl/server";
import { buildMetadata, getSeoOverride } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const override = await getSeoOverride("/privacy", locale);

  return buildMetadata({
    title: `${t("title")} | Influence Circle`,
    description:
      locale === "nl"
        ? "Lees hoe Influence Circle uw persoonsgegevens verzamelt, verwerkt en beschermt conform de AVG/GDPR."
        : "Read how Influence Circle collects, processes and protects your personal data in compliance with GDPR.",
    path: "/privacy",
    locale,
    override,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

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

        {isNl ? <PrivacyContentNl /> : <PrivacyContentEn />}
      </Container>
    </section>
  );
}

/* ---------- Dutch content ---------- */

function PrivacyContentNl() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        1. Gegevensverzameling
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle verzamelt uitsluitend persoonsgegevens die noodzakelijk
        zijn voor de uitvoering van onze diensten. Dit omvat:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>Naam en voornaam</li>
        <li>E-mailadres</li>
        <li>Bedrijfsnaam en functietitel</li>
        <li>Telefoonnummer (indien vrijwillig verstrekt)</li>
        <li>IP-adres en technische browsergegevens (voor beveiligingsdoeleinden)</li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        Wij verzamelen deze gegevens wanneer u ons contactformulier invult, zich
        inschrijft voor onze nieuwsbrief of gebruik maakt van onze diensten.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        2. Doel van verwerking
      </h2>
      <p className="text-white/70 leading-relaxed">
        Uw persoonsgegevens worden verwerkt voor de volgende doeleinden:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">Dienstverlening:</strong> het uitvoeren en beheren van
          de overeenkomst tussen u en Influence Circle, waaronder personal
          branding trajecten, thought leadership programma&apos;s en content
          strategie.
        </li>
        <li>
          <strong className="text-white/90">Communicatie:</strong> het beantwoorden van uw vragen,
          het versturen van relevante updates en het onderhouden van de
          klantrelatie.
        </li>
        <li>
          <strong className="text-white/90">Analytics:</strong> het verbeteren van onze website en
          diensten op basis van geanonimiseerde gebruiksgegevens.
        </li>
        <li>
          <strong className="text-white/90">Wettelijke verplichtingen:</strong> het voldoen aan
          boekhoudkundige en fiscale verplichtingen.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        3. Opslag en beveiliging
      </h2>
      <p className="text-white/70 leading-relaxed">
        Uw gegevens worden opgeslagen op beveiligde servers van Supabase,
        gevestigd binnen de Europese Unie. Wij nemen passende technische en
        organisatorische maatregelen om uw gegevens te beschermen tegen
        ongeautoriseerde toegang, verlies of misbruik, waaronder:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>Versleuteling van gegevens in transit (TLS/SSL) en in rust</li>
        <li>Toegangscontrole op basis van rollen (row-level security)</li>
        <li>Regelmatige beveiligingsaudits en updates</li>
        <li>Beperkte toegang tot persoonsgegevens door medewerkers</li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        Persoonsgegevens worden niet langer bewaard dan noodzakelijk voor de
        doeleinden waarvoor ze zijn verzameld, tenzij een langere bewaartermijn
        wettelijk vereist is.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        4. Uw rechten
      </h2>
      <p className="text-white/70 leading-relaxed">
        Op grond van de Algemene Verordening Gegevensbescherming (AVG/GDPR)
        heeft u de volgende rechten:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">Recht op inzage:</strong> u kunt opvragen welke
          persoonsgegevens wij van u verwerken.
        </li>
        <li>
          <strong className="text-white/90">Recht op rectificatie:</strong> u kunt onjuiste of
          onvolledige gegevens laten corrigeren.
        </li>
        <li>
          <strong className="text-white/90">Recht op verwijdering:</strong> u kunt verzoeken dat
          uw persoonsgegevens worden gewist.
        </li>
        <li>
          <strong className="text-white/90">Recht op overdraagbaarheid:</strong> u kunt verzoeken
          dat uw gegevens in een gestructureerd, gangbaar formaat aan u of een
          derde worden overgedragen.
        </li>
        <li>
          <strong className="text-white/90">Recht op beperking:</strong> u kunt de verwerking van
          uw gegevens laten beperken.
        </li>
        <li>
          <strong className="text-white/90">Recht van bezwaar:</strong> u kunt bezwaar maken tegen
          de verwerking van uw gegevens voor direct marketing.
        </li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        Om uw rechten uit te oefenen, kunt u contact met ons opnemen via de
        gegevens onderaan deze pagina. Wij reageren binnen 30 dagen op uw
        verzoek.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        5. Cookies
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle maakt gebruik van Plausible Analytics, een
        privacyvriendelijke analysetool die <strong className="text-white/90">geen cookies</strong>{" "}
        plaatst en geen persoonsgegevens verzamelt. Plausible voldoet volledig
        aan de AVG/GDPR en vereist geen cookiebanner.
      </p>
      <p className="text-white/70 leading-relaxed">
        Wij gebruiken localStorage in uw browser uitsluitend om te onthouden of
        u de privacymelding op onze website heeft gesloten. Dit bevat geen
        persoonsgegevens en wordt niet naar onze servers verzonden.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        6. Contact
      </h2>
      <p className="text-white/70 leading-relaxed">
        Heeft u vragen over dit privacybeleid of wenst u uw rechten uit te
        oefenen? Neem dan contact met ons op:
      </p>
      <div className="text-white/70 leading-relaxed mt-4">
        <p>Influence Circle</p>
        <p>
          E-mail:{" "}
          <a
            href="mailto:privacy@influencecircle.com"
            className="text-[#d55d25] hover:underline"
          >
            privacy@influencecircle.com
          </a>
        </p>
      </div>
      <p className="text-white/70 leading-relaxed mt-4">
        Indien u van mening bent dat wij uw gegevens niet correct verwerken,
        heeft u het recht een klacht in te dienen bij de Gegevensbeschermings&shy;autoriteit
        (GBA):{" "}
        <a
          href="https://www.gegevensbeschermingsautoriteit.be"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d55d25] hover:underline"
        >
          www.gegevensbeschermingsautoriteit.be
        </a>
      </p>
    </div>
  );
}

/* ---------- English content ---------- */

function PrivacyContentEn() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        1. Data Collection
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle only collects personal data that is necessary for the
        execution of our services. This includes:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>First and last name</li>
        <li>Email address</li>
        <li>Company name and job title</li>
        <li>Phone number (if voluntarily provided)</li>
        <li>IP address and technical browser data (for security purposes)</li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        We collect this data when you fill out our contact form, subscribe to our
        newsletter or make use of our services.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        2. Purpose of Processing
      </h2>
      <p className="text-white/70 leading-relaxed">
        Your personal data is processed for the following purposes:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">Service delivery:</strong> executing and managing the
          agreement between you and Influence Circle, including personal branding
          trajectories, thought leadership programmes and content strategy.
        </li>
        <li>
          <strong className="text-white/90">Communication:</strong> answering your enquiries,
          sending relevant updates and maintaining the client relationship.
        </li>
        <li>
          <strong className="text-white/90">Analytics:</strong> improving our website and services
          based on anonymised usage data.
        </li>
        <li>
          <strong className="text-white/90">Legal obligations:</strong> meeting accounting and
          fiscal obligations.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        3. Storage and Security
      </h2>
      <p className="text-white/70 leading-relaxed">
        Your data is stored on secure servers provided by Supabase, located
        within the European Union. We take appropriate technical and
        organisational measures to protect your data against unauthorised access,
        loss or misuse, including:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>Encryption of data in transit (TLS/SSL) and at rest</li>
        <li>Role-based access control (row-level security)</li>
        <li>Regular security audits and updates</li>
        <li>Limited employee access to personal data</li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        Personal data is not retained longer than necessary for the purposes for
        which it was collected, unless a longer retention period is required by
        law.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        4. Your Rights
      </h2>
      <p className="text-white/70 leading-relaxed">
        Under the General Data Protection Regulation (GDPR) you have the
        following rights:
      </p>
      <ul className="list-disc pl-6 text-white/70 leading-relaxed">
        <li>
          <strong className="text-white/90">Right of access:</strong> you can request which
          personal data we process about you.
        </li>
        <li>
          <strong className="text-white/90">Right to rectification:</strong> you can have
          incorrect or incomplete data corrected.
        </li>
        <li>
          <strong className="text-white/90">Right to erasure:</strong> you can request that your
          personal data be deleted.
        </li>
        <li>
          <strong className="text-white/90">Right to data portability:</strong> you can request
          that your data be transferred to you or a third party in a structured,
          commonly used format.
        </li>
        <li>
          <strong className="text-white/90">Right to restriction:</strong> you can request that
          the processing of your data be restricted.
        </li>
        <li>
          <strong className="text-white/90">Right to object:</strong> you can object to the
          processing of your data for direct marketing purposes.
        </li>
      </ul>
      <p className="text-white/70 leading-relaxed">
        To exercise your rights, please contact us using the details at the
        bottom of this page. We will respond to your request within 30 days.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        5. Cookies
      </h2>
      <p className="text-white/70 leading-relaxed">
        Influence Circle uses Plausible Analytics, a privacy-friendly analytics
        tool that <strong className="text-white/90">does not use cookies</strong> and does not
        collect personal data. Plausible is fully GDPR compliant and does not
        require a cookie banner.
      </p>
      <p className="text-white/70 leading-relaxed">
        We use localStorage in your browser solely to remember whether you have
        dismissed the privacy notice on our website. This does not contain
        personal data and is not transmitted to our servers.
      </p>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        6. Contact
      </h2>
      <p className="text-white/70 leading-relaxed">
        If you have questions about this privacy policy or wish to exercise your
        rights, please contact us:
      </p>
      <div className="text-white/70 leading-relaxed mt-4">
        <p>Influence Circle</p>
        <p>
          Email:{" "}
          <a
            href="mailto:privacy@influencecircle.com"
            className="text-[#d55d25] hover:underline"
          >
            privacy@influencecircle.com
          </a>
        </p>
      </div>
      <p className="text-white/70 leading-relaxed mt-4">
        If you believe we are not processing your data correctly, you have the
        right to lodge a complaint with the Belgian Data Protection Authority
        (GBA):{" "}
        <a
          href="https://www.gegevensbeschermingsautoriteit.be"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d55d25] hover:underline"
        >
          www.gegevensbeschermingsautoriteit.be
        </a>
      </p>
    </div>
  );
}
