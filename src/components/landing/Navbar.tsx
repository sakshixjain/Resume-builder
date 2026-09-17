"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { UserMenu } from "@/components/auth/UserMenu";
import { AuthModal, AuthView } from "@/components/auth/AuthModal";

export const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthView>("login");

  const handleOpenAuth = (view: AuthView = "login") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#6366f1] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4f46e5] transition-colors">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              QuickCV
            </span>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#templates" className="hover:text-indigo-600 transition-colors">
              Templates
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#reviews" className="hover:text-indigo-600 transition-colors">
              Reviews
            </a>
          </nav>

          {/* Right Controls: User Profile + Build Resume CTA */}
          <div className="flex items-center gap-3">
            <UserMenu onOpenAuthModal={handleOpenAuth} />

            <Link href="/builder">
              <Button variant="primary" size="md" className="gap-2 font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Interactive Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
        callbackUrl="/builder"
      />
    </>
  );
};
