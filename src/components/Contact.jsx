import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DATABASE_URL } from "../config/app";
import { useSiteContent } from "../context/ContentContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, phone: 20, message: 5000 };
const emptyForm = { name: "", email: "", phone: "", message: "", website: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter your name";
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email";
  if (form.phone && !/^[+\d][\d\s-]{6,18}$/.test(form.phone.trim()))
    errors.phone = "Enter a valid number";
  if (!form.message.trim()) errors.message = "Enter your message";
  return errors;
}

const inputClass =
  "rounded-lg bg-slate-800/60 border border-white/10 px-5 text-slate-100 outline-none transition-colors focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20";

const Contact = () => {
  const { profile, socials } = useSiteContent().content;
  const linkedin = socials.find((social) => /linkedin\.com/i.test(social.url));
  const [form, setForm] = useState(emptyForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed

  const errors = validate(form);
  const showError = (field) => isSubmitted && errors[field];

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value.slice(0, LIMITS[name] ?? 200) }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (Object.keys(errors).length || status === "sending") return;

    // Honeypot: real visitors never see or fill the "website" field.
    if (form.website) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`${DATABASE_URL}/messages.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          createdAt: { ".sv": "timestamp" },
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center px-6">
        <p className="text-center text-2xl md:text-3xl text-white">
          {`Thanks ${form.name.trim()}! I've received your message and will get back to you shortly.`}
        </p>
        <Link
          to="/"
          className="glass-pill text-slate-100 text-[1.2rem] mt-4 px-4 py-1 !border-white/40 rounded-lg transition-colors hover:!bg-white/10"
        >
          Go to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="h-full flex flex-col items-center py-4">
        <div className="text-center mt-2">
          <h1 className="text-white text-[2rem] md:text-[2.4rem] font-semibold">
            Let&apos;s get connected
          </h1>
        </div>

        <div className="mt-6 md:mt-12 w-[calc(100%_-_2.5rem)] sm:w-[60%] md:w-[50%] lg:w-[38%] p-6 sm:p-8 glass rounded-3xl">
          <form onSubmit={submitHandler} noValidate>
            <div className="flex flex-col gap-y-3 md:gap-y-4 font-spectral">
              <div className="text-slate-300">
                <label className="flex flex-col">
                  Name
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    onChange={changeHandler}
                    value={form.name}
                    aria-invalid={Boolean(showError("name"))}
                    className={`h-8 md:h-9 ${inputClass}`}
                  />
                </label>
                {showError("name") && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div className="text-slate-300">
                <label className="flex flex-col">
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    onChange={changeHandler}
                    value={form.email}
                    aria-invalid={Boolean(showError("email"))}
                    className={`h-8 md:h-9 ${inputClass}`}
                  />
                </label>
                {showError("email") && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className="text-slate-300">
                <label className="flex flex-col">
                  <span>
                    Number <span className="text-slate-500 text-sm">(optional)</span>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    onChange={changeHandler}
                    value={form.phone}
                    aria-invalid={Boolean(showError("phone"))}
                    className={`h-8 md:h-9 ${inputClass}`}
                  />
                </label>
                {showError("phone") && <span className="text-red-500">{errors.phone}</span>}
              </div>
              <div className="text-slate-300">
                <label className="flex flex-col">
                  Message
                  <textarea
                    name="message"
                    required
                    rows={4}
                    onChange={changeHandler}
                    value={form.message}
                    aria-invalid={Boolean(showError("message"))}
                    className={`h-24 md:h-28 py-2 resize-y ${inputClass}`}
                  />
                </label>
                {showError("message") && (
                  <span className="text-red-500">{errors.message}</span>
                )}
              </div>
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={changeHandler}
                    value={form.website}
                  />
                </label>
              </div>
            </div>
            {status === "failed" && (
              <p className="text-red-400 mt-3 text-sm" role="alert">
                Couldn&apos;t send your message. Please try again, or email me at{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </p>
            )}
            <div className=" flex justify-end text-white mt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="glass-pill flex !bg-blue-600/25 !border-blue-400/30 justify-center w-[100px] px-2 py-1 rounded-md transition-colors hover:!bg-blue-600/40 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 px-5 text-center text-slate-400 font-spectral">
          Prefer email?{" "}
          <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline">
            {profile.email}
          </a>
          {linkedin && (
            <>
              {" "}· or find me on{" "}
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                LinkedIn
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Contact;
