<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Travel-based Next.js 16 landing page. README.md is stock create-next-app boilerplate — do not trust it (page paths below are correct, the README's are not).

## Session log (read and append every session)

`agent-logs/` records what previous agent sessions did and why. At the start of a session, read the most recent logs there for context on prior changes, decisions, and pending follow-ups. After finishing any work, append a new entry meeting the `agent-logs/_README.md`. One file per session, named `YYYY-MM-DD-short-topic.md` — never overwrite or delete old entries.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npx tsc --noEmit` — typecheck (no package script; run this instead of a full build for verification)
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + TS)
- `npm run build`
- No test framework is configured. Do not invent one or fabricate test commands.

## Next.js config quirks (`next.config.ts`)

All three flags differ from stock create-next-app defaults:

- `cacheComponents: true` + `partialPrefetching: true` — new caching model. See `node_modules/next/dist/docs/` (Caching/Revalidating guides): data fetching uses `use cache` + `<Suspense>` instead of legacy route segment config. Notably, the `runtime` segment config (e.g. `runtime = 'edge'`) is unsupported under cacheComponents.
- `reactCompiler: true` (babel-plugin-react-compiler) — components are auto-memoized. Do not add `useMemo`/`useCallback`/`React.memo` unless profiling shows a real problem.
- Tailwind loads through a Turbopack rule in `next.config.ts`, not PostCSS. Do not "fix" this to a `postcss.config`.

## Stack conventions

- Tailwind CSS v4, CSS-first: there is no `tailwind.config.js`. Theme tokens and design variables live in `src/app/globals.css` (`@theme inline`). Edit colors/fonts there, not in a config file.
- shadcn/ui pinned to the `base-nova` style (`components.json`): the primitives are **Base UI (`@base-ui/react`), not Radix** — prop APIs in `src/components/ui/*` follow Base UI, and some components import from `@shadcn/react/*`. Add new components with `npx shadcn add <name>`; aliases are `@/components/ui`, `@/hooks`, `@/lib`.
- `cn` helper: call sites should use `@/lib/utils`, which re-exports the `cn` package.
- Before hand-rolling interactive primitives, check `src/components/ui/` — the base-nova components export more hooks/functions than their default JSX shows (e.g. `carousel.tsx` also exports `useCarousel()` so arrows can be placed anywhere, not just its built-in side arrows).
- Path alias: `@/*` → `src/*`.
- App font is **Josefin Sans** via `next/font` in `src/app/layout.tsx` — a marketing-site body font choice, not the default Geist.
- Image assets live in `public/images/` (banner, CTA, destination photos under `public/images/destinations/`).

## Layout of the code

- App code is deliberately sparse: `src/app/page.tsx` is intentionally an empty shell and `layout.tsx`/`globals.css` carry all the theming. The large `src/components/ui/` directory is the full pre-installed shadcn/base-nova library, not feature work — treat its files as vendor-like, existing utilities to build the landing page from.
