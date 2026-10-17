import { defineField, defineType } from "sanity";

/** Partners & Affiliations on the home and About pages. */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Transparent PNG or SVG; shown in greyscale until hovered.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "isActive", title: "Show on site", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", description: "Lower numbers appear first.", initialValue: 99 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
});
