import React from "react";
import {
  Eye,
  FileCheck2,
  Download,
  Sparkles,
  ArrowUpDown,
  Lock,
  Palette,
  Layers,
  Zap,
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Eye className="w-5 h-5 text-cyan-400" />,
    iconBg: "bg-cyan-950/80 border-cyan-800/80 text-cyan-400",
    accentGlow: "group-hover:border-cyan-500/80",
    title: "Real-Time Live A4 Preview",
    description:
      "Watch your resume format live as an authentic 210mm x 297mm A4 document with zero lag and instant layout re-calculation as you type.",
    colSpan: "lg:col-span-2",
    badge: "INSTANT SYNC",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  {
    icon: <FileCheck2 className="w-5 h-5 text-emerald-400" />,
    iconBg: "bg-emerald-950/80 border-emerald-800/80 text-emerald-400",
    accentGlow: "group-hover:border-emerald-500/80",
    title: "100% ATS Optimized",
    description:
      "Engineered with standard semantic hierarchy, parseable typography, and keyword formatting so your resume passes HR screening bots.",
    colSpan: "lg:col-span-1",
    badge: "98% PASS RATE",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  {
    icon: <Download className="w-5 h-5 text-blue-400" />,
    iconBg: "bg-blue-950/80 border-blue-800/80 text-blue-400",
    accentGlow: "group-hover:border-blue-500/80",
    title: "Pixel-Perfect Vector PDF",
    description:
      "Direct 1-click vector PDF generation with standardized margins, crisp fonts, high-DPI scaling, and zero browser artifacts.",
    colSpan: "lg:col-span-1",
    badge: "PRINT READY",
    badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    iconBg: "bg-purple-950/80 border-purple-800/80 text-purple-400",
    accentGlow: "group-hover:border-purple-500/80",
    title: "AI Action Bullet & Summary Polish",
    description:
      "Get instant metric-driven action verb suggestions and role-specific executive summaries across software engineering, product, data, design, and business.",
    colSpan: "lg:col-span-2",
    badge: "AI POWERED",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  {
    icon: <ArrowUpDown className="w-5 h-5 text-rose-400" />,
    iconBg: "bg-rose-950/80 border-rose-800/80 text-rose-400",
    accentGlow: "group-hover:border-rose-500/80",
    title: "Instant Section Reordering",
    description:
      "Move experience above education or skills with 1-click up/down arrows or toggle section visibility to tailor for specific job openings.",
    colSpan: "lg:col-span-1",
    badge: "FLEXIBLE",
    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  {
    icon: <Palette className="w-5 h-5 text-amber-400" />,
    iconBg: "bg-amber-950/80 border-amber-800/80 text-amber-400",
    accentGlow: "group-hover:border-amber-500/80",
    title: "Themes, Colors & Typography",
    description:
      "Customize sapphire blue, emerald, royal purple, crimson, deep slate, serif/sans fonts, scaling, and spacing with live preview feedback.",
    colSpan: "lg:col-span-1",
    badge: "4 TEMPLATES",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  {
    icon: <Lock className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-950/80 border-indigo-800/80 text-indigo-400",
    accentGlow: "group-hover:border-indigo-500/80",
    title: "100% Client-Side Private",
    description:
      "Your resume data is stored securely in your browser's localStorage. No forced account signups, no tracking cookies, and no surprise paywalls.",
    colSpan: "lg:col-span-1",
    badge: "ZERO TRACKING",
    badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  },
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            POWERFUL CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Everything You Need To Get Hired
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered with modern web tech for lightning speed, clean typography standards, and seamless real-time customization.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, index) => (
            <div
              key={index}
              className={`p-6 bg-slate-900/90 border border-slate-800 shadow-xl transition-all duration-200 flex flex-col justify-between group relative hover:-translate-y-0.5 ${feat.accentGlow} ${feat.colSpan}`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 border flex items-center justify-center ${feat.iconBg}`}>
                    {feat.icon}
                  </div>
                  {feat.badge && (
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                <span>Production Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
