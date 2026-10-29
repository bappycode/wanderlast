"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import {
  DestinationCard,
  type Destination,
} from "@/app/destinations/destinations-view";

/* Bottom row from the reference design: "1/5" counter on the left, arrows on the right. */
function FeaturedControls() {
  const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setTotal(api.scrollSnapList().length);
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="mt-8 flex items-center justify-between">
      <p className="font-display text-lg text-neutral-900">
        {current}/{total}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          aria-label="Previous destinations"
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next destinations"
          disabled={!canScrollNext}
          onClick={scrollNext}
          className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function FeaturedCarousel({ destinations }: { destinations: Destination[] }) {
  return (
    <Carousel className="mt-10" opts={{ align: "start" }}>
      <CarouselContent>
        {destinations.map((destination) => (
          <CarouselItem key={destination._id} className="sm:basis-1/2 lg:basis-1/3">
            <DestinationCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <FeaturedControls />
    </Carousel>
  );
}
