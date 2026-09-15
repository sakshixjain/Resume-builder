import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
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
  const primaryColor = settings.primaryColor || "#1e293b";

  // Build contact line
  const contactParts: string[] = [];
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin.replace(/^https?:\/\//, ""));
  if (personalInfo.github) contactParts.push(personalInfo.github.replace(/^https?:\/\//, ""));
  if (personalInfo.website) contactParts.push(personalInfo.website.replace(/^https?:\/\//, ""));

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Professional Summary
            </h3>
            <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Work Experience
            </h3>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                    <span className="text-[11px] font-semibold text-slate-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] italic text-slate-700 mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line pl-2">
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Education
            </h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="resume-item">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900">{edu.institution}</span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] text-slate-700">
                    <span className="italic">{edu.degree}</span>
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                  {edu.gpa && <div className="text-[10px] text-slate-600 font-medium">GPA: {edu.gpa}</div>}
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Skills & Proficiencies
            </h3>
            <div className="text-[11px] text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Technical Skills: </span>
              {skills.map((s, idx) => (
                <span key={s.id}>
                  {s.name}
                  {s.level ? ` (${s.level})` : ""}
                  {idx < skills.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Projects
            </h3>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900">
                      {proj.name}
                      {proj.projectUrl && (
                        <span className="font-normal text-blue-700 ml-1.5">[{proj.projectUrl.replace(/^https?:\/\//, "")}]</span>
                      )}
                    </span>
                    {proj.startDate && (
                      <span className="text-[11px] text-slate-500">
                        {formatDateRange(proj.startDate, proj.endDate)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] italic text-slate-600">
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-[11px] text-slate-700 mt-0.5 whitespace-pre-line">
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Certifications
            </h3>
            <div className="space-y-1 text-[11px]">
              {certifications.map((cert) => (
                <div key={cert.id} className="resume-item flex justify-between items-baseline">
                  <span className="font-semibold text-slate-800">{cert.name} — <span className="font-normal text-slate-600">{cert.issuer}</span></span>
                  <span className="text-slate-500 text-[10px]">{cert.date}</span>
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Languages
            </h3>
            <div className="text-[11px] text-slate-700">
              {languages.map((l, idx) => (
                <span key={l.id}>
                  <span className="font-semibold">{l.name}</span> ({l.proficiency})
                  {idx < languages.length - 1 ? " | " : ""}
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Key Achievements & Honors
            </h3>
            <ul className="space-y-1 text-[11px] text-slate-700 list-disc list-inside">
              {achievements.map((ach) => (
                <li key={ach.id} className="resume-item">
                  <span className="font-semibold">{ach.title}</span>
                  {ach.date && <span className="text-slate-500 text-[10px] ml-1">({ach.date})</span>}
                  {ach.description && <span>: {ach.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        const customSec = customSections?.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="resume-section mb-4">
            <h3
              className="resume-section-title text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-1.5"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {customSec.title}
            </h3>
            <div className="space-y-1.5">
              {customSec.items.map((item) => (
                <div key={item.id} className="resume-item text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-800">{item.title}</span>
                    {item.date && <span className="text-slate-500 text-[10px]">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="italic text-slate-600 text-[10px]">{item.subtitle}</div>}
                  {item.description && <p className="text-slate-700 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="resume-template-root w-full h-full p-8 font-serif text-slate-800 flex flex-col justify-start">
      {/* Header */}
      <div className="resume-header text-center pb-3 border-b-2 mb-4" style={{ borderColor: primaryColor }}>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.title && (
          <p className="text-xs font-semibold tracking-wider text-slate-600 uppercase mt-0.5">
            {personalInfo.title}
          </p>
        )}
        {contactParts.length > 0 && (
          <div className="text-[10px] text-slate-600 mt-1.5 flex flex-wrap justify-center gap-x-2 gap-y-0.5">
            {contactParts.map((part, index) => (
              <span key={index}>
                {part}
                {index < contactParts.length - 1 && <span className="ml-2 text-slate-400">•</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sections in user configured order */}
      <div className="resume-main flex-1 space-y-1">
        {sectionOrder.map((sec) => renderSection(sec))}
      </div>
    </div>
  );
};
