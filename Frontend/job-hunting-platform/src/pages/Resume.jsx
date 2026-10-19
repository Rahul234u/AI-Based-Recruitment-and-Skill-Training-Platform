import { useRef, useState } from "react";
import api, { apiEndpoints } from "../api/client";
import {
  CheckCircle2,
  CloudUpload,
  FileCheck2,
  FileText,
  LoaderCircle,
  Sparkles,
  Target,
  WandSparkles,
  X,
} from "lucide-react";
const example = {
  skills: [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "REST APIs",
    "Git",
  ],
  projects: [
    {
      name: "Smart Link URL Shortener",
      detail:
        "Built a URL shortener with analytics and AI-powered link summaries.",
    },
    {
      name: "Complaint Management System",
      detail:
        "Developed a role-based complaint workflow with duplicate detection.",
    },
    {
      name: "Task Plus",
      detail:
        "Created a task planner with reminders and a responsive dashboard.",
    },
  ],
  experience: [],
  summary:
    "Computer Science student focused on building full-stack web applications with the MERN stack.",
};
export default function Resume() {
  const input = useRef(null),
    [file, setFile] = useState(null),
    [drag, setDrag] = useState(false),
    [loading, setLoading] = useState(false),
    [result, setResult] = useState(null),
    [error, setError] = useState("");
  const choose = (f) => {
    if (!f) return;
    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(f.type) &&
      !f.name.match(/\.(pdf|doc|docx)$/i)
    ) {
      setError("Please choose a PDF, DOC or DOCX resume.");
      return;
    }
    setFile(f);
    setError("");
    setResult(null);
  };
  const analyze = async () => {
    if (!file) {
      setError("Choose your resume first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      if (!base) {
        await new Promise((r) => setTimeout(r, 1000));
        setResult(example);
        setError(
          "Preview analysis shown. Configure VITE_API_BASE_URL to analyze resumes with your Spring Boot AI service.",
        );
        return;
      }
      const form = new FormData(); 
      form.append("file", file);
      const r = await api.post(apiEndpoints.resumeAnalyze, form);
      setResult(r.data);
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Could not analyze this resume. Check that your backend is running and try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  const skills = result?.skills || result?.extractedSkills || [];
  const projects = result?.projects || result?.extractedProjects || [];
  const experience = result?.experience || result?.extractedExperience || [];
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand">
          <Sparkles size={14} /> AI resume studio
        </div>
        <h1 className="mt-2 font-['Manrope'] text-3xl font-extrabold tracking-tight">
          Let your resume do more.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Our AI extracts your skills, projects and experience, then uses that
          profile to find more relevant jobs.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#efeeff] text-brand">
              <CloudUpload size={20} />
            </span>
            <div>
              <h2 className="font-extrabold">Upload your resume</h2>
              <p className="mt-1 text-xs text-slate-500">
                PDF, DOC or DOCX · Max 10 MB recommended
              </p>
            </div>
          </div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              choose(e.dataTransfer.files?.[0]);
            }}
            onClick={() => input.current?.click()}
            className={`mt-6 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${drag ? "border-brand bg-[#f4f3ff]" : "border-slate-200 bg-slate-50/70 hover:border-indigo-300 hover:bg-[#fafaff]"}`}
          >
            <input
              ref={input}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => choose(e.target.files?.[0])}
            />
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand shadow-sm">
              <CloudUpload size={25} />
            </span>
            <p className="mt-4 text-sm font-extrabold">Drop your resume here</p>
            <p className="mt-1 text-xs text-slate-500">
              or <span className="font-extrabold text-brand">browse files</span>{" "}
              from your device
            </p>
          </div>
          {file && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#e5f8ee] text-emerald-700">
                <FileCheck2 size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold">{file.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB · Ready to analyze
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setResult(null);
                }}
                className="p-2 text-slate-400 hover:text-rose-500"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {error && (
            <p
              className={`mt-3 text-xs leading-5 ${result ? "text-amber-700" : "text-rose-600"}`}
            >
              {error}
            </p>
          )}
          <button
            onClick={analyze}
            disabled={!file || loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-100 hover:bg-[#7770ff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Analyzing your resume…
              </>
            ) : (
              <>
                <WandSparkles size={17} />
                Extract my profile with AI
              </>
            )}
          </button>
          <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-400">
            <span className="mt-0.5 text-emerald-600">
              <CheckCircle2 size={14} />
            </span>
            Your resume is used to build your candidate profile. Review
            extracted details before relying on job matches.
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-extrabold">Your AI profile</h2>
              <p className="mt-1 text-xs text-slate-500">
                A structured view of what makes you a fit.
              </p>
            </div>
            <span className="rounded-full bg-[#efeeff] px-3 py-1.5 text-[10px] font-extrabold text-brand">
              {result ? "ANALYZED" : "PREVIEW"}
            </span>
          </div>
          {!result ? (
            <div className="mt-6 flex min-h-[330px] flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 text-center">
              <div className="relative grid h-20 w-20 place-items-center rounded-3xl bg-white text-brand shadow-sm">
                <FileText size={30} />
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                  <Sparkles size={14} />
                </span>
              </div>
              <h3 className="mt-5 font-extrabold">
                Your strengths, made visible
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Upload your resume to extract your skills, projects and
                experience into a searchable profile.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                  Skills
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                  Projects
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                  Experience
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="rounded-xl bg-[#f4f3ff] p-4">
                <div className="flex items-center gap-2 text-brand">
                  <Sparkles size={16} />
                  <p className="text-xs font-extrabold uppercase tracking-wider">
                    AI summary
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {result.summary ||
                    result.profileSummary ||
                    "Your resume has been processed. Review the extracted information below."}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold">
                    <Target size={16} className="text-brand" /> Skills
                    identified
                  </h3>
                  <span className="text-xs text-slate-400">
                    {skills.length} found
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.length ? (
                    skills.map((s) => (
                      <span
                        key={typeof s === "string" ? s : s.name}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600"
                      >
                        {typeof s === "string" ? s : s.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No skills returned by the API.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-extrabold">
                  <FileText size={16} className="text-brand" /> Projects{" "}
                  <span className="font-medium text-slate-400">
                    ({projects.length})
                  </span>
                </h3>
                <div className="mt-3 space-y-2">
                  {projects.length ? (
                    projects.map((p, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 p-3"
                      >
                        <p className="text-sm font-bold">
                          {typeof p === "string"
                            ? p
                            : p.name || p.title || "Project"}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {typeof p === "string"
                            ? ""
                            : p.detail || p.description || p.summary || ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No projects returned by the API.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-extrabold">
                  Experience{" "}
                  <span className="font-medium text-slate-400">
                    ({experience.length})
                  </span>
                </h3>
                <div className="mt-3 space-y-2">
                  {experience.length ? (
                    experience.map((x, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-200 p-3 text-sm"
                      >
                        <p className="font-bold">
                          {x.role || x.title || x.position || "Experience"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {x.company || x.organization || ""}{" "}
                          {x.duration ? `· ${x.duration}` : ""}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {x.description || x.summary || ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No experience entries returned by the API.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
