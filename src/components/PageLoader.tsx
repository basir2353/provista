"use client";

type PageLoaderProps = {
  label?: string;
  variant?: "spinner" | "cards" | "list" | "inline";
  count?: number;
};

export default function PageLoader({
  label = "Loading…",
  variant = "spinner",
  count = 3,
}: PageLoaderProps) {
  if (variant === "inline") {
    return (
      <div className="pcv-loader pcv-loader-inline" role="status" aria-live="polite">
        <span className="pcv-loader-ring" aria-hidden="true" />
        <span className="pcv-loader-label">{label}</span>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="pcv-loader pcv-loader-cards" role="status" aria-live="polite">
        <div className="pcv-loader-banner">
          <span className="pcv-loader-ring" aria-hidden="true" />
          <span className="pcv-loader-label">{label}</span>
        </div>
        <div className="pcv-skeleton-grid">
          {Array.from({ length: count }).map((_, i) => (
            <div className="pcv-skeleton-card" key={i}>
              <div className="pcv-skel pcv-skel-title" />
              <div className="pcv-skel pcv-skel-price" />
              <div className="pcv-skel pcv-skel-line" />
              <div className="pcv-skel pcv-skel-line short" />
              <div className="pcv-skel pcv-skel-line" />
              <div className="pcv-skel pcv-skel-btn" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="pcv-loader pcv-loader-list" role="status" aria-live="polite">
        <div className="pcv-loader-banner">
          <span className="pcv-loader-ring" aria-hidden="true" />
          <span className="pcv-loader-label">{label}</span>
        </div>
        <div className="pcv-skeleton-list">
          {Array.from({ length: count }).map((_, i) => (
            <div className="pcv-skeleton-row" key={i}>
              <div className="pcv-skel pcv-skel-avatar" />
              <div className="pcv-skel-stack">
                <div className="pcv-skel pcv-skel-line" />
                <div className="pcv-skel pcv-skel-line short" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pcv-loader pcv-loader-spinner" role="status" aria-live="polite">
      <span className="pcv-loader-ring" aria-hidden="true" />
      <span className="pcv-loader-label">{label}</span>
    </div>
  );
}
