// LESSON 7 - Compiler errors and how to read them
//
// Every error message has the same parts:
//
//   file.ts(12,5): error TS2322: Type 'string' is not assignable to type 'number'.
//   |       |  |        |        |
//   |       |  |        |        +-- the message: READ IT LITERALLY
//   |       |  |        +----------- error code (search it online)
//   |       |  +-------------------- column
//   |       +----------------------- line
//   +------------------------------- file
//
// Four-step habit:  READ -> LOCATE -> EXPLAIN in plain words -> FIX.
//
// Every error below is COMMENTED OUT so the project still builds.
// To practise: remove the `//` in front of ONE error, run `npm run typecheck`,
// read the message, explain it, then put the `//` back (or fix it).
// The messages quoted here were produced by the real compiler.
// Never "fix" an error by writing `any`. That hides the problem.

export function runLesson07(): void {
  // ---------------------------------------------------------------------
  // ERROR 1 - wrong type assigned to a variable
  //
  //   let budgetUsd: number = 12000;
  //   budgetUsd = "12000";
  //
  //   error TS2322: Type 'string' is not assignable to type 'number'.
  //
  //   Meaning: budgetUsd was declared as a number, but "12000" (with quotes)
  //   is text. Fix: remove the quotes -> budgetUsd = 12000;
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // ERROR 2 - wrong item added to a typed array
  //
  //   const companyNames: string[] = ["Orbit Learning"];
  //   companyNames.push(42);
  //
  //   error TS2345: Argument of type 'number' is not assignable to
  //   parameter of type 'string'.
  //
  //   Meaning: push() on a string[] only accepts strings.
  //   Fix: push a company name, e.g. companyNames.push("Kestrel Robotics");
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // ERROR 3 - wrong number of arguments to a function
  //
  //   needsFollowUp(7);
  //
  //   error TS2554: Expected 2 arguments, but got 1.
  //
  //   Meaning: needsFollowUp wants (isClosed, daysSinceLastContact).
  //   Fix: needsFollowUp(false, 7);
  //   (needsFollowUp is imported from ../lead-rules in lesson 9)
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // ERROR 4 - typo in a property name
  //
  //   const lead: { id: number; companyName: string } = { id: 1, companyName: "Orbit Learning" };
  //   console.log(lead.companyname);
  //
  //   error TS2551: Property 'companyname' does not exist on type
  //   '{ id: number; companyName: string; }'. Did you mean 'companyName'?
  //
  //   Meaning: property names are case sensitive. The compiler even suggests the fix.
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // ERROR 5 - using a value that might be null
  //
  //   function ownerText(assignedUserId: number | null): string {
  //     return assignedUserId.toFixed(0);
  //   }
  //
  //   error TS18047: 'assignedUserId' is possibly 'null'.
  //
  //   Meaning: if the value is null, .toFixed would crash at runtime.
  //   Fix: check first ->  if (assignedUserId === null) { return "none"; }
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // ERROR 6 - object missing a required property
  //
  //   const lead: { id: number; companyName: string; isClosed: boolean } =
  //     { id: 2, companyName: "Cedar & Pine Studio" };
  //
  //   error TS2741: Property 'isClosed' is missing in type
  //   '{ id: number; companyName: string; }' but required in type
  //   '{ id: number; companyName: string; isClosed: boolean; }'.
  //
  //   Fix: add isClosed: false to the object.
  // ---------------------------------------------------------------------

  // ---------------------------------------------------------------------
  // ERROR 7 - a function path that returns nothing
  //
  //   function priorityLabel(days: number): string {
  //     if (days > 7) {
  //       return "late";
  //     }
  //   }
  //
  //   error TS2366: Function lacks ending return statement and return type
  //   does not include 'undefined'.
  //
  //   Meaning: when days <= 7 the function returns nothing, but it promised a string.
  //   Fix: add  return "on track";  after the if.
  // ---------------------------------------------------------------------

  console.log("[07] Compiler errors are commented out. Open this file and try them one at a time.");
}
