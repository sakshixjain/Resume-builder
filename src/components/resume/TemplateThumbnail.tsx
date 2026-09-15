"use client";

import React, { useRef, useState, useEffect } from "react";
import { Resume, TemplateId } from "@/lib/resume/types";
import { initialResumeData } from "@/lib/resume/defaultResume";
import { ResumePreview } from "./ResumePreview";

interface TemplateThumbnailProps {
  templateId: TemplateId;
  primaryColor?: string;
  className?: string;
  containerHeight?: string;
  resumeData?: Resume;
}

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({
  templateId,
  primaryColor,
  className = "",
  containerHeight = "h-64",
  resumeData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.33);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          // Standard A4 width at 96 DPI is ~794px
          setScale(width / 794);
        }
      }
    };

    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const defaultColorMap: Record<TemplateId, string> = {
    modern: "#2563eb",
    professional: "#0f766e",
    minimal: "#334155",
    executive: "#b45309",
    tech: "#2563eb",
    corporate: "#0f766e",
    creative: "#7c3aed",
    academic: "#1e3a8a",
  };

  const previewResume: Resume = resumeData || {
    ...initialResumeData,
    settings: {
      ...initialResumeData.settings,
      template: templateId,
      primaryColor: primaryColor || defaultColorMap[templateId] || "#2563eb",
    },
  };

  return (
    <div
      ref={containerRef}
      className={`w-full ${containerHeight} bg-white overflow-hidden relative select-none pointer-events-none ${className}`}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "794px",
          minHeight: "1123px",
        }}
        className="absolute top-0 left-0 bg-white"
      >
        <ResumePreview resume={previewResume} />
      </div>
    </div>
  );
};
