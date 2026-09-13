"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Edit3, Eye } from "lucide-react";

export const MobileTabs: React.FC = () => {
  const { mobileTab, setMobileTab } = useResumeStore();

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white p-1 border border-slate-300 shadow-xl flex items-center gap-1">
      <button
        type="button"
        onClick={() => setMobileTab("edit")}
        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
          mobileTab === "edit"
            ? "bg-blue-600 text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Edit3 className="w-3.5 h-3.5" />
        Editor
      </button>

      <button
        type="button"
        onClick={() => setMobileTab("preview")}
        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
          mobileTab === "preview"
            ? "bg-blue-600 text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
        Live A4 Preview
      </button>
    </div>
  );
};
