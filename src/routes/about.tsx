import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Discovery Ladder" },
      {
        name: "description",
        content:
          "Who built the Discovery Ladder, and why — Darren Yee and Frank Rimalovski at the NYU Entrepreneurial Institute.",
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

function Nav() {
  return (
    <header className="border-b" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div
            className="h-7 w-7 rounded-sm grid place-items-center text-white font-display text-sm"
            style={{ background: "var(--violet)" }}
          >
            DL
          </div>
          <div className="leading-tight">
            <div className="font-display text-base">The Discovery Ladder</div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              NYU Entrepreneurial Institute
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Framework
          </Link>
          <Link to="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-foreground transition-colors">
            About
          </Link>
          <Link
            to="/"
            hash="get"
            className="px-3 py-1.5 rounded-sm text-white text-sm"
            style={{ background: "var(--violet)" }}
          >
            Get the framework
          </Link>
        </nav>
      </div>
    </header>
  );
}

type Person = {
  name: string;
  role: string;
  img?: string;
  bio: React.ReactNode;
};

const people: Person[] = [
  {
    name: "Darren Yee",
    role: "Co-creator · NYU Entrepreneurial Institute",
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
  {
    name: "Frank Rimalovski",
    role: "Co-creator · NYU Entrepreneurial Institute",
    bio: (
      <>
        Frank is co-author of <em>Talking to Humans</em> and a longtime practitioner of customer
        development. He has spent years teaching founders that the interview, not the demo, is where
        the learning happens. The Ladder is his attempt to make that discipline survive in a world
        where building has become almost free.
      </>
    ),
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="chip">
            <span className="chip-dot" /> About
          </div>
          <h1 className="mt-6 font-display text-[2.4rem] sm:text-5xl leading-[1.05] tracking-tight max-w-3xl">
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
            <div className="chip">
              <span className="chip-dot" /> Why it exists
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
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
          <div className="chip">
            <span className="chip-dot" /> The people
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-[2.5rem] leading-[1.1] tracking-tight">
            Who's behind it.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-px" style={{ background: "var(--rule)" }}>
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
            Built by <span className="text-ink font-medium">Darren Yee</span> and{" "}
            <span className="text-ink font-medium">Frank Rimalovski</span> at the NYU
            Entrepreneurial Institute.
          </div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
