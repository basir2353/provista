"use client";

import { useBlogFilter } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import CmsLoadState from "@/components/CmsLoadState";
import { BlogCover } from "@/components/BlogCover";
import { api, BlogPost } from "@/lib/api";
import { formatBlogDate, staggerDelay } from "@/lib/cms";

const filters = [
  ["all", "All Posts"],
  ["resume", "Resume Tips"],
  ["linkedin", "LinkedIn"],
  ["jobsearch", "Job Search"],
  ["interview", "Interviews"],
  ["career", "Career Growth"],
  ["salary", "Salary"],
];

const topics = ["Resume Writing", "ATS Tips", "LinkedIn", "Job Search", "Interviews", "Salary", "Career Change", "Executive", "Cover Letter", "Networking", "Remote Work", "Personal Brand"];

export default function BlogContent() {
  const settings = useSiteSettings();
  const { data: posts, loading, error, retry } = useCmsData(() => api.blog.list(), [], []);
  useBlogFilter();

  const featured = posts.find((p) => p.featured) || posts[0];
  const gridPosts = posts.filter((p) => p.id !== featured?.id);
  const popularPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <div className="hero-inner">
            <div>
              <span className="section-label">{settings.blog_hero_label}</span>
              <h2 className="hero-title">
                {settings.blog_hero_title}{" "}
                <span>{settings.blog_hero_highlight}</span>
              </h2>
              <p className="hero-desc">{settings.blog_hero_description}</p>
              <div className="search-bar">
                <input className="search-input" type="text" placeholder={settings.blog_search_placeholder} />
                <button className="search-btn">Search →</button>
              </div>
            </div>
            {featured && (
              <div className="reveal">
                <div className="featured-article-preview">
                  <div className="fa-category">✦ Featured Article</div>
                  <div className="fa-title">&quot;{featured.title}&quot;</div>
                  <div className="fa-excerpt">{featured.excerpt}</div>
                  <div className="fa-meta">
                    <div className="fa-avatar">{featured.authorInitials || featured.author.slice(0, 2).toUpperCase()}</div>
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <a href={`/blog#${featured.slug}`} className="fa-read">Read Article →</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="filter-section">
        <div className="container">
          <div className="filter-row">
            <span className="filter-label">Filter:</span>
            {filters.map(([cat, label]) => (
              <button className={`filter-chip ${cat === "all" ? "active" : ""}`} data-cat={cat} key={cat}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="blog-section">
        <div className="container">
          <div className="blog-layout">
            <div>
              {featured && (
                <div className="featured-post reveal" data-cat={featured.category}>
                  <BlogCover post={featured} className="featured-post-image">
                    <span className="fp-category">{featured.categoryLabel}</span>
                    <div style={{ position: "relative", zIndex: 2 }}>
                      {!featured.coverImage && <div style={{ fontSize: "4rem", marginBottom: "12px" }}>📄</div>}
                      <div className="fp-title">{featured.title}</div>
                    </div>
                  </BlogCover>
                  <div className="featured-post-body">
                    <p className="fp-excerpt">{featured.excerpt}</p>
                    <div className="fp-meta">
                      <div className="author-avatar-sm" style={{ background: featured.coverGradient || "linear-gradient(135deg,var(--teal),var(--aqua))" }}>
                        {featured.authorInitials || featured.author.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>{formatBlogDate(featured.publishedAt)}</span>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <a href={`/blog#${featured.slug}`} className="read-more" style={{ marginTop: "16px", display: "inline-flex" }}>Read Full Article →</a>
                  </div>
                </div>
              )}

              <div className="posts-grid" id="postsGrid">
                <CmsLoadState
                  loading={loading}
                  error={error}
                  empty={!loading && !error && posts.length === 0}
                  loadingLabel="Loading articles..."
                  emptyLabel="No blog posts published yet."
                  onRetry={retry}
                />
                {gridPosts.map((post: BlogPost, i) => (
                  <div className={`post-card reveal ${staggerDelay(i)}`} data-cat={post.category} key={post.id}>
                    <BlogCover post={post} className="post-image">
                      <span className="post-cat">{post.categoryLabel}</span>
                      <div className="post-title">{post.title}</div>
                    </BlogCover>
                    <div className="post-body">
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-meta">
                        <span>{post.author}</span>
                        <span className="post-dot"></span>
                        <span>{formatBlogDate(post.publishedAt)}</span>
                        <span className="post-dot"></span>
                        <span>{post.readTime}</span>
                      </div>
                      <a href={`/blog#${post.slug}`} className="read-more">Read More →</a>
                    </div>
                  </div>
                ))}
              </div>

              {gridPosts.length > 6 && (
                <div className="load-more-section">
                  <button className="btn btn-outline">Load More Articles</button>
                </div>
              )}
            </div>

            <div className="blog-sidebar reveal">
              <div className="sidebar-card">
                <div className="sidebar-title">🔥 Popular Posts</div>
                <div className="popular-posts">
                  {popularPosts.map((post, i) => (
                    <div className="popular-post-item" key={post.id}>
                      <div className="pp-num">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <div className="pp-title">{post.title}</div>
                        <div className="pp-meta">{post.readTime} · {post.views.toLocaleString()} views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-title">📬 Free Weekly Tips</div>
                <p style={{ fontSize: "14px", color: "var(--gray-500)", marginBottom: "16px", lineHeight: 1.6 }}>Get career tips, resume advice, and job market insights every week.</p>
                <div className="newsletter-mini-form">
                  <input className="newsletter-mini-input" type="email" placeholder="your@email.com" />
                  <button className="newsletter-mini-btn">Subscribe Free →</button>
                </div>
                <p style={{ fontSize: "11px", color: "var(--gray-500)", marginTop: "8px" }}>No spam. Unsubscribe anytime.</p>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-title">🏷️ Topics</div>
                <div className="tag-cloud">
                  {topics.map((topic) => <span className="blog-tag" key={topic}>{topic}</span>)}
                </div>
              </div>

              <div style={{ background: "linear-gradient(135deg,var(--navy),var(--navy-mid))", borderRadius: "var(--radius-lg)", padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✦</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: "10px" }}>Ready to Work With Experts?</div>
                <p style={{ fontSize: "13px", color: "var(--gray-300)", lineHeight: 1.6, marginBottom: "18px" }}>Let our certified writers transform your resume and get you more interviews.</p>
                <a href="/get-started" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "14px", padding: "12px" }}>Get Started →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Want Expert Help with Your Resume?</h2>
          <p>Stop guessing — let our certified writers craft a resume that actually gets you hired.</p>
          <a href="/get-started" className="btn btn-white">✦ Get Your Resume Written</a>
        </div>
      </section>
    </>
  );
}
