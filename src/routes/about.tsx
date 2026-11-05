import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Discovery Ladder" },
      {
        name: "description",
        content:
          "Who built the Discovery Ladder, and why — Darren Yee at the NYU Entrepreneurial Institute.",
      },
      { property: "og:title", content: "About — The Discovery Ladder" },
      {
        property: "og:description",
        content:
          "The people and the thinking behind a customer discovery framework for the age of AI.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
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
  component: AboutPage,
});

type Person = {
  name: string;
  role: string;
  img?: string;
  bio: React.ReactNode;
};

const people: Person[] = [
  {
    name: "Darren Yee",
    role: "Creator · NYU Entrepreneurial Institute",
    img: "/darren-yee.jpg",
    bio: (
      <>
        Darren works with founders at the earliest, messiest stage — when an idea is still a hunch
        and the evidence is thin. The Discovery Ladder grew out of a recurring frustration: watching
        capable teams ship polished products to people who never asked for them. He built the
        framework to give founders a way to tell real customer signal from their own optimism.
      </>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INSTITUTE & PROGRAMS — placeholder content, replace the [bracketed] text.
// ─────────────────────────────────────────────────────────────────────────────

const institute = {
  heading: "Where the Ladder gets tested.",
  intro: [
    "[One paragraph on the NYU Entrepreneurial Institute: who it serves, what it does, how long it has been running.]",
    "[One paragraph on how the Discovery Ladder is used across the Institute's programs, and what you have seen it change for founders.]",
  ],
};

type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "[00]", label: "[teams through the programs]" },
  { value: "[00]", label: "[interviews logged in the DRM]" },
  { value: "[00]", label: "[cohorts run on the Ladder]" },
];

type Program = { name: string; stage: string; description: string };

const programs: Program[] = [
  {
    name: "Bootcamp",
    stage: "[Stage, e.g. idea → first interviews]",
    description: "[Two sentences: who it's for, how long it runs, where the Ladder comes in.]",
  },
  {
    name: "Startup Sprint",
    stage: "[Stage]",
    description: "[Two sentences: who it's for, how long it runs, where the Ladder comes in.]",
  },
  {
    name: "Summer Launchpad",
    stage: "[Stage]",
    description: "[Two sentences: who it's for, how long it runs, where the Ladder comes in.]",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <h1 className="font-display text-[2.4rem] sm:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            We built the tool we wished we'd had as founders.
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            The Discovery Ladder is a synthesis of the customer discovery canon, recalibrated for a
            moment when the hard part of startups has moved from building to knowing what's worth
            building.
          </p>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
              Judgment is the scarce resource now.
            </h2>
            <div className="prose-editorial mt-8 max-w-2xl">
              <p>
                The customer discovery canon was written when building was expensive. Discovery was
                insurance against burning months on the wrong code. AI broke that deal — a working
                prototype now takes a weekend, and the deterrent that used to enforce discipline is
                gone.
              </p>
              <p>
                We kept meeting founders who had shipped something real to nobody in particular,
                collected a few likes, and called it iteration. The Discovery Ladder is our answer:
                a framework that pairs every stage of customer evidence with a build artifact, so
                doing discovery and making progress are the same act.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
              {institute.heading}
            </h2>
            <div className="prose-editorial mt-8 max-w-2xl">
              {institute.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          <dl className="mt-12 grid sm:grid-cols-3 gap-px" style={{ background: "var(--rule)" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl" style={{ color: "var(--violet)" }}>
                  {stat.value}
                </dd>
                <dd className="mt-2 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-px grid md:grid-cols-3 gap-px" style={{ background: "var(--rule)" }}>
            {programs.map((program) => (
              <article key={program.name} className="bg-background p-6">
                <h3 className="font-display text-2xl">{program.name}</h3>
                <div className="mt-1 text-sm" style={{ color: "var(--violet)" }}>
                  {program.stage}
                </div>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
            Who's behind it.
          </h2>
          <div className="mt-12 grid max-w-3xl gap-px" style={{ background: "var(--rule)" }}>
            {people.map((p) => (
              <article key={p.name} className="bg-background p-8">
                <div className="flex items-center gap-4">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-16 w-16 rounded-sm object-cover"
                      style={{ background: "var(--violet-tint)" }}
                    />
                  ) : (
                    <div
                      className="h-16 w-16 rounded-sm grid place-items-center font-display text-lg"
                      style={{ background: "var(--violet-tint)", color: "var(--violet)" }}
                      aria-hidden="true"
                    >
                      {p.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {p.role}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[0.98rem] leading-relaxed text-ink">{p.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--violet)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <h2
            className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-tight max-w-2xl"
            style={{ color: "white" }}
          >
            Want to see the framework?
          </h2>
          <p className="mt-5 max-w-xl text-lg opacity-85">
            Start with the four levels and the ship artifacts on the home page.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center px-5 py-3 rounded-sm font-medium text-sm"
            style={{ background: "var(--teal)", color: "#0a2229" }}
          >
            Explore the Discovery Ladder →
          </Link>
        </div>
      </section>

      <footer>
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} The Discovery Ladder. All rights reserved.
          </div>
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
