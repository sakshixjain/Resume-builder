"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Logo } from "@/components/ui/Logo";
import {
  FileText,
  Eye,
  Trash2,
  Download,
  ChevronDown,
  Maximize2,
  Minimize2,
  Search,
} from "lucide-react";
import { TemplateId, FontFamily, Spacing, FontSize } from "@/lib/resume/types";
import { toast } from "sonner";
import { UserMenu } from "@/components/auth/UserMenu";
import { AuthModal, AuthView } from "@/components/auth/AuthModal";

interface BuilderHeaderProps {
  onOpenCustomizer: () => void;
  onOpenPresetSelector?: () => void;
  activeNavTab?: string;
  setActiveNavTab?: (tab: string) => void;
}

const TEMPLATE_NAMES: Record<TemplateId, string> = {
  tech: "Tech & Engineering",
  corporate: "Corporate",
  creative: "Creative & Portfolio",
  academic: "Academic CV",
  modern: "Modern",
  professional: "ATS Pro",
  minimal: "Minimal",
  executive: "Executive",
};

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

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  onOpenCustomizer,
}) => {
  const {
    resume,
    updateSettings,
    clearResumeData,
    resetToDefaultData,
    setMobileTab,
    zoom,
    setZoom,
  } = useResumeStore();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pageSize, setPageSize] = useState<"A4" | "Letter">("A4");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthView>("login");

  const handleOpenAuth = (view: AuthView = "login") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const isOnePageFitted =
    resume.settings.spacing === "compact" && resume.settings.fontSize === "sm";

  const toggleFitOnePage = () => {
    if (isOnePageFitted) {
      updateSettings({ spacing: "normal", fontSize: "md" });
    } else {
      updateSettings({ spacing: "compact", fontSize: "sm" });
    }
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    toast.success("Opening Save as PDF dialog...");

    const originalTitle = document.title;
    const cleanFileName = resume.personalInfo.fullName
      ? `${resume.personalInfo.fullName.trim()}_Resume`
      : "Resume";
    document.title = cleanFileName;

    setTimeout(() => {
      window.print();
      setIsDownloading(false);
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }, 80);
  };

  const handleConfirmClear = () => {
    clearResumeData();
    setIsClearModalOpen(false);
    toast.info("Cleared resume fields");
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setIsResetModalOpen(false);
    toast.success("Loaded sample resume data");
  };

  const activeTemplateName =
    TEMPLATE_NAMES[resume.settings.template] || "Corporate";

  return (
    <header className="builder-header print:hidden bg-white border-b border-slate-200/80 z-30 shrink-0 select-none shadow-2xs">
      {/* Row 1: Brand, Template Selector, Actions */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between gap-3 border-b border-slate-100">
        {/* Left: Brand Logo & Template Card */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <Logo size="sm" />

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Using Template Pill Button */}
          <button
            type="button"
            onClick={onOpenCustomizer}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
          >
            {/* Small Mini Template Icon Graphic */}
            <div className="w-5 h-6.5 rounded-xs border border-blue-200 bg-blue-50/50 flex flex-col p-0.5 shrink-0 overflow-hidden shadow-2xs">
              <div className="w-full h-1 bg-blue-500 rounded-2xs mb-0.5" />
              <div className="w-full h-0.5 bg-slate-300 rounded-2xs mb-0.5" />
              <div className="w-2/3 h-0.5 bg-slate-300 rounded-2xs mb-0.5" />
              <div className="w-full h-0.5 bg-slate-300 rounded-2xs" />
            </div>

            <div className="text-left">
              <span className="block text-[9.5px] text-slate-400 font-medium leading-none">
                Using Template
              </span>
              <span className="block text-xs font-bold text-slate-900 leading-tight mt-0.5">
                {activeTemplateName}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors ml-0.5" />
          </button>
        </div>

        {/* Right: Preview, Clear, Download PDF, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Preview Button */}
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Preview</span>
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={() => setIsClearModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Clear</span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold shadow-xs hover:shadow transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 ml-1 hidden sm:block" />

          {/* User Profile Menu / Sign In */}
          <UserMenu onOpenAuthModal={handleOpenAuth} />
        </div>
      </div>

      {/* Row 2: Fit to Page | Spacing | Font | Page | Zoom | Colors */}
      <div className="px-4 sm:px-6 py-2 flex items-center gap-3.5 sm:gap-4 overflow-x-auto text-xs text-slate-700 scrollbar-none">
        {/* Fit to Page Button */}
        <button
          type="button"
          onClick={toggleFitOnePage}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-2xs font-medium text-xs whitespace-nowrap shrink-0 ${
            isOnePageFitted
              ? "bg-emerald-50 border-emerald-500 text-emerald-700"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {isOnePageFitted ? (
            <Minimize2 className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span>Fit to Page</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

        {/* Spacing */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-500 font-medium">Spacing</span>
          <div className="relative inline-block">
            <select
              value={resume.settings.spacing}
              onChange={(e) =>
                updateSettings({ spacing: e.target.value as Spacing })
              }
              className="appearance-none pl-3 pr-7 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs capitalize"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

        {/* Font */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-500 font-medium">Font</span>
          <div className="relative inline-block">
            <select
              value={resume.settings.fontFamily}
              onChange={(e) =>
                updateSettings({ fontFamily: e.target.value as FontFamily })
              }
              className="appearance-none pl-3 pr-7 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

        {/* Page Format */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-500 font-medium">Page</span>
          <div className="relative inline-block">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as "A4" | "Letter")}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

        {/* Zoom Selector */}
        <div className="relative inline-block shrink-0">
          <select
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="appearance-none pl-7 pr-7 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
          >
            <option value={75}>75%</option>
            <option value={90}>90%</option>
            <option value={100}>100%</option>
            <option value={110}>110%</option>
            <option value={125}>125%</option>
            <option value={150}>150%</option>
          </select>
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="h-4 w-[1px] bg-slate-200 shrink-0" />

        {/* Color Swatches */}
        <div className="flex items-center gap-2 shrink-0">
          {QUICK_COLORS.map((color) => {
            const isSelected =
              resume.settings.primaryColor.toLowerCase() ===
              color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                title={color.name}
                onClick={() => updateSettings({ primaryColor: color.hex })}
                className={`w-5 h-5 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                  isSelected
                    ? "ring-2 ring-slate-900 ring-offset-2 scale-110 shadow-xs"
                    : "hover:scale-110 opacity-90 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Clear Resume Fields?"
        description="Are you sure you want to empty all sections? You can load the sample data back anytime."
      >
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsClearModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirmClear}>
            Yes, Clear Everything
          </Button>
        </div>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Load Sample Data?"
        description="This will replace current form fields with example resume data."
      >
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResetModalOpen(false)}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleConfirmReset}>
            Load Sample
          </Button>
        </div>
      </Modal>

      {/* Interactive Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
        callbackUrl="/builder"
      />
    </header>
  );
};
