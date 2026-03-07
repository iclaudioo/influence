"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LeadCaptureForm } from "@/components/ui/LeadCaptureForm";
import { Button } from "@/components/ui/Button";

const ACCENT = "#d55d25";

type QuestionKey =
  | "linkedinPresence"
  | "contentFrequency"
  | "mediaVisibility"
  | "speakingAuthority"
  | "networkReach"
  | "brandConsistency";

type QuestionOption = {
  label: string;
  value: number;
};

type Question = {
  key: QuestionKey;
  text: string;
  options: QuestionOption[];
};

const CATEGORY_KEYS: QuestionKey[] = [
  "linkedinPresence",
  "contentFrequency",
  "mediaVisibility",
  "speakingAuthority",
  "networkReach",
  "brandConsistency",
];

const CATEGORY_TRANSLATION_MAP: Record<QuestionKey, string> = {
  linkedinPresence: "linkedinPresence",
  contentFrequency: "contentStrategy",
  mediaVisibility: "mediaVisibility",
  speakingAuthority: "speakingAuthority",
  networkReach: "networkInfluence",
  brandConsistency: "brandConsistency",
};

function getQuestions(): Question[] {
  return [
    {
      key: "linkedinPresence",
      text: "Hoe actief bent u op LinkedIn?",
      options: [
        { label: "Zelden of nooit", value: 0 },
        { label: "Maandelijks", value: 25 },
        { label: "Wekelijks", value: 50 },
        { label: "Meerdere keren per week", value: 100 },
      ],
    },
    {
      key: "contentFrequency",
      text: "Hoe vaak publiceert u thought leadership content?",
      options: [
        { label: "Nooit", value: 0 },
        { label: "Een paar keer per jaar", value: 25 },
        { label: "Maandelijks", value: 50 },
        { label: "Wekelijks of vaker", value: 100 },
      ],
    },
    {
      key: "mediaVisibility",
      text: "Hoe vaak wordt u geciteerd in media?",
      options: [
        { label: "Nooit", value: 0 },
        { label: "Zelden", value: 25 },
        { label: "Regelmatig", value: 50 },
        { label: "Frequent", value: 100 },
      ],
    },
    {
      key: "speakingAuthority",
      text: "Hoe vaak spreekt u op events?",
      options: [
        { label: "Nooit", value: 0 },
        { label: "1-2 keer per jaar", value: 25 },
        { label: "Elk kwartaal", value: 50 },
        { label: "Maandelijks of vaker", value: 100 },
      ],
    },
    {
      key: "networkReach",
      text: "Hoe groot is uw professioneel netwerk?",
      options: [
        { label: "Minder dan 500 connecties", value: 0 },
        { label: "500 - 2.000 connecties", value: 25 },
        { label: "2.000 - 10.000 connecties", value: 50 },
        { label: "Meer dan 10.000 connecties", value: 100 },
      ],
    },
    {
      key: "brandConsistency",
      text: "Hoe consistent is uw personal brand?",
      options: [
        { label: "Geen duidelijke branding", value: 0 },
        { label: "Basis aanwezig", value: 25 },
        { label: "Consistent op meerdere kanalen", value: 50 },
        { label: "Volledig doorlopend en herkenbaar", value: 100 },
      ],
    },
  ];
}

function getScoreLevel(score: number): string {
  if (score <= 25) return "invisible";
  if (score <= 50) return "emerging";
  if (score <= 75) return "visible";
  return "influential";
}

function getLowestCategories(answers: Record<string, number>): QuestionKey[] {
  return CATEGORY_KEYS
    .filter((key) => answers[key] !== undefined)
    .sort((a, b) => (answers[a] ?? 0) - (answers[b] ?? 0))
    .slice(0, 2);
}

