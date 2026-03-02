import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaMentions } from "@/components/sections/MediaMentions";
import { LinkedInShowcaseWrapper } from "@/components/sections/LinkedInShowcaseWrapper";
import { Link } from "@/i18n/navigation";

export async function AboutServerSections() {
  const supabase = createServiceClient();
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "team" });

  const roleField = locale === "nl" ? "role_nl" : "role_en";

  const { data: members } = await supabase
    .from("team_members")
    .select(`name, ${roleField}, photo_url`)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .limit(4);

  const mappedMembers = (members || []).map((m: Record<string, unknown>) => ({
    name: (m.name as string) || "",
    role: (m[roleField] as string) || "",
    photoUrl: (m.photo_url as string) || null,
  }));

  return (
    <>
      <MediaMentions />
      <LinkedInShowcaseWrapper />

      {/* Team preview */}
      {mappedMembers.length > 0 && (
        <section className="bg-off-white section-padding">
          <Container>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              centered
              light={false}
              accentColor="#D7263D"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {mappedMembers.map((member: { name: string; role: string; photoUrl: string | null }) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-navy/10">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-3xl font-bold text-navy/30">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-navy">{member.name}</h3>
                  <p className="text-sm text-navy/60">{member.role}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-navy/70 hover:text-navy transition-colors text-sm font-medium"
              >
                {t("viewAll") || "Bekijk het hele team"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
