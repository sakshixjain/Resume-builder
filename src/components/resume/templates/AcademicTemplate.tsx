import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  BookOpen,
  Award,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const AcademicTemplate: React.FC<TemplateProps> = ({ resume }) => {
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

  const primaryColor = settings.primaryColor || "#1e3a8a";

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Research Statement & Profile
            </h2>
            <p className="text-[11px] text-slate-800 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        );

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Academic Education & Degrees
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[11.5px] font-bold text-slate-950">{edu.degree}</h3>
                    <span className="text-[10.5px] text-slate-600 font-medium">
                      {formatDateRange(edu.startDate, edu.endDate, false)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic">
                    {edu.institution} {edu.location && `— ${edu.location}`}
                  </div>
                  {edu.description && (
                    <p className="text-[10.5px] text-slate-700 mt-0.5 leading-relaxed whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Academic Appointments & Research Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[11.5px] font-bold text-slate-950">{exp.jobTitle}</h3>
                    <span className="text-[10.5px] text-slate-600 font-medium">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic mb-1">
                    {exp.company} {exp.location && `— ${exp.location}`}
                  </div>
                  {exp.description && (
                    <div className="text-[10.5px] text-slate-800 leading-relaxed whitespace-pre-line space-y-0.5">
                      {exp.description.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*");
                        const cleanLine = isBullet ? trimmed.replace(/^[-•*]\s*/, "") : trimmed;
                        return (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-slate-500 font-bold select-none text-[10px] mt-0.5">•</span>
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

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Research Methodologies & Technical Expertise
            </h2>
            <div className="text-[10.5px] text-slate-800 leading-relaxed">
              {skills.map((skill, idx) => (
                <span key={skill.id}>
                  <strong className="font-semibold text-slate-900">{skill.name}</strong>
                  {skill.category && <span className="text-slate-500 text-[10px]"> ({skill.category})</span>}
                  {idx < skills.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Research Projects & Computational Frameworks
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950 text-[11px]">{proj.name}</span>
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[10px] text-slate-500">
                        {formatDateRange(proj.startDate || "", proj.endDate || "", false)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] text-slate-600 italic mb-0.5">
                      Keywords: {proj.technologies}
                    </div>
                  )}
                  <p className="text-slate-800 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Fellowships & Professional Accreditations
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    {cert.date && <span className="text-[10px] text-slate-500">{cert.date}</span>}
                  </div>
                  <span className="text-[10px] text-slate-600 italic">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Honors, Grants & Scientific Awards
            </h2>
            <div className="space-y-1.5">
              {achievements.map((ach) => (
                <div key={ach.id} className="text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{ach.title}</span>
                    {ach.date && <span className="text-[10px] text-slate-500">{ach.date}</span>}
                  </div>
                  <p className="text-[10px] text-slate-700">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "languages":
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              Languages & Scholarly Translation
            </h2>
            <div className="text-[10.5px] text-slate-800">
              {languages.map((lang, idx) => (
                <span key={lang.id}>
                  <strong className="font-semibold text-slate-900">{lang.name}</strong> ({lang.proficiency})
                  {idx < languages.length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        const customSec = customSections.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="mb-4">
            <h2
              className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}60` }}
            >
              {customSec.title}
            </h2>
            <div className="space-y-2">
              {customSec.items.map((item) => (
                <div key={item.id} className="text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950">{item.title}</span>
                    {item.date && <span className="text-[10px] text-slate-500">{item.date}</span>}
                  </div>
                  {item.subtitle && (
                    <div className="text-[10.5px] text-slate-700 italic">{item.subtitle}</div>
                  )}
                  {item.description && (
                    <p className="text-[10px] text-slate-700 mt-0.5 whitespace-pre-line leading-relaxed">
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
    <div className="p-8 font-serif text-slate-900 bg-white min-h-[297mm]">
      {/* Formal Academic Header */}
      <header className="text-center mb-5 pb-3 border-b-2 border-slate-800">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-950">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mt-0.5">
          Curriculum Vitae
        </p>
        <p
          className="text-xs font-medium tracking-wide mt-0.5"
          style={{ color: primaryColor }}
        >
          {personalInfo.title || "Postdoctoral Research Fellow"}
        </p>

        {/* Contact Details */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-600 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• Tel: {personalInfo.phone}</span>}
          {personalInfo.email && <span>• Email: {personalInfo.email}</span>}
          {personalInfo.website && (
            <span>• Web: {personalInfo.website.replace(/^https?:\/\//, "")}</span>
          )}
        </div>
      </header>

      {/* Main Flow */}
      <main>{sectionOrder.map((sectionKey) => renderSection(sectionKey))}</main>
    </div>
  );
};
