import { Metadata } from "next";
import { Suspense } from "react";
import { BuilderLayout } from "@/components/builder/BuilderLayout";

export const metadata: Metadata = {
  title: "CV & Resume Editor | CV Builder",
  description:
    "Design and customize professional, ATS-friendly resumes and CVs in real-time with instant live preview and 1-click PDF download.",
};

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f8fafc] text-slate-900">
          <div className="w-48 h-1 bg-slate-200 overflow-hidden mb-3 rounded-full">
            <div className="w-full h-full bg-[#6366f1] animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Loading Resume Builder...</p>
        </div>
      }
    >
      <BuilderLayout />
    </Suspense>
  );
}
