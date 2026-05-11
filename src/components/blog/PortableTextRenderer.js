import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export function slugifyHeading(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function blockText(block) {
  return (block?.children || [])
    .map((c) => (c?._type === "span" ? c.text || "" : ""))
    .join("");
}

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const i = parts.findIndex((p) => p === "embed" || p === "shorts");
    if (i !== -1 && parts[i + 1]) return parts[i + 1];
  } catch {
    return null;
  }
  return null;
}

function renderInline(children = [], markDefs = []) {
  return children.map((child, idx) => {
    if (child._type !== "span") return null;
    let node = child.text;
    const marks = child.marks || [];
    marks.forEach((mark) => {
      if (mark === "strong") node = <strong key={`s-${idx}`}>{node}</strong>;
      else if (mark === "em") node = <em key={`e-${idx}`}>{node}</em>;
      else if (mark === "underline") node = <u key={`u-${idx}`}>{node}</u>;
      else if (mark === "code")
        node = (
          <code key={`c-${idx}`} className="rounded bg-gray-100 px-1 py-0.5 text-sm">
            {node}
          </code>
        );
      else {
        const def = markDefs.find((d) => d._key === mark);
        if (def?._type === "link" && def.href) {
          node = (
            <a
              key={`l-${idx}`}
              href={def.href}
              target={def.href.startsWith("http") ? "_blank" : undefined}
              rel={def.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-medium text-secondary underline underline-offset-2 hover:text-cyan-600"
            >
              {node}
            </a>
          );
        }
      }
    });
    return <span key={child._key || idx}>{node}</span>;
  });
}

function renderBlock(block) {
  const { style = "normal", children = [], markDefs = [], listItem } = block;
  const content = renderInline(children, markDefs);

  if (listItem) return null;

  const headingId = ["h1", "h2", "h3"].includes(style)
    ? slugifyHeading(blockText(block))
    : undefined;

  switch (style) {
    case "h1":
      return (
        <h1
          id={headingId}
          className="mt-8 scroll-mt-24 text-2xl font-extrabold text-gray-900 sm:text-3xl lg:scroll-mt-[35px]"
        >
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2
          id={headingId}
          className="mt-8 scroll-mt-24 text-xl font-extrabold text-gray-900 sm:text-2xl lg:scroll-mt-[34px]"
        >
          {content}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={headingId}
          className="mt-6 scroll-mt-24 text-lg font-bold text-gray-900 sm:text-xl lg:scroll-mt-[40px]"
        >
          {content}
        </h3>
      );
    case "h4":
      return (
        <h4 className="mt-6 text-base font-bold text-gray-900 sm:text-lg">
          {content}
        </h4>
      );
    case "blockquote":
      return (
        <blockquote className="mt-6 border-l-4 border-cyan-500 pl-4 italic text-gray-700">
          {content}
        </blockquote>
      );
    default:
      return (
        <p className="mt-4 text-sm leading-7 text-gray-800 sm:text-base">
          {content}
        </p>
      );
  }
}

export default function PortableTextRenderer({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  const nodes = [];
  let listBuffer = [];
  let listType = null;

  const flushList = () => {
    if (!listBuffer.length) return;
    const ListTag = listType === "number" ? "ol" : "ul";
    nodes.push(
      <ListTag
        key={`list-${nodes.length}`}
        className={`mt-4 ${
          listType === "number" ? "list-decimal" : "list-disc"
        } space-y-1 pl-6 text-base leading-7 text-gray-800`}
      >
        {listBuffer.map((item, idx) => (
          <li key={item._key || idx}>
            {renderInline(item.children, item.markDefs || [])}
          </li>
        ))}
      </ListTag>
    );
    listBuffer = [];
    listType = null;
  };

  value.forEach((block, idx) => {
    if (block._type === "block" && block.listItem) {
      if (listType && listType !== block.listItem) flushList();
      listType = block.listItem;
      listBuffer.push(block);
      return;
    }

    flushList();

    if (block._type === "block") {
      nodes.push(
        <div key={block._key || idx}>{renderBlock(block)}</div>
      );
      return;
    }

    if (block._type === "image" && block.asset) {
      const src = urlFor(block).width(1600).quality(85).url();
      nodes.push(
        <figure key={block._key || idx} className="mt-6">
          <div className="relative w-full overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={block.alt || ""}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
            />
          </div>
          {block.alt ? (
            <figcaption className="mt-2 text-center text-xs text-gray-500">
              {block.alt}
            </figcaption>
          ) : null}
        </figure>
      );
      return;
    }

    if (block._type === "youtube") {
      const id = getYouTubeId(block.url);
      if (!id) return;
      nodes.push(
        <div
          key={block._key || idx}
          className="mt-6 aspect-video w-full overflow-hidden rounded-xl"
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      );
      return;
    }

    if (block._type === "blogReference" && block.post?.slug?.current) {
      const ref = block.post;
      nodes.push(
        <Link
          key={block._key || idx}
          href={`/blog/${ref.slug.current}`}
          className="mt-6 block rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-cyan-500"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Related read
          </p>
          <p className="mt-1 text-base font-bold text-gray-900">
            {ref.title}
          </p>
        </Link>
      );
      return;
    }

    if (block._type === "table" && Array.isArray(block.rows) && block.rows.length) {
      const hasHeader = block.hasHeader !== false;
      const [headerRow, ...bodyRows] = hasHeader
        ? block.rows
        : [null, ...block.rows];

      nodes.push(
        <figure key={block._key || idx} className="mt-6 overflow-x-auto rounded-lg border border-black/10">
          <table className="w-full border-collapse text-xs sm:text-sm text-gray-800">
            {hasHeader && headerRow ? (
              <thead>
                <tr className="">
                  {(headerRow.cells || []).map((cell, ci) => (
                    <th
                      key={headerRow._key ? `${headerRow._key}-${ci}` : `h-${ci}`}
                      scope="col"
                      className="border-b border-r last:border-r-0 border-black/10 px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-800"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={row?._key || `r-${ri}`}>
                  {(row?.cells || []).map((cell, ci) => (
                    <td
                      key={row?._key ? `${row._key}-${ci}` : `c-${ri}-${ci}`}
                      className="border-b border-r last:border-r-0 border-black/10 px-4 py-3 align-center text-xs sm:text-sm leading-6"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <figcaption className="border-t border-black/10 bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }
  });

  flushList();

  return <div>{nodes}</div>;
}
