"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Sparkles,
  Building2,
  MapPin,
  Check,
} from "lucide-react";
import { generateBulletImprovements } from "@/lib/resume/aiPrompts";
import { toast } from "sonner";

export const ExperienceForm: React.FC = () => {
  const { resume, addExperience, updateExperience, deleteExperience } =
    useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(
    resume.experience[0]?.id || null
  );

  const [aiTargetExpId, setAiTargetExpId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleOpenAiModal = (expId: string, currentDesc: string) => {
    setAiTargetExpId(expId);
    setSuggestions(generateBulletImprovements(currentDesc));
  };

  const handleApplyAiSuggestion = (bulletText: string) => {
    if (!aiTargetExpId) return;
    const currentExp = resume.experience.find((e) => e.id === aiTargetExpId);
    if (!currentExp) return;

    const newDesc = currentExp.description
      ? `${currentExp.description}\n• ${bulletText}`
      : `• ${bulletText}`;

    updateExperience(aiTargetExpId, { description: newDesc });
    setAiTargetExpId(null);
    toast.success("Added enhanced bullet point!");
  };

  return (
    <div className="space-y-4">
      {resume.experience.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No work experience added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
            onClick={addExperience}
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            Add First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {resume.experience.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 cursor-pointer select-none transition-colors border-b border-slate-100"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center border border-blue-100">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {exp.jobTitle || "Untitled Position"}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {exp.company || "Company"} •{" "}
                        {exp.current ? "Present" : exp.endDate || "Date"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExperience(exp.id);
                        toast.info("Removed experience entry");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form Fields Body */}
                {isExpanded && (
                  <div className="p-4 space-y-3.5 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <Label required>Job Title</Label>
                        <Input
                          placeholder="e.g. Senior Software Engineer"
                          value={exp.jobTitle}
                          onChange={(e) =>
                            updateExperience(exp.id, { jobTitle: e.target.value })
                          }
                          leftIcon={<Briefcase className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label required>Company Name</Label>
                        <Input
                          placeholder="e.g. Acme Corporation"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, { company: e.target.value })
                          }
                          leftIcon={<Building2 className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label>Location</Label>
                        <Input
                          placeholder="e.g. San Francisco, CA (or Remote)"
                          value={exp.location || ""}
                          onChange={(e) =>
                            updateExperience(exp.id, { location: e.target.value })
                          }
                          leftIcon={<MapPin className="w-4 h-4" />}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label required>Start Date</Label>
                          <Input
                            type="text"
                            placeholder="YYYY-MM (e.g. 2022-03)"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(exp.id, {
                                startDate: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="text"
                            placeholder="YYYY-MM"
                            disabled={exp.current}
                            value={exp.current ? "Present" : exp.endDate || ""}
                            onChange={(e) =>
                              updateExperience(exp.id, { endDate: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? "" : exp.endDate,
                          })
                        }
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="text-xs text-slate-700 font-medium cursor-pointer select-none"
                      >
                        I currently work in this role
                      </label>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <Label>Description & Key Achievements</Label>
                        <Button
                          type="button"
                          variant="ai"
                          size="sm"
                          className="text-[11px] h-6 px-2.5 font-semibold rounded-md"
                          onClick={() => handleOpenAiModal(exp.id, exp.description)}
                        >
                          <Sparkles className="w-3 h-3 text-blue-600 mr-1" />
                          AI Bullet Polish
                        </Button>
                      </div>
                      <Textarea
                        placeholder="• Spearheaded architecture of high-load API microservices handling 10k RPS&#10;• Reduced query latency by 35% through Redis caching"
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        className="w-full text-xs font-semibold border border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 hover:bg-blue-50/40 text-blue-600 rounded-xl py-2.5 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        onClick={addExperience}
      >
        <Plus className="w-4 h-4" />
        Add Another Experience
      </button>

      {/* AI Bullet Suggestions Modal */}
      <Modal
        isOpen={!!aiTargetExpId}
        onClose={() => setAiTargetExpId(null)}
        title="AI Action Bullet Enhancer"
        description="Pick an impactful, metric-driven bullet point to append to your job description."
      >
        <div className="space-y-2.5">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-colors flex items-start justify-between gap-3 cursor-pointer group shadow-2xs"
              onClick={() => handleApplyAiSuggestion(suggestion)}
            >
              <p className="text-xs text-slate-700 leading-relaxed">
                • {suggestion}
              </p>
              <Button size="sm" className="shrink-0 text-xs font-semibold gap-1 rounded-lg">
                <Check className="w-3 h-3" />
                Add
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

