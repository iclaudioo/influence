import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Increment view_count using rpc or raw update
    const { error } = await supabase.rpc("increment_blog_view", {
      post_slug: slug,
    });

    // Fallback: if rpc doesn't exist, do a manual update
    if (error) {
      const { data: post } = await supabase
        .from("blog_posts")
        .select("view_count")
        .eq("slug", slug)
        .single();

      if (post) {
        await supabase
          .from("blog_posts")
          .update({ view_count: (post.view_count ?? 0) + 1 })
          .eq("slug", slug);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
