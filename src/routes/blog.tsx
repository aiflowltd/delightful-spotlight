import { createFileRoute, Link } from "@tanstack/react-router";

type BlogSearch = { category?: string };

export const Route = createFileRoute("/blog")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    return typeof search.category === "string" && search.category
      ? { category: search.category }
      : {};
  },
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
// EDIT YOUR POSTS HERE
//
// SUBSTACK_URL is the home of your publication (the "Read more on Substack" CTA
// and the fallback for any post without its own `url` point here).
//
// Each post's `url` is the full link to that article on Substack. To add a new
// post, copy a block and paste the article's Substack URL. Newest first.
// ─────────────────────────────────────────────────────────────────────────────

const SUBSTACK_URL = "https://substack.com/"; // TODO: replace with your Substack publication URL

type Post = {
  title: string;
  excerpt: string;
  /** Full URL to the article on Substack. */
  url: string;
  /** Display date, e.g. "June 2026". */
  date: string;
  /** Optional short label, e.g. "Essay", "Field note". */
  tag?: string;
  /** Optional reading time, e.g. "6 min read". */
  readingTime?: string;
};

const posts: Post[] = [
  {
    title: "When building got cheap, judgment got expensive",
    excerpt:
      "AI collapsed the cost of being wrong — and with it, the discipline that cost used to enforce. A look at why customer discovery matters more now, not less.",
    url: SUBSTACK_URL,
    date: "June 2026",
    tag: "Essay",
    readingTime: "7 min read",
  },
  {
    title: "The rung you skipped",
    excerpt:
      "Most stuck founders don't need to start over. They need to find the level of evidence they jumped past — and climb back up from there.",
    url: SUBSTACK_URL,
    date: "May 2026",
    tag: "Field note",
    readingTime: "5 min read",
  },
  {
    title: "Every startup needs a DRM",
    excerpt:
      "Every modern company has a CRM. Discovery deserves the same rigor: verbatim quotes, observed behavior, and level claims your investors can audit.",
    url: SUBSTACK_URL,
    date: "April 2026",
    tag: "Essay",
    readingTime: "6 min read",
  },
  {
    title: "Running a Level 1 problem interview",
    excerpt:
      "A step-by-step playbook for the conversation that scores whether the pain is real — the questions to ask, the traps to avoid, and how to record it.",
    url: SUBSTACK_URL,
    date: "March 2026",
    tag: "Playbook",
    readingTime: "8 min read",
  },
];

// The set of categories shown in the filter bar, derived from the posts above.
// Add a `tag` to a post and it automatically appears here.
const ALL_CATEGORY = "All";
const categories = [
  ALL_CATEGORY,
  ...Array.from(new Set(posts.map((p) => p.tag).filter((t): t is string => Boolean(t)))),
];

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
          <Link to="/blog" className="text-foreground transition-colors">
            Blog
          </Link>
          <Link to="/about" className="hover:text-foreground transition-colors">
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

function FilterBar({ active, onSelect }: { active: string; onSelect: (category: string) => void }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filter posts by category"
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className="px-3.5 py-1.5 rounded-sm text-sm font-medium border transition-colors"
            style={
              isActive
                ? {
                    background: "var(--violet)",
                    color: "white",
                    borderColor: "var(--violet)",
                  }
                : { borderColor: "var(--rule)", color: "var(--muted-foreground)" }
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-background p-8 flex flex-col transition-colors hover:bg-[var(--violet-tint)]"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <span className="flex items-center gap-3">
          {post.tag ? (
            <span className="chip" style={{ color: "var(--violet)" }}>
              <span className="chip-dot" /> {post.tag}
            </span>
          ) : null}
        </span>
        <span>{post.date}</span>
      </div>

      <h2 className="mt-5 font-display text-2xl leading-snug group-hover:text-[var(--violet)] transition-colors">
        {post.title}
      </h2>

      <p className="mt-3 text-[0.98rem] leading-relaxed text-ink flex-1">{post.excerpt}</p>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span
          className="font-medium inline-flex items-center gap-1.5"
          style={{ color: "var(--violet)" }}
        >
          Read on Substack <ArrowOut />
        </span>
        {post.readingTime ? (
          <span className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
            {post.readingTime}
          </span>
        ) : null}
      </div>
    </a>
  );
}

function BlogPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();

  // Fall back to "All" if the URL has an unknown category.
  const activeCategory = category && categories.includes(category) ? category : ALL_CATEGORY;

  const visiblePosts =
    activeCategory === ALL_CATEGORY ? posts : posts.filter((p) => p.tag === activeCategory);

  const handleSelect = (next: string) => {
    navigate({
      search: next === ALL_CATEGORY ? {} : { category: next },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="chip">
            <span className="chip-dot" /> Blog
          </div>
          <h1 className="mt-6 font-display text-[2.4rem] sm:text-5xl leading-[1.05] tracking-tight max-w-3xl">
            Notes from the new bottleneck.
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Essays on customer discovery, founder judgment, and building in the age of AI. Published
            on Substack — previews below link straight to each piece.
          </p>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 px-5 py-3 rounded-sm text-white text-sm font-medium"
            style={{ background: "var(--violet)" }}
          >
            Subscribe on Substack <ArrowOut />
          </a>
        </div>
      </section>

      <section className="border-b" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <FilterBar active={activeCategory} onSelect={handleSelect} />
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
              {activeCategory !== ALL_CATEGORY ? ` in ${activeCategory}` : ""}
            </div>
          </div>

          {visiblePosts.length > 0 ? (
            <div
              className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: "var(--rule)" }}
            >
              {visiblePosts.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-muted-foreground">
              No posts in {activeCategory} yet — check back soon.
            </p>
          )}
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
            Built by <span className="text-ink font-medium">Darren Yee</span> and{" "}
            <span className="text-ink font-medium">Frank Rimalovski</span> at the NYU
            Entrepreneurial Institute.
          </div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/blog" className="hover:text-foreground">
              Blog
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
