"use client";

import PageLoader from "@/components/PageLoader";

type CmsLoadStateProps = {
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
  onRetry?: () => void;
  /** spinner | cards | list | inline */
  variant?: "spinner" | "cards" | "list" | "inline";
  count?: number;
};

export default function CmsLoadState({
  loading,
  error,
  empty,
  loadingLabel = "Loading…",
  emptyLabel = "Nothing to show yet.",
  onRetry,
  variant = "spinner",
  count,
}: CmsLoadStateProps) {
  if (loading) {
    return <PageLoader label={loadingLabel} variant={variant} count={count} />;
  }

  if (error) {
    return (
      <div className="pcv-load-error" role="alert">
        <div className="pcv-load-error-icon" aria-hidden="true">
          ⚠
        </div>
        <p className="pcv-load-error-title">Couldn’t load content</p>
        <p className="pcv-load-error-msg">{error}</p>
        {onRetry && (
          <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  if (empty) {
    return <p className="pcv-load-empty">{emptyLabel}</p>;
  }

  return null;
}
