import React from "react";
import Image from "next/image";

/* ---------- Types ---------- */

interface TipTapMark {
  type: "bold" | "italic" | "link" | "code" | "underline" | "strike";
  attrs?: Record<string, unknown>;
}

export interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: TipTapMark[];
  attrs?: Record<string, unknown>;
}

interface TipTapRendererProps {
  content: TipTapNode | null | undefined;
}

/* ---------- Helpers ---------- */

function renderMarks(text: string, marks: TipTapMark[] = []): React.ReactNode {
  if (!marks.length) return text;

  return marks.reduce<React.ReactNode>((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{acc}</strong>;
      case "italic":
        return <em>{acc}</em>;
      case "underline":
        return <u>{acc}</u>;
      case "strike":
        return <s>{acc}</s>;
      case "code":
        return (
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm font-mono text-[#d55d25]">
            {acc}
          </code>
        );
      case "link":
        return (
          <a
            href={(mark.attrs?.href as string) ?? "#"}
            target={(mark.attrs?.target as string) ?? "_blank"}
            rel="noopener noreferrer"
            className="text-[#d55d25] underline underline-offset-2 hover:text-[#d55d25]/80 transition-colors"
          >
            {acc}
          </a>
        );
      default:
        return acc;
    }
  }, text);
}

function renderNode(node: TipTapNode, index: number): React.ReactNode {
  const key = `${node.type}-${index}`;

  switch (node.type) {
    case "doc":
      return (
        <div key={key}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </div>
      );

    case "paragraph":
      return (
        <p key={key} className="mb-4 text-white/80 leading-relaxed">
          {node.content?.map((child, i) => renderNode(child, i))}
        </p>
      );

    case "heading": {
      const level = (node.attrs?.level as number) ?? 2;
      const children = node.content?.map((child, i) => renderNode(child, i));
      if (level === 1) {
        return (
          <h1 key={key} className="text-3xl md:text-4xl font-bold text-white mt-12 mb-4">
            {children}
          </h1>
        );
      }
      if (level === 3) {
        return (
          <h3 key={key} className="text-xl md:text-2xl font-bold text-white mt-8 mb-3">
            {children}
          </h3>
        );
      }
      if (level === 4) {
        return (
          <h4 key={key} className="text-lg font-bold text-white mt-6 mb-2">
            {children}
          </h4>
        );
      }
      if (level === 5) {
        return (
          <h5 key={key} className="text-base font-bold text-white mt-6 mb-2">
            {children}
          </h5>
        );
      }
      if (level === 6) {
        return (
          <h6 key={key} className="text-sm font-bold text-white mt-6 mb-2">
            {children}
          </h6>
        );
      }
      // Default to h2
      return (
        <h2 key={key} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">
          {children}
        </h2>
      );
    }

    case "text":
      return (
        <React.Fragment key={key}>
          {renderMarks(node.text ?? "", node.marks)}
        </React.Fragment>
      );

    case "bulletList":
      return (
        <ul
          key={key}
          className="mb-4 ml-6 list-disc space-y-1 text-white/80 marker:text-[#d55d25]"
        >
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );

    case "orderedList":
      return (
        <ol
          key={key}
          className="mb-4 ml-6 list-decimal space-y-1 text-white/80 marker:text-[#d55d25]"
        >
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );

    case "listItem":
      return (
        <li key={key} className="leading-relaxed">
          {node.content?.map((child, i) => renderNode(child, i))}
        </li>
      );

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-[#d55d25] pl-6 italic text-white/70"
        >
          {node.content?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    case "image": {
      const src = (node.attrs?.src as string) ?? "";
      const alt = (node.attrs?.alt as string) ?? "";
      const title = (node.attrs?.title as string) ?? "";
      return (
        <figure key={key} className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {title && (
            <figcaption className="mt-2 text-center text-sm text-white/50">
              {title}
            </figcaption>
          )}
        </figure>
      );
    }

    case "codeBlock":
      return (
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-xl bg-white/5 p-4 text-sm"
        >
          <code className="text-white/80 font-mono">
            {node.content?.map((child, i) => renderNode(child, i))}
          </code>
        </pre>
      );

    case "horizontalRule":
      return (
        <hr
          key={key}
          className="my-8 border-t border-white/10"
        />
      );

    case "hardBreak":
      return <br key={key} />;

    default:
      // Fallback: render children if they exist
      if (node.content) {
        return (
          <div key={key}>
            {node.content.map((child, i) => renderNode(child, i))}
          </div>
        );
      }
      return null;
  }
}

/* ---------- Component ---------- */

export function TipTapRenderer({ content }: TipTapRendererProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="prose-custom">
      {content.type === "doc" && content.content
        ? content.content.map((node, i) => renderNode(node, i))
        : renderNode(content, 0)}
    </div>
  );
}
