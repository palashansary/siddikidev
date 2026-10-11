import React from "react";
import SkillTile from "../../components/SkillTile";
import { itemTemplates } from "../../lib/content";
import { AssetField, ColorInput, ListEditor, Panel, RangeInput, Select, TextInput } from "../ui";

const variants = [
  { value: "full", label: "Full: image fills the tile (3D renders)" },
  { value: "framed", label: "Framed: image on a white card (flat logos)" },
];

const SkillsTab = ({ draft, setSection }) => (
  <div className="space-y-6">
    <Panel title="Preview" description="How the tech stack section looks on the site.">
      <ul className="flex flex-wrap gap-4">
        {draft.skills.map((skill) => (
          <li key={skill.id}>
            <SkillTile skill={skill} />
          </li>
        ))}
      </ul>
    </Panel>

    <Panel
      title="Skills"
      description="For the 3D look, upload a transparent PNG/WebP render and choose “Full”. Free CC0 3D icons: 3dicons.co. For a flat logo (SVG works), choose “Framed” and add a little padding."
    >
      <ListEditor
        items={draft.skills}
        onChange={(skills) => setSection("skills", skills)}
        template={itemTemplates.skills}
        idPrefix="skill"
        addLabel="Add skill"
        itemTitle={(skill) => skill.name}
        renderThumb={(skill) => (
          <div
            className="h-9 w-9 rounded p-1"
            style={{ backgroundImage: `linear-gradient(to right, ${skill.bgFrom}, ${skill.bgTo || skill.bgFrom})` }}
          >
            {skill.image && <img src={skill.image} alt="" className="h-full w-full object-contain" />}
          </div>
        )}
        renderFields={(skill, update) => (
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <TextInput label="Name" hint="Shown on hover and read by screen readers." value={skill.name} onChange={(name) => update({ name })} />
              <AssetField
                label="Image"
                folder="skills"
                maxDimension={512}
                value={skill.image}
                onChange={(image) => update({ image })}
              />
              <Select label="Style" value={skill.variant} onChange={(variant) => update({ variant })} options={variants} />
              <div className="grid gap-4 sm:grid-cols-2">
                <ColorInput label="Gradient from" value={skill.bgFrom} onChange={(bgFrom) => update({ bgFrom })} />
                <ColorInput label="Gradient to" value={skill.bgTo} onChange={(bgTo) => update({ bgTo })} />
              </div>
              <RangeInput
                label="Image padding"
                suffix="%"
                max={40}
                value={skill.padding}
                onChange={(padding) => update({ padding })}
              />
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Preview</p>
              <SkillTile skill={skill} />
            </div>
          </div>
        )}
      />
    </Panel>
  </div>
);

export default SkillsTab;
