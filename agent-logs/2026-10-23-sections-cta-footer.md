# 2026-10-23 — WhyChoose, Testimonials, CTA, Footer sections

**Agent:** GLM-5.3-Flash Free (OpenCode)
**Task:** User provided 3 more screenshots (`wanderlust logs\Screenshot_2/3/4.png`) and asked to clone those sections.

## What was done

1. **`src/components/why-choose.tsx`** — full-width `bg-[#e8f4f4]` mint band; centered serif "Why Choose Wanderlust" + subtitle; 3 white `shadow-sm` cards (max-w-6xl, md:grid-cols-3): cyan lucide icons `ShieldCheck`/`Map`/`Headset`, serif card titles, `text-neutral-500` body. Note: heading says "Wanderlust" (with "u") per screenshot, while footer logo says "Wanderlast" — text copied as-is.
2. **`src/components/testimonials.tsx`** ("use client") — heading left, circular outline prev/next buttons right; **embla carousel** (`useEmblaCarousel({ align: "start", loop: true })`, already in deps instead of the shadcn carousel wrapper) with 2 slides: `basis-full md:basis-1/2`, standard `-ml-4`/`pl-4` gutter pattern. Card = border + quote (serif `font-display`), name in cyan with em-dash ("— Michael Chen"), city gray, photo right (`person1.png` = Michael, `person2.png` = Sarah) as stretch-filled `next/image`.
3. **`src/components/cta.tsx`** — full-bleed `/images/CTA.png` fill image + `bg-black/45` overlay; centered serif "Ready To Start Your Journey?", subtext, white uppercase "Book Your Trip Today →" button (dark text).
4. **`src/components/footer.tsx`** — `bg-neutral-900`; giant bold serif "Wanderlast" (text-6xl/7xl), tagline; 4-col grid (Newsletter with `bg-neutral-700` email input + inline `ArrowUpRight` subscribe icon-button; Quick Links: Home/Destinations/My Bookings/My Profile; Support: Help Center/Terms/Privacy; Contact Us: 786 901 1622 / info@Wandarland.com — spelling copied exactly from screenshot); bottom row "© 2025 Wanderlust. All rights reserved." + X/LinkedIn/Instagram icons.
5. Wired all into `src/app/page.tsx` in screenshot order: Navbar → Banner → WhyChoose → Testimonials → CTA → Footer.
6. Verified: `npx tsc --noEmit` clean; user's already-running dev server on :3000 SSRs the full page with every section present.

## Key decisions & gotchas

- **This lucide-react version (1.x) removed brand icons** — `Instagram`/`Linkedin` are NOT exported. All three social icons (X, LinkedIn, Instagram) are inline SVG path components inside `footer.tsx`. Don't import brand icons from lucide here.
- Testimonials carousel built directly on `useEmblaCarousel` rather than `@/components/ui/carousel.tsx` (base-nova wrapper) — fewer styling constraints. Caveat: with only 2 slides at 50% width the desktop arrows have no room to scroll (embla falls back silently); they are functional on mobile (1 slide per view). If user wants working desktop paging, add 2 more testimonials to the `testimonials` array.
- CTA/footer link targets are placeholder routes (`/destinations`, `/my-bookings`, etc.) like the navbar — none of these routes exist yet.
- Footer copy intentionally preserved odd spellings from the screenshot: "Wandarland.com" (email domain), "Wanderlust" in copyright but "Wanderlast" as logo. Flag to user if they want normalized.
- Fonts/icons reuse the `font-display` (Playfair) token added in the previous session for all serif headings.
- Newsletter input is uncontrolled and its subscribe button is `type="button"` (no handler yet); footer stays a server component.

## Not done / pending

- No search/handlers wired anywhere; CTA button and footer links point to non-existent routes.
- Overlay opacity/spacing eyeballed from screenshots — visual pass may adjust.
- Screenshot_3 was cropped (no navbar visible) — assumed it sits below Why Choose; order taken from screenshot numbering.

## Addendum — migrated testimonials to `@/components/ui/carousel`

User asked why the shadcn `src/components/ui/carousel.tsx` wrapper wasn't used. Initially hand-rolled `useEmblaCarousel` (reasoning: wrapper's `CarouselPrevious`/`CarouselNext` are absolutely-positioned side arrows, format doesn't match the header-row arrows in Screenshot 3). After actually reading the wrapper, migrated to it anyway — it exposes `useCarousel()`, so custom header arrows are built via `TestimonialControls` (scrollPrev/scrollNext + canScrollPrev/Next disable states) while the wrapper adds keyboard arrow-key nav and ARIA roles. Visual output unchanged; `Carousel opts={{ align: "start", loop: true }}`, `CarouselItem className="md:basis-1/2"`, header row lives inside `<Carousel>` (context requires it). Lesson logged to AGENTS.md below: check the shadcn ui component before hand-rolling.

## Addendum 2 — expanded carousel to 6 reviews

User asked to "make the total carousel with the persons and some reviews". Only `person1.png`/`person2.png` exist in the design assets (checked `b14-wanderlust-resources/assets/` too), so: kept the 2 design reviews (Michael Chen/Sarah Johnson) and added 4 **placeholder** reviews (Aisha Rahman/David Okafor/Emily Rodriguez/James Whitfield) in matching Title-Case style, alternating person1/person2 photos. 6 slides × 50% width = 3 desktop pages, so the header arrows now actually scroll (previously the 2-up layout filled the viewport and arrows did nothing); loop:true now works as intended. **Placeholder content — user should supply real reviewer names/quotes/photos for the 4 added entries.**

