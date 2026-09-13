import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LayoutTemplate, ArrowRight, Check } from "lucide-react";

const TEMPLATE_CARDS = [
  {
    id: "modern",
    title: "Modern Sidebar",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Two-column design with colorful sidebar accents, structured timeline, and skill badges.",
    previewBg: "bg-blue-50/70 border-blue-200",
    headerColor: "bg-blue-600",
    accentColor: "bg-blue-400",
    features: ["Two-Column Layout", "Sidebar Contact & Skills", "Visual Experience Timeline", "Recruiter Favorite"],
  },
  {
    id: "professional",
    title: "Professional ATS",
    tag: "ATS-Optimized",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Traditional single-column layout strictly formatted to achieve top scores in Applicant Tracking Systems.",
    previewBg: "bg-emerald-50/70 border-emerald-200",
    headerColor: "bg-emerald-600",
    accentColor: "bg-emerald-400",
    features: ["100% ATS-Compliant", "Single-Column Flow", "Clean Section Dividers", "Standard Font Hierarchy"],
  },
  {
    id: "minimal",
    title: "Minimalist Swiss",
    tag: "Ultra Clean",
    tagColor: "bg-purple-100 text-purple-800 border-purple-300",
    description: "Refined Scandinavian typography with numbered sections, generous whitespace, and high readability.",
    previewBg: "bg-purple-50/70 border-purple-200",
    headerColor: "bg-purple-600",
    accentColor: "bg-purple-400",
    features: ["Generous Whitespace", "Numbered Section Headers", "Editorial Typography", "Modern Aesthetic"],
  },
  {
    id: "executive",
    title: "Executive Leadership",
    tag: "Senior Roles",
    tagColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "High-contrast top banner header with metric grid containers engineered for directors and tech leads.",
    previewBg: "bg-amber-50/70 border-amber-200",
    headerColor: "bg-amber-600",
    accentColor: "bg-amber-400",
    features: ["Header Card Banner", "Core Competencies Grid", "Highlight Projects", "Leadership Ready"],
  },
];

export const TemplateShowcase: React.FC = () => {
  return (
    <section id="templates" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
            RESUME TEMPLATES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 uppercase text-slate-950">
            Designed for Every Career Level
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Choose from battle-tested layouts. Switch templates anytime with a single click without losing your resume data.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATE_CARDS.map((tmpl) => (
            <div
              key={tmpl.id}
              className="border border-slate-300 bg-white p-5 hover:border-blue-600 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Visual Thumbnail Representation */}
                <div
                  className={`h-48 w-full ${tmpl.previewBg} border p-4 flex flex-col justify-between mb-5 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}
                >
                  <div className="space-y-2">
                    <div className={`h-3.5 w-3/4 ${tmpl.headerColor}`} />
                    <div className={`h-2 w-1/2 ${tmpl.accentColor}`} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-slate-300" />
                    <div className="h-1.5 w-5/6 bg-slate-300" />
                    <div className="h-1.5 w-4/6 bg-slate-300" />
                  </div>

                  <div className="flex gap-1.5">
                    <div className="h-2 w-1/4 bg-slate-200" />
                    <div className="h-2 w-1/4 bg-slate-200" />
                    <div className="h-2 w-1/4 bg-slate-200" />
                  </div>

                  {/* Badge */}
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border ${tmpl.tagColor}`}
                  >
                    {tmpl.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                  <span>{tmpl.title}</span>
                </h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  {tmpl.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6 text-[11px] text-slate-700 font-medium">
                  {tmpl.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Link */}
              <Link href="/builder">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between font-bold bg-white text-slate-800 border-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
