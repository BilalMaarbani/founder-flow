// LESSON 6 - Typed function parameters and return values
//
//   function name(param: type, param: type): returnType { ... }
//
// Parameters = what goes IN. Return type = what comes OUT.
// Together they are the function's contract.

import { formatBudgetUsd } from "../lead-rules";

// In: a number. Out: a string.
function describeBudget(budgetUsd: number): string {
  return "Budget is " + formatBudgetUsd(budgetUsd);
}

// In: a text and a number. Out: a boolean.
function isBigDeal(companyName: string, budgetUsd: number): boolean {
  return budgetUsd >= 20000 && companyName.length > 0;
}

// `void` = returns nothing useful.
function logLead(companyName: string): void {
  console.log("[06] lead:", companyName);
}

export function runLesson06(): void {
  logLead("Kestrel Robotics");
  console.log("[06]", describeBudget(58000));
  console.log("[06] big deal?", isBigDeal("Kestrel Robotics", 58000));

  // These would be compiler errors (see lesson 7):
  //   describeBudget("58000");    // string given, number expected
  //   isBigDeal("Kestrel");       // missing the second argument
}
