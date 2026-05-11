import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogsType = defineType({
  name: "blogs",
  title: "Blogs",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (in minutes)",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "cover image shown on the blog card and post header.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Short description for accessibility and SEO.",
        }),
      ],
    }),

    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative Text",
            }),
          ],
        }),
        defineArrayMember({
          name: "youtube",
          title: "YouTube Video",
          type: "object",
          fields: [
            defineField({
              name: "url",
              title: "YouTube URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                  allowRelative: false,
                }).required(),
            }),
          ],
          preview: {
            select: { title: "url" },
            prepare({ title }) {
              return { title: `YouTube Video: ${title}` };
            },
          },
        }),
        defineArrayMember({
          name: "blogReference",
          title: "Blog Reference",
          type: "object",
          fields: [
            defineField({
              name: "post",
              title: "Referenced Blog Post",
              type: "reference",
              to: [{ type: "blogs" }],
            }),
          ],
          preview: {
            select: {
              title: "post.title",
            },
            prepare({ title }) {
              return { title: `Blog Reference: ${title}` };
            },
          },
        }),
        defineArrayMember({
          name: "table",
          title: "Table",
          type: "object",
          fields: [
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
            defineField({
              name: "hasHeader",
              title: "Use first row as header",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                defineArrayMember({
                  name: "row",
                  title: "Row",
                  type: "object",
                  fields: [
                    defineField({
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                    }),
                  ],
                  preview: {
                    select: { cells: "cells" },
                    prepare({ cells }) {
                      return {
                        title: Array.isArray(cells)
                          ? cells.join(" | ")
                          : "Row",
                      };
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              caption: "caption",
              rows: "rows",
            },
            prepare({ caption, rows }) {
              const count = Array.isArray(rows) ? rows.length : 0;
              return {
                title: caption || "Table",
                subtitle: `${count} row${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "headingPairs",
      title: "Heading Pairs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "h2Heading",
              title: "H2 Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "displayHeading",
              title: "Display Heading(table of content)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "h2Heading",
              subtitle: "displayHeading",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});

export default blogsType;
