"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Destination = {
  _id: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  category: string;
  rating?: number;
};

const priceRanges = [
  { value: "0-999999", label: "Any Price", min: 0, max: Infinity },
  { value: "0-1000", label: "Under $1000", min: 0, max: 1000 },
  { value: "1000-1500", label: "$1000 - $1500", min: 1000, max: 1500 },
  { value: "1500-2000", label: "$1500 - $2000", min: 1500, max: 2000 },
  { value: "2000-999999", label: "$2000+", min: 2000, max: Infinity },
] as const;

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
] as const;

export function DestinationsView({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category))).sort(),
    [destinations]
  );

  const visible = useMemo(() => {
    const range = priceRanges.find((r) => r.value === priceRange);
    const categoryFiltered = category
      ? destinations.filter((d) => d.category === category)
      : destinations;
    const pricedFiltered = range
      ? categoryFiltered.filter((d) => {
          const price = Number.parseFloat(d.price);
          return price >= range.min && price <= range.max;
        })
      : categoryFiltered;

    switch (sortBy) {
      case "price-asc":
        return [...pricedFiltered].sort(
          (a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price)
        );
      case "price-desc":
        return [...pricedFiltered].sort(
          (a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price)
        );
      case "name-asc":
        return [...pricedFiltered].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...pricedFiltered].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return pricedFiltered;
    }
  }, [destinations, category, priceRange, sortBy]);

  return (
    <>
      {/* Filters */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Select value={category} onValueChange={(value) => setCategory(value ?? null)}>
          <SelectTrigger className="h-11 w-full rounded-md px-4 uppercase tracking-wide">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={(value) => setPriceRange(value ?? null)}>
          <SelectTrigger className="h-11 w-full rounded-md px-4 uppercase tracking-wide">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value ?? null)}>
          <SelectTrigger className="h-11 w-full rounded-md px-4 uppercase tracking-wide">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {visible.length} destination{visible.length === 1 ? "" : "s"}
      </p>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="mt-12 border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No destinations match your filters.
        </div>
      ) : (
        <div className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article>
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {destination.rating ? (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded bg-slate-800/90 px-1.5 py-0.5 text-xs font-medium text-white">
            {destination.rating.toFixed(1)}
            <Star className="size-3 fill-current" />
          </span>
        ) : null}
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5" />
          {destination.country}
        </p>

        <div className="flex items-end justify-between gap-2">
          <h3 className="text-lg font-medium">{destination.name}</h3>
          <p className="flex items-baseline gap-1 leading-none">
            <span className="text-lg font-semibold">${destination.price}</span>
            <span className="text-[10px] font-medium text-muted-foreground">
              PerPerson
            </span>
          </p>
        </div>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          {destination.duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="group flex items-center gap-1 pt-1 text-xs font-semibold tracking-widest text-cyan-600 uppercase underline-offset-4 hover:underline"
        >
          Book Now
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
