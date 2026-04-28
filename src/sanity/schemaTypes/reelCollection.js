export default {
  name: "reelCollection",
  title: "Reel",
  type: "document",
  fields: [
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    },
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/quicktime",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "description",
      subtitle: "video.asset.originalFilename",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Reel",
        subtitle: subtitle || "Video not uploaded",
      };
    },
  },
};
