import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "Blog — Influence Circle Admin",
};

export default async function BlogAdminPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select(
      "id, title_nl, title_en, slug, status, view_count, published_at, created_at, author:team_members(name)"
    )
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage your blog posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#d55d25] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d55d25]/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <BlogListClient posts={(posts ?? []).map((p) => ({
        ...p,
        author: Array.isArray(p.author) ? p.author[0] ?? null : p.author,
      }))} />
    </div>
  );
}
