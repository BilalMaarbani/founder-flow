// The data contract for one study session.
// Every component in the planner agrees on this shape.
export type Session = {
  id: string; // stable and unique: used as the React key AND to find the session to toggle
  title: string;
  durationMinutes: number;
  isCompleted: boolean; // Week 6: changes when the user clicks Complete / Undo
};

// Derived value: calculated from the list, never stored separately.
export function getTotalMinutes(sessions: readonly Session[]): number {
  return sessions.reduce((total, session) => total + session.durationMinutes, 0);
}

// Derived value: how many sessions are marked complete.
// Recalculated on every render, so it can never disagree with the list.
export function getCompletedCount(sessions: readonly Session[]): number {
  return sessions.filter((session) => session.isCompleted).length;
}

// 135 -> "2 h 15 min", 45 -> "45 min"
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${rest} min`;
}
