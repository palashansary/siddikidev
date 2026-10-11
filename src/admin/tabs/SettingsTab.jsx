import React, { useRef, useState } from "react";
import { ref, set } from "firebase/database";
import { FiDownload, FiUpload } from "react-icons/fi";
import { siteContent } from "../../config/siteContent";
import { normalizeContent } from "../../lib/content";
import { useAdmin } from "../AdminContext";
import { Button, Panel, Select, TextInput } from "../ui";

const providers = [
  { value: "cloudinary", label: "Cloudinary (free plan, no card needed)" },
  { value: "firebase", label: "Firebase Storage (needs the Blaze plan)" },
];

const SettingsTab = ({ draft, replaceDraft }) => {
  const { db, uploadSettings, setUploadSettings, notify } = useAdmin();
  const [form, setForm] = useState(uploadSettings);
  const [saving, setSaving] = useState(false);
  const importRef = useRef(null);

  const saveUploadSettings = async () => {
    const clean = {
      provider: form.provider,
      cloudinaryCloudName: form.cloudinaryCloudName.trim(),
      cloudinaryUploadPreset: form.cloudinaryUploadPreset.trim(),
    };
    setSaving(true);
    try {
      await set(ref(db, "adminSettings/upload"), clean);
      setUploadSettings(clean);
      notify("Upload settings saved.");
    } catch (error) {
      notify(`Couldn't save: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const importJson = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      replaceDraft(normalizeContent(parsed));
      notify("Imported. Review the tabs, then save to publish.");
    } catch {
      notify("That file isn't valid JSON.", "error");
    }
  };

  const resetToDefaults = () => {
    if (!window.confirm("Replace all unsaved and saved section content with the defaults from src/config/siteContent.js? Nothing is published until you save.")) return;
    replaceDraft(siteContent);
    notify("Defaults loaded. Save to publish them.");
  };

  return (
    <div className="space-y-6">
      <Panel
        title="Uploads"
        description="Where uploaded images and PDFs are stored. You can always paste a URL instead."
        actions={
          <Button variant="primary" onClick={saveUploadSettings} disabled={saving}>
            {saving ? "Saving…" : "Save settings"}
          </Button>
        }
      >
        <Select
          label="Provider"
          value={form.provider}
          onChange={(provider) => setForm({ ...form, provider })}
          options={providers}
        />
        {form.provider === "cloudinary" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Cloud name"
              hint="Cloudinary dashboard → Product environment."
              value={form.cloudinaryCloudName}
              onChange={(cloudinaryCloudName) => setForm({ ...form, cloudinaryCloudName })}
            />
            <TextInput
              label="Unsigned upload preset"
              hint="Settings → Upload → Add upload preset → Signing mode: Unsigned."
              value={form.cloudinaryUploadPreset}
              onChange={(cloudinaryUploadPreset) => setForm({ ...form, cloudinaryUploadPreset })}
            />
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            Uses your project&apos;s default Storage bucket. Deploy <code>storage.rules</code> first
            (see the README).
          </p>
        )}
      </Panel>

      <Panel
        title="Data"
        description="Back up your content, or copy it into src/config/siteContent.js so the offline fallback matches the live site."
      >
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportJson}>
            <FiDownload /> Export JSON
          </Button>
          <Button onClick={() => importRef.current?.click()}>
            <FiUpload /> Import JSON
          </Button>
          <Button variant="danger" onClick={resetToDefaults}>
            Load static defaults
          </Button>
        </div>
        <input ref={importRef} type="file" accept="application/json" hidden onChange={importJson} />
      </Panel>
    </div>
  );
};

export default SettingsTab;
