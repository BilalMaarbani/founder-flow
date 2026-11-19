// LESSON 4 - Typed arrays
//
//   string[]   an array where EVERY item is a string
//   number[]   an array where EVERY item is a number
//
// An empty array has nothing to infer from, so we annotate it.

export function runLesson04(): void {
  const companyNames: string[] = ["Brightpath Logistics", "Orbit Learning"];
  const budgetsUsd: number[] = [24000, 6200, 42000];

  companyNames.push("Kestrel Robotics"); // ok: a string
  // companyNames.push(404);             // error: a number is not a string

  const contactedLeadIds: number[] = []; // starts empty, so annotate
  contactedLeadIds.push(3);
  contactedLeadIds.push(6);

  // Array methods keep the types: the callback parameter `budget` is a number.
  const budgetsInThousands = budgetsUsd.map((budget) => budget / 1000);

  // A loop: `total` starts as a number and stays a number.
  let totalBudgetUsd = 0;
  for (const budget of budgetsUsd) {
    totalBudgetUsd = totalBudgetUsd + budget;
  }

  console.log("[04] names:", companyNames.length, "| contacted:", contactedLeadIds);
  console.log("[04] in thousands:", budgetsInThousands, "| total:", totalBudgetUsd);
}
