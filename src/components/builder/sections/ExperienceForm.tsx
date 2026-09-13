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
    <div className="space-y-3">
      {resume.experience.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 bg-slate-900/50">
          <Briefcase className="w-7 h-7 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No work experience added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-bold bg-slate-900 text-white border-slate-700"
            onClick={addExperience}
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            Add First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {resume.experience.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className="border border-slate-800 bg-slate-950 shadow-md transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-900 cursor-pointer select-none transition-colors border-b border-slate-800/80"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-indigo-600 text-white text-xs font-bold font-mono flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {exp.jobTitle || "Untitled Position"}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {exp.company || "Company"} •{" "}
                        {exp.current ? "Present" : exp.endDate || "Date"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExperience(exp.id);
                        toast.info("Removed experience entry");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <button
                      type="button"
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form Fields Body */}
                {isExpanded && (
                  <div className="p-4 space-y-3 bg-slate-950">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          placeholder="e.g. New York, NY (or Remote)"
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
                        className="border-slate-700 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="text-xs text-slate-300 font-semibold cursor-pointer select-none"
                      >
                        I currently work in this role
                      </label>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <Label>Description & Key Achievements</Label>
                        <Button
                          type="button"
                          variant="ai"
                          size="sm"
                          className="text-[11px] h-6 px-2 font-bold"
                          onClick={() => handleOpenAiModal(exp.id, exp.description)}
                        >
                          <Sparkles className="w-3 h-3 text-cyan-300 mr-1" />
                          AI Bullet Polish
                        </Button>
                      </div>
                      <Textarea
                        placeholder="• Spearheaded architecture of high-load API microservices handling 10k RPS&#10;• Reduced latency by 35% through query optimization"
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="font-mono text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full text-xs font-bold border-dashed border-slate-700 hover:border-cyan-500 bg-slate-950 text-slate-300 hover:text-cyan-300 py-2.5"
        onClick={addExperience}
      >
        <Plus className="w-3.5 h-3.5 text-cyan-400" />
        Add Another Experience
      </Button>

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
              className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/80 transition-colors flex items-start justify-between gap-3 cursor-pointer group"
              onClick={() => handleApplyAiSuggestion(suggestion)}
            >
              <p className="text-xs text-slate-200 leading-relaxed">
                • {suggestion}
              </p>
              <Button size="sm" variant="gradient" className="shrink-0 text-xs font-bold gap-1">
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
