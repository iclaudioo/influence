"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import Tabs from "@/components/admin/ui/Tabs";

/* ---------- Types ---------- */

interface BlogPost {
  id: string;
  title_nl: string | null;
  title_en: string | null;
  slug: string;
  status: string;
  view_count: number | null;
  published_at: string | null;
  created_at: string;
  author: { name: string } | null;
}

interface BlogListClientProps {
  posts: BlogPost[];
}

/* ---------- Helpers ---------- */

const statusVariant = (status: string) => {
  switch (status) {
    case "published":
      return "success" as const;
    case "draft":
      return "default" as const;
    case "archived":
      return "warning" as const;
    default:
      return "default" as const;
  }
};

const statusTabs = [
  { id: "all", label: "All" },
  { id: "draft", label: "Draft" },
  { id: "published", label: "Published" },
  { id: "archived", label: "Archived" },
];

/* ---------- Component ---------- */

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") return posts;
    return posts.filter((p) => p.status === activeTab);
  }, [posts, activeTab]);

  return (
    <>
      {/* Status filter tabs */}
      <div className="mb-6">
        <Tabs tabs={statusTabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Views
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const author = post.author as unknown as { name: string } | null;
                return (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {post.title_nl ?? post.title_en ?? "Untitled"}
                        </p>
                        <p className="text-xs text-gray-400 truncate max-w-xs">
                          /{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant(post.status)}>
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {author?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="h-3.5 w-3.5" />
                        {post.view_count ?? 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#d55d25] transition-colors hover:bg-[#d55d25]/10"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
