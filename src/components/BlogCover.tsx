import { BlogPost, uploadUrl } from "@/lib/api";

type BlogCoverProps = {
  post: BlogPost;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function BlogCover({ post, className, style, children }: BlogCoverProps) {
  const gradient = post.coverGradient || "linear-gradient(135deg,var(--teal-dark),var(--teal))";

  if (post.coverImage) {
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundImage: `linear-gradient(rgba(13,27,42,0.45), rgba(13,27,42,0.65)), url(${uploadUrl(post.coverImage)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={className} style={{ ...style, background: gradient }}>
      {children}
    </div>
  );
}
