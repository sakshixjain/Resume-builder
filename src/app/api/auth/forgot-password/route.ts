import { NextResponse } from "next/server";
import { createPasswordResetToken, resetPasswordWithToken } from "@/lib/db/userRepo";

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

      const result = await resetPasswordWithToken(email, token, newPassword);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || "Password reset failed." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your password has been successfully reset in MySQL database! You can now log in.",
      });
    }

    // Step 1: Request reset code
    const result = await createPasswordResetToken(email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to generate password reset code." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password reset code sent! (Your verification code is ${result.token})`,
      token: result.token,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

