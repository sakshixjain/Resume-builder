"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SkillLevel } from "@/lib/resume/types";
import { Plus, X, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

const POPULAR_SKILL_SUGGESTIONS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "GraphQL",
  "Docker",
  "AWS",
  "Git",
  "REST APIs",
  "Redux",
  "CI/CD",
  "Figma",
  "MongoDB",
];

const SKILL_LEVELS: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export const SkillsForm: React.FC = () => {
  const { resume, addSkill, updateSkill, deleteSkill } = useResumeStore();
  const [customSkillName, setCustomSkillName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>("Advanced");

  const handleAddCustomSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customSkillName.trim()) return;

    addSkill({
      name: customSkillName.trim(),
      level: selectedLevel,
    });
    setCustomSkillName("");
    toast.success(`Added "${customSkillName.trim()}"`);
  };

  const handleQuickAdd = (skillName: string) => {
    const exists = resume.skills.some(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );
    if (exists) {
      toast.info(`"${skillName}" is already in your skills list`);
      return;
    }
    addSkill({
      name: skillName,
      level: "Advanced",
    });
    toast.success(`Added "${skillName}"`);
  };

  return (
    <div className="space-y-4">
      {/* Input bar */}
      <form onSubmit={handleAddCustomSkill} className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Type a skill name (e.g. Next.js, Kubernetes, UI Design)"
            value={customSkillName}
            onChange={(e) => setCustomSkillName(e.target.value)}
            className="flex-1 text-xs"
          />

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as SkillLevel)}
            className="h-9 border border-slate-700 bg-slate-900 px-2.5 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {SKILL_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-slate-950 text-white">
                {lvl}
              </option>
            ))}
          </select>

          <Button type="submit" size="sm" variant="gradient" className="shrink-0 text-xs font-bold">
            <Plus className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </form>

      {/* Popular Suggestions */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Quick Add Popular Tech Skills:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILL_SUGGESTIONS.map((skillName) => {
            const isAdded = resume.skills.some(
              (s) => s.name.toLowerCase() === skillName.toLowerCase()
            );

            return (
              <button
                key={skillName}
                type="button"
                onClick={() => handleQuickAdd(skillName)}
                disabled={isAdded}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 transition-colors cursor-pointer border ${
                  isAdded
                    ? "bg-slate-950 text-slate-600 border-slate-800 cursor-default"
                    : "bg-slate-900 text-slate-200 hover:bg-emerald-600 hover:text-white border-slate-700 hover:border-emerald-500 shadow-xs"
                }`}
              >
                {isAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3 text-emerald-400" />}
                {skillName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Added Skills */}
      <div className="pt-2">
        <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
          Your Skills ({resume.skills.length})
        </span>

        {resume.skills.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">
            No skills added yet. Type a skill above or click from suggestions.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resume.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-2 truncate mr-2">
                  <span className="font-bold text-white truncate">
                    {skill.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <select
                    value={skill.level || "Advanced"}
                    onChange={(e) =>
                      updateSkill(skill.id, {
                        level: e.target.value as SkillLevel,
                      })
                    }
                    className="h-6 text-[10px] font-semibold border border-slate-700 bg-slate-950 px-1 text-slate-300 cursor-pointer"
                  >
                    {SKILL_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl} className="bg-slate-950 text-white">
                        {lvl}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => deleteSkill(skill.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 hover:bg-slate-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
