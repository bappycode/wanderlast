import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
} from "lucide-react";
import type { Destination } from "../destinations-view";
import EditDestinationDialog from "@/components/editDestinationDialog";
import DeleteDestinationButton from "@/components/deleteDestinationButton";
import BookingCard from "@/components/booking/bookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type DestinationDetail = Destination & {
  reviews?: number;
  highlights?: string[];
};


const  getDestination = cache(
  async (id: string): Promise<DestinationDetail | null> => {
  const token = await getTokenFromServer()
  try {
    const res = await fetch(`${process.env.SERVER_URL}/destinations/${id}`,{
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) return null;
    return (await res.json()) as DestinationDetail;
  } catch {
    return null;
  }
}
)

type DestinationPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { id } = await params;
  const destination = await getDestination(id);
  return {
    title: destination ? `${destination.name} — Wanderlast` : "Destination — Wanderlast",
  };
}
export default async function DestinationDetailsPage({
  params,
}: DestinationPageProps) {
  const { id } = await params;
  const destination = await getDestination(id);
  if (!destination) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
      {/* Top bar: back link + admin actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-600"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <EditDestinationDialog destination={destination} />
          <DeleteDestinationButton
            destinationId={destination._id}
            destinationName={destination.name}
          />
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-6 h-56 overflow-hidden md:h-[360px]">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          priority
          sizes="(min-width: 1280px) 80rem, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid gap-10 pb-10 lg:grid-cols-[1fr_320px]">
        {/* Left column: info */}
        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {destination.country}
          </p>

          <h1 className="mt-1 text-3xl font-display font-medium md:text-4xl">
            {destination.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {destination.rating ? (
              <p className="flex items-center gap-1 font-medium">
                <span className="flex items-center gap-0.5 text-green-600">
                  {destination.rating.toFixed(1)}
                  <span aria-hidden="true">★</span>
                </span>
                {destination.reviews ? (
                  <span className="text-muted-foreground">
                    ({destination.reviews} reviews)
                  </span>
                ) : null}
              </p>
            ) : null}
            <span
              className={destination.rating ? "text-muted-foreground" : "hidden"}
              aria-hidden="true"
            >
              |
            </span>
            <p className="flex items-center gap-1 font-medium">
              <Calendar className="size-3.5" />
              {destination.duration}
            </p>
          </div>

          <hr className="mt-6 border-border" />

          <section className="mt-6">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {destination.description}
            </p>
          </section>

          {destination.highlights?.length ? (
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Highlights</h2>
              <ul className="mt-4 grid gap-x-10 gap-y-2.5 text-sm sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <Check className="size-3.5 shrink-0 text-green-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        {/* Right column: booking card */}
        
        <BookingCard
          destination={destination}
        />
      </div>
    </main>
  );
}
