import type { Metadata } from "next";
import { MessTypeLanding } from "@/components/MessTypeLanding";
import { getMessType } from "@/data/messTypes";

const messType = getMessType("tiny-cabinet-energy")!;

export const metadata: Metadata = {
  title: "Tiny Cabinet Energy | Under Sink Reset",
  description:
    "Small cabinet stacked like Jenga? The Tiny Cabinet Energy reset uses a slim organizer, stackable tray, and waterproof liner to go up instead of out.",
  alternates: { canonical: "/kitchen-sink-reset/tiny-cabinet-energy" },
};

export default function TinyCabinetEnergyPage() {
  return <MessTypeLanding messType={messType} />;
}
