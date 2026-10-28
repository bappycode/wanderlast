"use client"
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Eye,
  MapPin,
  Trash2,
} from "lucide-react";
import { iMyBookingData } from "@/types/MyBookingData";
import { redirect } from "next/navigation";

const MyBookingsCard = ({ bookingData }: { bookingData: iMyBookingData }) => {
  // Bookings saved before a status existed are treated as pending.
  const isConfirmed = bookingData.status?.toLowerCase() === "confirmed";
  const departure = bookingData.departureDate
    ? format(parseISO(bookingData.departureDate), "MMMM d, yyyy")
    : "Not set";
const handleCancelBooking = async () => {
    const res = await fetch(`http://localhost:5000/my-bookings/${bookingData._id}`, {
        method:"Delete"
    })
    const data = await res.json()
    console.log(data)
    redirect('/my-bookings')
}
  return (
    <article className="flex flex-col gap-4 border border-border bg-background p-3 sm:flex-row sm:gap-5">
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-[120px] sm:w-[213px]">
        <Image
          src={bookingData.imageUrl}
          alt={bookingData.name}
          fill
          sizes="(min-width: 640px) 213px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0">
          {isConfirmed ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
              <CircleCheck className="size-3.5" />
              Confirmed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-600">
              <Clock className="size-3.5" />
              Pending
            </span>
          )}

          <h2 className="mt-2 truncate font-display text-xl font-medium">
            {bookingData.name}
          </h2>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 shrink-0" />
            Departure: {departure}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">Booking ID: {bookingData._id}</span>
          </p>

          <p className="mt-2 text-2xl font-semibold text-cyan-600">
            ${bookingData.price}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleCancelBooking}
            type="button"
            className="flex h-9 items-center gap-1.5 border border-red-400 px-4 text-xs text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-3.5" />
            Cancel
          </button>
          <Link
            href={`/destinations/${bookingData._id}`}
            className="flex h-9 items-center gap-1.5 bg-cyan-600 px-4 text-xs text-white transition-colors hover:bg-cyan-700"
          >
            <Eye className="size-3.5" />
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MyBookingsCard;
