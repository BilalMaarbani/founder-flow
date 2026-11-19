export function SummaryCard({
  label,
  value,
  note,
  highlight = false,
}: {
  label: string;
  value: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl border p-5 shadow-sm " +
        (highlight
          ? "border-amber-300 bg-amber-50"
          : "border-slate-200 bg-white")
      }
    >
      <dt className="text-sm font-medium text-slate-600">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </dd>
      <dd className="mt-1 text-xs text-slate-600">{note}</dd>
    </div>
  );
}
