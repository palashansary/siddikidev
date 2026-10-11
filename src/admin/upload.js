import { getFirebase } from "./firebase";

// Uploads go to one of two free-tier friendly providers:
//
//  - "cloudinary" (default): free plan, no credit card. Needs a cloud name
//    and an *unsigned* upload preset (Cloudinary → Settings → Upload).
//  - "firebase": Cloud Storage for Firebase. Requires the Blaze plan
//    (pay-as-you-go, with a monthly no-cost quota), see storage.rules.
//
// Settings live in the database at adminSettings/upload (Admin → Settings),
// falling back to VITE_* env vars.

export function uploadIsConfigured(settings) {
  if (settings.provider === "firebase") return true;
  return Boolean(settings.cloudinaryCloudName && settings.cloudinaryUploadPreset);
}

const MAX_BYTES = 10 * 1024 * 1024;

// Downscale and re-encode raster images in the browser before upload, so a
// 4 MB screenshot becomes a ~100 KB WebP. SVG, GIF and anything that would
// get bigger are uploaded untouched.
export async function compressImage(file, maxDimension = 1600) {
  if (!/^image\/(png|jpe?g|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file;
  }
}

const safeName = (name) =>
  name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "file";

async function uploadToCloudinary(file, folder, settings) {
  // PDFs go up as "raw" files: new Cloudinary accounts block delivery of
  // PDFs uploaded as images.
  const resourceType = file.type === "application/pdf" ? "raw" : "image";
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", settings.cloudinaryUploadPreset);
  body.append("folder", `portfolio/${folder}`);
  if (resourceType === "raw") body.append("public_id", `${Date.now()}-${safeName(file.name)}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(settings.cloudinaryCloudName)}/${resourceType}/upload`,
    { method: "POST", body }
  );
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error?.message || `Cloudinary upload failed (${response.status})`);
  return result.secure_url;
}

async function uploadToFirebaseStorage(file, folder) {
  const { app } = await getFirebase();
  const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
  const storageRef = ref(getStorage(app), `public/${folder}/${Date.now()}-${safeName(file.name)}`);
  await uploadBytes(storageRef, file, {
    contentType: file.type,
    cacheControl: "public, max-age=31536000",
  });
  return getDownloadURL(storageRef);
}

// Returns the public URL of the uploaded file.
export async function uploadFile(file, { folder, settings, maxDimension }) {
  const prepared = await compressImage(file, maxDimension);
  if (prepared.size > MAX_BYTES) throw new Error("File is larger than 10 MB.");
  if (!uploadIsConfigured(settings)) {
    throw new Error("Uploads aren't set up yet. Add your Cloudinary details in Settings, or paste a URL.");
  }
  return settings.provider === "firebase"
    ? uploadToFirebaseStorage(prepared, folder)
    : uploadToCloudinary(prepared, folder, settings);
}
