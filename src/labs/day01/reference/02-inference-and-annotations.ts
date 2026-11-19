// LESSON 2 - Type inference vs explicit annotations
//
// Inference: TypeScript works out the type from the value you assign.
// Annotation: you write the type yourself with  `: type`.
//
// Rule of thumb for today:
//   - Let TypeScript infer when the value makes the type obvious.
//   - Write the type when there is no value to infer from (function
//     parameters, empty arrays) or when it makes a contract clearer.

export function runLesson02(): void {
  // Inferred. Hover over each name in your editor.
  //   `let`   -> the general type:  string / number / boolean
  //   `const` -> the exact value:   "Brightpath Logistics" / 24000 / false
  // (A const can never change, so TypeScript remembers the exact value.)
  let companyName = "Brightpath Logistics";
  let budgetUsd = 24000;
  let isClosed = false;
  companyName = "Brightpath Logistics Inc";
  budgetUsd = 26000;
  isClosed = true;

  // Annotated. Same types, but the annotation adds nothing here.
  const sameCompanyName: string = "Brightpath Logistics";

  // `let` that starts empty: TypeScript cannot guess, so we say it.
  let lastNoteWritten: string = "";
  lastNoteWritten = "Asked for a pricing call";

  console.log("[02] inferred:", companyName, budgetUsd, isClosed);
  console.log("[02] annotated:", sameCompanyName, "| note:", lastNoteWritten);
}
