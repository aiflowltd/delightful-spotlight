import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — The Discovery Ladder" },
      {
        name: "description",
        content:
          "Essays on customer discovery, founder judgment, and building in the age of AI — from the team behind the Discovery Ladder.",
      },
      { property: "og:title", content: "Blog — The Discovery Ladder" },
      {
        property: "og:description",
        content: "Essays on customer discovery, founder judgment, and building in the age of AI.",
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
  component: BlogPage,
});

// ─────────────────────────────────────────────────────────────────────────────
// EDIT THE FEATURED ARTICLE HERE
// ─────────────────────────────────────────────────────────────────────────────

const SUBSTACK_URL = "https://darrenyee.substack.com/";

const article = {
  title: "The Discovery Ladder",
  subtitle: "How to talk to customers in the age of AI",
  excerpt:
    "Building used to be the hard part. It isn't anymore. The expensive mistake has moved: it is no longer writing the wrong code, it is spending a year building something nobody wants because you heard what you wanted to hear.",
  url: "https://darrenyee.substack.com/p/the-discovery-ladder",
  author: "Darren Yee",
  date: "June 15, 2026",
  readingTime: "25 min read",
  levels: ["Problem Discovery", "Jobs Discovery", "Value Discovery", "GTM Discovery"],
};

function ArrowOut() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function FeaturedArticle() {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid md:grid-cols-[2fr_3fr] border rounded-sm overflow-hidden transition-colors hover:bg-[var(--violet-tint)]"
      style={{ borderColor: "var(--rule)" }}
    >
      <div
        className="p-8 sm:p-10 flex flex-col justify-center text-white"
        style={{ background: "var(--violet)" }}
      >
        <ol className="space-y-3">
          {[...article.levels].reverse().map((level, i) => {
            const n = article.levels.length - i;
            return (
              <li
                key={level}
                className="flex items-baseline gap-4 border-t first:border-t-0 first:pt-0 pt-3"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                <span className="font-display text-sm opacity-70">L{n}</span>
                <span className="font-display text-lg sm:text-xl">{level}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-8 sm:p-10 flex flex-col">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span>{article.date}</span>
          <span>{article.readingTime}</span>
        </div>

        <h2 className="mt-6 font-display text-3xl sm:text-[2.6rem] leading-[1.08] tracking-tight group-hover:text-[var(--violet)] transition-colors">
          {article.title}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">{article.subtitle}</p>

        <p className="mt-6 text-[1.02rem] leading-relaxed text-ink max-w-xl flex-1">
          {article.excerpt}
        </p>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">By {article.author}</span>
          <span
            className="font-medium inline-flex items-center gap-1.5"
            style={{ color: "var(--violet)" }}
          >
            Read on Substack <ArrowOut />
          </span>
        </div>
      </div>
    </a>
  );
}

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-14">
          <h1 className="font-display text-[2.4rem] sm:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            Notes from the new bottleneck.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Essays on customer discovery, founder judgment, and building in the age of AI. Published
            on Substack.
          </p>
          <div className="mt-10">
            <FeaturedArticle />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--violet)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <h2
            className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-tight max-w-2xl"
            style={{ color: "white" }}
          >
            Want every new essay in your inbox?
          </h2>
          <p className="mt-5 max-w-xl text-lg opacity-85">
            Subscribe on Substack to get new pieces on discovery and founder judgment as they're
            published.
          </p>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 px-5 py-3 rounded-sm font-medium text-sm"
            style={{ background: "var(--teal)", color: "#0a2229" }}
          >
            Subscribe on Substack <ArrowOut />
          </a>
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
            <Link to="/blog" className="hover:text-foreground">
              Blog
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
