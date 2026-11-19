// LESSON 5 - Inline typed object shapes
//
// A FounderFlow lead is several related values. We describe its "shape"
// right where we use it, with  { field: type; field: type }
//
// We write the shape INLINE today. It is repeated, and that is fine: the
// repetition is the reason reusable named types exist in a later session.

export function runLesson05(): void {
  const lead: {
    id: number;
    companyName: string;
    budgetUsd: number;
    daysSinceLastContact: number;
    isClosed: boolean;
    assignedUserId: number | null;
  } = {
    id: 3,
    companyName: "Lumen Health Labs",
    budgetUsd: 42000,
    daysSinceLastContact: 7,
    isClosed: false,
    assignedUserId: null, // nobody owns this lead yet
  };

  // Dot notation reads a field. The editor autocompletes the field names
  // because it knows the shape.
  console.log("[05]", lead.companyName, "budget:", lead.budgetUsd);

  // Changing a field with the right type is fine.
  lead.daysSinceLastContact = 8;

  // Typos and wrong types are caught (see lesson 7):
  //   lead.companyname = "x";   // property does not exist
  //   lead.isClosed = "no";     // string is not boolean

  console.log("[05] days since contact is now:", lead.daysSinceLastContact);
}
