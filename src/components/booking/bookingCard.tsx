"use client";
import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { iDestination } from "@/types/iDestination";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";

interface destinationProp {
  destination: iDestination;
}


const BookingCard = (props: destinationProp) => {
  const destinationData: iDestination = props.destination;
  const bookingPerks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
  ];
  const { data: session } = authClient.useSession();
  const user= session?.user

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const departureDate = e.currentTarget.departureDate.value;
    const data = {
      UserName: user?.name,
      email: user?.email,
      ...destinationData,
      departureDate,
      bookingDate: new Date()

    }
    const res = await fetch(`${process.env.SERVER_URL}/booking`, {
      method: 'post',
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    const resData = await res.json()
    console.log(resData)
  };
  return (
    <aside className="h-fit border border-border bg-background p-5 lg:sticky lg:top-8">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-semibold text-cyan-600">
        ${destinationData.price}
      </p>
      <p className="text-xs text-muted-foreground">per person</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="date"
          name="departureDate"
          aria-label="Departure date"
          defaultValue={destinationData.departureDate?.slice(0, 10)}
          className="mt-4"
        />

        <button
          type="submit"
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-cyan-600 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          Book Now
          <ArrowRight className="size-4" />
        </button>
      </form>
      <ul className="mt-5 space-y-2.5">
        {bookingPerks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="size-3.5 shrink-0 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BookingCard;
