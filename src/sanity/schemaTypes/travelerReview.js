export default {
  name: 'travelerReview',
  title: 'Traveler Review',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'destination',
      title: 'Destination page',
      type: 'reference',
      to: [{ type: 'featuredDestination' }],
      description: 'Optional. Links the “Booked” line on the homepage to this trip\'s detail page.',
    },
    { name: 'trip', title: 'Trip', type: 'string', validation: Rule => Rule.required() },
    { name: 'comment', title: 'Comment', type: 'text', validation: Rule => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() },
  ]
} 