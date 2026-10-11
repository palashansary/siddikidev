import React from "react";
import { itemTemplates } from "../../lib/content";
import { ListEditor, Panel, TextArea, TextInput } from "../ui";

const GeneralTab = ({ draft, setSection }) => {
  const patch = (key) => (changes) => setSection(key, { ...draft[key], ...changes });
  const { profile, hero, about, projectsSection, footer, seo } = draft;

  return (
    <div className="space-y-6">
      <Panel title="Hero" description="The first screen of the home page.">
        <TextArea label="Headline" rows={2} value={hero.headline} onChange={(headline) => patch("hero")({ headline })} />
        <TextArea label="Intro" rows={3} value={hero.intro} onChange={(intro) => patch("hero")({ intro })} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Button label" value={hero.ctaLabel} onChange={(ctaLabel) => patch("hero")({ ctaLabel })} />
          <TextInput
            label="Button link"
            hint="A page like /contact, or a full URL."
            value={hero.ctaUrl}
            onChange={(ctaUrl) => patch("hero")({ ctaUrl })}
          />
        </div>
      </Panel>

      <Panel title="About me">
        <TextInput label="Greeting" value={about.greeting} onChange={(greeting) => patch("about")({ greeting })} />
        <TextArea
          label="Body"
          hint="Line breaks are kept. On phones this is shortened with a “see more” button."
          rows={9}
          value={about.body}
          onChange={(body) => patch("about")({ body })}
        />
      </Panel>

      <Panel
        title="About numbers"
        description="Shown under the About text. The number in each value counts up on scroll (e.g. 3+, 30%, 1.5k)."
      >
        <ListEditor
          items={draft.stats}
          onChange={(stats) => setSection("stats", stats)}
          template={itemTemplates.stats}
          idPrefix="stat"
          addLabel="Add number"
          itemTitle={(stat) => [stat.value, stat.label].filter(Boolean).join(" · ")}
          renderFields={(stat, update) => (
            <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
              <TextInput label="Value" placeholder="30%" value={stat.value} onChange={(value) => update({ value })} />
              <TextInput label="Label" placeholder="Faster load times" value={stat.label} onChange={(label) => update({ label })} />
            </div>
          )}
        />
      </Panel>

      <Panel title="Projects section">
        <TextArea
          label="Intro text"
          rows={3}
          value={projectsSection.intro}
          onChange={(intro) => patch("projectsSection")({ intro })}
        />
      </Panel>

      <Panel title="Profile & footer">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Full name" hint="Used in page titles." value={profile.name} onChange={(name) => patch("profile")({ name })} />
          <TextInput
            label="Contact email"
            hint="Shown if the contact form can't send."
            type="email"
            value={profile.email}
            onChange={(email) => patch("profile")({ email })}
          />
        </div>
        <TextInput label="Footer tagline" value={footer.tagline} onChange={(tagline) => patch("footer")({ tagline })} />
      </Panel>

      <Panel title="Search engines" description="Title and description for the home page.">
        <TextInput label="Title" value={seo.title} onChange={(title) => patch("seo")({ title })} />
        <TextArea
          label="Description"
          hint={`${seo.description.length}/160 characters`}
          rows={3}
          value={seo.description}
          onChange={(description) => patch("seo")({ description })}
        />
      </Panel>
    </div>
  );
};

export default GeneralTab;
