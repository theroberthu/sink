import type { Metadata } from "next";
import { MessTypeLanding } from "@/components/MessTypeLanding";
import { getMessType } from "@/data/messTypes";

const messType = getMessType("bottle-avalanche")!;

export const metadata: Metadata = {
  title: "Bottle Avalanche | Under Sink Reset",
  description:
    "Sprays, soaps, and trash bags everywhere? The Bottle Avalanche reset uses a pull out organizer, waterproof liner, and cleaning caddy to bring everything to the front.",
  alternates: { canonical: "/kitchen-sink-reset/bottle-avalanche" },
};

export default function BottleAvalanchePage() {
  return <MessTypeLanding messType={messType} />;
}
