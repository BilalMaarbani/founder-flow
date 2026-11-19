import { AppNav, type NavSection } from "./AppNav";

type AppShellProps = {
  // Which sidebar item to highlight (aria-current="page").
  current: NavSection;
  children: React.ReactNode;
};

// The FounderFlow application shell: skip link, navigation, <main>, footer.
// Used by the Dashboard page (src/app/page.tsx) and by the Leads layout
// (src/app/leads/layout.tsx), so the shell is written ONCE.
//
// Why not in the root layout? The root layout also wraps /mb4-preview, a
// standalone Week 6 preview that must not get the CRM sidebar.
export function AppShell({ current, children }: AppShellProps) {
  return (
    <div className="md:pl-60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to main content
      </a>
      <AppNav current={current} />

      <main id="main" className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:py-10">
        {children}

        <footer className="mt-12 border-t border-slate-200 pt-4 text-xs text-slate-600">
          FounderFlow training build &middot; fictional sample data &middot;
          changes reset on reload &middot; NumericSlick &times; MasarUX
        </footer>
      </main>
    </div>
  );
}
