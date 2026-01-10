export default {
  name: "featuredDestination",
  title: "Featured Destination",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Domestic Destinations", value: "Domestic Destinations" },
          { title: "International Trips", value: "International Trips" },
          { title: "Winter Treks", value: "Winter Treks" },
        ],
      },
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
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "tagline", title: "Tagline", type: "string" },
    {
      name: "description",
      title: "Description",
      type: "text",
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
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 2 days",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
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
