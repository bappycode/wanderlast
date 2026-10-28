"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  // First two entries are from the reference design (Screenshot_3.png);
  // the rest are placeholder reviews — swap names/quotes/photos when final content exists.
  // person3-6.jpg: Unsplash portrait photos (Unsplash License, no attribution required).
  {
    quote:
      "The Bali Trip Was Absolutely Magical. Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. I Highly Recommend!!",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person2.png",
  },
  {
    quote:
      "Santorini Was Everything We Dreamed Of. The Whitewashed Villages, The Sunsets And The Private Boat Tour Were Beyond Imagination. We Will Be Back!",
    name: "Aisha Rahman",
    location: "Dubai, UAE",
    photo: "/images/person3.jpg",
  },
  {
    quote:
      "Kyoto In Cherry Blossom Season Was Pure Magic. Our Local Guide Took Us To Places No Usual Tourist Itinerary Can Reach. A Once-in-a-lifetime Experience.",
    name: "Rahul Mehta",
    location: "Mumbai, India",
    photo: "/images/person4.jpg",
  },
  {
    quote:
      "The Maldives Honeymoon Package Was Flawless From Start To Finish. Overwater Villas, Custom Dining And Thoughtful Surprises At Every Single Step.",
    name: "Emily Rodriguez",
    location: "Barcelona, Spain",
    photo: "/images/person5.jpg",
  },
  {
    quote:
      "Patagonia Trekking Pushed Us Gently Out Of Our Comfort Zone. Excellent Preparation, Professional Guides And Views That Simply Cannot Be Photographed.",
    name: "James Whitfield",
    location: "Sydney, Australia",
    photo: "/images/person6.jpg",
  },
];

/* Header-row arrows (per reference design) instead of the wrapper's
 * absolutely-positioned side arrows; useCarousel keeps them in sync. */
function TestimonialControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="flex gap-3 pb-1">
      <button
        type="button"
        aria-label="Previous testimonials"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
      >
        <ArrowLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Next testimonials"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24">
      <Carousel className="mx-auto max-w-6xl" opts={{ align: "start", loop: true }}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <TestimonialControls />
        </div>

        <CarouselContent className="mt-10">
          {testimonials.map(({ quote, name, location, photo }) => (
            <CarouselItem key={name} className="md:basis-1/2">
              <div className="flex h-full gap-4 border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-display text-[15px] leading-snug text-neutral-900 md:text-base">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="mt-auto pt-6">
                    <p className="text-sm font-medium text-cyan-600">
                      &mdash; {name}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {location}
                    </p>
                  </div>
                </div>
                <Image
                  src={photo}
                  alt={name}
                  width={160}
                  height={200}
                  className="h-auto w-36 shrink-0 self-stretch rounded-sm object-cover md:w-40"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
