import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api, { apiEndpoints } from "../api/client";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const demo = {
  id: "1",
  title: "Frontend Engineer",
  company: "Atlassian",
  location: "Bengaluru, India · Hybrid",
  salary: "₹12–18 LPA",
  type: "Full-time",
  match: 96,
  skills: ["React", "JavaScript", "TypeScript", "CSS", "REST APIs"],
  description:
    "Atlassian builds collaboration software that helps teams organize, discuss and complete shared work. You will work with designers, product managers and engineers to build accessible, high-quality product experiences.",
  responsibilities: [
    "Build responsive and accessible UI components with React.",
    "Collaborate with product and design to turn ideas into polished features.",
    "Write maintainable code and contribute to testing and code reviews.",
    "Improve performance, reliability and the developer experience.",
  ],
  requirements: [
    "Strong fundamentals in JavaScript, HTML and CSS.",
    "Hands-on experience with React and component-based UI.",
    "Comfort with Git, REST APIs and collaborative development.",
    "A learning mindset and clear communication.",
  ],
};

export default function JobDetails() {
  const { id } = useParams(),
    loc = useLocation();

  const [job, setJob] = useState(loc.state?.job || demo),
    [applied, setApplied] = useState(false),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (base)
      api
        .get(apiEndpoints.job(id))
        .then((r) => setJob({ ...demo, ...r.data }))
        .catch(() => {});
  }, [id]);

  const apply = async () => {
    setBusy(true);
    setMessage("");
    
    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      if (!base)
        throw new Error(
          "Preview mode: configure VITE_API_BASE_URL to submit applications to Spring Boot.",
        );
      await api.post(apiEndpoints.applications, { jobId: job.id || id });
      setApplied(true);
      setMessage("Application submitted successfully.");
    } catch (e) {
      setMessage(
        e.response?.data?.message ||
          e.message ||
          "Could not submit your application. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand"
      >
        <ArrowLeft size={16} /> Back to jobs
      </Link>
      <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-100 text-2xl font-extrabold text-blue-700">
            {job.company?.[0] || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-['Manrope'] text-2xl font-extrabold sm:text-3xl">
                {job.title}
              </h1>
              <span className="rounded-md bg-[#e5f8ee] px-2 py-1 text-[10px] font-extrabold text-emerald-700">
                {job.match || 96}% AI match
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              {job.company}
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <BriefcaseBusiness size={14} />
                {job.type || "Full-time"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 size={14} />
                Posted recently
              </span>
            </div>
          </div>
          <button
            className="rounded-xl border border-slate-200 p-3 text-slate-500 hover:text-brand"
            aria-label="Save job"
          >
            <Bookmark size={18} />
          </button>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
          <div>
            <p className="text-xs text-slate-500">Estimated compensation</p>
            <p className="mt-1 text-lg font-extrabold">
              {job.salary || "Not specified"}
            </p>
          </div>
          <button
            disabled={busy || applied}
            onClick={apply}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-extrabold text-white hover:bg-[#7770ff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy
              ? "Submitting…"
              : applied
                ? "Applied successfully"
                : "Apply for this role"}{" "}
            {!applied && <ArrowUpRight size={16} />}
          </button>
        </div>
        {message && (
          <p
            className={`mt-3 text-sm ${applied ? "text-emerald-700" : "text-amber-700"}`}
          >
            {message}
          </p>
        )}
      </section>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="space-y-6 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft">
          <div>
            <h2 className="text-lg font-extrabold">About the role</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {job.description || demo.description}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-extrabold">What you will do</h2>
            <ul className="mt-3 space-y-3">
              {(job.responsibilities || demo.responsibilities).map((x) => (
                <li
                  key={x}
                  className="flex gap-2.5 text-sm leading-6 text-slate-600"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-extrabold">What we are looking for</h2>
            <ul className="mt-3 space-y-3">
              {(job.requirements || demo.requirements).map((x) => (
                <li
                  key={x}
                  className="flex gap-2.5 text-sm leading-6 text-slate-600"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Skills for this role</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(job.skills || demo.skills).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#e4e2ff] bg-[#f0efff] p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand">
              <Sparkles size={20} />
            </span>
            <h3 className="mt-4 font-extrabold">Why this is a match</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your resume skills align strongly with this role. Tailor your
              project descriptions to highlight relevant impact before applying.
            </p>
            <Link
              to="/resume"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-brand"
            >
              Review AI profile <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <h3 className="font-extrabold">Job seeker tip</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Check the company’s official careers page before sharing sensitive
              personal information.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
