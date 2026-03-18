import { defineField, defineType } from "sanity";

export const episode = defineType({
  name: "episode",
  title: "Podcast Episode",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "45 min", "1h 20min"',
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "showNotes",
      title: "Show Notes",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guestName",
      title: "Guest Name",
      type: "string",
    }),
    defineField({
      name: "guestOrg",
      title: "Guest Organisation",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Episode Number (Desc)",
      name: "episodeNumberDesc",
      by: [{ field: "episodeNumber", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      episodeNumber: "episodeNumber",
      guestName: "guestName",
    },
    prepare({ title, episodeNumber, guestName }) {
      return {
        title: `#${episodeNumber ?? "?"} — ${title}`,
        subtitle: guestName ? `Guest: ${guestName}` : "No guest",
      };
    },
  },
});
