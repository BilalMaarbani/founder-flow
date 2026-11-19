"use client"; // Error boundaries MUST be Client Components (Next.js rule).

import { useEffect } from "react";
import Link from "next/link";

// Shown when a /leads page THROWS while rendering (a bug, a failed lookup).
// It renders inside leads/layout.tsx, so the sidebar stays usable.
// Missing leads do NOT come here: those call notFound() instead.
export default function LeadsError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void; // asks Next.js to render the segment again
}) {
  useEffect(() => {
    // Details go to the developer console only, never onto the page.
    console.error("Leads route failed:", error);
  }, [error]);

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900"
    >
      <h1 className="text-xl font-semibold">
        We couldn&apos;t show this lead page.
      </h1>
      <p className="mt-2 text-sm">
        Something went wrong on our side. Nothing was changed. Try again, or go
        back to the list.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
        >
          Try again
        </button>
        <Link
          href="/leads"
          className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100"
        >
          Back to all leads
        </Link>
      </div>
    </div>
  );
}
