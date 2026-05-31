import type { Metadata } from "next";
import { MessTypeLanding } from "@/components/MessTypeLanding";
import { getMessType } from "@/data/messTypes";

const messType = getMessType("pipe-maze")!;

export const metadata: Metadata = {
  title: "Pipe Maze | Under Sink Reset",
  description:
    "Pipes and a garbage disposal eating your cabinet? The Pipe Maze reset uses a narrow side organizer, waterproof liner, and small bins to work around the plumbing.",
  alternates: { canonical: "/kitchen-sink-reset/pipe-maze" },
};

export default function PipeMazePage() {
  return <MessTypeLanding messType={messType} />;
}
