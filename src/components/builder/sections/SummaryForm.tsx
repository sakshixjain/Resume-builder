"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Sparkles, Check } from "lucide-react";
import { AI_ROLE_PRESETS } from "@/lib/resume/aiPrompts";
import { toast } from "sonner";

export const SummaryForm: React.FC = () => {
  const { resume, updateSummary } = useResumeStore();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(AI_ROLE_PRESETS[0]);

  const handleApplyPreset = (text: string) => {
    updateSummary(text);
    setIsAiModalOpen(false);
    toast.success("Applied AI summary suggestion!");
  };

  const wordCount = resume.summary.trim() ? resume.summary.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs text-slate-500">
          Write a concise 2-4 sentence summary of your background, key strengths, and career achievements.
        </span>

        <Button
          type="button"
          variant="ai"
          size="sm"
          className="text-xs font-semibold gap-1.5 rounded-lg"
          onClick={() => setIsAiModalOpen(true)}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Improve with AI
        </Button>
      </div>

      <Textarea
        placeholder="e.g. Results-driven Senior Full Stack Software Engineer with 6+ years of experience architecting high-throughput distributed web systems..."
        value={resume.summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={5}
        className="text-xs leading-relaxed"
      />

      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Recommended: 40 - 80 words</span>
        <span className={wordCount > 100 ? "text-amber-600 font-semibold" : "text-blue-600 font-semibold"}>
          {wordCount} words
        </span>
      </div>

      {/* AI Suggestions Modal */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Summary Assistant"
        description="Select a role-tailored summary preset or generate an enhanced version."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-100">
            {AI_ROLE_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => setSelectedRole(preset)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                  selectedRole.role === preset.role
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {preset.role}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {selectedRole.role}
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                {selectedRole.category}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3.5 rounded-lg border border-slate-200">
              &ldquo;{selectedRole.summary}&rdquo;
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setIsAiModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="rounded-lg"
                onClick={() => handleApplyPreset(selectedRole.summary)}
              >
                <Check className="w-3.5 h-3.5" />
                Apply This Summary
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

