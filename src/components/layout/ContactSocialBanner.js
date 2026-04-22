"use client";

import Link from "next/link";
import { BiLogoInstagram } from "react-icons/bi";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const PHONE_DISPLAY = "+91 84601 46012";
const PHONE_TEL = "8460146012";
const WHATSAPP_URL = "https://wa.me/918460146012";

export default function ContactSocialBanner() {
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
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition active:scale-95"
              >
                <FaWhatsapp className="h-3 w-3 md:h-3.5 md:w-3.5" aria-hidden />
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="inline-flex md:h-6 md:w-6 h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-white shadow-sm ring-1 ring-black/[0.06] transition active:scale-95"
              >
                <FaPhoneAlt className="h-2 w-2" aria-hidden />
              </a>
              <span className="shrink-0 whitespace-nowrap text-center sm:text-left text-xs md:text-sm font-medium tabular-nums text-gray-900">
                {PHONE_DISPLAY}
              </span>
            </div>
          </div>

          <div className="h-px w-full shrink-0 bg-gray-200 sm:h-auto sm:w-px sm:self-stretch" />

          {/* Instagram */}
          <div className="relative flex w-full min-w-0 flex-1 flex-col gap-2 items-center sm:items-start justify-center px-5 py-4 sm:py-8 sm:px-6 md:px-10">
            <p className="relative z-10 w-full max-w-none text-center sm:text-left text-pretty text-xs md:text-base font-semibold leading-snug text-gray-900 md:leading-snug">
              Be part of our Instagram journey!
            </p>

            <Link
              href="https://instagram.com/travel_traces__"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex min-w-0 max-w-full items-center gap-2 text-[#dc2743] hover:text-[#dc2743]/80"
            >
              <BiLogoInstagram className="h-4 w-4 shrink-0 md:h-6 md:w-6" aria-hidden />
              <span className="min-w-0 truncate text-xs md:text-base font-medium">
                @travel_traces__
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
