"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Award, Building, Calendar, Globe } from "lucide-react";
import { toast } from "sonner";

export const CertificationsForm: React.FC = () => {
  const { resume, addCertification, updateCertification, deleteCertification } =
    useResumeStore();

  return (
    <div className="space-y-3">
      {resume.certifications.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-slate-700 bg-slate-900/50">
          <Award className="w-7 h-7 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">No certifications added yet.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-3 text-xs font-bold bg-slate-900 text-white border-slate-700"
            onClick={addCertification}
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            Add First Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {resume.certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-3.5 border border-slate-800 bg-slate-950 shadow-md space-y-3"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase font-mono">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  Certification #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-rose-400 hover:bg-slate-800 h-7 w-7"
                  onClick={() => {
                    deleteCertification(cert.id);
                    toast.info("Removed certification");
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label required>Certificate Name</Label>
                  <Input
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, { name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label required>Issuing Body / Org</Label>
                  <Input
                    placeholder="e.g. Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(cert.id, { issuer: e.target.value })
                    }
                    leftIcon={<Building className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label required>Issue Date</Label>
                  <Input
                    placeholder="YYYY-MM (e.g. 2023-05)"
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(cert.id, { date: e.target.value })
                    }
                    leftIcon={<Calendar className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <Label>Verification / Credential Link</Label>
                  <Input
                    placeholder="https://..."
                    value={cert.url || ""}
                    onChange={(e) =>
                      updateCertification(cert.id, { url: e.target.value })
                    }
                    leftIcon={<Globe className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full text-xs font-bold border-dashed border-slate-700 hover:border-purple-500 bg-slate-950 text-slate-300 hover:text-purple-300 py-2.5"
        onClick={addCertification}
      >
        <Plus className="w-3.5 h-3.5 text-purple-400" />
        Add Another Certification
      </Button>
    </div>
  );
};
