"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/Button";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Printer,
  Palette,
  Sparkles,
  Check,
} from "lucide-react";
import { TemplateId } from "@/lib/resume/types";
import { exportResumeToPDF, printResume } from "@/lib/resume/pdfGenerator";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface PreviewPanelProps {
  onOpenCustomizer: () => void;
}

const QUICK_TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "professional", label: "ATS Pro" },
  { id: "minimal", label: "Minimal" },
  { id: "executive", label: "Executive" },
];

const QUICK_COLORS = [
  { name: "Blue", hex: "#2563eb" },
  { name: "Slate", hex: "#1e293b" },
  { name: "Emerald", hex: "#059669" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Crimson", hex: "#e11d48" },
  { name: "Amber", hex: "#d97706" },
  { name: "Teal", hex: "#0d9488" },
];

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  onOpenCustomizer,
}) => {
  const { resume, updateSettings, zoom, setZoom } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.85);

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

  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true);
      const toastId = toast.loading("Generating high-resolution A4 PDF...");

      const safeName = (resume.personalInfo.fullName || "Resume")
        .trim()
        .replace(/[^a-zA-Z0-9]/g, "_");
      const fileName = `${safeName}_Resume.pdf`;

      await exportResumeToPDF("resume-preview-document", {
        fileName,
      });

      toast.dismiss(toastId);
      toast.success("PDF downloaded successfully!");

      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF. Please try using the Print option.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(150, z + 15));
  const handleZoomOut = () => setZoom((z) => Math.max(50, z - 15));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between p-2.5 px-4 bg-slate-950 border-b border-slate-800 z-10 gap-3 flex-wrap text-white">
        {/* Quick Template Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase px-1.5 hidden xl:inline">
            Template:
          </span>
          {QUICK_TEMPLATES.map((tmpl) => {
            const isSelected = resume.settings.template === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => updateSettings({ template: tmpl.id })}
                className={`px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tmpl.label}
              </button>
            );
          })}
        </div>

        {/* Quick Color Palette dots */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900 p-1 px-2 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">
            Color:
          </span>
          {QUICK_COLORS.map((color) => {
            const isSelected =
              resume.settings.primaryColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                title={color.name}
                onClick={() => updateSettings({ primaryColor: color.hex })}
                className={`w-5 h-5 transition-transform cursor-pointer relative flex items-center justify-center border ${
                  isSelected
                    ? "ring-2 ring-white border-white scale-110"
                    : "border-slate-700 hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
              </button>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResetZoom}
            title="Reset Zoom"
            className="px-2 text-xs font-mono font-bold text-slate-200 hover:bg-slate-800 cursor-pointer h-7 flex items-center"
          >
            {zoom}%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResetZoom}
            title="Fit to width"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border-l border-slate-800"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actions (Customize, Print & PDF Export) */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenCustomizer}
            className="text-xs font-semibold bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
          >
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Theme</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={printResume}
            className="hidden sm:inline-flex text-xs font-semibold bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
            title="Print via browser native dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </Button>

          <Button
            type="button"
            variant="gradient"
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="text-xs font-black shadow-lg shadow-indigo-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? "Exporting..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Viewport Scroll Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start canvas-grid-pattern relative"
      >
        <div
          className="transition-transform duration-150 origin-top flex justify-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
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
