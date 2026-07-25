"use client";

type CmsLoadStateProps = {
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
  onRetry?: () => void;
};

export default function CmsLoadState({
  loading,
  error,
  empty,
  loadingLabel = "Loading...",
  emptyLabel = "Nothing to show yet.",
  onRetry,
}: CmsLoadStateProps) {
  if (loading) {
    return <p style={{ color: "var(--gray-500)" }}>{loadingLabel}</p>;
  }

  if (error) {
    return (
      <div style={{ color: "var(--gray-500)" }}>
        <p style={{ marginBottom: 8 }}>Couldn’t load content: {error}</p>
        {onRetry && (
          <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  if (empty) {
    return <p style={{ color: "var(--gray-500)" }}>{emptyLabel}</p>;
  }

  return null;
}
