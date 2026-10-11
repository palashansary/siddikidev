import React, { useCallback, useEffect, useRef, useState } from "react";
import { get, ref, update } from "firebase/database";
import { FiArrowLeft, FiEdit2, FiExternalLink, FiImage, FiPlus, FiTrash2 } from "react-icons/fi";
import Markdown from "../../components/Markdown";
import { useAdmin } from "../AdminContext";
import { uploadFile, uploadIsConfigured } from "../upload";
import { estimateReadingTime, formatDate, normalizePost, slugify } from "../../lib/posts";
import { AssetField, Button, Panel, TextArea, TextInput, Toggle } from "../ui";

const emptyForm = {
  originalSlug: null,
  title: "",
  slug: "",
  slugTouched: false,
  excerpt: "",
  coverImage: "",
  tags: "",
  content: "",
  published: false,
  publishedDate: "",
};

const toDateInput = (timestamp) =>
  timestamp ? new Date(timestamp).toISOString().slice(0, 10) : "";

const plainExcerpt = (markdown) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

async function loadPostList(db) {
  const [published, drafts] = await Promise.all([get(ref(db, "posts")), get(ref(db, "drafts"))]);
  const list = [];
  for (const [slug, raw] of Object.entries(published.val() || {})) {
    const post = normalizePost(raw, slug);
    if (post) list.push({ ...post, published: true });
  }
  for (const [slug, raw] of Object.entries(drafts.val() || {})) {
    const post = normalizePost(raw, slug);
    if (post) list.push({ ...post, published: false });
  }
  return list.sort((a, b) => (b.updatedAt || b.publishedAt) - (a.updatedAt || a.publishedAt));
}

