import { NextResponse } from "next/server";
import { createPasswordResetToken, resetPasswordWithToken } from "@/lib/auth/userStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, token, newPassword } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    // Step 2: Reset password with verification code
    if (action === "reset" || (token && newPassword)) {
      if (!token || !newPassword) {
        return NextResponse.json(
          { success: false, error: "Verification code and new password are required." },
          { status: 400 }
        );
      }

      const result = resetPasswordWithToken(email, token, newPassword);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Password reset failed." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your password has been successfully reset! You can now log in.",
      });
    }

    // Step 1: Request reset code
    const result = createPasswordResetToken(email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to generate password reset code." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password reset code sent! (For demonstration: your verification code is ${result.token})`,
      token: result.token, // In demo mode, returning the token facilitates instant preview & testing
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