## Addendum 3 — distinct reviewer photos from the internet

User asked to use different people images from the web instead of reusing person1/person2. Downloaded 8 Unsplash portrait candidates via `images.unsplash.com/photo-<id>?w=400&h=440&fit=crop&crop=faces` (Unsplash License — free, no attribution required), visually verified each, and copied 4 into `public/images/`: `person3.jpg` (dark-haired laughing woman → "Aisha Rahman", Dubai), `person4.jpg` (South Asian man → renamed "David Okafor" → **"Rahul Mehta", Mumbai, India** — no Black male portrait among candidates, so the placeholder name was changed to match the photo), `person5.jpg` (dark-haired woman → "Emily Rodriguez", Barcelona), `person6.jpg` (older man with glasses → "James Whitfield", Sydney). person1/person2 remain only on the two design-authored reviews (Michael Chen, Sarah Johnson). All 4 still marked placeholder in the array comment. Unsplash source photo IDs are in this log via the URL pattern if re-download is ever needed.

## Addendum 4 — Navbar moved to root layout

User asked for the navbar on every page. Moved `<Navbar />` from `src/app/page.tsx` into `src/app/layout.tsx` (rendered before `{children}` inside `<body className="min-h-full flex flex-col">`), so it appears on all current and future routes. Home page no longer imports/renders it (had been first child — would have rendered twice). Verified: `tsc --noEmit` clean, SSR order correct. NOTE: Footer is still page-level (only renders on pages that include `<Footer />`) — if the user wants the footer site-wide too, it moves to layout the same way.

## Addendum 5 — Footer moved to layout

Footer site-wide per user: `<Footer />` moved from `page.tsx` into `src/app/layout.tsx` after `{children}` (Navbar + children + Footer sandwich). Home page no longer renders Footer. Verified: `tsc --noEmit` clean, SSR shows a single footer as the last element. `page.tsx` now holds only page content (Banner, WhyChoose, Testimonials, CTA); layout owns all site chrome.

## Addendum 6 — /add-destination page (Screenshot_5.png)

Built `src/app/add-destination/`: server `page.tsx` (metadata "Add Destination — Wanderlast") + colocated client `form.tsx`. Clones the design: left-aligned serif "Add New Travel Package" heading; centered `max-w-lg` white card (border + subtle shadow) with Destination Name; Country + Category grid; Price (USD, number) + Duration; Departure Date (`type="date"`); Image URL (`type="url"`); tall Description textarea; right-aligned Cancel (red text + Trash2, navigates home) and Add Travel Package (cyan + Plus) buttons. Used `Label`/`Input`/`Textarea`/`Select` from `@/components/ui` per repo convention, with `h-10 rounded-md bg-neutral-50` overrides (stock sizes too small). Category `Select` = Base UI root, value==label strings ("Beach", "Mountains", "Cultural", "Adventure", "City Breaks"), Beach preselected. **Gotcha: Base UI `onValueChange` passes `string | null`** — handler must null-guard. Form has no backend: submit is `preventDefault` + `console.log` of payload (flagged in code comment); Cancel routes to "/". Not linked from anywhere yet (Admin?) — pending navigation.

## Addendum 7 — root cause of the submit SyntaxError + real API route

User reported `Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "...` on submit. Investigated: dev-server log had no server errors (only ColorZilla-extension hydration-mismatch noise, `cz-shortcut-listen="true"`); Next devtools' only JSON fetch works; **the form file had been edited by the user** to POST to `http://localhost:3000/add-destination` — the *page* URL, no route handler → server responded with the page's HTML → `res.json()` throws exactly that error, and it threw before any `console.log` could run (why no payload printed). The client JSON body itself was always valid.

Fix (kept the user's fetch approach): created **`src/app/api/destinations/route.ts`** — POST route handler, parses JSON, logs, returns `201 {ok, destination}` (placeholder until persistence exists). Form now fetches **relative `/api/destinations`** (hardcoding localhost breaks when deployed), body includes `category` (the Base UI Select is controlled state, **FormData doesn't contain it** — the user's version was silently dropping it), wrapped in try/catch. Verified via direct POST: 201 + JSON echo, tsc clean.

Lesson for future logs (already implied in AGENTS.md): a route returning HTML to a JSON client (`unexpected token '<'`) almost always means "queried a page, not an API route" — check what URL actually got hit before suspecting hydration/extensions.

## Addendum 8 — real backend wired in, test API removed

User confirmed submit works and has their own backend running. Per instruction: form `handleSubmit` now POSTs to their backend at `http://localhost:5000/add-destination` (hardcoded per user request; is a dev-only URL — revisit when deploying). **Deleted `src/app/api/` (the temporary Next route handler)**. Kept from previous session's fix: relative-to-user edits — [`category` still merged into payload since the select isn't part of FormData; try/catch intact]. No live POST test against their backend (would create real data); verified by `tsc --noEmit` (clean).

## Files touched

- `src/app/add-destination/page.tsx` + `form.tsx` (new — Addendum 6)
- `src/app/AGENTS.md` cross-check: Base UI select `onValueChange` null quirk is also now implied by AGENTS.md's "check the ui component first" note
- `src/components/why-choose.tsx` (new)
- `src/components/testimonials.tsx` (new — initially raw embla, migrated to `@/components/ui/carousel` same session)
- `src/app/layout.tsx` (Navbar moved here in Addendum 4, `Footer` in Addendum 5 — layout owns all site chrome)
- `src/components/cta.tsx` (new)
- `src/components/footer.tsx` (new)
- `src/app/page.tsx` (wired sections)
