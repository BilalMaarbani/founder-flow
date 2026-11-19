import { formatDuration, type Session } from "./session";

type SessionCardProps = {
  session: Session;
  // Typed callback prop. The card does not change any data itself.
  // It only tells the parent "the user wants to toggle THIS session".
  onToggleComplete: (sessionId: string) => void;
};

// Displays ONE session. It does not know about the list around it.
export function SessionCard({ session, onToggleComplete }: SessionCardProps) {
  // Event handler: runs when the button is clicked (mouse, Enter or Space).
  function handleClick() {
    onToggleComplete(session.id);
  }

  return (
    <article
      className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 shadow-sm ${
        session.isCompleted
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        <h3
          className={`font-medium ${
            session.isCompleted ? "text-slate-600 line-through" : "text-slate-900"
          }`}
        >
          {session.title}
        </h3>
        {session.isCompleted && (
          <p className="mt-0.5 text-xs font-medium text-emerald-800">Completed</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <p className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
          {formatDuration(session.durationMinutes)}
        </p>
        <button
          type="button"
          onClick={handleClick}
          aria-label={
            session.isCompleted
              ? `Undo completion of ${session.title}`
              : `Mark ${session.title} as complete`
          }
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            session.isCompleted
              ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              : "bg-brand-600 text-white hover:bg-brand-700"
          }`}
        >
          {session.isCompleted ? "Undo" : "Complete"}
        </button>
      </div>
    </article>
  );
}
