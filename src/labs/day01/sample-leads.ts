// FounderFlow - mock leads (fictional companies, fictional numbers).
//
// Live-teaching idea: change a `daysSinceLastContact` value (try 6 -> 7, the
// boundary), flip an `isClosed`, or set an `assignedUserId` to null. Save and
// watch the dashboard follow-up count change.
//
// The type below is written INLINE on purpose. In Day 1 we only use the
// building blocks: string, number, boolean, `| null`, arrays and object shapes.
// Reusable named types come in a later session.

export const sampleLeads: {
  id: number;
  companyName: string;
  budgetUsd: number;
  daysSinceLastContact: number;
  isClosed: boolean;
  assignedUserId: number | null;
}[] = [
  {
    id: 1,
    companyName: "Brightpath Logistics",
    budgetUsd: 24000,
    daysSinceLastContact: 9,
    isClosed: false,
    assignedUserId: 101,
  },
  {
    id: 2,
    companyName: "Cedar & Pine Studio",
    budgetUsd: 8500,
    daysSinceLastContact: 2,
    isClosed: false,
    assignedUserId: 102,
  },
  {
    id: 3,
    companyName: "Lumen Health Labs",
    budgetUsd: 42000,
    daysSinceLastContact: 7,
    isClosed: false,
    assignedUserId: null,
  },
  {
    id: 4,
    companyName: "Atlas Freight Co",
    budgetUsd: 15000,
    daysSinceLastContact: 14,
    isClosed: true,
    assignedUserId: 101,
  },
  {
    id: 5,
    companyName: "Orbit Learning",
    budgetUsd: 6200,
    daysSinceLastContact: 6,
    isClosed: false,
    assignedUserId: 103,
  },
  {
    id: 6,
    companyName: "Kestrel Robotics",
    budgetUsd: 58000,
    daysSinceLastContact: 12,
    isClosed: false,
    assignedUserId: null,
  },
  {
    id: 7,
    companyName: "Harbor Light Bakery",
    budgetUsd: 3200,
    daysSinceLastContact: 1,
    isClosed: false,
    assignedUserId: 102,
  },
  {
    id: 8,
    companyName: "Pixelmint Games",
    budgetUsd: 19500,
    daysSinceLastContact: 21,
    isClosed: true,
    assignedUserId: 103,
  },
];
