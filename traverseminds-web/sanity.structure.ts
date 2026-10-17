import type { StructureResolver } from "sanity/structure";

// "Site Settings" opens the single settings document instead of a list
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Site Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);
