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
      name: "image",
      title: "Cover Image",
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
      name: "price",
      title: "Price(write like 4,500)",
      type: "string",
    },
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
            {
              name: "day",
              title: "Day",
              type: "number",
              readOnly: true,
              hidden: true,
              initialValue: (_, context) => {
                const parent = context?.parent;
                const arr = Array.isArray(parent) ? parent : [];
                return Math.max(1, arr.length + 1);
              },
            },
            { name: "heading", title: "Heading", type: "string" },
            { name: "description", title: "Description", type: "text" },
            
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
          options: {
            preview: {
              select: { day: "day", heading: "heading" },
              prepare: ({ day, heading }) => ({
                title: day != null ? `Day ${day}` : "New day",
                subtitle: heading || undefined,
              }),
            },
          },
        },
      ],
    },
    { name: "brochure", title: "Brochure", type: "file" },
  ],
};
