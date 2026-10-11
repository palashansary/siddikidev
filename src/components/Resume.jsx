import React from "react";
import { useSiteContent } from "../context/ContentContext";
import { siteContent } from "../config/siteContent";
import { toAbsoluteUrl } from "../lib/content";
import { Bone, LoadingLabel } from "./Skeleton";

const Resume = () => {
  const { content, loading } = useSiteContent();
  const { resume } = content;
  const url = resume.url || siteContent.resume.url;
  const fileName = resume.fileName || siteContent.resume.fileName;
  // Mobile browsers can't render a PDF inside an iframe, so phones get
  // Google's viewer; larger screens use the browser's own PDF viewer.
  const mobileViewer = `https://docs.google.com/gview?url=${encodeURIComponent(
    toAbsoluteUrl(url)
  )}&embedded=true`;

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-6">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center">My Resume</h1>

      {loading ? (
        <div className="w-full max-w-5xl flex flex-col items-center px-2" aria-busy="true">
          <LoadingLabel>Loading resume…</LoadingLabel>
          <Bone className="w-full h-[75vh] !rounded-lg" />
          <div className="mt-6 flex gap-4">
            <Bone className="h-12 w-44 !rounded-lg" />
            <Bone className="h-12 w-44 !rounded-lg" />
          </div>
        </div>
      ) : (
        <>
          <div className="glass w-full max-w-5xl flex justify-center p-2 rounded-2xl">
            <iframe
              src={mobileViewer}
              title="Resume preview"
              className="md:hidden w-full h-[75vh] rounded-xl border border-white/10 bg-slate-900/60"
            ></iframe>
            <iframe
              src={`${url}#view=FitH`}
              title="Resume preview"
              className="hidden md:block w-full h-[75vh] rounded-xl border border-white/10 bg-slate-900/60"
            ></iframe>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={url}
              download={fileName}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-base md:text-lg transition"
            >
              Download Resume
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill !border-white/30 hover:!bg-white/10 text-white px-6 py-3 rounded-lg text-base md:text-lg transition"
            >
              Open in new tab
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Resume;
