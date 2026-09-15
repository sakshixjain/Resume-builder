import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Code2,
  ExternalLink,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const TechTemplate: React.FC<TemplateProps> = ({ resume }) => {
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

  const primaryColor = settings.primaryColor || "#2563eb";

  // Group skills by category if available, otherwise flat list
  const skillCategories = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category || "Core Technologies";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="mb-4">
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Technical Summary
              </h2>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line text-justify">
              {summary}
            </p>
          </div>
        );

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" className="mb-4">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Technical Skills & Architecture
              </h2>
            </div>
            <div className="space-y-2">
              {Object.entries(skillCategories).map(([category, items]) => (
                <div key={category} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[11px] font-bold text-slate-800 shrink-0 min-w-[110px]">
                    {category}:
                  </span>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {items.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className="ml-1 text-[9px] text-slate-400 font-mono">
                            ({skill.level})
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Engineering Experience
              </h2>
            </div>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[12px] font-bold text-slate-900">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 font-medium">
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
                            <span className="text-slate-400 font-mono select-none text-[9px] mt-1">▸</span>
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
          <div key="projects" className="mb-4">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Key Technical Projects & Open Source
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="p-2.5 rounded bg-slate-50 border border-slate-200/90">
                  <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11.5px] font-bold text-slate-900">{proj.name}</span>
                      {proj.projectUrl && (
                        <span className="inline-flex items-center gap-0.5 text-[9.5px] font-mono text-blue-600">
                          <ExternalLink className="w-2.5 h-2.5" />
                          {proj.projectUrl.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                      {proj.githubUrl && (
                        <span className="inline-flex items-center gap-0.5 text-[9.5px] font-mono text-slate-600">
                          <GithubIcon className="w-2.5 h-2.5" />
                          {proj.githubUrl.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </div>
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[9.5px] font-mono text-slate-500">
                        {formatDateRange(proj.startDate || "", proj.endDate || "", false)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1 mb-1">
                      {proj.technologies.split(",").map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-white text-slate-700 border border-slate-200"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-[10.5px] text-slate-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="mb-4">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Education & Academics
              </h2>
            </div>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[11.5px] font-bold text-slate-900">{edu.degree}</h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formatDateRange(edu.startDate, edu.endDate, false)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] mb-0.5">
                    <span className="font-medium text-slate-700">{edu.institution}</span>
                    {edu.gpa && (
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-[10px] text-slate-600 leading-normal">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-4">
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Certifications & Cloud Accreditations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-[10.5px] flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-200/80">
                  <div className="truncate pr-2">
                    <span className="font-bold text-slate-800 block truncate">{cert.name}</span>
                    <span className="text-[9.5px] text-slate-500">{cert.issuer}</span>
                  </div>
                  {cert.date && (
                    <span className="text-[9px] font-mono text-slate-500 shrink-0">{cert.date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-4">
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Hackathons, Honors & Awards
              </h2>
            </div>
            <div className="space-y-1.5">
              {achievements.map((ach) => (
                <div key={ach.id} className="text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{ach.title}</span>
                    {ach.date && (
                      <span className="text-[9.5px] font-mono text-slate-500">{ach.date}</span>
                    )}
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
          <div key="languages" className="mb-4">
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10.5px]">
              {languages.map((lang) => (
                <span key={lang.id} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  <span className="font-semibold text-slate-900">{lang.name}</span>
                  <span className="text-slate-500 ml-1">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        );

      default:
        // Handle custom sections
        const customSec = customSections.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="mb-4">
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
              <span className="font-mono text-xs font-bold" style={{ color: primaryColor }}>
                //
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {customSec.title}
              </h2>
            </div>
            <div className="space-y-2">
              {customSec.items.map((item) => (
                <div key={item.id} className="text-[10.5px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    {item.date && (
                      <span className="text-[9.5px] font-mono text-slate-500">{item.date}</span>
                    )}
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
    <div className="p-8 font-sans text-slate-800 bg-white min-h-[297mm] flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="mb-5 pb-4 border-b-2 border-slate-900">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 font-mono">
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              <p
                className="text-sm font-bold tracking-wide uppercase mt-0.5"
                style={{ color: primaryColor }}
              >
                {personalInfo.title || "Full Stack Software Engineer"}
              </p>
            </div>

            {/* Contact Grid */}
            <div className="text-[10px] font-mono text-slate-600 space-y-1 sm:text-right">
              {personalInfo.email && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{personalInfo.email}</span>
                  <Mail className="w-3 h-3 text-slate-400" />
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{personalInfo.phone}</span>
                  <Phone className="w-3 h-3 text-slate-400" />
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{personalInfo.location}</span>
                  <MapPin className="w-3 h-3 text-slate-400" />
                </div>
              )}
            </div>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono">
            {personalInfo.github && (
              <span className="flex items-center gap-1 text-slate-700">
                <GithubIcon className="w-3.5 h-3.5 text-slate-900" />
                {personalInfo.github.replace(/^https?:\/\//, "")}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1 text-slate-700">
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
                {personalInfo.linkedin.replace(/^https?:\/\//, "")}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1 text-slate-700">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                {personalInfo.website.replace(/^https?:\/\//, "")}
              </span>
            )}
          </div>
        </header>

        {/* Dynamic Section Ordering */}
        <main>{sectionOrder.map((sectionKey) => renderSection(sectionKey))}</main>
      </div>

      {/* Subtle Bottom Accent */}
      <footer className="pt-3 border-t border-slate-200 flex justify-between items-center text-[9px] font-mono text-slate-400">
        <span>// COMPILED FOR TECHNICAL ATS</span>
        <span>PAGE 1 / 1</span>
      </footer>
    </div>
  );
};
