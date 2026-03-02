"use client";

import { useEffect } from "react";

interface BlogArticleClientProps {
  slug: string;
}

export function BlogArticleClient({ slug }: BlogArticleClientProps) {
  // Track page view
  useEffect(() => {
    fetch("/api/blog/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {
      // Silently ignore view tracking errors
    });
  }, [slug]);

  // Copy link button handler
  useEffect(() => {
    function handleCopyClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(".copy-link-btn");
      if (!target) return;
      const url = target.getAttribute("data-url");
      if (url) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
    }
    document.addEventListener("click", handleCopyClick);
    return () => document.removeEventListener("click", handleCopyClick);
  }, []);

  return null;
}
