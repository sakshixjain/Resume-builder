"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  className?: string;
  bodyClassName?: string;
  hideHeader?: boolean;
  headerContent?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
  className,
  bodyClassName,
  hideHeader = false,
  headerContent,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        className={cn(
          "relative w-full bg-white text-slate-900 rounded-t-[28px] sm:rounded-2xl shadow-2xl border-t sm:border border-slate-100 p-4 sm:p-6 z-10 max-h-[92vh] sm:max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 overflow-hidden",
          maxWidths[maxWidth],
          className
        )}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-2 sm:hidden shrink-0" />

        {/* Header */}
        {!hideHeader && (
          <div className="flex items-start justify-between pb-3 border-b border-slate-100 shrink-0">
            <div>
              {title && (
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xs text-slate-500 mt-0.5">{description}</p>
              )}
            </div>
            {headerContent}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto overscroll-contain py-2 space-y-4",
            bodyClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

