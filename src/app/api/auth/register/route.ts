import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/userStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const result = registerUser(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Registration failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully!",
        user: {
          id: result.user?.id,
          name: result.user?.name,
          email: result.user?.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
