"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { GoogleButton } from "./GoogleButton";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onSuccess,
  callbackUrl = "/builder",
}) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Compute password strength score (0 to 3)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8 && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please verify.");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Service to continue.");
      return;
    }

    try {
      setIsLoading(true);

      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok || !registerData.success) {
        toast.error(registerData.error || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully! Logging you in...");

      // Automatically sign in the newly registered user
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
        callbackUrl,
      });

      if (signInRes?.error) {
        toast.error("Account created, but auto-login failed. Please sign in.");
        if (onSwitchToLogin) onSwitchToLogin();
        setIsLoading(false);
        return;
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Info */}
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Create an Account
        </h2>
        <p className="text-xs text-slate-500">
          Join thousands creating professional resumes in minutes
        </p>
      </div>

      {/* Google OAuth Button */}
      <div className="pt-1">
        <GoogleButton
          label="Sign up with Google"
          callbackUrl={callbackUrl}
        />

        {/* Symmetrical Clean Divider */}
        <div className="relative flex items-center justify-center my-3.5">
          <div className="grow border-t border-slate-200" />
          <span className="shrink-0 px-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            or sign up with email
          </span>
          <div className="grow border-t border-slate-200" />
        </div>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <div>
          <Label required>Full Name</Label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            required
            autoComplete="name"
            className="h-10 rounded-xl"
          />
        </div>

        {/* Email */}
        <div>
          <Label required>Email Address</Label>
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

        {/* Password */}
        <div>
          <Label required>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              required
              autoComplete="new-password"
              className="h-10 rounded-xl pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="flex-1 h-1 rounded-full bg-slate-100 overflow-hidden flex gap-0.5">
                <div
                  className={`h-full flex-1 transition-all ${
                    strengthScore >= 1
                      ? strengthScore === 1
                        ? "bg-rose-500"
                        : strengthScore === 2
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                      : "bg-transparent"
                  }`}
                />
                <div
                  className={`h-full flex-1 transition-all ${
                    strengthScore >= 2
                      ? strengthScore === 2
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                      : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-full flex-1 transition-all ${
                    strengthScore >= 3 ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                {strengthScore === 1
                  ? "Weak"
                  : strengthScore === 2
                  ? "Medium"
                  : "Strong"}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label required>Confirm Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            required
            autoComplete="new-password"
            className="h-10 rounded-xl"
          />
        </div>

        {/* Terms agreement checkbox */}
        <div className="pt-0.5">
          <label className="flex items-start gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
            />
            <span className="leading-snug">
              I agree to the{" "}
              <span className="text-indigo-600 font-semibold hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 font-semibold hover:underline">
                Privacy Policy
              </span>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </button>
      </form>

      {/* Bottom Switch to Login */}
      {onSwitchToLogin && (
        <div className="text-center text-xs text-slate-500 pt-1 pb-1">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer ml-1"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};
