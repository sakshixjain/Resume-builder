"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Modal } from "@/components/ui/Modal";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import {
  TemplateId,
  FontFamily,
  FontSize,
  Spacing,
} from "@/lib/resume/types";
import {
  Check,
  Palette,
  Type,
  LayoutTemplate,
  Sliders,
  Sparkles,
  Code2,
  Building2,
  BookOpen,
  ArrowRight,
  Zap,
  Grid,
  List,
  Eye,
} from "lucide-react";
import { TemplateThumbnail } from "@/components/resume/TemplateThumbnail";
import { ALL_TEMPLATES, RESUME_PRESETS, PresetInfo } from "@/lib/resume/presets";
import { toast } from "sonner";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: "Sapphire Blue", hex: "#2563eb", desc: "Tech & Universal" },
  { name: "Emerald Teal", hex: "#0f766e", desc: "Corporate & Finance" },
  { name: "Deep Navy", hex: "#1e3a8a", desc: "Formal & Executive" },
  { name: "Royal Violet", hex: "#7c3aed", desc: "Creative & Design" },
  { name: "Crimson Red", hex: "#ef4444", desc: "Bold & High-Energy" },
  { name: "Forest Green", hex: "#059669", desc: "Growth & Product" },
  { name: "Slate Charcoal", hex: "#334155", desc: "Minimalist & Clean" },
  { name: "Amber Gold", hex: "#b45309", desc: "Executive Leadership" },
  { name: "Indigo SaaS", hex: "#4f46e5", desc: "Engineering & Dev" },
  { name: "Sunset Coral", hex: "#e11d48", desc: "Modern & Vibrant" },
];

