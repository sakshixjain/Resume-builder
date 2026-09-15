import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    achievements,
    customSections,
    sectionOrder,
    sectionVisibility,
    settings,
  } = resume;
  const primaryColor = settings.primaryColor || "#0f172a";

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Executive Summary
            </h3>
            <p className="text-[11px] text-slate-700 leading-relaxed font-normal">
              {summary}
            </p>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Professional Experience
            </h3>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{exp.jobTitle}</span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] font-medium mb-1" style={{ color: primaryColor }}>
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-slate-400 font-normal">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Education & Credentials
            </h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="resume-item">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium">{edu.institution} {edu.location ? `— ${edu.location}` : ""}</div>
                  {edu.gpa && <div className="text-[10px] text-slate-500">GPA: {edu.gpa}</div>}
                  {edu.description && <p className="text-[11px] text-slate-600 mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Core Competencies
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {skills.map((s) => (
                <div key={s.id} className="resume-item flex items-center justify-between bg-slate-50 p-1.5 border border-slate-300">
                  <span className="font-semibold text-slate-800">{s.name}</span>
                  {s.level && <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 bg-slate-200 text-slate-800">{s.level}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Key Initiatives & Projects
            </h3>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900">{proj.name}</span>
                    {proj.startDate && (
                      <span className="text-[10px] text-slate-400">
                        {formatDateRange(proj.startDate, proj.endDate)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] text-slate-500 font-medium">
                      Tools: {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-[11px] text-slate-600 mt-0.5 whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Certifications
            </h3>
            <div className="space-y-1.5 text-[11px]">
              {certifications.map((c) => (
                <div key={c.id} className="resume-item flex justify-between">
                  <span className="font-medium text-slate-800">{c.name} — <span className="text-slate-500 font-normal">{c.issuer}</span></span>
                  <span className="text-[10px] text-slate-400">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Languages
            </h3>
            <div className="flex flex-wrap gap-4 text-[11px]">
              {languages.map((l) => (
                <span key={l.id}>
                  <span className="font-semibold text-slate-800">{l.name}</span>: {l.proficiency}
                </span>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Honors & Distinctions
            </h3>
            <div className="space-y-1.5 text-[11px]">
              {achievements.map((ach) => (
                <div key={ach.id} className="resume-item">
                  <span className="font-bold text-slate-900">{ach.title}</span>
                  {ach.date && <span className="text-slate-400 text-[10px] ml-1">({ach.date})</span>}
                  {ach.description && <p className="text-slate-600 mt-0.5">{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        const customSec = customSections?.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              {customSec.title}
            </h3>
            <div className="space-y-1.5 text-[11px]">
              {customSec.items.map((item) => (
                <div key={item.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    {item.date && <span className="text-slate-400 text-[10px]">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="text-slate-500 italic text-[10px]">{item.subtitle}</div>}
                  {item.description && <p className="text-slate-600 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="resume-template-root w-full h-full font-sans text-slate-800 flex flex-col justify-start">
      {/* Top Navy Header Banner */}
      <div className="resume-header p-8 text-white" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-2xl font-black uppercase tracking-tight">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm font-medium tracking-wide text-slate-200 mt-0.5">
          {personalInfo.title || "Executive Role"}
        </p>

        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap gap-4 text-[10px] text-slate-200">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-white/80" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-white/80" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-white/80" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3 h-3 text-white/80" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="resume-main p-8 flex-1 space-y-1">
        {sectionOrder.map((sec) => renderSection(sec))}
      </div>
    </div>
  );
};
