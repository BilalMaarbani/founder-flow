import Link from "next/link";

// Navigation: a sidebar on wide screens, a top bar on phones.
// Server Component: the page that renders it says which item is current,
// so no "use client" (and no usePathname) is needed here.

export type NavSection = "dashboard" | "leads";

const navItems: {
  label: string;
  href: string | null;
  section: NavSection | null; // which `current` value highlights this item
}[] = [
  { label: "Dashboard", href: "/", section: "dashboard" },
  { label: "Leads", href: "/leads", section: "leads" },
  { label: "Follow-ups", href: "/#follow-ups", section: null }, // a Dashboard section
  { label: "Pipeline", href: null, section: null }, // not built yet
];

function NavLinks({
  layout,
  current,
}: {
  layout: "column" | "row";
  current: NavSection;
}) {
  return (
    <ul
      className={
        layout === "column"
          ? "flex flex-col gap-1"
          : "flex gap-1 overflow-x-auto pb-1"
      }
    >
      {navItems.map((item) =>
        item.href === null ? (
          <li key={item.label}>
            <span
              aria-disabled="true"
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-slate-400"
            >
              {item.label}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Soon
              </span>
            </span>
          </li>
        ) : (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={item.section === current ? "page" : undefined}
              className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-700"
            >
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white"
      >
        F
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">
        FounderFlow
      </span>
    </div>
  );
}

export function AppNav({ current }: { current: NavSection }) {
  return (
    <>
      {/* Phones and small tablets */}
      <header className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <Brand />
        <nav aria-label="Primary" className="mt-3">
          <NavLinks layout="row" current={current} />
        </nav>
      </header>

      {/* md and up */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex">
        <Brand />
        <nav aria-label="Primary" className="mt-8">
          <NavLinks layout="column" current={current} />
        </nav>
        <p className="mt-auto rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
          Training build for Week 05 Day 01. Sample data only.
        </p>
      </aside>
    </>
  );
}
