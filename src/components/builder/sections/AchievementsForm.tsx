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
    <div className="space-y-3">
      {resume.achievements.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 bg-slate-900/50">
          <Award className="w-7 h-7 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No honors or achievements added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-bold bg-slate-900 text-white border-slate-700"
            onClick={addAchievement}
          >
            <Plus className="w-3.5 h-3.5 text-yellow-400" />
            Add First Achievement
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {resume.achievements.map((ach, index) => (
            <div
              key={ach.id}
              className="p-3.5 border border-slate-800 bg-slate-950 shadow-md space-y-3"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5 uppercase font-mono">
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  Achievement #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-rose-400 hover:bg-slate-800 h-7 w-7"
                  onClick={() => {
                    deleteAchievement(ach.id);
                    toast.info("Removed achievement");
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full text-xs font-bold border-dashed border-slate-700 hover:border-yellow-500 bg-slate-950 text-slate-300 hover:text-yellow-300 py-2.5"
        onClick={addAchievement}
      >
        <Plus className="w-3.5 h-3.5 text-yellow-400" />
        Add Another Achievement
      </Button>
    </div>
  );
};
