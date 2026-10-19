import { useEffect, useMemo, useState } from "react";
import api, { apiEndpoints } from "../api/client";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

const seed = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Atlassian",
    location: "Bengaluru, India",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "₹12–18 LPA",
    match: 96,
    posted: "2 days ago",
    logo: "A",
    tone: "bg-blue-100 text-blue-700",
    skills: ["React", "TypeScript", "CSS"],
    description:
      "Build thoughtful product experiences with a collaborative product engineering team.",
  },
  {
    id: "2",
    title: "Software Engineer I",
    company: "Razorpay",
    location: "Bengaluru, India",
    type: "Full-time",
    workMode: "On-site",
    salary: "₹10–16 LPA",
    match: 91,
    posted: "1 day ago",
    logo: "R",
    tone: "bg-emerald-100 text-emerald-700",
    skills: ["JavaScript", "Node.js", "SQL"],
    description:
      "Create reliable payment experiences used by businesses across India.",
  },
  {
    id: "3",
    title: "Graduate Engineer Trainee",
    company: "Freshworks",
    location: "Chennai, India",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "₹7–10 LPA",
    match: 87,
    posted: "3 days ago",
    logo: "F",
    tone: "bg-orange-100 text-orange-700",
    skills: ["Java", "REST APIs", "Problem solving"],
    description:
      "Start your engineering career on customer-focused SaaS products.",
  },
  {
    id: "4",
    title: "Junior Full Stack Developer",
    company: "Postman",
    location: "Remote, India",
    type: "Full-time",
    workMode: "Remote",
    salary: "₹9–14 LPA",
    match: 84,
    posted: "Today",
    logo: "P",
    tone: "bg-rose-100 text-rose-700",
    skills: ["React", "Node.js", "MongoDB"],
    description:
      "Help developers build and test APIs with delightful, dependable tools.",
  },
  {
    id: "5",
    title: "Associate Software Developer",
    company: "PhonePe",
    location: "Pune, India",
    type: "Full-time",
    workMode: "On-site",
    salary: "₹8–13 LPA",
    match: 81,
    posted: "4 days ago",
    logo: "P",
    tone: "bg-violet-100 text-violet-700",
    skills: ["Java", "Spring Boot", "Git"],
    description:
      "Work on scalable services and meaningful consumer-facing features.",
  },
  {
    id: "6",
    title: "UI Engineer Intern",
    company: "CRED",
    location: "Bengaluru, India",
    type: "Internship",
    workMode: "Hybrid",
    salary: "₹35–50k/month",
    match: 79,
    posted: "5 days ago",
    logo: "C",
    tone: "bg-slate-900 text-white",
    skills: ["React", "Tailwind CSS", "Figma"],
    description:
      "Partner with design and engineering to deliver polished interfaces.",
  },
];
export default function Jobs() {
  const [jobs, setJobs] = useState(seed),
    [query, setQuery] = useState(""),
    [mode, setMode] = useState("All work modes"),
    [sort, setSort] = useState("Best match"),
    [loading, setLoading] = useState(false),
    [saved, setSaved] = useState([]),
    [apiStatus, setApiStatus] = useState("preview");
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (!base) return;
    setLoading(true);
    api
      .get(apiEndpoints.jobs)
      .then((r) => {
        setJobs(Array.isArray(r.data) ? r.data : r.data.content || seed);
        setApiStatus("live");
      })
      .catch(() => setApiStatus("preview"))
      .finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(
    () =>
      jobs
        .filter(
          (j) =>
            `${j.title} ${j.company} ${j.location} ${(j.skills || []).join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (mode === "All work modes" || j.workMode === mode),
        )
        .sort((a, b) =>
          sort === "Best match"
            ? (b.match || 0) - (a.match || 0)
            : sort === "Newest"
              ? 0
              : (a.title || "").localeCompare(b.title || ""),
        ),
    [jobs, query, mode, sort],
  );
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand">
          <Sparkles size={14} /> AI-powered discovery
        </div>
        <h1 className="mt-2 font-['Manrope'] text-3xl font-extrabold tracking-tight">
          Find your next opportunity
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Roles surfaced from your skills, projects and career goals.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-soft sm:p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_210px_170px_auto]">
          <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Role, company or skill..."
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={15} />
              </button>
            )}
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <MapPin size={16} className="text-slate-400" />
            <select
              className="w-full bg-transparent py-3 text-sm outline-none"
              defaultValue="Anywhere"
            >
              <option>Anywhere</option>
              <option>Bengaluru</option>
              <option>Pune</option>
              <option>Remote</option>
            </select>
            <ChevronDown size={14} />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full bg-transparent py-3 text-sm outline-none"
            >
              <option>All work modes</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </label>
          <button className="rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-white hover:bg-[#7770ff]">
            Search jobs
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          <span className="font-extrabold text-ink">
            {filtered.length} opportunities
          </span>{" "}
          matched to you{" "}
          <span className="ml-1 rounded-md bg-[#e5f8ee] px-2 py-1 text-[10px] font-extrabold text-emerald-700">
            AI ranked
          </span>
        </p>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          Sort by{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-ink outline-none"
          >
            <option>Best match</option>
            <option>Newest</option>
            <option>Role A–Z</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((j) => (
          <article
            key={j.id}
            className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-indigo-200 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold ${j.tone || "bg-indigo-100 text-brand"}`}
              >
                {j.logo || j.company?.[0] || "J"}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-extrabold">{j.title}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {j.company} <span className="mx-1.5">·</span>
                  {j.location}
                </p>
              </div>
              <button
                onClick={() =>
                  setSaved((s) =>
                    s.includes(j.id)
                      ? s.filter((x) => x !== j.id)
                      : [...s, j.id],
                  )
                }
                className={`rounded-xl border p-2.5 ${saved.includes(j.id) ? "border-brand bg-[#efeeff] text-brand" : "border-slate-200 text-slate-400 hover:text-brand"}`}
                aria-label="Save job"
              >
                <Bookmark
                  size={17}
                  fill={saved.includes(j.id) ? "currentColor" : "none"}
                />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600">
                {j.type || "Full-time"}
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600">
                {j.workMode || "Hybrid"}
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600">
                {j.salary || "Salary not listed"}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {j.description ||
                "Join a product team and help build reliable, user-focused software."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(j.skills || []).slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-sm font-extrabold text-emerald-700">
                  {j.match || 80}% match
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  {j.posted || "Recently posted"}
                </p>
              </div>
              <Link
                to={`/jobs/${j.id}`}
                state={{ job: j }}
                className="rounded-xl bg-[#efeeff] px-4 py-2.5 text-xs font-extrabold text-brand hover:bg-[#e4e2ff]"
              >
                View details <span className="ml-1">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      {loading && (
        <p className="text-center text-sm text-slate-500">
          Loading jobs from your server…
        </p>
      )}
      {!filtered.length && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <BriefcaseBusiness className="mx-auto text-slate-300" size={32} />
          <h3 className="mt-3 font-extrabold">No jobs found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or work mode.
          </p>
        </div>
      )}
      <p className="text-center text-xs text-slate-400">
        {apiStatus === "live"
          ? "Showing jobs from the connected Spring Boot API."
          : "Showing demo jobs. Connect your Spring Boot API to load live results."}
      </p>
    </div>
  );
}
