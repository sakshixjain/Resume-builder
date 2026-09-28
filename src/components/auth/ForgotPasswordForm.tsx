"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft, Loader2, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToLogin,
}) => {
  const [step, setStep] = useState<"request" | "reset" | "success">("request");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [demoCodeHint, setDemoCodeHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Request Password Reset Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Failed to send reset code.");
        setIsLoading(false);
        return;
      }

      toast.success(data.message || "Verification code sent to your email!");
      if (data.token) {
        setDemoCodeHint(data.token);
        setResetToken(data.token); // Autofill for effortless testing
      }
      setStep("reset");
      setIsLoading(false);
    } catch (error) {
      console.error("Forgot password request error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // Step 2: Apply New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetToken || !newPassword) {
      toast.error("Please fill in both the verification code and your new password.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please verify.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          email: email.trim(),
          token: resetToken.trim(),
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Password reset failed.");
        setIsLoading(false);
        return;
      }

      toast.success("Password reset successfully! You can now sign in.");
      setStep("success");
      setIsLoading(false);
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* STEP 1: REQUEST CODE */}
      {step === "request" && (
        <>
          <div className="text-center space-y-1">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 border border-indigo-100 shadow-2xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Reset your password
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Enter your registered email and we&apos;ll send you a 6-digit code to reset your password.
            </p>
          </div>

          <form onSubmit={handleRequestCode} className="space-y-3.5 pt-1">
            <div>
              <Label required>Registered Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                required
                autoComplete="email"
                className="h-10 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Code...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Send Reset Code
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>
        </>
      )}

      {/* STEP 2: VERIFY CODE & SET NEW PASSWORD */}
      {step === "reset" && (
        <>
          <div className="text-center space-y-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 border border-amber-100 shadow-2xs">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Enter verification code
            </h2>
            <p className="text-xs text-slate-500">
              We sent a 6-digit code to <strong className="text-slate-800">{email}</strong>
            </p>
          </div>

          {demoCodeHint && (
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Demo Code:</span>
                <span className="font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-blue-200 text-blue-800 tracking-wider">
                  {demoCodeHint}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResetToken(demoCodeHint);
                  toast.info("Demo code filled!");
                }}
                className="text-[11px] font-bold text-blue-700 hover:underline"
              >
                Use Code
              </button>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-3 pt-1">
            <div>
              <Label required>6-Digit Code</Label>
              <Input
                type="text"
                placeholder="123456"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                leftIcon={<KeyRound className="w-4 h-4 text-slate-400" />}
                required
                maxLength={6}
                className="h-10 rounded-xl font-mono text-center tracking-widest text-base font-bold"
              />
            </div>

            <div>
              <Label required>New Password</Label>
              <Input
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                required
                autoComplete="new-password"
                className="h-10 rounded-xl"
              />
            </div>

            <div>
              <Label required>Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                required
                autoComplete="new-password"
                className="h-10 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating Password...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Reset Password & Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>
        </>
      )}

      {/* STEP 3: SUCCESS CONFIRMATION */}
      {step === "success" && (
        <div className="text-center space-y-4 py-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Password Reset Complete!
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
          </div>

          <button
            type="button"
            onClick={onSwitchToLogin}
            className="w-full h-10.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            Sign In Now
          </button>
        </div>
      )}

      {/* Back to Login link */}
      {step !== "success" && (
        <div className="text-center pt-2 pb-1">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </button>
        </div>
      )}
    </div>
  );
};
