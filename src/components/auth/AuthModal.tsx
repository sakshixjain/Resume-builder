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
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-10 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100 shrink-0">
          <Logo size="sm" asLink={false} />

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Optional Context Banner (e.g. for Download Resume requirement) */}
        {message && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-indigo-50/90 border border-indigo-100/90 flex items-start gap-2.5 text-xs text-slate-800 shadow-2xs">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              {badge && (
                <span className="font-bold uppercase text-[10px] text-indigo-700 tracking-wider block mb-0.5">
                  {badge}
                </span>
              )}
              <p className="text-slate-700 font-medium leading-relaxed">{message}</p>
            </div>
          </div>
        )}

        {/* View Switcher Tabs (Only shown for Login/Register) */}
        {view !== "forgot-password" && (
          <div className="px-6 pt-4 shrink-0">
            <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setView("login")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  view === "login"
                    ? "bg-white text-slate-950 shadow-xs font-bold"
                    : "hover:text-slate-900 text-slate-500"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView("register")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  view === "register"
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
        <div className="p-6 overflow-y-auto flex-1">
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
