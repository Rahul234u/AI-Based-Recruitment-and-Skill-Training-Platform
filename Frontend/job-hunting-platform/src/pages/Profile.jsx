import { useEffect, useState } from "react";
import api, { apiEndpoints } from "../api/client";
import {
  Check,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  Save,
  UserRound,
} from "lucide-react";
export default function Profile() {
  const [form, setForm] = useState({
      fullName: "Sanket Tarpe",
      email: "sanket@example.com",
      headline: "Computer Science student · Full Stack Developer",
      location: "Amravati, Maharashtra, India",
      about:
        "Final-year Computer Science student interested in building useful, user-focused web applications.",
      skills:
        "React, JavaScript, Tailwind CSS, Node.js, Express, MongoDB, REST APIs, Git",
      linkedin: "",
      github: "",
    }),
    [editing, setEditing] = useState(false),
    [notice, setNotice] = useState("");
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (base)
      api
        .get(apiEndpoints.profile)
        .then((r) => setForm((f) => ({ ...f, ...r.data })))
        .catch(() => {});
  }, []);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const save = async () => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      if (base) await api.put(apiEndpoints.profile, form);
      setNotice(
        base
          ? "Profile saved successfully."
          : "Preview only: configure VITE_API_BASE_URL to save changes to Spring Boot.",
      );
      setEditing(false);
    } catch (e) {
      setNotice(e.response?.data?.message || "Unable to save profile.");
    }
  };
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wider text-brand">
          Your professional identity
        </p>
        <h1 className="mt-2 font-['Manrope'] text-3xl font-extrabold tracking-tight">
          My profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Help employers and our matching engine understand what you bring.
        </p>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-soft">
        <div className="h-28 bg-gradient-to-r from-[#dcd9ff] via-[#e9e7ff] to-[#d9f7e8]" />
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-9 flex flex-wrap items-end justify-between gap-4">
            <div className="grid h-[76px] w-[76px] place-items-center rounded-2xl border-4 border-white bg-[#635bff] text-2xl font-extrabold text-white shadow-sm">
              ST
            </div>
            <button
              onClick={() => (editing ? save() : setEditing(true))}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold hover:border-brand hover:text-brand"
            >
              {editing ? (
                <>
                  <Save size={15} />
                  Save changes
                </>
              ) : (
                <>
                  <Pencil size={15} />
                  Edit profile
                </>
              )}
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-extrabold">{form.fullName}</h2>
            <p className="mt-1 text-sm text-slate-500">{form.headline}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {form.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} />
                {form.email}
              </span>
            </div>
          </div>
          {notice && (
            <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700">
              {notice}
            </p>
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[1.3fr_.7fr]">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-extrabold">Basic information</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {[
                    ["fullName", "Full name"],
                    ["email", "Email address"],
                    ["headline", "Professional headline"],
                    ["location", "Location"],
                  ].map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="text-xs font-bold text-slate-500">
                        {label}
                      </span>
                      <input
                        name={key}
                        value={form[key] || ""}
                        onChange={change}
                        disabled={!editing}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-brand disabled:text-slate-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-extrabold">About me</h3>
                <textarea
                  name="about"
                  value={form.about || ""}
                  onChange={change}
                  disabled={!editing}
                  rows={4}
                  className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 outline-none focus:border-brand disabled:text-slate-600"
                />
              </div>
              <div>
                <h3 className="text-sm font-extrabold">Skills</h3>
                <textarea
                  name="skills"
                  value={form.skills || ""}
                  onChange={change}
                  disabled={!editing}
                  rows={3}
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 outline-none focus:border-brand disabled:text-slate-600"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Separate skills with commas.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Check size={17} className="text-emerald-600" />
                  <h3 className="text-sm font-extrabold">
                    Profile completeness
                  </h3>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[78%] rounded-full bg-emerald-400" />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  78% complete · Add social links to improve visibility.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-extrabold">Social links</h3>
                <label className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 px-3">
                  <Linkedin size={17} className="text-slate-400" />
                  <input
                    name="linkedin"
                    value={form.linkedin || ""}
                    onChange={change}
                    disabled={!editing}
                    placeholder="LinkedIn profile URL"
                    className="w-full py-3 text-xs outline-none disabled:bg-white"
                  />
                </label>
                <label className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-3">
                  <Github size={17} className="text-slate-400" />
                  <input
                    name="github"
                    value={form.github || ""}
                    onChange={change}
                    disabled={!editing}
                    placeholder="GitHub profile URL"
                    className="w-full py-3 text-xs outline-none disabled:bg-white"
                  />
                </label>
              </div>
              <div className="rounded-2xl border border-[#e4e2ff] bg-[#f4f3ff] p-4">
                <div className="flex items-center gap-2 text-brand">
                  <UserRound size={17} />
                  <p className="text-sm font-extrabold">
                    Your profile, your call
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Keep details accurate and only include personal information
                  you are comfortable sharing with employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
