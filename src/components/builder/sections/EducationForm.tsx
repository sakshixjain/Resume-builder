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
    <div className="space-y-4">
      {resume.education.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No education entries added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
            onClick={addEducation}
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            Add Degree / School
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {resume.education.map((edu, index) => {
            const isExpanded = expandedId === edu.id;

            return (
              <div
                key={edu.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 cursor-pointer select-none transition-colors border-b border-slate-100"
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center border border-blue-100">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {edu.degree || "Degree / Qualification"}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {edu.institution || "Institution"} {edu.endDate ? `• ${edu.endDate}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEducation(edu.id);
                        toast.info("Removed education entry");
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

                {/* Form Body */}
                {isExpanded && (
                  <div className="p-4 space-y-3.5 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

      <button
        type="button"
        className="w-full text-xs font-semibold border border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 hover:bg-blue-50/40 text-blue-600 rounded-xl py-2.5 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        onClick={addEducation}
      >
        <Plus className="w-4 h-4" />
        Add Another Degree / School
      </button>
    </div>
  );
};
