# 2026-10-26 — BookingCard price not visible (props mismatch fix)

**Agent:** Claude Opus 5.5 (Claude Code, VS Code)
**Task:** User extracted the booking card into `src/components/booking/bookingCard.tsx` (their own refactor, after `2026-10-26-departure-date-picker.md`). They asked why the price wasn't visible, then chose fix option 1.

## Cause

The page rendered `<BookingCard destination={destination} />`, but the component reads `price`/`departureDate` directly off its props (`(destination: BookingCardProps) => destination.price`). Props were `{ destination: {...} }`, so the price was `undefined` and only "$" rendered. The date picker also never received the default date. `tsc` reported TS2322 at the call site.

## What was done

- `src/app/destinations/[id]/page.tsx`: call site changed to `<BookingCard price={destination.price} departureDate={destination.departureDate} />`. Removed the now-unused `ArrowRight` import.
- Verified: `npx tsc --noEmit` has no errors in these files.

## Not done / pending (offered, user didn't ask)

- `bookingCard.tsx` still has `console.log(destination)` and a lowercase component name `bookingCard` (works because it's imported as `BookingCard`).

## Files touched

- `src/app/destinations/[id]/page.tsx`
