// LESSON 9 - Translating a product rule into typed logic
//
// FICTIONAL TRAINING RULE (invented for this class, not real sales advice):
//   "An open lead needs follow-up if at least 7 days have passed since
//    the last contact."
//
// Translate it in 4 steps:
//   1. Inputs   -> isClosed (boolean), daysSinceLastContact (number)
//   2. Output   -> boolean (follow-up needed: yes/no)
//   3. Edge case-> closed leads never need follow-up
//   4. Boundary -> "at least 7" means >= 7, so exactly 7 days counts
//
// The real implementation lives in ../lead-rules.ts (needsFollowUp), because
// the dashboard uses it too. This file shows the rule being checked on cases.

import { needsFollowUp } from "../lead-rules";

export function runLesson09(): void {
  const cases: {
    label: string;
    isClosed: boolean;
    daysSinceLastContact: number;
    expected: boolean;
  }[] = [
    { label: "open, 9 days", isClosed: false, daysSinceLastContact: 9, expected: true },
    { label: "open, exactly 7 days", isClosed: false, daysSinceLastContact: 7, expected: true },
    { label: "open, 6 days", isClosed: false, daysSinceLastContact: 6, expected: false },
    { label: "closed, 30 days", isClosed: true, daysSinceLastContact: 30, expected: false },
  ];

  for (const testCase of cases) {
    const actual = needsFollowUp(testCase.isClosed, testCase.daysSinceLastContact);
    const mark = actual === testCase.expected ? "ok  " : "FAIL";
    console.log("[09]", mark, testCase.label, "->", actual);
  }
}
