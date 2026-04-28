"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FaAngleRight } from "react-icons/fa";

const COMMENT_PREVIEW_LEN = 100;
const FALLBACK_REVIEW_IMAGE = "/HeroImages/andharban.jpeg";

const getSanityImageUrl = (image) => {
  if (!image?.asset?._ref) return null;

  try {
    return urlFor(image).url();
  } catch {
    return null;
  }
};

export default function EditorialReviews({
  maxReviews: maxReviewsProp,
  sectionTitle = " ",
}) {
  const pathname = usePathname();
  const isReviewsPage = pathname === "/reviews";
  const isFullList = maxReviewsProp === null;
  const isHomePreview = maxReviewsProp === undefined;
  const numericLimit = typeof maxReviewsProp === "number" ? maxReviewsProp : null;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReview, setActiveReview] = useState(null);
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch(
        `*[_type == "travelerReview"] | order(_createdAt desc){
          _id,
          name,
          trip,
          comment,
          photos,
          photo,
          "destinationSlug": destination->slug.current
        }`
      )
      .then((data) => {
        if (!isMounted) return;

        setReviews(
          data.map((r) => ({
            ...r,
            photos:
              (Array.isArray(r.photos) ? r.photos : [])
                .map(getSanityImageUrl)
                .filter(Boolean)
                .slice(0, 4),
            photo:
              (Array.isArray(r.photos)
                ? r.photos.map(getSanityImageUrl).find(Boolean)
                : null) ||
              getSanityImageUrl(r.photo) ||
              FALLBACK_REVIEW_IMAGE,
          }))
          .map((r) => ({
            ...r,
            photos:
              r.photos && r.photos.length > 0
                ? r.photos
                : r.photo
                  ? [r.photo]
                  : [FALLBACK_REVIEW_IMAGE],
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching traveler reviews:", error);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLgUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!activeReview) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveReview(null);
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeReview]);

  if (loading) {
    return (
      <section className={`bg-[#dfdfdf] px-4 md:px-0 ${isReviewsPage ? "pt-0 pb-15 " : "pt-[200px] pb-5"}`}>
        <div className="mx-auto w-full md:w-[90%]">
          <div className="mb-8 flex gap-4 items-end justify-between">
            <div className="h-8 w-40 rounded-md bg-white/70 animate-pulse md:h-10 md:w-56" />
            {!isReviewsPage ? <div className="h-9 w-24 rounded-full bg-white/70 animate-pulse" /> : null}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:rounded-3xl">
                <div className="mb-4 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
                    <div className="h-3 w-36 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-[85%] rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-[70%] rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="aspect-4/3 rounded-2xl bg-gray-200 animate-pulse" />
                  <div className="aspect-4/3 rounded-2xl bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  const homePreviewCount = isLgUp ? 3 : 4;

  let displayedReviews;
  if (isFullList) {
    displayedReviews = reviews;
  } else if (isHomePreview) {
    displayedReviews = reviews.slice(0, homePreviewCount);
  } else if (numericLimit != null) {
    displayedReviews = reviews.slice(0, numericLimit);
  } else {
    displayedReviews = reviews;
  }

  let showViewAll;
  if (isFullList) {
    showViewAll = false;
  } else if (isHomePreview) {
    showViewAll = reviews.length > homePreviewCount;
  } else if (numericLimit != null) {
    showViewAll = reviews.length > numericLimit;
  } else {
    showViewAll = false;
  }

  const modalRating = activeReview
    ? Math.max(1, Math.min(5, Number(activeReview.rating || 5)))
    : 5;
  const getPhotoGridClass = (count) => {
    if (count <= 1) return "grid-cols-1";
    return "grid-cols-2";
  };

  const getPhotoTileClass = (isModal = false) => {
    return `relative overflow-hidden ${isModal ? "rounded-xl" : "rounded-2xl"} aspect-[4/3]`;
  };

  return (
    <>
      <section className={`bg-[#dfdfdf] px-4 md:px-0 ${isReviewsPage ? "pt-0 pb-15 " : "pt-[200px] pb-5"}`}>
        <div className="mx-auto w-full md:w-[90%]">
          <div className="mb-8 flex gap-4 items-end justify-between">
            <h2 className="text-2xl md:text-4xl font-bold text-secondary">{sectionTitle}</h2>
            {showViewAll ? (
              <Link
                href="/reviews"
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-secondary sm:px-5 sm:py-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white"
              >
                View All <FaAngleRight className="w-4 h-4 ml-2" />
              </Link>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedReviews.map((review, idx) => {
              const avatarLetter = review.name ? review.name.charAt(0).toUpperCase() : "T";
              const isLong = review.comment && review.comment.length > COMMENT_PREVIEW_LEN;
              const shortComment = isLong
                ? `${review.comment.slice(0, COMMENT_PREVIEW_LEN).trim()}...`
                : review.comment || "Wonderful experience and highly recommended.";

              return (
                <article
                  key={review._id || `${review.name}-${idx}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md md:rounded-3xl"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">
                      {avatarLetter}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm md:text-base font-semibold leading-tight text-gray-900">{review.name}</h3>

                      <p className="flex min-w-0 items-center gap-1 text-xs text-gray-600 lg:text-sm">
                        <span className="shrink-0">Booked:</span>
                        {review.destinationSlug ? (
                          <Link
                            href={`/destinations/${review.destinationSlug}`}
                            className="group inline-flex min-w-0 max-w-full flex-1 items-center gap-1 font-semibold text-gray-900 underline-offset-2 hover:underline"
                          >
                            <span className="min-w-0 truncate">{review.trip}</span>
                            <span className="shrink-0 text-gray-500 group-hover:text-gray-700" aria-hidden>
                              ↗
                            </span>
                          </Link>
                        ) : (
                          <span className="min-w-0 flex-1 truncate font-semibold text-gray-900">{review.trip}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-gray-800">
                    &ldquo;{shortComment}&rdquo;{" "}
                    {isLong ? (
                      <button
                        type="button"
                        onClick={() => setActiveReview(review)}
                        className="font-medium text-gray-900 underline-offset-2 hover:underline"
                      >
                        Read more
                      </button>
                    ) : null}
                  </p>

                  <div className={`grid w-full gap-2 ${getPhotoGridClass(review.photos.length)}`}>
                    {review.photos.map((imgSrc, photoIdx) => (
                      <div
                        key={`${review._id || review.name}-photo-${photoIdx}`}
                        className={getPhotoTileClass()}
                      >
                        <Image
                          src={imgSrc}
                          alt={`${review.name || "Traveler"} trip photo ${photoIdx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeReview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close review"
            onClick={() => setActiveReview(null)}
          />

          <div className="relative z-10 max-h-[min(90vh,640px)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:rounded-[1.75rem] md:p-8">
            <button
              type="button"
              onClick={() => setActiveReview(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="flex gap-4 pr-10">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
                <Image
                  src={activeReview.photo}
                  alt={activeReview.name || "Reviewer"}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 pt-0.5">
                <h3 id="review-modal-title" className="text-lg font-bold text-gray-900">
                  {activeReview.name}
                </h3>
                <p className="truncate text-sm text-gray-500" title={activeReview.trip}>
                  {activeReview.trip}
                </p>
              </div>
            </div>

            <div className="mt-4 text-base tracking-tight text-amber-500" aria-hidden>
              {Array.from({ length: modalRating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <div className={`mt-4 grid gap-2 ${getPhotoGridClass(activeReview.photos.length)}`}>
              {activeReview.photos.map((imgSrc, photoIdx) => (
                <div
                  key={`${activeReview._id || activeReview.name}-modal-photo-${photoIdx}`}
                  className={getPhotoTileClass(true)}
                >
                  <Image
                    src={imgSrc}
                    alt={`${activeReview.name || "Traveler"} review photo ${photoIdx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                </div>
              ))}
            </div>

            <p className="mt-5 text-base leading-relaxed text-gray-900">{activeReview.comment}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
