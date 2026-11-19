// Instructor-owned checker for the student files. Students do not edit this.
// It only reports "done" or "todo"; it never throws.

import {
  exerciseBudgetsUsd,
  exerciseBudgetUsd,
  exerciseCompanyName,
  exerciseIsClosed,
  exerciseLead,
  formatBudget,
  isHighPriority,
  isHighValue,
  leadStage,
  ownerLabel,
  studentNeedsFollowUp,
  totalBudgets,
  wishlistCompanies,
} from "./student-exercises";
import {
  countRestocks,
  needsRestock,
  sampleInventory,
  supplierLabel,
} from "./challenge-inventory";

let doneCount = 0;
let totalCount = 0;

function check(label: string, passed: boolean): void {
  totalCount = totalCount + 1;
  if (passed) {
    doneCount = doneCount + 1;
  }
  console.log(passed ? "  done" : "  todo", label);
}

export function runStudentChecks(): void {
  check("2a  leadStage is \"new\"", leadStage === "new");
  check("2b  wishlistCompanies has 2 names", wishlistCompanies.length === 2);

  check("3   real company name", exerciseCompanyName !== "TODO" && exerciseCompanyName.length > 0);
  check("3   budget above zero, lead still open", exerciseBudgetUsd > 0 && !exerciseIsClosed);

  check("4a  4+ budgets", exerciseBudgetsUsd.length >= 4);
  check("4b  totalBudgets([100, 250, 50]) is 400", totalBudgets([100, 250, 50]) === 400);

  check(
    "5   exerciseLead filled in",
    exerciseLead.id > 0 &&
      exerciseLead.companyName !== "TODO" &&
      exerciseLead.budgetUsd > 0,
  );

  check("6a  formatBudget(12000) is \"$12,000\"", formatBudget(12000) === "$12,000");
  check(
    "6b  isHighValue: 20000 yes, 19999 no",
    isHighValue(20000) && !isHighValue(19999),
  );

  check(
    "8   ownerLabel(null) and ownerLabel(101)",
    ownerLabel(null) === "Unassigned" && ownerLabel(101) === "User #101",
  );

  check(
    "9a  studentNeedsFollowUp: 7 days yes, 6 days no, closed no",
    studentNeedsFollowUp(false, 7) &&
      !studentNeedsFollowUp(false, 6) &&
      !studentNeedsFollowUp(true, 30),
  );
  check(
    "9b  isHighPriority boundaries and closed leads",
    isHighPriority(false, 20000, 3) &&
      !isHighPriority(false, 19999, 10) &&
      !isHighPriority(false, 20000, 2) &&
      !isHighPriority(true, 50000, 30),
  );

  check(
    "C1  needsRestock rule",
    needsRestock(10, 10, false) &&
      needsRestock(4, 10, false) &&
      !needsRestock(11, 10, false) &&
      !needsRestock(0, 5, true),
  );
  check(
    "C2  supplierLabel(null) and supplierLabel(7)",
    supplierLabel(null) === "No supplier" && supplierLabel(7) === "Supplier #7",
  );
  check("C3  countRestocks(sampleInventory) is 2", countRestocks(sampleInventory) === 2);

  console.log(`\n  ${doneCount} of ${totalCount} exercise checks done.`);
}
