"use client";

import React, { useState, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { BuilderHeader } from "./BuilderHeader";
import { EditorPanel } from "./EditorPanel";
import { PreviewPanel } from "./PreviewPanel";
import { CustomizerModal } from "./CustomizerModal";
import { MobileTabs } from "./MobileTabs";
import { getStoredResume } from "@/lib/resume/storage";

import { useSearchParams } from "next/navigation";
import { PresetSelectorModal } from "./PresetSelectorModal";
import { TemplateId, PresetId } from "@/lib/resume/types";
import { RESUME_PRESETS } from "@/lib/resume/presets";

export const BuilderLayout: React.FC = () => {
  const { mobileTab, setResume, updateSettings, loadPreset } = useResumeStore();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPresetSelectorOpen, setIsPresetSelectorOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("builder");
  const [isHydrated, setIsHydrated] = useState(false);
  const searchParams = useSearchParams();

  // Restore saved resume from localStorage on mount and apply template/preset query params
  useEffect(() => {
    const saved = getStoredResume();
    const templateParam = searchParams.get("template");
    const presetParam = searchParams.get("preset");
    const validTemplates: TemplateId[] = [
      "modern",
      "professional",
      "minimal",
      "executive",
      "tech",
      "corporate",
      "creative",
      "academic",
    ];

    if (presetParam && RESUME_PRESETS.some((p) => p.id === presetParam)) {
      loadPreset(presetParam as PresetId);
      if (templateParam && validTemplates.includes(templateParam as TemplateId)) {
        updateSettings({ template: templateParam as TemplateId });
      }
    } else if (saved) {
      if (templateParam && validTemplates.includes(templateParam as TemplateId)) {
        setResume({
          ...saved,
          settings: {
            ...saved.settings,
            template: templateParam as TemplateId,
          },
        });
      } else {
        setResume(saved);
      }
    } else if (templateParam && validTemplates.includes(templateParam as TemplateId)) {
      updateSettings({ template: templateParam as TemplateId });
    }
    setIsHydrated(true);
  }, [setResume, searchParams, updateSettings, loadPreset]);

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
          onOpenPresetSelector={() => setIsPresetSelectorOpen(true)}
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
        <PresetSelectorModal
          isOpen={isPresetSelectorOpen}
          onClose={() => setIsPresetSelectorOpen(false)}
        />
      </div>
    </div>
  );
};

