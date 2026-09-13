"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { CustomSection } from "@/lib/resume/types";
import { Plus, Trash2, Layers } from "lucide-react";
import { toast } from "sonner";

interface CustomSectionFormProps {
  section: CustomSection;
}

export const CustomSectionForm: React.FC<CustomSectionFormProps> = ({
  section,
}) => {
  const {
    updateCustomSectionTitle,
    deleteCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    deleteCustomSectionItem,
  } = useResumeStore();

  return (
    <div className="space-y-4">
      {/* Section Title Editor */}
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200">
        <div className="flex-1">
          <Label>Section Title</Label>
          <Input
            value={section.title}
            onChange={(e) =>
              updateCustomSectionTitle(section.id, e.target.value)
            }
            placeholder="e.g. Publications, Volunteer Work, Awards"
            className="font-bold text-xs bg-white text-slate-900"
          />
        </div>

        <Button
          type="button"
          variant="danger"
          size="sm"
          className="self-end rounded-lg"
          onClick={() => {
            deleteCustomSection(section.id);
            toast.info(`Deleted "${section.title}" section`);
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete Section
        </Button>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {section.items.map((item, index) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3.5"
          >
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 text-[11px] font-bold flex items-center justify-center border border-blue-100">
                  {index + 1}
                </span>
                Entry #{index + 1}
              </span>
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => deleteCustomSectionItem(section.id, item.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <Label required>Title / Role / Publication</Label>
                <Input
                  placeholder="e.g. Lead Volunteer Organizer"
                  value={item.title}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, {
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Subtitle / Organization</Label>
                <Input
                  placeholder="e.g. Red Cross Youth Division"
                  value={item.subtitle || ""}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, {
                      subtitle: e.target.value,
                    })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <Label>Date / Year</Label>
                <Input
                  placeholder="e.g. 2021 - 2023"
                  value={item.date || ""}
                  onChange={(e) =>
                    updateCustomSectionItem(section.id, item.id, {
                      date: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Description / Details</Label>
              <Textarea
                placeholder="Details about your role, achievements, or publication..."
                value={item.description || ""}
                onChange={(e) =>
                  updateCustomSectionItem(section.id, item.id, {
                    description: e.target.value,
                  })
                }
                rows={2}
                className="text-xs leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full text-xs font-semibold border border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 hover:bg-blue-50/40 text-blue-600 rounded-xl py-2.5 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        onClick={() => addCustomSectionItem(section.id)}
      >
        <Plus className="w-4 h-4" />
        Add Entry to {section.title}
      </button>
    </div>
  );
};

