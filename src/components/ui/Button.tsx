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
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer select-none";

    const variants = {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 border border-transparent",
      gradient:
        "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 shadow-sm shadow-indigo-500/25 border border-transparent",
      ai:
        "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-sm shadow-purple-500/25 border border-transparent",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
      outline:
        "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent",
      danger:
        "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-xs sm:text-sm gap-2",
      lg: "h-10 px-5 text-sm gap-2.5",
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
