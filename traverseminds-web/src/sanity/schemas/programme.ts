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
      description: "Drives the audience filter on the Literacy page.",
      options: { list: [
        { title: "Students", value: "students" },
        { title: "Businesses", value: "business" },
        { title: "Teachers", value: "teachers" },
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
      description: 'e.g. "In-person Workshops", "Hybrid (Online + In-person)"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "level", title: "Level", type: "string",
      options: { list: [
        { title: "Beginner", value: "beginner" },
        { title: "Intermediate", value: "intermediate" },
        { title: "Advanced", value: "advanced" },
      ]},
    }),
    defineField({ name: "duration", title: "Duration", type: "string", description: 'e.g. "5 days", "3 months"' }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "longDescription", title: "Full description", type: "text", rows: 6 }),
    defineField({ name: "topics", title: "Topics covered", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "learningOutcomes", title: "Learning outcomes", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "secondaryImage", title: "Secondary Image", type: "image", description: "Second photo on the programme page.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", description: "Lower numbers appear first.", initialValue: 99 }),
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
