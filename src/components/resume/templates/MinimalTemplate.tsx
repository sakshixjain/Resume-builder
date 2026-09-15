import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ resume }) => {
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
  } = resume;

  const renderSection = (sectionKey: string, index: number) => {
    if (sectionVisibility[sectionKey] === false) return null;
    const num = (index + 1).toString().padStart(2, "0");

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Summary
            </div>
            <div className="col-span-9">
              <p className="text-xs text-slate-700 leading-relaxed font-light">
                {summary}
              </p>
            </div>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Experience
            </div>
            <div className="col-span-9 space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-semibold text-slate-900">{exp.jobTitle}</h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mb-1">
                    {exp.company} {exp.location ? `— ${exp.location}` : ""}
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-slate-600 font-light leading-relaxed whitespace-pre-line">
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
          <div key="education" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Education
            </div>
            <div className="col-span-9 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-semibold text-slate-900">{edu.institution}</h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {edu.degree} {edu.location ? `— ${edu.location}` : ""}
                  </div>
                  {edu.gpa && <div className="text-[10px] text-slate-400">GPA: {edu.gpa}</div>}
                  {edu.description && <p className="text-[11px] text-slate-500 font-light mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Skills
            </div>
            <div className="col-span-9">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700">
                {skills.map((s) => (
                  <span key={s.id} className="inline-flex items-center">
                    <span className="font-medium text-slate-800">{s.name}</span>
                    {s.level && <span className="text-[9px] text-slate-400 ml-1">({s.level})</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Projects
            </div>
            <div className="col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-semibold text-slate-900">
                      {proj.name}
                      {proj.projectUrl && (
                        <span className="text-[10px] font-normal text-slate-400 ml-1.5 underline">
                          {proj.projectUrl.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </h4>
                    {proj.startDate && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {formatDateRange(proj.startDate, proj.endDate)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-[11px] text-slate-600 font-light mt-0.5 leading-relaxed whitespace-pre-line">
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
          <div key="certifications" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Certs
            </div>
            <div className="col-span-9 space-y-1.5 text-[11px]">
              {certifications.map((c) => (
                <div key={c.id} className="resume-item flex justify-between items-baseline">
                  <span className="font-medium text-slate-800">{c.name} — <span className="text-slate-500 font-light">{c.issuer}</span></span>
                  <span className="text-[10px] font-mono text-slate-400">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Languages
            </div>
            <div className="col-span-9 flex flex-wrap gap-4 text-xs text-slate-700">
              {languages.map((l) => (
                <span key={l.id}>
                  <span className="font-medium">{l.name}</span>{" "}
                  <span className="text-[10px] text-slate-400">({l.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / Honors
            </div>
            <div className="col-span-9 space-y-1.5 text-[11px]">
              {achievements.map((ach) => (
                <div key={ach.id} className="resume-item">
                  <span className="font-semibold text-slate-900">{ach.title}</span>
                  {ach.date && <span className="text-slate-400 text-[10px] ml-1">[{ach.date}]</span>}
                  {ach.description && <p className="text-slate-600 font-light mt-0.5">{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        const customSec = customSections?.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="resume-section grid grid-cols-12 gap-4 mb-5">
            <div className="resume-section-title col-span-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {num} / {customSec.title}
            </div>
            <div className="col-span-9 space-y-2 text-[11px]">
              {customSec.items.map((item) => (
                <div key={item.id} className="resume-item">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">{item.title}</span>
                    {item.date && <span className="text-slate-400 text-[10px]">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="text-slate-500 italic text-[10px]">{item.subtitle}</div>}
                  {item.description && <p className="text-slate-600 font-light mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="resume-template-root w-full h-full p-8 font-sans text-slate-800 flex flex-col justify-start">
      {/* Top Header */}
      <div className="resume-header border-b border-slate-200 pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extralight tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mt-1">
            {personalInfo.title || "Professional Role"}
          </p>
        </div>

        <div className="text-right text-[10px] font-mono text-slate-500 space-y-0.5">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.website && <div>{personalInfo.website.replace(/^https?:\/\//, "")}</div>}
        </div>
      </div>

      {/* Sections */}
      <div className="resume-main flex-1">
        {sectionOrder.map((sec, idx) => renderSection(sec, idx))}
      </div>
    </div>
  );
};
