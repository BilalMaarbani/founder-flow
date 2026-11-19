import { useState } from "react";

export {};

type FollowUpStatus = "due" | "not-due" | "closed";

type Lead = {
  id: number;
  companyName: string;
  daySinceLastContact: number;
  isClosed: boolean;
  contactEmail?: string;
};

const leads: Lead[] = [
  {
    id: 1,
    companyName: "Acme Inc.",
    daySinceLastContact: 10,
    isClosed: false,
    contactEmail: "john@acme.com",
  },
  {
    id: 2,
    companyName: "Globex Corporation",
    daySinceLastContact: 5,
    isClosed: false,
  },
  {
    id: 3,
    companyName: "Soylent Corp.",
    daySinceLastContact: 20,
    isClosed: true,
  },
];

function getFollowUpStatus(lead: Lead): FollowUpStatus {
  if (lead.isClosed) {
    return "closed";
  } else if (lead.daySinceLastContact >= 7) {
    return "due";
  } else {
    return "not-due";
  }
}

function getEmailLabel(email?: string): string {
  if (email) {
    return `Contact: ${email}`;
  } else {
    return "No contact email available";
  }
}

interface LeadSummary {
  id: number;
  companyName: string;
  email: string;
  status: FollowUpStatus;
}

function toSummary(lead: Lead): LeadSummary {
  return {
    id: lead.id,
    companyName: lead.companyName,
    email: getEmailLabel(lead.contactEmail),
    status: getFollowUpStatus(lead),
  };
}

const followUpLeads: LeadSummary[] = leads
  .filter((lead) => {
    return getFollowUpStatus(lead) === "due";
  })
  .map(toSummary);

console.log(followUpLeads);

type LeadCardProps = {
  id: number;
  companyName: string;
  daysSinceLastContact: number;
  status: FollowUpStatus;
};

const x = "hello";
const z = "world";

const data: LeadCardProps[] = [
  {
    id: 1,
    companyName: "Acme Inc.",
    daysSinceLastContact: 10,
    status: "due",
  },
  {
    id: 2,
    companyName: "Globex Corporation",
    daysSinceLastContact: 5,
    status: "not-due",
  },
  {
    id: 3,
    companyName: x + "-" + z,
    // companyName: `${x} - ${z}`,
    daysSinceLastContact: 20,
    status: "closed",
  },
];

function LeadCard({ data }: { data: LeadCardProps }) {
  return (
    <article>
      <h2>{data.companyName}</h2>
      <p>Days since last contact: {data.daysSinceLastContact}</p>
    </article>
  );
}

{
  data.map((leadData) => <LeadCard key={leadData.id} data={leadData} />);
}

function RequestDetails({ status }: { status: FollowUpStatus }) {
  return (
    <article>
      <p>Status: {status}</p>
    </article>
  );
}

{
  data.map((leadData) => (
    <RequestDetails key={leadData.id} status={leadData.status} />
  ));
}

export default function Counter() {
  const [count, setCount] = useState<number>(2);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <section>
      <p>Count: {count}</p>
      <button type="button" onClick={handleIncrement}>
        Add one
      </button>
    </section>
  );
}

type Attendee = {
  id: number;
  name: string;
  isPresent: boolean;
};

const initialAttendees: Attendee[] = [
  { id: 1, name: "Maya", isPresent: false },
  { id: 2, name: "Omar", isPresent: true },
];

function AttendanceBoard() {
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);
}

function AttendanceKrier() {
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);
}
