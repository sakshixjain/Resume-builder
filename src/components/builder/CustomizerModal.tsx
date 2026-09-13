"use client";

import React from "react";
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
import { Check, Palette, Type, LayoutTemplate, Sliders, Sparkles } from "lucide-react";

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES: {
  id: TemplateId;
  name: string;
  desc: string;
  tag: string;
  tagColor: string;
  previewBg: string;
}[] = [
  {
    id: "modern",
    name: "Modern Sidebar",
    desc: "Two-column design with colorful sidebar & visual experience timeline",
    tag: "Most Popular",
    tagColor: "bg-blue-600 text-white",
    previewBg: "border-blue-500/40 bg-slate-900",
  },
  {
    id: "professional",
    name: "Professional ATS",
    desc: "Single-column traditional layout strictly formatted for ATS systems",
    tag: "ATS-Friendly",
    tagColor: "bg-emerald-600 text-white",
    previewBg: "border-emerald-500/40 bg-slate-900",
  },
  {
    id: "minimal",
    name: "Minimalist Swiss",
    desc: "Generous whitespace, refined typography & numbered section titles",
    tag: "Clean & Sleek",
    tagColor: "bg-purple-600 text-white",
    previewBg: "border-purple-500/40 bg-slate-900",
  },
  {
    id: "executive",
    name: "Executive Leadership",
    desc: "Bold high-contrast top banner and structured metric grid containers",
    tag: "Senior Roles",
    tagColor: "bg-amber-600 text-white",
    previewBg: "border-amber-500/40 bg-slate-900",
  },
];

const COLOR_PRESETS = [
  { name: "Sapphire Blue", hex: "#2563eb" },
  { name: "Deep Slate", hex: "#1e293b" },
  { name: "Emerald Forest", hex: "#059669" },
  { name: "Royal Purple", hex: "#7c3aed" },
  { name: "Crimson Red", hex: "#e11d48" },
  { name: "Amber Ochre", hex: "#d97706" },
  { name: "Teal Ocean", hex: "#0d9488" },
  { name: "Midnight Black", hex: "#09090b" },
];

const FONT_OPTIONS: { id: FontFamily; name: string; fontClass: string; desc: string }[] = [
  { id: "inter", name: "Inter", fontClass: "font-sans", desc: "Clean, ultra-modern sans-serif" },
  { id: "roboto", name: "Roboto", fontClass: "font-sans", desc: "Structured, neutral geometry" },
  { id: "outfit", name: "Outfit", fontClass: "font-sans", desc: "Geometric & contemporary" },
  { id: "merriweather", name: "Merriweather", fontClass: "font-serif", desc: "Classic, highly readable editorial serif" },
  { id: "playfair", name: "Playfair Display", fontClass: "font-serif", desc: "Elegant high-contrast heading serif" },
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { resume, updateSettings } = useResumeStore();
  const { settings } = resume;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customize Resume Design & Style"
      description="Select templates, vibrant color palettes, typography standards, and line spacing."
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Template Selector */}
        <div>
          <Label className="flex items-center gap-1.5 text-xs text-white font-bold mb-2.5 uppercase tracking-wider">
            <LayoutTemplate className="w-4 h-4 text-cyan-400" />
            Resume Template Layout
          </Label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEMPLATES.map((tmpl) => {
              const isSelected = settings.template === tmpl.id;

              return (
                <div
                  key={tmpl.id}
                  onClick={() => updateSettings({ template: tmpl.id })}
                  className={`p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-cyan-400 bg-slate-900 shadow-md shadow-cyan-500/10"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-white">
                      {tmpl.name}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 font-bold ${tmpl.tagColor}`}>
                      {tmpl.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {tmpl.desc}
                  </p>
                  {isSelected && (
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-cyan-400 font-mono">
                      <Check className="w-3.5 h-3.5" /> ACTIVE TEMPLATE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <Label className="flex items-center gap-1.5 text-xs text-white font-bold mb-2.5 uppercase tracking-wider">
            <Palette className="w-4 h-4 text-cyan-400" />
            Accent Theme Color
          </Label>

          <div className="flex flex-wrap items-center gap-2.5">
            {COLOR_PRESETS.map((color) => {
              const isSelected = settings.primaryColor.toLowerCase() === color.hex.toLowerCase();

              return (
                <button
                  key={color.hex}
                  type="button"
                  title={color.name}
                  onClick={() => updateSettings({ primaryColor: color.hex })}
                  className={`w-8 h-8 transition-all cursor-pointer relative flex items-center justify-center border ${
                    isSelected
                      ? "ring-2 ring-white border-white scale-110 shadow-md"
                      : "border-slate-700 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
                </button>
              );
            })}

            {/* Custom Hex input */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-slate-800 ml-2">
              <span className="text-[11px] font-mono text-slate-400">HEX:</span>
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                className="w-8 h-8 border border-slate-700 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Typography & Sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div>
            <Label className="flex items-center gap-1.5 text-xs text-white font-bold mb-2 uppercase tracking-wider">
              <Type className="w-4 h-4 text-cyan-400" />
              Font Family
            </Label>
            <div className="space-y-1">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => updateSettings({ fontFamily: font.id })}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer border ${
                    settings.fontFamily === font.id
                      ? "bg-indigo-600 text-white font-semibold border-indigo-500"
                      : "bg-slate-950 text-slate-300 hover:bg-slate-900 border-slate-800"
                  }`}
                >
                  <div>
                    <span className={font.fontClass}>{font.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2 font-mono">({font.desc})</span>
                  </div>
                  {settings.fontFamily === font.id && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Font Size */}
            <div>
              <Label className="flex items-center gap-1.5 text-xs text-white font-bold mb-1.5 uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Font Scaling
              </Label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 border border-slate-800">
                {(["sm", "md", "lg"] as FontSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => updateSettings({ fontSize: size })}
                    className={`py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      settings.fontSize === size
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Spacing */}
            <div>
              <Label className="text-xs text-white font-bold mb-1.5 uppercase tracking-wider">
                Line Spacing
              </Label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 border border-slate-800">
                {(["compact", "normal", "relaxed"] as Spacing[]).map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => updateSettings({ spacing: sp })}
                    className={`py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      settings.spacing === sp
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Icons Toggle */}
            <div className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                Show Section & Contact Icons
              </span>
              <input
                type="checkbox"
                checked={settings.showIcons}
                onChange={(e) => updateSettings({ showIcons: e.target.checked })}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <Button onClick={onClose} size="md" variant="gradient" className="font-bold px-6">
            Apply & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
