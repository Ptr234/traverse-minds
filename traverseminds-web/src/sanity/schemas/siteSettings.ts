import { defineField, defineType } from "sanity";

const img = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
  });

/** One document (id "siteSettings") holding the home hero and other page images. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Home hero", default: true },
    { name: "images", title: "Page images" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", group: "hero", validation: (r) => r.required().max(90) }),
    defineField({ name: "heroDek", title: "Hero text", type: "text", rows: 3, group: "hero", validation: (r) => r.max(280) }),
    defineField({
      name: "heroSlides",
      title: "Hero slideshow",
      description: "Shown in order behind the home page headline. Landscape photos work best.",
      type: "array",
      group: "hero",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }],
      validation: (r) => r.min(1),
    }),
    { ...img("aboutImage", "About page: story image"), group: "images" },
    { ...img("timelineImage", "About page: timeline background", "Shown darkened behind the milestones."), group: "images" },
    { ...img("eventsSpeakImage", "Events page: “Speak at our events” image"), group: "images" },
    { ...img("eventsSponsorImage", "Events page: “Sponsor an event” image"), group: "images" },
    { ...img("christinePortrait", "Meet Christine: portrait"), group: "images" },
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