export function VisibilityWizard() {
  const t = useTranslations("visibilityScore");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const questions = getQuestions();
  const totalSteps = questions.length;

  const handleOptionSelect = (questionKey: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowLeadCapture(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateScore = useCallback((): number => {
    const values = CATEGORY_KEYS.map((key) => answers[key] ?? 0);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / CATEGORY_KEYS.length);
  }, [answers]);

  const handleLeadCaptureSuccess = async (returnedContactId?: string) => {
    const cId = returnedContactId ?? null;
    setContactId(cId);

    const score = calculateScore();

    if (cId) {
      try {
        await fetch("/api/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contactId: cId,
            toolType: "visibility_score",
            answers,
            score,
            results: {
              level: getScoreLevel(score),
              lowestCategories: getLowestCategories(answers),
            },
          }),
        });
      } catch {
        // Non-blocking — assessment save failure shouldn't block results
      }
    }

    setShowLeadCapture(false);
    setShowResults(true);
  };

  const currentQuestion = questions[currentStep];
  const isCurrentAnswered = currentQuestion
    ? answers[currentQuestion.key] !== undefined
    : false;

  if (showResults) {
    const score = calculateScore();
    const level = getScoreLevel(score);
    const lowestCategories = getLowestCategories(answers);

    const radarData = CATEGORY_KEYS.map((key) => ({
      category: t(`categories.${CATEGORY_TRANSLATION_MAP[key]}`),
      value: answers[key] ?? 0,
    }));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Score */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.15em] text-[#6e6e73] mb-4">
            {t("resultTitle")}
          </p>
          <div className="mb-4">
            <AnimatedCounter target={score} suffix="/100" accentColor={ACCENT} />
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: ACCENT }}
          >
            {t(`levels.${level}`)}
          </p>
          <p className="text-[#6e6e73] mt-2 max-w-lg mx-auto">
            {t("resultDescription")}
          </p>
        </div>

        {/* Radar Chart */}
        <div className="bg-[#FAFAFA] rounded-2xl p-6 mb-8">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(0,0,0,0.08)" />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: "#6e6e73", fontSize: 12 }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke={ACCENT}
                fill={ACCENT}
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Per-category score bars */}
        <div className="space-y-4 mb-12">
          {CATEGORY_KEYS.map((key) => {
            const value = answers[key] ?? 0;
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#6e6e73]">
                    {t(`categories.${CATEGORY_TRANSLATION_MAP[key]}`)}
                  </span>
                  <span className="text-sm font-semibold text-[#1d1d1f]">
                    {value}/100
                  </span>
                </div>
                <div className="h-2 bg-black/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: ACCENT }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation */}
        <div className="bg-[#FAFAFA] border border-black/[0.06] rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Aanbeveling</h3>
          <p className="text-[#6e6e73] mb-4">
            {t("recommendation")}
          </p>
          {lowestCategories.length > 0 && (
            <p className="text-[#6e6e73] text-sm">
              Focus op:{" "}
              {lowestCategories
                .map((key) =>
                  t(`categories.${CATEGORY_TRANSLATION_MAP[key]}`)
                )
                .join(" & ")}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="primary" href="/contact" accentColor={ACCENT}>
            {t("bookConsultation")}
          </Button>
        </div>
      </motion.div>
    );
  }

  if (showLeadCapture) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-[#FAFAFA] border border-black/[0.06] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">
            {t("emailTitle")}
          </h3>
          <p className="text-[#6e6e73] mb-6">{t("emailDescription")}</p>
          <LeadCaptureForm
            variant="assessment"
            onSuccess={handleLeadCaptureSuccess}
            accentColor={ACCENT}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#6e6e73]">
            {t("step")} {currentStep + 1} {t("of")} {totalSteps}
          </span>
          <span className="text-sm text-[#6e6e73]">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-black/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: ACCENT }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected =
                answers[currentQuestion.key] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() =>
                    handleOptionSelect(currentQuestion.key, option.value)
                  }
                  className={`w-full text-left rounded-xl p-4 border transition-all duration-200 ${
                    isSelected
                      ? "border-[#d55d25] bg-[#d55d25]/10"
                      : "bg-[#FAFAFA] border-black/[0.06] hover:border-[#d55d25]"
                  }`}
                >
                  <span className="text-[#1d1d1f]">{option.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t("previous")}
        </button>
        <Button
          variant="primary"
          accentColor={ACCENT}
          onClick={handleNext}
          className={!isCurrentAnswered ? "opacity-50 pointer-events-none" : ""}
        >
          {currentStep === totalSteps - 1 ? t("getResults") : t("next")}
        </Button>
      </div>
    </div>
  );
}
