import type { Session } from "./session";
import { SessionCard } from "./SessionCard";

type SessionListProps = {
  sessions: readonly Session[];
  // Passed straight through to every card. The list does not own any state.
  onToggleComplete: (sessionId: string) => void;
};

// Displays MANY sessions, or a friendly empty state when there are none.
export function SessionList({ sessions, onToggleComplete }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="font-medium text-slate-900">No study sessions yet</p>
        <p className="mt-1 text-sm text-slate-600">
          Planned sessions will show up here.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {/* map(): one <li> per session. key: the session's stable id, not the array index. */}
      {sessions.map((session) => (
        <li key={session.id}>
          <SessionCard session={session} onToggleComplete={onToggleComplete} />
        </li>
      ))}
    </ul>
  );
}
