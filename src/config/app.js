// App-level settings. Every value can be overridden with a VITE_* env var
// (see .env.example), but none are required: the public site runs on the
// defaults below and falls back to ./siteContent.js when the database is
// unreachable.

const env = import.meta.env;

export const FIREBASE_DEFAULTS = {
  apiKey: env.VITE_FIREBASE_API_KEY || "",
  appId: env.VITE_FIREBASE_APP_ID || "",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "siddikiansary.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "siddikiansary",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "",
  databaseURL:
    env.VITE_FIREBASE_DATABASE_URL ||
    "https://siddikiansary-default-rtdb.firebaseio.com",
};

// Public reads go straight to the Realtime Database REST API, so visitors
// never download the Firebase SDK.
export const DATABASE_URL = FIREBASE_DEFAULTS.databaseURL.replace(/\/$/, "");

// Set VITE_REMOTE_CONTENT=false to render only the static config (handy
// while editing src/config/siteContent.js locally).
export const REMOTE_CONTENT_ENABLED = env.VITE_REMOTE_CONTENT !== "false";

// How long to wait for the database before giving up and keeping the
// static content.
export const REMOTE_TIMEOUT_MS = 5000;

// UI gate only — the real protection is database.rules.json.
export const ADMIN_EMAILS = (env.VITE_ADMIN_EMAILS || "palashansary@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

// Upload defaults. These can also be set from the admin panel
// (Settings tab), which stores them in the database so no rebuild is needed.
export const UPLOAD_DEFAULTS = {
  provider: env.VITE_UPLOAD_PROVIDER || "cloudinary", // "cloudinary" | "firebase"
  cloudinaryCloudName: env.VITE_CLOUDINARY_CLOUD_NAME || "",
  cloudinaryUploadPreset: env.VITE_CLOUDINARY_UPLOAD_PRESET || "",
};
