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
  PresetId,
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
} from "lucide-react";
import { TemplateThumbnail } from "@/components/resume/TemplateThumbnail";
import { ALL_TEMPLATES, RESUME_PRESETS, PresetInfo } from "@/lib/resume/presets";
import { toast } from "sonner";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: "Sapphire Blue", hex: "#2563eb" },
  { name: "Emerald Green", hex: "#0f766e" },
  { name: "Royal Purple", hex: "#7c3aed" },
  { name: "Amber Orange", hex: "#b45309" },
  { name: "Deep Navy", hex: "#1e3a8a" },
  { name: "Slate Charcoal", hex: "#334155" },
  { name: "Crimson Red", hex: "#ef4444" },
  { name: "Teal Ocean", hex: "#0d9488" },
];

const FONT_OPTIONS: { id: FontFamily; name: string; fontClass: string; desc: string }[] = [
  { id: "inter", name: "Inter", fontClass: "font-sans", desc: "Clean, ultra-modern tech sans-serif" },
  { id: "outfit", name: "Outfit", fontClass: "font-sans", desc: "Geometric & contemporary" },
  { id: "roboto", name: "Roboto", fontClass: "font-sans", desc: "Structured, neutral geometry" },
  { id: "merriweather", name: "Merriweather", fontClass: "font-serif", desc: "Classic editorial & academic serif" },
  { id: "playfair", name: "Playfair Display", fontClass: "font-serif", desc: "High-contrast heading serif" },
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { resume, updateSettings, loadPreset } = useResumeStore();
  const { settings } = resume;

  const [activeTab, setActiveTab] = useState<"templates" | "presets" | "styles">("templates");
  const [templateFilter, setTemplateFilter] = useState<"all" | "tech" | "non-tech" | "creative" | "academic">("all");

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
    toast.success(`Loaded "${preset.name}" profile and settings`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customize Resume & Templates"
      description="Select from 8 recruiter-tested templates, track presets, typography, and color schemes."
      maxWidth="2xl"
    >
      <div className="space-y-5 text-slate-900">
        {/* Main Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("templates")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "templates"
                ? "bg-white text-slate-950 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
            Resume Templates (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("presets")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "presets"
                ? "bg-white text-slate-950 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Starter Presets (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("styles")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "styles"
                ? "bg-white text-slate-950 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            Colors & Fonts
          </button>
        </div>

        {/* TAB 1: TEMPLATES */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setTemplateFilter("all")}
                className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                  templateFilter === "all" ? "bg-slate-900 text-white shadow-2xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All (8)
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter("tech")}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  templateFilter === "tech" ? "bg-blue-600 text-white shadow-2xs" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                <Code2 className="w-3 h-3" /> Tech & Dev
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter("non-tech")}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  templateFilter === "non-tech" ? "bg-emerald-600 text-white shadow-2xs" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                <Building2 className="w-3 h-3" /> Corporate / Non-Tech
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter("creative")}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  templateFilter === "creative" ? "bg-purple-600 text-white shadow-2xs" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                <Sparkles className="w-3 h-3" /> Creative & Portfolio
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter("academic")}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  templateFilter === "academic" ? "bg-indigo-600 text-white shadow-2xs" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                <BookOpen className="w-3 h-3" /> Academic CV
              </button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[50vh] overflow-y-auto pr-1">
              {filteredTemplates.map((tmpl) => {
                const isSelected = settings.template === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    onClick={() => updateSettings({ template: tmpl.id, primaryColor: tmpl.primaryColor })}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Miniature Visual Preview */}
                    <div className="rounded-lg overflow-hidden border border-slate-200 mb-2.5 bg-slate-50 relative pointer-events-none">
                      <TemplateThumbnail
                        templateId={tmpl.id}
                        primaryColor={settings.primaryColor || tmpl.primaryColor}
                        containerHeight="h-32"
                        resumeData={resume}
                      />
                      <span className={`absolute top-2 right-2 text-[9px] rounded font-semibold border px-1.5 py-0.5 shadow-2xs ${tmpl.tagColor}`}>
                        {tmpl.tag}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          {tmpl.name}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                            <Check className="w-3 h-3" /> ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {tmpl.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STARTER PRESETS */}
        {activeTab === "presets" && (
          <div className="space-y-3.5">
            <p className="text-xs text-slate-600">
              Select a starter kit to automatically populate full sample content tailored for your specific role and experience level.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {RESUME_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="border border-slate-200 rounded-xl p-3.5 bg-white hover:bg-slate-50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="font-bold text-xs text-slate-900">{preset.name}</span>
                      <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${preset.badgeColor}`}>
                        {preset.levelLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                      {preset.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10.5px] text-slate-500">
                      Template: <strong>{preset.recommendedTemplate}</strong>
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleApplyPreset(preset)}
                      className="text-xs font-bold cursor-pointer"
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

        {/* TAB 3: STYLES & TYPOGRAPHY */}
        {activeTab === "styles" && (
          <div className="space-y-6">
            {/* Color Palette */}
            <div>
              <Label className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold mb-2">
                <Palette className="w-4 h-4 text-indigo-600" />
                Accent Theme Color
              </Label>

              <div className="flex flex-wrap items-center gap-3">
                {COLOR_PRESETS.map((color) => {
                  const isSelected = settings.primaryColor.toLowerCase() === color.hex.toLowerCase();

                  return (
                    <button
                      key={color.hex}
                      type="button"
                      title={color.name}
                      onClick={() => updateSettings({ primaryColor: color.hex })}
                      className={`w-8 h-8 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                        isSelected
                          ? "ring-2 ring-blue-500 ring-offset-2 scale-110 shadow-xs"
                          : "border border-slate-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
                    </button>
                  );
                })}

                {/* Custom Hex input */}
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200 ml-2">
                  <span className="text-[11px] font-medium text-slate-500">Custom:</span>
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white cursor-pointer p-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Typography & Sizing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <Label className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold mb-2">
                  <Type className="w-4 h-4 text-indigo-600" />
                  Font Family
                </Label>
                <div className="space-y-1.5">
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => updateSettings({ fontFamily: font.id })}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer border ${
                        settings.fontFamily === font.id
                          ? "bg-blue-50 text-blue-700 font-semibold border-blue-300 shadow-2xs"
                          : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div>
                        <span className={font.fontClass}>{font.name}</span>
                        <span className="text-[10px] text-slate-400 ml-2">({font.desc})</span>
                      </div>
                      {settings.fontFamily === font.id && (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3.5">
                {/* Font Size */}
                <div>
                  <Label className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold mb-1.5">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    Font Scaling
                  </Label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    {(["sm", "md", "lg"] as FontSize[]).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateSettings({ fontSize: size })}
                        className={`py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          settings.fontSize === size
                            ? "bg-white text-blue-600 shadow-2xs font-semibold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Spacing */}
                <div>
                  <Label className="text-xs text-slate-800 font-semibold mb-1.5 block">
                    Line Spacing
                  </Label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    {(["compact", "normal", "relaxed"] as Spacing[]).map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => updateSettings({ spacing: sp })}
                        className={`py-1 text-xs font-medium rounded-md transition-colors cursor-pointer capitalize ${
                          settings.spacing === sp
                            ? "bg-white text-blue-600 shadow-2xs font-semibold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {sp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icons Toggle */}
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-xs font-medium text-slate-700">
                    Show Icons in Sections
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.showIcons}
                    onChange={(e) => updateSettings({ showIcons: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button onClick={onClose} size="md" variant="primary" className="px-5">
            Apply & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
