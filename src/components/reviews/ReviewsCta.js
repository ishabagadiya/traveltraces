import Link from "next/link";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=33b5970ecd4ab1db&rlz=1C1YTUH_enIN1024IN1025&sxsrf=ANbL-n4gWQpXmfEnWYDkLgKJUHpaP6h1YQ:1776952142632&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR0leiSzxlQsyvxQasNRJhnpcQ3yvEAi9YoacnRJeYaQLFhrBCPjEKoGsgFeVj3fYbSi2ZV30_h_U97MXidAv2DrTxg-E6_vklwOnxEe7YBc7ci8JYAzu5LiT_CfYYc44JlNPnKnFVnNZv2tUithote5owQh&q=Travel+Traces+%7C+Your+Trusted+Tour+Operator+in+Ahmedabad+Reviews&sa=X&ved=2ahUKEwiSgvrJjoSUAxVE3jgGHR2dEEkQ0bkNegQINBAH&biw=1536&bih=695&dpr=1.25";

export default function ReviewsCta() {
  return (
    <section className="bg-[#dfdfdf] px-4 md:px-0 pt-15">
      <div className="mx-auto w-full rounded-2xl border border-black/10 bg-white/70 p-5 md:w-[90%] md:p-8">
        <p className="max-w-xl text-sm md:text-base leading-relaxed text-black md:leading-[1.35]">
          Don&apos;t just take our word for it - hear from people who&apos;ve transformed their dreams into
          stunning travel experiences with us.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-secondary px-6 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white"
          >
            Read Google Reviews &raquo;
          </a>
        </div>
      </div>
    </section>
  );
}
