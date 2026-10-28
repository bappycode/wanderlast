import MyBookingsCard from "@/components/booking/myBookingsCard";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import React from "react";
import { iMyBookingData } from "@/types/MyBookingData";

const MybookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const userEmail = session?.user.email;
  const res = await fetch(`http://localhost:5000/my-bookings/${userEmail}`);
  const myBookingData: iMyBookingData[] = await res.json();
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-3xl md:text-4xl">My Bookings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      {myBookingData.length === 0 ? (
        <div className="mt-8 border border-border py-12 text-center text-sm text-muted-foreground">
          You have no bookings yet.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {myBookingData.map((booking) => (
            <MyBookingsCard key={booking._id} bookingData={booking} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MybookingsPage;
