import { defineField, defineType } from "sanity";

export const episode = defineType({
  name: "episode",
  title: "Podcast Episode",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "episodeNumber", title: "Episode Number", type: "number", validation: (r) => r.required().min(1).integer() }),
    defineField({
      name: "coverImage", title: "Cover Image", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "audioUrl", title: "Audio URL", type: "url", validation: (r) => r.required().uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "duration", title: "Duration", type: "string", description: 'e.g. "45 min"' }),
    defineField({ name: "guestName", title: "Guest Name", type: "string" }),
    defineField({ name: "guestOrg", title: "Guest Organisation", type: "string" }),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "showNotes", title: "Show Notes", type: "text", rows: 6 }),
    defineField({ name: "transcript", title: "Transcript", type: "text", rows: 10 }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Episode Number (Newest)", name: "episodeNumberDesc", by: [{ field: "episodeNumber", direction: "desc" }] }],
  preview: {
    select: { title: "title", episodeNumber: "episodeNumber", guestName: "guestName", media: "coverImage" },
    prepare({ title, episodeNumber, guestName, media }) {
      return { title: `#${episodeNumber ?? "?"} — ${title}`, subtitle: guestName ?? "No guest", media };
    },
  },
});
