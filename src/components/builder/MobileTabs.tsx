"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Edit3, Eye, Palette, Download, Sparkles } from "lucide-react";

interface MobileTabsProps {
  onOpenCustomizer?: () => void;
}

export const MobileTabs: React.FC<MobileTabsProps> = ({ onOpenCustomizer }) => {
  const { mobileTab, setMobileTab, pageCount } = useResumeStore();

  const handleTriggerDownload = () => {
    window.dispatchEvent(new CustomEvent("resume:download"));
  };

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-lg mx-auto pointer-events-auto">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] rounded-2xl p-1.5 flex items-center justify-between gap-1 text-white">
        {/* Tab 1: Editor */}
        <button
          type="button"
          onClick={() => setMobileTab("edit")}
          className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            mobileTab === "edit"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Edit3 className="w-4 h-4 shrink-0" />
          <span className="text-[11px] leading-none">Editor</span>
        </button>

        {/* Tab 2: Live Preview */}
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
            mobileTab === "preview"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <div className="relative">
            <Eye className="w-4 h-4 shrink-0" />
            {pageCount > 1 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 text-[8px] font-black flex items-center justify-center text-white">
                {pageCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-none">Preview</span>
        </button>

        {/* Tab 3: Templates & Style */}
        <button
          type="button"
          onClick={() => onOpenCustomizer?.()}
          className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all cursor-pointer"
        >
          <Palette className="w-4 h-4 shrink-0 text-amber-400" />
          <span className="text-[11px] leading-none">Design</span>
        </button>

        {/* Tab 4: Direct Download PDF */}
        <button
          type="button"
          onClick={handleTriggerDownload}
          className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span className="text-[11px] leading-none">Download</span>
        </button>
      </div>
    </div>
  );
};

