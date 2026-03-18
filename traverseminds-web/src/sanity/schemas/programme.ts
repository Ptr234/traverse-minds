import { defineField, defineType } from "sanity";

export const programme = defineType({
  name: "programme",
  title: "Programme",
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
      name: "audience",
      title: "Target Audience",
      type: "string",
      options: {
        list: [
          { title: "Schools", value: "schools" },
          { title: "SMEs", value: "smes" },
          { title: "Government", value: "government" },
          { title: "NGOs", value: "ngos" },
          { title: "Professionals", value: "professionals" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "In-Person", value: "in-person" },
          { title: "Online", value: "online" },
          { title: "Hybrid", value: "hybrid" },
          { title: "On-Site", value: "on-site" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "2 weeks", "3 months", "5 days"',
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "syllabusPdf",
      title: "Syllabus PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this programme is currently accepting enrolments.",
    }),
    defineField({
      name: "nextCohortDate",
      title: "Next Cohort Start Date",
      type: "date",
    }),
    defineField({
      name: "maxEnrolments",
      title: "Max Enrolments",
      type: "number",
      validation: (rule) => rule.min(1).integer(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      audience: "audience",
      isActive: "isActive",
    },
    prepare({ title, audience, isActive }) {
      return {
        title,
        subtitle: `${audience ?? "—"} ${isActive ? "Active" : "Inactive"}`,
      };
    },
  },
});
