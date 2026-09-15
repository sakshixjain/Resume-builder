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
  CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Eye className="w-5 h-5 text-cyan-600" />,
    iconBg: "bg-cyan-50 border-cyan-200 text-cyan-600",
    accentGlow: "hover:border-cyan-500",
    title: "Real-Time Live A4 Preview",
    description:
      "Watch your resume format live as an authentic 210mm x 297mm A4 document with zero lag and instant layout re-calculation as you type.",
    colSpan: "lg:col-span-2",
    badge: "INSTANT SYNC",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    accentGlow: "hover:border-emerald-500",
    title: "100% ATS Optimized",
    description:
      "Engineered with standard semantic hierarchy, parseable typography, and keyword formatting so your resume passes HR screening bots.",
    colSpan: "lg:col-span-1",
    badge: "98% PASS RATE",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: <Download className="w-5 h-5 text-blue-600" />,
    iconBg: "bg-blue-50 border-blue-200 text-blue-600",
    accentGlow: "hover:border-blue-500",
    title: "Pixel-Perfect Vector PDF",
    description:
      "Direct 1-click vector PDF generation with standardized margins, crisp fonts, high-DPI scaling, and zero browser artifacts.",
    colSpan: "lg:col-span-1",
    badge: "PRINT READY",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    iconBg: "bg-purple-50 border-purple-200 text-purple-600",
    accentGlow: "hover:border-purple-500",
    title: "AI Action Bullet & Summary Polish",
    description:
      "Get instant metric-driven action verb suggestions and role-specific executive summaries across software engineering, product, data, design, and business.",
    colSpan: "lg:col-span-2",
    badge: "AI POWERED",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    icon: <ArrowUpDown className="w-5 h-5 text-rose-600" />,
    iconBg: "bg-rose-50 border-rose-200 text-rose-600",
    accentGlow: "hover:border-rose-500",
    title: "Instant Section Reordering",
    description:
      "Move experience above education or skills with 1-click up/down arrows or toggle section visibility to tailor for specific job openings.",
    colSpan: "lg:col-span-1",
    badge: "FLEXIBLE",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: <Palette className="w-5 h-5 text-amber-600" />,
    iconBg: "bg-amber-50 border-amber-200 text-amber-600",
    accentGlow: "hover:border-amber-500",
    title: "8 Pro Templates & Industry Kits",
    description:
      "Dedicated templates and presets for Tech, Non-Tech Corporate, Creative Portfolio, and Academic CVs with customizable palettes, typography, and spacing.",
    colSpan: "lg:col-span-1",
    badge: "8 TEMPLATES",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: <Lock className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
    accentGlow: "hover:border-indigo-500",
    title: "100% Client-Side Private",
    description:
      "Your resume data is stored securely in your browser's localStorage. No forced account signups, no tracking cookies, and no surprise paywalls.",
    colSpan: "lg:col-span-1",
    badge: "ZERO TRACKING",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            POWERFUL CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4 uppercase">
            Everything You Need To Get Hired
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered with modern web tech for lightning speed, clean typography standards, and seamless real-time customization.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, index) => (
            <div
              key={index}
              className={`p-6 bg-slate-50 border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative hover:-translate-y-0.5 ${feat.accentGlow} ${feat.colSpan}`}
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

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Production Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
