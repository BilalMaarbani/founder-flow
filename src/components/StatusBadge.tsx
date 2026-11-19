// A lead's display status is CALCULATED from the typed data. It is not stored.
export function StatusBadge({
  isClosed,
  followUpDue,
}: {
  isClosed: boolean;
  followUpDue: boolean;
}) {
  if (isClosed) {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
        Closed
      </span>
    );
  }
  if (followUpDue) {
    return (
      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900">
        Follow up
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-900">
      On track
    </span>
  );
}