const FONT_OPTIONS: { id: FontFamily; name: string; fontClass: string; desc: string; sample: string }[] = [
  { id: "inter", name: "Inter", fontClass: "font-sans", desc: "Clean & Modern ATS", sample: "Alex Morgan • Senior Full Stack Engineer" },
  { id: "outfit", name: "Outfit", fontClass: "font-sans", desc: "Contemporary & Bold", sample: "Alex Morgan • Senior Full Stack Engineer" },
  { id: "roboto", name: "Roboto", fontClass: "font-sans", desc: "Neutral & Highly Legible", sample: "Alex Morgan • Senior Full Stack Engineer" },
  { id: "merriweather", name: "Merriweather", fontClass: "font-serif", desc: "Classic Editorial Serif", sample: "Alex Morgan • Senior Full Stack Engineer" },
  { id: "playfair", name: "Playfair", fontClass: "font-serif", desc: "Executive Header Serif", sample: "Alex Morgan • Senior Full Stack Engineer" },
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { resume, updateSettings, loadPreset, setMobileTab } = useResumeStore();
  const { settings } = resume;

  const [activeTab, setActiveTab] = useState<"templates" | "styles" | "presets">("templates");
  const [templateFilter, setTemplateFilter] = useState<"all" | "tech" | "non-tech" | "creative" | "academic">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTemplates = ALL_TEMPLATES.filter((tmpl) => {
    if (templateFilter === "all") return true;
    if (templateFilter === "tech") return tmpl.category === "tech" || tmpl.category === "universal";
    if (templateFilter === "non-tech") return tmpl.category === "non-tech" || tmpl.category === "universal";
    if (templateFilter === "creative") return tmpl.category === "creative" || tmpl.category === "universal";
    if (templateFilter === "academic") return tmpl.category === "academic" || tmpl.category === "universal";
    return true;
  });

  const handleApplyPreset = (preset: PresetInfo) => {
    loadPreset(preset.id);
    toast.success(`Loaded "${preset.name}" starter template & data`);
  };

  const handleSelectTemplate = (templateId: TemplateId, defaultColor: string) => {
    // Preserve active custom color if user already picked one, else use template default
    const newColor = settings.primaryColor || defaultColor;
    updateSettings({ template: templateId, primaryColor: newColor });
    toast.success(`Switched to ${templateId.toUpperCase()} template`);
  };

  const handleApplyAndPreview = () => {
    setMobileTab("preview");
    onClose();
  };

  const activeTemplateObj = ALL_TEMPLATES.find((t) => t.id === settings.template) || ALL_TEMPLATES[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume Design & Templates"
      description="Choose from 8 recruiter-approved templates, themes & typography."
      maxWidth="2xl"
      bodyClassName="p-0 overflow-y-auto"
    >
      <div className="flex flex-col text-slate-900 min-h-0">
        {/* Sticky Sub-Header: Main Tab Navigation */}
        <div className="px-3 sm:px-6 pt-1 pb-3 border-b border-slate-100 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveTab("templates")}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "templates"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Templates</span>
              <span className="text-[10px] text-blue-600 font-extrabold bg-blue-50 px-1.5 py-0.2 rounded-full border border-blue-200">
                8
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("styles")}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "styles"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Colors & Fonts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("presets")}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "presets"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Starter Kits</span>
              <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-1.5 py-0.2 rounded-full border border-amber-200">
                5
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="px-3 sm:px-6 py-3 space-y-4">
          {/* ========================================================= */}
          {/* TAB 1: TEMPLATES                                         */}
          {/* ========================================================= */}
          {activeTab === "templates" && (
            <div className="space-y-3.5">
              {/* Active Template Banner + View Mode Switcher */}
              <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 ring-2 ring-white"
                    style={{ backgroundColor: settings.primaryColor || activeTemplateObj.primaryColor }}
                  />
                  <div className="text-xs truncate">
                    <span className="text-slate-500">Active: </span>
                    <strong className="text-blue-900 font-bold">{activeTemplateObj.name}</strong>
                  </div>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-blue-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "grid" ? "bg-blue-600 text-white shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="2-Column Grid View"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "list" ? "bg-blue-600 text-white shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="1-Column Detailed View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
                <button
                  type="button"
                  onClick={() => setTemplateFilter("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 snap-start flex items-center gap-1.5 ${
                    templateFilter === "all"
                      ? "bg-slate-900 text-white shadow-2xs font-bold"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  All (8)
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateFilter("tech")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shrink-0 snap-start ${
                    templateFilter === "tech"
                      ? "bg-blue-600 text-white shadow-2xs font-bold"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  <Code2 className="w-3 h-3" /> Tech & Dev (4)
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateFilter("non-tech")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shrink-0 snap-start ${
                    templateFilter === "non-tech"
                      ? "bg-emerald-600 text-white shadow-2xs font-bold"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  <Building2 className="w-3 h-3" /> Corporate (3)
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateFilter("creative")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shrink-0 snap-start ${
                    templateFilter === "creative"
                      ? "bg-purple-600 text-white shadow-2xs font-bold"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  <Sparkles className="w-3 h-3" /> Creative (2)
                </button>
                <button
                  type="button"
                  onClick={() => setTemplateFilter("academic")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shrink-0 snap-start ${
                    templateFilter === "academic"
                      ? "bg-indigo-600 text-white shadow-2xs font-bold"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  <BookOpen className="w-3 h-3" /> Academic CV (1)
                </button>
              </div>

              {/* GRID VIEW (2-Columns on mobile & desktop) */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  {filteredTemplates.map((tmpl) => {
                    const isSelected = settings.template === tmpl.id;

                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => handleSelectTemplate(tmpl.id, tmpl.primaryColor)}
                        className={`p-2 sm:p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden group active:scale-[0.98] ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/40 shadow-xs"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs"
                        }`}
                      >
                        {/* Miniature Visual Preview */}
                        <div className="rounded-xl overflow-hidden border border-slate-200/90 mb-2 bg-slate-50 relative pointer-events-none">
                          <TemplateThumbnail
                            templateId={tmpl.id}
                            primaryColor={settings.primaryColor || tmpl.primaryColor}
                            containerHeight="h-28 sm:h-36"
                            resumeData={resume}
                          />
                          <span
                            className={`absolute top-1.5 right-1.5 text-[8.5px] sm:text-[9.5px] rounded-md font-bold border px-1.5 py-0.5 shadow-2xs ${tmpl.tagColor}`}
                          >
                            {tmpl.tag}
                          </span>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {tmpl.name}
                            </span>
                            {isSelected && (
                              <span className="flex items-center gap-0.5 text-[10px] font-black text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded-full shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight line-clamp-1">
                            {tmpl.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* DETAILED LIST VIEW (1-Column with large previews) */
                <div className="space-y-3">
                  {filteredTemplates.map((tmpl) => {
                    const isSelected = settings.template === tmpl.id;

                    return (
                      <div
                        key={tmpl.id}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row gap-3.5 bg-white ${
                          isSelected
                            ? "border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/30 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-2xs"
                        }`}
                      >
                        {/* Preview Box */}
                        <div className="w-full sm:w-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative shrink-0">
                          <TemplateThumbnail
                            templateId={tmpl.id}
                            primaryColor={settings.primaryColor || tmpl.primaryColor}
                            containerHeight="h-36 sm:h-36"
                            resumeData={resume}
                          />
                          <span
                            className={`absolute top-1.5 right-1.5 text-[9px] rounded-md font-bold border px-1.5 py-0.5 shadow-2xs ${tmpl.tagColor}`}
                          >
                            {tmpl.tag}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="text-sm font-bold text-slate-950">{tmpl.name}</h4>
                              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {tmpl.categoryLabel}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                              {tmpl.desc}
                            </p>
                            {/* Feature Pills */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {tmpl.features?.map((feat, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {isSelected ? "Currently Active" : "Tap to activate"}
                            </span>
                            <Button
                              size="sm"
                              variant={isSelected ? "outline" : "primary"}
                              onClick={() => handleSelectTemplate(tmpl.id, tmpl.primaryColor)}
                              className="rounded-xl px-4 text-xs font-bold cursor-pointer"
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5 mr-1 text-blue-600" />
                                  Active
                                </>
                              ) : (
                                "Select Template"
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: COLORS & TYPOGRAPHY                                */}
          {/* ========================================================= */}
          {activeTab === "styles" && (
            <div className="space-y-4">
              {/* 1. Theme Color Palette */}
              <div className="p-3.5 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 text-xs text-slate-900 font-bold">
                    <Palette className="w-4 h-4 text-indigo-600" />
                    Accent Theme Color
                  </Label>
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                    {settings.primaryColor}
                  </span>
                </div>

                {/* Swatches Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5">
                  {COLOR_PRESETS.map((color) => {
                    const isSelected = settings.primaryColor.toLowerCase() === color.hex.toLowerCase();

                    return (
                      <button
                        key={color.hex}
                        type="button"
                        title={`${color.name} (${color.desc})`}
                        onClick={() => updateSettings({ primaryColor: color.hex })}
                        className={`w-10 h-10 rounded-full transition-all cursor-pointer relative flex items-center justify-center mx-auto active:scale-95 ${
                          isSelected
                            ? "ring-3 ring-blue-600 ring-offset-2 scale-110 shadow-md"
                            : "border-2 border-white shadow-2xs hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white drop-shadow-xs stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Input */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: settings.primaryColor }}
                    />
                    <span className="text-xs text-slate-700 font-medium">Custom Color Picker:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded-xl border border-slate-300 bg-white cursor-pointer p-0.5 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Typography & Fonts */}
              <div className="p-3.5 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5">
                <Label className="flex items-center gap-1.5 text-xs text-slate-900 font-bold">
                  <Type className="w-4 h-4 text-indigo-600" />
                  Font Family & Typeface
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {FONT_OPTIONS.map((font) => {
                    const isSelected = settings.fontFamily === font.id;

                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => updateSettings({ fontFamily: font.id })}
                        className={`text-left px-3.5 py-2.5 text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer border active:scale-[0.99] ${
                          isSelected
                            ? "bg-blue-50 text-blue-900 font-bold border-blue-400 shadow-2xs ring-1 ring-blue-400/30"
                            : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${font.fontClass}`}>
                              {font.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({font.desc})
                            </span>
                          </div>
                          <span className={`block text-[11px] text-slate-500 truncate mt-0.5 ${font.fontClass}`}>
                            {font.sample}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Spacing & Scaling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Line Spacing */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-slate-900 font-bold block">
                      Document Spacing
                    </Label>
                    <span className="text-[10px] font-medium text-slate-500">
                      {settings.spacing === "compact"
                        ? "1-Page Fit"
                        : settings.spacing === "normal"
                        ? "Standard"
                        : "Spacious"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-slate-200/80 p-1 rounded-xl">
                    {(["compact", "normal", "relaxed"] as Spacing[]).map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => updateSettings({ spacing: sp })}
                        className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer capitalize text-center ${
                          settings.spacing === sp
                            ? "bg-white text-blue-700 shadow-2xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {sp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Scaling */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="flex items-center gap-1.5 text-xs text-slate-900 font-bold">
                      <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                      Font Scaling
                    </Label>
                    <span className="text-[10px] font-medium text-slate-500">
                      {settings.fontSize === "sm" ? "93%" : settings.fontSize === "md" ? "100%" : "105%"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-slate-200/80 p-1 rounded-xl">
                    {(["sm", "md", "lg"] as FontSize[]).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateSettings({ fontSize: size })}
                        className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                          settings.fontSize === size
                            ? "bg-white text-blue-700 shadow-2xs font-bold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: STARTER KITS (PRESETS)                             */}
          {/* ========================================================= */}
          {activeTab === "presets" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Load pre-filled industry resumes tailored with high-impact bullets and matching design:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RESUME_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    className="border border-slate-200 rounded-2xl p-3.5 bg-white hover:bg-slate-50/70 transition-all flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="font-bold text-xs text-slate-950">{preset.name}</span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${preset.badgeColor}`}>
                          {preset.levelLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3 line-clamp-2">
                        {preset.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        Template: <strong className="capitalize">{preset.recommendedTemplate}</strong>
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleApplyPreset(preset)}
                        className="text-xs font-bold rounded-xl px-3.5 h-8.5 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white"
                      >
                        Load Kit
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pinned Bottom Footer Bar */}
        <div className="px-3 sm:px-6 py-3 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-xs">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Changes applied live in real-time</span>
          </div>

          <Button
            onClick={handleApplyAndPreview}
            size="md"
            variant="primary"
            className="w-full sm:w-auto px-7 py-2.5 rounded-xl font-bold shadow-md shadow-blue-600/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <Eye className="w-4 h-4" />
            <span>Apply & View Resume</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
