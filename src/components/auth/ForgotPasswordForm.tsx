"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

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
    <div className="w-full space-y-5">
      {/* STEP 1: REQUEST CODE */}
      {step === "request" && (
        <>
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 border border-blue-100 shadow-2xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Reset your password
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Enter your registered email address and we&apos;ll send you a 6-digit verification code to reset your password.
            </p>
          </div>

          <form onSubmit={handleRequestCode} className="space-y-4">
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
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full font-bold shadow-md shadow-blue-500/20 cursor-pointer"
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
            </Button>
          </form>
        </>
      )}

      {/* STEP 2: VERIFY CODE & SET NEW PASSWORD */}
      {step === "reset" && (
        <>
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 border border-amber-100 shadow-2xs">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Enter verification code
            </h2>
            <p className="text-xs text-slate-500">
              We sent a code to <strong className="text-slate-800">{email}</strong>
            </p>
          </div>

          {demoCodeHint && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Demo Verification Code:</span>{" "}
                <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-blue-200">
                  {demoCodeHint}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-3.5">
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
                className="font-mono text-center tracking-widest text-base font-bold"
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
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full font-bold shadow-md shadow-blue-500/20 cursor-pointer mt-2"
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
            </Button>
          </form>
        </>
      )}

      {/* STEP 3: SUCCESS CONFIRMATION */}
      {step === "success" && (
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Password Reset Complete!
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={onSwitchToLogin}
            className="w-full font-bold shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Sign In Now
          </Button>
        </div>
      )}

      {/* Back to Login link */}
      {step !== "success" && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </button>
        </div>
      )}
    </div>
  );
};
