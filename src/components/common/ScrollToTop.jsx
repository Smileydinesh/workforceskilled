import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollElement =
      document.scrollingElement || document.documentElement;

    scrollElement.scrollTop = 0;

    // safety for layout shifts (sticky + motion)
    requestAnimationFrame(() => {
      scrollElement.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
