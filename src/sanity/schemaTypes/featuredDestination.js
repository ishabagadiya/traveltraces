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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "showOnUpcomingTrips",
      title: "Show this trip on upcoming trips section?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Domestic Destinations", value: "Domestic Destinations" },
          { title: "International Trips", value: "International Trips" },
          { title: "Treks", value: "Treks" },
          { title: "Weekend Trips", value: "Weekend Trips" },
        ],
      },
    },
    {
      name: "image",
      title: "Cover Image(to show on homepage or destination page)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "images",
      title: "5 Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(5).error("Maximum 5 images allowed"),
    },
    { name: "tagline", title: "Tagline(line below title)", type: "string" },
    {
      name: "description",
      title: "Description(line below tagline)",
      type: "text",
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
            { name: "price", title: "Price(write like 4,500)", type: "string" },
            {
              name: "duration",
              title: "Duration",
              type: "object",
              fields: [
                {
                  name: "days",
                  title: "Days",
                  type: "number",
                  validation: (Rule) => Rule.required().min(1),
                },
                {
                  name: "nights",
                  title: "Nights",
                  type: "number",
                  validation: (Rule) => Rule.required().min(0),
                },
              ],
              description: "Enter number of days and nights",
            },
            {
              name: "availableDates",
              title: "Available Dates",
              type: "array",
              of: [{ type: "date" }],
              options: {
                dateFormat: "DD-MM-YYYY",
                calendarTodayLabel: "Today",
              },
            },
          ],
        },
      ],
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            {
              name: "description",
              title: "Description (add points, shown as bullets)",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "images",
              title: "Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            },
          ],
          options: {
            preview: {
              select: { heading: "heading" },
              prepare: ({ heading }) => ({
                title: heading || "Schedule item",
              }),
            },
          },
        },
      ],
    },
    { name: "brochure", title: "Brochure", type: "file" },
  ],
};
