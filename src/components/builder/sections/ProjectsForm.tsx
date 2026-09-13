"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  Globe,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { toast } from "sonner";

export const ProjectsForm: React.FC = () => {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(
    resume.projects[0]?.id || null
  );

  return (
    <div className="space-y-4">
      {resume.projects.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No projects added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
            onClick={addProject}
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            Add First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {resume.projects.map((proj, index) => {
            const isExpanded = expandedId === proj.id;

            return (
              <div
                key={proj.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 cursor-pointer select-none transition-colors border-b border-slate-100"
                  onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center border border-blue-100">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {proj.name || "Untitled Project"}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {proj.technologies || "Technologies used"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(proj.id);
                        toast.info("Removed project entry");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                {isExpanded && (
                  <div className="p-4 space-y-3.5 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <Label required>Project Name</Label>
                        <Input
                          placeholder="e.g. PulseEngine - Real-Time Dashboard"
                          value={proj.name}
                          onChange={(e) =>
                            updateProject(proj.id, { name: e.target.value })
                          }
                          leftIcon={<FolderGit2 className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label>Technologies / Stack</Label>
                        <Input
                          placeholder="e.g. Next.js, TypeScript, PostgreSQL, Tailwind"
                          value={proj.technologies || ""}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              technologies: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label>Live Demo URL (Optional)</Label>
                        <Input
                          placeholder="https://myproject.com"
                          value={proj.projectUrl || ""}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              projectUrl: e.target.value,
                            })
                          }
                          leftIcon={<Globe className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label>GitHub / Source URL (Optional)</Label>
                        <Input
                          placeholder="https://github.com/user/repo"
                          value={proj.githubUrl || ""}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              githubUrl: e.target.value,
                            })
                          }
                          leftIcon={<GithubIcon className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label>Start Date</Label>
                        <Input
                          placeholder="YYYY-MM (e.g. 2023-01)"
                          value={proj.startDate || ""}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label>End Date</Label>
                        <Input
                          placeholder="YYYY-MM (e.g. 2023-08)"
                          value={proj.endDate || ""}
                          onChange={(e) =>
                            updateProject(proj.id, { endDate: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label required>Project Description & Key Impact</Label>
                      <Textarea
                        placeholder="• Built a scalable real-time analytics streaming engine processing 100k events/sec&#10;• Implemented responsive UI with 99+ Lighthouse performance score"
                        value={proj.description}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        className="w-full text-xs font-semibold border border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 hover:bg-blue-50/40 text-blue-600 rounded-xl py-2.5 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        onClick={addProject}
      >
        <Plus className="w-4 h-4" />
        Add Another Project
      </button>
    </div>
  );
};

