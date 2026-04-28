export default {
  name: "reelCollection",
  title: "Reels Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Travel Reels",
      validation: (Rule) => Rule.required().max(80),
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Only the latest active reels document is shown on the reels page.",
    },
    {
      name: "reels",
      title: "Reels",
      type: "array",
      description: "Add any number of reels to display on the /reels page.",
      of: [
        {
          type: "object",
          name: "reelItem",
          title: "Reel Item",
          fields: [
            {
              name: "title",
              title: "Reel Title",
              type: "string",
              validation: (Rule) => Rule.required().max(100),
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
            {
              name: "thumbnail",
              title: "Thumbnail (Optional)",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "video.asset.originalFilename",
              media: "thumbnail",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Untitled Reel",
                subtitle: subtitle || "Video not uploaded",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "title",
      count: "reels",
      isActive: "isActive",
    },
    prepare({ title, count, isActive }) {
      const reelCount = Array.isArray(count) ? count.length : 0;
      return {
        title: title || "Reels Page",
        subtitle: `${isActive ? "Active" : "Inactive"} • ${reelCount} reel${
          reelCount === 1 ? "" : "s"
        }`,
      };
    },
  },
};
