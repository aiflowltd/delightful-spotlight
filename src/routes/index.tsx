import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import { HeroLadder } from "@/components/HeroLadder";
import { CanonShelf } from "@/components/CanonShelf";
import { DrmCards } from "@/components/DrmCards";
import { ScrollLadder } from "@/components/ScrollLadder";
import { HardPartDiagram } from "@/components/HardPartDiagram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Discovery Ladder — Customer discovery for the age of AI" },
      {
        name: "description",
        content:
          "A four-level customer discovery framework that pairs every stage of evidence with a build artifact. Built at the NYU Entrepreneurial Institute.",
      },
      { property: "og:title", content: "The Discovery Ladder" },
      {
        property: "og:description",
        content:
          "When building got cheap, judgment got hard. The Discovery Ladder is how founders rebuild it.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

function Hero() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center">
        <div>
          <h1 className="font-display font-semibold text-[3.5rem] sm:text-[4.75rem] lg:text-[5.25rem] leading-[0.92] tracking-[-0.05em]">
            Happy ears
            <br />
            waste{" "}
            <span className="relative inline-block">
              years.
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-3 sm:-bottom-4 h-[5px] sm:h-[6px]"
                style={{ background: "var(--violet)" }}
              />
              <span
                aria-hidden
                className="absolute left-0 -bottom-4 sm:-bottom-5 h-3.5 sm:h-4 w-[2px] sm:w-[3px]"
                style={{ background: "var(--ink)" }}
              />
              <span
                aria-hidden
                className="absolute right-0 -bottom-4 sm:-bottom-5 h-3.5 sm:h-4 w-[2px] sm:w-[3px]"
                style={{ background: "var(--ink)" }}
              />
            </span>
          </h1>

          <p className="mt-10 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
            Building is cheap now. The expensive mistake is spending a year on something
            nobody wants because you heard what you wanted to hear.{" "}
            <span className="font-medium text-ink">
              The Discovery Ladder gives discovery a sequence:
            </span>{" "}
            four levels, each testing a riskier assumption, each shipping a named artifact.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#get"
              className="inline-flex items-center px-5 py-3 text-white text-base font-medium transition-opacity hover:opacity-90"
              style={{ background: "var(--violet)" }}
            >
              Get the framework →
            </a>
            <a
              href="#framework"
              className="inline-flex items-center px-5 py-2.5 border-2 text-base font-medium text-ink transition-colors hover:bg-[var(--violet-tint)]"
              style={{ borderColor: "var(--ink)" }}
            >
              Climb it ↓
            </a>
          </div>

          <div className="mt-8 font-mono text-xs text-muted-foreground">
            By Darren Yee · NYU Entrepreneurial Institute
          </div>
        </div>

        <div>
          <HeroLadder />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  title,
}: {
  title: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          title={<>The hard part of startups has moved.</>}
        />
        <div className="mt-12 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-start">
          <div className="prose-editorial max-w-xl">
            <p>
              The customer discovery canon — Blank, Fitzpatrick, Constable, Christensen,
              Torres — was built when building was expensive. Discovery was insurance
              against burning six months on the wrong code. Talk to customers, the
              canon said, <em>before</em> you build.
            </p>
            <p>AI broke that deal.</p>
            <p>
              Building a working prototype now takes a weekend. The deterrent is gone.
              Founders skip discovery, ship to nobody, get a few likes, and call it
              iteration. The cost of being wrong has collapsed — and so has the
              discipline that used to come with the cost.
            </p>
            <p>
              The hard part used to live between insight and build. Now it lives between
              discovery and insight. The bottleneck is no longer execution. It's whether
              the inputs to your judgment are real.
            </p>
          </div>
          <div className="lg:pt-4">
            <HardPartDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function FrameworkSection() {
  return (
    <section id="framework" className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          title={<>A ladder, not a checklist.</>}
        />
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Four levels, anchored by a foundational Level 0. Each level has a discovery
          objective and a corresponding ship artifact. Each level earns the right to
          ship the next.
        </p>

        <div className="mt-12">
          <ScrollLadder />
        </div>
      </div>
    </section>
  );
}

function StructuralIdeas() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          title={<>Two things the Discovery Ladder does differently.</>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <div
            className="rounded-sm p-8"
            style={{ background: "var(--violet-tint)" }}
          >
            <div className="font-display text-5xl" style={{ color: "var(--violet)" }}>
              01
            </div>
            <h3 className="mt-4 font-display text-2xl">
              Discovery and building are the same activity at different fidelities.
            </h3>
            <p className="mt-4 text-ink leading-relaxed">
              Every level on the Ladder produces a build artifact. The ship side is on
              the framework, not separate from it. Founders don't choose between doing
              discovery and making progress — discovery <em>is</em> progress, and the
              artifact is the evidence.
            </p>
          </div>
          <div
            className="rounded-sm p-8 border"
            style={{ borderColor: "var(--rule)" }}
          >
            <div className="font-display text-5xl" style={{ color: "var(--violet)" }}>
              02
            </div>
            <h3 className="mt-4 font-display text-2xl">
              The Ladder is additive, not just vertical.
            </h3>
            <p className="mt-4 text-ink leading-relaxed">
              L2 doesn't replace L1. L3 doesn't replace L2. Every customer conversation
              at L3 opens with a reconfirmation of L1 and the top job from L2. Founders
              carry earlier levels forward as the substrate of every subsequent
              conversation. Levels stack; they don't expire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DRMSection() {
  return (
    <section id="drm" className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24 grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs sm:text-[0.8rem] text-ink">
            <span className="px-1.5 py-0.5 font-medium text-white" style={{ background: "var(--violet)" }}>
              DRM
            </span>
            Discovery Records Manager
          </div>

          <h2 className="mt-6 font-display text-[2.5rem] sm:text-[3.25rem] leading-[1.02] tracking-[-0.03em]">
            Every company has a CRM. Every startup needs a DRM.
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
            The canonical ledger of what you've learned. Two rules: quotes, not summaries,
            and behavior, not interpretation. Without it, every level claim is founder
            narration.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 border-2" style={{ borderColor: "var(--ink)" }}>
            {[
              ["Holds", "Evidence", "Verbatim quotes, observed behavior, pain scores."],
              ["Helps", "AI", "Reads transcripts, applies the rubrics, surfaces candidates."],
              ["Decides", "You", "AI can tell you what you talked about. You decide what it means."],
            ].map(([kicker, title, body], i) => {
              const dark = i === 2;
              return (
                <div
                  key={title}
                  className={`p-5 ${i < 2 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
                  style={{
                    borderColor: "var(--rule)",
                    background: dark ? "var(--ink)" : undefined,
                  }}
                >
                  <div className={`font-mono text-xs ${dark ? "text-white/70" : "text-muted-foreground"}`}>
                    {kicker}
                  </div>
                  <div className={`mt-2 font-display text-2xl ${dark ? "text-white" : "text-ink"}`}>
                    {title}
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/80" : "text-muted-foreground"}`}>
                    {body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <DrmCards />
      </div>
    </section>
  );
}

function WhoFor() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
          Built for founders already in motion.
        </h2>
        <div className="mt-8 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="prose-editorial max-w-2xl">
            <p>The Discovery Ladder isn't a tutorial. It's a mirror.</p>
            <p>
              If you've already done customer discovery — talked to humans, run
              interviews, maybe even shipped something — and you're not sure whether
              what you've learned is enough to keep building, the Ladder is calibrated
              for you. It tells you which rung you're actually on, what evidence you're
              missing, and what you need before the next build.
            </p>
            <p>
              If you're stuck, the Ladder lets you descend — find the missing rung,
              fill the gap, and climb back up. Most teams don't need to start over.
              They need to find the level they skipped.
            </p>
          </div>

          <figure className="border-l-4 pl-6" style={{ borderColor: "var(--violet)" }}>
            <blockquote className="font-display text-2xl sm:text-3xl leading-snug text-ink">
              "Discovery and building are the same activity at different fidelities.
              Each level earns the right to ship the next."
            </blockquote>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              From the L3 methodology brief
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section id="origin" className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          title={<>Built on the canon, calibrated for the new bottleneck.</>}
        />
        <div className="mt-14">
          <CanonShelf />
        </div>
        <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Problem Discovery owes its DNA to Blank, Constable and Fitzpatrick; Jobs to
          Christensen; Value to Constable &amp; Rimalovski, Ries and Osterwalder. The
          ladder puts them in sequence.
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="get" style={{ background: "var(--violet)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24 text-white">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-end">
          <div>
            <h2
              className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight"
              style={{ color: "white" }}
            >
              A mirror for the discovery you're already doing.
            </h2>
            <p className="mt-5 max-w-xl text-lg opacity-85">
              Get Darren's essays on the framework — the four levels, the Pain Scale,
              and the DRM — in your inbox as they're published.
            </p>
          </div>
          {/* Opens Substack's signup page with the email pre-filled; the visitor confirms there. */}
          <form
            action="https://darrenyee.substack.com/subscribe"
            method="get"
            target="_blank"
            className="w-full max-w-md"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="subscribe-email" className="sr-only">
                Email address
              </label>
              <input
                id="subscribe-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@startup.com"
                className="flex-1 min-w-0 rounded-sm bg-white px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#8a8a8a] outline-none focus:ring-2 focus:ring-[var(--teal)]"
              />
              <button
                type="submit"
                className="rounded-sm px-5 py-3 text-sm font-medium transition hover:brightness-95"
                style={{ background: "var(--teal)", color: "#0a2229" }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-muted-foreground">
        <div>
          © {new Date().getFullYear()} The Discovery Ladder. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          <a href="#" className="hover:text-foreground">Methodology brief</a>
          <a href="#" className="hover:text-foreground">EI program</a>
          <a href="#" className="hover:text-foreground">Contact</a>
          <span className="hidden sm:block h-4 w-px" style={{ background: "var(--rule)" }} />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <ProblemSection />
      <FrameworkSection />
      <StructuralIdeas />
      <DRMSection />
      <WhoFor />
      <Origin />
      <CTASection />
      <Footer />
    </div>
  );
}
