import { defineField, defineType } from "sanity";

/** Organisations on the Meet Christine page (career history and advisory roles). */
export const organisation = defineType({
  name: "organisation",
  title: "Organisation (Meet Christine)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Organisation", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Christine's role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "What she did", type: "text", rows: 4 }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", description: "Lower numbers appear first.", initialValue: 99 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "logo" } },
});
