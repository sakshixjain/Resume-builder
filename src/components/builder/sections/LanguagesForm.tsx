"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LanguageProficiency } from "@/lib/resume/types";
import { Plus, Trash2, Languages, Sparkles } from "lucide-react";
import { toast } from "sonner";

const PROFICIENCY_LEVELS: LanguageProficiency[] = [
  "Native",
  "Fluent",
  "Proficient",
  "Intermediate",
  "Basic",
];

const COMMON_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Hindi",
  "Japanese",
  "Arabic",
];

export const LanguagesForm: React.FC = () => {
  const { resume, addLanguage, updateLanguage, deleteLanguage } =
    useResumeStore();
  const [newLangInput, setNewLangInput] = useState("");

  const handleAddCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newLangInput.trim()) return;
    addLanguage(newLangInput.trim());
    setNewLangInput("");
    toast.success(`Added language`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddCustom} className="flex gap-2">
        <Input
          placeholder="e.g. German, Japanese, Spanish..."
          value={newLangInput}
          onChange={(e) => setNewLangInput(e.target.value)}
          className="text-xs"
          leftIcon={<Languages className="w-4 h-4" />}
        />
        <Button type="submit" size="sm" variant="gradient" className="shrink-0 text-xs font-bold">
          <Plus className="w-3.5 h-3.5" />
          Add
        </Button>
      </form>

      {/* Quick suggestions */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          Quick Add:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_LANGUAGES.map((lang) => {
            const exists = resume.languages.some(
              (l) => l.name.toLowerCase() === lang.toLowerCase()
            );
            if (exists) return null;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => addLanguage(lang)}
                className="text-[11px] font-semibold px-2.5 py-1 bg-slate-900 hover:bg-teal-600 hover:text-white border border-slate-700 hover:border-teal-500 text-slate-300 transition-colors cursor-pointer"
              >
                + {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language List */}
      <div className="space-y-2 pt-2">
        {resume.languages.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">
            No languages added yet.
          </p>
        ) : (
          resume.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800"
            >
              <Input
                value={lang.name}
                onChange={(e) =>
                  updateLanguage(lang.id, { name: e.target.value })
                }
                className="h-8 max-w-[180px] text-xs font-bold bg-slate-950"
              />

              <div className="flex items-center gap-2">
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    updateLanguage(lang.id, {
                      proficiency: e.target.value as LanguageProficiency,
                    })
                  }
                  className="h-8 border border-slate-700 bg-slate-950 px-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level} value={level} className="bg-slate-950 text-white">
                      {level}
                    </option>
                  ))}
                </select>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-rose-400 hover:bg-slate-800 h-8 w-8"
                  onClick={() => deleteLanguage(lang.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
