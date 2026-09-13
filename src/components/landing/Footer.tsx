import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-white text-slate-950 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                QuickCV<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The free, modern, open-access Resume Builder for high-growth engineers, designers, product managers, and executives.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <a href="#templates" className="hover:text-white transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Privacy & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">100% Client-Side Storage</span>
              </li>
              <li>
                <span className="text-slate-400">Zero Mandatory Sign-In</span>
              </li>
              <li>
                <span className="text-slate-400">Free Forever</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} QuickCV. Built with Next.js, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for high performance & clean design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
