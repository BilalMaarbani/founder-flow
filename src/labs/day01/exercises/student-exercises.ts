// STUDENT EXERCISES - Week 05 Day 01
//
// Edit THIS file. Search for "TODO" to find every task.
// The starter code compiles, but it is intentionally incomplete.
// Check your progress any time with:   npm run lab:day1
// (Unfinished tasks show as "todo", finished ones as "done".)
//
// Rules for today:
//   - No `any`.
//   - Write object shapes inline (no interface/type yet - that is later).
//   - If you see a compiler error, READ it, LOCATE it, EXPLAIN it, FIX it.
//   - Reference examples live in ../reference/ - peek when stuck.

// ---------------------------------------------------------------------
// EXERCISE 1 - What TypeScript adds (answer in comments)
// ---------------------------------------------------------------------
// TODO 1: In one sentence, write what TypeScript checks and WHEN it checks it.
//   My answer:
//
// TODO 1b: Do types exist when the JavaScript runs in the browser? Yes / No, why?
//   My answer:

// ---------------------------------------------------------------------
// EXERCISE 2 - Inference vs annotation
// ---------------------------------------------------------------------
// TODO 2a: Change the value to "new". Do NOT write a type - let TS infer it.
//          Hover over `leadStage`. What type does the editor show? ____
//          Now change `let` to `const` and hover again. What changed? ____
export let leadStage = "TODO";

// TODO 2b: This array starts empty, so TypeScript needs your help.
//          Annotate it as a list of strings, then push two company names.
export const wishlistCompanies: string[] = [];

// ---------------------------------------------------------------------
// EXERCISE 3 - string, number, boolean
// ---------------------------------------------------------------------
// TODO 3: Replace the placeholder values with a real lead. Keep the types.
export const exerciseCompanyName: string = "TODO";
export const exerciseBudgetUsd: number = 0;
export const exerciseIsClosed: boolean = true;

// ---------------------------------------------------------------------
// EXERCISE 4 - Typed arrays
// ---------------------------------------------------------------------
// TODO 4a: Put at least 4 budgets in this array.
export const exerciseBudgetsUsd: number[] = [];

// TODO 4b: Compute the total of exerciseBudgetsUsd with a loop.
export function totalBudgets(budgetsUsd: number[]): number {
  // TODO: loop over budgetsUsd and add each budget to a running total
  return 0;
}

// ---------------------------------------------------------------------
// EXERCISE 5 - Inline object shape
// ---------------------------------------------------------------------
// TODO 5: Fill in every field of your own lead. assignedUserId may be null.
export const exerciseLead: {
  id: number;
  companyName: string;
  budgetUsd: number;
  daysSinceLastContact: number;
  isClosed: boolean;
  assignedUserId: number | null;
} = {
  id: 0,
  companyName: "TODO",
  budgetUsd: 0,
  daysSinceLastContact: 0,
  isClosed: false,
  assignedUserId: null,
};

// ---------------------------------------------------------------------
// EXERCISE 6 - Function parameters and return types
// ---------------------------------------------------------------------
// TODO 6a: Return the budget formatted like "$12,000".
//          Hint: "$" + budgetUsd.toLocaleString("en-US")
export function formatBudget(budgetUsd: number): string {
  return "TODO";
}

// TODO 6b: A lead is "high value" when its budget is at least 20000.
export function isHighValue(budgetUsd: number): boolean {
  return false;
}

// ---------------------------------------------------------------------
// EXERCISE 7 - Compiler errors (do this one in ../reference/07-compiler-errors.ts)
// ---------------------------------------------------------------------
// TODO 7: Uncomment ERROR 1, 3 and 5 one at a time. For each, write here:
//   - the error code (TSxxxx):
//   - what it means, in your own words:
//   - how you fixed it:
//   Then comment the error out again so `npm run typecheck` passes.

// ---------------------------------------------------------------------
// EXERCISE 8 - Nullable values
// ---------------------------------------------------------------------
// TODO 8: Return "Unassigned" when assignedUserId is null,
//         otherwise return "User #<id>", e.g. "User #101".
export function ownerLabel(assignedUserId: number | null): string {
  return "TODO";
}

// ---------------------------------------------------------------------
// EXERCISE 9 - Product rule -> typed logic (FICTIONAL TRAINING RULE)
// ---------------------------------------------------------------------
// 9a - the class rule (the dashboard uses a finished version in ../lead-rules.ts).
// Rule: an open lead needs follow-up if at least 7 days have passed since
//       the last contact. Closed leads never need follow-up.
// TODO 9a: Implement it WITHOUT looking at lead-rules.ts first.
export function studentNeedsFollowUp(
  isClosed: boolean,
  daysSinceLastContact: number,
): boolean {
  return false;
}

// 9b - a second rule, same skills.
// Rule: an open lead is HIGH PRIORITY if its budget is at least 20000
//       AND at least 3 days have passed since last contact.
//       Closed leads are never high priority.
// TODO 9b: Implement it. Think: inputs, output, edge case, boundary.
export function isHighPriority(
  isClosed: boolean,
  budgetUsd: number,
  daysSinceLastContact: number,
): boolean {
  return false;
}
