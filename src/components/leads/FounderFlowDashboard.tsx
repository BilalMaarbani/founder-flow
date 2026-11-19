"use client";
// "use client" is needed here (and only here) because this component uses
// useState, useEffect and handles clicks. Everything it imports runs in the
// browser too.

import { useEffect, useState } from "react";
import { AddLeadForm } from "./AddLeadForm";
import { DashboardSummary } from "./DashboardSummary";
import { FollowUpPriorities } from "./FollowUpPriorities";
import { GlobalDashboardFilter } from "./GlobalDashboardFilter";
import {
  getFilteredLeads,
  getFilterLabel,
  matchesFilter,
  readLeadsResponse,
  type Lead,
  type LeadFilter,
  type NewLead,
} from "./lead";
import { LeadsList } from "./LeadsList";
import { DashboardLoadError, DashboardLoading } from "./LeadsLoadStatus";

// Where the remote request is right now.
// "Empty" is NOT stored here: it is a "success" that returned 0 leads,
// so we calculate it from `leads` instead (see below).
type LoadStatus = "loading" | "success" | "error";

// STATE OWNER for the dashboard.
// It owns the ONE leads list and the ONE global filter choice. The summary,
// the follow-up list and the lead list all READ the filtered list; the form
// and the Remove buttons ask it to CHANGE the full list.
// So this is the lowest component that every one of them can reach.
export function FounderFlowDashboard() {
  // Source of truth IN THE BROWSER. It starts empty and is filled once by
  // GET /api/leads. After that, Add and Remove change only this local copy.
  const [leads, setLeads] = useState<Lead[]>([]);

  // IDs of the leads that came FROM THE SERVER. Only these have a working
  // /leads/[id] page. A lead added with the form lives only in this tab,
  // so the server cannot find it: its card gets no "View details" link.
  const [serverLeadIds, setServerLeadIds] = useState<number[]>([]);

  // Starts as "loading" because the request starts as soon as we mount.
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");

  // Retry counter. Changing it re-runs the effect below (a new request).
  const [loadAttempt, setLoadAttempt] = useState(0);

  // Load the leads from the server.
  // Runs after the first render, and again only when loadAttempt changes
  // (Retry). It does NOT re-run after Add/Remove, so local edits are never
  // overwritten by a surprise refetch.
  useEffect(() => {
    // AbortController lets us CANCEL the request if this component goes
    // away (or a newer request replaces this one) before it finishes.
    const controller = new AbortController();

    async function loadLeads() {
      try {
        // 1. Send the HTTP GET request and wait for the response headers.
        const response = await fetch("/api/leads", {
          signal: controller.signal,
        });

        // 2. fetch() does NOT throw on 404 or 500. We must check ourselves.
        //    response.ok is true only for status codes 200-299.
        if (!response.ok) {
          throw new Error(
            `GET /api/leads failed with status ${response.status}`,
          );
        }

        // 3. Read the body and parse the JSON text into a JS value.
        //    `unknown`: we do not trust it until we have checked it.
        const data: unknown = await response.json();

        // 4. Check the shape at RUNTIME (TypeScript cannot check network data).
        const loadedLeads = readLeadsResponse(data);
        if (loadedLeads === null) {
          throw new Error("GET /api/leads returned an unexpected shape");
        }

        // 5. Success: store the leads. 0 leads is still a success (Empty).
        setLeads(loadedLeads);
        setServerLeadIds(loadedLeads.map((lead) => lead.id));
        setLoadStatus("success");
      } catch (error) {
        // We cancelled on purpose (cleanup below): not a real error.
        if (controller.signal.aborted) {
          return;
        }
        // Details go to the developer console only. The user sees a
        // safe, friendly message in <DashboardLoadError>.
        console.error("Could not load leads:", error);
        setLoadStatus("error");
      }
    }

    loadLeads();

    // CLEANUP: React calls this before re-running the effect (Retry) and
    // when the component unmounts. Cancel the request that is still running.
    return () => controller.abort();
  }, [loadAttempt]);

  // Passed to DashboardLoadError as onRetry.
  function handleRetry() {
    setLoadStatus("loading"); // show the Loading state again right away
    setLoadAttempt((attempt) => attempt + 1); // triggers a new request
  }

  // The user's global filter choice. Stored, because nothing else can
  // calculate it. Only the choice is stored, never a filtered copy.
  const [filter, setFilter] = useState<LeadFilter>("all");

  // Short message for screen readers after add/remove (aria-live below).
  const [statusMessage, setStatusMessage] = useState("");

  // DERIVED on every render, never stored: it can't drift out of sync.
  // Every lead-dependent widget below reads filteredLeads.
  const filteredLeads = getFilteredLeads(leads, filter);

  const filterLabel = getFilterLabel(filter);
  const isFiltered = filter !== "all";

  // Passed to AddLeadForm as onAddLead.
  function handleAddLead(newLead: NewLead) {
    const lead: Lead = {
      id: Date.now(), // fine for local practice; real IDs come from a database later
      ...newLead,
      isClosed: false, // a brand-new lead is always open
    };
    // Functional setter: build a NEW array from the latest list.
    // Always the FULL list, whatever filter is active.
    setLeads((currentLeads) => [...currentLeads, lead]);

    if (matchesFilter(lead, filter)) {
      setStatusMessage(`Added ${lead.companyName}.`);
    } else {
      setStatusMessage(
        `Added ${lead.companyName}. It is hidden by the "${filterLabel}" filter.`,
      );
    }
  }

  // Passed to LeadsList as onRemoveLead (and on to each LeadCard as onRemove).
  function handleRemoveLead(leadId: number) {
    const removed = leads.find((lead) => lead.id === leadId);
    setLeads(filteredLeads.filter((lead) => lead.id !== leadId));
    if (removed) {
      setStatusMessage(`Removed ${removed.companyName}.`);
    }
  }

  // Empty states, so an empty widget always says WHY it is empty.
  const noMatchMessage = `No leads match the "${filterLabel}" filter.`;

  let leadsEmptyMessage = "No leads yet. Add your first lead above.";
  if (leads.length > 0) {
    leadsEmptyMessage = noMatchMessage;
  }

  let followUpEmptyMessage =
    "Nothing to follow up. Every open lead was contacted recently.";
  if (leads.length === 0) {
    followUpEmptyMessage = "No leads yet, so nothing to follow up.";
  } else if (filteredLeads.length === 0) {
    followUpEmptyMessage = noMatchMessage;
  } else if (filter === "closed") {
    followUpEmptyMessage = "Closed leads never need follow-up.";
  } else if (isFiltered) {
    followUpEmptyMessage = `Nothing to follow up. Every open lead in the "${filterLabel}" filter was contacted recently.`;
  }

  // The four UI states of a remote request:
  //   1. Loading -> skeleton, no numbers (so no fake "0 leads")
  //   2. Error   -> friendly message + Retry
  //   3. Empty   -> success with 0 leads (isEmpty, below)
  //   4. Success -> the full dashboard
  if (loadStatus === "loading") {
    return <DashboardLoading />;
  }
  if (loadStatus === "error") {
    return <DashboardLoadError onRetry={handleRetry} />;
  }

  // DERIVED, never stored: true when the list has no leads at all.
  const isEmpty = leads.length === 0;

  return (
    <>
      {isEmpty && (
        <div className="mt-6 rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center">
          <h2 className="font-medium text-slate-900">No leads yet</h2>
          <p className="mt-1 text-sm text-slate-600">
            Your lead list is empty, so every metric below is 0. Add your first
            lead with the form in the Sales leads section.
          </p>
        </div>
      )}

      <section aria-labelledby="dashboard-filter-heading" className="mt-6">
        <GlobalDashboardFilter
          filter={filter}
          onFilterChange={setFilter}
          shownCount={filteredLeads.length}
          totalCount={leads.length}
        />
      </section>

      <section aria-labelledby="summary-heading" className="mt-6">
        <h2 id="summary-heading" className="sr-only">
          {isFiltered ? `Summary for the "${filterLabel}" filter` : "Summary"}
        </h2>
        {isFiltered && filteredLeads.length === 0 && !isEmpty && (
          <p className="mb-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
            {noMatchMessage} Every metric below is 0.
          </p>
        )}
        <DashboardSummary
          leads={filteredLeads}
          filterLabel={isFiltered ? filterLabel : null}
        />
      </section>

      <section
        id="follow-ups"
        aria-labelledby="follow-ups-heading"
        className="mt-10"
      >
        <h2
          id="follow-ups-heading"
          className="text-lg font-semibold text-slate-900"
        >
          Follow-up priorities
          {isFiltered && (
            <span className="font-normal text-slate-600"> ({filterLabel})</span>
          )}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Longest time without contact first.
        </p>
        <FollowUpPriorities
          leads={filteredLeads}
          emptyMessage={followUpEmptyMessage}
        />
      </section>

      <section id="leads" aria-labelledby="leads-heading" className="mt-10">
        <h2 id="leads-heading" className="text-lg font-semibold text-slate-900">
          Sales leads
          {isFiltered && (
            <span className="font-normal text-slate-600"> ({filterLabel})</span>
          )}
        </h2>

        {/* Honest about persistence: there is no write API or database yet. */}
        <p className="mt-1 text-sm text-slate-600">
          Leads load from the server. Add and Remove only change this browser
          tab and are not saved: reloading the page brings back the original
          list. Only server leads have a details page.
        </p>

        <div className="mt-4">
          <AddLeadForm onAddLead={handleAddLead} />
        </div>

        {/* aria-live: screen readers announce add/remove results. */}
        <p aria-live="polite" className="mt-2 min-h-5 text-sm text-slate-700">
          {statusMessage}
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>

        <LeadsList
          leads={filteredLeads}
          emptyMessage={leadsEmptyMessage}
          detailLeadIds={serverLeadIds}
          onRemoveLead={handleRemoveLead}
        />
      </section>
    </>
  );
}
