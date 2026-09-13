"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  FileText,
  Layout,
  Palette,
  Settings,
  Check,
  Undo2,
  Redo2,
  Eye,
  Trash2,
  Download,
  RotateCcw,
} from "lucide-react";
import { exportResumeToPDF } from "@/lib/resume/pdfGenerator";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface BuilderHeaderProps {
  onOpenCustomizer: () => void;
  activeNavTab?: string;
  setActiveNavTab?: (tab: string) => void;
}

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  onOpenCustomizer,
  activeNavTab = "builder",
  setActiveNavTab,
}) => {
  const {
    resume,
    saveStatus,
    clearResumeData,
    resetToDefaultData,
    undo,
    redo,
    setMobileTab,
  } = useResumeStore();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    toast.success("Opening Save as PDF dialog...");
    
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      window.print();
      setIsDownloading(false);
    }, 120);
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

  return (
    <header className="h-14 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-3 z-30 shrink-0 select-none">
      {/* Left: Brand Logo & Navigation Tabs */}
      <div className="flex items-center gap-4 lg:gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#6366f1] text-white flex items-center justify-center shadow-xs group-hover:bg-[#4f46e5] transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-slate-900">
            QuickCV
          </span>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveNavTab?.("builder")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeNavTab === "builder"
                ? "bg-[#eeeffc] text-[#4f46e5] border border-indigo-100"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Builder</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNavTab?.("templates");
              onOpenCustomizer();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNavTab?.("design");
              onOpenCustomizer();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNavTab?.("settings");
              onOpenCustomizer();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Right: Save Status, Undo/Redo, Preview, Clear, Download PDF, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* All changes saved */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-normal">
          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
          <span>{saveStatus === "saving" ? "Saving changes..." : "All changes saved"}</span>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Button */}
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Preview</span>
        </button>

        {/* Clear Button */}
        <button
          type="button"
          onClick={() => setIsClearModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Clear</span>
        </button>

        {/* Download PDF Button */}
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="px-4 py-1.5 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-medium flex items-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
        </button>

        {/* User Avatar Initial */}
        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-semibold text-xs ml-1 shadow-2xs">
          S
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
        description="This will replace current form fields with example software engineer resume data."
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
    </header>
  );
};
