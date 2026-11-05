import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import { HeroLadder } from "@/components/HeroLadder";
import { CanonShelf } from "@/components/CanonShelf";
import { DrmCards } from "@/components/DrmCards";
import { HardPartDiagram } from "@/components/HardPartDiagram";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ScrollLadder } from "@/components/ScrollLadder";

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
          <h1 className="font-display font-semibold text-[2.6rem] sm:text-[3.6rem] lg:text-[4rem] leading-[1] tracking-[-0.04em] [text-wrap:balance]">
            The customer discovery framework for the{" "}
            <span className="whitespace-nowrap">age of AI.</span>
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
        <SectionHeader title={<>The hard part of startups has moved.</>} />
        <div className="mt-12 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div className="prose-editorial max-w-xl">
            <p>
              Building a working prototype now takes a weekend. The deterrent is gone.
              Founders skip discovery, ship to nobody, get a few likes, and call it
              iteration. The cost of being wrong has collapsed, and so has the discipline
              that used to come with the cost.
            </p>
            <p>
              The hard part used to live between insight and build. Now it lives between
              discovery and insight. The bottleneck is no longer execution. It's whether
              the inputs to your judgment are real.
            </p>
          </div>
          <HardPartDiagram />
        </div>
      </div>
    </section>
  );
}

function HappyEarsSection() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
        <h2 className="font-display font-semibold text-[2.75rem] sm:text-[4rem] leading-[0.95] tracking-[-0.04em] [text-wrap:balance]">
          Happy ears waste years.
        </h2>
        <div className="prose-editorial max-w-xl lg:pt-2">
          <p>
            You did the interviews. People said they’d use it. You felt the momentum and you
            built. Months later the product is live and the same people who were excited
            aren’t opening it, and you can’t tell what went wrong.
          </p>
          <p>
            Nobody lied to you. They were being nice, and you were hoping, and it’s nearly
            impossible to tell those two apart in the moment.
          </p>
          <p className="font-medium">
            And that’s the cost of discovery: not the time you spend talking to customers,
            but the year you spend building on what you thought you heard.
          </p>
        </div>
      </div>
    </section>
  );
}

function FrameworkSection() {
  return (
    <section id="framework" className="border-b overflow-x-clip" style={{ borderColor: "var(--rule)", background: "#F5F4F8" }}>
      <ScrollLadder
        header={
          <>
            <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
              A ladder, not a checklist.
            </h2>
            <p className="mt-2 font-display text-xl sm:text-2xl leading-snug text-ink">
              The shortest roadmap to validating your business.
            </p>
            <div className="mt-4 max-w-3xl space-y-3 text-base sm:text-[17px] text-muted-foreground leading-relaxed">
              <p>
                Each level tests a riskier assumption than the last, in the order that removes
                risk fastest. You move up to the next level once you have enough evidence to
                earn it.
              </p>
              <p>
                As you climb, verified evidence gets logged in your{" "}
                <a
                  href="#drm"
                  className="underline decoration-[var(--rule)] underline-offset-4 hover:text-ink"
                >
                  DRM
                </a>
                , so your AI tools build on what customers actually said and did. Scroll to
                climb.
              </p>
            </div>
          </>
        }
      />
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

          <h2 className="font-display text-[2.5rem] sm:text-[3.25rem] leading-[1.02] tracking-[-0.03em]">
            Every company has a CRM. Every startup needs a DRM.
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
            The Discovery Records Manager is a ledger of evidence that grows with your business. Two rules: quotes, not summaries,
            and behavior, not interpretation. Without it, every level claim is founder
            narration.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 border-2" style={{ borderColor: "var(--ink)" }}>
            {[
              ["Tracks", "Evidence", "Verbatim quotes, observed behavior, pain scores."],
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

function Origin() {
  return (
    <section id="origin" className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          title={<>Built on the canon, delivered just in time.</>}
        />
        <div className="mt-14">
          <CanonShelf
            caption={
              <div>
                <ul className="space-y-3.5">
                  {[
                    ["L3", "Value", "Constable & Rimalovski, Blank & Dorf, Ries, Osterwalder", "var(--teal)", "var(--ink)"],
                    ["L2", "Jobs", "Christensen", "var(--amber)", "var(--ink)"],
                    ["L1", "Problem", "Blank, Fitzpatrick, Constable & Rimalovski", "var(--red)", "white"],
                  ].map(([level, name, sources, bg, fg]) => (
                    <li key={level} className="flex items-baseline gap-3">
                      <span
                        className="inline-grid h-6 min-w-7 shrink-0 place-items-center px-1.5 font-mono text-xs font-semibold translate-y-[-1px]"
                        style={{ background: bg, color: fg }}
                      >
                        {level}
                      </span>
                      <span className="text-base sm:text-lg leading-snug">
                        <span className="font-display font-medium text-ink">{name}</span>
                        <span className="text-muted-foreground">: {sources}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-base sm:text-lg text-muted-foreground">
                  The ladder puts them in sequence.
                </p>
              </div>
            }
          />
        </div>
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
              Be first to try the Discovery Ladder and the DRM. Join the waitlist and
              we'll let you know as soon as it opens.
            </p>
          </div>
          <WaitlistForm />
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
          <Link to="/about" className="hover:text-foreground">About</Link>
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
      <HappyEarsSection />
      <FrameworkSection />
      <StructuralIdeas />
      <DRMSection />
      <Origin />
      <CTASection />
      <Footer />
    </div>
  );
}
