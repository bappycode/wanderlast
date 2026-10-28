# 2026-10-24 — Pathname-based active navlinks

**Agent:** GLM-5.3-Flash Free (OpenCode)
**Task:** User asked for active navlinks on the navbar (i.e., highlight the link matching the current route). This was the pending item from `2026-10-23-navbar-banner.md`, where active state was hardcoded via `activeLabel = "Home"`.

## What was done

1. Checked existing routes: only `/` (home), `/destinations`, `/add-destination` have pages; `/my-bookings`, `/admin`, `/profile`, `/login`, `/signup` still don't exist.
2. `src/components/navbar.tsx`: removed the hardcoded `activeLabel` const, added `usePathname()` (from `next/navigation`) inside `Navbar`, and a local `isActive(href)` helper:
   - `href === "/"` → active only on exact `/` (so Home isn't lit on every route).
   - Other hrefs → `pathname.startsWith(href)` (prefix match, future-proof for nested routes).
3. Applied `isActive(link.href)` to both the desktop link list and the mobile hamburger list (same cyan underline/text styling as before).
4. Verified with `npx tsc --noEmit` — clean.

## Key decisions

- Kept the visual style identical to the original screenshot clone (cyan underline on desktop, cyan text on mobile) — only the source of truth for "active" changed.
- Prefix matching chosen over exact matching so e.g. `/destinations/xyz` would still highlight Destinations once detail pages exist.
- `/my-bookings` and `/admin` links still point at non-existent routes (404 on click); left untouched since routes haven't been built — active state will just work once they exist.

## Not done / pending

- `/profile`, `/login`, `/signup` right-side links are not part of the "active" treatment (they're auth actions, not nav sections) — unchanged.
- `navLinks` has slightly inconsistent formatting (`{label:` without space, one line) — pre-existing cosmetic, untouched.

## Files touched

- `src/components/navbar.tsx` (usePathname + isActive, removed hardcoded activeLabel)
