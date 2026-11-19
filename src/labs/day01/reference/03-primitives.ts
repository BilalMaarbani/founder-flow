// LESSON 3 - string, number, boolean
//
//   string   text                 "Cedar & Pine Studio"
//   number   any number           8500   0.5   -3
//   boolean  true or false        true
//
// Once a variable has a type, you can only put matching values in it.

export function runLesson03(): void {
  let companyName: string = "Cedar & Pine Studio";
  let budgetUsd: number = 8500;
  let isClosed: boolean = false;

  // Reassigning with the SAME type is fine:
  companyName = "Cedar & Pine Studio Ltd";
  budgetUsd = 9000;
  isClosed = true;

  // Reassigning with a DIFFERENT type is a compiler error (see lesson 7):
  //   budgetUsd = "9000";

  // Useful operations that are safe because the types are known:
  const upperName = companyName.toUpperCase(); // string method
  const budgetWithTax = budgetUsd * 1.2; // number maths
  const isOpen = !isClosed; // boolean logic

  console.log("[03]", upperName, budgetWithTax, isOpen);
}
