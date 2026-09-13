import { Resume } from "./types";
import { initialResumeData } from "./defaultResume";

const STORAGE_KEY = "quickcv_resume_data_v1";

export function getStoredResume(): Resume {
  if (typeof window === "undefined") return initialResumeData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialResumeData;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.personalInfo && parsed.settings) {
      return parsed as Resume;
    }
    return initialResumeData;
  } catch (err) {
    console.error("Failed to load resume from localStorage", err);
    return initialResumeData;
  }
}

export function saveResumeToStorage(resume: Resume): void {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      ...resume,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to save resume to localStorage", err);
  }
}

export function exportResumeAsJson(resume: Resume): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement("a");
  const fileName = `${(resume.personalInfo.fullName || "Resume").replace(/[^a-zA-Z0-9]/g, "_")}_Data.json`;
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importResumeFromJson(file: File): Promise<Resume> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed || !parsed.personalInfo) {
          throw new Error("Invalid resume JSON structure");
        }
        resolve(parsed as Resume);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
