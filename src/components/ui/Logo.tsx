import React from "react";
import Link from "next/link";

export interface LogoProps {
  variant?: "default" | "light" | "icon-only" | "monochrome" | "badge";
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
  href?: string;
  className?: string;
  showTagline?: boolean;
  tagline?: string;
}

const SIZE_MAP = {
  sm: {
    iconSize: 28,
    textSize: "text-base",
    badgeSize: "text-[9px] px-1.5 py-0.2",
    taglineSize: "text-[9.5px]",
    gap: "gap-2",
  },
  md: {
    iconSize: 34,
    textSize: "text-lg",
    badgeSize: "text-[10px] px-1.5 py-0.5",
    taglineSize: "text-[10.5px]",
    gap: "gap-2.5",
  },
  lg: {
    iconSize: 42,
    textSize: "text-2xl",
    badgeSize: "text-[11px] px-2 py-0.5",
    taglineSize: "text-xs",
    gap: "gap-3",
  },
  xl: {
    iconSize: 52,
    textSize: "text-3xl",
    badgeSize: "text-xs px-2.5 py-1",
    taglineSize: "text-sm",
    gap: "gap-3.5",
  },
};

/**
 * Custom modern vector emblem designed specifically for "CV Builder".
 * Combines the "C" (curved document contour) and "V" (upward dynamic career checkmark)
 * with resume document structure lines and an ATS career spark.
 */
export const CVLogoIcon: React.FC<{
  size?: number;
  className?: string;
  isLight?: boolean;
}> = ({ size = 36, className = "", isLight = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <defs>
        {/* Main Background Gradient */}
        <linearGradient
          id="cv-builder-bg-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        {/* Accent Dynamic 'V' Gradient */}
        <linearGradient
          id="cv-builder-v-grad"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Sparkle Glow */}
        <linearGradient
          id="cv-spark-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* Outer Glow / Drop Shadow */}
        <filter id="cv-glow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#4f46e5"
            floodOpacity="0.3"
          />
        </filter>
      </defs>

      {/* Rounded Squircle Container */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="url(#cv-builder-bg-grad)"
        filter="url(#cv-glow)"
      />

      {/* Subtle Inner Glass Highlight */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="11"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      {/* Stylized 'C' letter representing folded CV document */}
      <path
        d="M 23 15 C 16.5 15 13 18.5 13 24 C 13 29.5 16.5 33 23 33"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stylized 'V' letter representing upward career growth & ATS tick */}
      <path
        d="M 23 21 L 28 33 L 36 14"
        stroke="url(#cv-builder-v-grad)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Document micro-lines inside 'C' */}
      <line
        x1="18"
        y1="21"
        x2="21"
        y2="21"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="26"
        x2="23"
        y2="26"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Top Right Career Elevation Sparkle / Star */}
      <path
        d="M 36 8 L 37.2 11.2 L 40.4 12.4 L 37.2 13.6 L 36 16.8 L 34.8 13.6 L 31.6 12.4 L 34.8 11.2 Z"
        fill="url(#cv-spark-grad)"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  size = "md",
  asLink = true,
  href = "/",
  className = "",
  showTagline = false,
  tagline = "Resume & CV Maker",
}) => {
  const sizeConfig = SIZE_MAP[size];
  const isLight = variant === "light";
  const isIconOnly = variant === "icon-only";

  const content = (
    <div
      className={`inline-flex items-center ${sizeConfig.gap} select-none group ${className}`}
    >
      {/* Emblem Icon */}
      <CVLogoIcon size={sizeConfig.iconSize} isLight={isLight} />

      {/* Text Branding */}
      {!isIconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${sizeConfig.textSize} ${
                isLight ? "text-white" : "text-slate-900"
              }`}
            >
              CV
            </span>
            <span
              className={`font-extrabold tracking-tight ${sizeConfig.textSize} bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500`}
            >
              Builder
            </span>

            {/* Optional Small Accent Dot / Badge */}
            {variant === "badge" ? (
              <span
                className={`font-mono font-bold uppercase rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 ${sizeConfig.badgeSize}`}
              >
                PRO
              </span>
            ) : null}
          </div>

          {/* Subtitle / Tagline */}
          {showTagline && (
            <span
              className={`mt-1 font-medium tracking-normal ${sizeConfig.taglineSize} ${
                isLight ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-flex focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
