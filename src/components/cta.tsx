import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-20 text-center text-white md:py-24">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of an island from above"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative">
        <h2 className="font-display text-3xl md:text-4xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/85">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-sm bg-white px-6 text-sm font-medium tracking-wide text-neutral-900 uppercase hover:bg-white/85"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
