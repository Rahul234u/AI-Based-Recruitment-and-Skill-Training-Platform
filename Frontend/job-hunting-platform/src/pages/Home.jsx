import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileSearch,
  FileText,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Your resume, understood",
    text: "AI turns your experience, projects and skills into a profile recruiters can find.",
  },
  {
    icon: Target,
    title: "Jobs that fit you",
    text: "Discover roles ranked by how well they match your real-world strengths.",
  },
  {
    icon: Zap,
    title: "Less searching. More doing.",
    text: "Keep applications, follow-ups and opportunities together in one workspace.",
  },
];
export default function Home() {
  return (
    <div className="mx-auto max-w-6xl pb-12">
      <section className="relative overflow-hidden rounded-[30px] bg-[#171b37] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-[74px]">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[1px] border-white/10" />
        <div className="absolute -right-4 -top-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute bottom-[-170px] right-[28%] h-80 w-80 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold text-[#d9d7ff]">
              <Sparkles size={14} /> YOUR AI-POWERED CAREER COMPANION
            </div>
            <h1 className="max-w-2xl font-['Manrope'] text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[58px]">
              Your next big move{" "}
              <span className="text-[#aaa5ff]">starts here.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Upload your resume. Let AI uncover your strengths and match you
              with opportunities worth your time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/resume"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-extrabold shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-[#7770ff]"
              >
                Analyze my resume <ArrowRight size={17} />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10"
              >
                Explore jobs <ChevronRight size={17} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-300" /> Personalized
                matches
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-300" /> One simple
                dashboard
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -left-5 top-14 z-10 rounded-2xl border border-white/60 bg-white p-3.5 text-ink shadow-xl sm:-left-10">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e3f8ed] text-emerald-700">
                  <Sparkles size={17} />
                </span>
                <div>
                  <p className="text-xs font-extrabold">AI match score</p>
                  <p className="text-[10px] text-slate-500">
                    Based on your profile
                  </p>
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold">
                94<span className="text-sm text-slate-400">/100</span>
              </p>
              <div className="mt-2 h-1.5 w-36 rounded-full bg-slate-100">
                <div className="h-full w-[94%] rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="rounded-[26px] border border-white/15 bg-white/[.08] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300">YOUR CAREER SNAPSHOT</p>
                  <p className="mt-1 text-lg font-extrabold">
                    Looking good, Sanket!
                  </p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7770ff]">
                  <FileText size={21} />
                </span>
              </div>
              <div className="mt-6 rounded-2xl bg-white p-4 text-ink">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#efeeff] text-brand">
                    <FileText size={21} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold">
                      Sanket_Tarpe_Resume.pdf
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Resume analyzed · Just now
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-extrabold text-emerald-700">
                    Ready
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
                  <div>
                    <p className="text-xl font-extrabold">12</p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Skills found
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold">3</p>
                    <p className="mt-1 text-[10px] text-slate-500">Projects</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold">86%</p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Profile strength
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#d9f7e8] text-emerald-800">
                  <Target size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold">8 new matching roles</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Picked for your skill set
                  </p>
                </div>
                <ArrowRight size={17} className="ml-auto text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16" id="how-it-works">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">
            A smarter way to search
          </p>
          <h2 className="mt-3 font-['Manrope'] text-3xl font-extrabold tracking-tight sm:text-4xl">
            A career search that gets you
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Not just another job board. A personal search experience built
            around what you can do.
          </p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition hover:-translate-y-1"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 1 ? "bg-[#e3f8ed] text-emerald-700" : i === 2 ? "bg-[#fff0df] text-amber-700" : "bg-[#efeeff] text-brand"}`}
              >
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-[#e6e4ff] bg-[#f0efff] p-7 sm:flex-row sm:items-center sm:p-9">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
            Start with what you have
          </p>
          <h2 className="mt-2 font-['Manrope'] text-2xl font-extrabold">
            Your resume has more potential.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            See what AI can uncover in a few moments.
          </p>
        </div>
        <Link
          to="/resume"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-white hover:bg-[#7770ff]"
        >
          Get started <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
