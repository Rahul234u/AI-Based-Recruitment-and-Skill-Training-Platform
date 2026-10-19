import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Compass,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  Settings2,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/jobs", label: "Explore jobs", icon: Compass },
  {
    to: "/applications",
    label: "My applications",
    icon: BriefcaseBusiness,
    count: "4",
  },
  { to: "/resume", label: "AI resume studio", icon: FileText, badge: "AI" },
];
export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-ink">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <NavLink to="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-brand text-white shadow-lg shadow-indigo-200">
                <Sparkles size={21} />
              </span>
              <span className="font-['Manrope'] text-[21px] font-extrabold tracking-tight">
                talent<span className="text-brand">path</span>
              </span>
            </NavLink>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink
              to="/jobs"
              className="text-sm font-semibold text-slate-600 hover:text-brand"
            >
              Find a job
            </NavLink>
            <a
              href="/#how-it-works"
              className="text-sm font-semibold text-slate-600 hover:text-brand"
            >
              How it works
            </a>
            <NavLink
              to="/resume"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand"
            >
              <Sparkles size={15} /> AI Resume
            </NavLink>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <button className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e6e5ff] text-sm font-bold text-brand">
                ST
              </div>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-bold">Sanket Tarpe</span>
                <span className="block text-xs text-slate-500">Candidate</span>
              </span>
              <ChevronDown
                size={15}
                className="hidden text-slate-400 sm:block"
              />
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1440px]">
        {!isHome && (
          <aside
            className={`${mobileOpen ? "fixed inset-y-[72px] left-0 z-30 flex w-[260px] shadow-xl" : "hidden"} min-h-[calc(100vh-72px)] shrink-0 flex-col border-r border-slate-200/70 bg-white px-4 py-7 lg:sticky lg:top-[72px] lg:flex lg:w-[246px] lg:self-start`}
          >
            <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
              Workspace
            </p>
            <nav className="space-y-1">
              {links.map(({ to, label, icon: Icon, count, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold transition ${isActive ? "bg-[#efeeff] text-brand" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`
                  }
                >
                  <Icon size={18} />
                  <span className="flex-1">{label}</span>
                  {count && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                      {count}
                    </span>
                  )}
                  {badge && (
                    <span className="rounded-md bg-[#e5f8ee] px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-700">
                      {badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
            <div className="my-7 h-px bg-slate-100" />
            <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
              Account
            </p>
            <nav className="space-y-1">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold ${isActive ? "bg-[#efeeff] text-brand" : "text-slate-500 hover:bg-slate-50"}`
                }
              >
                <UserRound size={18} />
                My profile
              </NavLink>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold text-slate-500 hover:bg-slate-50">
                <Settings2 size={18} />
                Settings
              </button>
            </nav>
            <div className="mt-auto pt-8">
              <div className="rounded-2xl bg-gradient-to-br from-[#f0efff] to-[#e5f7f0] p-4">
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-white text-brand shadow-sm">
                  <CircleHelp size={18} />
                </div>
                <p className="text-sm font-extrabold">Need a hand?</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Get tips to make your job search stand out.
                </p>
                <button className="mt-3 text-xs font-extrabold text-brand">
                  Visit career center ↗
                </button>
              </div>
              <p className="mt-5 px-2 text-[10px] text-slate-400">
                © 2026 TalentPath
              </p>
            </div>
          </aside>
        )}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-9 lg:py-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
