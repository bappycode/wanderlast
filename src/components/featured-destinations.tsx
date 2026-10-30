import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Destination } from "@/app/destinations/destinations-view";
import { FeaturedCarousel } from "@/components/featured-carousel";

async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/featured-destinations`);
    if (!res.ok) return [];
    return (await res.json()) as Destination[];
  } catch {
    return [];
  }
}

export async function FeaturedDestinations() {
  const destinations = await getFeaturedDestinations();
  // Hide the whole section if the backend is down or returns nothing.
  if (destinations.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link
            href="/destinations"
            className="group flex h-10 items-center gap-2 border border-cyan-600 px-4 text-xs font-medium tracking-widest text-cyan-600 uppercase transition-colors hover:bg-cyan-600 hover:text-white"
          >
            All Destinations
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <FeaturedCarousel destinations={destinations} />
      </div>
    </section>
  );
}
