import { defineField, defineType } from "sanity";

export const waitlistEntry = defineType({
  name: "waitlistEntry",
  title: "Waitlist Entry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "organisation", title: "Organisation", type: "string" }),
    defineField({
      name: "persona", title: "Persona", type: "string",
      options: { list: [
        { title: "Legal Professional", value: "legal" },
        { title: "Researcher / Academic", value: "researcher" },
        { title: "Journalist", value: "journalist" },
        { title: "Policy Maker", value: "policy" },
        { title: "Business Intelligence", value: "business" },
        { title: "Other", value: "other" },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({
      name: "countryInterest", title: "Country Interest", type: "array", of: [{ type: "string" }],
      options: { list: [
        { title: "Uganda", value: "uganda" },
        { title: "Kenya", value: "kenya" },
        { title: "Tanzania", value: "tanzania" },
        { title: "Rwanda", value: "rwanda" },
        { title: "Burundi", value: "burundi" },
      ]},
    }),
    defineField({ name: "message", title: "Message / Specific Needs", type: "text", rows: 3 }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "status", title: "Status", type: "string",
      options: { list: [
        { title: "Pending", value: "pending" },
        { title: "Contacted", value: "contacted" },
        { title: "Onboarded", value: "onboarded" },
      ], layout: "radio" },
      initialValue: "pending",
    }),
  ],
  orderings: [{ title: "Submitted (Newest)", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", email: "email", status: "status" },
    prepare({ title, email, status }) {
      return { title, subtitle: `${email} · ${status ?? "pending"}` };
    },
  },
});
