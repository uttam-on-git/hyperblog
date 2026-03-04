"use client";

import dynamic from "next/dynamic";

const HeavyEditor = dynamic(
  () => import("./HeavyEditor"),
  { ssr: false }
);

export default function HeavyEditorWrapper() {
  return <HeavyEditor />;
}