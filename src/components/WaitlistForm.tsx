import { useState, type FormEvent } from "react";
import { joinWaitlist } from "@/lib/api/waitlist.functions";
import { EMAIL_HINT, friendlyError, isValidEmail } from "@/lib/form-helpers";

/** Waitlist signup (email capture) for the purple CTA section. */
export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!isValidEmail(String(form.get("email") ?? ""))) {
      setStatus("error");
      setError(EMAIL_HINT);
      return;
    }
    setStatus("sending");
    try {
      await joinWaitlist({
        data: {
          email: String(form.get("email") ?? ""),
          website: String(form.get("website") ?? ""),
        },
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(friendlyError(err));
    }
  };

  if (status === "sent") {
    return (
      <div className="w-full max-w-md mx-auto self-center text-center text-white" role="status">
        <p className="font-display text-2xl">You're on the waitlist.</p>
        <p className="mt-1 text-sm opacity-80">We'll email you as soon as it opens.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@startup.com"
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby="waitlist-email-note"
          onChange={() => status === "error" && setStatus("idle")}
          className="flex-1 min-w-0 rounded-sm bg-white px-4 py-3 text-[15px] text-ink placeholder:text-[#8a8a8a] outline-none focus:ring-2 focus:ring-white/60"
        />
        {/* Honeypot: hidden from people, filled in by bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-sm bg-white px-5 py-3 text-[15px] font-medium transition hover:bg-white/90 disabled:opacity-70"
          style={{ color: "var(--violet)" }}
        >
          {status === "sending" ? "Joining…" : "Join the waitlist →"}
        </button>
      </div>
      <p
        id="waitlist-email-note"
        className={`mt-3 text-xs ${status === "error" ? "font-medium text-white" : "text-white/70"}`}
        aria-live="polite"
      >
        {status === "error" ? error : "We'll only email you about access."}
      </p>
    </form>
  );
}
