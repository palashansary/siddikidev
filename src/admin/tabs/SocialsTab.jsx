import React from "react";
import { socialIconPresets } from "../../config/siteContent";
import { itemTemplates } from "../../lib/content";
import { AssetField, ListEditor, Panel, TextInput } from "../ui";

const SocialsTab = ({ draft, setSection }) => (
  <Panel title="Social links" description="The “Connect with me” icons in the footer.">
    <ListEditor
      items={draft.socials}
      onChange={(socials) => setSection("socials", socials)}
      template={itemTemplates.socials}
      idPrefix="social"
      addLabel="Add link"
      itemTitle={(social) => social.name || social.url}
      renderThumb={(social) =>
        social.icon ? (
          <img src={social.icon} alt="" className="h-9 w-9 object-contain" />
        ) : (
          <div className="h-9 w-9 rounded bg-slate-800" />
        )
      }
      renderFields={(social, update) => (
        <div className="space-y-4">
          <TextInput label="Name" hint="Used as the accessible label." value={social.name} onChange={(name) => update({ name })} />
          <TextInput
            label="URL"
            hint="https://… or mailto:you@example.com"
            value={social.url}
            onChange={(url) => update({ url: url.trim() })}
          />
          <AssetField
            label="Icon"
            folder="social"
            maxDimension={256}
            presets={socialIconPresets}
            value={social.icon}
            onChange={(icon) => update({ icon })}
          />
        </div>
      )}
    />
  </Panel>
);

export default SocialsTab;
