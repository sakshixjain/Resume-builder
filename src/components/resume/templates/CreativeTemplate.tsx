import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ resume }) => {
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

  const primaryColor = settings.primaryColor || "#7c3aed";

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                About & Creative Vision
              </h2>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed text-justify bg-slate-50/80 p-3 rounded-lg border border-slate-100">
              {summary}
            </p>
          </div>
        );

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Creative Capabilities & Tools
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="resume-item px-2.5 py-1 rounded-full text-[10.5px] font-medium transition-all"
                  style={{
                    backgroundColor: `${primaryColor}12`,
                    color: primaryColor,
                    borderColor: `${primaryColor}25`,
                    borderWidth: "1px",
                  }}
                >
                  {skill.name}
                  {skill.level && (
                    <span className="opacity-70 text-[9.5px] ml-1">· {skill.level}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item relative pl-3.5 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[12px] font-bold text-slate-900">{exp.jobTitle}</h3>
                    <span className="text-[10px] font-medium text-slate-500">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="font-semibold" style={{ color: primaryColor }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="text-[10px] text-slate-500">{exp.location}</span>
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
                            <span className="text-slate-400 font-bold select-none text-[9px] mt-1">✦</span>
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

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Featured Portfolio & Campaigns
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-slate-900 text-[11.5px]">{proj.name}</span>
                      {proj.projectUrl && (
                        <span className="inline-flex items-center gap-0.5 text-[9.5px] text-purple-600">
                          <ExternalLink className="w-2.5 h-2.5" /> Link
                        </span>
                      )}
                    </div>
                    {proj.technologies && (
                      <div className="text-[9.5px] font-medium text-slate-500 mb-1">
                        {proj.technologies}
                      </div>
                    )}
                    <p className="text-[10px] text-slate-600 leading-relaxed">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Education & Academics
              </h2>
            </div>
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
                    <span className="text-[10px] font-medium text-slate-500 block">
                      {formatDateRange(edu.startDate, edu.endDate, false)}
                    </span>
                    {edu.gpa && (
                      <span className="text-[9.5px] font-semibold text-purple-700">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Certifications & Accreditations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="resume-item text-[10.5px] p-2 rounded bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-800 block">{cert.name}</span>
                  <span className="text-[9.5px] text-slate-500">{cert.issuer} {cert.date && `• ${cert.date}`}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="resume-section mb-3.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Honors & Creative Awards
              </h2>
            </div>
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10.5px]">
              {languages.map((lang) => (
                <span key={lang.id} className="resume-item px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  <span className="font-semibold text-slate-900">{lang.name}</span> ({lang.proficiency})
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="resume-section-title text-xs font-black uppercase tracking-wider text-slate-900">
                {customSec.title}
              </h2>
            </div>
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
    <div className="resume-template-root p-8 font-sans text-slate-900 bg-white min-h-[297mm]">
      {/* Dynamic Creative Header */}
      <div className="resume-header mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p
              className="text-xs sm:text-sm font-bold tracking-wide uppercase mt-0.5"
              style={{ color: primaryColor }}
            >
              {personalInfo.title || "Brand Strategist & Creative Director"}
            </p>
          </div>

          {/* Contact Details */}
          <div className="text-[10.5px] text-slate-600 space-y-1 sm:text-right">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {/* Links Strip */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-slate-200/60 text-[10.5px]">
          {personalInfo.website && (
            <span className="flex items-center gap-1 font-semibold" style={{ color: primaryColor }}>
              <Globe className="w-3.5 h-3.5" />
              {personalInfo.website.replace(/^https?:\/\//, "")}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1 text-slate-700">
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              {personalInfo.linkedin.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
      </div>

      {/* Main Flow */}
      <div className="resume-main">{sectionOrder.map((sectionKey) => renderSection(sectionKey))}</div>
    </div>
  );
};
