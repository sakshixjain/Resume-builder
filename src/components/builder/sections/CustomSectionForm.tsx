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
      <div className="flex items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800">
        <div className="flex-1">
          <Label>Section Title</Label>
          <Input
            value={section.title}
            onChange={(e) =>
              updateCustomSectionTitle(section.id, e.target.value)
            }
            placeholder="e.g. Publications, Volunteer Work, Awards"
            className="font-bold text-xs bg-slate-950 text-white"
          />
        </div>

        <Button
          type="button"
          variant="danger"
          size="sm"
          className="self-end"
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
      <div className="space-y-2.5">
        {section.items.map((item, index) => (
          <div
            key={item.id}
            className="p-3.5 border border-slate-800 bg-slate-950 shadow-md space-y-3"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-fuchsia-400 flex items-center gap-1.5 uppercase font-mono">
                <Layers className="w-3.5 h-3.5 text-fuchsia-400" />
                Entry #{index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-rose-400 hover:bg-slate-800 h-7 w-7"
                onClick={() => deleteCustomSectionItem(section.id, item.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className="text-xs"
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full text-xs font-bold border-dashed border-slate-700 hover:border-fuchsia-500 bg-slate-950 text-slate-300 hover:text-fuchsia-300 py-2.5"
        onClick={() => addCustomSectionItem(section.id)}
      >
        <Plus className="w-3.5 h-3.5 text-fuchsia-400" />
        Add Entry to {section.title}
      </Button>
    </div>
  );
};
