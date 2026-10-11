import React, { useEffect, useState } from "react";
import { ContentContext } from "./ContentContext";
import { fetchDatabase, isPlainObject, normalizeContent } from "../lib/content";
import { REMOTE_CONTENT_ENABLED } from "../config/app";

const CACHE_KEY = "ahsa:content:v1";

// Kick off the request at module load, in parallel with React's first
// render, so skeletons (first visit) clear as early as possible.
let earlyRequest = REMOTE_CONTENT_ENABLED ? fetchDatabase("content") : null;
earlyRequest?.catch(() => {}); // handled in the effect; avoid an unhandled rejection

// Browser storage can throw (private mode, blocked cookies), so every access
// is guarded — the cache is a nicety, never a requirement.
function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(value) {
  try {
    if (value === null) localStorage.removeItem(CACHE_KEY);
    else localStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}

// First visit: show skeletons (`loading`) until the database answers, then
// live content — or the static fallback if it fails or times out.
// Repeat visit: show the last good copy instantly and refresh quietly.
function initialState() {
  if (!REMOTE_CONTENT_ENABLED) {
    return { content: normalizeContent(null), source: "static", loading: false };
  }
  const cached = readCache();
  return isPlainObject(cached)
    ? { content: normalizeContent(cached), source: "cache", loading: false }
    : { content: normalizeContent(null), source: "static", loading: true };
}

const ContentProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!REMOTE_CONTENT_ENABLED) return;
    let active = true;
    // Use the early request once; later mounts (e.g. StrictMode) refetch.
    const request = earlyRequest || fetchDatabase("content");
    earlyRequest = null;
    request
      .then((remote) => {
        if (!active) return;
        if (remote === null) {
          // Database reachable but empty: the static config is the truth.
          writeCache(null);
          setState({ content: normalizeContent(null), source: "static", loading: false });
        } else if (isPlainObject(remote)) {
          writeCache(remote);
          setState({ content: normalizeContent(remote), source: "live", loading: false });
        } else {
          setState((current) => ({ ...current, loading: false }));
        }
      })
      .catch(() => {
        // Offline, timed out or blocked: stop the skeletons and keep what
        // we have (cache or static fallback).
        if (active) setState((current) => ({ ...current, loading: false }));
      });
    return () => {
      active = false;
    };
  }, []);

  const { seo } = state.content;
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    if (description && seo.description) description.setAttribute("content", seo.description);
  }, [seo.description]);

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
};

export default ContentProvider;
