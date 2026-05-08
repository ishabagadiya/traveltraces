export default {
  name: "homepagePhotosSequence",
  title: "Homepage Photos Sequence",
  type: "document",
  fields: [
    {
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "Straight from our travellers' cameras",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "Showcase Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
