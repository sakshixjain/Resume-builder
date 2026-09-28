"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Download, Printer, ZoomIn, ZoomOut, RotateCcw, Sparkles, Eye, FileText } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { ResumePreview } from "@/components/resume/ResumePreview";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPDF: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  onDownloadPDF,
}) => {
  const { resume } = useResumeStore();
  const [scale, setScale] = useState(0.85);
  const [pageCount, setPageCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fit scale on mount or resize
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const calculateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 48;
        const availableHeight = containerRef.current.clientHeight - 48;
        const a4WidthPx = 794;
        const a4HeightPx = 1123;

        const scaleW = availableWidth / a4WidthPx;
        const scaleH = availableHeight / a4HeightPx;
        const initialScale = Math.min(1.0, Math.max(0.45, Math.min(scaleW, scaleH) * 0.95));
        setScale(Math.round(initialScale * 100) / 100);

        const docElem = document.getElementById("resume-preview-document");
        if (docElem) {
          const totalHeight = docElem.scrollHeight;
          const pages = Math.max(1, Math.ceil((totalHeight - 10) / a4HeightPx));
          setPageCount(pages);
        }
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    const timer = setTimeout(calculateScale, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScale);
    };
  }, [isOpen, resume]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale((s) => Math.min(1.5, Math.round((s + 0.1) * 10) / 10));
  const handleZoomOut = () => setScale((s) => Math.max(0.4, Math.round((s - 0.1) * 10) / 10));
  const handleResetZoom = () => setScale(0.85);

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const resumeTitle = resume.personalInfo.fullName
    ? `${resume.personalInfo.fullName}'s Resume`
    : "Resume Preview";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Header Controls Bar */}
      <div className="h-14 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between text-white shrink-0 shadow-lg">
        {/* Left: Document Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100 truncate max-w-[200px] sm:max-w-md">
                {resumeTitle}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {resume.settings.template} Template
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-950/80 text-indigo-200 border border-indigo-700/60 shadow-xs">
                <FileText className="w-3 h-3 text-indigo-400" />
                <span>{pageCount} {pageCount === 1 ? "Page" : "Pages"}</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              High-Resolution Print & PDF Preview
            </span>
          </div>
        </div>

        {/* Center: Zoom Controls */}
        <div className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 0.4}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-40 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-300 px-2 min-w-[50px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 1.5}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-40 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-slate-700 mx-0.5" />
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions (Print, Download, Close) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onDownloadPDF();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            title="Close Preview (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/60 relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <div
          className="transition-transform duration-150 origin-top flex justify-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-xs bg-white my-auto"
          style={{
            transform: `scale(${scale})`,
            marginBottom: `${Math.max(40, (1 - scale) * -300)}px`,
          }}
        >
          <ResumePreview resume={resume} isThumbnail={false} />
        </div>
      </div>
    </div>
  );
};
