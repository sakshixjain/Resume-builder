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
import { Check, Palette, Type, LayoutTemplate, Sliders } from "lucide-react";

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
}[] = [
  {
    id: "modern",
    name: "Modern Minimal",
    desc: "Clean layout with stylish name accents & clear visual hierarchy",
    tag: "Most Popular",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "professional",
    name: "Professional ATS",
    desc: "Single-column traditional layout strictly optimized for ATS systems",
    tag: "ATS-Friendly",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "minimal",
    name: "Minimalist Swiss",
    desc: "Generous whitespace, refined typography & numbered section titles",
    tag: "Clean & Sleek",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "executive",
    name: "Executive Leadership",
    desc: "Bold high-contrast top banner and structured metric grid containers",
    tag: "Senior Roles",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

const COLOR_PRESETS = [
  { name: "Sapphire Blue", hex: "#2563eb" },
  { name: "Emerald Green", hex: "#10b981" },
  { name: "Crimson Red", hex: "#ef4444" },
  { name: "Amber Orange", hex: "#f59e0b" },
  { name: "Royal Purple", hex: "#7c3aed" },
  { name: "Deep Navy", hex: "#0f172a" },
  { name: "Teal Ocean", hex: "#0d9488" },
];

const FONT_OPTIONS: { id: FontFamily; name: string; fontClass: string; desc: string }[] = [
  { id: "inter", name: "Inter", fontClass: "font-sans", desc: "Clean, ultra-modern sans-serif" },
  { id: "roboto", name: "Roboto", fontClass: "font-sans", desc: "Structured, neutral geometry" },
  { id: "outfit", name: "Outfit", fontClass: "font-sans", desc: "Geometric & contemporary" },
  { id: "merriweather", name: "Merriweather", fontClass: "font-serif", desc: "Classic editorial serif" },
  { id: "playfair", name: "Playfair Display", fontClass: "font-serif", desc: "High-contrast heading serif" },
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
      description="Select templates, vibrant color palettes, typography, and line spacing."
      maxWidth="xl"
    >
      <div className="space-y-6 text-slate-900">
        {/* Template Selector */}
        <div>
          <Label className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold mb-2">
            <LayoutTemplate className="w-4 h-4 text-indigo-600" />
            Resume Template Layout
          </Label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEMPLATES.map((tmpl) => {
              const isSelected = settings.template === tmpl.id;

              return (
                <div
                  key={tmpl.id}
                  onClick={() => updateSettings({ template: tmpl.id })}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-500 shadow-2xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      {tmpl.name}
                    </span>
                    <span className={`text-[10px] rounded-full px-2 py-0.5 font-medium border ${tmpl.tagColor}`}>
                      {tmpl.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {tmpl.desc}
                  </p>
                  {isSelected && (
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-blue-600">
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
