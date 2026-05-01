"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase/config";

export function AnalyticsInit() {
  useEffect(() => {
    initAnalytics().catch(console.error);
  }, []);

  return null;
}
