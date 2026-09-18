import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LayoutTemplate, Edit3, Download, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    stepColor: "from-blue-600 to-cyan-600",
    borderAccent: "hover:border-blue-500",
    iconBg: "bg-blue-50 border-blue-200 text-blue-600",
    title: "Select Your ATS Layout",
    desc: "Choose from our curated library of recruiter-tested templates: Modern Sidebar, Professional Single-Column ATS, Swiss Minimal, or Executive Leadership.",
    icon: <LayoutTemplate className="w-5 h-5 text-blue-600" />,
    badge: "TEMPLATE SELECTION",
  },
  {
    step: "02",
    stepColor: "from-indigo-600 to-purple-600",
    borderAccent: "hover:border-indigo-500",
    iconBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
    title: "Fill In or Polish with AI",
    desc: "Enter your background, work experience, education, skills, and projects, or utilize our 1-click role summary presets and metric bullet enhancers.",
    icon: <Edit3 className="w-5 h-5 text-indigo-600" />,
    badge: "AI BULLET POLISHER",
  },
  {
    step: "03",
    stepColor: "from-emerald-600 to-teal-600",
    borderAccent: "hover:border-emerald-500",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    title: "Export Vector PDF Instantly",
    desc: "Download high-DPI, print-ready A4 PDF documents with zero watermarks and zero subscription fees. Direct submission ready for top tech companies.",
    icon: <Download className="w-5 h-5 text-emerald-600" />,
    badge: "INSTANT DOWNLOAD",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            3-STEP WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4 uppercase">
            How CV Builder Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Create an interview-winning, high-impact resume in under 5 minutes with real-time feedback.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, index) => (
            <div
              key={index}
              className={`p-7 bg-white border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${s.borderAccent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-11 h-11 border flex items-center justify-center ${s.iconBg}`}>
                    {s.icon}
                  </div>
                  <span className={`text-3xl font-black font-mono bg-clip-text text-transparent bg-gradient-to-r ${s.stepColor}`}>
                    {s.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-mono text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero configuration needed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200 text-center max-w-4xl mx-auto shadow-md relative">
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight mb-2">
            Ready to upgrade your professional resume?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-xl mx-auto">
            No signup required. All changes save automatically in your browser.
          </p>
          <Link href="/builder">
            <Button variant="gradient" size="lg" className="font-black gap-2 px-9 text-sm shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
              Start Building Your Resume Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
