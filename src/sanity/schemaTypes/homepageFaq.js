export default {
  name: "homepageFaq",
  title: "Homepage FAQ",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
  },
};
