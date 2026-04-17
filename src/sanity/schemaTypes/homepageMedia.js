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
