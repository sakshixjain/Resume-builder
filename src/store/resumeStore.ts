import { create } from "zustand";
import {
  Resume,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
  Achievement,
  CustomSection,
  CustomSectionItem,
  ResumeSettings,
  SectionType,
} from "@/lib/resume/types";
import { initialResumeData, emptyResumeData } from "@/lib/resume/defaultResume";
import { getStoredResume, saveResumeToStorage } from "@/lib/resume/storage";

interface ResumeStoreState {
  resume: Resume;
  saveStatus: "saved" | "saving" | "idle";
  activeSection: string;
  zoom: number;
  mobileTab: "edit" | "preview";
  history: Resume[];
  historyIndex: number;

  // Actions
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  // Education
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  // Skills
  addSkill: (skill?: Partial<Skill>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  // Projects
  addProject: () => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  
  // Languages
  addLanguage: (name?: string) => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  deleteLanguage: (id: string) => void;
  
  // Achievements
  addAchievement: () => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  
  // Custom Sections
  addCustomSection: (title?: string) => void;
  updateCustomSectionTitle: (id: string, title: string) => void;
  deleteCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => void;
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void;
  
  // Settings & Reordering
  updateSettings: (settings: Partial<ResumeSettings>) => void;
  setSectionOrder: (order: SectionType[]) => void;
  moveSection: (sectionKey: string, direction: "up" | "down") => void;
  toggleSectionVisibility: (sectionKey: string) => void;
  
  // Management
  resetToDefaultData: () => void;
  clearResumeData: () => void;
  setActiveSection: (section: string) => void;
  setZoom: (zoom: number | ((prev: number) => number)) => void;
  setMobileTab: (tab: "edit" | "preview") => void;
  
  // Undo / Redo
  undo: () => void;
  redo: () => void;
}

let saveTimeout: NodeJS.Timeout | null = null;

function triggerAutosave(get: () => ResumeStoreState, set: (state: Partial<ResumeStoreState>) => void) {
  set({ saveStatus: "saving" });
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const currentResume = get().resume;
    saveResumeToStorage(currentResume);
    set({ saveStatus: "saved" });
  }, 500);
}

