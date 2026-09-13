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
  GraduationCap,
  Building,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

export const EducationForm: React.FC = () => {
  const { resume, addEducation, updateEducation, deleteEducation } =
    useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(
    resume.education[0]?.id || null
  );

  return (
    <div className="space-y-3">
      {resume.education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 bg-slate-900/50">
          <GraduationCap className="w-7 h-7 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No education entries added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-bold bg-slate-900 text-white border-slate-700"
            onClick={addEducation}
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            Add Degree / School
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {resume.education.map((edu, index) => {
            const isExpanded = expandedId === edu.id;

            return (
              <div
                key={edu.id}
                className="border border-slate-800 bg-slate-950 shadow-md transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3 bg-slate-900/90 hover:bg-slate-900 cursor-pointer select-none transition-colors border-b border-slate-800/80"
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-amber-600 text-white text-xs font-bold font-mono flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {edu.degree || "Degree / Qualification"}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {edu.institution || "Institution"} •{" "}
                        {edu.endDate || "Graduation Year"}
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
                        deleteEducation(edu.id);
                        toast.info("Removed education entry");
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

                {/* Form Body */}
                {isExpanded && (
                  <div className="p-4 space-y-3 bg-slate-950">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label required>Degree / Major</Label>
                        <Input
                          placeholder="e.g. B.S. in Computer Science"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, { degree: e.target.value })
                          }
                          leftIcon={<GraduationCap className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label required>School / University</Label>
                        <Input
                          placeholder="e.g. Stanford University"
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              institution: e.target.value,
                            })
                          }
                          leftIcon={<Building className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label>Location</Label>
                        <Input
                          placeholder="e.g. Stanford, CA"
                          value={edu.location || ""}
                          onChange={(e) =>
                            updateEducation(edu.id, { location: e.target.value })
                          }
                          leftIcon={<MapPin className="w-4 h-4" />}
                        />
                      </div>

                      <div>
                        <Label>GPA or Honors (Optional)</Label>
                        <Input
                          placeholder="e.g. 3.9 / 4.0 or Magna Cum Laude"
                          value={edu.gpa || ""}
                          onChange={(e) =>
                            updateEducation(edu.id, { gpa: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label required>Start Date</Label>
                        <Input
                          placeholder="YYYY-MM (e.g. 2018-09)"
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label>Graduation / End Date</Label>
                        <Input
                          placeholder="YYYY-MM (e.g. 2022-05)"
                          value={edu.endDate || ""}
                          onChange={(e) =>
                            updateEducation(edu.id, { endDate: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Notable Coursework / Activities</Label>
                      <Textarea
                        placeholder="e.g. Algorithms & Data Structures, President of Robotics Club, Dean's Honor List"
                        value={edu.description || ""}
                        onChange={(e) =>
                          updateEducation(edu.id, {
                            description: e.target.value,
                          })
                        }
                        rows={2}
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
        className="w-full text-xs font-bold border-dashed border-slate-700 hover:border-amber-500 bg-slate-950 text-slate-300 hover:text-amber-300 py-2.5"
        onClick={addEducation}
      >
        <Plus className="w-3.5 h-3.5 text-amber-400" />
        Add Another Degree / School
      </Button>
    </div>
  );
};
