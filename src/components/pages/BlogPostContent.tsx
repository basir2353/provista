"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BlogCover } from "@/components/BlogCover";
import { BlogPost } from "@/lib/api";
import { formatBlogDate } from "@/lib/cms";

const CTA_LINKS: Record<string, string> = {
  "download the free ats-friendly resume template here": "/templates",
  "get a free resume review from our team": "/free-consultation",
};

function linkForBracketLabel(label: string): string {
  const key = label.trim().toLowerCase();
  if (CTA_LINKS[key]) return CTA_LINKS[key];
  if (key.includes("template")) return "/templates";
  if (key.includes("review") || key.includes("consult")) return "/free-consultation";
  if (key.includes("get started") || key.includes("resume")) return "/get-started";
  return "/get-started";
}

function isHeading(block: string): boolean {
  const line = block.trim();
  if (!line || line.length > 90) return false;
  if (line.includes("\n")) return false;
  if (/^step\s+\d+/i.test(line)) return true;
  if (/^[A-Z0-9].{8,}$/.test(line) && !/[.?!]$/.test(line) && !line.includes("|")) {
    // Title-like single lines without sentence punctuation
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 14) return true;
  }
  return false;
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\](?:\(([^)]+)\))?/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const label = match[1];
    const href = match[2] || linkForBracketLabel(label);
    parts.push(
      <Link key={`link-${key++}`} href={href} className="article-inline-link">
        {label}
      </Link>
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

function ArticleBody({ content, title }: { content: string; title: string }) {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const bodyBlocks =
    blocks[0] && blocks[0].toLowerCase() === title.trim().toLowerCase()
      ? blocks.slice(1)
      : blocks;

  if (bodyBlocks.length === 0) {
    return <p className="article-p">This article has no content yet.</p>;
  }

  return (
    <div className="article-body">
      {bodyBlocks.map((block, i) => {
        if (isHeading(block)) {
          return (
            <h2 className="article-h2" key={i}>
              {block}
            </h2>
          );
        }

        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length > 1 && lines.every((l) => l.length < 140)) {
          return (
            <div className="article-block" key={i}>
              {lines.map((line, j) => (
                <p className="article-p" key={j}>
                  {renderInline(line)}
                </p>
              ))}
            </div>
          );
        }

        return (
          <p className="article-p" key={i}>
            {renderInline(block.replace(/\n/g, " "))}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogPostContent({
  post,
  related = [],
}: {
  post: BlogPost;
  related?: BlogPost[];
}) {
  const initials =
    post.authorInitials || post.author.slice(0, 2).toUpperCase();

  return (
    <>
      <section className="article-hero">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="container">
          <div className="article-hero-inner">
            <Link href="/blog" className="article-back">
              ← Back to Blog
            </Link>
            <span className="section-label">{post.categoryLabel}</span>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
            <div className="article-meta">
              <div
                className="author-avatar-sm"
                style={{
                  background:
                    post.coverGradient ||
                    "linear-gradient(135deg,var(--teal),var(--aqua))",
                }}
              >
                {initials}
              </div>
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="article-section">
        <div className="container">
          <div className="article-layout">
            <article className="article-card">
              <BlogCover post={post} className="article-cover" />
              <div className="article-content">
                <ArticleBody content={post.content || ""} title={post.title} />
              </div>
            </article>

            <aside className="blog-sidebar">
              {related.length > 0 && (
                <div className="sidebar-card">
                  <div className="sidebar-title">More Articles</div>
                  <div className="popular-posts">
                    {related.map((item, i) => (
                      <Link
                        href={`/blog/${item.slug}`}
                        className="popular-post-item"
                        key={item.id}
                      >
                        <div className="pp-num">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <div className="pp-title">{item.title}</div>
                          <div className="pp-meta">{item.readTime}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  background:
                    "linear-gradient(135deg,var(--navy),var(--navy-mid))",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✦</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  Ready to Work With Experts?
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--gray-300)",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                  }}
                >
                  Let our certified writers transform your resume and get you
                  more interviews.
                </p>
                <Link
                  href="/get-started"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontSize: "14px",
                    padding: "12px",
                  }}
                >
                  Get Started →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Want Expert Help with Your Resume?</h2>
          <p>
            Stop guessing — let our certified writers craft a resume that
            actually gets you hired.
          </p>
          <Link href="/get-started" className="btn btn-white">
            ✦ Get Your Resume Written
          </Link>
        </div>
      </section>
    </>
  );
}
