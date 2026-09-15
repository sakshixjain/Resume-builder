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
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, className }) => {
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

  // Font size scale mapping
  const getFontSizeClass = (size: string) => {
    switch (size) {
      case "sm":
        return "scale-[0.92] origin-top";
      case "lg":
        return "scale-[1.05] origin-top";
      case "md":
      default:
        return "";
    }
  };

  // Line spacing mapping
  const getSpacingClass = (spacing: string) => {
    switch (spacing) {
      case "compact":
        return "[&_*]:leading-tight [&_p]:mb-1";
      case "relaxed":
        return "[&_*]:leading-loose [&_p]:mb-3";
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
      id="resume-preview-document"
      className={cn(
        "bg-white text-slate-900 shadow-2xl transition-all duration-300 relative print:shadow-none print:m-0",
        // Exact A4 dimensions in mm: 210mm x 297mm
        "w-[210mm] min-h-[297mm] overflow-hidden",
        getFontFamilyClass(settings.fontFamily),
        getSpacingClass(settings.spacing),
        className
      )}
      style={{
        // A4 standard box sizing
        boxSizing: "border-box",
      }}
    >
      <div className={cn("w-full h-full", getFontSizeClass(settings.fontSize))}>
        {renderTemplate()}
      </div>
    </div>
  );
};
