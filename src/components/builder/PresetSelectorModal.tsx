"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { RESUME_PRESETS, PresetInfo } from "@/lib/resume/presets";
import { PresetId } from "@/lib/resume/types";
import { useResumeStore } from "@/store/resumeStore";
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  Code2,
  Building2,
  BookOpen,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { TemplateThumbnail } from "@/components/resume/TemplateThumbnail";

interface PresetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresetSelectorModal: React.FC<PresetSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { loadPreset, resume } = useResumeStore();
  const [selectedTrack, setSelectedTrack] = useState<"all" | "tech" | "non-tech" | "academic">("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "experienced" | "fresher">("all");

  const filteredPresets = RESUME_PRESETS.filter((preset) => {
    const trackMatch = selectedTrack === "all" || preset.track === selectedTrack;
    const levelMatch =
      selectedLevel === "all" ||
      (selectedLevel === "experienced" && preset.level === "experienced") ||
      (selectedLevel === "fresher" && preset.level === "fresher");
    return trackMatch && levelMatch;
  });

  const handleSelectPreset = (preset: PresetInfo) => {
    loadPreset(preset.id);
    onClose();
    toast.success(`Loaded "${preset.name}" starter profile`);
  };

  const getTrackIcon = (track: string) => {
    switch (track) {
      case "tech":
        return <Code2 className="w-4 h-4 text-blue-600" />;
      case "non-tech":
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case "academic":
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      default:
        return <Briefcase className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose a Resume or CV Starter Preset"
      description="Pick a pre-filled professional template tailored for your industry track and career level."
      maxWidth="2xl"
    >
      <div className="space-y-5 text-slate-900">
        {/* Track & Career Filter Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pb-2 border-b border-slate-200">
          {/* Track Tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTrack("all")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                selectedTrack === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Tracks
            </button>
            <button
              type="button"
              onClick={() => setSelectedTrack("tech")}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedTrack === "tech"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Tech & Developer
            </button>
            <button
              type="button"
              onClick={() => setSelectedTrack("non-tech")}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedTrack === "non-tech"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Business & Non-Tech
            </button>
            <button
              type="button"
              onClick={() => setSelectedTrack("academic")}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedTrack === "academic"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Academic CV
            </button>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-medium self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedLevel("all")}
              className={`px-2.5 py-0.5 rounded-md cursor-pointer transition-all ${
                selectedLevel === "all" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600"
              }`}
            >
              All Levels
            </button>
            <button
              type="button"
              onClick={() => setSelectedLevel("experienced")}
              className={`px-2.5 py-0.5 rounded-md cursor-pointer transition-all ${
                selectedLevel === "experienced" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600"
              }`}
            >
              Experienced
            </button>
            <button
              type="button"
              onClick={() => setSelectedLevel("fresher")}
              className={`px-2.5 py-0.5 rounded-md cursor-pointer transition-all ${
                selectedLevel === "fresher" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600"
              }`}
            >
              Fresher / Student
            </button>
          </div>
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {filteredPresets.map((preset) => (
            <div
              key={preset.id}
              className="border border-slate-200 hover:border-blue-500 rounded-xl p-4 bg-white hover:bg-slate-50/50 transition-all flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors">
                      {getTrackIcon(preset.track)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-950">{preset.name}</h4>
                      <p className="text-[11px] font-medium text-slate-600">{preset.role}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${preset.badgeColor}`}>
                    {preset.levelLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {preset.description}
                </p>

                {/* Mini Preview Thumbnail */}
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-100 mb-3 pointer-events-none">
                  <TemplateThumbnail
                    templateId={preset.recommendedTemplate}
                    resumeData={preset.data}
                    containerHeight="h-32"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Template: <strong className="text-slate-800 capitalize">{preset.recommendedTemplate}</strong>
                </span>
                <Button
                  size="sm"
                  onClick={() => handleSelectPreset(preset)}
                  className="gap-1 text-xs font-bold cursor-pointer"
                >
                  Load Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
