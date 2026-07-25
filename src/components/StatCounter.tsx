"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number | string;
  suffix?: string;
  prefix?: string;
  format?: "int" | "rating";
  className?: string;
};

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  format = "int",
  className,
}: StatCounterProps) {
  const target = Number(value) || 0;
  const [display, setDisplay] = useState(
    format === "rating" ? `0.0${suffix}` : `${prefix}0${suffix}`
  );
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setDisplay(format === "rating" ? `0.0${suffix}` : `${prefix}0${suffix}`);

    const el = ref.current;
    if (!el || !target) {
      if (format === "rating") setDisplay(`${target.toFixed(1)}${suffix}`);
      else if (target) setDisplay(`${prefix}${target}${suffix}`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (format === "rating") {
            setDisplay(`${(target * eased).toFixed(1)}${suffix}`);
          } else {
            setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
          }
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, prefix, format]);

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}
