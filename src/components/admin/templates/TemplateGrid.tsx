"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { FileText } from "lucide-react";
import TemplateCard from "./TemplateCard";

interface Template {
  id: string;
  name: string;
  category: string;
  html: string | null;
  updated_at: string;
}

interface TemplateGridProps {
  templates: Template[];
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "welcome", label: "Welcome" },
  { value: "drip", label: "Drip" },
  { value: "newsletter", label: "Newsletter" },
  { value: "transactional", label: "Transactional" },
  { value: "promotional", label: "Promotional" },
];

export default function TemplateGrid({ templates }: TemplateGridProps) {
  const router = useRouter();
  const [items, setItems] = useState<Template[]>(templates);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered =
    categoryFilter === "all"
      ? items
      : items.filter((t) => t.category === categoryFilter);

  const handleDuplicate = async (id: string) => {
    const template = items.find((t) => t.id === id);
    if (!template) return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("email_templates")
      .insert({
        name: `${template.name} (Copy)`,
        category: template.category,
        html: template.html,
      })
      .select()
      .single();

    if (!error && data) {
      setItems((prev) => [data as Template, ...prev]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this template?"))
      return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("email_templates")
      .delete()
      .eq("id", id);

    if (!error) {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div>
      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategoryFilter(cat.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              categoryFilter === cat.value
                ? "bg-[#02182B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FileText className="h-10 w-10 text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">No templates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              category={template.category}
              lastEdited={template.updated_at}
              previewHtml={template.html ?? undefined}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
