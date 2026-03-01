import type { MetadataRoute } from "next";

const baseUrl = "https://influence.be";
const locales = ["nl", "en"];

const routes = [
  "",
  "/about",
  "/contact",
  "/labs",
  "/circle",
  "/studio",
  "/academy",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = locale === "nl" ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
