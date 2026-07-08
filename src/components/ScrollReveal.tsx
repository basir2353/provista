"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function animateCounter(el: HTMLElement) {
  if (el.dataset.animated === "true") return;
  el.dataset.animated = "true";

  if (el.dataset.format === "rating") {
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${(4.9 * eased).toFixed(1)}★`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return;
  }

  const target = Number(el.dataset.count);
  if (!target) return;

  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const duration = 1400;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll("[data-count]");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const parent = el.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll(":scope > .reveal"))
            : [el];
          const index = siblings.indexOf(el);

          window.setTimeout(() => {
            el.classList.add("visible");
          }, index * 90);

          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
    counters.forEach((el) => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
