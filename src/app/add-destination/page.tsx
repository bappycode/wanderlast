import type { Metadata } from "next";
import { AddDestinationForm } from "./form";

export const metadata: Metadata = {
  title: "Add Destination — Wanderlast",
};

export default function AddDestinationPage() {
  return <AddDestinationForm />;
}
