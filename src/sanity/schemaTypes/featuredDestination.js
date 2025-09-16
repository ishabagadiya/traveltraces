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
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Himalayan Treks", value: "Himalayan Treks" },
          { title: "Monsoon Treks & Fort Adventures", value: "Monsoon Treks & Fort Adventures" },
          { title: "Weekend Escapes", value: "Weekend Escapes" },
          { title: "Spiritual Journeys", value: "Spiritual Journeys" },
          { title: "Custom Group Trips", value: "Custom Group Trips" },
        ],
      },
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
    { name: "tagline", title: "Tagline", type: "string" },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    { name: "videos", title: "Videos", type: "array", of: [{ type: "url" }] },
    
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
    { name: "ageAllowed", title: "Age Allowed", type: "string" },
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
    { name: "brochure", title: "Brochure", type: "file" },
  ],
};
