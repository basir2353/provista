"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setProgress(12);

    const step1 = window.setTimeout(() => setProgress(45), 80);
    const step2 = window.setTimeout(() => setProgress(78), 180);
    const step3 = window.setTimeout(() => setProgress(100), 320);
    const done = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 520);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(done);
    };
  }, [pathname]);

  return (
    <div
      className={`nav-progress ${active ? "nav-progress-active" : ""}`}
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
