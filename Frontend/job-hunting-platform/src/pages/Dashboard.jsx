import { useEffect, useState } from "react";
import api, { apiEndpoints } from "../api/client";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Flame,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
} from "lucide-react";

const sampleJobs = [
  {
    id: "1",
    company: "Atlassian",
    role: "Frontend Engineer",
    place: "Bengaluru · Hybrid",
    salary: "₹12–18 LPA",
    match: 96,
    color: "bg-blue-100 text-blue-700",
    logo: "A",
  },
  {
    id: "2",
    company: "Razorpay",
    role: "Software Engineer I",
    place: "Bengaluru · On-site",
    salary: "₹10–16 LPA",
    match: 91,
    color: "bg-emerald-100 text-emerald-700",
    logo: "R",
  },
  {
    id: "3",
    company: "Freshworks",
    role: "Graduate Engineer Trainee",
    place: "Chennai · Hybrid",
    salary: "₹7–10 LPA",
    match: 87,
    color: "bg-orange-100 text-orange-700",
    logo: "F",
  },
];
const metrics = [
  {
    label: "Jobs matched",
    value: "128",
    delta: "+18 this week",
    icon: Target,
    style: "bg-[#efeeff] text-brand",
  },
  {
    label: "Applications sent",
    value: "12",
    delta: "4 in review",
    icon: BriefcaseBusiness,
    style: "bg-[#e1f8ed] text-emerald-700",
  },
  {
    label: "Profile strength",
    value: "86%",
    delta: "+12% this month",
    icon: TrendingUp,
    style: "bg-[#fff1df] text-amber-700",
  },
];
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (base)
      api
        .get(apiEndpoints.dashboard)
        .then((r) => setSummary(r.data))
        .catch(() => {});
  }, []);
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Saturday, October 17, 2026
          </p>
          <h1 className="mt-1 font-['Manrope'] text-3xl font-extrabold tracking-tight">
            Good morning, Sanket <span>👋</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your next opportunity might be closer than you think.
          </p>
        </div>
        <Link
          to="/jobs"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 hover:bg-[#7770ff]"
        >
          <Search size={16} /> Find a job
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, delta, icon: Icon, style }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">
                {label}
              </span>
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${style}`}
              >
                <Icon size={19} />
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="font-['Manrope'] text-3xl font-extrabold">
                {summary?.[label.toLowerCase().replaceAll(" ", "")] ?? value}
              </p>
              <span className="text-xs font-bold text-emerald-600">
                {delta}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.55fr_.85fr]">
        <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#efeeff] text-brand">
                  <Sparkles size={18} />
                </span>
                <h2 className="text-lg font-extrabold">Top matches for you</h2>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Ranked by your resume skills and experience.
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden items-center gap-1 text-xs font-extrabold text-brand sm:flex"
            >
              View all <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {sampleJobs.map((j) => (
              <div
                key={j.id}
                className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0 sm:flex-nowrap"
              >
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold ${j.color}`}
                >
                  {j.logo}
                </div>
                <div className="min-w-[145px] flex-1">
                  <h3 className="text-sm font-extrabold">{j.role}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {j.company} · {j.place}
                  </p>
                  <p className="mt-1.5 text-xs font-bold text-slate-700">
                    {j.salary}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-emerald-700">
                      {j.match}%
                    </p>
                    <p className="text-[10px] text-slate-400">match</p>
                  </div>
                  <Link
                    to={`/jobs/${j.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:border-brand hover:text-brand"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/jobs"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 sm:hidden"
          >
            Explore all matches <ChevronRight size={16} />
          </Link>
        </section>
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold">Your next steps</h2>
              <span className="text-xs font-bold text-slate-400">2 of 4</span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 rounded-full bg-brand" />
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold">Create your account</p>
                  <p className="mt-1 text-xs text-slate-500">
                    You are ready to go.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold">Build your profile</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your basics are in place.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <UploadCloud size={18} className="shrink-0 text-brand" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Upload your latest resume</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Unlock better AI matches.
                  </p>
                  <Link
                    to="/resume"
                    className="mt-2 inline-block text-xs font-extrabold text-brand"
                  >
                    Upload resume →
                  </Link>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 size={18} className="shrink-0 text-slate-300" />
                <div>
                  <p className="text-sm font-bold text-slate-400">
                    Track your first application
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Your journey starts here.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#635bff] to-[#817aff] p-5 text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/20" />
            <div className="relative">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                <Flame size={18} />
              </span>
              <h2 className="mt-4 text-lg font-extrabold">
                Small steps, big moves.
              </h2>
              <p className="mt-2 text-xs leading-5 text-white/80">
                Candidates who apply consistently are more likely to find the
                right fit.
              </p>
              <Link
                to="/jobs"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-extrabold text-brand"
              >
                Find your next role <ChevronRight size={14} />
              </Link>
            </div>
          </section>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400">
        {summary
          ? "Live data loaded from your TalentPath API."
          : "Preview data is shown until your Spring Boot API is connected."}
      </p>
    </div>
  );
}
