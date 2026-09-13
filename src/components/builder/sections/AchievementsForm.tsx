"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Award, Calendar } from "lucide-react";
import { toast } from "sonner";

export const AchievementsForm: React.FC = () => {
  const { resume, addAchievement, updateAchievement, deleteAchievement } =
    useResumeStore();

  return (
    <div className="space-y-4">
      {resume.achievements.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No honors or achievements added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
            onClick={addAchievement}
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            Add First Achievement
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {resume.achievements.map((ach, index) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3.5"
            >
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 text-[11px] font-bold flex items-center justify-center border border-blue-100">
                    {index + 1}
                  </span>
                  Achievement #{index + 1}
                </span>
                <button
                  type="button"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    deleteAchievement(ach.id);
                    toast.info("Removed achievement");
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <Label required>Title / Honor</Label>
                  <Input
                    placeholder="e.g. 1st Place Hackathon Winner"
                    value={ach.title}
                    onChange={(e) =>
                      updateAchievement(ach.id, { title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Year / Date</Label>
                  <Input
                    placeholder="e.g. 2023"
                    value={ach.date || ""}
                    onChange={(e) =>
                      updateAchievement(ach.id, { date: e.target.value })
                    }
                    leftIcon={<Calendar className="w-4 h-4" />}
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Brief description of the accomplishment and measurable outcome."
                  value={ach.description}
                  onChange={(e) =>
                    updateAchievement(ach.id, { description: e.target.value })
                  }
                  rows={2}
                  className="text-xs leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className="w-full text-xs font-semibold border border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 hover:bg-blue-50/40 text-blue-600 rounded-xl py-2.5 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        onClick={addAchievement}
      >
        <Plus className="w-4 h-4" />
        Add Another Achievement
      </button>
    </div>
  );
};

