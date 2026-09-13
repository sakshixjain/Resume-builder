import React from "react";
import { Resume } from "@/lib/resume/types";
import { formatDateRange } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  Code2,
  FolderGit2,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";

interface TemplateProps {
  resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, customSections, sectionOrder, sectionVisibility, settings } = resume;
  const primaryColor = settings.primaryColor || "#2563eb";
  const showIcons = settings.showIcons;

  const renderSection = (sectionKey: string) => {
    if (sectionVisibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case "summary":
        if (!summary) return null;
        return (
          <div key="summary" className="mb-5">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              {showIcons && <Sparkles className="w-3.5 h-3.5" />}
              About Me
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" className="mb-5">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              {showIcons && <Briefcase className="w-3.5 h-3.5" />}
              Work Experience
            </h3>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: `${primaryColor}50` }}>
                  <div
                    className="absolute -left-[5px] top-1 w-2 h-2"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h4 className="text-xs font-bold text-slate-900">{exp.jobTitle}</h4>
                    <span className="text-[10px] font-medium text-slate-500">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
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

      case "projects":
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" className="mb-5">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 pb-1 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              {showIcons && <FolderGit2 className="w-3.5 h-3.5" />}
              Featured Projects
            </h3>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50/70 p-2.5 border border-slate-200">
                  <div className="flex justify-between items-baseline flex-wrap gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
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
                    </h4>
                    {proj.startDate && (
                      <span className="text-[10px] text-slate-400">
                        {formatDateRange(proj.startDate, proj.endDate)}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[10px] font-mono text-slate-500 mb-1">
                      Tech: <span className="text-slate-700">{proj.technologies}</span>
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

      case "achievements":
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" className="mb-5">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              {showIcons && <Award className="w-3.5 h-3.5" />}
              Key Honors & Achievements
            </h3>
            <ul className="space-y-1.5">
              {achievements.map((ach) => (
                <li key={ach.id} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: primaryColor }} />
                  <div>
                    <span className="font-semibold">{ach.title}</span>
                    {ach.date && <span className="text-slate-400 text-[10px] ml-1">({ach.date})</span>}
                    {ach.description && <p className="text-slate-600 mt-0.5">{ach.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        // Handle custom section
        const customSec = customSections?.find((cs) => cs.id === sectionKey);
        if (!customSec || customSec.items.length === 0) return null;
        return (
          <div key={customSec.id} className="mb-5">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-1 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              {customSec.title}
            </h3>
            <div className="space-y-2">
              {customSec.items.map((item) => (
                <div key={item.id} className="text-[11px]">
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
    <div className="w-full h-full flex flex-col font-sans text-slate-800">
      {/* Top Header Banner */}
      <div className="p-6 pb-4 border-b border-slate-200 flex justify-between items-start gap-4" style={{ backgroundColor: `${primaryColor}08` }}>
        <div className="flex-1">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm font-semibold tracking-wide mt-0.5" style={{ color: primaryColor }}>
            {personalInfo.title || "Professional Job Title"}
          </p>
        </div>

        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt={personalInfo.fullName}
            className="w-16 h-16 object-cover border-2 shadow-xs"
            style={{ borderColor: primaryColor }}
          />
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-12 flex-1 p-6 gap-6">
        {/* Left Sidebar (4 cols) */}
        <div className="col-span-4 space-y-5 border-r border-slate-100 pr-4">
          {/* Contact Details */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-1 border-b"
              style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              Contact
            </h3>
            <div className="space-y-1.5 text-[10px] text-slate-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5 break-all">
                  <Mail className="w-3 h-3 shrink-0" style={{ color: primaryColor }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 shrink-0" style={{ color: primaryColor }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 shrink-0" style={{ color: primaryColor }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5 break-all">
                  <Globe className="w-3 h-3 shrink-0" style={{ color: primaryColor }} />
                  <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5 break-all">
                  <LinkedinIcon className="w-3 h-3 shrink-0" style={{ color: primaryColor }} />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "in/")}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5 break-all">
                  <GithubIcon className="w-3 h-3 shrink-0" style={{ color: primaryColor }} />
                  <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "gh/")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {sectionVisibility["education"] !== false && education && education.length > 0 && (
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1 pb-1 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                {showIcons && <GraduationCap className="w-3 h-3" />}
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[10px]">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700 font-medium">{edu.institution}</div>
                    <div className="text-slate-400">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </div>
                    {edu.gpa && <div className="text-slate-500 font-medium mt-0.5">GPA: {edu.gpa}</div>}
                    {edu.description && <p className="text-slate-600 mt-1 leading-normal">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {sectionVisibility["skills"] !== false && skills && skills.length > 0 && (
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1 pb-1 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                {showIcons && <Code2 className="w-3 h-3" />}
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-800 border border-slate-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sectionVisibility["languages"] !== false && languages && languages.length > 0 && (
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-1 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Languages
              </h3>
              <div className="space-y-1 text-[10px]">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-slate-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sectionVisibility["certifications"] !== false && certifications && certifications.length > 0 && (
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1 pb-1 border-b"
                style={{ color: primaryColor, borderColor: `${primaryColor}30` }}
              >
                Certifications
              </h3>
              <div className="space-y-2 text-[10px]">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-semibold text-slate-800">{cert.name}</div>
                    <div className="text-slate-500">{cert.issuer} ({cert.date})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Body (8 cols) */}
        <div className="col-span-8">
          {sectionOrder
            .filter((sec) => !["education", "skills", "languages", "certifications"].includes(sec))
            .map((sec) => renderSection(sec))}
        </div>
      </div>
    </div>
  );
};
