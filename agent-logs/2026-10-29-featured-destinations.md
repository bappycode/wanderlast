# 2026-10-29 — Featured Destinations section on homepage

**Agent:** Claude Opus 5.5 (Claude Code, VS Code)
**Task:** Build the missing "Featured Destinations" homepage section from the user's mockup. It has a title, subtitle, and an outlined "All Destinations →" button; a carousel of destination cards; and a "1/5" counter with prev/next arrows at the bottom. Data comes from `http://localhost:5000/featured-destinations`.

## What was done

- `src/components/featured-destinations.tsx` (new, server component): fetches the API and renders the header plus `FeaturedCarousel`. Returns `null` if the fetch fails or the list is empty (the section is hidden).
- `src/components/featured-carousel.tsx` (new, `"use client"`): `@/components/ui/carousel` with `align: "start"` and no loop. 1/2/3 cards per view (mobile/sm/lg). `FeaturedControls` uses `useCarousel()` for the counter (`selectedScrollSnap()+1 / scrollSnapList().length`, updated on select/reInit) and round arrows styled like `testimonials.tsx`.
- `src/app/destinations/destinations-view.tsx`: `DestinationCard` is now exported and reused, because the mockup card is identical to the /destinations card.
- `src/app/page.tsx`: `<FeaturedDestinations />` placed between Banner and WhyChoose.
- tsc and eslint are clean. With the dev server running, `curl localhost:3000` returns 200 and the HTML contains the section and API items (Dubai City Tour, Santorini Getaway). Not visually checked in a browser.

## Notes

- The counter counts scroll positions, not cards. With 3 per view on desktop, 5 items → "1/3".
- The API items have no `rating`, so the rating pill from the mockup doesn't show (DestinationCard only renders it when `rating` exists).

## Files touched

- `src/components/featured-destinations.tsx`
- `src/components/featured-carousel.tsx`
- `src/app/destinations/destinations-view.tsx`
- `src/app/page.tsx`
