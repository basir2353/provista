"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function hasUsableData<T>(value: T | undefined): boolean {
  if (value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

export function useCmsData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  fallback: T,
  initialData?: T
) {
  const usableInitial = hasUsableData(initialData);
  const [data, setData] = useState<T>(usableInitial ? (initialData as T) : fallback);
  const [loading, setLoading] = useState(!usableInitial);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    let cancelled = false;

    // Soft refresh when SSR already provided data; spinner only when empty.
    if (!usableInitial || retryCount > 0) {
      setLoading(true);
    }
    setError(null);

    fetcher()
      .then((result) => {
        if (cancelled || id !== requestId.current) return;
        setData(result);
      })
      .catch((err: unknown) => {
        if (cancelled || id !== requestId.current) return;
        // Keep SSR data if client refresh fails.
        if (!usableInitial || retryCount > 0) {
          setError(err instanceof Error ? err.message : "Failed to load content");
        }
      })
      .finally(() => {
        if (cancelled || id !== requestId.current) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryCount]);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  return { data, loading, error, retry };
}
