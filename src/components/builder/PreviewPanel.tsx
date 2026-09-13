"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { ResumePreview } from "@/components/resume/ResumePreview";
import {
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Printer,
} from "lucide-react";
import { TemplateId, FontFamily } from "@/lib/resume/types";

interface PreviewPanelProps {
  onOpenCustomizer?: () => void;
}

const QUICK_TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "professional", label: "ATS Pro" },
  { id: "minimal", label: "Minimal" },
  { id: "executive", label: "Executive" },
];

const QUICK_COLORS = [
  { name: "Blue", hex: "#2563eb" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f59e0b" },
  { name: "Navy", hex: "#0f172a" },
];

const FONT_OPTIONS: { id: FontFamily; label: string }[] = [
  { id: "inter", label: "Inter" },
  { id: "roboto", label: "Roboto" },
  { id: "outfit", label: "Outfit" },
  { id: "merriweather", label: "Merriweather" },
  { id: "playfair", label: "Playfair" },
];

export const PreviewPanel: React.FC<PreviewPanelProps> = () => {
  const { resume, updateSettings, zoom, setZoom } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.88);
  const [pageSize, setPageSize] = useState<"A4" | "Letter">("A4");

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 48;
        const a4WidthPx = 794;
        const scale = Math.min(1.05, Math.max(0.4, availableWidth / a4WidthPx));
        setAutoScale(scale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveScale = (zoom / 100) * autoScale;

  const handleZoomIn = () => setZoom((z) => Math.min(150, z + 10));
  const handleZoomOut = () => setZoom((z) => Math.max(50, z - 10));

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] border-l border-slate-200/80 print:border-none print:bg-white print:overflow-visible print:h-auto">
      {/* Top Preview Controls Toolbar */}
      <div className="preview-toolbar flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200/80 z-20 gap-3 flex-wrap text-slate-800 select-none print:hidden">
        {/* Left Side: Template Selector & Color Palette */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Template Segmented Control */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700 font-medium">Template:</span>
            <div className="flex items-center gap-1.5">
              {QUICK_TEMPLATES.map((tmpl) => {
                const isSelected = resume.settings.template === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => updateSettings({ template: tmpl.id })}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      isSelected
                        ? "border border-blue-500 bg-blue-50/60 text-blue-600 font-semibold shadow-2xs"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {tmpl.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700 font-medium">Color:</span>
            <div className="flex items-center gap-2">
              {QUICK_COLORS.map((color) => {
                const isSelected =
                  resume.settings.primaryColor.toLowerCase() === color.hex.toLowerCase();
                return (
                  <button
                    key={color.hex}
                    type="button"
                    title={color.name}
                    onClick={() => updateSettings({ primaryColor: color.hex })}
                    className={`w-5 h-5 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                      isSelected
                        ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                        : "hover:scale-110 opacity-90 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Font Selector, Page Size, Zoom Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Font Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-700 font-medium">Font:</span>
            <div className="relative inline-block">
              <select
                value={resume.settings.fontFamily}
                onChange={(e) =>
                  updateSettings({ fontFamily: e.target.value as FontFamily })
                }
                className="appearance-none pl-2.5 pr-7 py-1 text-xs font-medium rounded-md border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Page Format Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-700 font-medium">Page:</span>
            <div className="relative inline-block">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as "A4" | "Letter")}
                className="appearance-none pl-2.5 pr-7 py-1 text-xs font-medium rounded-md border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Zoom & Print Controls */}
          <div className="flex items-center gap-1 text-slate-600">
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-xs font-semibold text-slate-800 min-w-[40px] text-center">
              {zoom}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-4 bg-slate-200 mx-1" />

            <button
              type="button"
              onClick={() => window.print()}
              title="Print / Save as PDF"
              className="p-1 hover:text-blue-600 hover:bg-blue-50 text-slate-500 rounded transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Viewport Scroll Canvas */}
      <div
        ref={containerRef}
        className="preview-viewport-scroll flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-[#f1f5f9] relative print:p-0 print:m-0 print:bg-white print:overflow-visible print:block"
      >
        <div
          id="resume-transform-wrapper"
          className="preview-canvas-wrapper transition-transform duration-150 origin-top flex justify-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-200/80 rounded-xs bg-white print:transform-none print:shadow-none print:border-none print:m-0 print:p-0 print:block"
          style={{
            transform: `scale(${effectiveScale})`,
            marginBottom: `${(1 - effectiveScale) * -200}px`,
          }}
        >
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
};

