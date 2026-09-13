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
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Folder,
  Award,
  Globe,
  Trophy,
  ChevronRight,
  ChevronDown,
  Check,
  Plus,
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
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
    "Volunteer Experience",
    "Publications",
    "Awards & Honors",
    "Patents",
    "Interests & Hobbies",
    "References",
    "Conferences",
  ];

  const handleCreateCustomSection = (title: string) => {
    if (!title.trim()) return;
    addCustomSection(title.trim());
    setIsAddSectionModalOpen(false);
    setNewSectionTitle("");
    toast.success(`Added "${title.trim()}" section`);
  };

  // Section meta descriptors matching the reference UI
  const getSectionMeta = (sectionKey: string) => {
    switch (sectionKey) {
      case "personalInfo":
        return {
          title: "Personal Information",
          subtitle: "Basic details about you",
          expandedSubtitle: "Tell us about yourself. This information will appear at the top of your resume.",
          icon: <User className="w-5 h-5 text-blue-600" />,
          iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
          isFilled: !!resume.personalInfo.fullName && !!resume.personalInfo.email,
        };
      case "summary":
        return {
          title: "Professional Summary",
          subtitle: "A short introduction",
          expandedSubtitle: "Write a compelling professional summary highlighting your key strengths.",
          icon: <FileText className="w-5 h-5 text-teal-600" />,
          iconBg: "bg-teal-50 text-teal-600 border border-teal-100",
          isFilled: !!resume.summary.trim(),
        };
      case "education":
        const eduCount = resume.education.length;
        return {
          title: "Education",
          subtitle: `${eduCount} ${eduCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "List your academic qualifications, degrees, GPA, and graduation dates.",
          icon: <GraduationCap className="w-5 h-5 text-orange-600" />,
          iconBg: "bg-orange-50 text-orange-600 border border-orange-100",
          isFilled: eduCount > 0,
        };
      case "experience":
        const expCount = resume.experience.length;
        return {
          title: "Work Experience",
          subtitle: `${expCount} ${expCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "Highlight your career history, key responsibilities, and achievements.",
          icon: <Briefcase className="w-5 h-5 text-purple-600" />,
          iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
          isFilled: expCount > 0,
        };
      case "skills":
        const skCount = resume.skills.length;
        return {
          title: "Skills & Proficiencies",
          subtitle: `${skCount} ${skCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "Add technical skills, programming languages, frameworks, and tools.",
          icon: <Code2 className="w-5 h-5 text-emerald-600" />,
          iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
          isFilled: skCount > 0,
        };
      case "projects":
        const prjCount = resume.projects.length;
        return {
          title: "Projects",
          subtitle: `${prjCount} ${prjCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "Showcase notable projects, live demo links, and tech stacks.",
          icon: <Folder className="w-5 h-5 text-rose-600" />,
          iconBg: "bg-rose-50 text-rose-600 border border-rose-100",
          isFilled: prjCount > 0,
        };
      case "certifications":
        const certCount = resume.certifications.length;
        return {
          title: "Certifications",
          subtitle: `${certCount} ${certCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "Include industry credentials, accredited licenses, and certifications.",
          icon: <Award className="w-5 h-5 text-fuchsia-600" />,
          iconBg: "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100",
          isFilled: certCount > 0,
        };
      case "languages":
        const langCount = resume.languages.length;
        return {
          title: "Languages",
          subtitle: `${langCount} ${langCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "List languages you speak along with proficiency levels.",
          icon: <Globe className="w-5 h-5 text-sky-600" />,
          iconBg: "bg-sky-50 text-sky-600 border border-sky-100",
          isFilled: langCount > 0,
        };
      case "achievements":
        const achCount = resume.achievements.length;
        return {
          title: "Key Achievements",
          subtitle: `${achCount} ${achCount === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "Highlight major awards, competitions, and key recognitions.",
          icon: <Trophy className="w-5 h-5 text-yellow-600" />,
          iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
          isFilled: achCount > 0,
        };
      default:
        const customSec = resume.customSections?.find((cs) => cs.id === sectionKey);
        const count = customSec?.items.length || 0;
        return {
          title: customSec?.title || "Custom Section",
          subtitle: `${count} ${count === 1 ? "entry" : "entries"}`,
          expandedSubtitle: "Custom section items and details.",
          icon: <Layers className="w-5 h-5 text-indigo-600" />,
          iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
          isFilled: count > 0,
        };
    }
  };

  const renderSectionForm = (sectionKey: string) => {
    switch (sectionKey) {
      case "personalInfo":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
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
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 text-slate-900">
      {/* Top Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">
          Edit Your Resume
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Fill in your details and see the changes live
        </p>
      </div>

      {/* Section Cards Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-3 pb-20">
        {allSectionsToRender.map((sectionKey) => {
          const meta = getSectionMeta(sectionKey);
          const isOpen = activeSection === sectionKey;
          const isVisible = resume.sectionVisibility[sectionKey] !== false;
          const isAnchored = sectionKey === "personalInfo";

          return (
            <div
              key={sectionKey}
              className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
                isOpen
                  ? "border-blue-500/80 ring-2 ring-blue-500/10 shadow-sm bg-white"
                  : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-2xs"
              }`}
            >
              {/* Card Header */}
              <div
                className={`p-3.5 sm:p-4 flex items-center justify-between cursor-pointer select-none transition-colors ${
                  isOpen ? "bg-white border-b border-slate-100" : "bg-white hover:bg-slate-50/40"
                }`}
                onClick={() => setActiveSection(isOpen ? "" : sectionKey)}
              >
                {/* Left: Icon, Title, Subtitle */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${meta.iconBg}`}
                  >
                    {meta.icon}
                  </div>

                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {meta.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {isOpen ? meta.expandedSubtitle : meta.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Status Pill & Chevron */}
                <div
                  className="flex items-center gap-2.5 shrink-0 ml-2"
                  onClick={(e) => isOpen && e.stopPropagation()}
                >
                  {/* Reorder and Visibility controls when open */}
                  {isOpen && !isAnchored && (
                    <div className="flex items-center gap-1 mr-1">
                      <button
                        type="button"
                        title="Move Up"
                        onClick={() => moveSection(sectionKey, "up")}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Move Down"
                        onClick={() => moveSection(sectionKey, "down")}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        title={isVisible ? "Hide in preview" : "Show in preview"}
                        onClick={() => toggleSectionVisibility(sectionKey)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                      >
                        {isVisible ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Completed Green Badge Pill when open or checkmark when collapsed */}
                  {meta.isFilled && (
                    isOpen ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        Completed
                      </span>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )
                  )}

                  {/* Chevron Indicator */}
                  {isOpen ? (
                    <div className="p-1 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                      <ChevronDown className="w-5 h-5 rotate-180" />
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
              </div>


              {/* Expanded Sub-form Content */}
              {isOpen && (
                <div className="p-4 sm:p-5 bg-white animate-in fade-in duration-150">
                  {renderSectionForm(sectionKey)}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Custom Section Button */}
        <div
          onClick={() => setIsAddSectionModalOpen(true)}
          className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/20 hover:bg-blue-50/50 p-3.5 sm:p-4 flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-blue-600">
                Add Custom Section
              </h2>
              <p className="text-xs text-slate-400">
                Add achievements, interests, volunteer work, etc.
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-blue-400" />
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              {PRESET_CUSTOM_SECTIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleCreateCustomSection(preset)}
                  className="p-2.5 text-left text-xs font-medium text-slate-800 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-lg transition-all cursor-pointer"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
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
