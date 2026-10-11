import { createContext, useContext } from "react";
import { siteContent } from "../config/siteContent";

// source: "static" (src/config), "cache" (last good copy in this browser)
// or "live" (fresh from the database). `loading` is true only on a first
// visit while the database request is in flight — render skeletons then.
export const ContentContext = createContext({ content: siteContent, source: "static", loading: false });

export const useSiteContent = () => useContext(ContentContext);
