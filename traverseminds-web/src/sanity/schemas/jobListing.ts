import { defineField, defineType } from "sanity";

export const jobListing = defineType({
  name: "jobListing",
  title: "Job Listing",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Job Title", type: "string", validation: (r) => r.required() }),
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type", title: "Employment Type", type: "string",
      options: { list: [
        { title: "Full-Time", value: "full-time" },
        { title: "Contract", value: "contract" },
        { title: "Intern", value: "intern" },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Location", type: "string", initialValue: "Kampala, Uganda" }),
    defineField({ name: "description", title: "Job Description", type: "text", rows: 10, validation: (r) => r.required() }),
    defineField({ name: "deadline", title: "Application Deadline", type: "date", validation: (r) => r.required() }),
    defineField({ name: "isActive", title: "Active", type: "boolean", initialValue: true }),
    defineField({ name: "hiringManagerEmail", title: "Hiring Manager Email", type: "string", validation: (r) => r.email() }),
  ],
  orderings: [{ title: "Deadline (Soonest)", name: "deadlineAsc", by: [{ field: "deadline", direction: "asc" }] }],
  preview: {
    select: { title: "title", division: "division", type: "type", isActive: "isActive" },
    prepare({ title, division, type, isActive }) {
      return { title, subtitle: `${division ?? "—"} · ${type ?? "—"} · ${isActive ? "Open" : "Closed"}` };
    },
  },
});
