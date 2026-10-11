import React from "react";
import Card from "../../components/Card";
import { itemTemplates } from "../../lib/content";
import { AssetField, ListEditor, Panel, TextArea, TextInput, Toggle } from "../ui";

const ProjectsTab = ({ draft, setSection }) => (
  <Panel
    title="Projects"
    description="Shown on the Projects page in this order. Projects marked “Show on home” also appear on the home page."
  >
    <ListEditor
      items={draft.projects}
      onChange={(projects) => setSection("projects", projects)}
      template={itemTemplates.projects}
      idPrefix="project"
      addLabel="Add project"
      itemTitle={(project) => project.name}
      renderThumb={(project) =>
        project.image ? (
          <img src={project.image} alt="" className="h-9 w-14 rounded object-cover object-top" />
        ) : (
          <div className="h-9 w-14 rounded bg-slate-800" />
        )
      }
      renderFields={(project, update) => (
        <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <TextInput label="Name" value={project.name} onChange={(name) => update({ name })} />
            <TextInput
              label="Live demo URL"
              type="url"
              placeholder="https://…"
              value={project.link}
              onChange={(link) => update({ link: link.trim() })}
            />
            <TextArea
              label="Description"
              hint="About 2–3 lines fit on the card."
              rows={3}
              value={project.description}
              onChange={(description) => update({ description })}
            />
            <AssetField
              label="Screenshot"
              hint="16:10-ish screenshots look best. Images are resized to 1200px and converted to WebP."
              folder="projects"
              maxDimension={1200}
              previewClassName="h-16 w-24 object-cover object-top"
              value={project.image}
              onChange={(image) => update({ image })}
            />
            <Toggle
              label="Show on home page"
              checked={project.showOnHome}
              onChange={(showOnHome) => update({ showOnHome })}
            />
          </div>
          <div className="hidden xl:block">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Preview</p>
            <Card {...project} />
          </div>
        </div>
      )}
    />
  </Panel>
);

export default ProjectsTab;
