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
    <div className="space-y-3">
      {resume.projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 bg-slate-900/50">
          <FolderGit2 className="w-7 h-7 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No projects added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-bold bg-slate-900 text-white border-slate-700"
            onClick={addProject}
          >
            <Plus className="w-3.5 h-3.5 text-rose-400" />
            Add First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {resume.projects.map((proj, index) => {
            const isExpanded = expandedId === proj.id;

            return (
              <div
                key={proj.id}
                className="border border-slate-800 bg-slate-950 shadow-md transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-900 cursor-pointer select-none transition-colors border-b border-slate-800/80"
                  onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-rose-600 text-white text-xs font-bold font-mono flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {proj.name || "Untitled Project"}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {proj.technologies || "Technologies used"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(proj.id);
                        toast.info("Removed project entry");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <button
                      type="button"
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                {isExpanded && (
                  <div className="p-4 space-y-3 bg-slate-950">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          placeholder="e.g. Next.js, TypeScript, Go, Tailwind"
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
                        placeholder="• Built a scalable real-time analytics streaming engine processing 100k events/sec&#10;• Implemented responsive UI with 99+ Lighthouse score"
                        value={proj.description}
                        onChange={(e) =>
                          updateProject(proj.id, {
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full text-xs font-bold border-dashed border-slate-700 hover:border-rose-500 bg-slate-950 text-slate-300 hover:text-rose-300 py-2.5"
        onClick={addProject}
      >
        <Plus className="w-3.5 h-3.5 text-rose-400" />
        Add Another Project
      </Button>
    </div>
  );
};
