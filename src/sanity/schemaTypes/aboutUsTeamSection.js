const founderSlotFields = [
  {
    name: "name",
    title: "Name",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "role",
    title: "Role",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "photo",
    title: "Photo",
    type: "image",
    options: { hotspot: true },
    validation: (Rule) => Rule.required(),
  },
  {
    name: "linkedinUrl",
    title: "LinkedIn URL",
    type: "url",
  },
  {
    name: "instagramUrl",
    title: "Instagram URL",
    type: "url",
  },
  {
    name: "songFile",
    title: "Song File",
    type: "file",
    options: {
      accept: "audio/*",
    },
  },
  {
    name: "details",
    title: "Bio / Details",
    type: "text",
    rows: 4,
  },
];

export default {
  name: "aboutUsTeamSection",
  title: "About Us Team Section",
  type: "document",
  fields: [
    {
      name: "founderYash",
      title: "Founder — Yash",
      type: "object",
      fields: founderSlotFields,
      options: { collapsible: true },
      initialValue: {
        name: "Yash Saksena",
        role: "The Visionary Explorer",
        instagramUrl: "https://www.instagram.com/yashsaksena/",
        details:
          "With an instinct for storytelling and a heart that beats for the mountains, Yash crafts each Travel Traces journey to be deeply personal. His passion for offbeat India and connecting people with purpose ensures every trip is designed to feel intimate and immersive.",
      },
    },
    {
      name: "founderPrithvi",
      title: "Founder — Prithvi",
      type: "object",
      fields: founderSlotFields,
      options: { collapsible: true },
      initialValue: {
        name: "Prithvi Gurjar",
        role: "The Grounded Strategist",
        instagramUrl: "https://www.instagram.com/prithvigurjar/",
        details:
          "Behind every seamless trip is Prithvi, the man with a map and a plan. Calm, calculated, and quietly reliable, he handles everything from logistics to safety, making sure every traveler feels secure, seen, and supported.",
      },
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "The People Behind Desh Videsh",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      initialValue:
        "Built by people who understand travel from both sides, as planners and as travellers.",
    },
    {
      name: "members",
      title: "Team Members",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "designation",
              title: "Designation",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "linkedinUrl",
              title: "LinkedIn URL",
              type: "url",
            },
            {
              name: "instagramUrl",
              title: "Instagram URL",
              type: "url",
            },
            {
              name: "songFile",
              title: "Song File",
              type: "file",
              options: {
                accept: "audio/*",
              },
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "designation",
              media: "photo",
            },
          },
        },
      ],
    },
  ],
};
