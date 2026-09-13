import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient" | "ai";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none";

    const variants = {
      primary:
        "bg-slate-900 text-white hover:bg-indigo-600 border border-slate-900 hover:border-indigo-600 shadow-sm shadow-slate-900/10",
      gradient:
        "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 border border-indigo-500/40 shadow-md shadow-indigo-500/25",
      ai:
        "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-sm shadow-purple-500/25",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300",
      outline:
        "bg-white text-slate-800 hover:bg-slate-900 hover:text-white border border-slate-300 hover:border-slate-900 shadow-2xs",
      ghost: "text-slate-700 hover:text-indigo-600 hover:bg-slate-100 border border-transparent",
      danger:
        "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 hover:border-rose-300",
    };

    const sizes = {
      sm: "h-8 px-3 text-[11px] gap-1.5",
      md: "h-9 px-4 text-xs gap-2",
      lg: "h-11 px-6 text-xs sm:text-sm gap-2.5",
      icon: "h-8 w-8 p-0 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
