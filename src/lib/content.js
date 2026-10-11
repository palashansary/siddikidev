import { siteContent } from "../config/siteContent";
import { DATABASE_URL, REMOTE_TIMEOUT_MS } from "../config/app";

// Shape of one item in each list section. Used to sanitise database data and
// as the blank item when adding a new entry in the admin panel.
export const itemTemplates = {
  projects: { id: "", name: "", image: "", description: "", link: "", showOnHome: true },
  skills: { id: "", name: "", image: "", variant: "framed", bgFrom: "#1e293b", bgTo: "#0f172a", padding: 12 },
  socials: { id: "", name: "", url: "", icon: "" },
};

// An item is dropped (rather than rendered half-empty) if this fails.
const itemIsUsable = {
  projects: (item) => Boolean(item.name),
  skills: (item) => Boolean(item.name || item.image),
  socials: (item) => Boolean(item.url),
};

export const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

// The Realtime Database returns arrays as objects once they have gaps, so
// accept both.
export const toArray = (value) =>
  Array.isArray(value) ? value : isPlainObject(value) ? Object.values(value) : [];

// Copy only keys the template knows about, and only when the type matches.
function pickTyped(source, template) {
  const out = { ...template };
  if (!isPlainObject(source)) return out;
  for (const key of Object.keys(template)) {
    if (typeof source[key] === typeof template[key]) out[key] = source[key];
  }
  return out;
}

function normalizeList(key, remote, fallback) {
  // The database cannot store an empty array, so the admin panel saves an
  // emptied list as `false`.
  if (remote === false) return [];
  if (!Array.isArray(remote) && !isPlainObject(remote)) return fallback;
  return toArray(remote)
    .map((item, index) => {
      const clean = pickTyped(item, itemTemplates[key]);
      return { ...clean, id: clean.id || `${key}-${index}` };
    })
    .filter(itemIsUsable[key]);
}

// Merge whatever the database returned onto the static content, section by
// section. Anything missing or malformed falls back to src/config.
export function normalizeContent(remote) {
  if (!isPlainObject(remote)) return siteContent;
  const out = {};
  for (const [key, fallback] of Object.entries(siteContent)) {
    out[key] = Array.isArray(fallback)
      ? normalizeList(key, remote[key], fallback)
      : pickTyped(remote[key], fallback);
  }
  return out;
}

// Read a path from the Realtime Database over REST, with a timeout.
export async function fetchDatabase(path, { timeout = REMOTE_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(`${DATABASE_URL}/${path}.json`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Database responded ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export const isExternalUrl = (url) => /^(https?:|mailto:|tel:)/i.test(url || "");

// Google Docs' viewer needs an absolute URL.
export const toAbsoluteUrl = (url) => {
  try {
    return new URL(url, window.location.origin).href;
  } catch {
    return url;
  }
};
