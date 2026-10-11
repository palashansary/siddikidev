import React, { useId, useRef, useState } from "react";
import { FiArrowDown, FiArrowUp, FiChevronDown, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { useAdmin, newId } from "./AdminContext";
import { uploadFile, uploadIsConfigured } from "./upload";

export const inputClass =
  "w-full rounded-lg bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-60";

const buttonVariants = {
  primary: "bg-emerald-600 hover:bg-emerald-500 text-white",
  secondary: "border border-slate-600 text-slate-100 hover:bg-slate-800",
  danger: "border border-red-900 text-red-300 hover:bg-red-950",
  ghost: "text-slate-300 hover:bg-slate-800 hover:text-white",
};

export const Button = ({ variant = "secondary", className = "", type = "button", ...rest }) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${buttonVariants[variant]} ${className}`}
    {...rest}
  />
);

export const Panel = ({ title, description, actions, children }) => (
  <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6">
    {(title || actions) && (
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          {title && <h2 className="text-lg font-semibold text-white font-bricolage">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    )}
    <div className="space-y-4">{children}</div>
  </section>
);

export const Field = ({ label, hint, htmlFor, children }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
    )}
    {children}
    {hint && <p className="text-xs text-slate-500">{hint}</p>}
  </div>
);

export const TextInput = ({ label, hint, value, onChange, ...rest }) => {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input
        id={id}
        className={inputClass}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    </Field>
  );
};

export const TextArea = ({ label, hint, value, onChange, rows = 4, mono = false, textareaRef, ...rest }) => {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea
        id={id}
        ref={textareaRef}
        rows={rows}
        className={`${inputClass} resize-y leading-relaxed ${mono ? "font-mono" : ""}`}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    </Field>
  );
};

export const Select = ({ label, hint, value, onChange, options }) => {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <select
        id={id}
        className={inputClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
};

export const Toggle = ({ label, checked, onChange, hint }) => (
  <label className="flex items-start gap-3 cursor-pointer select-none">
    <input
      type="checkbox"
      className="mt-0.5 h-4 w-4 accent-emerald-500"
      checked={Boolean(checked)}
      onChange={(event) => onChange(event.target.checked)}
    />
    <span>
      <span className="block text-sm text-slate-200">{label}</span>
      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </span>
  </label>
);

export const ColorInput = ({ label, value, onChange }) => {
  const id = useId();
  const isHex = /^#[0-9a-f]{6}$/i.test(value || "");
  return (
    <Field label={label} htmlFor={id}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={`${label} picker`}
          className="h-9 w-11 shrink-0 cursor-pointer rounded border border-slate-700 bg-transparent"
          value={isHex ? value : "#000000"}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          id={id}
          className={`${inputClass} font-mono`}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#0f172a"
        />
      </div>
    </Field>
  );
};

export const RangeInput = ({ label, value, onChange, min = 0, max = 100, suffix = "" }) => {
  const id = useId();
  return (
    <Field label={`${label}: ${value}${suffix}`} htmlFor={id}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-emerald-500"
      />
    </Field>
  );
};

// URL field with upload button, preview and optional preset choices.
export const AssetField = ({
  label,
  hint,
  value,
  onChange,
  folder,
  kind = "image",
  maxDimension,
  presets,
  previewClassName = "h-16 w-16 object-contain",
}) => {
  const id = useId();
  const fileRef = useRef(null);
  const { uploadSettings, notify } = useAdmin();
  const [busy, setBusy] = useState(false);
  const configured = uploadIsConfigured(uploadSettings);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadFile(file, { folder, settings: uploadSettings, maxDimension });
      onChange(url);
      notify("Uploaded. Remember to save.");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <div className="flex items-start gap-3">
        {kind === "image" && (
          <div className="shrink-0 rounded-lg border border-slate-700 bg-slate-800/60 p-1">
            {value ? (
              <img src={value} alt="" className={previewClassName} />
            ) : (
              <div className={`${previewClassName} flex items-center justify-center text-xs text-slate-500`}>
                none
              </div>
            )}
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            id={id}
            className={inputClass}
            value={value ?? ""}
            onChange={(event) => onChange(event.target.value.trim())}
            placeholder={kind === "image" ? "https://… or /images/…" : "https://…/file.pdf"}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => fileRef.current?.click()} disabled={busy || !configured}>
              <FiUpload /> {busy ? "Uploading…" : "Upload"}
            </Button>
            {kind === "file" && value && (
              <a href={value} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">
                Open current file
              </a>
            )}
            {!configured && (
              <span className="text-xs text-amber-300">Set up uploads in Settings, or paste a URL.</span>
            )}
          </div>
          {presets && (
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange(preset)}
                  className={`rounded-lg border p-1 ${
                    value === preset ? "border-emerald-500" : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <img src={preset} alt="" className="h-8 w-8 object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        hidden
        accept={kind === "image" ? "image/*" : "application/pdf"}
        onChange={handleFile}
      />
    </Field>
  );
};

// Ordered list of collapsible item cards with add / remove / reorder.
export const ListEditor = ({
  items,
  onChange,
  template,
  idPrefix,
  itemTitle,
  renderThumb,
  renderFields,
  addLabel = "Add item",
}) => {
  const [openId, setOpenId] = useState(null);

  const updateItem = (index, patch) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const removeItem = (index) => {
    if (!window.confirm(`Remove "${itemTitle(items[index]) || "this item"}"?`)) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    const item = { ...template, id: newId(idPrefix) };
    onChange([...items, item]);
    setOpenId(item.id);
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-slate-400">Nothing here yet.</p>}
      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-3 p-2 pr-3">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1 text-left hover:bg-slate-800/50"
                aria-expanded={open}
              >
                {renderThumb && <div className="shrink-0">{renderThumb(item)}</div>}
                <span className="truncate text-sm font-medium text-slate-100">
                  {itemTitle(item) || <em className="text-slate-500">Untitled</em>}
                </span>
                <FiChevronDown className={`ml-auto shrink-0 transition ${open ? "rotate-180" : ""}`} />
              </button>
              <div className="flex shrink-0 items-center">
                <Button variant="ghost" className="!px-2" aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>
                  <FiArrowUp />
                </Button>
                <Button variant="ghost" className="!px-2" aria-label="Move down" disabled={index === items.length - 1} onClick={() => move(index, 1)}>
                  <FiArrowDown />
                </Button>
                <Button variant="ghost" className="!px-2 hover:!text-red-300" aria-label="Remove" onClick={() => removeItem(index)}>
                  <FiTrash2 />
                </Button>
              </div>
            </div>
            {open && (
              <div className="border-t border-slate-800 p-4">
                {renderFields(item, (patch) => updateItem(index, patch))}
              </div>
            )}
          </div>
        );
      })}
      <Button onClick={addItem}>
        <FiPlus /> {addLabel}
      </Button>
    </div>
  );
};
