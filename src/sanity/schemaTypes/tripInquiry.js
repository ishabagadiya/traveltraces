export default {
  name: "tripInquiry",
  title: "Trip Inquiry",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "destinationSlug",
      title: "Destination Slug",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "destinationName",
      title: "Destination Name",
      type: "string",
    },
    {
      name: "travelDate",
      title: "Preferred Travel Date",
      type: "date",
    },
    {
      name: "travelers",
      title: "Number of Travelers",
      type: "number",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "destinationName",
      phone: "phone",
    },
    prepare({ title, subtitle, phone }) {
      return {
        title: title || "New Inquiry",
        subtitle: `${subtitle || "Destination not set"} • ${phone || "No phone"}`,
      };
    },
  },
};
