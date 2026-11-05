import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizeFrom } from "@/lib/form-helpers";

// Lead capture for the /for-programs "Request a demo" form.
//
// Each submission is emailed via Resend (https://resend.com). Environment
// variables (set them in Vercel → Project → Settings → Environment Variables):
//
//   RESEND_API_KEY     required  API key from resend.com/api-keys
//   LEAD_NOTIFY_EMAIL  required  where leads are sent; comma-separate for several
//   LEAD_FROM_EMAIL    optional  sender, e.g. "Discovery Ladder <leads@yourdomain.com>".
//                                Must be on a domain verified in Resend. Defaults to
//                                Resend's test sender, which only delivers to the
//                                email address that owns the Resend account.
//
// Replying to the notification email replies straight to the lead.

const DEFAULT_FROM = "Discovery Ladder <onboarding@resend.dev>";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  organization: z.string().trim().min(1).max(200),
  role: z.string().trim().max(200).optional().default(""),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

type Lead = Omit<z.infer<typeof leadSchema>, "website">;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderEmail(lead: Lead, submittedAt: string) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Program / institution", lead.organization],
    ["Role", lead.role || "—"],
    ["Submitted", submittedAt],
  ];
  const text = [
    "New demo request from the Discovery Ladder programs page.",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;color:#1a1a1a">
      <p>New demo request from the Discovery Ladder programs page.</p>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#666;padding-right:16px">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#666">Reply to this email to answer them directly.</p>
    </div>`;
  return { text, html };
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadSchema)
  .handler(async ({ data }) => {
    const lead: Lead = {
      name: data.name,
      email: data.email,
      organization: data.organization,
      role: data.role,
    };
    const submittedAt = new Date().toISOString();

    const apiKey = process.env.RESEND_API_KEY;
    const to = (process.env.LEAD_NOTIFY_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!apiKey || to.length === 0) {
      console.warn("[lead] RESEND_API_KEY or LEAD_NOTIFY_EMAIL missing; lead not emailed:", lead);
      // Locally, let the form succeed so the page can be previewed. In production,
      // fail loudly so a missing setting is noticed instead of silently losing leads.
      if (process.env.NODE_ENV === "production") {
        throw new Error("Could not send your request. Please try again later.");
      }
      return { ok: true };
    }

    const { text, html } = renderEmail(lead, submittedAt);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: normalizeFrom(process.env.LEAD_FROM_EMAIL, DEFAULT_FROM),
        to,
        reply_to: lead.email,
        subject: `Demo request: ${lead.name} (${lead.organization})`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[lead] Resend error", res.status, await res.text().catch(() => ""));
      throw new Error("Could not send your request. Please try again.");
    }
    return { ok: true };
  });
