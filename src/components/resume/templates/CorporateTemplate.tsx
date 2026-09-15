import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ resume }) => {
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

  const primaryColor = settings.primaryColor || "#0f766e";

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Executive Profile & Leadership Scope
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        );

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Core Business Competencies & Strategic Domains
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="resume-item flex items-center gap-1.5 text-[10.5px] font-medium text-slate-800"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Professional Career History & Business Impact
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[12px] font-bold text-slate-950">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-[10.5px] font-semibold text-slate-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="font-semibold" style={{ color: primaryColor }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="text-[10px] text-slate-500 italic">{exp.location}</span>
                    )}
                  </div>
                  {exp.description && (
                    <div className="text-[10.5px] text-slate-700 leading-relaxed whitespace-pre-line space-y-0.5">
                      {exp.description.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*");
                        const cleanLine = isBullet ? trimmed.replace(/^[-•*]\s*/, "") : trimmed;
                        return (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-slate-400 font-bold select-none text-[10px] mt-0.5">•</span>
                            <span className="flex-1">{cleanLine}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Academic Background & Executive Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="resume-item flex justify-between items-start flex-wrap gap-1">
                  <div>
                    <h3 className="text-[11.5px] font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-[10.5px] text-slate-600 font-medium">
                      {edu.institution} {edu.location && `— ${edu.location}`}
                    </p>
                    {edu.description && (
                      <p className="text-[10px] text-slate-600 mt-0.5">{edu.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10.5px] font-medium text-slate-500 block">
                      {formatDateRange(edu.startDate, edu.endDate, false)}
                    </span>
                    {edu.gpa && (
                      <span className="text-[10px] font-semibold text-slate-700">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Strategic Initiatives & Major Campaigns
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-[11px]">{proj.name}</span>
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[10px] text-slate-500">
                        {formatDateRange(proj.startDate || "", proj.endDate || "", false)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] text-slate-600 italic mb-0.5">
                      Scope: {proj.technologies}
                    </div>
                  )}
                  <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Executive Credentials & Industry Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="resume-item text-[10.5px] border-l-2 pl-2" style={{ borderColor: primaryColor }}>
                  <span className="font-bold text-slate-800 block">{cert.name}</span>
                  <span className="text-[9.5px] text-slate-500">
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Key Honors & Industry Recognition
            </h2>
            <div className="space-y-1.5">
              {achievements.map((ach) => (
                <div key={ach.id} className="resume-item text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{ach.title}</span>
                    {ach.date && <span className="text-[9.5px] text-slate-500">{ach.date}</span>}
                  </div>
                  <p className="text-[10px] text-slate-600">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Languages & Global Communication
            </h2>
            <div className="flex flex-wrap gap-3 text-[10.5px]">
              {languages.map((lang) => (
                <span key={lang.id} className="resume-item font-medium text-slate-800">
                  {lang.name} <span className="text-slate-500">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        );

      default:
        const customSec = customSections.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              {customSec.title}
            </h2>
            <div className="space-y-2">
              {customSec.items.map((item) => (
                <div key={item.id} className="resume-item text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    {item.date && <span className="text-[9.5px] text-slate-500">{item.date}</span>}
                  </div>
                  {item.subtitle && (
                    <div className="text-[10px] text-slate-600 font-medium">{item.subtitle}</div>
                  )}
                  {item.description && (
                    <p className="text-[10px] text-slate-600 mt-0.5 whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="resume-template-root p-8 font-serif text-slate-900 bg-white min-h-[297mm]">
      {/* Authoritative Corporate Header */}
      <div className="resume-header text-center mb-5 pb-4 border-b-2 border-slate-900">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-950">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p
          className="text-xs sm:text-sm font-bold tracking-widest uppercase mt-1"
          style={{ color: primaryColor }}
        >
          {personalInfo.title || "Director of Operations & Strategy"}
        </p>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-[10.5px] font-sans text-slate-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && (
            <span>• {personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
          )}
          {personalInfo.website && (
            <span>• {personalInfo.website.replace(/^https?:\/\//, "")}</span>
          )}
        </div>
      </div>

      {/* Main Section Content */}
      <div className="resume-main font-sans">{sectionOrder.map((sectionKey) => renderSection(sectionKey))}</div>
    </div>
  );
};
