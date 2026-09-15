"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  LayoutTemplate,
  ArrowRight,
  Check,
  Eye,
  X,
  ZoomIn,
  ZoomOut,
  Code2,
  Building2,
  Sparkles,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { TemplateThumbnail } from "@/components/resume/TemplateThumbnail";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { initialResumeData } from "@/lib/resume/defaultResume";
import { TemplateId, Resume, PresetId } from "@/lib/resume/types";
import {
  techExperiencedResume,
  techFresherResume,
  nonTechExperiencedResume,
  nonTechFresherResume,
  academicCVData,
} from "@/lib/resume/presets";

interface TemplateCardInfo {
  id: TemplateId;
  title: string;
  tag: string;
  tagColor: string;
  category: "tech" | "non-tech" | "creative" | "academic" | "universal";
  categoryLabel: string;
  targetTrack: string;
  level: "experienced" | "fresher" | "all";
  defaultPreset: PresetId;
  description: string;
  primaryColor: string;
  features: string[];
}

const TEMPLATE_CARDS: TemplateCardInfo[] = [
  {
    id: "tech",
    title: "Tech & Engineering",
    tag: "Developer Focused",
    tagColor: "bg-blue-100 text-blue-800 border-blue-300",
    category: "tech",
    categoryLabel: "Tech & Software",
    targetTrack: "Software Engineers & Cloud Architects",
    level: "all",
    defaultPreset: "tech-experienced",
    description: "Code-inspired layout with categorized tech stack badges, GitHub spotlight, and systems throughput metrics.",
    primaryColor: "#2563eb",
    features: ["Tech Stack Pill Badges", "GitHub & Project Links", "System Performance Metrics", "Clean Code Aesthetic"],
  },
  {
    id: "corporate",
    title: "Corporate & Business",
    tag: "Business & Exec",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    category: "non-tech",
    categoryLabel: "Business & Non-Tech",
    targetTrack: "Finance, Operations, Marketing & HR",
    level: "experienced",
    defaultPreset: "nontech-experienced",
    description: "Refined business header with KPI metric highlights, leadership competencies, and executive styling for non-tech roles.",
    primaryColor: "#0f766e",
    features: ["Core Competencies Grid", "Revenue & ROI Impact", "Executive Header Strip", "P&L & Strategy Focus"],
  },
  {
    id: "creative",
    title: "Creative & Portfolio",
    tag: "Design & Marketing",
    tagColor: "bg-purple-100 text-purple-800 border-purple-300",
    category: "creative",
    categoryLabel: "Creative & Design",
    targetTrack: "Brand, UI/UX, Marketing & Content",
    level: "all",
    defaultPreset: "nontech-fresher",
    description: "Dynamic layout with modern typography, portfolio showcases, and storytelling summary for design & marketing.",
    primaryColor: "#7c3aed",
    features: ["Storytelling Narrative", "Portfolio Links Accent", "Soft Pill Skill Badges", "Aesthetic Typography"],
  },
  {
    id: "academic",
    title: "Academic & Research CV",
    tag: "Comprehensive CV",
    tagColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    category: "academic",
    categoryLabel: "Academic & Research",
    targetTrack: "PhDs, Postdocs, Faculty & Researchers",
    level: "all",
    defaultPreset: "academic-cv",
    description: "Comprehensive multi-page format featuring Publications, Research Grants, Conferences, and Formal Academic styling.",
    primaryColor: "#1e3a8a",
    features: ["Peer-Reviewed Publications", "Research Grants & Funding", "Teaching & Mentorship", "Multi-Page Standardized CV"],
  },
  {
    id: "modern",
    title: "Modern Sidebar",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-800 border-blue-300",
    category: "universal",
    categoryLabel: "Universal",
    targetTrack: "Tech, Product & Freshers",
    level: "all",
    defaultPreset: "tech-fresher",
    description: "Two-column design with colorful sidebar accents, structured timeline, and skill badges. Highly versatile.",
    primaryColor: "#2563eb",
    features: ["Two-Column Layout", "Sidebar Contact & Skills", "Visual Experience Timeline", "Recruiter Favorite"],
  },
  {
    id: "professional",
    title: "Professional ATS",
    tag: "ATS-Optimized",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    category: "universal",
    categoryLabel: "Universal",
    targetTrack: "All Industries & Enterprise ATS",
    level: "all",
    defaultPreset: "nontech-experienced",
    description: "Traditional single-column layout strictly formatted to achieve top scores in Applicant Tracking Systems.",
    primaryColor: "#0f766e",
    features: ["100% ATS-Compliant", "Single-Column Flow", "Clean Section Dividers", "Standard Font Hierarchy"],
  },
  {
    id: "minimal",
    title: "Minimalist Swiss",
    tag: "Ultra Clean",
    tagColor: "bg-slate-100 text-slate-800 border-slate-300",
    category: "universal",
    categoryLabel: "Universal",
    targetTrack: "Clean Scandinavian Aesthetic",
    level: "all",
    defaultPreset: "tech-experienced",
    description: "Refined Scandinavian typography with numbered sections, generous whitespace, and high readability.",
    primaryColor: "#334155",
    features: ["Generous Whitespace", "Numbered Section Headers", "Editorial Typography", "Modern Aesthetic"],
  },
  {
    id: "executive",
    title: "Executive Leadership",
    tag: "Senior Roles",
    tagColor: "bg-amber-100 text-amber-800 border-amber-300",
    category: "non-tech",
    categoryLabel: "Business & Non-Tech",
    targetTrack: "VPs, Directors & Senior Leads",
    level: "experienced",
    defaultPreset: "nontech-experienced",
    description: "High-contrast top banner header with metric grid containers engineered for directors and tech leads.",
    primaryColor: "#b45309",
    features: ["Header Card Banner", "Core Competencies Grid", "Highlight Projects", "Leadership Ready"],
  },
];

