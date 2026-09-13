"use client";

import React from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";

export const PersonalInfoForm: React.FC = () => {
  const { resume, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resume;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePersonalInfo({ photo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo / Avatar Upload */}
      <div className="flex items-center gap-4 p-3 bg-slate-900 border border-slate-800">
        <div className="relative w-16 h-16 bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt="Profile avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-slate-500" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-white">
            Profile Photo (Optional)
          </p>
          <p className="text-[11px] text-slate-400">Square JPG or PNG, max 2MB</p>
          <div className="flex items-center gap-2 pt-1">
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white transition-colors">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
            {personalInfo.photo && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => updatePersonalInfo({ photo: "" })}
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Basic Contact Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label required>Full Name</Label>
          <Input
            placeholder="e.g. Alexander Morgan"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            leftIcon={<User className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label required>Professional Title</Label>
          <Input
            placeholder="e.g. Senior Full Stack Engineer"
            value={personalInfo.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
            leftIcon={<Briefcase className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label required>Email Address</Label>
          <Input
            type="email"
            placeholder="e.g. alexander@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            leftIcon={<Mail className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label required>Phone Number</Label>
          <Input
            placeholder="e.g. +1 (555) 234-5678"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            placeholder="e.g. San Francisco, CA"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            leftIcon={<MapPin className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label>Portfolio / Website</Label>
          <Input
            placeholder="e.g. https://alexmorgan.dev"
            value={personalInfo.website || ""}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            leftIcon={<Globe className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label>LinkedIn Profile</Label>
          <Input
            placeholder="e.g. https://linkedin.com/in/alexmorgan"
            value={personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            leftIcon={<LinkedinIcon className="w-4 h-4" />}
          />
        </div>

        <div>
          <Label>GitHub Profile</Label>
          <Input
            placeholder="e.g. https://github.com/alexmorgan-dev"
            value={personalInfo.github || ""}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            leftIcon={<GithubIcon className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};
