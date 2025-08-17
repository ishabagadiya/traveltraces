export default {
  name: "featuredDestination",
  title: "Featured Destination",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. 4,500",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 2 days",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(5),
    },
    {
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "Easy" },
          { title: "Moderate", value: "Moderate" },
          { title: "Challenging", value: "Challenging" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: "tagline", title: "Tagline", type: "string" },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    { name: "videos", title: "Videos", type: "array", of: [{ type: "url" }] },
    { name: "ageAllowed", title: "Age Allowed", type: "string" },
    { name: "reviews", title: "Reviews", type: "number" },
    { name: "about", title: "About", type: "text" },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "joinUsFrom",
      title: "Join Us From",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "place", title: "Place", type: "string" },
            { name: "price", title: "Price", type: "string" },
            { name: "duration", title: "Duration", type: "string" },
            { name: "transport", title: "Transport", type: "string" },
          ],
        },
      ],
    },
    {
      name: "availableDates",
      title: "Available Dates",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Day", type: "number" },
            { name: "heading", title: "Heading", type: "string" },
            { name: "description", title: "Description", type: "text" },
            {
              name: "activities",
              title: "Activities",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "images",
              title: "Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            },
            {
              name: "meals",
              title: "Meals",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
    {
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "exclusions",
      title: "Exclusions",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "thingsToCarry",
      title: "Things To Carry",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "accommodation",
      title: "Accommodation",
      type: "object",
      fields: [
        { name: "type", title: "Type", type: "string" },
        {
          name: "facilities",
          title: "Facilities",
          type: "array",
          of: [{ type: "string" }],
        },
        { name: "roomType", title: "Room Type", type: "string" },
      ],
    },

    { name: "brochure", title: "Brochure", type: "file" },
  ],
};
