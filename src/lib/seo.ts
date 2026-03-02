import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://influencecircle.com";

type SeoOverride = {
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
};

export async function getSeoOverride(
  path: string,
  locale: string,
): Promise<SeoOverride | null> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("pages_seo")
    .select(
      "meta_title, meta_description, og_title, og_description, og_image_url",
    )
    .eq("path", path)
    .eq("locale", locale)
    .single();

  if (error || !data) {
    return null;
  }

  return data as SeoOverride;
}

type BuildMetadataParams = {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
  override?: SeoOverride | null;
};

export function buildMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
  override,
}: BuildMetadataParams): Metadata {
  const finalTitle = override?.meta_title || title;
  const finalDescription = override?.meta_description || description;
  const finalOgTitle = override?.og_title || finalTitle;
  const finalOgDescription = override?.og_description || finalDescription;
  const finalOgImage =
    override?.og_image_url || ogImage || `${BASE_URL}/og-default.jpg`;

  const canonicalUrl = `${BASE_URL}${locale === "nl" ? "" : "/en"}${path === "/" ? "" : path}`;
  const alternateNl = `${BASE_URL}${path === "/" ? "" : path}`;
  const alternateEn = `${BASE_URL}/en${path === "/" ? "" : path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        nl: alternateNl,
        en: alternateEn,
      },
    },
    openGraph: {
      title: finalOgTitle,
      description: finalOgDescription,
      url: canonicalUrl,
      siteName: "Influence Circle",
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale === "nl" ? "nl_BE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalOgTitle,
      description: finalOgDescription,
      images: [finalOgImage],
    },
  };
}
