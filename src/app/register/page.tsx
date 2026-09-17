"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FileText, ArrowLeft } from "lucide-react";
import { RegisterForm } from "@/components/auth/RegisterForm";

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/builder";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group mb-4"
        >
          <div className="w-9 h-9 rounded-xl bg-[#6366f1] text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20 group-hover:bg-[#4f46e5] transition-colors">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">
            QuickCV
          </span>
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl shadow-xl border border-slate-200/80">
          <RegisterForm
            onSwitchToLogin={() => router.push("/login")}
            callbackUrl={callbackUrl}
          />
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to QuickCV Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-xs text-slate-400">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
