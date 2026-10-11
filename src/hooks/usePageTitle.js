import { useEffect } from "react";
import { useSiteContent } from "../context/ContentContext";

// Sets the tab title: "<page> | <name>", or the site's SEO title on home.
export default function usePageTitle(page) {
  const { content } = useSiteContent();
  const title = page ? `${page} | ${content.profile.name}` : content.seo.title;
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}
