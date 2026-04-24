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
    { name: "tagline", title: "Tagline(show below title on image)", type: "string" },
    {
      name: "description",
      title: "Description(About the trip)",
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
              of: [
                {
                  type: "date",
                  options: {
                    dateFormat: "DD-MM-YYYY",
                    calendarTodayLabel: "Today",
                  },
                },
              ],
            },
            {
              name: "schedule",
              title: "Schedule (for this departure)",
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
          ],
        },
      ],
    },
    {
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
      description: "Add each inclusion as a separate bullet point",
    },
    {
      name: "exclusions",
      title: "Exclusions",
      type: "array",
      of: [{ type: "string" }],
      description: "Add each exclusion as a separate bullet point",
    },
    {
      name: "faqs",
      title: "Trip FAQs",
      type: "array",
      of: [
        {
          type: "object",
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
        },
      ],
      description: "FAQs shown only on this trip page",
    },
    {
      name: "brochures",
      title: "Brochures (PDF)",
      type: "array",
      of: [
        {
          type: "object",
          title: "Brochure Item",
          fields: [
            {
              name: "buttonName",
              title: "Button Name",
              type: "string",
              validation: (Rule) => Rule.required().error("Button name is required"),
            },
            {
              name: "pdf",
              title: "PDF File",
              type: "file",
              options: { accept: ".pdf" },
              validation: (Rule) => Rule.required().error("PDF file is required"),
            },
          ],
          preview: {
            select: {
              title: "buttonName",
              subtitle: "pdf.asset.originalFilename",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Brochure",
                subtitle: subtitle || "No PDF selected",
              };
            },
          },
        },
      ],
    },
    {
      name: "tripGallery",
      title: "Trip Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Add any number of photos to show in the trip gallery section",
    },
  ],
};
