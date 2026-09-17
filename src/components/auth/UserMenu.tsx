"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  User,
  LogOut,
  FileText,
  Sparkles,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface UserMenuProps {
  onOpenAuthModal?: (view?: "login" | "register") => void;
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  onOpenAuthModal,
  className = "",
}) => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className={`w-8 h-8 rounded-full bg-slate-100 animate-pulse ${className}`} />
    );
  }

  // If unauthenticated: show Sign In button
  if (status === "unauthenticated" || !session?.user) {
    if (onOpenAuthModal) {
      return (
        <button
          type="button"
          onClick={() => onOpenAuthModal("login")}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer ${className}`}
        >
          Sign In
        </button>
      );
    }

    return (
      <Link href="/login">
        <button
          type="button"
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer ${className}`}
        >
          Sign In
        </button>
      </Link>
    );
  }

  const user = session.user;
  const userName = user.name || "User";
  const userEmail = user.email || "";
  const provider = (user as { provider?: string }).provider || "credentials";

  // Compute initials for fallback avatar
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    try {
      setIsOpen(false);
      await signOut({ callbackUrl: "/" });
      toast.info("Signed out successfully.");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out.");
    }
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      {/* Avatar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer focus:outline-hidden"
        title="Account menu"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={userName}
            className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-2xs"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            {initials}
          </div>
        )}

        <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate hidden sm:inline-block">
          {userName.split(" ")[0]}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
          {/* User Profile Header */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <p className="text-sm font-bold text-slate-900 truncate">
              {userName}
            </p>
            <p className="text-xs text-slate-500 truncate mt-0.5">{userEmail}</p>

            {/* Provider Tag */}
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                {provider === "google" ? "Google Account" : "QuickCV Account"}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-1 space-y-0.5">
            <Link
              href="/builder"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Resume Builder</span>
            </Link>

            <Link
              href="/#templates"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-slate-500" />
              <span>Explore 8 Templates</span>
            </Link>
          </div>

          {/* Sign Out Action */}
          <div className="p-1 border-t border-slate-100 mt-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
