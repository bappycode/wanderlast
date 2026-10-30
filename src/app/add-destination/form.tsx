"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Mountains",
  "Cultural",
  "Adventure",
  "City Breaks",
];

const inputClasses = "h-10 rounded-md bg-neutral-50 border-neutral-200";

export function AddDestinationForm() {
  const router = useRouter();
  const [category, setCategory] = useState(categories[0]);

  // Posts to the backend (localhost:5000) — body/shape must match its expectation.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...formData, category };
    const token = await getTokenFromClient()
    try {
      const res = await fetch(`${process.env.SERVER_URL}/add-destination`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" , 
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const response = await res.json();
      console.log("Response:", response);
    } catch (error) {
      console.error("Failed to submit travel package:", error);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 w-full max-w-lg rounded-md border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Bali Paradise"
              required
              className={inputClasses}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Indonesia"
                className={inputClasses}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value ?? categories[0])}
              >
                <SelectTrigger
                  id="category"
                  className={`w-full ${inputClasses}`}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="e.g., 1299"
                className={inputClasses}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 7 Days/6 Nights"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              className={inputClasses}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className={inputClasses}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe the travel experience..."
              className="rounded-md bg-neutral-50 border-neutral-200"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-medium text-red-500 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <Trash2 className="size-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-500 px-5 text-sm font-medium text-white hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Plus className="size-4" />
            Add Travel Package
          </button>
        </div>
      </form>
    </main>
  );
}
