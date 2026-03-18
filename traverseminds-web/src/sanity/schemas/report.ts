export const report = {
  name: "report",
  title: "Research Report",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "abstract",
      title: "Abstract / Summary",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "author" }] }],
    },
    {
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Data Protection", value: "data-protection" },
          { title: "AI Governance", value: "ai-governance" },
          { title: "Digital ID", value: "digital-id" },
          { title: "Civic Tech", value: "civic-tech" },
          { title: "Open Government", value: "open-gov" },
        ],
      },
    },
    {
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "pdfFile",
      title: "PDF Report",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "countryCoverage",
      title: "Country Coverage",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Uganda", value: "uganda" },
          { title: "Kenya", value: "kenya" },
          { title: "Tanzania", value: "tanzania" },
          { title: "Rwanda", value: "rwanda" },
          { title: "Burundi", value: "burundi" },
          { title: "East Africa (Regional)", value: "regional" },
        ],
      },
    },
  ],
};
