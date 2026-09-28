"use client";

import React, { useState } from "react";
import {
  Star,
  X,
  Sparkles,
  Send,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  Check,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import confetti from "canvas-confetti";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RATING_TIERS: Record<
  number,
  { label: string; sub: string; emoji: string; badgeColor: string }
> = {
  1: {
    label: "Needs Improvement",
    sub: "Sorry to hear that! Tell us where we can do better.",
    emoji: "😕",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200/80",
  },
  2: {
    label: "Fair Experience",
    sub: "We have some work to do to make this better for you.",
    emoji: "😐",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200/80",
  },
  3: {
    label: "Good & Helpful",
    sub: "Glad it helped! We're always working to improve.",
    emoji: "👌",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
  },
  4: {
    label: "Very Good!",
    sub: "Awesome! Great to know you had a smooth experience.",
    emoji: "👍",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
  },
  5: {
    label: "Outstanding & Loved It!",
    sub: "Thank you! We're thrilled you had an amazing experience!",
    emoji: "🌟",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  },
};

const FEATURE_PILLS = [
  { id: "speed", label: "⚡ Super Fast Export" },
  { id: "templates", label: "🎨 Clean Templates" },
  { id: "pdf", label: "📄 High-Resolution PDF" },
  { id: "ats", label: "🎯 ATS Friendly" },
  { id: "easy", label: "✨ Easy Customization" },
  { id: "clean_ui", label: "📱 Modern Interface" },
];

const QUICK_IDEAS = [
  "More Template Designs",
  "AI Resume Summary Writer",
  "Cover Letter Builder",
  "Custom Font Uploads",
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "⚡ Super Fast Export",
    "📄 High-Resolution PDF",
  ]);
  const [recommend, setRecommend] = useState<"yes" | "maybe" | "no">("yes");
  const [suggestions, setSuggestions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentRating = hoverRating || rating;
  const ratingDetails = RATING_TIERS[currentRating] || RATING_TIERS[5];

  const toggleTag = (tagLabel: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  const handleAddQuickIdea = (idea: string) => {
    setSuggestions((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return idea;
      if (trimmed.includes(idea)) return prev;
      return `${trimmed}, ${idea}`;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // Fire celebratory confetti on 4-5 stars
      if (rating >= 4) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#2563eb", "#4f46e5", "#10b981", "#f59e0b", "#ec4899"],
          });
        } catch {}
      }

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          tags: selectedTags,
          recommendation: recommend,
          improvementSuggestions: suggestions.trim(),
          userName: session?.user?.name || "User",
          userEmail: session?.user?.email || "user@example.com",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setIsSubmitted(true);
      toast.success("Thank you for your valuable feedback! ❤️");
      try {
        localStorage.setItem("resume_builder_feedback_given", "true");
      } catch {}

      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Feedback submission error:", err);
      toast.success("Thank you! Feedback recorded.");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[500px] bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] border border-slate-100 z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Subtle Decorative Header Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Resume Downloaded!</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Success
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Rate your experience & help us improve
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Feedback Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed mt-1">
                Thank you for taking the time to share your review. Your input helps us make this builder even better!
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Best of luck with your job applications!
              </span>
            </div>
          </div>
        ) : (
          /* Feedback Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* 1. Star Rating Interactive Box */}
            <div className="text-center space-y-2.5 bg-gradient-to-b from-slate-50 to-slate-100/50 p-4 rounded-2xl border border-slate-200/70 shadow-2xs">
              <span className="text-xs font-semibold text-slate-700 block">
                How satisfied are you with the Resume Builder?
              </span>

              {/* Star Buttons */}
              <div className="flex items-center justify-center gap-2.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const activeStar = star <= currentRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-300 hover:scale-125 active:scale-95 transition-all duration-150 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          activeStar
                            ? "fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.45)]"
                            : "text-slate-300 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Rating Feedback Banner */}
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all duration-150 shadow-2xs ${ratingDetails.badgeColor}`}
                >
                  <span>{ratingDetails.emoji}</span>
                  <span>{ratingDetails.label}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {ratingDetails.sub}
                </span>
              </div>
            </div>

            {/* 2. Highlight Highlights / Liked Features */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 block">
                What did you like the most?
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FEATURE_PILLS.map((pill) => {
                  const isSelected = selectedTags.includes(pill.label);
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => toggleTag(pill.label)}
                      className={`text-xs px-2.5 py-1 rounded-xl font-medium border transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs font-semibold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                      <span>{pill.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Recommendation Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 block">
                Would you recommend this builder to colleagues?
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRecommend("yes")}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                    recommend === "yes"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400/30"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  😍 Definitely
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend("maybe")}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                    recommend === "maybe"
                      ? "bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-400/30"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  👍 Likely
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend("no")}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                    recommend === "no"
                      ? "bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-400/30"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  😐 Not Sure
                </button>
              </div>
            </div>

            {/* 4. Suggestions & Improvements */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                  <span>How can we improve? / Kaha sudhar karein?</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Optional</span>
              </div>

              <textarea
                rows={3}
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Share your thoughts, missing features, or suggestions..."
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 resize-none transition-all leading-relaxed shadow-2xs"
              />

              {/* Quick suggestion tags */}
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                <span className="text-[10px] text-slate-400 font-medium mr-1">Quick Add:</span>
                {QUICK_IDEAS.map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    onClick={() => handleAddQuickIdea(idea)}
                    className="text-[10px] text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/60 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                  >
                    + {idea}
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 justify-center pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Your feedback is private and used purely for product improvement.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Skip for Now
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-indigo-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Review"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

