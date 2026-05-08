import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import StyleShowcaseCarouselClient from "./StyleShowcaseCarouselClient";

const FALLBACK_IMAGE = "/HeroImages/andharban.jpeg";

const toImageUrl = (image) => {
  if (!image?.asset?._ref) return null;

  try {
    return urlFor(image).width(1200).quality(80).url();
  } catch {
    return null;
  }
};

async function getStyleShowcasePhotos() {
  try {
    const section = await client.fetch(
      `*[_type == "homepagePhotosSequence"][0]{
        sectionTitle,
        items[]{
          _key,
          title,
          image
        }
      }`
    );

    const items = Array.isArray(section?.items) ? section.items : [];
    const photos = items
      .map((item, index) => {
        const src = toImageUrl(item?.image);
        if (!src) return null;

        return {
          key: item?._key || `style-showcase-${index}`,
          src,
          alt: item?.title || "Style showcase image",
        };
      })
      .filter(Boolean);

    return {
      title: section?.sectionTitle || "Straight from our travellers' cameras",
      photos,
    };
  } catch {
    return {
      title: "Straight from our travellers' cameras",
      photos: [],
    };
  }
}

export default async function StyleShowcaseSection() {
  const { title, photos } = await getStyleShowcasePhotos();
  if (!photos.length) return null;

  return (
    <section className="bg-white pt-10 md:pt-14 px-4 pb-10 md:px-0 md:pb-14">
      <div className="mx-auto w-full md:w-[90%]">
        <h2 className="text-2xl font-bold text-secondary md:text-4xl mb-8">{title}</h2>
        <StyleShowcaseCarouselClient photos={photos} fallbackImage={FALLBACK_IMAGE} />
      </div>
    </section>
  );
}