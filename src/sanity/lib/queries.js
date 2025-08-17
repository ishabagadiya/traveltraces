export const specialFeaturesQuery = `
  *[_type == "specialFeature" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    "image": image.asset->url,
    order
  }
`;
