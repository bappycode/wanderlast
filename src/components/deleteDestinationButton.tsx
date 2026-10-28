"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteDestinationButton({
  destinationId,
  destinationName,
}: {
  destinationId: string;
  destinationName: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // DELETEs the destination, then navigates back to the listings page.
  // Error is shown inside the dialog so the user can retry or cancel.
  async function handleDelete() {
    setError(null);
    setDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${destinationId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      setOpen(false);
      router.push("/destinations");
    } catch (err) {
      console.error("Failed to delete destination:", err);
      setError(
        err instanceof Error && err.message
          ? `Could not delete — ${err.message}`
          : "Could not delete the destination."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        // Block closing (overlay click, Esc, X) mid-request.
        if (!nextOpen && deleting) return;
        if (nextOpen) setError(null);
        setOpen(nextOpen);
      }}
    >
      <AlertDialogTrigger
        disabled={deleting}
        className="flex items-center gap-1.5 rounded-md border border-destructive/40 px-3.5 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 disabled:opacity-50"
      >
        <Trash2 className="size-4" />
        {deleting ? "Deleting…" : "Cancel"}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Delete “{destinationName}”? This action cannot be undone.
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the destination and its listing from
            Wanderlast.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDestinationButton;
