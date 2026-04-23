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
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add 1 to 4 photos for this review.',
      validation: Rule => Rule.required().min(1).max(4),
    },
    {
      name: 'photo',
      title: 'Photo (legacy)',
      type: 'image',
      options: { hotspot: true },
      hidden: true,
    },
  ]
} 