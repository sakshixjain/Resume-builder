"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { PersonalInfoForm } from "./sections/PersonalInfoForm";
import { SummaryForm } from "./sections/SummaryForm";
import { ExperienceForm } from "./sections/ExperienceForm";
import { EducationForm } from "./sections/EducationForm";
import { SkillsForm } from "./sections/SkillsForm";
import { ProjectsForm } from "./sections/ProjectsForm";
import { CertificationsForm } from "./sections/CertificationsForm";
import { LanguagesForm } from "./sections/LanguagesForm";
import { AchievementsForm } from "./sections/AchievementsForm";
import { CustomSectionForm } from "./sections/CustomSectionForm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  Languages,
  Trophy,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Layers,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const EditorPanel: React.FC = () => {
  const {
    resume,
    activeSection,
    setActiveSection,
    moveSection,
    toggleSectionVisibility,
    addCustomSection,
  } = useResumeStore();

  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const PRESET_CUSTOM_SECTIONS = [
    "Publications",
    "Volunteer Experience",
    "Awards & Honors",
    "Patents",
    "Interests & Hobbies",
    "References",
    "Speaking & Conferences",
  ];

  const handleCreateCustomSection = (title: string) => {
    if (!title.trim()) return;
    addCustomSection(title.trim());
    setIsAddSectionModalOpen(false);
    setNewSectionTitle("");
    toast.success(`Added "${title.trim()}" section`);
  };

  // Section meta descriptors with distinct vibrant color coding
  const getSectionMeta = (sectionKey: string) => {
    switch (sectionKey) {
      case "personalInfo":
        return {
          title: "Personal Information",
          icon: <User className="w-4 h-4 text-blue-400" />,
          iconBg: "bg-blue-950/80 border-blue-800 text-blue-400",
          borderAccent: "border-l-blue-500",
          badgeColor: "text-blue-400 bg-blue-950/80 border-blue-800",
          isFilled: !!resume.personalInfo.fullName && !!resume.personalInfo.email,
        };
      case "summary":
        return {
          title: "Professional Summary",
          icon: <FileText className="w-4 h-4 text-cyan-400" />,
          iconBg: "bg-cyan-950/80 border-cyan-800 text-cyan-400",
          borderAccent: "border-l-cyan-500",
          badgeColor: "text-cyan-400 bg-cyan-950/80 border-cyan-800",
          isFilled: !!resume.summary.trim(),
        };
      case "experience":
        return {
          title: "Work Experience",
          icon: <Briefcase className="w-4 h-4 text-indigo-400" />,
          iconBg: "bg-indigo-950/80 border-indigo-800 text-indigo-400",
          borderAccent: "border-l-indigo-500",
          badgeColor: "text-indigo-400 bg-indigo-950/80 border-indigo-800",
          isFilled: resume.experience.length > 0,
          count: resume.experience.length,
        };
      case "education":
        return {
          title: "Education",
          icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
          iconBg: "bg-amber-950/80 border-amber-800 text-amber-400",
          borderAccent: "border-l-amber-500",
          badgeColor: "text-amber-400 bg-amber-950/80 border-amber-800",
          isFilled: resume.education.length > 0,
          count: resume.education.length,
        };
      case "skills":
        return {
          title: "Skills & Proficiencies",
          icon: <Code2 className="w-4 h-4 text-emerald-400" />,
          iconBg: "bg-emerald-950/80 border-emerald-800 text-emerald-400",
          borderAccent: "border-l-emerald-500",
          badgeColor: "text-emerald-400 bg-emerald-950/80 border-emerald-800",
          isFilled: resume.skills.length > 0,
          count: resume.skills.length,
        };
      case "projects":
        return {
          title: "Projects",
          icon: <FolderGit2 className="w-4 h-4 text-rose-400" />,
          iconBg: "bg-rose-950/80 border-rose-800 text-rose-400",
          borderAccent: "border-l-rose-500",
          badgeColor: "text-rose-400 bg-rose-950/80 border-rose-800",
          isFilled: resume.projects.length > 0,
          count: resume.projects.length,
        };
      case "certifications":
        return {
          title: "Certifications",
          icon: <Award className="w-4 h-4 text-purple-400" />,
          iconBg: "bg-purple-950/80 border-purple-800 text-purple-400",
          borderAccent: "border-l-purple-500",
          badgeColor: "text-purple-400 bg-purple-950/80 border-purple-800",
          isFilled: resume.certifications.length > 0,
          count: resume.certifications.length,
        };
      case "languages":
        return {
          title: "Languages",
          icon: <Languages className="w-4 h-4 text-teal-400" />,
          iconBg: "bg-teal-950/80 border-teal-800 text-teal-400",
          borderAccent: "border-l-teal-500",
          badgeColor: "text-teal-400 bg-teal-950/80 border-teal-800",
          isFilled: resume.languages.length > 0,
          count: resume.languages.length,
        };
      case "achievements":
        return {
          title: "Key Achievements",
          icon: <Trophy className="w-4 h-4 text-yellow-400" />,
          iconBg: "bg-yellow-950/80 border-yellow-800 text-yellow-400",
          borderAccent: "border-l-yellow-500",
          badgeColor: "text-yellow-400 bg-yellow-950/80 border-yellow-800",
          isFilled: resume.achievements.length > 0,
          count: resume.achievements.length,
        };
      default:
        const customSec = resume.customSections?.find((cs) => cs.id === sectionKey);
        return {
          title: customSec?.title || "Custom Section",
          icon: <Layers className="w-4 h-4 text-fuchsia-400" />,
          iconBg: "bg-fuchsia-950/80 border-fuchsia-800 text-fuchsia-400",
          borderAccent: "border-l-fuchsia-500",
          badgeColor: "text-fuchsia-400 bg-fuchsia-950/80 border-fuchsia-800",
          isFilled: (customSec?.items.length || 0) > 0,
          count: customSec?.items.length || 0,
        };
    }
  };

  const renderSectionForm = (sectionKey: string) => {
    switch (sectionKey) {
      case "personalInfo":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "languages":
        return <LanguagesForm />;
      case "achievements":
        return <AchievementsForm />;
      default:
        const customSec = resume.customSections?.find((cs) => cs.id === sectionKey);
        if (!customSec) return null;
        return <CustomSectionForm section={customSec} />;
    }
  };

  const allSectionsToRender = ["personalInfo", ...resume.sectionOrder];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-100">
      {/* Top Banner Indicator */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Editor Sections
        </span>
        <span className="text-[10px] text-slate-400">
          Click section to expand & edit
        </span>
      </div>

      {/* Editor Content Scroll Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 pb-24">
        {allSectionsToRender.map((sectionKey) => {
          const meta = getSectionMeta(sectionKey);
          const isOpen = activeSection === sectionKey;
          const isVisible = resume.sectionVisibility[sectionKey] !== false;
          const isAnchored = sectionKey === "personalInfo";

          return (
            <div
              key={sectionKey}
              className={`border border-l-4 transition-all duration-150 ${meta.borderAccent} ${
                isOpen
                  ? "bg-slate-950 border-slate-700 shadow-xl"
                  : "bg-slate-950/80 border-slate-800/90 hover:border-slate-700"
              }`}
            >
              {/* Accordion Header */}
              <div
                className={`flex items-center justify-between p-3 select-none cursor-pointer transition-colors ${
                  isOpen ? "bg-slate-900/90 border-b border-slate-800" : "hover:bg-slate-900/60"
                }`}
                onClick={() => setActiveSection(isOpen ? "" : sectionKey)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 border flex items-center justify-center shrink-0 ${meta.iconBg}`}>
                    {meta.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {meta.title}
                      </h3>
                      {meta.isFilled && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    {meta.count !== undefined && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {meta.count} {meta.count === 1 ? "ENTRY" : "ENTRIES"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right controls: Reorder, Visibility, Accordion expand */}
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!isAnchored && (
                    <>
                      {/* Move Up */}
                      <button
                        type="button"
                        title="Move Up"
                        onClick={() => moveSection(sectionKey, "up")}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        title="Move Down"
                        onClick={() => moveSection(sectionKey, "down")}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Visibility Toggle */}
                      <button
                        type="button"
                        title={isVisible ? "Hide section in preview" : "Show section in preview"}
                        onClick={() => toggleSectionVisibility(sectionKey)}
                        className={`p-1 transition-colors cursor-pointer border ${
                          isVisible
                            ? "text-slate-400 hover:text-white hover:bg-slate-800 border-transparent hover:border-slate-700"
                            : "text-amber-400 bg-amber-950/60 border-amber-800"
                        }`}
                      >
                        {isVisible ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </>
                  )}

                  {/* Expand / Collapse */}
                  <button
                    type="button"
                    onClick={() => setActiveSection(isOpen ? "" : sectionKey)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors ml-0.5 cursor-pointer"
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="p-4 bg-slate-950 border-t border-slate-800 animate-in fade-in-50 duration-100">
                  {renderSectionForm(sectionKey)}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Section Button */}
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full py-3 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-950 text-slate-200 hover:text-cyan-300 font-bold text-xs shadow-lg transition-all"
            onClick={() => setIsAddSectionModalOpen(true)}
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            + Add New Custom Section
          </Button>
        </div>
      </div>

      {/* Add Custom Section Modal */}
      <Modal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        title="Add Custom Section"
        description="Choose a preset or create a custom section with your own title."
      >
        <div className="space-y-4">
          <div>
            <Label>Popular Section Presets</Label>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              {PRESET_CUSTOM_SECTIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleCreateCustomSection(preset)}
                  className="p-2.5 text-left text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-indigo-600 hover:text-white border border-slate-800 hover:border-indigo-600 transition-all cursor-pointer"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <Label>Or Custom Section Title</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Volunteer Work, Patents..."
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="text-xs"
              />
              <Button
                size="sm"
                onClick={() => handleCreateCustomSection(newSectionTitle)}
                disabled={!newSectionTitle.trim()}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
