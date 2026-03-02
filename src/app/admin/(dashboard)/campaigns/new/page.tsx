"use client";

import React, { useReducer, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, ArrowRight, Send, Clock } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import CampaignSteps from "@/components/admin/campaigns/CampaignSteps";
import Input from "@/components/admin/ui/Input";
import RecipientPicker from "@/components/admin/campaigns/RecipientPicker";
import EmailEditor from "@/components/admin/editor/EmailEditor";
import EmailPreview from "@/components/admin/editor/EmailPreview";
import ABTestConfig from "@/components/admin/campaigns/ABTestConfig";

/* ---------- State ---------- */

interface SegmentFilter {
  id: string;
  type: "service_interest" | "tag" | "status" | "language";
  value: string;
}

interface ABTestSettings {
  enabled: boolean;
  variantBSubject: string;
  splitPercentage: number;
  waitHours: number;
  minSampleSize: number;
}

interface CampaignState {
  step: number;
  name: string;
  subject: string;
  previewText: string;
  segment: { filters: SegmentFilter[] };
  content: JSONContent | null;
  html: string;
  abTest: ABTestSettings;
  scheduledAt: string;
  sending: boolean;
}

type CampaignAction =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_FIELD"; field: string; value: unknown }
  | { type: "SET_SEGMENT"; segment: { filters: SegmentFilter[] } }
  | { type: "SET_CONTENT"; content: JSONContent }
  | { type: "SET_HTML"; html: string }
  | { type: "SET_AB_TEST"; settings: ABTestSettings }
  | { type: "SET_SENDING"; sending: boolean };

const initialState: CampaignState = {
  step: 0,
  name: "",
  subject: "",
  previewText: "",
  segment: { filters: [] },
  content: null,
  html: "",
  abTest: {
    enabled: false,
    variantBSubject: "",
    splitPercentage: 20,
    waitHours: 24,
    minSampleSize: 100,
  },
  scheduledAt: "",
  sending: false,
};

function reducer(state: CampaignState, action: CampaignAction): CampaignState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_SEGMENT":
      return { ...state, segment: action.segment };
    case "SET_CONTENT":
      return { ...state, content: action.content };
    case "SET_HTML":
      return { ...state, html: action.html };
    case "SET_AB_TEST":
      return { ...state, abTest: action.settings };
    case "SET_SENDING":
      return { ...state, sending: action.sending };
    default:
      return state;
  }
}

/* ---------- Component ---------- */

export default function NewCampaignPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalSteps = state.abTest.enabled ? 5 : 4;

  const goNext = useCallback(() => {
    dispatch({ type: "SET_STEP", step: Math.min(state.step + 1, totalSteps - 1) });
  }, [state.step, totalSteps]);

  const goPrev = useCallback(() => {
    dispatch({ type: "SET_STEP", step: Math.max(state.step - 1, 0) });
  }, [state.step]);

  const handleSend = useCallback(
    async (schedule: boolean) => {
      dispatch({ type: "SET_SENDING", sending: true });

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.from("campaigns").insert({
        name: state.name,
        subject: state.subject,
        preview_text: state.previewText,
        content: state.content,
        html: state.html,
        status: schedule ? "scheduled" : "draft",
        segment: state.segment,
        scheduled_at: schedule && state.scheduledAt ? state.scheduledAt : null,
      });

      if (error) {
        console.error("Failed to create campaign:", error);
        dispatch({ type: "SET_SENDING", sending: false });
        return;
      }

      router.push("/admin/campaigns");
    },
    [state, router]
  );

  // Compute the actual step index accounting for A/B test toggle
  const effectiveStep = useMemo(() => {
    if (!state.abTest.enabled && state.step >= 3) {
      return state.step + 1; // skip the A/B test step
    }
    return state.step;
  }, [state.step, state.abTest.enabled]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/campaigns")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>
        <h1 className="text-2xl font-bold text-gray-900">New Campaign</h1>
      </div>

      {/* Steps indicator */}
      <CampaignSteps
        currentStep={state.step}
        onStepClick={(step) => dispatch({ type: "SET_STEP", step })}
        abTestEnabled={state.abTest.enabled}
      />

      {/* Step content */}
      <div className="min-h-[400px]">
        {/* Step 0: Setup */}
        {state.step === 0 && (
          <div className="max-w-xl space-y-5">
            <Input
              label="Campaign Name"
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "name",
                  value: e.target.value,
                })
              }
              placeholder="e.g. March Newsletter"
            />
            <Input
              label="Subject Line"
              value={state.subject}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "subject",
                  value: e.target.value,
                })
              }
              placeholder="e.g. Your weekly update from Influence Circle"
            />
            <Input
              label="Preview Text"
              value={state.previewText}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "previewText",
                  value: e.target.value,
                })
              }
              placeholder="Short text shown after the subject in inbox..."
            />
          </div>
        )}

        {/* Step 1: Recipients */}
        {state.step === 1 && (
          <RecipientPicker
            segment={state.segment}
            onChange={(segment) =>
              dispatch({ type: "SET_SEGMENT", segment })
            }
          />
        )}

        {/* Step 2: Content */}
        {state.step === 2 && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Editor
              </h3>
              <EmailEditor
                content={state.content}
                onChange={(content) =>
                  dispatch({ type: "SET_CONTENT", content })
                }
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Preview
              </h3>
              <EmailPreview
                html={state.html}
                subject={state.subject}
                previewText={state.previewText}
              />
            </div>
          </div>
        )}

        {/* Step 3: A/B Test (conditional) */}
        {state.step === 3 && state.abTest.enabled && (
          <ABTestConfig
            settings={state.abTest}
            onChange={(settings) =>
              dispatch({ type: "SET_AB_TEST", settings })
            }
          />
        )}

        {/* Step 3/4: Review */}
        {((state.step === 3 && !state.abTest.enabled) ||
          (state.step === 4 && state.abTest.enabled)) && (
          <div className="max-w-2xl space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
              <ReviewRow label="Campaign Name" value={state.name} />
              <ReviewRow label="Subject" value={state.subject} />
              <ReviewRow label="Preview Text" value={state.previewText || "—"} />
              <ReviewRow
                label="Filters"
                value={
                  state.segment.filters.length > 0
                    ? `${state.segment.filters.length} filter(s) applied`
                    : "All contacts"
                }
              />
              <ReviewRow
                label="A/B Test"
                value={
                  state.abTest.enabled
                    ? `Variant B: "${state.abTest.variantBSubject}"`
                    : "Disabled"
                }
              />
            </div>

            {/* Schedule option */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Schedule (optional)
              </label>
              <input
                type="datetime-local"
                value={state.scheduledAt}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "scheduledAt",
                    value: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#02182B] focus:outline-none focus:ring-2 focus:ring-[#02182B]/20 focus:ring-offset-1"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {state.scheduledAt ? (
                <button
                  type="button"
                  onClick={() => handleSend(true)}
                  disabled={state.sending}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90 disabled:opacity-50"
                >
                  <Clock className="h-4 w-4" />
                  {state.sending ? "Scheduling..." : "Schedule Campaign"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSend(false)}
                  disabled={state.sending}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#d55d25] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d55d25]/90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {state.sending ? "Saving..." : "Save as Draft"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={state.step === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>
        {state.step < totalSteps - 1 && (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-xl bg-[#02182B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#02182B]/90"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Helper ---------- */

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
