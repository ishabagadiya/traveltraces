export default {
  name: "careerPage",
  title: "Career Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Career Page",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Main image shown at the top of the career page.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Short description for accessibility and SEO.",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      isActive: "isActive",
    },
    prepare({ title, media, isActive }) {
      return {
        title: title || "Career Page",
        subtitle: isActive ? "Active" : "Inactive",
        media,
      };
    },
  },
};
