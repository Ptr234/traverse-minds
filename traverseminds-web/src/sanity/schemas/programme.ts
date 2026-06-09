import { defineField, defineType } from "sanity";

export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: "featuredImage", title: "Featured Image", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "audience", title: "Target Audience", type: "string",
      options: { list: [
        { title: "Schools", value: "schools" },
        { title: "SMEs", value: "smes" },
        { title: "Government", value: "government" },
        { title: "NGOs", value: "ngos" },
        { title: "Professionals", value: "professionals" },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({
      name: "format", title: "Format", type: "string",
      options: { list: [
        { title: "In-Person", value: "in-person" },
        { title: "Online", value: "online" },
        { title: "Hybrid", value: "hybrid" },
        { title: "On-Site", value: "on-site" },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({
      name: "level", title: "Level", type: "string",
      options: { list: [
        { title: "Beginner", value: "beginner" },
        { title: "Intermediate", value: "intermediate" },
        { title: "Advanced", value: "advanced" },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({ name: "duration", title: "Duration", type: "string", description: 'e.g. "5 days", "3 months"' }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6, validation: (r) => r.required() }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
    defineField({ name: "nextCohortDate", title: "Next Cohort Start Date", type: "date" }),
    defineField({ name: "maxEnrolments", title: "Max Enrolments", type: "number", validation: (r) => r.min(1).integer() }),
    defineField({ name: "syllabusPdf", title: "Syllabus PDF", type: "file", options: { accept: ".pdf" } }),
  ],
  preview: {
    select: { title: "title", audience: "audience", isActive: "isActive", media: "featuredImage" },
    prepare({ title, audience, isActive, media }) {
      return { title, subtitle: `${audience ?? "—"} · ${isActive ? "Active" : "Inactive"}`, media };
    },
  },
});
