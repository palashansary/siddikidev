import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { get, ref, serverTimestamp, update } from "firebase/database";
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import newLogo from "../images/newlogo.webp";
import { getFirebase } from "./firebase";
import { AdminContext } from "./AdminContext";
import { Button } from "./ui";
import { siteContent } from "../config/siteContent";
import { ADMIN_EMAILS, UPLOAD_DEFAULTS } from "../config/app";
import { isPlainObject, normalizeContent } from "../lib/content";
import usePageTitle from "../hooks/usePageTitle";

import GeneralTab from "./tabs/GeneralTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";
import ResumeTab from "./tabs/ResumeTab";
import SocialsTab from "./tabs/SocialsTab";
import BlogTab from "./tabs/BlogTab";
import MessagesTab from "./tabs/MessagesTab";
import SettingsTab from "./tabs/SettingsTab";

const tabs = [
  { id: "general", label: "Text & profile", Component: GeneralTab },
  { id: "projects", label: "Projects", Component: ProjectsTab },
  { id: "skills", label: "Skills", Component: SkillsTab },
  { id: "resume", label: "Resume", Component: ResumeTab },
  { id: "socials", label: "Social links", Component: SocialsTab },
  { id: "blog", label: "Blog", Component: BlogTab },
  { id: "messages", label: "Messages", Component: MessagesTab },
  { id: "settings", label: "Settings & data", Component: SettingsTab },
];

const CONTENT_KEYS = Object.keys(siteContent);

const sectionNames = {
  profile: "Profile",
  seo: "SEO",
  hero: "Hero",
  about: "About",
  projectsSection: "Projects intro",
  projects: "Projects",
  skills: "Skills",
  resume: "Resume",
  socials: "Social links",
  footer: "Footer",
};

const isAdminUser = (user) =>
  Boolean(user?.email && user.emailVerified && ADMIN_EMAILS.includes(user.email.toLowerCase()));

// The database can't store empty arrays; the public site reads `false` back
// as an intentionally empty list.
const toDatabaseValue = (value) => (Array.isArray(value) && value.length === 0 ? false : value);

function findProblem(draft) {
  const required = [
    ["projects", "name", "Project"],
    ["skills", "name", "Skill"],
    ["socials", "url", "Social link"],
  ];
  for (const [key, field, label] of required) {
    const index = draft[key].findIndex((item) => !String(item[field] ?? "").trim());
    if (index !== -1) return `${label} #${index + 1} needs a ${field}.`;
  }
  return null;
}

const CenteredCard = ({ children }) => (
  <div className="flex min-h-screen items-center justify-center bg-[#0A1926] px-4">
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-200">
      <img src={newLogo} alt="AHSA" className="mx-auto mb-6 h-10" />
      {children}
    </div>
  </div>
);

