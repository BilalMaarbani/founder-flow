import Link from "next/link";
import { AppShell } from "@/components/AppShell";

// NESTED LAYOUT for every route under /leads:
//   /leads          (leads/page.tsx)
//   /leads/3        (leads/[id]/page.tsx)
//   /leads/profile  (leads/profile/page.tsx)
//
// It wraps them in the app shell (sidebar with "Leads" highlighted) and a
// small Leads section header. `children` is whichever page matches the URL.
// When you move from /leads to /leads/3, this layout stays mounted and only
// `children` changes.
//
// Server Component: nothing here needs state or event handlers.
export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell current="leads">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
          Leads
        </p>
        <nav aria-label="Leads section">
          <Link
            href="/leads"
            className="text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
          >
            All leads
          </Link>
        </nav>
      </div>

      <div className="mt-6">{children}</div>
    </AppShell>
  );
}
