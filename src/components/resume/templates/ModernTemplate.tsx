import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
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

  // Split name for dual-color styling (e.g. "SHUMAYLA KHAN")
  const getFormattedName = (fullName: string) => {
    if (!fullName) return { first: "YOUR", last: "NAME" };
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return { first: parts[0].toUpperCase(), last: "" };
    }
    const last = parts.pop() || "";
    const first = parts.join(" ").toUpperCase();
    return { first, last: last.toUpperCase() };
  };

  const nameParts = getFormattedName(personalInfo.fullName);

  // Get Initials for avatar circle
  const getInitials = (name: string) => {
    if (!name) return "CV";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(personalInfo.fullName);

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Professional Summary
            </h2>
            <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-line text-justify">
              {summary}
            </p>
          </div>
        );

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <div key="education" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="resume-item">
                  {/* Top line: Degree & Date */}
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                    </div>
                  </div>

                  {/* Second line: Institution & Location */}
                  <div className="flex justify-between items-baseline text-[11px] text-slate-600 mb-0.5">
                    <span className="font-semibold text-slate-700">{edu.institution}</span>
                    {edu.location && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>

                  {/* GPA and Description */}
                  {edu.gpa && (
                    <div className="text-[10px] font-medium text-slate-600">
                      GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.description && (
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
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
          <div key="experience" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item">
                  {/* Top Line: Job Title & Date */}
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-xs font-bold text-slate-900">{exp.jobTitle}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    </div>
                  </div>

                  {/* Second Line: Company (Accent Color) & Location */}
                  <div className="flex justify-between items-baseline text-[11px] mb-1">
                    <span
                      className="font-bold tracking-tight"
                      style={{ color: primaryColor }}
                    >
                      {exp.company}
                    </span>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description / Bullet Points */}
                  {exp.description && (
                    <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line space-y-1">
                      {exp.description}
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
          <div key="skills" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Skills & Proficiencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="resume-item inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border text-slate-800"
                  style={{
                    backgroundColor: `${primaryColor}08`,
                    borderColor: `${primaryColor}25`,
                  }}
                >
                  {skill.name}
                  {skill.level && (
                    <span className="text-slate-400 ml-1 text-[9px]">
                      • {skill.level}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {proj.name}
                      {proj.projectUrl && (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-normal underline text-blue-600"
                        >
                          Live Demo
                        </a>
                      )}
                    </h3>
                    {proj.startDate && (
                      <span className="text-[10px] text-slate-400">
                        {formatDateRange(proj.startDate, proj.endDate)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] font-medium text-slate-500 mb-0.5">
                      Technologies: <span className="text-slate-700">{proj.technologies}</span>
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
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
          <div key="certifications" className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Certifications
            </h2>
            <div className="space-y-1.5 text-[11px]">
              {certifications.map((cert) => (
                <div key={cert.id} className="resume-item flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-slate-800">{cert.name}</span>
                    <span className="text-slate-500 ml-1.5">— {cert.issuer}</span>
                  </div>
                  {cert.date && <span className="text-[10px] text-slate-400">{cert.date}</span>}
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-700">
              {languages.map((l) => (
                <div key={l.id} className="resume-item flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900">{l.name}</span>
                  <span className="text-slate-500 text-[10px]">({l.proficiency})</span>
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
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              Key Achievements
            </h2>
            <ul className="space-y-1.5 text-[11px] text-slate-700">
              {achievements.map((ach) => (
                <li key={ach.id} className="resume-item flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: primaryColor }} />
                  <div>
                    <span className="font-semibold text-slate-900">{ach.title}</span>
                    {ach.date && <span className="text-slate-400 text-[10px] ml-1">({ach.date})</span>}
                    {ach.description && <p className="text-slate-600 mt-0.5">{ach.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        const customSec = customSections?.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="resume-section mb-3.5">
            <h2
              className="resume-section-title text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
              style={{ color: "#0f172a", borderColor: `${primaryColor}40` }}
            >
              {customSec.title}
            </h2>
            <div className="space-y-2">
              {customSec.items.map((item) => (
                <div key={item.id} className="resume-item text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-800">{item.title}</span>
                    {item.date && <span className="text-[10px] text-slate-400">{item.date}</span>}
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
    <div className="resume-template-root w-full h-full p-8 font-sans text-slate-800 flex flex-col justify-start bg-white min-h-[297mm]">
      {/* Top Header Banner matching screenshot */}
      <div className="resume-header pb-3 border-b border-slate-200/80 mb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {/* Dual color full name */}
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase leading-none">
              {nameParts.first}{" "}
              <span style={{ color: primaryColor }}>{nameParts.last}</span>
            </h1>

            {/* Subtitle / Role */}
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1.5">
              {personalInfo.title || "SENIOR FULL STACK SOFTWARE ENGINEER"}
            </p>
          </div>

          {/* Right Avatar circle with initials or photo */}
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-14 h-14 rounded-full object-cover border-2 shadow-2xs shrink-0"
              style={{ borderColor: primaryColor }}
            />
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-base shadow-2xs shrink-0 select-none"
              style={{
                backgroundColor: `${primaryColor}15`,
                color: primaryColor,
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Contact Links Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-600 font-medium mt-3 pt-2 border-t border-slate-100">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
            </div>
          )}

          {personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-slate-800" />
              <span>{personalInfo.github.replace(/^https?:\/\//, "")}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sections list rendered in user-configured order */}
      <div className="resume-main flex-1 space-y-1">
        {sectionOrder.map((sec) => renderSection(sec))}
      </div>
    </div>
  );
};
