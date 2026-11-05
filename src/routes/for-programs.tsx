import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import { submitLead } from "@/lib/api/leads.functions";

export const Route = createFileRoute("/for-programs")({
  head: () => ({
    meta: [
      { title: "For programs — The Discovery Ladder" },
      {
        name: "description",
        content:
          "Cohort-level customer discovery for accelerators and university programs: verified interviews, early signals on struggling teams, and faster application review.",
      },
      { property: "og:title", content: "The Discovery Ladder for programs" },
      {
        property: "og:description",
        content:
          "See every team's discovery, not just their pitch. Built for program managers, accelerator leads and cohort managers.",
      },
      { property: "og:type", content: "website" },
      // Shared by direct link only; kept out of search results.
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: ForProgramsPage,
});

// ─────────────────────────────────────────────────────────────────────────────
// EDIT CONTENT HERE
// ─────────────────────────────────────────────────────────────────────────────

// Where "Request a demo" goes. TODO: replace with a booking link or mailto.
const DEMO_URL = "https://www.linkedin.com/in/darrenyeenyc";

const problems = [
  {
    title: "Too much to read",
    body: "Twenty teams logging interviews every week adds up to hundreds of conversations. Nobody on a program team can read them all.",
  },
  {
    title: "Updates are narration",
    body: "Weekly check-ins tell you how founders feel about their progress. They rarely tell you what customers actually said or did.",
  },
  {
    title: "You find out too late",
    body: "The team that has been pitching instead of listening for six weeks usually surfaces at demo day — when it's too late to help.",
  },
];

const valueProps = [
  {
    title: "A weekly read on your cohort",
    body: "Every week, one digest: how the cohort is performing, who moved up the Ladder, and what changed since last week.",
  },
  {
    title: "Signal, not volume",
    body: "Every interview is graded on the same rubric, so hundreds of conversations become a handful of numbers you can trust.",
  },
  {
    title: "Know where to step in",
    body: "Struggling teams are flagged early, and strong teams surface — so coaching hours and intros go where they matter.",
  },
  {
    title: "Faster application review",
    body: "Shortlist your next intake on graded discovery evidence instead of reading every essay from scratch.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Teams log their interviews",
    body: "Founders capture each customer conversation in the Discovery Records Manager — quotes and behavior, not summaries.",
  },
  {
    step: "02",
    title: "Every interview is graded",
    body: "Each one gets a Pain Scale score for how much pain the evidence shows, and a Signal Quality score for whether to believe it.",
  },
  {
    step: "03",
    title: "You get the weekly digest",
    body: "Cohort performance, teams that need attention, breakthroughs and patterns across teams — in your inbox every week.",
  },
];

const fullOverview = [
  {
    title: "A cohort report, not a pile of updates",
    body: "Interviews per team, how many reach Hair on Fire, and how trustworthy that evidence is — in one view you can bring to a program review.",
  },
  {
    title: "Interview hygiene, flagged automatically",
    body: "See which teams are pitching instead of listening, or collecting polite enthusiasm instead of past behavior — before it costs them a quarter.",
  },
  {
    title: "Coaching that starts from evidence",
    body: "Coaches open each session with the team's scored interviews, so the conversation is about what customers did, not what founders hope.",
  },
  {
    title: "Application review with real signal",
    body: "Applicants to your next program bring graded discovery evidence. You shortlist on who has found real pain — not who writes the best essay.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const UNLOCK_KEY = "dl-for-programs-unlocked";

function readUnlocked() {
  try {
    return window.localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

function saveUnlocked() {
  try {
    window.localStorage.setItem(UNLOCK_KEY, "1");
  } catch {
    // Storage unavailable (private mode, blocked): unlock for this visit only.
  }
}

/** Illustrative weekly digest. Not real data. */
function DigestPreview() {
  const stats = [
    { value: "142", label: "interviews logged", note: "+18% vs last week" },
    { value: "7 / 20", label: "teams with Hair on Fire evidence", note: "+2 this week" },
    { value: "3", label: "teams flagged", note: "need a coach this week" },
  ];
  const items = [
    {
      tag: "Needs attention",
      color: "var(--red)",
      text: "Team B — 4 interviews this week, all flagged for pitching instead of listening.",
    },
    {
      tag: "Breakthrough",
      color: "var(--green)",
      text: "Team D — first customer committed to a paid pilot. Ready for Level 3.",
    },
    {
      tag: "Pattern",
      color: "var(--violet)",
      text: "5 teams are hearing the same objection: budget sits with IT, not the user.",
    },
  ];
  return (
    <div
      className="rounded-sm border bg-background shadow-sm overflow-hidden"
      style={{ borderColor: "var(--rule)" }}
    >
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="font-display text-lg">Cohort digest · Week 6</div>
        <div className="text-xs text-muted-foreground">Monday, 8:00</div>
      </div>
      <div className="grid sm:grid-cols-3 gap-px" style={{ background: "var(--rule)" }}>
        {stats.map((st) => (
          <div key={st.label} className="bg-background px-6 py-5">
            <div className="font-display text-3xl" style={{ color: "var(--violet)" }}>
              {st.value}
            </div>
            <div className="mt-1 text-sm text-ink">{st.label}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{st.note}</div>
          </div>
        ))}
      </div>
      <ul className="border-t divide-y" style={{ borderColor: "var(--rule)" }}>
        {items.map((it) => (
          <li key={it.tag} className="flex gap-4 px-6 py-4" style={{ borderColor: "var(--rule)" }}>
            <span
              className="mt-0.5 shrink-0 w-32 text-sm font-medium"
              style={{ color: it.color }}
            >
              {it.tag}
            </span>
            <span className="text-sm leading-relaxed text-ink">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Illustrative cohort table shown blurred behind the form. Not real data. */
function CohortPreview() {
  const rows = [
    ["Team A", "L3", "41", "9", "Trusted"],
    ["Team B", "L1", "12", "0", "Weak"],
    ["Team C", "L2", "27", "5", "Solid"],
    ["Team D", "L2", "33", "7", "Solid"],
    ["Team E", "L1", "8", "1", "Unusable"],
  ];
  return (
    <div className="border rounded-sm bg-background" style={{ borderColor: "var(--rule)" }}>
      <div
        className="grid grid-cols-5 gap-4 px-6 py-4 text-xs uppercase tracking-[0.14em] text-muted-foreground border-b"
        style={{ borderColor: "var(--rule)" }}
      >
        <span>Team</span>
        <span>Level</span>
        <span>Interviews</span>
        <span>Hair on Fire</span>
        <span>Signal</span>
      </div>
      {rows.map((r) => (
        <div
          key={r[0]}
          className="grid grid-cols-5 gap-4 px-6 py-4 text-sm border-b last:border-b-0"
          style={{ borderColor: "var(--rule)" }}
        >
          {r.map((cell, i) => (
            <span key={i} className={i === 0 ? "font-medium" : "text-muted-foreground"}>
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function LeadForm({ onUnlocked }: { onUnlocked: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      await submitLead({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          organization: String(form.get("organization") ?? ""),
          role: String(form.get("role") ?? ""),
          website: String(form.get("website") ?? ""),
        },
      });
      saveUnlocked();
      onUnlocked();
    } catch (err) {
      setStatus("error");
      // Only surface short, human-written messages; never raw server output.
      const message = err instanceof Error ? err.message : "";
      setError(
        message && message.length < 160 && !message.includes("<")
          ? message
          : "Something went wrong. Please try again.",
      );
    }
  }

  const field =
    "w-full rounded-sm border bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--violet)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background border rounded-sm p-6 sm:p-8 shadow-sm max-w-md w-full"
      style={{ borderColor: "var(--rule)" }}
    >
      <h3 className="font-display text-2xl leading-snug">Get the full overview</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        How the cohort view works, what your coaches see, and how it fits application review.
      </p>
      <div className="mt-6 space-y-3">
        <input name="name" required placeholder="Name" autoComplete="name" className={field} style={{ borderColor: "var(--rule)" }} />
        <input name="email" type="email" required placeholder="Work email" autoComplete="email" className={field} style={{ borderColor: "var(--rule)" }} />
        <input name="organization" required placeholder="Program or institution" autoComplete="organization" className={field} style={{ borderColor: "var(--rule)" }} />
        <input name="role" placeholder="Your role (optional)" autoComplete="organization-title" className={field} style={{ borderColor: "var(--rule)" }} />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full px-5 py-3 rounded-sm text-white text-sm font-medium disabled:opacity-60"
        style={{ background: "var(--violet)" }}
      >
        {status === "sending" ? "Sending…" : "Show me the full overview"}
      </button>
      {status === "error" ? (
        <p className="mt-3 text-sm" style={{ color: "var(--red)" }} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function ForProgramsPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(readUnlocked());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav cta={{ label: "Request a demo", href: DEMO_URL, external: true }} />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16">
          <p className="text-sm text-muted-foreground">
            For program managers, accelerator leads and cohort managers
          </p>
          <h1 className="mt-4 font-display text-[2.4rem] sm:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            Hundreds of founder interviews. One weekly read on your cohort.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Your teams generate more customer conversations than anyone can read. The Discovery
            Ladder grades every one and sends you a weekly digest: how the cohort is performing,
            which teams are stuck, and where to step in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 rounded-sm text-white text-sm font-medium"
              style={{ background: "var(--violet)" }}
            >
              Request a demo
            </a>
            <a
              href="#overview"
              className="inline-flex items-center px-5 py-3 rounded-sm border text-sm font-medium"
              style={{ borderColor: "var(--rule)" }}
            >
              Get the full overview
            </a>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight max-w-3xl">
            Running a cohort means drowning in noise.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px" style={{ background: "var(--rule)" }}>
            {problems.map((pr) => (
              <article key={pr.title} className="bg-background p-6">
                <h3 className="font-display text-xl">{pr.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {pr.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The digest */}
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
              Your cohort, in one email a week.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              No dashboards to check, no transcripts to read. Every Monday you get the numbers
              that matter, the teams that need you, and the patterns no single team can see.
            </p>
          </div>
          <div>
            <DigestPreview />
            <p className="mt-3 text-xs text-muted-foreground">Illustrative digest.</p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--rule)" }}>
            {valueProps.map((v) => (
              <article key={v.title} className="bg-background p-6">
                <h3 className="font-display text-xl leading-snug">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight max-w-3xl">
            How it works for a cohort.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px" style={{ background: "var(--rule)" }}>
            {howItWorks.map((s) => (
              <article key={s.step} className="bg-background p-6">
                <div className="font-display text-sm" style={{ color: "var(--violet)" }}>
                  {s.step}
                </div>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gated: full overview */}
      <section
        id="overview"
        className="border-b"
        style={{ borderColor: "var(--rule)", background: "var(--violet-tint)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          {unlocked ? (
            <>
              <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight max-w-3xl">
                What your program gets.
              </h2>
              <div className="mt-10 grid md:grid-cols-2 gap-px" style={{ background: "var(--rule)" }}>
                {fullOverview.map((item) => (
                  <article key={item.title} className="bg-background p-8">
                    <h3 className="font-display text-2xl leading-snug">{item.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-ink">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-10">
                <CohortPreview />
                <p className="mt-3 text-xs text-muted-foreground">Illustrative cohort view.</p>
              </div>
            </>
          ) : (
            <div className="relative">
              <div className="pointer-events-none select-none blur-[6px] opacity-70" aria-hidden="true">
                <CohortPreview />
                <div className="mt-px grid md:grid-cols-2 gap-px" style={{ background: "var(--rule)" }}>
                  {fullOverview.slice(0, 2).map((item) => (
                    <div key={item.title} className="bg-background p-8">
                      <div className="font-display text-2xl">{item.title}</div>
                      <p className="mt-3 text-[0.98rem]">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 grid place-items-center p-4">
                <LeadForm onUnlocked={() => setUnlocked(true)} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Demo CTA */}
      <section style={{ background: "var(--violet)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 text-white">
          <h2
            className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-tight max-w-2xl"
            style={{ color: "white" }}
          >
            Running a cohort this term?
          </h2>
          <p className="mt-5 max-w-xl text-lg opacity-85">
            We'll walk you through the cohort view with your program's structure in mind.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center px-5 py-3 rounded-sm font-medium text-sm"
            style={{ background: "var(--teal)", color: "#0a2229" }}
          >
            Request a demo →
          </a>
        </div>
      </section>

      <footer>
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} The Discovery Ladder. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <span className="hidden sm:block h-4 w-px" style={{ background: "var(--rule)" }} />
            <SocialLinks />
          </div>
        </div>
      </footer>
    </div>
  );
}
