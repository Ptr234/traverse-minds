import { defineField, defineType } from "sanity";

export const jobListing = defineType({
  name: "jobListing",
  title: "Job Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: [
          { title: "Security", value: "security" },
          { title: "Events", value: "events" },
          { title: "Public Record EA", value: "ai" },
          { title: "Digital Literacy", value: "literacy" },
          { title: "Media", value: "media" },
          { title: "Think Tank", value: "thinktank" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-Time", value: "full-time" },
          { title: "Contract", value: "contract" },
          { title: "Intern", value: "intern" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "text",
      rows: 10,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "deadline",
      title: "Application Deadline",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this listing is currently visible on the careers page.",
    }),
    defineField({
      name: "hiringManagerEmail",
      title: "Hiring Manager Email",
      type: "string",
      validation: (rule) =>
        rule.email().error("Must be a valid email address"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      division: "division",
      type: "type",
      isActive: "isActive",
    },
    prepare({ title, division, type, isActive }) {
      const badge = isActive ? "Open" : "Closed";
      return {
        title,
        subtitle: `${division ?? "—"} / ${type ?? "—"} — ${badge}`,
      };
    },
  },
});
