import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";
import { structure } from "./sanity.structure";

export default defineConfig({
  name: "traverseminds",
  title: "Traverse Minds Africa CMS",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Site Settings is a single document: hide it from "create new"
    templates: (templates) => templates.filter((t) => t.schemaType !== "siteSettings"),
  },
});
