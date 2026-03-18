export const waitlistEntry = {
  name: "waitlistEntry",
  title: "Waitlist Entry",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: "organisation",
      title: "Organisation",
      type: "string",
    },
    {
      name: "persona",
      title: "Persona",
      type: "string",
      options: {
        list: [
          { title: "Legal Professional", value: "legal" },
          { title: "Researcher / Academic", value: "researcher" },
          { title: "Journalist", value: "journalist" },
          { title: "Policy Maker", value: "policy" },
          { title: "Business Intelligence", value: "business" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "countryInterest",
      title: "Country Interest",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Uganda", value: "uganda" },
          { title: "Kenya", value: "kenya" },
          { title: "Tanzania", value: "tanzania" },
          { title: "Rwanda", value: "rwanda" },
          { title: "Burundi", value: "burundi" },
        ],
      },
    },
    {
      name: "message",
      title: "Message / Specific Needs",
      type: "text",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Contacted", value: "contacted" },
          { title: "Onboarded", value: "onboarded" },
        ],
      },
      initialValue: "pending",
    },
  ],
};
