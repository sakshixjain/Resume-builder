import { NextResponse } from "next/server";
import { registerUser } from "@/lib/db/userRepo";

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

    const result = await registerUser(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Registration failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully in database!",
        user: {
          id: result.user?.id,
          name: result.user?.name,
          email: result.user?.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("MongoDB Registration route error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "An unexpected error occurred during database registration." },
      { status: 500 }
    );
  }
}

