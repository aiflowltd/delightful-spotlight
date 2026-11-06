import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import {
  discoveryLadderArticle as article,
  type ArticleBlock,
} from "@/content/discovery-ladder-article";

const SUBSTACK_URL = "https://darrenyee.substack.com/";

export const Route = createFileRoute("/blog/the-discovery-ladder")({
  head: () => ({
    meta: [
      { title: `${article.title} — ${article.subtitle}` },
      { name: "description", content: article.excerpt },
      { name: "author", content: article.author },
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.subtitle },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: article.isoDate },
    ],
    links: [
      // The essay also lives on Substack; point search engines at the original.
      { rel: "canonical", href: article.substackUrl },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: ArticlePage,
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const tierColors = ["var(--red)", "var(--amber)", "var(--violet)", "var(--teal)", "var(--rule)"];

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="font-display text-[1.75rem] sm:text-3xl leading-tight tracking-tight text-foreground !mt-14"
        >
          {block.text}
        </h2>
      );
    case "pullquote":
      return (
        <p
          className="font-display text-3xl sm:text-4xl leading-tight tracking-tight text-center !my-12"
          style={{ color: "var(--violet)" }}
        >
          {block.text}
        </p>
      );
    case "levels":
      return (
        <ol className="border-y divide-y" style={{ borderColor: "var(--rule)" }}>
          {block.items.map((item) => (
            <li
              key={item.label}
              className="py-4 grid sm:grid-cols-[13rem_1fr] gap-1 sm:gap-6"
              style={{ borderColor: "var(--rule)" }}
            >
              <span className="font-display text-lg text-foreground">{item.label}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ol>
      );
    case "dialogue":
      return (
        <div
          className="rounded-sm p-6 space-y-3 text-[1rem]"
          style={{ background: "var(--violet-tint)" }}
        >
          {block.lines.map((line, i) => (
            <p key={i}>
              <span className="font-medium text-foreground">{line.speaker}:</span> {line.text}
            </p>
          ))}
        </div>
      );
    case "tiers":
      return (
        <dl className="space-y-5">
          {block.items.map((item, i) => (
            <div key={item.name} className="pl-5 border-l-4" style={{ borderColor: tierColors[i] }}>
              <dt className="font-display text-lg text-foreground">{item.name}</dt>
              <dd className="mt-1">{item.text}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

function ArticlePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <article className="mx-auto max-w-[44rem] px-6 pt-12 pb-20">
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← All essays
        </Link>

        <header className="mt-8 pb-10 border-b" style={{ borderColor: "var(--rule)" }}>
          <h1 className="font-display text-[2.6rem] sm:text-6xl leading-[1.03] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{article.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{article.author}</span>
            <time dateTime={article.isoDate}>{article.date}</time>
            <span>{article.readingTime}</span>
          </div>
        </header>

        <div className="mt-10 space-y-6 text-[1.08rem] leading-[1.75] text-ink">
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <aside
          className="mt-16 rounded-sm p-8 sm:p-10 text-white"
          style={{ background: "var(--violet)" }}
        >
          <h2 className="font-display text-2xl sm:text-3xl leading-tight" style={{ color: "white" }}>
            Get the next essay in your inbox.
          </h2>
          <p className="mt-3 opacity-85">
            Darren publishes case studies and new pieces on the framework on Substack.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-3 rounded-sm font-medium text-sm"
              style={{ background: "var(--teal)", color: "#0a2229" }}
            >
              Subscribe on Substack
            </a>
            <a
              href={article.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4 opacity-85 hover:opacity-100"
            >
              Comment on this essay on Substack
            </a>
          </div>
        </aside>
      </article>

      <footer className="border-t" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-end text-sm text-muted-foreground">
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
