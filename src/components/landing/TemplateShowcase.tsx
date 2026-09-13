import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LayoutTemplate, ArrowRight, Check, Sparkles } from "lucide-react";

const TEMPLATE_CARDS = [
  {
    id: "modern",
    title: "Modern Sidebar",
    tag: "Most Popular",
    tagColor: "bg-blue-600 text-white border-blue-500",
    description: "Two-column design with colorful sidebar accents, structured timeline, and skill badges.",
    previewBg: "bg-slate-900 border-blue-500/50",
    headerColor: "bg-blue-600",
    accentColor: "bg-blue-500",
    features: ["Two-Column Layout", "Sidebar Contact & Skills", "Visual Experience Timeline", "Recruiter Favorite"],
  },
  {
    id: "professional",
    title: "Professional ATS",
    tag: "ATS-Optimized",
    tagColor: "bg-emerald-600 text-white border-emerald-500",
    description: "Traditional single-column layout strictly formatted to achieve top scores in Applicant Tracking Systems.",
    previewBg: "bg-slate-900 border-emerald-500/50",
    headerColor: "bg-emerald-600",
    accentColor: "bg-emerald-500",
    features: ["100% ATS-Compliant", "Single-Column Flow", "Clean Section Dividers", "Standard Font Hierarchy"],
  },
  {
    id: "minimal",
    title: "Minimalist Swiss",
    tag: "Ultra Clean",
    tagColor: "bg-purple-600 text-white border-purple-500",
    description: "Refined Scandinavian typography with numbered sections, generous whitespace, and high readability.",
    previewBg: "bg-slate-900 border-purple-500/50",
    headerColor: "bg-purple-600",
    accentColor: "bg-purple-500",
    features: ["Generous Whitespace", "Numbered Section Headers", "Editorial Typography", "Modern Aesthetic"],
  },
  {
    id: "executive",
    title: "Executive Leadership",
    tag: "Senior Roles",
    tagColor: "bg-amber-600 text-white border-amber-500",
    description: "High-contrast top banner header with metric grid containers engineered for directors and tech leads.",
    previewBg: "bg-slate-900 border-amber-500/50",
    headerColor: "bg-amber-600",
    accentColor: "bg-amber-500",
    features: ["Header Card Banner", "Core Competencies Grid", "Highlight Projects", "Leadership Ready"],
  },
];

export const TemplateShowcase: React.FC = () => {
  return (
    <section id="templates" className="py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <LayoutTemplate className="w-3.5 h-3.5 text-cyan-400" />
            RESUME TEMPLATES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 uppercase text-white">
            Designed for Every Career Level
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Choose from battle-tested layouts. Switch templates anytime with a single click without losing your resume data.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATE_CARDS.map((tmpl) => (
            <div
              key={tmpl.id}
              className="border border-slate-800 bg-slate-950 p-5 hover:border-indigo-500/80 transition-all flex flex-col justify-between group shadow-xl hover:shadow-indigo-500/10"
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
                    <div className="h-1.5 w-full bg-slate-700" />
                    <div className="h-1.5 w-5/6 bg-slate-700" />
                    <div className="h-1.5 w-4/6 bg-slate-700" />
                  </div>

                  <div className="flex gap-1.5">
                    <div className="h-2 w-1/4 bg-slate-800" />
                    <div className="h-2 w-1/4 bg-slate-800" />
                    <div className="h-2 w-1/4 bg-slate-800" />
                  </div>

                  {/* Badge */}
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border ${tmpl.tagColor}`}
                  >
                    {tmpl.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>{tmpl.title}</span>
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {tmpl.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6 text-[11px] text-slate-300 font-medium">
                  {tmpl.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
                  className="w-full justify-between font-bold bg-slate-900 text-white border-slate-700 hover:bg-indigo-600 hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-colors"
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
