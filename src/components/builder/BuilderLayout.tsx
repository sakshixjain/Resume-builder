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
  const [activeNavTab, setActiveNavTab] = useState("builder");
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
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f8fafc] text-slate-900">
        <div className="w-48 h-1 bg-slate-200 overflow-hidden mb-3 rounded-full">
          <div className="w-full h-full bg-[#6366f1] animate-pulse" />
        </div>
        <p className="text-xs font-semibold text-slate-500">Loading Resume Builder...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white print:h-auto print:overflow-visible print:bg-white">
      {/* Top Header Navigation */}
      <div className="print:hidden">
        <BuilderHeader
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
        />
      </div>

      {/* Main Split Screen Area */}
      <main className="flex-1 flex overflow-hidden relative print:overflow-visible print:block">
        {/* Left: Editor Panel (Desktop: ~38%, Mobile: full if mobileTab === 'edit') */}
        <div
          className={`editor-panel-wrapper h-full w-full md:w-[45%] lg:w-[40%] xl:w-[36%] 2xl:w-[33%] border-r border-slate-200/80 bg-white z-10 flex flex-col print:hidden ${
            mobileTab === "preview" ? "hidden md:flex" : "flex"
          }`}
        >
          <EditorPanel />
        </div>

        {/* Right: Live A4 Preview Panel (Desktop: ~62%, Mobile: full if mobileTab === 'preview') */}
        <div
          className={`h-full flex-1 bg-[#f8fafc] overflow-hidden flex flex-col print:overflow-visible print:bg-white print:w-full print:block ${
            mobileTab === "edit" ? "hidden md:flex" : "flex"
          }`}
        >
          <PreviewPanel onOpenCustomizer={() => setIsCustomizerOpen(true)} />
        </div>
      </main>

      {/* Mobile Bottom Navigation Toggle */}
      <div className="print:hidden">
        <MobileTabs />
      </div>

      {/* Customizer Modal Dialog */}
      <div className="print:hidden">
        <CustomizerModal
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
        />
      </div>
    </div>
  );
};

