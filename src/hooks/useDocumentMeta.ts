import { useEffect } from "react";

interface DocumentMeta {
  title?: string;
  description?: string;
  image?: string;
}

const setMetaTag = (
  attr: "name" | "property",
  key: string,
  content: string,
) => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

export const useDocumentMeta = ({
  title,
  description,
  image,
}: DocumentMeta) => {
  useEffect(() => {
    const previousTitle = document.title;

    if (title) {
      document.title = title;
      setMetaTag("property", "og:title", title);
    }
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
    }
    if (image) {
      setMetaTag("property", "og:image", image);
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, image]);
};
