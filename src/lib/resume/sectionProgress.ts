import { Resume } from "./types";
import { templateSupportsPhoto } from "./presets";

export interface DetailItem {
  id: string;
  label: string;
  description?: string;
  isCompleted: boolean;
  isRequired?: boolean;
  targetFieldId?: string;
}

export interface SectionProgressResult {
  sectionKey: string;
  title: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  pendingItems: DetailItem[];
  completedItems: DetailItem[];
  statusText: string;
  isFullyCompleted: boolean;
}

/**
 * Calculates detailed completion progress and pending items for any given section.
 * A field or section only counts as completed once the user has actively modified/filled it.
 */
export function getSectionProgress(
  sectionKey: string,
  resume: Resume,
  touchedFields: Record<string, boolean> = {}
): SectionProgressResult {
  const items: DetailItem[] = [];
  let sectionTitle = "Details";

  switch (sectionKey) {
    case "personalInfo": {
      sectionTitle = "Personal Information";
      const info = resume.personalInfo || {};
      const supportsPhoto = templateSupportsPhoto(resume.settings?.template);

      items.push({
        id: "fullName",
        label: "Full Name",
        description: "Your first and last name",
        isCompleted: Boolean(touchedFields["personalInfo.fullName"] && info.fullName?.trim()),
        isRequired: true,
        targetFieldId: "field-fullName",
      });

      items.push({
        id: "title",
        label: "Professional Title",
        description: "Target job title or specialization",
        isCompleted: Boolean(touchedFields["personalInfo.title"] && info.title?.trim()),
        isRequired: true,
        targetFieldId: "field-title",
      });

      items.push({
        id: "email",
        label: "Email Address",
        description: "Professional contact email",
        isCompleted: Boolean(
          touchedFields["personalInfo.email"] &&
            info.email?.trim() &&
            info.email.includes("@")
        ),
        isRequired: true,
        targetFieldId: "field-email",
      });

      items.push({
        id: "phone",
        label: "Phone Number",
        description: "Contact phone or mobile number",
        isCompleted: Boolean(touchedFields["personalInfo.phone"] && info.phone?.trim()),
        isRequired: true,
        targetFieldId: "field-phone",
      });

      items.push({
        id: "location",
        label: "Location",
        description: "City and State / Country",
        isCompleted: Boolean(touchedFields["personalInfo.location"] && info.location?.trim()),
        isRequired: false,
        targetFieldId: "field-location",
      });

      items.push({
        id: "linkedin",
        label: "LinkedIn Profile",
        description: "Link to your LinkedIn page",
        isCompleted: Boolean(touchedFields["personalInfo.linkedin"] && info.linkedin?.trim()),
        isRequired: false,
        targetFieldId: "field-linkedin",
      });

      items.push({
        id: "github",
        label: "GitHub Profile",
        description: "Link to code portfolio or profile",
        isCompleted: Boolean(touchedFields["personalInfo.github"] && info.github?.trim()),
        isRequired: false,
        targetFieldId: "field-github",
      });

      items.push({
        id: "website",
        label: "Portfolio / Website",
        description: "Personal website or portfolio link",
        isCompleted: Boolean(touchedFields["personalInfo.website"] && info.website?.trim()),
        isRequired: false,
        targetFieldId: "field-website",
      });

      if (supportsPhoto) {
        items.push({
          id: "photo",
          label: "Profile Photo",
          description: "Professional headshot photo",
          isCompleted: Boolean(touchedFields["personalInfo.photo"] && info.photo?.trim()),
          isRequired: false,
          targetFieldId: "field-photo",
        });
      }
      break;
    }

    case "summary": {
      sectionTitle = "Professional Summary";
      const text = resume.summary?.trim() || "";
      const wordCount = text ? text.split(/\s+/).length : 0;
      const isUserEdited = Boolean(touchedFields.summary && text);

      items.push({
        id: "summaryText",
        label: "Summary Statement",
        description: "Overview of background and key strengths",
        isCompleted: isUserEdited && text.length > 0,
        isRequired: true,
        targetFieldId: "field-summary-text",
      });

      items.push({
        id: "summaryLength",
        label: "Target Word Count",
        description: "At least 25 words for strong ATS impact",
        isCompleted: isUserEdited && wordCount >= 25,
        isRequired: false,
        targetFieldId: "field-summary-text",
      });

      items.push({
        id: "summaryDepth",
        label: "Key Achievements & Skills",
        description: "Mention specific skills, years of experience, or measurable outcomes",
        isCompleted: isUserEdited && text.length >= 80,
        isRequired: false,
        targetFieldId: "field-summary-text",
      });
      break;
    }

    case "experience": {
      sectionTitle = "Work Experience";
      const list = resume.experience || [];
      const isUserEdited = Boolean(touchedFields.experience && list.length > 0);

      items.push({
        id: "expEntries",
        label: "Add Work Experience",
        description: "Add at least one relevant work or internship experience",
        isCompleted: isUserEdited,
        isRequired: true,
        targetFieldId: "field-experience-add",
      });

      items.push({
        id: "expJobTitle",
        label: "Job Title & Company",
        description: "Provide position title and company name for all roles",
        isCompleted: isUserEdited && list.every((e) => Boolean(e.jobTitle?.trim() && e.company?.trim())),
        isRequired: true,
        targetFieldId: "field-experience-first",
      });

      items.push({
        id: "expDates",
        label: "Employment Dates",
        description: "Specify start dates and current/end dates",
        isCompleted: isUserEdited && list.every((e) => Boolean(e.startDate?.trim())),
        isRequired: true,
        targetFieldId: "field-experience-first",
      });

      items.push({
        id: "expDescription",
        label: "Key Accomplishments",
        description: "Add bullet points or description highlighting results and technologies",
        isCompleted: isUserEdited && list.every((e) => Boolean(e.description?.trim())),
        isRequired: false,
        targetFieldId: "field-experience-first",
      });
      break;
    }

    case "education": {
      sectionTitle = "Education";
      const list = resume.education || [];
      const isUserEdited = Boolean(touchedFields.education && list.length > 0);

      items.push({
        id: "eduEntries",
        label: "Add Education Entry",
        description: "Add at least one degree, diploma, or academic program",
        isCompleted: isUserEdited,
        isRequired: true,
        targetFieldId: "field-education-add",
      });

      items.push({
        id: "eduDegree",
        label: "Degree / Qualification",
        description: "Specify degree or field of study",
        isCompleted: isUserEdited && list.every((e) => Boolean(e.degree?.trim())),
        isRequired: true,
        targetFieldId: "field-education-first",
      });

      items.push({
        id: "eduInstitution",
        label: "Institution / University",
        description: "Enter school, college, or university name",
        isCompleted: isUserEdited && list.every((e) => Boolean(e.institution?.trim())),
        isRequired: true,
        targetFieldId: "field-education-first",
      });

      items.push({
        id: "eduDates",
        label: "Graduation Dates",
        description: "Add graduation year or enrollment dates",
        isCompleted: isUserEdited && list.every((e) => Boolean(e.startDate?.trim() || e.endDate?.trim())),
        isRequired: false,
        targetFieldId: "field-education-first",
      });
      break;
    }

    case "skills": {
      sectionTitle = "Skills & Proficiencies";
      const list = resume.skills || [];
      const isUserEdited = Boolean(touchedFields.skills && list.length > 0);

      items.push({
        id: "skillsCount",
        label: "Core Skills (3+ minimum)",
        description: "Add key technical, functional, or soft skills",
        isCompleted: isUserEdited && list.length >= 3,
        isRequired: true,
        targetFieldId: "field-skills-input",
      });

      items.push({
        id: "skillsOptimal",
        label: "Optimal Skill Coverage (6+ skills)",
        description: "Include a wide range of relevant skills for ATS keyword matching",
        isCompleted: isUserEdited && list.length >= 6,
        isRequired: false,
        targetFieldId: "field-skills-input",
      });

      items.push({
        id: "skillsCategories",
        label: "Categorization / Levels",
        description: "Organize skills into categories (e.g. Frontend, Backend, Tools)",
        isCompleted: isUserEdited && list.some((s) => Boolean(s.category?.trim() || s.level?.trim())),
        isRequired: false,
        targetFieldId: "field-skills-input",
      });
      break;
    }

    case "projects": {
      sectionTitle = "Projects";
      const list = resume.projects || [];
      const isUserEdited = Boolean(touchedFields.projects && list.length > 0);

      items.push({
        id: "projectEntries",
        label: "Add Notable Project",
        description: "Showcase personal, academic, or professional projects",
        isCompleted: isUserEdited,
        isRequired: true,
        targetFieldId: "field-projects-add",
      });

      items.push({
        id: "projectTitles",
        label: "Project Title & Description",
        description: "Add descriptive project titles and key highlights",
        isCompleted: isUserEdited && list.every((p) => Boolean(p.name?.trim() && p.description?.trim())),
        isRequired: true,
        targetFieldId: "field-projects-first",
      });

      items.push({
        id: "projectTech",
        label: "Technologies Used",
        description: "Mention languages, frameworks, or tools used in the project",
        isCompleted: isUserEdited && list.every((p) => Boolean(p.technologies?.trim())),
        isRequired: false,
        targetFieldId: "field-projects-first",
      });

      items.push({
        id: "projectLinks",
        label: "Demo or Repository Link",
        description: "Provide live demo link or GitHub repository link",
        isCompleted: isUserEdited && list.some((p) => Boolean(p.projectUrl?.trim() || p.githubUrl?.trim())),
        isRequired: false,
        targetFieldId: "field-projects-first",
      });
      break;
    }

    case "certifications": {
      sectionTitle = "Certifications";
      const list = resume.certifications || [];
      const isUserEdited = Boolean(touchedFields.certifications && list.length > 0);

      items.push({
        id: "certEntries",
        label: "Add Certification",
        description: "List industry licenses, credentials, or course certificates",
        isCompleted: isUserEdited,
        isRequired: true,
        targetFieldId: "field-cert-add",
      });

      items.push({
        id: "certDetails",
        label: "Name & Issuer",
        description: "Specify certificate title and issuing body (e.g. AWS, Google, Meta)",
        isCompleted: isUserEdited && list.every((c) => Boolean(c.name?.trim() && c.issuer?.trim())),
        isRequired: true,
        targetFieldId: "field-cert-first",
      });

      items.push({
        id: "certDateOrUrl",
        label: "Date or Verification URL",
        description: "Add issue date or credential verification link",
        isCompleted: isUserEdited && list.some((c) => Boolean(c.date?.trim() || c.url?.trim())),
        isRequired: false,
        targetFieldId: "field-cert-first",
      });
      break;
    }

    case "languages": {
      sectionTitle = "Languages";
      const list = resume.languages || [];
      const isUserEdited = Boolean(touchedFields.languages && list.length > 0);

      items.push({
        id: "langEntries",
        label: "Add Spoken Language",
        description: "List languages you speak or write",
        isCompleted: isUserEdited,
        isRequired: true,
        targetFieldId: "field-lang-add",
      });

      items.push({
        id: "langProficiency",
        label: "Proficiency Level",
        description: "Select fluency (Native, Fluent, Professional, etc.)",
        isCompleted: isUserEdited && list.every((l) => Boolean(l.proficiency?.trim())),
        isRequired: true,
        targetFieldId: "field-lang-first",
      });
      break;
    }

    case "achievements": {
      sectionTitle = "Key Achievements";
      const list = resume.achievements || [];
      const isUserEdited = Boolean(touchedFields.achievements && list.length > 0);

      items.push({
        id: "achEntries",
        label: "Add Key Achievement",
        description: "Highlight awards, honors, hackathons, or recognitions",
        isCompleted: isUserEdited,
        isRequired: true,
        targetFieldId: "field-ach-add",
      });

      items.push({
        id: "achDetails",
        label: "Achievement Title & Details",
        description: "Describe the achievement and context",
        isCompleted: isUserEdited && list.every((a) => Boolean(a.title?.trim() && a.description?.trim())),
        isRequired: true,
        targetFieldId: "field-ach-first",
      });
      break;
    }

    default: {
      // Custom section
      const customSec = resume.customSections?.find((cs) => cs.id === sectionKey);
      sectionTitle = customSec?.title || "Custom Section";
      const list = customSec?.items || [];
      const isUserEdited = Boolean(touchedFields[sectionKey] || touchedFields.custom);

      items.push({
        id: "customTitle",
        label: "Section Title",
        description: "Name your custom section",
        isCompleted: isUserEdited && Boolean(customSec?.title?.trim()),
        isRequired: true,
        targetFieldId: "field-custom-title",
      });

      items.push({
        id: "customEntries",
        label: "Add Section Items",
        description: "Add items or entries to this custom section",
        isCompleted: isUserEdited && list.length > 0,
        isRequired: true,
        targetFieldId: "field-custom-add",
      });

      items.push({
        id: "customItemDetails",
        label: "Item Details",
        description: "Provide title and description for each item",
        isCompleted: isUserEdited && list.length > 0 && list.every((i) => Boolean(i.title?.trim())),
        isRequired: false,
        targetFieldId: "field-custom-first",
      });
      break;
    }
  }

  const completedItems = items.filter((i) => i.isCompleted);
  const pendingItems = items.filter((i) => !i.isCompleted);
  const totalCount = items.length;
  const completedCount = completedItems.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isFullyCompleted = percentage === 100;

  let statusText = "Not Started";
  if (percentage === 100) {
    statusText = "Completed";
  } else if (percentage >= 75) {
    statusText = "Almost Done";
  } else if (percentage > 0) {
    statusText = "In Progress";
  }

  return {
    sectionKey,
    title: sectionTitle,
    completedCount,
    totalCount,
    percentage,
    pendingItems,
    completedItems,
    statusText,
    isFullyCompleted,
  };
}
