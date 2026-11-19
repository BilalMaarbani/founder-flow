// FounderFlow - the Day 1 "live" business logic.
//
// This file is used by BOTH:
//   - the dashboard (src/components/leads/*)
//   - the terminal lab    (npm run lab:day1)
//
// Edit something here during class, save, and the dashboard updates.
//
// FICTIONAL TRAINING RULE
// -----------------------
// "An open lead needs follow-up if 7 or more days have passed since last
// contact." This rule was invented for teaching. It is NOT a real sales
// best practice. Real teams choose their own rules.

// TypeScript infers `number` here. No annotation needed.
export const FOLLOW_UP_AFTER_DAYS = 7;

// Inputs: two primitives. Output: one boolean.
export function needsFollowUp(
  isClosed: boolean,
  daysSinceLastContact: number,
): boolean {
  if (isClosed) {
    return false; // closed leads never need follow-up
  }
  return daysSinceLastContact >= FOLLOW_UP_AFTER_DAYS;
}

// Input: an array of inline-typed objects. We only list the two fields this
// function reads, so any lead that has those fields can be passed in.
export function countFollowUps(
  leads: { isClosed: boolean; daysSinceLastContact: number }[],
): number {
  let count = 0;
  for (const lead of leads) {
    if (needsFollowUp(lead.isClosed, lead.daysSinceLastContact)) {
      count = count + 1;
    }
  }
  return count;
}

// Total budget of leads that are still open.
export function sumOpenBudgetUsd(
  leads: { budgetUsd: number; isClosed: boolean }[],
): number {
  let total = 0;
  for (const lead of leads) {
    if (!lead.isClosed) {
      total = total + lead.budgetUsd;
    }
  }
  return total;
}

// 12000 -> "$12,000"
export function formatBudgetUsd(budgetUsd: number): string {
  return "$" + budgetUsd.toLocaleString("en-US");
}

// `number | null` means: a user id OR nothing. TypeScript forces us to handle
// null before using the value as a number.
export function assignedLabel(assignedUserId: number | null): string {
  if (assignedUserId === null) {
    return "Unassigned";
  }
  return "User #" + assignedUserId;
}
