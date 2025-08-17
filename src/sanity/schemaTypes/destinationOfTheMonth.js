export default {
  name: 'destinationOfTheMonth',
  title: 'Destination of the Month',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'taglines',
      title: 'Taglines',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{ type: 'featuredDestination' }],
      validation: Rule => Rule.required(),
    },
  ],
}; 