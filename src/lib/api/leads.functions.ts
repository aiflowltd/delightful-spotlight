import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Lead capture for the /for-programs page.
//
// Each submission is POSTed as JSON to LEAD_WEBHOOK_URL (an n8n, Zapier, Make,
// Slack or Google Apps Script webhook). Set it in the hosting provider's
// environment variables. Without it, leads are only logged to the server
// console — fine for local previews, not for production.

const leadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  organization: z.string().trim().min(1).max(200),
  role: z.string().trim().max(200).optional().default(""),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadSchema)
  .handler(async ({ data }) => {
    const lead = {
      name: data.name,
      email: data.email,
      organization: data.organization,
      role: data.role,
      source: "for-programs",
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("[lead] LEAD_WEBHOOK_URL is not set; lead not forwarded:", lead);
      return { ok: true };
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error("[lead] webhook responded", res.status);
      throw new Error("Could not save your details. Please try again.");
    }
    return { ok: true };
  });
