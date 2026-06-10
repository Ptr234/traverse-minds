import { defineField, defineType } from "sanity";

export const report = defineType({
  name: "report",
  title: "Research Report",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "abstract", title: "Abstract", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "authors", title: "Authors", type: "array", of: [{ type: "reference", to: [{ type: "author" }] }] }),
    defineField({
      name: "topics", title: "Topics", type: "array", of: [{ type: "string" }],
      options: { list: [
        { title: "Data Protection", value: "data-protection" },
        { title: "AI Governance", value: "ai-governance" },
        { title: "Digital ID", value: "digital-id" },
        { title: "Civic Tech", value: "civic-tech" },
        { title: "Open Government", value: "open-gov" },
        { title: "Cybersecurity", value: "cybersecurity" },
      ]},
    }),
    defineField({ name: "publicationDate", title: "Publication Date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "featuredImage", title: "Featured Image", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "pdfFile", title: "PDF Report", type: "file", options: { accept: ".pdf" } }),
    defineField({
      name: "body",
      title: "Report Body (Read Online)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        },
      ],
      description: "Full report content for reading online. Leave empty to show abstract only.",
    }),
    defineField({
      name: "countryCoverage", title: "Country Coverage", type: "array", of: [{ type: "string" }],
      options: { list: [
        { title: "Uganda", value: "uganda" },
        { title: "Kenya", value: "kenya" },
        { title: "Tanzania", value: "tanzania" },
        { title: "Rwanda", value: "rwanda" },
        { title: "Burundi", value: "burundi" },
        { title: "Africa (Regional)", value: "regional" },
      ]},
    }),
  ],
  orderings: [{ title: "Publication Date (Newest)", name: "publicationDateDesc", by: [{ field: "publicationDate", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publicationDate", media: "featuredImage" },
    prepare({ title, date, media }) {
      return { title, subtitle: date ?? "Unpublished", media };
    },
  },
});
