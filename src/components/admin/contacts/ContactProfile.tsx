"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Tag,
  Building2,
  Mail,
  Globe,
} from "lucide-react";
import Badge from "@/components/admin/ui/Badge";
import TagManager from "@/components/admin/contacts/TagManager";
import { createClient } from "@/lib/supabase/client";

interface ServiceInterest {
  id: string;
  service: string;
  engagement_level: string;
}

interface EmailPreference {
  id: string;
  category: string;
  subscribed: boolean;
}

interface ContactProfileProps {
  contact: {
    id: string;
    name: string;
    email: string;
    company: string | null;
    language: string;
    source: string;
    status: string;
    gdpr_consent: boolean;
    gdpr_consent_at: string | null;
    message: string | null;
    created_at: string;
    updated_at: string;
  };
  tags: { id: string; tag: string }[];
  serviceInterests: ServiceInterest[];
  emailPreferences: EmailPreference[];
}

const statusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success" as const;
    case "unsubscribed":
      return "warning" as const;
    case "bounced":
    case "complained":
    case "suppressed":
      return "error" as const;
    default:
      return "default" as const;
  }
};

const serviceColors: Record<string, string> = {
  labs: "#d55d25",
  circle: "#D7263D",
  studio: "#A855F7",
  academy: "#E8A317",
};

export default function ContactProfile({
  contact,
  tags: initialTags,
  serviceInterests,
  emailPreferences,
}: ContactProfileProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this contact? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", contact.id);

      if (error) throw error;
      router.push("/admin/contacts");
      router.refresh();
    } catch (err) {
      console.error("Failed to delete contact:", err);
      alert("Failed to delete contact. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/admin/contacts")}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to contacts
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/admin/contacts/${contact.id}/edit`)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#02182B] text-white text-lg font-semibold">
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                {contact.name}
              </h2>
              <Badge variant={statusVariant(contact.status)}>
                {contact.status}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {contact.email}
              </span>
              {contact.company && (
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {contact.company}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {contact.language === "nl" ? "Dutch" : "English"}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-400">
              Source: {contact.source.replace("_", " ")} | Joined{" "}
              {new Date(contact.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              {contact.gdpr_consent && contact.gdpr_consent_at && (
                <>
                  {" "}
                  | GDPR consent:{" "}
                  {new Date(contact.gdpr_consent_at).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {contact.message && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3 border border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">
              Original Message
            </p>
            <p className="text-sm text-gray-700">{contact.message}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tags */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Tags</h3>
          </div>
          <TagManager contactId={contact.id} initialTags={initialTags} />
        </div>

        {/* Service Interests */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Service Interests
          </h3>
          {serviceInterests.length > 0 ? (
            <div className="space-y-2">
              {serviceInterests.map((interest) => (
                <div
                  key={interest.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          serviceColors[interest.service] ?? "#6b7280",
                      }}
                    />
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {interest.service}
                    </span>
                  </div>
                  <Badge
                    variant={
                      interest.engagement_level === "customer"
                        ? "success"
                        : interest.engagement_level === "engaged"
                          ? "info"
                          : interest.engagement_level === "churned"
                            ? "error"
                            : "default"
                    }
                  >
                    {interest.engagement_level}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              No service interests recorded.
            </p>
          )}
        </div>
      </div>

      {/* Email Preferences */}
      <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Email Preferences
        </h3>
        {emailPreferences.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {emailPreferences.map((pref) => (
              <div
                key={pref.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
              >
                <span className="text-sm text-gray-700 capitalize">
                  {pref.category}
                </span>
                <Badge variant={pref.subscribed ? "success" : "error"}>
                  {pref.subscribed ? "Subscribed" : "Opted out"}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            No email preferences set.
          </p>
        )}
      </div>
    </div>
  );
}
