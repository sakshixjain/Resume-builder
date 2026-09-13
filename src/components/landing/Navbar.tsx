import React from "react";
import Link from "next/link";
import { FileText, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-lg tracking-tight text-white flex items-center gap-0.5">
            QuickCV<span className="text-cyan-400">.</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 ml-2 hidden sm:inline">
              PRO
            </span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#templates" className="hover:text-cyan-400 transition-colors">
            Templates
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
            How It Works
          </a>
          <a href="#reviews" className="hover:text-cyan-400 transition-colors">
            Reviews
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/builder">
            <Button variant="gradient" size="md" className="gap-2 font-black">
              <Sparkles className="w-3.5 h-3.5" />
              Build Resume
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
