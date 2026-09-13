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
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs text-slate-300 font-medium">
          Write a concise 2-4 sentence summary of your background, key strengths, and impact.
        </span>

        <Button
          type="button"
          variant="ai"
          size="sm"
          className="text-xs font-bold gap-1.5"
          onClick={() => setIsAiModalOpen(true)}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          Improve with AI
        </Button>
      </div>

      <Textarea
        placeholder="e.g. Results-driven Software Engineer with 5+ years of experience designing high-throughput web applications..."
        value={resume.summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={5}
        className="text-xs leading-relaxed font-sans"
      />

      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
        <span>RECOMMENDED: 40 - 80 WORDS</span>
        <span className={wordCount > 100 ? "text-amber-400 font-bold" : "text-cyan-400 font-bold"}>
          {wordCount} WORDS
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
          <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-800">
            {AI_ROLE_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => setSelectedRole(preset)}
                className={`px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer border ${
                  selectedRole.role === preset.role
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-xs"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700"
                }`}
              >
                {preset.role}
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {selectedRole.role}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 tracking-wider bg-cyan-950/80 border border-cyan-800 px-2 py-0.5">
                {selectedRole.category}
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950 p-3 border border-slate-800">
              "{selectedRole.summary}"
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAiModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="gradient"
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
