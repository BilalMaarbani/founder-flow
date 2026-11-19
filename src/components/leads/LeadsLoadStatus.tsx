// The two "not ready yet" screens of the dashboard.
// FounderFlowDashboard decides WHICH one to show; these only display it.

// LOADING: gray placeholder blocks shaped like the real dashboard.
// We show shapes, never numbers, so nobody mistakes "still loading"
// for "you have 0 leads".
export function DashboardLoading() {
  const block = "rounded-xl bg-slate-200 motion-safe:animate-pulse";

  return (
    // role="status": screen readers announce "Loading leads…".
    <div role="status" className="mt-6">
      <span className="sr-only">Loading leads…</span>

      {/* aria-hidden: the gray blocks mean nothing to a screen reader. */}
      <div aria-hidden="true">
        <div className={`h-24 ${block}`} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className={`h-28 ${block}`} />
          <div className={`h-28 ${block}`} />
          <div className={`h-28 ${block}`} />
          <div className={`h-28 ${block}`} />
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <div className={`h-32 ${block}`} />
          <div className={`h-32 ${block}`} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600" aria-hidden="true">
        Loading leads…
      </p>
    </div>
  );
}

type DashboardLoadErrorProps = {
  // Typed callback prop: the button only ASKS the parent to try again.
  onRetry: () => void;
};

// ERROR: a safe, friendly message (no technical details) plus a Retry button.
export function DashboardLoadError({ onRetry }: DashboardLoadErrorProps) {
  return (
    // role="alert": screen readers read this out as soon as it appears.
    <div
      role="alert"
      className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"
    >
      <h2 className="font-semibold">We couldn&apos;t load your leads.</h2>
      <p className="mt-1 text-sm">
        Check your connection and try again. Nothing was changed.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
      >
        Retry
      </button>
    </div>
  );
}
