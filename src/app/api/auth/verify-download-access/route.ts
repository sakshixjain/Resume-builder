import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";
import { findUserByEmail, logDownload } from "@/lib/db/userRepo";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        {
          allowed: false,
          error: "You must be signed in to download your resume. Please sign in or create an account.",
        },
        { status: 401 }
      );
    }

    // Verify directly against MongoDB database
    const dbUser = await findUserByEmail(session.user.email);

    if (!dbUser) {
      return NextResponse.json(
        {
          allowed: false,
          error: "User account not found in database. Please sign in again.",
        },
        { status: 401 }
      );
    }

    // Parse request body for template metadata to log
    let templateUsed = "standard";
    try {
      const body = await req.json();
      if (body?.template) templateUsed = body.template;
    } catch {}

    // Log the download action in MongoDB download_logs
    await logDownload(dbUser.id, dbUser.email, templateUsed);

    return NextResponse.json({
      allowed: true,
      message: "Download authorized by MongoDB database",
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      },
    });
  } catch (error: any) {
    console.error("Download verification error:", error);
    return NextResponse.json(
      {
        allowed: false,
        error: "Database error verifying download permission.",
      },
      { status: 500 }
    );
  }
}
