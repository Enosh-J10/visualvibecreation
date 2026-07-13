"use client";

import React from "react";
import { ScrollProvider } from "@/context/ScrollContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <ScrollProvider>{children}</ScrollProvider>;
}
