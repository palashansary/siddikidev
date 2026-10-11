import React from "react";
import { itemTemplates } from "../../lib/content";
import { ListEditor, Panel, TextArea, TextInput } from "../ui";

const ExperienceTab = ({ draft, setSection }) => (
  <Panel title="Experience" description="Shown as a timeline on the home page, in this order (newest first).">
    <ListEditor
      items={draft.experience}
      onChange={(experience) => setSection("experience", experience)}
      template={itemTemplates.experience}
      idPrefix="job"
      addLabel="Add role"
      itemTitle={(job) => [job.role, job.company].filter(Boolean).join(" · ")}
      renderFields={(job, update) => (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Role" value={job.role} onChange={(role) => update({ role })} />
            <TextInput label="Company" value={job.company} onChange={(company) => update({ company })} />
          </div>
          <TextInput
            label="Period"
            placeholder="Feb 2026 – Present"
            value={job.period}
            onChange={(period) => update({ period })}
          />
          <TextArea
            label="Highlights"
            hint="One bullet per line. 3–4 short lines read best."
            rows={6}
            value={job.highlights}
            onChange={(highlights) => update({ highlights })}
          />
          <TextInput
            label="Tech"
            hint="Comma separated, e.g. Vue.js, Node.js, PostgreSQL"
            value={job.tech}
            onChange={(tech) => update({ tech })}
          />
        </div>
      )}
    />
  </Panel>
);

export default ExperienceTab;
