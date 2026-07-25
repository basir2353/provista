"use client";

import { useState } from "react";
import { BlogPost, uploadUrl } from "@/lib/api";

type BlogCoverProps = {
  post: BlogPost;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function BlogCover({ post, className, style, children }: BlogCoverProps) {
  const gradient = post.coverGradient || "linear-gradient(135deg,var(--teal-dark),var(--teal))";
  const [imageFailed, setImageFailed] = useState(false);
  const useImage = Boolean(post.coverImage) && !imageFailed;

  return (
    <div
      className={className}
      style={{
        ...style,
        ...(useImage
          ? {
              backgroundImage: `linear-gradient(rgba(13,27,42,0.45), rgba(13,27,42,0.65)), url(${uploadUrl(post.coverImage)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { background: gradient }),
      }}
    >
      {useImage && (
        // Hidden probe so we can fall back if the cover 404s
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={uploadUrl(post.coverImage)}
          alt=""
          aria-hidden
          style={{ display: "none" }}
          onError={() => setImageFailed(true)}
        />
      )}
      {children}
    </div>
  );
}
