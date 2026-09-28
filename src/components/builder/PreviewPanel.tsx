"use client";

import React, { useRef, useState, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ZoomIn, ZoomOut, RotateCcw, FileText } from "lucide-react";

interface PreviewPanelProps {
  onOpenCustomizer?: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = () => {
  const { resume, zoom, setZoom, pageCount, setPageCount } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.88);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScaleAndPageCount = () => {
      if (containerRef.current) {
        const padding = window.innerWidth < 640 ? 16 : 48;
        const availableWidth = containerRef.current.clientWidth - padding;
        const a4WidthPx = 794;
        const scale = Math.min(1.05, Math.max(0.32, availableWidth / a4WidthPx));
        setAutoScale(scale);

        const docElem = document.getElementById("resume-preview-document");
        if (docElem) {
          const a4HeightPx = 1123;
          const totalHeight = docElem.scrollHeight;
          const pages = Math.max(1, Math.ceil((totalHeight - 10) / a4HeightPx));
          setPageCount(pages);
        }
      }
    };

    updateScaleAndPageCount();
    const observer = new ResizeObserver(updateScaleAndPageCount);
    observer.observe(containerRef.current);
    window.addEventListener("resize", updateScaleAndPageCount);

    const timer = setTimeout(updateScaleAndPageCount, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", updateScaleAndPageCount);
    };
  }, [resume]);

  const effectiveScale = (zoom / 100) * autoScale;

  const handleMobileZoomIn = () => setZoom((z) => Math.min(150, z + 15));
  const handleMobileZoomOut = () => setZoom((z) => Math.max(60, z - 15));
  const handleMobileResetZoom = () => setZoom(100);

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] border-l border-slate-200/80 relative print:border-none print:bg-white print:overflow-visible print:h-auto">
      {/* Floating Zoom Bar for Mobile Screen View */}
      <div className="md:hidden absolute top-3 right-3 z-30 flex items-center gap-1 bg-slate-900/85 backdrop-blur-md text-white p-1 rounded-xl shadow-lg border border-slate-700/60 no-print">
        <button
          type="button"
          onClick={handleMobileZoomOut}
          disabled={zoom <= 60}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-mono font-bold px-1 min-w-[32px] text-center text-slate-200">
          {zoom}%
        </span>
        <button
          type="button"
          onClick={handleMobileZoomIn}
          disabled={zoom >= 150}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-3.5 bg-slate-700 mx-0.5" />
        <button
          type="button"
          onClick={handleMobileResetZoom}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Fit to Screen"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Viewport Scroll Canvas */}
      <div
        ref={containerRef}
        className="preview-viewport-scroll flex-1 overflow-auto p-2 sm:p-8 pb-24 sm:pb-8 flex justify-center items-start bg-[#f1f5f9] relative print:p-0 print:m-0 print:bg-white print:overflow-visible print:block touch-pan-x touch-pan-y"
      >
        <div
          id="resume-transform-wrapper"
          className="preview-canvas-wrapper transition-transform duration-150 origin-top flex justify-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-200/80 rounded-xs bg-white print:transform-none print:shadow-none print:border-none print:m-0 print:p-0 print:block"
          style={{
            transform: `scale(${effectiveScale})`,
            marginBottom: `${(1 - effectiveScale) * -240}px`,
          }}
        >
          <ResumePreview resume={resume} />
        </div>
      </div>

      {/* Floating Clean Page Count Indicator (Screen only, hidden on small screens because dock has it) */}
      <div className="page-count-badge hidden sm:block absolute bottom-4 right-4 z-20 pointer-events-none no-print">
        <div className="px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-xs font-semibold shadow-lg border border-slate-700/60 flex items-center gap-1.5">
          <FileText className="w-3 h-3 text-indigo-400" />
          <span className="text-slate-300">Pages:</span>
          <span className="font-bold text-white">
            {pageCount} {pageCount === 1 ? "Page" : "Pages"}
          </span>
        </div>
      </div>
    </div>
  );
};
