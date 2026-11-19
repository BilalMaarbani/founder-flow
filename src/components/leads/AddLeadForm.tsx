import { useState, type FormEvent } from "react";
import type { NewLead } from "./lead";

type AddLeadFormProps = {
  // Typed callback prop. The form does NOT change the leads list itself.
  // It only tells the parent: "the user wants to add THIS lead".
  onAddLead: (newLead: NewLead) => void;
};

// Turns the text of a number field into a whole number, or null if invalid.
// "12" -> 12, " 7 " -> 7, "abc" -> null, "2.5" -> null, "-3" -> null
function parseWholeNumber(text: string): number | null {
  const value = Number(text.trim());
  if (!Number.isInteger(value) || value < 0) {
    return null;
  }
  return value;
}

// LOCAL state: the field text and the error message.
// Only this form needs them while the user is typing, so they live here,
// not in the parent.
export function AddLeadForm({ onAddLead }: AddLeadFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [budgetText, setBudgetText] = useState("");
  const [daysText, setDaysText] = useState("0");
  const [ownerText, setOwnerText] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page

    // 1. Validate. On any error: show a message and KEEP what the user typed.
    const cleanName = companyName.trim();
    if (cleanName === "") {
      setFormError("Enter a company name.");
      return;
    }

    const budgetUsd = parseWholeNumber(budgetText);
    if (budgetUsd === null) {
      setFormError("Enter a budget as a whole number of 0 or more.");
      return;
    }

    const daysSinceLastContact = parseWholeNumber(daysText);
    if (daysSinceLastContact === null) {
      setFormError("Enter days since last contact as a whole number of 0 or more.");
      return;
    }

    // Owner is optional: empty means "Unassigned" (null).
    let assignedUserId: number | null = null;
    if (ownerText.trim() !== "") {
      const ownerId = parseWholeNumber(ownerText);
      if (ownerId === null || ownerId === 0) {
        setFormError("Enter an owner ID as a positive whole number, or leave it empty.");
        return;
      }
      assignedUserId = ownerId;
    }

    // 2. Valid: send the new lead up to the state owner.
    onAddLead({
      companyName: cleanName,
      budgetUsd,
      daysSinceLastContact,
      assignedUserId,
    });

    // 3. Reset the form for the next lead.
    setCompanyName("");
    setBudgetText("");
    setDaysText("0");
    setOwnerText("");
    setFormError(null);
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="add-lead-heading"
      aria-describedby={formError ? "add-lead-error" : undefined}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h3 id="add-lead-heading" className="font-medium text-slate-900">
        Add a lead
      </h3>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm text-slate-700">
          Company name
          <input
            type="text"
            name="companyName"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm text-slate-700">
          Budget (USD)
          <input
            type="text"
            inputMode="numeric"
            name="budgetUsd"
            value={budgetText}
            onChange={(event) => setBudgetText(event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm text-slate-700">
          Days since last contact
          <input
            type="text"
            inputMode="numeric"
            name="daysSinceLastContact"
            value={daysText}
            onChange={(event) => setDaysText(event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm text-slate-700">
          Owner ID (optional)
          <input
            type="text"
            inputMode="numeric"
            name="assignedUserId"
            value={ownerText}
            onChange={(event) => setOwnerText(event.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {formError && (
        <p
          id="add-lead-error"
          role="alert"
          className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Add lead
      </button>
    </form>
  );
}
