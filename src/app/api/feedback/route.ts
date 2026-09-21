import { NextRequest, NextResponse } from "next/server";

export interface FeedbackPayload {
  category: "bug" | "feature" | "general";
  message: string;
  email?: string;
  pageUrl: string;
  timestamp: string;
  diagnostics?: {
    userAgent?: string;
    screenResolution?: string;
    toolSlug?: string;
    errorStack?: string;
  };
}

// Simple in-memory rate limiting map (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Clean up old timestamps outside the window
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0].trim() || realIp || "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many feedback submissions. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    let body: Partial<FeedbackPayload>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { category, message, email, pageUrl, timestamp, diagnostics } = body;

    // Validate category
    if (!category || !["bug", "feature", "general"].includes(category)) {
      return NextResponse.json(
        { success: false, error: "Category must be 'bug', 'feature', or 'general'." },
        { status: 400 }
      );
    }

    // Validate message length (min 5, max 2000 chars)
    if (!message || typeof message !== "string" || message.trim().length < 5 || message.trim().length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required and must be between 5 and 2000 characters.",
        },
        { status: 400 }
      );
    }

    // Validate pageUrl
    if (!pageUrl || typeof pageUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "A valid pageUrl string is required." },
        { status: 400 }
      );
    }

    const feedbackRecord: FeedbackPayload = {
      category: category as FeedbackPayload["category"],
      message: message.trim(),
      email: email ? email.trim() : undefined,
      pageUrl: pageUrl.trim(),
      timestamp: timestamp || new Date().toISOString(),
      diagnostics: diagnostics || {},
    };

    let dispatchedVia = "console";

    // 3. Dispatch via Resend Email API if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const recipient = process.env.FEEDBACK_RECIPIENT_EMAIL || "support@omniseotools.com";
        const emailSubject = `[OmniSEO ${feedbackRecord.category.toUpperCase()}] New User Feedback from ${feedbackRecord.diagnostics?.toolSlug || feedbackRecord.pageUrl}`;

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 20px;">OmniSEO Tools — Feedback Received</h2>
              <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; background-color: ${feedbackRecord.category === 'bug' ? '#fee2e2; color: #b91c1c;' : feedbackRecord.category === 'feature' ? '#e0e7ff; color: #4338ca;' : '#dcfce7; color: #15803d;'} margin-top: 8px;">
                ${feedbackRecord.category}
              </span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h4 style="color: #64748b; font-size: 12px; text-transform: uppercase; margin: 0 0 6px 0;">User Message:</h4>
              <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 14px; border-radius: 4px; font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">
                ${feedbackRecord.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
              </div>
            </div>

            <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 140px;"><strong>Page URL:</strong></td>
                <td style="padding: 6px 0;"><a href="${feedbackRecord.pageUrl}" style="color: #2563eb;">${feedbackRecord.pageUrl}</a></td>
              </tr>
              ${feedbackRecord.email ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Contact Email:</strong></td>
                <td style="padding: 6px 0;"><a href="mailto:${feedbackRecord.email}" style="color: #2563eb;">${feedbackRecord.email}</a></td>
              </tr>` : ''}
              ${feedbackRecord.diagnostics?.toolSlug ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Tool Slug:</strong></td>
                <td style="padding: 6px 0; font-family: monospace;">${feedbackRecord.diagnostics.toolSlug}</td>
              </tr>` : ''}
              ${feedbackRecord.diagnostics?.screenResolution ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Screen Resolution:</strong></td>
                <td style="padding: 6px 0;">${feedbackRecord.diagnostics.screenResolution}</td>
              </tr>` : ''}
              ${feedbackRecord.diagnostics?.userAgent ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>User-Agent:</strong></td>
                <td style="padding: 6px 0; font-size: 11px; font-family: monospace; color: #64748b;">${feedbackRecord.diagnostics.userAgent}</td>
              </tr>` : ''}
            </table>

            ${feedbackRecord.diagnostics?.errorStack ? `
            <div style="margin-top: 16px;">
              <h4 style="color: #b91c1c; font-size: 12px; text-transform: uppercase; margin: 0 0 6px 0;">Error Stack Trace:</h4>
              <pre style="background-color: #0f172a; color: #f87171; padding: 12px; border-radius: 8px; font-size: 11px; overflow-x: auto; font-family: monospace;">${feedbackRecord.diagnostics.errorStack}</pre>
            </div>` : ''}

            <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center;">
              Sent automatically by OmniSEO Tools Micro-Feedback System • ${feedbackRecord.timestamp}
            </div>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "OmniSEO Feedback <feedback@omniseotools.com>",
            to: [recipient],
            subject: emailSubject,
            html: htmlContent,
          }),
        });
        dispatchedVia = "resend";
      } catch (emailErr) {
        console.error("[Feedback API] Resend email dispatch failed:", emailErr);
      }
    }

    // 4. Dispatch via Webhook if FEEDBACK_WEBHOOK_URL is configured
    if (process.env.FEEDBACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.FEEDBACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackRecord),
        });
        dispatchedVia = dispatchedVia === "resend" ? "resend+webhook" : "webhook";
      } catch (webhookErr) {
        console.error("[Feedback API] Webhook dispatch failed:", webhookErr);
      }
    }

    // 5. Always log cleanly in development / local testing
    console.info(`[Feedback Received - ${feedbackRecord.category.toUpperCase()}] via ${dispatchedVia}:`, {
      message: feedbackRecord.message,
      pageUrl: feedbackRecord.pageUrl,
      email: feedbackRecord.email || "anonymous",
      toolSlug: feedbackRecord.diagnostics?.toolSlug || "n/a",
      timestamp: feedbackRecord.timestamp,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback received successfully. Thank you for helping us improve OmniSEO Tools!",
        dispatchedVia,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("[Feedback API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing feedback.",
      },
      { status: 500 }
    );
  }
}
