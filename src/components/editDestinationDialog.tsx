"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import type { Destination } from "@/app/destinations/destinations-view";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const inputClasses = "h-10 rounded-md bg-neutral-50 border-neutral-200";

// Fallback list; merged with whatever category the record already has.
const knownCategories = [
  "Beach",
  "Mountain",
  "Adventure",
  "City",
  "Nature",
  "Cultural",
  "City Breaks",
];

export function EditDestinationDialog({
  destination,
}: {
  destination: Destination;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(destination.category);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const categoryOptions = Array.from(
    new Set([destination.category, ...knownCategories])
  );

  // PUTs the edited fields to the backend; refreshes the server-rendered details on success.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const token = await getTokenFromClient();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const payload = { ...data, category };
      const res = await fetch(
        `${process.env.SERVER_URL}/destinations/${destination._id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to update destination:", err);
      setError(
        err instanceof Error && err.message
          ? `Could not save changes — ${err.message}`
          : "Could not save changes."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 rounded-md border-border px-3.5 text-sm font-medium"
          >
            <SquarePen className="size-4" />
            Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit destination</DialogTitle>
          <DialogDescription>
            Update the details for “{destination.name}”, then save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} id="edit-destination-form">
          <FieldGroup className="max-h-[60vh] overflow-y-auto pe-1">
            <Field>
              <FieldLabel htmlFor="edit-name">Destination Name</FieldLabel>
              <Input
                id="edit-name"
                name="name"
                defaultValue={destination.name}
                required
                className={inputClasses}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-country">Country</FieldLabel>
              <Input
                id="edit-country"
                name="country"
                defaultValue={destination.country}
                className={inputClasses}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="edit-price">Price (USD)</FieldLabel>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  defaultValue={destination.price}
                  className={inputClasses}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-duration">Duration</FieldLabel>
                <Input
                  id="edit-duration"
                  name="duration"
                  defaultValue={destination.duration}
                  className={inputClasses}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-departureDate">Departure Date</FieldLabel>
              <Input
                id="edit-departureDate"
                name="departureDate"
                type="date"
                defaultValue={destination.departureDate?.slice(0, 10)}
                className={inputClasses}
              />
            </Field>

            <Field>
              <Label htmlFor="edit-category">Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
                <SelectTrigger
                  id="edit-category"
                  className={`w-full ${inputClasses}`}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-imageUrl">Image URL</FieldLabel>
              <Input
                id="edit-imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={destination.imageUrl}
                className={inputClasses}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-description">Description</FieldLabel>
              <Textarea
                id="edit-description"
                name="description"
                rows={4}
                defaultValue={destination.description}
                className="rounded-md bg-neutral-50 border-neutral-200"
              />
            </Field>
          </FieldGroup>

          {error ? (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            type="submit"
            form="edit-destination-form"
            disabled={saving}
          >
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDestinationDialog;
