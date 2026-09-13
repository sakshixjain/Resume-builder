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
  Star,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-blue-500/15 to-cyan-400/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 hero-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Glowing Sharp Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-md shadow-indigo-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI-POWERED RESUME BUILDER</span>
            <span className="w-1.5 h-1.5 bg-cyan-400" />
            <span className="text-white font-black">100% FREE & ATS READY</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white">
            Land Top Tech Interviews With A{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              High-Impact Resume
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto font-normal">
            Build recruiter-approved, ATS-compliant resumes with instant live A4
            preview, metric-driven AI bullet points, and 1-click vector PDF export.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link href="/builder" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto px-8 font-black text-sm">
                Build Your Resume Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <a href="#templates" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 font-bold text-sm bg-slate-900/90 text-white border-slate-700 hover:bg-slate-800 hover:border-slate-500"
              >
                View 4 Live Templates
              </Button>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              Instant A4 Sync
            </span>
            <span className="flex items-center gap-1.5 text-indigo-300">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-400" />
              98% ATS Pass Rate
            </span>
            <span className="flex items-center gap-1.5 text-blue-300">
              <Download className="w-3.5 h-3.5 text-blue-400" />
              Vector PDF Export
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side Private
            </span>
          </div>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Glow backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-30 blur-xl -z-10" />

          <div className="border border-slate-700/80 bg-slate-900 shadow-2xl">
            {/* Fake Browser Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-rose-500" />
                <div className="w-2.5 h-2.5 bg-amber-500" />
                <div className="w-2.5 h-2.5 bg-emerald-500" />
              </div>
              <div className="px-3 py-0.5 bg-slate-900 text-[11px] font-mono text-slate-400 border border-slate-800 flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold">https://</span>quickcv.app/builder
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-800/60">
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-ping" />
                AUTOSAVING
              </div>
            </div>

            {/* Mockup Split Layout View */}
            <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-950 text-slate-100 min-h-[360px] sm:min-h-[400px]">
              {/* Editor side mockup */}
              <div className="md:col-span-5 p-5 border-r border-slate-800 space-y-3 bg-slate-900/50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Editor Sections
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 border border-cyan-800/80">
                    ✓ SYNCED
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 bg-indigo-950/60 border-l-2 border-indigo-500 border-t border-r border-b border-indigo-900/60 flex items-center justify-between text-indigo-200 font-bold">
                    <span>Personal Info</span>
                    <span className="text-[10px] text-cyan-400 font-bold">READY</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 border-l-2 border-purple-500 border-t border-r border-b border-slate-800 flex items-center justify-between text-slate-300">
                    <span>Experience (3)</span>
                    <span className="text-[10px] text-emerald-400">FILLED</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 border-l-2 border-amber-500 border-t border-r border-b border-slate-800 flex items-center justify-between text-slate-300">
                    <span>Education (1)</span>
                    <span className="text-[10px] text-slate-500">SAVED</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 border-l-2 border-cyan-500 border-t border-r border-b border-slate-800 flex items-center justify-between text-slate-300">
                    <span>Skills (10)</span>
                    <span className="text-[10px] text-slate-500">EXPERT</span>
                  </div>
                  <div className="p-2 bg-slate-950 border border-dashed border-slate-800 text-center text-slate-500 text-xs hover:border-slate-700 cursor-pointer">
                    + Add Custom Section
                  </div>
                </div>
              </div>

              {/* Preview side mockup */}
              <div className="md:col-span-7 bg-slate-900/90 p-4 sm:p-6 flex items-center justify-center canvas-grid-pattern">
                <div className="w-full max-w-md bg-white shadow-2xl p-5 text-slate-900 space-y-3 font-sans border border-slate-300">
                  <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                    <div>
                      <div className="text-base font-black text-slate-950 uppercase tracking-tight">
                        Alexander Morgan
                      </div>
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                        Senior Full Stack Software Engineer
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-600 font-mono text-right">
                      <div>alex@example.com</div>
                      <div>San Francisco, CA</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 mb-1 border-b pb-0.5 border-indigo-100 flex items-center justify-between">
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
                    <div className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 mb-1 border-b pb-0.5 border-indigo-100">
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
