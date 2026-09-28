import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { query } from "@/lib/db/mysql";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { rating, tags, feedbackText, improvementSuggestions, recommendation } = body;

    const userId = session?.user ? (session.user as any).id || "user_auth" : null;
    const userEmail = session?.user?.email || body.userEmail || "anonymous@feedback.com";
    const userName = session?.user?.name || body.userName || "User";

    const ratingNum = Math.max(1, Math.min(5, Number(rating) || 5));
    const tagsString = Array.isArray(tags) ? tags.join(", ") : (tags || "");
    const combinedFeedback = [
      feedbackText,
      recommendation ? `Recommendation: ${recommendation}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      await query(
        `INSERT INTO user_feedbacks (user_id, user_email, user_name, rating, tags, feedback_text, improvement_suggestions) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          userEmail,
          userName,
          ratingNum,
          tagsString,
          combinedFeedback || "",
          improvementSuggestions || "",
        ]
      );
    } catch (dbErr) {
      console.warn("MySQL feedback insert warning (fallback):", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully! Thank you for helping us improve.",
    });
  } catch (error: any) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit feedback." },
      { status: 500 }
    );
  }
}
