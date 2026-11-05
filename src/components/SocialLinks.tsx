const LINKEDIN_URL = "https://www.linkedin.com/in/darrenyeenyc";
const SUBSTACK_URL = "https://darrenyee.substack.com/";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Darren Yee on LinkedIn"
        title="LinkedIn"
        className="hover:text-foreground transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      </a>
      <a
        href={SUBSTACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Darren Yee on Substack"
        title="Substack"
        className="hover:text-foreground transition-colors"
      >
        <svg width="16" height="18" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
          <path d="M0 0h448v62.8H0V0Zm0 229.2h448V512L224 384.3 0 512V229.2ZM0 114.6h448v62.8H0v-62.8Z" />
        </svg>
      </a>
    </div>
  );
}
