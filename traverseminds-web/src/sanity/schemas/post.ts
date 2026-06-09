import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "teamMember" }] }),
    defineField({
      name: "division", title: "Division", type: "string",
      options: { list: [
        { title: "Traverse Security", value: "security" },
        { title: "Traverse Events", value: "events" },
        { title: "Public Record Africa", value: "public-record" },
        { title: "Digital Literacy", value: "literacy" },
        { title: "Traverse Media", value: "media" },
        { title: "Think Tank", value: "thinktank" },
      ]},
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required().max(280) }),
    defineField({ name: "readTime", title: "Read Time", type: "string", description: 'e.g. "5 min read"', initialValue: "5 min read" }),
    defineField({
      name: "featuredImage", title: "Featured Image", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body", title: "Body", type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true }, fields: [
          { name: "alt", title: "Alt Text", type: "string" },
          { name: "caption", title: "Caption", type: "string" },
        ]},
      ],
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Published (Newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", author: "author.name", division: "division", media: "featuredImage" },
    prepare({ title, author, division, media }) {
      return { title, subtitle: [division, author ? `by ${author}` : ""].filter(Boolean).join(" · "), media };
    },
  },
});
