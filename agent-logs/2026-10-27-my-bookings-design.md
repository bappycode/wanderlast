# 2026-10-27 — My Bookings page + card design

**Agent:** Claude Opus 5.5 (Claude Code, VS Code)
**Task:** First the user asked what was wrong with `myBookingsCard.tsx` (explanation only). Problems found: a JSX syntax error (two elements inside `{}`), props not destructured, `alt={name}` pointing at an undefined variable, and the page passing the whole array to a single card. The user applied those fixes themselves. They then asked to match a mockup: a list of horizontal cards with the image on the left; a status pill (Confirmed green / Pending amber); a name; "Departure" and "Booking ID" rows with icons; a cyan price; and outlined red Cancel + cyan View buttons at the bottom right.

## What was done

- `src/components/booking/myBookingsCard.tsx`: rebuilt to the mockup. Uses Tailwind + lucide icons with square corners and cyan-600, matching `bookingCard.tsx`. The image is `fill` in a 213×120 box. On mobile the card stacks (image goes full-width 16/9). Departure is formatted with date-fns `parseISO` + `"MMMM d, yyyy"` (parsed as local time, to avoid the UTC+6 day shift). Still a server component.
- `src/app/my-bookings/page.tsx`: `max-w-4xl` main wrapper; `font-display` heading "My Bookings"; subtitle; empty state when there are no bookings; `space-y-4` list.
- `src/types/MyBookingData.ts`: added optional `status?: string`.
- tsc and eslint are clean on these files. Not checked in a browser.

## Decisions

- The backend doesn't store a status (BookingCard POSTs without one). A missing status renders as **Pending**; only `status === "confirmed"` (case-insensitive) renders Confirmed.

## Not done / pending

- **Cancel** button has no handler (no delete-booking endpoint is known).
- **View** links to `/destinations/${booking._id}`. This only works if the backend keeps the destination's `_id`: BookingCard spreads `...destinationData` into the POST body, so it depends on the server. If bookings get their own `_id`, store a `destinationId` and link with that instead.
- The page still fetches with `userEmail` possibly undefined (logged-out user) and has no error handling for a failed fetch.

## Files touched

- `src/components/booking/myBookingsCard.tsx`
- `src/app/my-bookings/page.tsx`
- `src/types/MyBookingData.ts`
