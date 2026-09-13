"use client";

import React, { useState, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { BuilderHeader } from "./BuilderHeader";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";
import { CustomizerModal } from "./CustomizerModal";
import { MobileTabs } from "./MobileTabs";
import { getStoredResume } from "@/lib/resume/storage";

export const BuilderLayout: React.FC = () => {
  const { mobileTab, setResume } = useResumeStore();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore saved resume from localStorage on mount
  useEffect(() => {
    const saved = getStoredResume();
    if (saved) {
      setResume(saved);
    }
    setIsHydrated(true);
  }, [setResume]);

  if (!isHydrated) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <div className="w-48 h-1 bg-slate-800 overflow-hidden mb-3">
          <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-pulse" />
        </div>
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">Loading Resume Builder...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950">
      {/* Top Header Navigation */}
      <BuilderHeader onOpenCustomizer={() => setIsCustomizerOpen(true)} />

      {/* Main Split Screen Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left: Editor Panel (Desktop: ~42%, Mobile: full if mobileTab === 'edit') */}
        <div
          className={`h-full w-full md:w-[42%] lg:w-[40%] xl:w-[38%] border-r border-slate-800 bg-slate-900 z-10 flex flex-col ${
            mobileTab === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          <EditorPanel />
        </div>

        {/* Right: Live A4 Preview Panel (Desktop: ~58%, Mobile: full if mobileTab === 'preview') */}
        <div
          className={`h-full flex-1 bg-slate-950 overflow-hidden flex flex-col ${
            mobileTab === "edit" ? "hidden md:flex" : "flex"
          }`}
        >
          <PreviewPanel onOpenCustomizer={() => setIsCustomizerOpen(true)} />
        </div>
      </main>

      {/* Mobile Bottom Navigation Toggle */}
      <MobileTabs />

      {/* Customizer Modal Dialog */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
};
