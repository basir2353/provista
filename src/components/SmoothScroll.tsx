"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.origin);
      const isSamePage =
        url.pathname === window.location.pathname ||
        (url.pathname === "/" && pathname === "/");

      if (!isSamePage || !url.hash) return;

      const section = document.querySelector(url.hash);
      if (!section) return;

      event.preventDefault();
      const top =
        section.getBoundingClientRect().top + window.scrollY - 88;

      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", `${url.pathname}${url.hash}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    if (!window.location.hash) return;
    const section = document.querySelector(window.location.hash);
    if (!section) return;

    window.setTimeout(() => {
      const top =
        section.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }, 120);
  }, [pathname]);

  return null;
}
