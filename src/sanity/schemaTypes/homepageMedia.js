export default {
  name: "homepageMedia",
  title: "Homepage Media",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Homepage Media",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "featureVideo",
      title: "Feature Video (Between Domestic and Winter Treks)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/quicktime",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "overlapSliderImages",
      title: "Overlap banner (above reviews) – slider images",
      type: "array",
      description:
        "Add one or more photos. They slide one by one in the rounded banner between “More than a visit” and Reviews.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Short description for accessibility and SEO.",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(20),
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
      media: "featureVideo",
      isActive: "isActive",
    },
    prepare({ title, media, isActive }) {
      return {
        title: title || "Homepage Media",
        subtitle: isActive ? "Active" : "Inactive",
        media,
      };
    },
  },
};