const PostEditor = ({ initial, existingSlugs, onClose, onSaved }) => {
  const { db, uploadSettings, notify } = useAdmin();
  const [form, setForm] = useState(initial);
  const [mode, setMode] = useState("write");
  const [saving, setSaving] = useState(false);
  const [inserting, setInserting] = useState(false);
  const contentRef = useRef(null);
  const imageInputRef = useRef(null);
  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  const set = (changes) => setForm((current) => ({ ...current, ...changes }));

  const setTitle = (title) =>
    set(form.slugTouched ? { title } : { title, slug: slugify(title) });

  const insertAtCursor = (text) => {
    const textarea = contentRef.current;
    const start = textarea?.selectionStart ?? form.content.length;
    const end = textarea?.selectionEnd ?? form.content.length;
    set({ content: form.content.slice(0, start) + text + form.content.slice(end) });
  };

  const handleInlineImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setInserting(true);
    try {
      const url = await uploadFile(file, { folder: "blog", settings: uploadSettings, maxDimension: 1600 });
      insertAtCursor(`\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n`);
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setInserting(false);
    }
  };

  const save = async () => {
    const slug = slugify(form.slug || form.title);
    if (!form.title.trim()) return notify("Add a title first.", "error");
    if (!slug) return notify("The slug needs at least one letter or number.", "error");
    if (slug !== form.originalSlug && existingSlugs.includes(slug)) {
      return notify(`Another post already uses the slug “${slug}”.`, "error");
    }

    const publishedAt = form.publishedDate
      ? new Date(`${form.publishedDate}T00:00:00`).getTime()
      : Date.now();
    const meta = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || plainExcerpt(form.content),
      coverImage: form.coverImage,
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      publishedAt,
      updatedAt: Date.now(),
      readingTime: estimateReadingTime(form.content),
    };

    // One atomic multi-path write: move the post between drafts/ and
    // posts/+postBodies/, and clean up the old slug if it changed.
    const updates = {};
    for (const oldSlug of new Set([form.originalSlug, slug].filter(Boolean))) {
      updates[`posts/${oldSlug}`] = null;
      updates[`postBodies/${oldSlug}`] = null;
      updates[`drafts/${oldSlug}`] = null;
    }
    if (form.published) {
      updates[`posts/${slug}`] = meta;
      updates[`postBodies/${slug}`] = form.content;
    } else {
      updates[`drafts/${slug}`] = { ...meta, content: form.content };
    }

    setSaving(true);
    try {
      await update(ref(db), updates);
      const saved = { ...form, slug, originalSlug: slug, publishedDate: toDateInput(publishedAt) };
      notify(form.published ? "Post published." : "Draft saved.");
      onSaved(saved);
    } catch (error) {
      notify(`Couldn't save: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const close = () => {
    if (dirty && !window.confirm("Discard unsaved changes to this post?")) return;
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={close}>
          <FiArrowLeft /> All posts
        </Button>
        <div className="flex flex-wrap items-center gap-3">
          {form.originalSlug && initial.published && (
            <a
              href={`/blog/${form.originalSlug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline"
            >
              View live <FiExternalLink />
            </a>
          )}
          <Button variant="primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : form.published ? "Save & publish" : "Save draft"}
          </Button>
        </div>
      </div>

      <Panel title={form.originalSlug ? "Edit post" : "New post"}>
        <TextInput label="Title" value={form.title} onChange={setTitle} />
        <TextInput
          label="Slug"
          hint={`URL: /blog/${slugify(form.slug || form.title) || "…"}`}
          value={form.slug}
          onChange={(slug) => set({ slug, slugTouched: true })}
        />
        <TextArea
          label="Excerpt"
          hint="Shown on the blog card. Leave empty to use the start of the post."
          rows={2}
          value={form.excerpt}
          onChange={(excerpt) => set({ excerpt })}
        />
        <AssetField
          label="Cover image"
          folder="blog"
          maxDimension={1600}
          previewClassName="h-16 w-28 object-cover"
          value={form.coverImage}
          onChange={(coverImage) => set({ coverImage })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Tags"
            hint="Comma separated, e.g. vue, performance"
            value={form.tags}
            onChange={(tags) => set({ tags })}
          />
          <TextInput
            label="Publish date"
            type="date"
            hint="Defaults to today."
            value={form.publishedDate}
            onChange={(publishedDate) => set({ publishedDate })}
          />
        </div>
        <Toggle
          label="Published"
          hint="Drafts are only visible here."
          checked={form.published}
          onChange={(published) => set({ published })}
        />
      </Panel>

      <Panel
        title="Content"
        description="Markdown: # headings, **bold**, [links](https://…), lists, tables and ``` code blocks."
        actions={
          <>
            <Button
              onClick={() => imageInputRef.current?.click()}
              disabled={inserting || !uploadIsConfigured(uploadSettings)}
              title={uploadIsConfigured(uploadSettings) ? "" : "Set up uploads in Settings"}
            >
              <FiImage /> {inserting ? "Uploading…" : "Insert image"}
            </Button>
            <div className="inline-flex rounded-lg border border-slate-700 p-0.5">
              {["write", "preview"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value)}
                  className={`rounded-md px-3 py-1.5 text-sm capitalize ${
                    mode === value ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </>
        }
      >
        {mode === "write" ? (
          <TextArea
            mono
            rows={22}
            textareaRef={contentRef}
            value={form.content}
            onChange={(content) => set({ content })}
            placeholder="Start writing…"
          />
        ) : (
          <div className="min-h-[300px] rounded-lg border border-slate-800 bg-[#0A1926] p-4 md:p-6">
            <Markdown>{form.content || "_Nothing to preview yet._"}</Markdown>
          </div>
        )}
        <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={handleInlineImage} />
      </Panel>
    </div>
  );
};

const BlogTab = () => {
  const { db, notify } = useAdmin();
  const [posts, setPosts] = useState(null);
  const [editing, setEditing] = useState(null);
  // Bumped after every save so the editor remounts from the saved state.
  const [editorVersion, setEditorVersion] = useState(0);

  const refresh = useCallback(async () => {
    try {
      setPosts(await loadPostList(db));
    } catch (error) {
      notify(`Couldn't load posts: ${error.message}`, "error");
      setPosts([]);
    }
  }, [db, notify]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openPost = async (post) => {
    let content = post.content;
    if (post.published) {
      try {
        content = (await get(ref(db, `postBodies/${post.slug}`))).val() || "";
      } catch (error) {
        return notify(`Couldn't load the post body: ${error.message}`, "error");
      }
    }
    setEditing({
      ...emptyForm,
      originalSlug: post.slug,
      title: post.title,
      slug: post.slug,
      slugTouched: true,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      tags: post.tags.join(", "),
      content,
      published: post.published,
      publishedDate: toDateInput(post.publishedAt),
    });
  };

  const deletePost = async (post) => {
    if (!window.confirm(`Delete “${post.title}” permanently?`)) return;
    try {
      await update(ref(db), {
        [`posts/${post.slug}`]: null,
        [`postBodies/${post.slug}`]: null,
        [`drafts/${post.slug}`]: null,
      });
      notify("Post deleted.");
      refresh();
    } catch (error) {
      notify(`Couldn't delete: ${error.message}`, "error");
    }
  };

  if (editing) {
    return (
      <PostEditor
        key={editorVersion}
        initial={editing}
        existingSlugs={(posts || []).map((post) => post.slug)}
        onClose={() => {
          setEditing(null);
          refresh();
        }}
        onSaved={(saved) => {
          setEditing(saved);
          setEditorVersion((version) => version + 1);
          refresh();
        }}
      />
    );
  }

  return (
    <Panel
      title="Blog posts"
      description="Published posts appear on /blog. Drafts stay private."
      actions={
        <Button variant="primary" onClick={() => setEditing({ ...emptyForm })}>
          <FiPlus /> New post
        </Button>
      }
    >
      {posts === null && <p className="text-sm text-slate-400">Loading…</p>}
      {posts?.length === 0 && <p className="text-sm text-slate-400">No posts yet. Write your first one!</p>}
      <ul className="divide-y divide-slate-800">
        {posts?.map((post) => (
          <li key={post.slug} className="flex flex-wrap items-center gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-100">{post.title}</p>
              <p className="text-xs text-slate-500">
                <span
                  className={`mr-2 rounded px-1.5 py-0.5 ${
                    post.published ? "bg-emerald-950 text-emerald-300" : "bg-amber-950 text-amber-300"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
                {formatDate(post.publishedAt)} · /blog/{post.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => openPost(post)}>
                <FiEdit2 /> Edit
              </Button>
              <Button variant="danger" aria-label={`Delete ${post.title}`} onClick={() => deletePost(post)}>
                <FiTrash2 />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
};

export default BlogTab;
