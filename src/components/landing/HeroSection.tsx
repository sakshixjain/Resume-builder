import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Download,
  FileCheck2,
  Zap,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden bg-white text-slate-900 border-b border-slate-200">
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-blue-100/70 via-indigo-50/50 to-cyan-50/60 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute inset-0 light-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Glowing Sharp Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>AI-POWERED RESUME & CV BUILDER</span>
            <span className="w-1.5 h-1.5 bg-blue-600" />
            <span className="text-slate-900 font-black">TECH · NON-TECH · FRESHER · EXPERIENCED</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-slate-950">
            Land Top Roles With A{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
              High-Impact Resume & CV
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto font-normal">
            Tailored templates and starter kits for <strong>Tech & Non-Tech</strong> professionals, <strong>Freshers & Experienced</strong> leaders, and <strong>Academic CVs</strong>. Instant live A4 preview and 1-click vector PDF export.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link href="/builder" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto px-8 font-black text-sm shadow-md shadow-blue-500/25 cursor-pointer">
                Build Your Resume Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <a href="#templates" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 font-bold text-sm bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:border-slate-400 cursor-pointer"
              >
                View 8 Live Templates
              </Button>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-blue-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Instant A4 Sync
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
              98% ATS Pass Rate
            </span>
            <span className="flex items-center gap-1.5 text-cyan-700">
              <Download className="w-3.5 h-3.5 text-cyan-600" />
              Vector PDF Export
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client-Side Private
            </span>
          </div>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Subtle glow backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-cyan-200 opacity-60 blur-xl -z-10" />

          <div className="border border-slate-300 bg-white shadow-2xl">
            {/* Window Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-rose-500" />
                <div className="w-2.5 h-2.5 bg-amber-500" />
                <div className="w-2.5 h-2.5 bg-emerald-500" />
              </div>
              <div className="px-3 py-0.5 bg-white text-[11px] font-mono text-slate-600 border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                <span className="text-blue-600 font-bold">https://</span>cvbuilder.app/builder
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                <span className="w-1.5 h-1.5 bg-emerald-600 animate-ping" />
                AUTOSAVING
              </div>
            </div>

            {/* Mockup Split Layout View */}
            <div className="grid grid-cols-1 md:grid-cols-12 bg-white text-slate-900 min-h-[360px] sm:min-h-[400px]">
              {/* Editor side mockup */}
              <div className="md:col-span-5 p-5 border-r border-slate-200 space-y-3 bg-slate-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Editor Sections
                  </span>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 border border-blue-300">
                    ✓ SYNCED
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 bg-white border-l-4 border-l-blue-600 border border-slate-200 flex items-center justify-between text-slate-900 font-bold shadow-2xs">
                    <span>Personal Info</span>
                    <span className="text-[10px] text-blue-600 font-bold">READY</span>
                  </div>
                  <div className="p-2.5 bg-white border-l-4 border-l-indigo-600 border border-slate-200 flex items-center justify-between text-slate-800 shadow-2xs">
                    <span>Experience (3)</span>
                    <span className="text-[10px] text-emerald-600 font-bold">FILLED</span>
                  </div>
                  <div className="p-2.5 bg-white border-l-4 border-l-amber-600 border border-slate-200 flex items-center justify-between text-slate-800 shadow-2xs">
                    <span>Education (1)</span>
                    <span className="text-[10px] text-slate-500 font-bold">SAVED</span>
                  </div>
                  <div className="p-2.5 bg-white border-l-4 border-l-emerald-600 border border-slate-200 flex items-center justify-between text-slate-800 shadow-2xs">
                    <span>Skills (10)</span>
                    <span className="text-[10px] text-slate-500 font-bold">EXPERT</span>
                  </div>
                  <div className="p-2 bg-white border border-dashed border-slate-300 text-center text-slate-600 text-xs hover:border-slate-500 cursor-pointer font-semibold">
                    + Add Custom Section
                  </div>
                </div>
              </div>

              {/* Preview side mockup */}
              <div className="md:col-span-7 bg-slate-200/80 p-4 sm:p-6 flex items-center justify-center canvas-grid-pattern">
                <div className="w-full max-w-md bg-white shadow-xl p-5 text-slate-900 space-y-3 font-sans border border-slate-300">
                  <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                    <div>
                      <div className="text-base font-black text-slate-950 uppercase tracking-tight">
                        Alexander Morgan
                      </div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                        Senior Full Stack Software Engineer
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-600 font-mono text-right">
                      <div>alex@example.com</div>
                      <div>San Francisco, CA</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-blue-600 mb-1 border-b pb-0.5 border-blue-100 flex items-center justify-between">
                      <span>Work Experience</span>
                      <span className="text-[8px] text-slate-400 font-mono font-normal">2018 - Present</span>
                    </div>
                    <div className="text-[9px] space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Senior Full Stack Engineer — Apex Cloud</span>
                        <span className="text-slate-500 font-mono font-normal">2022 - Present</span>
                      </div>
                      <p className="text-[8px] text-slate-600 leading-tight">
                        • Spearheaded migration of monolith to Next.js App Router, slashing latency by 52%.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-blue-600 mb-1 border-b pb-0.5 border-blue-100">
                      Skills & Technologies
                    </div>
                    <div className="flex flex-wrap gap-1 text-[8px]">
                      {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker", "AWS"].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 text-slate-800 font-semibold font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