const Toasts = ({ toasts }) => (
  <div className="pointer-events-none fixed bottom-24 right-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`rounded-lg border px-4 py-3 text-sm shadow-lg ${
          toast.type === "error"
            ? "border-red-800 bg-red-950 text-red-100"
            : "border-emerald-800 bg-emerald-950 text-emerald-100"
        }`}
      >
        {toast.message}
      </div>
    ))}
  </div>
);

const Dashboard = ({ db, auth, user }) => {
  const { "*": splat = "" } = useParams();
  const tabId = splat.split("/")[0] || "general";
  const activeTab = tabs.find((tab) => tab.id === tabId);

  const [draft, setDraft] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [persistedKeys, setPersistedKeys] = useState([]);
  const [uploadSettings, setUploadSettings] = useState(UPLOAD_DEFAULTS);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, type = "success") => {
    const id = Math.random();
    setToasts((list) => [...list, { id, message, type }]);
    setTimeout(() => setToasts((list) => list.filter((toast) => toast.id !== id)), 4500);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([get(ref(db, "content")), get(ref(db, "adminSettings/upload"))])
      .then(([contentSnap, settingsSnap]) => {
        if (!active) return;
        const raw = contentSnap.val();
        const content = normalizeContent(raw);
        setDraft(content);
        setBaseline(content);
        setPersistedKeys(isPlainObject(raw) ? CONTENT_KEYS.filter((key) => raw[key] != null) : []);
        const saved = settingsSnap.val();
        if (isPlainObject(saved)) setUploadSettings((defaults) => ({ ...defaults, ...saved }));
      })
      .catch((error) => active && setLoadError(error));
    return () => {
      active = false;
    };
  }, [db]);

  const dirtyKeys = useMemo(() => {
    if (!draft || !baseline) return [];
    return CONTENT_KEYS.filter(
      (key) =>
        !persistedKeys.includes(key) || JSON.stringify(draft[key]) !== JSON.stringify(baseline[key])
    );
  }, [draft, baseline, persistedKeys]);

  useEffect(() => {
    if (!dirtyKeys.length) return;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirtyKeys.length]);

  const setSection = useCallback((key, value) => {
    setDraft((current) => ({ ...current, [key]: value }));
  }, []);

  const save = async () => {
    const problem = findProblem(draft);
    if (problem) return notify(problem, "error");
    const updates = { updatedAt: serverTimestamp() };
    for (const key of dirtyKeys) updates[key] = toDatabaseValue(draft[key]);
    setSaving(true);
    try {
      await update(ref(db, "content"), updates);
      setBaseline((current) => {
        const next = { ...current };
        for (const key of dirtyKeys) next[key] = draft[key];
        return next;
      });
      setPersistedKeys(CONTENT_KEYS);
      notify("Published. Your changes are live.");
    } catch (error) {
      notify(`Couldn't save: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    if (window.confirm("Discard all unsaved changes?")) setDraft(baseline);
  };

  if (!activeTab) return <Navigate to="/admin" replace />;

  if (loadError) {
    const denied = /permission/i.test(loadError.message);
    return (
      <CenteredCard>
        <p className="text-lg font-semibold text-white">Couldn&apos;t load content</p>
        <p className="mt-2 text-sm text-slate-400">
          {denied
            ? "The database refused access. Deploy database.rules.json (see the README) and make sure your email is the admin email in it."
            : loadError.message}
        </p>
        <Button className="mt-6" onClick={() => signOut(auth)}>
          Sign out
        </Button>
      </CenteredCard>
    );
  }

  if (!draft) {
    return <CenteredCard>Loading content…</CenteredCard>;
  }

  const neverPublished = persistedKeys.length === 0;
  const { Component } = activeTab;

  return (
    <AdminContext.Provider value={{ db, user, uploadSettings, setUploadSettings, notify }}>
      <div className="min-h-screen bg-[#0A1926] text-slate-100">
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0A1926]/90 backdrop-blur-lg">
          <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
            <Link to="/admin" className="flex items-center gap-2">
              <img src={newLogo} alt="AHSA" className="h-7" />
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">Admin</span>
            </Link>
            <div className="ml-auto flex items-center gap-1 sm:gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <span className="hidden sm:inline">View site</span> <FiExternalLink />
              </a>
              <span className="hidden max-w-[14rem] truncate text-sm text-slate-500 md:inline">{user.email}</span>
              <Button variant="ghost" onClick={() => signOut(auth)} aria-label="Sign out">
                <FiLogOut /> <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 md:flex md:gap-8">
          <nav className="-mx-4 overflow-x-auto border-b border-slate-800 px-4 md:mx-0 md:w-52 md:shrink-0 md:overflow-visible md:border-0 md:px-0 md:pt-6">
            <ul className="flex gap-1 py-2 md:sticky md:top-20 md:flex-col md:py-0">
              {tabs.map((tab) => (
                <li key={tab.id} className="shrink-0">
                  <NavLink
                    to={tab.id === "general" ? "/admin" : `/admin/${tab.id}`}
                    end
                    className={({ isActive }) =>
                      `block whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
                        isActive ? "bg-slate-800 font-medium text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }`
                    }
                  >
                    {tab.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <main className="min-w-0 flex-1 py-6 pb-32">
            {neverPublished && (
              <div className="mb-6 rounded-xl border border-amber-800 bg-amber-950/40 p-4 text-sm text-amber-100">
                The database has no content yet, so the site is showing the defaults from{" "}
                <code>src/config/siteContent.js</code>. They&apos;re loaded here: edit anything you like, then
                press <strong>Publish</strong> to store them in the database.
              </div>
            )}
            <Component draft={draft} setSection={setSection} replaceDraft={setDraft} />
          </main>
        </div>

        {dirtyKeys.length > 0 && (
          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-700 bg-slate-900/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
              <p className="min-w-0 flex-1 text-sm text-slate-300">
                <span className="font-medium text-white">Unpublished changes:</span>{" "}
                {dirtyKeys.map((key) => sectionNames[key] || key).join(", ")}
              </p>
              {!neverPublished && (
                <Button variant="ghost" onClick={discard} disabled={saving}>
                  Discard
                </Button>
              )}
              <Button variant="primary" onClick={save} disabled={saving}>
                {saving ? "Publishing…" : "Publish"}
              </Button>
            </div>
          </div>
        )}
        <Toasts toasts={toasts} />
      </div>
    </AdminContext.Provider>
  );
};

const AdminApp = () => {
  usePageTitle("Admin");
  const [services, setServices] = useState(null);
  const [configError, setConfigError] = useState(null);
  const [user, setUser] = useState(undefined); // undefined = unknown, null = signed out
  const [signInError, setSignInError] = useState(null);

  useEffect(() => {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};
    getFirebase()
      .then((firebase) => {
        if (!active) return;
        setServices(firebase);
        unsubscribe = onAuthStateChanged(firebase.auth, (current) => setUser(current));
      })
      .catch((error) => active && setConfigError(error.message));
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const signIn = async () => {
    setSignInError(null);
    try {
      await signInWithPopup(services.auth, new GoogleAuthProvider());
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") return;
      setSignInError(
        error.code === "auth/popup-blocked"
          ? "Your browser blocked the sign-in popup. Allow popups for this site and try again."
          : error.code === "auth/operation-not-allowed" || error.code === "auth/configuration-not-found"
            ? "Google sign-in isn't enabled. In the Firebase console open Authentication → Get started → Sign-in method → Google → Enable."
            : error.code === "auth/unauthorized-domain"
              ? `${window.location.hostname} isn't an authorised domain. Add it in Firebase console → Authentication → Settings → Authorised domains.`
              : error.message
      );
    }
  };

  if (configError) {
    return (
      <CenteredCard>
        <p className="text-lg font-semibold text-white">Admin isn&apos;t configured</p>
        <p className="mt-2 text-sm text-slate-400">{configError}</p>
      </CenteredCard>
    );
  }

  if (!services || user === undefined) return <CenteredCard>Loading…</CenteredCard>;

  if (!user) {
    return (
      <CenteredCard>
        <p className="text-lg font-semibold text-white">Admin sign in</p>
        <p className="mt-2 text-sm text-slate-400">Manage projects, skills, resume and blog posts.</p>
        <Button className="mt-6 w-full !bg-white !text-slate-900 hover:!bg-slate-200" onClick={signIn}>
          <FcGoogle size="1.2rem" /> Continue with Google
        </Button>
        {signInError && <p className="mt-4 text-sm text-red-300">{signInError}</p>}
        <Link to="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-white">
          ← Back to site
        </Link>
      </CenteredCard>
    );
  }

  if (!isAdminUser(user)) {
    return (
      <CenteredCard>
        <p className="text-lg font-semibold text-white">Not authorised</p>
        <p className="mt-2 text-sm text-slate-400">{user.email} doesn&apos;t have admin access.</p>
        <Button className="mt-6" onClick={() => signOut(services.auth)}>
          Sign out
        </Button>
      </CenteredCard>
    );
  }

  return <Dashboard db={services.db} auth={services.auth} user={user} />;
};

export default AdminApp;
