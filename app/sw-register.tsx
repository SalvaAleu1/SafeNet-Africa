"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.protocol === "https:") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline support is an enhancement; the site remains usable if registration fails.
      });
    }
  }, []);
  return null;
}
