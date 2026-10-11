import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to the top on route changes only (not on every re-render).
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
