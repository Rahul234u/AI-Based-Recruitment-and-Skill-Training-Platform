import { useEffect, useState } from "react";
import api, { apiEndpoints } from "../api/client";
import {
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  Search,
} from "lucide-react";
const demo = [
  {
    id: 1,
    role: "Frontend Engineer",
    company: "Atlassian",
    location: "Bengaluru · Hybrid",
    date: "Oct 15, 2026",
    status: "In review",
    color: "bg-amber-50 text-amber-700",
    initial: "A",
  },
  {
    id: 2,
    role: "Software Engineer I",
    company: "Razorpay",
    location: "Bengaluru · On-site",
    date: "Oct 12, 2026",
    status: "Applied",
    color: "bg-blue-50 text-blue-700",
    initial: "R",
  },
  {
    id: 3,
    role: "React Developer",
    company: "Zeta",
    location: "Pune · Hybrid",
    date: "Oct 10, 2026",
    status: "Interview",
    color: "bg-violet-50 text-violet-700",
    initial: "Z",
  },
  {
    id: 4,
    role: "Graduate Engineer Trainee",
    company: "Freshworks",
    location: "Chennai · Hybrid",
    date: "Oct 06, 2026",
    status: "Applied",
    color: "bg-blue-50 text-blue-700",
    initial: "F",
  },
];
export default function Applications() {
  const [apps, setApps] = useState(demo),
    [filter, setFilter] = useState("All"),
    [query, setQuery] = useState("");
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (base)
      api
        .get(apiEndpoints.applications)
        .then((r) =>
          setApps(Array.isArray(r.data) ? r.data : r.data.content || demo), 
        )
        .catch(() => {});
  }, []);
  const shown = apps.filter(
    (a) =>
      (filter === "All" || a.status === filter) &&
      `${a.role} ${a.company}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
          Your job search
        </p>
        <h1 className="mt-2 font-['Manrope'] text-3xl font-extrabold tracking-tight">
          My applications
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Keep track of every opportunity, all in one place.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total applications", value: apps.length },
          {
            label: "In review",
            value: apps.filter((a) => a.status === "In review").length,
          },
          {
            label: "Interviews",
            value: apps.filter((a) => a.status === "Interview").length,
          },
        ].map((x) => (
          <div
            key={x.label}
            className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft"
          >
            <p className="text-sm font-semibold text-slate-500">{x.label}</p>
            <p className="mt-2 font-['Manrope'] text-3xl font-extrabold">
              {x.value}
            </p>
          </div>
        ))}
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-soft">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={19} className="text-brand" />
            <h2 className="font-extrabold">Application tracker</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3">
              <Search size={15} className="text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search applications"
                className="w-36 py-2 text-xs outline-none sm:w-44"
              />
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none"
            >
              <option>All</option>
              <option>Applied</option>
              <option>In review</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {shown.map((a) => (
            <div
              key={a.id}
              className="flex flex-wrap items-center gap-3 p-5 sm:flex-nowrap"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 font-extrabold text-slate-700">
                {a.initial || a.company?.[0]}
              </div>
              <div className="min-w-[150px] flex-1">
                <p className="text-sm font-extrabold">{a.role || a.jobTitle}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {a.company} · {a.location || "Location not listed"}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarDays size={14} />
                {a.date || a.appliedAt || "Recently"}
              </div>
              <span
                className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${a.color || "bg-blue-50 text-blue-700"}`}
              >
                {a.status || "Applied"}
              </span>
              <button
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-brand"
                aria-label="Open application"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          ))}
          {!shown.length && (
            <p className="p-10 text-center text-sm text-slate-500">
              No applications match these filters.
            </p>
          )}
        </div>
      </section>
      <p className="text-center text-xs text-slate-400">
        Application statuses update when your connected backend provides new
        information.
      </p>
    </div>
  );
}
