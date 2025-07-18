export default {
  name: 'travelerReview',
  title: 'Traveler Review',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'location', title: 'Location', type: 'string', validation: Rule => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() },
    { name: 'comment', title: 'Comment', type: 'text', validation: Rule => Rule.required() },
    { name: 'rating', title: 'Rating', type: 'number', validation: Rule => Rule.required().min(1).max(5) },
    { name: 'trip', title: 'Trip', type: 'string', validation: Rule => Rule.required() },
    { name: 'date', title: 'Date', type: 'string', validation: Rule => Rule.required() },
    { name: 'verified', title: 'Verified', type: 'boolean', initialValue: true }
  ]
} 