export const useResumeStore = create<ResumeStoreState>((set, get) => ({
  resume: initialResumeData,
  saveStatus: "saved",
  activeSection: "personalInfo",
  zoom: 100,
  mobileTab: "edit",
  history: [initialResumeData],
  historyIndex: 0,

  setResume: (resume: Resume) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(resume);
      return {
        resume,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
    triggerAutosave(get, set);
  },

  updatePersonalInfo: (info: Partial<PersonalInfo>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
      },
    }));
    triggerAutosave(get, set);
  },

  updateSummary: (summary: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        summary,
      },
    }));
    triggerAutosave(get, set);
  },

  addExperience: () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: "Software Engineer",
      company: "Company Name",
      location: "City, Country",
      startDate: new Date().toISOString().slice(0, 7),
      endDate: "",
      current: true,
      description: "• Key accomplishment with measurable outcome\n• Led project delivering core features",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [newExp, ...state.resume.experience],
      },
    }));
    triggerAutosave(get, set);
  },

  updateExperience: (id: string, exp: Partial<Experience>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((item) =>
          item.id === id ? { ...item, ...exp } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteExperience: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addEducation: () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: "Bachelor of Science",
      institution: "University Name",
      location: "City, Country",
      startDate: "2018-09",
      endDate: "2022-05",
      description: "",
      gpa: "",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        education: [newEdu, ...state.resume.education],
      },
    }));
    triggerAutosave(get, set);
  },

  updateEducation: (id: string, edu: Partial<Education>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((item) =>
          item.id === id ? { ...item, ...edu } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteEducation: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addSkill: (skill?: Partial<Skill>) => {
    const newSkill: Skill = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: skill?.name || "New Skill",
      level: skill?.level || "Advanced",
      category: skill?.category || "General",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        skills: [...state.resume.skills, newSkill],
      },
    }));
    triggerAutosave(get, set);
  },

  updateSkill: (id: string, skill: Partial<Skill>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.map((item) =>
          item.id === id ? { ...item, ...skill } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteSkill: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addProject: () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: "New Project",
      description: "A description of your project, architecture, and impact.",
      technologies: "React, TypeScript, Node.js",
      projectUrl: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [newProj, ...state.resume.projects],
      },
    }));
    triggerAutosave(get, set);
  },

  updateProject: (id: string, proj: Partial<Project>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((item) =>
          item.id === id ? { ...item, ...proj } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteProject: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addCertification: () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: "Certificate Name",
      issuer: "Issuing Organization",
      date: new Date().toISOString().slice(0, 7),
      url: "",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [newCert, ...state.resume.certifications],
      },
    }));
    triggerAutosave(get, set);
  },

  updateCertification: (id: string, cert: Partial<Certification>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: state.resume.certifications.map((item) =>
          item.id === id ? { ...item, ...cert } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteCertification: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: state.resume.certifications.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addLanguage: (name = "Language") => {
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      name,
      proficiency: "Proficient",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        languages: [...state.resume.languages, newLang],
      },
    }));
    triggerAutosave(get, set);
  },

  updateLanguage: (id: string, lang: Partial<Language>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.map((item) =>
          item.id === id ? { ...item, ...lang } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteLanguage: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addAchievement: () => {
    const newAch: Achievement = {
      id: `ach-${Date.now()}`,
      title: "Award or Achievement Title",
      description: "Brief summary of what you achieved and its significance.",
      date: new Date().getFullYear().toString(),
    };
    set((state) => ({
      resume: {
        ...state.resume,
        achievements: [...state.resume.achievements, newAch],
      },
    }));
    triggerAutosave(get, set);
  },

  updateAchievement: (id: string, ach: Partial<Achievement>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        achievements: state.resume.achievements.map((item) =>
          item.id === id ? { ...item, ...ach } : item
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteAchievement: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        achievements: state.resume.achievements.filter((item) => item.id !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addCustomSection: (title = "Custom Section") => {
    const newId = `custom-${Date.now()}`;
    const newSec: CustomSection = {
      id: newId,
      title,
      items: [
        {
          id: `item-${Date.now()}`,
          title: "Entry Title",
          subtitle: "Subtitle / Role / Organization",
          date: new Date().getFullYear().toString(),
          description: "Details about this custom entry or publication.",
        },
      ],
    };
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: [...state.resume.customSections, newSec],
        sectionOrder: [...state.resume.sectionOrder, newId],
        sectionVisibility: { ...state.resume.sectionVisibility, [newId]: true },
      },
    }));
    triggerAutosave(get, set);
  },

  updateCustomSectionTitle: (id: string, title: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.map((sec) =>
          sec.id === id ? { ...sec, title } : sec
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteCustomSection: (id: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.filter((sec) => sec.id !== id),
        sectionOrder: state.resume.sectionOrder.filter((secId) => secId !== id),
      },
    }));
    triggerAutosave(get, set);
  },

  addCustomSectionItem: (sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: "New Item",
      subtitle: "",
      date: "",
      description: "",
    };
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.map((sec) =>
          sec.id === sectionId ? { ...sec, items: [...sec.items, newItem] } : sec
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.map((sec) =>
          sec.id === sectionId
            ? {
                ...sec,
                items: sec.items.map((i) => (i.id === itemId ? { ...i, ...item } : i)),
              }
            : sec
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  deleteCustomSectionItem: (sectionId: string, itemId: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        customSections: state.resume.customSections.map((sec) =>
          sec.id === sectionId
            ? { ...sec, items: sec.items.filter((i) => i.id !== itemId) }
            : sec
        ),
      },
    }));
    triggerAutosave(get, set);
  },

  updateSettings: (settings: Partial<ResumeSettings>) => {
    set((state) => ({
      resume: {
        ...state.resume,
        settings: { ...state.resume.settings, ...settings },
      },
    }));
    triggerAutosave(get, set);
  },

  setSectionOrder: (order: SectionType[]) => {
    set((state) => ({
      resume: {
        ...state.resume,
        sectionOrder: order,
      },
    }));
    triggerAutosave(get, set);
  },

  moveSection: (sectionKey: string, direction: "up" | "down") => {
    set((state) => {
      const order = [...state.resume.sectionOrder];
      const index = order.indexOf(sectionKey);
      if (index === -1) return state;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= order.length) return state;

      // Swap
      [order[index], order[targetIndex]] = [order[targetIndex], order[index]];
      return {
        resume: {
          ...state.resume,
          sectionOrder: order,
        },
      };
    });
    triggerAutosave(get, set);
  },

  toggleSectionVisibility: (sectionKey: string) => {
    set((state) => ({
      resume: {
        ...state.resume,
        sectionVisibility: {
          ...state.resume.sectionVisibility,
          [sectionKey]: state.resume.sectionVisibility[sectionKey] === false ? true : false,
        },
      },
    }));
    triggerAutosave(get, set);
  },

  resetToDefaultData: () => {
    set({
      resume: { ...initialResumeData, updatedAt: new Date().toISOString() },
      saveStatus: "saved",
    });
    triggerAutosave(get, set);
  },

  clearResumeData: () => {
    set({
      resume: { ...emptyResumeData, updatedAt: new Date().toISOString() },
      saveStatus: "saved",
    });
    triggerAutosave(get, set);
  },

  setActiveSection: (section: string) => set({ activeSection: section }),
  setZoom: (zoomAction) =>
    set((state) => ({
      zoom: typeof zoomAction === "function" ? zoomAction(state.zoom) : zoomAction,
    })),
  setMobileTab: (tab: "edit" | "preview") => set({ mobileTab: tab }),

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const nextIndex = state.historyIndex - 1;
        return {
          resume: state.history[nextIndex],
          historyIndex: nextIndex,
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const nextIndex = state.historyIndex + 1;
        return {
          resume: state.history[nextIndex],
          historyIndex: nextIndex,
        };
      }
      return state;
    });
  },
}));
