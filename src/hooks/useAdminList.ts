"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/errors";

export function useAdminList<T>(fetcher: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    fetcher()
      .then(setItems)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [fetcher]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, setItems, loading, error, setError, reload: load };
}
