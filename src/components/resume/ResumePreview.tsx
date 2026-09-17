"use client";

import React from "react";
import { Resume } from "@/lib/resume/types";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { TechTemplate } from "./templates/TechTemplate";
import { CorporateTemplate } from "./templates/CorporateTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { AcademicTemplate } from "./templates/AcademicTemplate";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  resume: Resume;
  className?: string;
  isThumbnail?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  className,
  isThumbnail = false,
}) => {
  const { settings } = resume;

  // Font family class mapping
  const getFontFamilyClass = (font: string) => {
    switch (font) {
      case "roboto":
        return "font-sans";
      case "merriweather":
      case "playfair":
        return "font-serif";
      case "outfit":
      case "jakarta":
      case "inter":
      default:
        return "font-sans";
    }
  };

  // Font size mapping
  const getFontSizeClass = (size: string) => {
    switch (size) {
      case "sm":
        return "[&_*]:text-[0.93em]";
      case "lg":
        return "[&_*]:text-[1.05em]";
      case "md":
      default:
        return "";
    }
  };

  // Line spacing mapping
  const getSpacingClass = (spacing: string) => {
    switch (spacing) {
      case "compact":
        return "[&_.resume-section]:mb-2.5 [&_.resume-item]:mb-1.5 [&_.space-y-4]:space-y-2 [&_.space-y-3]:space-y-1.5 [&_.space-y-2]:space-y-1 [&_p]:leading-snug [&_.resume-header]:mb-3 [&_.resume-header]:pb-2";
      case "relaxed":
        return "[&_.resume-section]:mb-5 [&_.resume-item]:mb-3.5 [&_.space-y-4]:space-y-4 [&_.space-y-3]:space-y-3 [&_p]:leading-relaxed [&_.resume-header]:mb-5 [&_.resume-header]:pb-4";
      case "normal":
      default:
        return "";
    }
  };

  const renderTemplate = () => {
    switch (settings.template) {
      case "tech":
        return <TechTemplate resume={resume} />;
      case "corporate":
        return <CorporateTemplate resume={resume} />;
      case "creative":
        return <CreativeTemplate resume={resume} />;
      case "academic":
        return <AcademicTemplate resume={resume} />;
      case "professional":
        return <ProfessionalTemplate resume={resume} />;
      case "minimal":
        return <MinimalTemplate resume={resume} />;
      case "executive":
        return <ExecutiveTemplate resume={resume} />;
      case "modern":
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div
      {...(!isThumbnail ? { id: "resume-preview-document" } : {})}
      className={cn(
        "bg-white text-slate-900 transition-all duration-300 relative",
        !isThumbnail && "shadow-2xl print:shadow-none print:m-0",
        // Exact A4 dimensions in mm: 210mm x 297mm
        "w-[210mm] min-h-[297mm] overflow-hidden print:overflow-visible print:h-auto print:min-h-0",
        getFontFamilyClass(settings.fontFamily),
        getSpacingClass(settings.spacing),
        getFontSizeClass(settings.fontSize),
        className
      )}
      style={{
        boxSizing: "border-box",
      }}
    >
      <div className="w-full h-full print:h-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};
