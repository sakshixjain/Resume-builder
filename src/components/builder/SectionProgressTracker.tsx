"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { getSectionProgress, DetailItem } from "@/lib/resume/sectionProgress";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProgressTrackerProps {
  sectionKey: string;
  className?: string;
  compact?: boolean;
}

export const SectionProgressTracker: React.FC<SectionProgressTrackerProps> = ({
  sectionKey,
  className = "",
  compact = false,
}) => {
  const { resume, touchedFields } = useResumeStore();

  const progress = getSectionProgress(sectionKey, resume, touchedFields);
  const { percentage, completedCount, totalCount, pendingItems } = progress;

  const handleFocusField = (item: DetailItem) => {
    if (!item.targetFieldId) return;

    const el = document.getElementById(item.targetFieldId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      // Focus the input inside the target wrapper
      const inputEl =
        el.tagName === "INPUT" || el.tagName === "TEXTAREA"
          ? (el as HTMLElement)
          : (el.querySelector("input, textarea, button") as HTMLElement | null);

      if (inputEl) {
        inputEl.focus();
      }

      // Visual highlight animation
      el.classList.add(
        "ring-2",
        "ring-blue-500",
        "ring-offset-2",
        "transition-all",
        "duration-300"
      );
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-blue-500", "ring-offset-2");
      }, 1800);
    }
  };

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80",
          className
        )}
      >
        <ProgressCircle percentage={percentage} size={40} strokeWidth={4} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-slate-800">
              {percentage}% Completed
            </p>
            <span className="text-[11px] font-medium text-slate-500">
              {completedCount}/{totalCount}
            </span>
          </div>
          {pendingItems.length > 0 && (
            <p className="text-[11px] text-amber-700 font-medium truncate mt-0.5">
              Pending: {pendingItems.map((p) => p.label).join(", ")}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs mb-4 bg-gradient-to-br from-slate-50/70 via-white to-blue-50/30 border-slate-200/90",
        className
      )}
    >
      <div className="p-3.5 sm:p-4">
        {/* Top Header: Progress Circle + Percentage + Details Count */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative shrink-0">
            <ProgressCircle
              percentage={percentage}
              size={56}
              strokeWidth={5}
              showIconOnComplete={false}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Details Completion
              </h4>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
                {completedCount} of {totalCount} Filled
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">
              {pendingItems.length === 0
                ? "All inputs in this section have been filled."
                : `${percentage}% completed • ${pendingItems.length} detail${
                    pendingItems.length === 1 ? "" : "s"
                  } remaining to fill.`}
            </p>

            {/* Visual Micro Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-200/60">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out",
                  percentage === 100
                    ? "bg-emerald-500"
                    : percentage >= 60
                    ? "bg-blue-600"
                    : "bg-amber-500"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Remaining Details Still Pending List */}
        {pendingItems.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                Remaining details to fill ({pendingItems.length}):
              </span>
              <span className="text-[10px] text-slate-400">Click field to edit</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {pendingItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleFocusField(item)}
                  title={item.description || `Fill in ${item.label}`}
                  className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 shadow-2xs transition-all cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:bg-blue-500 transition-colors shrink-0" />
                  <span>{item.label}</span>
                  {item.isRequired && (
                    <span className="text-[10px] text-red-500 font-bold leading-none">*</span>
                  )}
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all ml-0.5 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
