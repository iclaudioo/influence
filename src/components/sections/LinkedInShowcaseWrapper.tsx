import { createServiceClient } from "@/lib/supabase/server";
import { LinkedInShowcase } from "./LinkedInShowcase";

export async function LinkedInShowcaseWrapper() {
  const supabase = createServiceClient();

  const { data: posts, error } = await supabase
    .from("linkedin_posts")
    .select(
      "id, author_name, author_photo_url, post_text, engagement_stats, linkedin_url",
    )
    .order("created_at", { ascending: false })
    .limit(10);

  if (error || !posts || posts.length === 0) {
    return null;
  }

  return <LinkedInShowcase posts={posts} />;
}
