import type { Session } from "./session";

// Fictional sample data.
// Week 6: this is only the STARTING value. StudyPlanner copies it into
// useState, and from then on the state (not this array) is the source of truth.
export const sampleSessions: readonly Session[] = [
  { id: "session-1", title: "Review TypeScript object types", durationMinutes: 45, isCompleted: false },
  { id: "session-2", title: "Practice React props", durationMinutes: 60, isCompleted: false },
  { id: "session-3", title: "Build a layout with Tailwind", durationMinutes: 30, isCompleted: false },
];
