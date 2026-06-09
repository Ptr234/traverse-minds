import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Job Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "division", title: "Division", type: "string",
      options: { list: [
        { title: "Leadership", value: "leadership" },
        { title: "Traverse Security", value: "security" },
        { title: "Traverse Events", value: "events" },
        { title: "Public Record Africa", value: "public-record" },
        { title: "Digital Literacy", value: "literacy" },
        { title: "Traverse Media", value: "media" },
        { title: "Think Tank", value: "thinktank" },
      ]},
    }),
    defineField({
      name: "photo", title: "Photo", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "linkedIn", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "twitter", title: "X / Twitter URL", type: "url" }),
    defineField({ name: "isActive", title: "Currently Active", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", description: "Lower numbers appear first.", initialValue: 99 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
