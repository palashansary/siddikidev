import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { FIREBASE_DEFAULTS } from "../config/app";

// Web config comes from VITE_FIREBASE_* env vars when present, otherwise
// from Firebase Hosting's reserved /__/firebase/init.json (proxied to the
// live site in dev by vite.config.js), so no keys have to be committed.
async function resolveConfig() {
  if (FIREBASE_DEFAULTS.apiKey && FIREBASE_DEFAULTS.appId) return FIREBASE_DEFAULTS;
  try {
    const response = await fetch("/__/firebase/init.json");
    if (response.ok && response.headers.get("content-type")?.includes("json")) {
      const hosted = await response.json();
      const config = { ...FIREBASE_DEFAULTS };
      for (const [key, value] of Object.entries(hosted)) if (value) config[key] = value;
      if (config.apiKey) return config;
    }
  } catch {
    // fall through
  }
  throw new Error(
    "Firebase web config not found. Register a Web app in the Firebase console, or set VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID in .env.local."
  );
}

let servicesPromise = null;

export function getFirebase() {
  if (!servicesPromise) {
    servicesPromise = resolveConfig()
      .then((config) => {
        const app = getApps()[0] || initializeApp(config);
        return {
          app,
          config,
          auth: getAuth(app),
          db: getDatabase(app, config.databaseURL),
        };
      })
      .catch((error) => {
        servicesPromise = null;
        throw error;
      });
  }
  return servicesPromise;
}
