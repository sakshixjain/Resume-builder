"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
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

const subscribe = () => () => {};

export const BuilderLayout: React.FC = () => {
  const { mobileTab, setResume, updateSettings, loadPreset } = useResumeStore();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPresetSelectorOpen, setIsPresetSelectorOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState("builder");
  const isHydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const searchParams = useSearchParams();

  // Adjustable panel split width percentage (Editor width: default 38%, min 22%, max 65%)
  const [editorWidthPct, setEditorWidthPct] = useState<number>(38);
  const [isDragging, setIsDragging] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Load saved split width percentage from localStorage
  useEffect(() => {
    try {
      const savedWidth = localStorage.getItem("resume_builder_split_pct");
      if (savedWidth) {
        const parsed = parseFloat(savedWidth);
        if (!isNaN(parsed) && parsed >= 20 && parsed <= 70) {
          setEditorWidthPct(parsed);
        }
      }
    } catch {}
  }, []);

  // Dragging handlers for split pane
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !mainContainerRef.current) return;
    const rect = mainContainerRef.current.getBoundingClientRect();
    const currentWidth = e.clientX - rect.left;
    const totalWidth = rect.width;
    if (totalWidth <= 0) return;

    // Constrain to sensible min and max limits
    const minPx = Math.max(300, totalWidth * 0.22);
    const maxPx = Math.min(totalWidth - 360, totalWidth * 0.65);
    const clampedPx = Math.min(Math.max(currentWidth, minPx), maxPx);
    const pct = (clampedPx / totalWidth) * 100;
    setEditorWidthPct(Math.round(pct * 10) / 10);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      try {
        localStorage.setItem("resume_builder_split_pct", editorWidthPct.toString());
      } catch {}
    }
  };

  const handleResetWidth = () => {
    setEditorWidthPct(38);
    try {
      localStorage.setItem("resume_builder_split_pct", "38");
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setEditorWidthPct((p) => Math.max(22, Math.round((p - 2) * 10) / 10));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setEditorWidthPct((p) => Math.min(65, Math.round((p + 2) * 10) / 10));
    } else if (e.key === "Home" || e.key === "Enter") {
      e.preventDefault();
      handleResetWidth();
    }
  };

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

    const colorParam = searchParams.get("color");

    if (presetParam && RESUME_PRESETS.some((p) => p.id === presetParam)) {
      loadPreset(presetParam as PresetId);
      if (templateParam && validTemplates.includes(templateParam as TemplateId)) {
        updateSettings({
          template: templateParam as TemplateId,
          ...(colorParam ? { primaryColor: colorParam } : {}),
        });
      } else if (colorParam) {
        updateSettings({ primaryColor: colorParam });
      }
    } else if (saved) {
      if (templateParam && validTemplates.includes(templateParam as TemplateId)) {
        setResume({
          ...saved,
          settings: {
            ...saved.settings,
            template: templateParam as TemplateId,
            ...(colorParam ? { primaryColor: colorParam } : {}),
          },
        });
      } else if (colorParam) {
        setResume({
          ...saved,
          settings: {
            ...saved.settings,
            primaryColor: colorParam,
          },
        });
      } else {
        setResume(saved);
      }
    } else {
      if (templateParam && validTemplates.includes(templateParam as TemplateId)) {
        updateSettings({
          template: templateParam as TemplateId,
          ...(colorParam ? { primaryColor: colorParam } : {}),
        });
      } else if (colorParam) {
        updateSettings({ primaryColor: colorParam });
      }
    }
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
      <main
        ref={mainContainerRef}
        className={`flex-1 flex overflow-hidden relative print:overflow-visible print:block ${
          isDragging ? "select-none cursor-col-resize" : ""
        }`}
      >
        {/* Left: Editor Panel (Adjustable width on desktop, full if mobileTab === 'edit' on mobile) */}
        <div
          style={{
            width: typeof window !== "undefined" && window.innerWidth >= 768 ? `${editorWidthPct}%` : undefined,
          }}
          className={`editor-panel-wrapper h-full border-r border-slate-200/80 bg-white z-10 flex flex-col print:hidden shrink-0 ${
            mobileTab === "preview" ? "hidden md:flex" : "flex w-full md:w-auto"
          }`}
        >
          <EditorPanel />
        </div>

        {/* Draggable Resize Divider Handle (Desktop only) */}
        <div
          role="separator"
          tabIndex={0}
          aria-orientation="vertical"
          aria-valuenow={Math.round(editorWidthPct)}
          aria-valuemin={22}
          aria-valuemax={65}
          aria-label="Resize editor and preview panels"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleResetWidth}
          onKeyDown={handleKeyDown}
          title="Drag to resize panels (Double-click to reset, or use Left/Right arrows)"
          className={`hidden md:flex relative w-3 -mx-1.5 z-30 cursor-col-resize items-center justify-center select-none group transition-all duration-75 focus:outline-hidden touch-none ${
            isDragging ? "bg-blue-600/10" : "hover:bg-blue-500/10"
          }`}
        >
          {/* Vertical highlight line */}
          <div
            className={`w-0.5 h-full transition-colors duration-150 ${
              isDragging
                ? "bg-blue-600"
                : "bg-transparent group-hover:bg-blue-400"
            }`}
          />

          {/* Centered Draggable Grip Pill Indicator */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-150 shadow-xs ${
              isDragging
                ? "bg-blue-600 h-12 shadow-md shadow-blue-500/40"
                : "bg-slate-300 group-hover:bg-blue-500 group-hover:h-12"
            }`}
          >
            {/* Grip dots */}
            <span className="w-0.5 h-0.5 rounded-full bg-white/90" />
            <span className="w-0.5 h-0.5 rounded-full bg-white/90" />
            <span className="w-0.5 h-0.5 rounded-full bg-white/90" />
          </div>
        </div>

        {/* Right: Live A4 Preview Panel (Expands to fill remaining width) */}
        <div
          className={`h-full flex-1 bg-[#f8fafc] overflow-hidden flex flex-col print:overflow-visible print:bg-white print:w-full print:block min-w-0 ${
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

