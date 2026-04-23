export default {
  name: "contactSocialLinks",
  title: "Contact & Social Links",
  type: "document",
  fields: [
    {
      name: "callNumber",
      title: "Call Number",
      type: "string",
      description:
        "(e.g. 8460146012).",
      validation: (Rule) => Rule.regex(/^[0-9]{10}$/),
    },
    {
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description:
        "(e.g. 8460146012).",
      validation: (Rule) => Rule.regex(/^[0-9]{10}$/),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "(e.g. traveltraces.co@gmail.com).",
      validation: (Rule) => Rule.email(),
    },
    {
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      description:
        "(e.g. https://instagram.com/travel_traces__).",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    },
    {
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      description: "(e.g. https://facebook.com/travel_traces__).",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    },
    {
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "(e.g. https://youtube.com/travel_traces__).",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    },
    {
      name: "xUrl",
      title: "X (Twitter) URL",
      type: "url",
      description: "(e.g. https://x.com/travel_traces__).",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    },
    {
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      description: "(e.g. https://linkedin.com/travel_traces__).",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    },
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "callNumber",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Contact & Social Links",
        subtitle: subtitle || "Set your contact details",
      };
    },
  },
};
