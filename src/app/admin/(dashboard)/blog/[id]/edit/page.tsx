"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, Save, Send, Trash2 } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";

/* ---------- Types ---------- */

interface TeamMember {
  id: string;
  name: string;
}

interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
}

/* ---------- Helpers ---------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function tipTapToText(node: TipTapNode | null | undefined): string {
  if (!node) return "";
  if (node.text) return node.text;
  if (node.content) {
    return node.content
      .map((child) => tipTapToText(child))
      .join(node.type === "doc" ? "\n\n" : "");
  }
  return "";
}

/* ---------- Options ---------- */

const serviceLineOptions = [
  { value: "", label: "Select service line..." },
  { value: "labs", label: "Influence Labs" },
  { value: "circle", label: "Influence Circle" },
  { value: "studio", label: "Influence Studio" },
  { value: "academy", label: "Influence Academy" },
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

/* ---------- Component ---------- */

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"nl" | "en">("nl");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Form state
  const [titleNl, setTitleNl] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [excerptNl, setExcerptNl] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [contentNl, setContentNl] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [serviceLine, setServiceLine] = useState("");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [publishedAt, setPublishedAt] = useState("");

  // Load post + team members
  useEffect(() => {
    async function load() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Load team members
      const { data: members } = await supabase
        .from("team_members")
        .select("id, name")
        .order("name");
      if (members) setTeamMembers(members);

      // Load post
      const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!post) {
        router.push("/admin/blog");
        return;
      }

      setTitleNl(post.title_nl ?? "");
      setTitleEn(post.title_en ?? "");
      setSlug(post.slug ?? "");
      setExcerptNl(post.excerpt_nl ?? "");
      setExcerptEn(post.excerpt_en ?? "");
      setContentNl(tipTapToText(post.content_nl as TipTapNode | null));
      setContentEn(tipTapToText(post.content_en as TipTapNode | null));
      setCoverImageUrl(post.cover_image_url ?? "");
      setAuthorId(post.author_id ?? "");
      setServiceLine(post.service_line ?? "");
      setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
      setMetaTitle(post.meta_title ?? "");
      setMetaDescription(post.meta_description ?? "");
      setStatus(post.status ?? "draft");
      setPublishedAt(
        post.published_at
          ? new Date(post.published_at).toISOString().slice(0, 16)
          : ""
      );
      setLoading(false);
    }
    load();
  }, [id, router]);

  const authorOptions = [
    { value: "", label: "Select author..." },
    ...teamMembers.map((m) => ({ value: m.id, label: m.name })),
  ];

  function textToTipTap(text: string) {
    if (!text.trim()) return null;
    const paragraphs = text.split("\n\n").filter(Boolean);
    return {
      type: "doc",
      content: paragraphs.map((p) => ({
        type: "paragraph",
        content: [{ type: "text", text: p }],
      })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const readTime = Math.max(
      1,
      Math.ceil(((contentNl || contentEn).split(/\s+/).length) / 200)
    );

    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({
        title_nl: titleNl || null,
        title_en: titleEn || null,
        slug,
        excerpt_nl: excerptNl || null,
        excerpt_en: excerptEn || null,
        content_nl: textToTipTap(contentNl),
        content_en: textToTipTap(contentEn),
        cover_image_url: coverImageUrl || null,
        author_id: authorId || null,
        service_line: serviceLine || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        status,
        published_at:
          status === "published"
            ? publishedAt || new Date().toISOString()
            : null,
        read_time: readTime,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      console.error("Failed to update blog post:", updateError);
      setError(updateError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    router.push("/admin/blog");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#02182B]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="text-sm text-gray-500 mt-1">
              {titleNl || titleEn || "Untitled"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Language tabs */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("nl")}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  activeTab === "nl"
                    ? "text-[#02182B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Nederlands
                {activeTab === "nl" && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#02182B]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  activeTab === "en"
                    ? "text-[#02182B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                English
                {activeTab === "en" && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#02182B]" />
                )}
              </button>
            </nav>
          </div>

          {/* NL fields */}
          {activeTab === "nl" && (
            <div className="space-y-5">
              <Input
                label="Title (NL)"
                value={titleNl}
                onChange={(e) => setTitleNl(e.target.value)}
                placeholder="Blog post title in Dutch"
              />
              <Input
                label="Excerpt (NL)"
                value={excerptNl}
                onChange={(e) => setExcerptNl(e.target.value)}
                placeholder="Short description in Dutch"
              />
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Content (NL)
                </label>
                <textarea
                  value={contentNl}
                  onChange={(e) => setContentNl(e.target.value)}
                  placeholder="Write your blog post content in Dutch..."
                  rows={12}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#02182B] focus:outline-none focus:ring-2 focus:ring-[#02182B]/20 focus:ring-offset-1"
                />
              </div>
            </div>
          )}

          {/* EN fields */}
          {activeTab === "en" && (
            <div className="space-y-5">
              <Input
                label="Title (EN)"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Blog post title in English"
              />
              <Input
                label="Excerpt (EN)"
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
                placeholder="Short description in English"
              />
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Content (EN)
                </label>
                <textarea
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder="Write your blog post content in English..."
                  rows={12}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#02182B] focus:outline-none focus:ring-2 focus:ring-[#02182B]/20 focus:ring-offset-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Post settings */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Post Settings
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Input
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="url-friendly-slug"
                required
              />
            </div>
            <Input
              label="Cover Image URL"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://..."
            />
            <Select
              label="Author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              options={authorOptions}
            />
            <Select
              label="Service Line"
              value={serviceLine}
              onChange={(e) => setServiceLine(e.target.value)}
              options={serviceLineOptions}
            />
            <Input
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
            />
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={statusOptions}
            />
            {status === "published" && (
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Published At
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#02182B] focus:outline-none focus:ring-2 focus:ring-[#02182B]/20 focus:ring-offset-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* SEO settings */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">SEO</h2>
          <div className="space-y-5 max-w-xl">
            <Input
              label="Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Custom SEO title (optional)"
            />
            <div className="w-full">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Custom SEO description (optional)"
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#02182B] focus:outline-none focus:ring-2 focus:ring-[#02182B]/20 focus:ring-offset-1"
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#d55d25] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d55d25]/90 disabled:opacity-50"
          >
            {status === "published" ? (
              <>
                <Send className="h-4 w-4" />
                {saving ? "Publishing..." : "Update & Publish"}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
