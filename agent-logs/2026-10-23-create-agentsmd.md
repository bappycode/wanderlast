# 2026-10-23 — Created AGENTS.md and session log system

**Agent:** GLM-5.3-Flash Free (OpenCode)
**Task:** Create/improve `AGENTS.md`; then (same session) set up the `agent-logs/` log system for future sessions.

## What was done

1. Investigated the repo: `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `components.json`, `README.md`, `src/` tree, `globals.css`, `layout.tsx`, `page.tsx`, `public/images/`, and grepped `src/components/ui/*` imports plus bundled Next.js docs in `node_modules/next/dist/docs/`.
2. Rewrote `AGENTS.md` (it previously contained only the auto-generated `nextjs-agent-rules` block, which was preserved verbatim). Added verified sections: Commands, Next.js config quirks, Stack conventions, Layout of the code.
3. Created `agent-logs/_README.md` (format/purpose of this folder) and this first log entry.
4. Added a "Session log" section to `AGENTS.md` instructing future agents to read `agent-logs/` at session start and append an entry at the end.

## Key findings & decisions

- Repo is a fresh create-next-app (Next.js 16.4.3, React 19.3) with a ~70-file shadcn/base-nova component library installed; `src/app/page.tsx` is an intentionally empty shell. Documented that `src/components/ui/` is vendor-like, not feature work.
- `next.config.ts` has three non-default flags — `cacheComponents`, `partialPrefetching`, `reactCompiler` — documented with their implications (use cache model, no `runtime` segment config, no manual memoization, Tailwind via Turbopack rule not PostCSS).
- shadcn style is `base-nova`, whose primitives are **Base UI (`@base-ui/react`), not Radix**; some components import `@shadcn/react/*`. Documented so future edits don't assume Radix prop APIs.
- Tailwind v4 CSS-first: all theme tokens live in `src/app/globals.css` (`@theme inline`), no `tailwind.config.js`.
- README.md is stock create-next-app boilerplate with a wrong page path (`app/page.tsx`); noted in AGENTS.md that it should not be trusted.
- No test framework is configured; AGENTS.md says so explicitly and points to `npx tsc --noEmit` for verification since there is no typecheck script.

## Not done / pending

- No application code written yet — the landing page itself is still empty; user may next ask for page/section work (assets in `public/images/` suggest banner, destinations, CTA sections).
- `agent-logs/` is currently untracked in git; user may want it committed or ignored.

## Files touched

- `AGENTS.md` (rewritten, nextjs-agent-rules block preserved)
- `agent-logs/_README.md` (new)
- `agent-logs/2026-10-23-create-agentsmd.md` (this file)
