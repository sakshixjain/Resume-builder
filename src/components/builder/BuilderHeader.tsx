"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  FileText,
  Trash2,
  Upload,
  FileJson,
  CheckCircle2,
  RefreshCw,
  Palette,
  Undo2,
  Redo2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  exportResumeAsJson,
  importResumeFromJson,
} from "@/lib/resume/storage";
import { toast } from "sonner";

interface BuilderHeaderProps {
  onOpenCustomizer: () => void;
}

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  onOpenCustomizer,
}) => {
  const {
    resume,
    setResume,
    saveStatus,
    resetToDefaultData,
    clearResumeData,
    undo,
    redo,
  } = useResumeStore();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Calculate quick completeness score
  const calculateCompleteness = () => {
    let score = 0;
    if (resume.personalInfo.fullName) score += 20;
    if (resume.personalInfo.email) score += 10;
    if (resume.summary.trim()) score += 15;
    if (resume.experience.length > 0) score += 25;
    if (resume.education.length > 0) score += 15;
    if (resume.skills.length > 0) score += 15;
    return Math.min(100, score);
  };

  const score = calculateCompleteness();

  const handleJsonUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importResumeFromJson(file);
      setResume(imported);
      toast.success("Resume data imported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to import JSON file. Invalid format.");
    }
  };

  const handleExportJson = () => {
    exportResumeAsJson(resume);
    toast.success("JSON backup exported!");
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setIsResetModalOpen(false);
    toast.success("Loaded sample example resume data");
  };

  const handleConfirmClear = () => {
    clearResumeData();
    setIsClearModalOpen(false);
    toast.info("Cleared resume fields");
  };

  return (
    <header className="h-14 bg-slate-950 text-white border-b border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-2 z-20 shrink-0">
      {/* Left: Brand Logo & Title & Save Status */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-colors"
        >
          <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white hidden md:inline">
            QuickCV<span className="text-cyan-400">.</span>
          </span>
        </Link>

        <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

        {/* Dynamic Save Status Badge */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {saveStatus === "saving" ? (
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold px-2 py-0.5 bg-amber-950/60 border border-amber-800/80">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span className="hidden sm:inline">SAVING</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/80">
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">AUTOSAVED</span>
            </span>
          )}
        </div>

        {/* Resume Completeness Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-[11px] font-mono">
          <span className="text-slate-400">ATS SCORE:</span>
          <span className="font-bold text-cyan-400">{score}%</span>
          <div className="w-12 h-1.5 bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Center: Undo/Redo & Quick Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={undo}
          title="Undo (Ctrl+Z)"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer border border-transparent hover:border-slate-800"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={redo}
          title="Redo (Ctrl+Y)"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer border border-transparent hover:border-slate-800"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-800 mx-1" />

        {/* Load Sample / Clear */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsResetModalOpen(true)}
          className="text-xs text-slate-300 hover:text-white hover:bg-slate-900 hidden lg:inline-flex"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          Sample Data
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsClearModalOpen(true)}
          className="text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-900 hidden lg:inline-flex"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </Button>

        {/* JSON Backup & Import */}
        <div className="relative inline-block">
          <label className="cursor-pointer" title="Import JSON Backup">
            <span className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 inline-flex items-center transition-colors border border-transparent hover:border-slate-800">
              <Upload className="w-4 h-4" />
            </span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleJsonUpload}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleExportJson}
          title="Export JSON Backup"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer border border-transparent hover:border-slate-800"
        >
          <FileJson className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Customizer Trigger */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="gradient"
          size="sm"
          onClick={onOpenCustomizer}
          className="text-xs font-bold gap-1.5"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Customize Theme</span>
        </Button>
      </div>

      {/* Confirm Reset Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Load Sample Example Data?"
        description="This will replace current form fields with a comprehensive software engineering sample resume."
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

      {/* Confirm Clear Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Clear All Resume Fields?"
        description="Are you sure you want to empty all sections? This action cannot be easily undone."
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
    </header>
  );
};
