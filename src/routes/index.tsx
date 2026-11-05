import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import { Ladder } from "@/components/Ladder";
import { LadderExplorer } from "@/components/LadderExplorer";
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
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

function Hero() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <div>
          <h1 className="font-display text-[2.6rem] sm:text-6xl leading-[1.02] tracking-tight">
            The customer discovery framework for the{" "}
            <span style={{ color: "var(--violet)" }}>age of AI</span>.
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground max-w-xl">
            A four-level framework that pairs every stage of customer evidence with a
            build artifact — so founders never have to choose between doing discovery
            and making progress.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#get"
              className="inline-flex items-center px-5 py-3 rounded-sm text-white text-sm font-medium"
              style={{ background: "var(--violet)" }}
            >
              Get the framework →
            </a>
            <a
              href="#sprint"
              className="inline-flex items-center px-5 py-3 rounded-sm border text-sm font-medium"
              style={{ borderColor: "var(--rule)" }}
            >
              Apply to the Startup Sprint
            </a>
          </div>
          <div className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            By Darren Yee · NYU Entrepreneurial Institute
          </div>
        </div>

        <div className="lg:pl-8">
          <Ladder />
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
          <LadderExplorer />
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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          title={
            <>
              Every modern company has a CRM. Every modern startup needs a{" "}
              <span style={{ color: "var(--violet)" }}>DRM</span>.
            </>
          }
        />

        <div className="mt-12 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
          <div className="prose-editorial max-w-xl">
            <p>
              The Discovery Ladder is only as auditable as the evidence behind it. The
              DRM is where that evidence lives. Verbatim quotes, not summaries.
              Behavior, not interpretation. Pain Scale classifications. Disqualification
              patterns. ICP tags.
            </p>
            <p>
              Without a DRM, level claims are founder narration. With one, they're
              evidence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px" style={{ background: "var(--rule)" }}>
            <div className="bg-background p-6">
              <div className="chip" style={{ color: "var(--teal)" }}>
                <span className="chip-dot" /> What goes in
              </div>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-ink">
                <li>· Verbatim customer quotes</li>
                <li>· Observed behaviors, not opinions</li>
                <li>· Pain Scale scoring per interview</li>
                <li>· ICP tags & disqualification notes</li>
                <li>· Source, date, channel of contact</li>
              </ul>
            </div>
            <div className="bg-background p-6">
              <div className="chip" style={{ color: "var(--violet)" }}>
                <span className="chip-dot" /> What comes out
              </div>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-ink">
                <li>· Defensible Level claims</li>
                <li>· A sharper ICP, week by week</li>
                <li>· Patterns instead of anecdotes</li>
                <li>· Evidence your investors can audit</li>
                <li>· A team memory that survives turnover</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoFor() {
  return (
    <section className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
            Built for founders already in motion.
          </h2>
          <div className="prose-editorial mt-8 max-w-2xl">
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
        </div>

        <figure
          className="mt-14 border-l-4 pl-6 max-w-3xl"
          style={{ borderColor: "var(--violet)" }}
        >
          <blockquote className="font-display text-2xl sm:text-3xl leading-snug text-ink">
            "Discovery and building are the same activity at different fidelities. Each
            level earns the right to ship the next."
          </blockquote>
          <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            From the L3 methodology brief
          </figcaption>
        </figure>
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
        <div className="mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-14">
          <div className="prose-editorial max-w-xl">
            <p>
              The Discovery Ladder is a synthesis, not an invention. L1 builds on{" "}
              <em>Talking to Humans</em> (Constable & Rimalovski) and{" "}
              <em>The Mom Test</em> (Fitzpatrick). L2 builds on Christensen's Jobs to
              Be Done and Torres's continuous discovery. L3 is the spine of{" "}
              <em>Testing with Humans</em> (Constable). L4 borrows from Blank's
              customer development.
            </p>
            <p>
              What's new is the structure — pairing each level with a build artifact,
              making the rungs additive, and calibrating the framework around AI-era
              founder judgment as the scarce resource.
            </p>
            <p>
              Built and taught at the <strong>NYU Entrepreneurial Institute</strong>,
              in active development with the Startup Sprint cohort.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["Talking to Humans", "Constable & Rimalovski"],
              ["The Mom Test", "Fitzpatrick"],
              ["Testing with Humans", "Constable"],
              ["Jobs to Be Done", "Christensen"],
              ["Continuous Discovery", "Torres"],
              ["Four Steps to the Epiphany", "Blank"],
            ].map(([t, a]) => (
              <li
                key={t}
                className="flex items-baseline justify-between border-b py-3"
                style={{ borderColor: "var(--rule)" }}
              >
                <span className="font-display text-lg">{t}</span>
                <span className="text-muted-foreground">{a}</span>
              </li>
            ))}
          </ul>
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
