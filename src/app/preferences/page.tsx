"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Preferences {
  transactional: boolean;
  marketing: boolean;
  drip: boolean;
  newsletter: boolean;
}

const categoryLabels: Record<string, Record<string, string>> = {
  nl: {
    transactional: "Transactionele e-mails (bevestigingen, meldingen)",
    marketing: "Marketing e-mails (promoties, aanbiedingen)",
    drip: "Educatieve reeksen (tips, inzichten)",
    newsletter: "Nieuwsbrief (maandelijks overzicht)",
  },
  en: {
    transactional: "Transactional emails (confirmations, notifications)",
    marketing: "Marketing emails (promotions, offers)",
    drip: "Educational series (tips, insights)",
    newsletter: "Newsletter (monthly digest)",
  },
};

const content = {
  nl: {
    title: "E-mail voorkeuren",
    subtitle: "Beheer welke e-mails u van ons ontvangt.",
    save: "Voorkeuren opslaan",
    saving: "Opslaan...",
    saved: "Uw voorkeuren zijn opgeslagen.",
    unsubscribeAll: "Van alles uitschrijven",
    unsubscribed: "U bent uitgeschreven van alle e-mails.",
    error: "Er is iets misgegaan. Probeer het opnieuw.",
    invalidToken: "Deze link is ongeldig of verlopen.",
    deleteTitle: "Mijn gegevens verwijderen",
    deleteDescription:
      "Verwijder al uw persoonlijke gegevens uit ons systeem. Dit kan niet ongedaan gemaakt worden.",
    deleteButton: "Verwijder mijn gegevens",
    deleteConfirm:
      "Weet u zeker dat u al uw gegevens wilt verwijderen? Dit kan niet ongedaan gemaakt worden.",
    deleted: "Uw gegevens zijn verwijderd.",
    exportTitle: "Mijn gegevens exporteren",
    exportDescription: "Download een kopie van al uw persoonlijke gegevens.",
    exportButton: "Gegevens downloaden",
    poweredBy: "Influence Circle | Antwerpen, België",
  },
  en: {
    title: "Email preferences",
    subtitle: "Manage which emails you receive from us.",
    save: "Save preferences",
    saving: "Saving...",
    saved: "Your preferences have been saved.",
    unsubscribeAll: "Unsubscribe from all",
    unsubscribed: "You have been unsubscribed from all emails.",
    error: "Something went wrong. Please try again.",
    invalidToken: "This link is invalid or expired.",
    deleteTitle: "Delete my data",
    deleteDescription:
      "Remove all your personal data from our system. This cannot be undone.",
    deleteButton: "Delete my data",
    deleteConfirm:
      "Are you sure you want to delete all your data? This cannot be undone.",
    deleted: "Your data has been deleted.",
    exportTitle: "Export my data",
    exportDescription: "Download a copy of all your personal data.",
    exportButton: "Download data",
    poweredBy: "Influence Circle | Antwerp, Belgium",
  },
};

export default function PreferenceCenterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#02182B]" />
        </div>
      }
    >
      <PreferenceCenterContent />
    </Suspense>
  );
}

function PreferenceCenterContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [language, setLanguage] = useState<"nl" | "en">("nl");
  const [contactId, setContactId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    transactional: true,
    marketing: true,
    drip: true,
    newsletter: true,
  });

  const t = content[language];
  const labels = categoryLabels[language];

  useEffect(() => {
    if (!token) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    async function loadPreferences() {
      const supabase = createClient();

      // Validate token
      const { data: tokenData } = await supabase
        .from("unsubscribe_tokens")
        .select("contact_id, expires_at, used_at")
        .eq("token", token)
        .single();

      if (
        !tokenData ||
        new Date(tokenData.expires_at) < new Date()
      ) {
        setInvalid(true);
        setLoading(false);
        return;
      }

      setContactId(tokenData.contact_id);

      // Get contact language
      const { data: contact } = await supabase
        .from("contacts")
        .select("language")
        .eq("id", tokenData.contact_id)
        .single();

      if (contact?.language === "en") setLanguage("en");

      // Get email preferences
      const { data: prefs } = await supabase
        .from("email_preferences")
        .select("category, subscribed")
        .eq("contact_id", tokenData.contact_id);

      if (prefs) {
        const prefMap: Preferences = {
          transactional: true,
          marketing: true,
          drip: true,
          newsletter: true,
        };
        prefs.forEach((p) => {
          if (p.category in prefMap) {
            prefMap[p.category as keyof Preferences] = p.subscribed;
          }
        });
        setPreferences(prefMap);
      }

      setLoading(false);
    }

    loadPreferences();
  }, [token]);

  async function handleSave() {
    if (!contactId) return;
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const supabase = createClient();

      for (const [category, subscribed] of Object.entries(preferences)) {
        await supabase
          .from("email_preferences")
          .upsert(
            { contact_id: contactId, category, subscribed },
            { onConflict: "contact_id,category" },
          );
      }

      // If all unsubscribed, update contact status
      const allUnsubscribed = Object.values(preferences).every((v) => !v);
      if (allUnsubscribed) {
        await supabase
          .from("contacts")
          .update({ status: "unsubscribed" })
          .eq("id", contactId);
      }

      setSuccess(t.saved);
    } catch {
      setError(t.error);
    } finally {
      setSaving(false);
    }
  }

  async function handleUnsubscribeAll() {
    if (!contactId) return;
    setSaving(true);

    try {
      const supabase = createClient();

      const allFalse: Preferences = {
        transactional: false,
        marketing: false,
        drip: false,
        newsletter: false,
      };

      for (const category of Object.keys(allFalse)) {
        await supabase
          .from("email_preferences")
          .upsert(
            { contact_id: contactId, category, subscribed: false },
            { onConflict: "contact_id,category" },
          );
      }

      await supabase
        .from("contacts")
        .update({ status: "unsubscribed" })
        .eq("id", contactId);

      setPreferences(allFalse);
      setSuccess(t.unsubscribed);
    } catch {
      setError(t.error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteData() {
    if (!contactId || !confirm(t.deleteConfirm)) return;
    setSaving(true);

    try {
      const res = await fetch("/api/gdpr", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, token }),
      });

      if (!res.ok) throw new Error();
      setSuccess(t.deleted);
      setContactId(null);
    } catch {
      setError(t.error);
    } finally {
      setSaving(false);
    }
  }

  async function handleExportData() {
    try {
      const res = await fetch(
        `/api/gdpr?contactId=${contactId}&token=${token}`,
      );
      if (!res.ok) throw new Error();

      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(t.error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#02182B]" />
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md text-center">
          <p className="text-gray-700">{t.invalidToken}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-bold tracking-[0.15em] uppercase text-[#02182B] mb-2">
            INFLUENCE
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-500 mt-1">{t.subtitle}</p>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          {Object.entries(preferences).map(([category, subscribed]) => (
            <label
              key={category}
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    [category]: e.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#02182B] focus:ring-[#02182B]"
              />
              <span className="text-sm text-gray-700">
                {labels[category] || category}
              </span>
            </label>
          ))}

          {success && (
            <p className="text-green-600 text-sm mt-2">{success}</p>
          )}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
            >
              {saving ? t.saving : t.save}
            </button>
            <button
              onClick={handleUnsubscribeAll}
              disabled={saving}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              {t.unsubscribeAll}
            </button>
          </div>
        </div>

        {/* Data rights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Export */}
          <div>
            <h3 className="font-medium text-gray-900">{t.exportTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {t.exportDescription}
            </p>
            <button
              onClick={handleExportData}
              className="mt-3 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t.exportButton}
            </button>
          </div>

          {/* Delete */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-medium text-red-600">{t.deleteTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {t.deleteDescription}
            </p>
            <button
              onClick={handleDeleteData}
              disabled={saving}
              className="mt-3 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {t.deleteButton}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">{t.poweredBy}</p>
      </div>
    </div>
  );
}
