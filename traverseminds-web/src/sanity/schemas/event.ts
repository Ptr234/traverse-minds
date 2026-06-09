import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Name",
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
      name: "type",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Luncheon", value: "luncheon" },
          { title: "Conference", value: "conference" },
          { title: "Hackathon", value: "hackathon" },
          { title: "Workshop", value: "workshop" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Start Date & Time",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "organisation", title: "Organisation", type: "string" },
            { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short promotional line shown in teasers, e.g. 'An intimate executive lunch for Africa's CISO leaders.'",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. Free, Complimentary, UGX 150,000",
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "array",
      of: [{ type: "string" }],
      description: "Who should attend — each item is one role, e.g. 'CISOs & IT Security Managers'",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPast",
      title: "Past Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "thumbnail",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date set",
        media,
      };
    },
  },
});
