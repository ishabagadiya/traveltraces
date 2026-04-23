"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { client } from "@/sanity/lib/client";
import instagramIcon from "@/assets/social icons/instagram.png";
import facebookIcon from "@/assets/social icons/facebook.png";
import youtubeIcon from "@/assets/social icons/youtube.png";
import twitterIcon from "@/assets/social icons/twitter.png";
import linkedinIcon from "@/assets/social icons/linkedin.png";

const CONTACT_SOCIAL_QUERY = `*[_type == "contactSocialLinks"][0]{
  callNumber,
  whatsappNumber,
  email,
  instagramUrl,
  facebookUrl,
  youtubeUrl,
  xUrl,
  linkedinUrl
}`;

const COUNTRY_CODE = "91";
const normalizeIndianMobile = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith(COUNTRY_CODE)) {
    return digits.slice(2);
  }
  return digits.slice(-10);
};

export default function ContactSocialBanner() {
  const [links, setLinks] = useState({});

  useEffect(() => {
    let isMounted = true;

    client
      .fetch(CONTACT_SOCIAL_QUERY)
      .then((data) => {
        if (!isMounted || !data) return;
        setLinks(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedCallNumber = useMemo(
    () => normalizeIndianMobile(links.callNumber),
    [links.callNumber]
  );
  const normalizedWhatsappNumber = useMemo(
    () => normalizeIndianMobile(links.whatsappNumber),
    [links.whatsappNumber]
  );
  const mailtoUrl = useMemo(() => `mailto:${links.email}`, [links.email]);
  const callNumberWithCountryCode = useMemo(
    () => `${COUNTRY_CODE}${normalizedCallNumber}`,
    [normalizedCallNumber]
  );
  const whatsappNumberWithCountryCode = useMemo(
    () => `${COUNTRY_CODE}${normalizedWhatsappNumber}`,
    [normalizedWhatsappNumber]
  );
  const whatsappUrl = useMemo(
    () => `https://wa.me/${whatsappNumberWithCountryCode}`,
    [whatsappNumberWithCountryCode]
  );
  const hasCallNumber = normalizedCallNumber.length === 10;
  const hasWhatsappNumber = normalizedWhatsappNumber.length === 10;
  const hasEmail = Boolean(links.email);
  const hasFacebook = Boolean(links.facebookUrl);
  const hasYouTube = Boolean(links.youtubeUrl);
  const hasInstagram = Boolean(links.instagramUrl);
  const hasX = Boolean(links.xUrl);
  const hasLinkedin = Boolean(links.linkedinUrl);

  const handleEmailClick = (event) => {
    event.preventDefault();
    window.location.href = mailtoUrl;
  };

  return (
    <section className="relative z-20 bg-[#dfdfdf] px-4 pb-8 pt-2 md:px-8 md:pb-12">
      <div className="mx-auto w-full max-w-4xl min-w-0 -mb-20 md:-mb-28">
        <div className="flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:min-h-[140px] sm:flex-row sm:rounded-[1.75rem]">
          {/* Contact — full width on mobile (avoid items-start min-content shrink) */}
          <div className="relative flex w-full min-w-0 flex-1 flex-col gap-2 items-center sm:items-start justify-center px-5 py-4 sm:py-8 sm:px-6 md:px-10">
            <p className="w-full text-center sm:text-left text-pretty text-xs md:text-base font-medium leading-snug text-gray-900">
              Don&apos;t wait any longer, Contact us!
            </p>
            <div className="flex w-full min-w-0 flex-nowrap items-center justify-center sm:justify-start gap-2.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 md:gap-2.5 [&::-webkit-scrollbar]:hidden">
              {hasWhatsappNumber ? (
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition active:scale-95"
                >
                  <FaWhatsapp className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden />
                </Link>
              ) : null}
              {hasCallNumber ? (
                <a
                  href={`tel:+${callNumberWithCountryCode}`}
                  aria-label={`Call ${callNumberWithCountryCode}`}
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-sm ring-1 ring-black/[0.06] transition active:scale-95"
                >
                  <FaPhoneAlt className="h-2 w-2" aria-hidden />
                </a>
              ) : null}
              {hasEmail ? (
                <a
                  href={mailtoUrl}
                  onClick={handleEmailClick}
                  aria-label={`Email ${links.email}`}
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-sm ring-1 ring-black/[0.06] transition active:scale-95"
                >
                  <MdEmail className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden />
                </a>
              ) : null}
            </div>
          </div>

          <div className="h-px w-full shrink-0 bg-gray-200 sm:h-auto sm:w-px sm:self-stretch" />

          {/* Socials */}
          <div className="relative flex w-full min-w-0 flex-1 flex-col gap-2 items-center sm:items-start justify-center px-5 py-4 sm:py-8 sm:px-6 md:px-10">
            <p className="relative z-10 w-full max-w-none text-center sm:text-left text-pretty text-xs md:text-base font-semibold leading-snug text-gray-900 md:leading-snug">
              Connect with us on social media!
            </p>

            <div className="flex w-full min-w-0 flex-nowrap items-center justify-center sm:justify-start gap-2.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 md:gap-2.5 [&::-webkit-scrollbar]:hidden">
              {hasInstagram ? (
                <Link
                  href={links.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 overflow-hidden rounded-full shadow-sm transition active:scale-95"
                >
                  <Image src={instagramIcon} alt="" className="h-full w-full object-cover" />
                </Link>
              ) : null}
              {hasFacebook ? (
                <Link
                  href={links.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 overflow-hidden rounded-full shadow-sm transition active:scale-95"
                >
                  <Image src={facebookIcon} alt="" className="h-full w-full object-cover" />
                </Link>
              ) : null}
              {hasYouTube ? (
                <Link
                  href={links.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 overflow-hidden rounded-full shadow-sm transition active:scale-95"
                >
                  <Image src={youtubeIcon} alt="" className="h-full w-full object-cover" />
                </Link>
              ) : null}
              {hasX ? (
                <Link
                  href={links.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 overflow-hidden rounded-full shadow-sm transition active:scale-95"
                >
                  <Image src={twitterIcon} alt="" className="h-full w-full object-cover" />
                </Link>
              ) : null}
              {hasLinkedin ? (
                <Link
                  href={links.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 overflow-hidden rounded-full shadow-sm transition active:scale-95"
                >
                  <Image src={linkedinIcon} alt="" className="h-full w-full object-cover" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
