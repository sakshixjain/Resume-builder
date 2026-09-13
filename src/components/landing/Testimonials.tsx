import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    initials: "SC",
    accentColor: "bg-blue-600",
    content:
      "QuickCV helped me rebuild my resume in under 10 minutes. The real-time A4 preview and clean ATS layout got me 4 interview calls in the first week!",
    rating: 5,
  },
  {
    name: "Marcus Miller",
    role: "Lead Product Manager",
    company: "FinTech Labs",
    initials: "MM",
    accentColor: "bg-purple-600",
    content:
      "Most resume builders lock your PDF download behind a $30 subscription paywall. QuickCV is fast, completely free, beautifully designed, and actually respects your privacy.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist",
    company: "CloudScale AI",
    initials: "PS",
    accentColor: "bg-emerald-600",
    content:
      "The AI summary assistant and action bullet suggestions made my experience descriptions sound 10x more impactful. Downloaded the PDF and submitted immediately.",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            CANDIDATE REVIEWS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4 uppercase">
            Trusted by Top Candidates Worldwide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Join thousands of professionals who landed roles at Google, Amazon, Stripe, and leading tech startups.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, index) => (
            <div
              key={index}
              className="p-7 bg-slate-50 border border-slate-300 shadow-sm flex flex-col justify-between hover:border-amber-500 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 group-hover:text-amber-500/60 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className={`w-9 h-9 ${rev.accentColor} text-white font-black text-xs flex items-center justify-center`}>
                  {rev.initials}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-xs text-slate-500">
                    {rev.role} · <strong className="text-blue-700 font-semibold">{rev.company}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
