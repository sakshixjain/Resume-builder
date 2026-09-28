"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export type AuthView = "login" | "register" | "forgot-password";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
  callbackUrl?: string;
  badge?: string;
  message?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = "login",
  callbackUrl = "/builder",
  badge,
  message,
}) => {
  const [view, setView] = useState<AuthView>(initialView);

  // Sync initial view when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[430px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-slate-200/80 z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-4.5 pb-3 border-b border-slate-100 shrink-0 bg-white">
          <Logo size="sm" asLink={false} />

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Optional Context Badge (e.g. "Sign in required") */}
        {(badge || message) && (
          <div className="flex justify-start pt-3.5 px-5 sm:px-6 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50/90 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{badge || message}</span>
            </div>
          </div>
        )}

        {/* View Switcher Tabs (Only shown for Login/Register) */}
        {view !== "forgot-password" && (
          <div className="px-5 sm:px-6 pt-3.5 shrink-0">
            <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl text-xs font-semibold text-slate-600 gap-1">
              <button
                type="button"
                onClick={() => setView("login")}
                className={`py-2 rounded-lg transition-all cursor-pointer text-center ${view === "login"
                  ? "bg-white text-slate-950 shadow-xs font-bold"
                  : "hover:text-slate-900 text-slate-500"
                  }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView("register")}
                className={`py-2 rounded-lg transition-all cursor-pointer text-center ${view === "register"
                  ? "bg-white text-slate-950 shadow-xs font-bold"
                  : "hover:text-slate-900 text-slate-500"
                  }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200">
          {view === "login" && (
            <LoginForm
              onSwitchToRegister={() => setView("register")}
              onSwitchToForgotPassword={() => setView("forgot-password")}
              onSuccess={onClose}
              callbackUrl={callbackUrl}
            />
          )}

          {view === "register" && (
            <RegisterForm
              onSwitchToLogin={() => setView("login")}
              onSuccess={onClose}
              callbackUrl={callbackUrl}
            />
          )}

          {view === "forgot-password" && (
            <ForgotPasswordForm
              onSwitchToLogin={() => setView("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
