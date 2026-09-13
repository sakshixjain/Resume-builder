"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Link2,
  Upload,
  Trash2,
  Camera,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";
import { toast } from "sonner";

export const PersonalInfoForm: React.FC = () => {
  const { resume, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resume;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePersonalInfo({ photo: event.target?.result as string });
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (personalInfo.photo) {
      updatePersonalInfo({ photo: "" });
      toast.info("Profile photo removed");
    }
  };

  return (
    <div className="space-y-5">
      {/* Profile Photo / Avatar Upload Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faff] border border-blue-100/90 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Dashed Avatar Box */}
        <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-blue-200/80 bg-white/50 flex items-center justify-center relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-slate-100/90 flex items-center justify-center text-slate-300 overflow-hidden relative shadow-2xs">
            {personalInfo.photo ? (
              <img
                src={personalInfo.photo}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-slate-300 translate-y-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          {/* Camera Blue Badge on bottom right corner */}
          <div className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs border-2 border-white">
            <Camera className="w-3 h-3" />
          </div>
        </div>

        {/* Info & Action Buttons */}
        <div className="flex-1 space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Profile Photo (Optional)
          </h3>
          <p className="text-xs text-slate-500">
            Add a professional photo to make your resume stand out.
          </p>
          <p className="text-[11px] text-slate-400">
            JPG, PNG or WebP. Max size 2MB.
          </p>

          <div className="flex items-center gap-2.5 pt-2">
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition-all cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>

            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Basic Contact Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Full Name</Label>
          <Input
            placeholder="Shumayla Khan"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div>
          <Label required>Professional Title</Label>
          <Input
            placeholder="Senior Full Stack Software Engineer"
            value={personalInfo.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            leftIcon={<Briefcase className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div>
          <Label required>Email Address</Label>
          <Input
            type="email"
            placeholder="alexander.morgan@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div>
          <Label required>Phone Number</Label>
          <Input
            placeholder="+1 (555) 234-5678"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            placeholder="San Francisco, CA"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div>
          <Label>Portfolio / Website</Label>
          <Input
            placeholder="https://alexmorgan.dev"
            value={personalInfo.website || ""}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            leftIcon={<Link2 className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div>
          <Label>LinkedIn Profile</Label>
          <Input
            placeholder="https://linkedin.com/in/alexandermorgan"
            value={personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            leftIcon={<LinkedinIcon className="w-4 h-4 text-[#0a66c2]" />}
          />
        </div>

        <div>
          <Label>GitHub Profile</Label>
          <Input
            placeholder="https://github.com/alexmorgan-dev"
            value={personalInfo.github || ""}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            leftIcon={<GithubIcon className="w-4 h-4 text-slate-900" />}
          />
        </div>
      </div>
    </div>
  );
};

