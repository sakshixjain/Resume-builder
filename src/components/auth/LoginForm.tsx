"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { GoogleButton } from "./GoogleButton";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
  onSuccess?: () => void;
  callbackUrl?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onSwitchToForgotPassword,
  onSuccess,
  callbackUrl = "/builder",
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password,
        callbackUrl,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back! Signed in successfully.");
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("demo@quickcv.com");
    setPassword("password123");
    toast.info("Demo credentials filled in!");
  };

  return (
    <div className="w-full space-y-5">
      {/* Header Info */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h2>
        <p className="text-xs text-slate-500">
          Sign in to your CV Builder account to save & access all your resumes
        </p>
      </div>

      {/* Google OAuth Button */}
      <div className="space-y-3">
        <GoogleButton
          label="Continue with Google"
          callbackUrl={callbackUrl}
        />

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200" />
          <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            or sign in with email
          </span>
        </div>
      </div>

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
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
          />
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label required>Password</Label>
            {onSwitchToForgotPassword && (
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded-xs border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span>Remember me for 30 days</span>
          </label>
        </div>

        {/* Submit Button */}
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
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              Sign In
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Demo Credentials Helper Pill */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Need a test account?</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
        >
          Auto-fill Demo
        </button>
      </div>

      {/* Bottom Switch to Register */}
      {onSwitchToRegister && (
        <div className="text-center text-xs text-slate-500 pt-1">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            Create an account
          </button>
        </div>
      )}
    </div>
  );
};
