import { fallbackPosts } from "../config/siteContent";
import { REMOTE_CONTENT_ENABLED } from "../config/app";
import { fetchDatabase, isPlainObject, toArray } from "./content";

// Database layout:
//   posts/{slug}       published post metadata (public)
//   postBodies/{slug}  published markdown body as a string (public)
//   drafts/{slug}      unpublished posts, metadata + content (admin only)

export function normalizePost(raw, slug) {
  if (!isPlainObject(raw)) return null;
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (!title) return null;
  return {
    slug: slug || raw.slug || "",
    title,
    excerpt: typeof raw.excerpt === "string" ? raw.excerpt : "",
    coverImage: typeof raw.coverImage === "string" ? raw.coverImage : "",
    tags: toArray(raw.tags).filter((tag) => typeof tag === "string" && tag),
    publishedAt: Number(raw.publishedAt) || 0,
    updatedAt: Number(raw.updatedAt) || 0,
    readingTime: Number(raw.readingTime) || 0,
    content: typeof raw.content === "string" ? raw.content : "",
  };
}

const byNewest = (a, b) => b.publishedAt - a.publishedAt;

const staticPosts = () =>
  fallbackPosts.map((post) => normalizePost(post, post.slug)).filter(Boolean).sort(byNewest);

let postListPromise = null;

// Published posts, newest first. Cached for the session so navigating back
// to the blog doesn't refetch.
export function fetchPostList() {
  if (!REMOTE_CONTENT_ENABLED) return Promise.resolve(staticPosts());
  if (!postListPromise) {
    postListPromise = fetchDatabase("posts")
      .then((data) => {
        if (!isPlainObject(data)) return staticPosts();
        return Object.entries(data)
          .map(([slug, raw]) => normalizePost(raw, slug))
          .filter(Boolean)
          .sort(byNewest);
      })
      .catch((error) => {
        postListPromise = null; // let the next visit retry
        const posts = staticPosts();
        if (posts.length) return posts;
        throw error;
      });
  }
  return postListPromise;
}

export async function fetchPost(slug) {
  const fromStatic = () => staticPosts().find((post) => post.slug === slug) || null;
  if (!REMOTE_CONTENT_ENABLED) return fromStatic();
  try {
    const [meta, body] = await Promise.all([
      fetchDatabase(`posts/${encodeURIComponent(slug)}`),
      fetchDatabase(`postBodies/${encodeURIComponent(slug)}`),
    ]);
    const post = normalizePost(meta, slug);
    if (!post) return fromStatic();
    return { ...post, content: typeof body === "string" ? body : "" };
  } catch (error) {
    const post = fromStatic();
    if (post) return post;
    throw error;
  }
}

export const slugify = (text) =>
  (text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const estimateReadingTime = (markdown) =>
  Math.max(1, Math.round((markdown || "").split(/\s+/).filter(Boolean).length / 220));

export const formatDate = (timestamp) =>
  timestamp
    ? new Date(timestamp).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
