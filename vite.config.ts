// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Vercel, force-enable Nitro with the Vercel preset and the Build Output API
// (.vercel/output) layout. The wrapper otherwise only runs Nitro in a Lovable
// sandbox and defaults to the cloudflare-module preset + dist/ output, which
// Vercel cannot serve (every route 404s). Off Vercel this stays undefined, so
// Lovable's own Cloudflare publish is unaffected.
const vercel = process.env.VERCEL
  ? {
      nitro: {
        preset: "vercel",
        output: {
          dir: ".vercel/output",
          serverDir: ".vercel/output/functions/__server.func",
          publicDir: ".vercel/output/static",
        },
      },
    }
  : {};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...vercel,
});
