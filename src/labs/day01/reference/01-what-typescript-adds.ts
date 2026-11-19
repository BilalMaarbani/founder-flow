// LESSON 1 - What TypeScript adds to JavaScript
//
// TypeScript = JavaScript + a checker that reads your code BEFORE it runs.
//   1. You write .ts
//   2. The compiler checks types   (npm run typecheck)
//   3. Types are erased -> plain JavaScript is what actually runs
//
// Types exist only while you write and check code. They do not exist at runtime.
// Open this file, hover over `daysSinceLastContact` in your editor, and read
// the tooltip. That tooltip is TypeScript talking.

export function runLesson01(): void {
  const daysSinceLastContact = 9;

  // In plain JavaScript this would "work" and give a surprising result:
  //   "9" + 1 === "91"   (a string, not 10)
  // TypeScript knows daysSinceLastContact is a number, so this is safe:
  const nextWeekDays = daysSinceLastContact + 7;

  console.log("[01] days now:", daysSinceLastContact, "| in 7 days:", nextWeekDays);

  // Compare with plain JavaScript behaviour (this runs fine, types or not):
  const fromAForm = "9"; // forms and URLs give you strings
  console.log('[01] JavaScript surprise: "9" + 1 =', fromAForm + 1);

  // Key point: the type information is gone once the code runs.
  // Run `npx tsc --noEmit` to ask the checker, without producing any files.
}
