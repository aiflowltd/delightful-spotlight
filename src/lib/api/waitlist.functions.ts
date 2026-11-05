import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizeFrom } from "@/lib/form-helpers";

// Waitlist signup from the homepage CTA ("A mirror for the discovery you're already doing").
//
// Each signup is emailed to you via Resend, using the same environment variables as the
// /for-programs demo form (set them in Vercel → Project → Settings → Environment Variables):
//
//   RESEND_API_KEY     required  API key from resend.com/api-keys
//   LEAD_NOTIFY_EMAIL  required  where signups are sent; comma-separate for several
//   LEAD_FROM_EMAIL    optional  sender on a domain verified in Resend
//
// This notifies you; it does not send the person a confirmation email.

const DEFAULT_FROM = "Discovery Ladder <onboarding@resend.dev>";

const waitlistSchema = z.object({
  email: z.string().trim().email().max(320),
  // Honeypot: real visitors leave this empty.
  website: z.string().max(0).optional().default(""),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator(waitlistSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const to = (process.env.LEAD_NOTIFY_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!apiKey || to.length === 0) {
      console.warn("[waitlist] RESEND_API_KEY or LEAD_NOTIFY_EMAIL missing; signup not emailed:", data.email);
      // Locally, let the form succeed so the page can be previewed. In production, fail
      // loudly so a missing setting is noticed instead of silently losing signups.
      if (process.env.NODE_ENV === "production") {
        throw new Error("Could not add you to the waitlist right now. Please try again later.");
      }
      return { ok: true };
    }

    const submittedAt = new Date().toISOString();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: normalizeFrom(process.env.LEAD_FROM_EMAIL, DEFAULT_FROM),
        to,
        reply_to: data.email,
        subject: `Waitlist: ${data.email}`,
        text: `New waitlist signup from the Discovery Ladder homepage.\n\nEmail: ${data.email}\nSubmitted: ${submittedAt}`,
      }),
    });

    if (!res.ok) {
      console.error("[waitlist] Resend error", res.status, await res.text().catch(() => ""));
      throw new Error("Could not add you to the waitlist. Please try again.");
    }
    return { ok: true };
  });
