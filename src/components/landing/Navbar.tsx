"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
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
          <Logo size="md" />

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