export const TemplateShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateId | null>(null);
  const [modalZoom, setModalZoom] = useState(0.75);

  const activeTemplateInfo = TEMPLATE_CARDS.find((t) => t.id === previewTemplate);

  const filteredCards = TEMPLATE_CARDS.filter((card) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "tech") return card.category === "tech" || card.category === "universal";
    if (activeFilter === "non-tech") return card.category === "non-tech" || card.category === "universal";
    if (activeFilter === "creative") return card.category === "creative";
    if (activeFilter === "academic") return card.category === "academic";
    if (activeFilter === "fresher") return card.level === "fresher" || card.id === "modern" || card.id === "tech";
    return true;
  });

  const getPreviewResumeData = (tmplId: TemplateId): Resume => {
    switch (tmplId) {
      case "tech":
        return techExperiencedResume;
      case "corporate":
        return nonTechExperiencedResume;
      case "creative":
        return nonTechFresherResume;
      case "academic":
        return academicCVData;
      case "modern":
        return techFresherResume;
      default:
        const card = TEMPLATE_CARDS.find((t) => t.id === tmplId);
        return {
          ...initialResumeData,
          settings: {
            ...initialResumeData.settings,
            template: tmplId,
            primaryColor: card?.primaryColor || "#2563eb",
          },
        };
    }
  };

  return (
    <section id="templates" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
            8 PRO RESUME & CV TEMPLATES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 uppercase text-slate-950">
            Tailored for Tech & Non-Tech Careers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Choose from 8 industry-tested layouts with dedicated support for Experienced Professionals, Freshers & Students, and Academic CVs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-slate-950 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Templates (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("tech")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === "tech"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Tech & Engineering
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("non-tech")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === "non-tech"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Business & Non-Tech
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("creative")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === "creative"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Creative & Marketing
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("academic")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === "academic"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Academic & Research CV
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("fresher")}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === "fresher"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-700 border border-slate-200"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Fresher & Student Friendly
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((tmpl) => (
            <div
              key={tmpl.id}
              className="border border-slate-300 bg-white rounded-xl p-4 hover:border-blue-600 transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Visual Real Template Preview Frame */}
                <div className="relative rounded-lg overflow-hidden border border-slate-200 mb-4 bg-slate-100 group/thumb">
                  {/* Real Scaled Template Thumbnail */}
                  <TemplateThumbnail
                    templateId={tmpl.id}
                    primaryColor={tmpl.primaryColor}
                    containerHeight="h-72"
                    resumeData={getPreviewResumeData(tmpl.id)}
                  />

                  {/* Badge */}
                  <span
                    className={`absolute top-2.5 right-2.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded shadow-xs z-10 ${tmpl.tagColor}`}
                  >
                    {tmpl.tag}
                  </span>

                  {/* Interactive Hover Overlay with Quick Preview */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 z-20 backdrop-blur-[1px]">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setPreviewTemplate(tmpl.id)}
                      className="w-36 font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      Quick Preview
                    </Button>
                    <Link href={`/builder?template=${tmpl.id}&preset=${tmpl.defaultPreset}`} className="w-36">
                      <Button
                        type="button"
                        variant="gradient"
                        size="sm"
                        className="w-full font-bold shadow-md flex items-center justify-center gap-1.5 text-xs"
                      >
                        Use Template
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {tmpl.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl.id)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                </div>

                <p className="text-[11px] font-semibold text-slate-500 mb-2">
                  Best for: {tmpl.targetTrack}
                </p>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {tmpl.description}
                </p>

                {/* Features list */}
                <ul className="space-y-1.5 mb-5 text-[11px] text-slate-700 font-medium">
                  {tmpl.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Link */}
              <Link href={`/builder?template=${tmpl.id}&preset=${tmpl.defaultPreset}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between font-bold bg-white text-slate-800 border-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen / Modal High-Res Template Preview */}
      {previewTemplate && activeTemplateInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setPreviewTemplate(null)}
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col max-h-[92vh] z-10 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950 text-white">
              <div className="flex items-center gap-3">
                <span className="font-bold text-base text-white">
                  {activeTemplateInfo.title}
                </span>
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${activeTemplateInfo.tagColor}`}>
                  {activeTemplateInfo.tag}
                </span>
              </div>

              {/* Template Switcher Buttons */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {TEMPLATE_CARDS.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setPreviewTemplate(tmpl.id)}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                      previewTemplate === tmpl.id
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {tmpl.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700 text-xs text-slate-300">
                  <button
                    onClick={() => setModalZoom((z) => Math.max(0.4, z - 0.1))}
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] px-1">{Math.round(modalZoom * 100)}%</span>
                  <button
                    onClick={() => setModalZoom((z) => Math.min(1.2, z + 0.1))}
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Canvas */}
            <div className="flex-1 overflow-auto bg-slate-950/90 p-4 sm:p-8 flex justify-center items-start">
              <div
                style={{
                  transform: `scale(${modalZoom})`,
                  transformOrigin: "top center",
                }}
                className="transition-transform duration-150 shadow-2xl rounded"
              >
                <ResumePreview resume={getPreviewResumeData(previewTemplate)} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-t border-slate-800">
              <p className="text-xs text-slate-400 hidden sm:block">
                All templates support instantaneous live A4 editing, custom colors, fonts, and 1-click vector PDF download.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewTemplate(null)}
                  className="bg-transparent text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white font-medium cursor-pointer"
                >
                  Close
                </Button>
                <Link href={`/builder?template=${previewTemplate}&preset=${activeTemplateInfo.defaultPreset}`}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <span>Use {activeTemplateInfo.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
