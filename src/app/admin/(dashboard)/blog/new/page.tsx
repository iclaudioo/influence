"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, Save, Send } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";

/* ---------- Types ---------- */

interface TeamMember {
  id: string;
  name: string;
}

/* ---------- Helpers ---------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/* ---------- Service line & status options ---------- */

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
];

/* ---------- Component ---------- */

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"nl" | "en">("nl");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Form state
  const [titleNl, setTitleNl] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
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

  // Auto-generate slug from NL title
  useEffect(() => {
    if (!slugManual && titleNl) {
      setSlug(slugify(titleNl));
    }
  }, [titleNl, slugManual]);

  // Load team members
  useEffect(() => {
    async function loadTeam() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase
        .from("team_members")
        .select("id, name")
        .order("name");
      if (data) setTeamMembers(data);
    }
    loadTeam();
  }, []);

  const authorOptions = [
    { value: "", label: "Select author..." },
    ...teamMembers.map((m) => ({ value: m.id, label: m.name })),
  ];

  // Build TipTap-compatible JSON from plain text
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

    const { error: insertError } = await supabase.from("blog_posts").insert({
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
        status === "published" ? publishedAt || new Date().toISOString() : null,
      read_time: readTime,
      view_count: 0,
    });

    if (insertError) {
      console.error("Failed to create blog post:", insertError);
      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
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
        <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
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
                required
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
                  placeholder="Write your blog post content in Dutch... (TipTap editor integration coming soon)"
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
                  placeholder="Write your blog post content in English... (TipTap editor integration coming soon)"
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
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                }}
                placeholder="url-friendly-slug"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                Auto-generated from title. Edit to customize.
              </p>
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
                {saving ? "Publishing..." : "Publish"}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Draft"}
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
