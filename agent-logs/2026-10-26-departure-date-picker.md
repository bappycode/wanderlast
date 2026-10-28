# 2026-10-26 — Clickable departure date picker on destination details

**Agent:** Claude Opus 5.5 (Claude Code, VS Code)
**Task:** User wanted the static departure date box in the booking card of `src/app/destinations/[id]/page.tsx` to be a real date picker they can click to pick a date.

## What was done

1. New client component `src/components/departureDatePicker.tsx`, built from `ui/popover` (Base UI) + `ui/calendar` (react-day-picker v10, `mode="single"`):
   - Trigger is the full-width bordered field: calendar icon, formatted date ("Mon, Nov 3, 2026") or a "Pick a date" placeholder, and a chevron. It gets a cyan border on hover, focus, and when open (`data-popup-open`).
   - Initial selection is the destination's `departureDate` from the backend, unless it's in the past (then empty).
   - Past days are disabled (`disabled={{ before: today }}`, `startMonth={today}`). The popover closes on selection.
   - Renders `<input type="hidden" name="departureDate">` (local yyyy-mm-dd) so a future booking `<form>` can submit it.
2. `src/app/destinations/[id]/page.tsx`: removed the server-side `departureDate` string formatting and the static div. It now renders `<DepartureDatePicker defaultDate={destination.departureDate} />` (always shown, even when the destination has no date).
3. Verified: `npx tsc --noEmit` has no errors in the touched files; eslint is clean on both. Not visually checked in a browser.

## Decisions

- Page stays a server component; only the picker is a client island.
- Hidden input uses local date parts, not `toISOString()`, to avoid timezone day-shift.
- File name follows the camelCase style of the sibling destination components (`deleteDestinationButton.tsx`, `editDestinationDialog.tsx`).

## Not done / pending

- "Book Now" still does nothing. The selected date isn't sent anywhere yet (booking flow / `/my-bookings` not built).
- Whether users may pick any future date, or only the admin-set departure date(s), is a product decision. Currently any future date is allowed.

## Files touched

- `src/components/departureDatePicker.tsx` (new)
- `src/app/destinations/[id]/page.tsx`
