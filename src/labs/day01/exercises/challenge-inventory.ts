// FINAL INDEPENDENT CHALLENGE - typed inventory rule
//
// Context: a small shop tracks stock. Use ONLY today's tools:
// string, number, boolean, `| null`, arrays, inline object shapes,
// typed parameters and return values. No `any`, no interface/type.
//
// FICTIONAL TRAINING RULE:
//   An item needs restocking when
//     - it is NOT discontinued, AND
//     - quantityInStock is at or below reorderLevel.
//   Discontinued items never need restocking.
//
// Item fields: sku (string), quantityInStock (number), reorderLevel (number),
//              isDiscontinued (boolean), supplierId (number | null)

// TODO C1: implement the rule.
export function needsRestock(
  quantityInStock: number,
  reorderLevel: number,
  isDiscontinued: boolean,
): boolean {
  return false;
}

// TODO C2: "Supplier #<id>" or "No supplier" when supplierId is null.
export function supplierLabel(supplierId: number | null): string {
  return "TODO";
}

// TODO C3: count how many items in the array need restocking.
//          Use needsRestock inside your loop.
export function countRestocks(
  items: { quantityInStock: number; reorderLevel: number; isDiscontinued: boolean }[],
): number {
  return 0;
}

// Sample data for checking your work (do not change the type).
export const sampleInventory: {
  sku: string;
  quantityInStock: number;
  reorderLevel: number;
  isDiscontinued: boolean;
  supplierId: number | null;
}[] = [
  { sku: "TSHIRT-M", quantityInStock: 4, reorderLevel: 10, isDiscontinued: false, supplierId: 7 },
  { sku: "MUG-BLUE", quantityInStock: 10, reorderLevel: 10, isDiscontinued: false, supplierId: null },
  { sku: "CAP-RED", quantityInStock: 25, reorderLevel: 10, isDiscontinued: false, supplierId: 7 },
  { sku: "POSTER-OLD", quantityInStock: 0, reorderLevel: 5, isDiscontinued: true, supplierId: 3 },
];
