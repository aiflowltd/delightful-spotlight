import { Link, useLocation } from "@tanstack/react-router";

// The one site header, shared by every page.
// Section links are plain anchors to "/#id": on the home page they just
// scroll, on other pages they load the home page at that section.

const sectionLinks = [{ href: "/#framework", label: "Framework" }];

const pageLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
] as const;

type Cta = { label: string; href: string; external?: boolean };

const DEFAULT_CTA: Cta = { label: "Get the framework", href: "/#get" };

export function SiteNav({ cta = DEFAULT_CTA }: { cta?: Cta }) {
  const { pathname } = useLocation();

  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md"
      style={{ borderColor: "var(--rule)" }}
    >
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
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {sectionLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={
                pathname === l.to
                  ? "text-foreground transition-colors"
                  : "hover:text-foreground transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
          <a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="px-3 py-1.5 rounded-sm text-white text-sm"
            style={{ background: "var(--violet)" }}
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
