import type { Metadata } from "next";
import { DestinationsView, type Destination } from "./destinations-view";

export const metadata: Metadata = {
  title: "All Destinations — Wanderlast",
};

export default async function AllDestinationsPage() {
  let destinations: Destination[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`);
    if (!res.ok) {
      error = `Request failed with status ${res.status}`;
    } else {
      destinations = (await res.json()) as Destination[];
    }
  } catch {
    error = "Could not reach the destinations API. Is the backend running?";
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="text-3xl font-semibold md:text-4xl lg:text-[2.5rem] font-display">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      {error ? (
        <div className="mt-10 border border-destructive/30 bg-destructive/5 py-12 text-center text-sm text-destructive">
          {error}
        </div>
      ) : (
        <DestinationsView destinations={destinations} />
      )}
    </main>
  );
}
