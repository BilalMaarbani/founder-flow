// LESSON 8 - Nullable values:  number | null
//
// Real data has gaps. A lead may have no assigned user yet.
//   assignedUserId: number | null    means "a number OR null"
//
// TypeScript will not let you treat the value as a plain number until you
// have checked for null. This "narrowing" prevents a classic crash:
//   "Cannot read properties of null"

function describeOwner(assignedUserId: number | null): string {
  // Compile error if we skip the check:
  //   return "User #" + assignedUserId.toFixed(0);   // 'assignedUserId' is possibly 'null'

  if (assignedUserId === null) {
    return "Nobody owns this lead yet";
  }
  // Below this line TypeScript knows assignedUserId is a number.
  return "Owned by user #" + assignedUserId.toFixed(0);
}

export function runLesson08(): void {
  console.log("[08]", describeOwner(101));
  console.log("[08]", describeOwner(null));

  // A nullable value can hold either kind of value over time:
  let ownerId: number | null = null;
  ownerId = 102;
  console.log("[08] owner id after assignment:", ownerId);
}
