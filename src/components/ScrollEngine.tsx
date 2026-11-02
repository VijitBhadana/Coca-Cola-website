"use client";

import { useEffect } from "react";
import { startExperience } from "@/lib/experience";

export default function ScrollEngine() {
  useEffect(() => startExperience(), []);
  return null;
}
