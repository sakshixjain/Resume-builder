"use client";

import React, { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  valueSuffix?: string;
  showIconOnComplete?: boolean;
  colorScheme?: "auto" | "blue" | "emerald" | "amber" | "purple";
  className?: string;
  animate?: boolean;
  subtitle?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage = 0,
  size = 64,
  strokeWidth = 6,
  showValue = true,
  valueSuffix = "%",
  showIconOnComplete = true,
  colorScheme = "auto",
  className = "",
  animate = true,
  subtitle,
}) => {
  const gradientId = useId().replace(/:/g, "_");
  const clampedPercentage = Math.min(100, Math.max(0, Math.round(percentage)));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  // Determine gradient color stops based on score or scheme
  const getGradientColors = () => {
    if (colorScheme === "blue") {
      return { start: "#2563eb", end: "#60a5fa", glow: "rgba(37, 99, 235, 0.25)" };
    }
    if (colorScheme === "emerald") {
      return { start: "#059669", end: "#34d399", glow: "rgba(16, 185, 129, 0.25)" };
    }
    if (colorScheme === "amber") {
      return { start: "#d97706", end: "#fbbf24", glow: "rgba(245, 158, 11, 0.25)" };
    }
    if (colorScheme === "purple") {
      return { start: "#7c3aed", end: "#a78bfa", glow: "rgba(124, 58, 237, 0.25)" };
    }

    // Auto theme based on percentage
    if (clampedPercentage === 100) {
      return { start: "#059669", end: "#10b981", glow: "rgba(16, 185, 129, 0.3)" };
    }
    if (clampedPercentage >= 75) {
      return { start: "#0284c7", end: "#06b6d4", glow: "rgba(14, 165, 233, 0.25)" };
    }
    if (clampedPercentage >= 40) {
      return { start: "#2563eb", end: "#3b82f6", glow: "rgba(37, 99, 235, 0.25)" };
    }
    return { start: "#ea580c", end: "#f59e0b", glow: "rgba(245, 158, 11, 0.25)" };
  };

  const colors = getGradientColors();
  const isComplete = clampedPercentage === 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Completion progress: ${clampedPercentage}%`}
      className={cn("relative inline-flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 origin-center"
      >
        <defs>
          <linearGradient id={`grad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={colors.glow} />
          </filter>
        </defs>

        {/* Background Track Ring (Soft Grey) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          className="stroke-slate-300 dark:stroke-slate-500"
        />

        {/* Animated Active Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#grad-${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter={`url(#glow-${gradientId})`}
          style={{
            transition: animate
              ? "stroke-dashoffset 0.55s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease"
              : "none",
          }}
        />
      </svg>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
        {isComplete && showIconOnComplete && size >= 48 ? (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-black text-emerald-700 tracking-tight leading-none">
              100%
            </span>
            <span className="text-[9px] font-bold text-emerald-600 mt-0.5 leading-none">
              Done
            </span>
          </div>
        ) : showValue ? (
          <div className="flex flex-col items-center justify-center">
            <span
              className={cn(
                "font-black tracking-tight leading-none",
                size <= 48
                  ? "text-xs font-bold text-slate-800"
                  : size <= 64
                    ? "text-sm font-black text-slate-900"
                    : "text-base font-black text-slate-900"
              )}
            >
              {clampedPercentage}
              <span className="text-[10px] font-bold opacity-75">{valueSuffix}</span>
            </span>
            {subtitle && size >= 60 && (
              <span className="text-[9px] font-medium text-slate-400 mt-0.5 leading-none uppercase tracking-wider">
                {subtitle}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
