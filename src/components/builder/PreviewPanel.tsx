"use client";

import React, { useRef, useState, useEffect } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { ResumePreview } from "@/components/resume/ResumePreview";

interface PreviewPanelProps {
  onOpenCustomizer?: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = () => {
  const { resume, zoom } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.88);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const padding = window.innerWidth < 640 ? 24 : 48;
        const availableWidth = containerRef.current.clientWidth - padding;
        const a4WidthPx = 794;
        const scale = Math.min(1.05, Math.max(0.35, availableWidth / a4WidthPx));
        setAutoScale(scale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const effectiveScale = (zoom / 100) * autoScale;

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] border-l border-slate-200/80 print:border-none print:bg-white print:overflow-visible print:h-auto">
      {/* Viewport Scroll Canvas */}
      <div
        ref={containerRef}
        className="preview-viewport-scroll flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-[#f1f5f9] relative print:p-0 print:m-0 print:bg-white print:overflow-visible print:block"
      >
        <div
          id="resume-transform-wrapper"
          className="preview-canvas-wrapper transition-transform duration-150 origin-top flex justify-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-200/80 rounded-xs bg-white print:transform-none print:shadow-none print:border-none print:m-0 print:p-0 print:block"
          style={{
            transform: `scale(${effectiveScale})`,
            marginBottom: `${(1 - effectiveScale) * -200}px`,
          }}
        >
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
};
