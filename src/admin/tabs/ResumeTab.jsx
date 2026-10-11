import React from "react";
import { AssetField, Panel, TextInput } from "../ui";

const ResumeTab = ({ draft, setSection }) => {
  const { resume } = draft;
  const patch = (changes) => setSection("resume", { ...resume, ...changes });

  return (
    <Panel
      title="Resume"
      description="Upload a new PDF and save: the Resume page, its download button and the mobile menu's “Download CV” all switch to it."
    >
      <AssetField
        label="Resume PDF"
        kind="file"
        folder="resume"
        value={resume.url}
        onChange={(url) => patch({ url })}
      />
      <TextInput
        label="Download file name"
        hint="Name of the file visitors save. Only applies when the PDF is hosted on this site."
        value={resume.fileName}
        onChange={(fileName) => patch({ fileName })}
      />
      {resume.url && (
        <iframe
          title="Resume preview"
          src={`${resume.url}#view=FitH`}
          className="h-[70vh] w-full rounded-lg border border-slate-700 bg-slate-800"
        />
      )}
    </Panel>
  );
};

export default ResumeTab;
