const blogFallbacks: Record<string, string> = {
  "executive-visibility-research-labs": "/images/generated/blog/executive-visibility-research-labs.png",
  "personal-brand-positioning-labs": "/images/generated/blog/personal-brand-positioning-labs.png",
  "thought-leadership-community-circle": "/images/generated/blog/thought-leadership-community-circle.png",
  "executive-networking-circle": "/images/generated/blog/executive-networking-circle.png",
  "reputation-audit-strategy-labs": "/images/generated/blog/reputation-audit-strategy-labs.png",
  "content-strategy-executives-studio": "/images/generated/blog/content-strategy-executives-studio.png",
  "linkedin-presence-optimization-studio": "/images/generated/blog/linkedin-presence-optimization-studio.png",
  "peer-advisory-boards-circle": "/images/generated/blog/peer-advisory-boards-circle.png",
  "media-training-speaking-studio": "/images/generated/blog/media-training-speaking-studio.png",
  "executive-presence-training-academy": "/images/generated/blog/executive-presence-training-academy.png",
  "reputation-management-masterclass-academy": "/images/generated/blog/reputation-management-masterclass-academy.png",
  "personal-branding-workshop-academy": "/images/generated/blog/personal-branding-workshop-academy.png",
};

const caseFallbacks: Record<string, string> = {
  "brand-strategy-audit-labs": "/images/generated/cases/brand-strategy-audit-labs.png",
  "ceo-visibility-transformation-labs": "/images/generated/cases/ceo-visibility-transformation-labs.png",
  "linkedin-content-overhaul-studio": "/images/generated/cases/linkedin-content-overhaul-studio.png",
  "cxo-community-launch-circle": "/images/generated/cases/cxo-community-launch-circle.png",
  "leadership-training-program-academy": "/images/generated/cases/leadership-training-program-academy.png",
  "executive-media-campaign-studio": "/images/generated/cases/executive-media-campaign-studio.png",
  "board-network-expansion-circle": "/images/generated/cases/board-network-expansion-circle.png",
  "executive-coaching-results-academy": "/images/generated/cases/executive-coaching-results-academy.png",
};

const resourceFallbacks: Record<string, string> = {
  "visibility-score-checklist-labs": "/images/generated/resources/visibility-score-checklist-labs.png",
  "networking-playbook-circle": "/images/generated/resources/networking-playbook-circle.png",
  "content-calendar-template-studio": "/images/generated/resources/content-calendar-template-studio.png",
  "executive-presence-guide-academy": "/images/generated/resources/executive-presence-guide-academy.png",
};

export function getBlogFallbackImage(slug: string): string | null {
  return blogFallbacks[slug] ?? null;
}

export function getCaseFallbackImage(slug: string): string | null {
  return caseFallbacks[slug] ?? null;
}

export function getResourceFallbackImage(slug: string): string | null {
  return resourceFallbacks[slug] ?? null;
}
