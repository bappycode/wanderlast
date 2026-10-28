import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/ 3 Days" },
  { label: "Budget", value: "$0-$2000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[600px] flex-col text-white lg:min-h-[640px]">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a tropical coastal destination"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-16 text-center md:pb-32">
        <h1 className="font-display text-5xl leading-tight font-medium md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-4 max-w-md text-sm text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-cyan-500 px-7 text-sm font-medium tracking-wide uppercase hover:bg-cyan-600"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-11 items-center rounded-md bg-white/25 px-7 text-sm font-medium tracking-wide uppercase hover:bg-white/35"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search strip: 1px gaps over a translucent bg form the hairline dividers */}
      <div className="relative grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-5">
        {searchFields.map(({ label, value }) => (
          <div key={label} className="bg-black/25 px-5 py-3.5">
            <p className="text-sm font-semibold">{label}</p>
            <p className="mt-0.5 text-xs text-white/70">{value}</p>
          </div>
        ))}
        <button
          type="button"
          className="min-h-[52px] bg-cyan-500 px-5 py-3.5 text-sm font-medium sm:col-span-2 lg:col-span-1 hover:bg-cyan-600 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
        >
          Search
        </button>
      </div>
    </section>
  );
}
