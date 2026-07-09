"use client";

import { useBlogFilter } from "@/hooks/usePageInteractivity";

const posts = [
  { cat: "linkedin", catLabel: "LinkedIn", bg: "linear-gradient(135deg,#0077b5,#00a0dc)", title: "The LinkedIn Headline Formula That Gets 8x More Recruiter Views", excerpt: "Your LinkedIn headline is the first thing recruiters see. Most people waste it on a job title. Here's the formula that actually works.", author: "Marcus Kim", date: "Jan 20, 2025", read: "7 min", delay: "" },
  { cat: "interview", catLabel: "Interviews", bg: "linear-gradient(135deg,#7c3aed,#4f46e5)", title: "The STAR Method: How to Answer Any Behavioural Interview Question", excerpt: "Master the STAR framework and you'll never be caught off guard by \"Tell me about a time when...\" questions again.", author: "Ananya Patel", date: "Jan 15, 2025", read: "9 min", delay: "rd1" },
  { cat: "salary", catLabel: "Salary", bg: "linear-gradient(135deg,#14532d,var(--teal-dark))", title: "How to Negotiate Your Salary and Get 20%+ More Than the Initial Offer", excerpt: "Most people accept the first offer. The ones who negotiate earn hundreds of thousands more over their careers. Here's how.", author: "Brian Johnson", date: "Jan 10, 2025", read: "11 min", delay: "rd2" },
  { cat: "resume", catLabel: "Resume Tips", bg: "linear-gradient(135deg,var(--teal-dark),var(--teal))", title: "ATS in 2025: Everything You Need to Know to Beat the Robots", excerpt: "Applicant Tracking Systems have evolved. Here's our updated guide to making sure your resume always gets through.", author: "James Webb", date: "Jan 5, 2025", read: "14 min", delay: "rd3" },
  { cat: "career", catLabel: "Career Growth", bg: "linear-gradient(135deg,#7c2d12,#ea580c)", title: "The Career Change Playbook: How to Switch Industries Successfully", excerpt: "A successful industry pivot requires more than updating your resume. Here's our proven step-by-step framework.", author: "Ananya Patel", date: "Dec 28, 2024", read: "15 min", delay: "" },
  { cat: "jobsearch", catLabel: "Job Search", bg: "linear-gradient(135deg,#1e3a5f,#1d4ed8)", title: "The Hidden Job Market: How 80% of Jobs Are Never Advertised", excerpt: "Most job seekers only see the visible market. Here's how to access the 80% of roles filled through networking and referrals.", author: "Sarah Reynolds", date: "Dec 20, 2024", read: "10 min", delay: "rd1" },
  { cat: "resume", catLabel: "Resume Tips", bg: "linear-gradient(135deg,#374151,#111827)", title: "One Page vs Two Page Resume: The Definitive Guide for 2025", excerpt: "The answer isn't as simple as \"years of experience.\" Here's exactly when to use one page and when two is better.", author: "Marcus Kim", date: "Dec 15, 2024", read: "6 min", delay: "rd2" },
  { cat: "linkedin", catLabel: "LinkedIn", bg: "linear-gradient(135deg,#701a75,#c026d3)", title: "How to Write a LinkedIn Summary That Makes Recruiters Stop Scrolling", excerpt: "The LinkedIn About section is the most underused real estate in your professional brand. Here's how to make it work for you.", author: "Nina Chen", date: "Dec 8, 2024", read: "8 min", delay: "rd3" },
];

const popularPosts = [
  ["01", "Why 75% of Resumes Never Reach a Human", "8 min read · 24.5K views"],
  ["02", "The LinkedIn Headline Formula", "7 min read · 18.2K views"],
  ["03", "How to Negotiate 20%+ More Salary", "11 min read · 15.8K views"],
  ["04", "ATS Guide 2025: Beat the Robots", "14 min read · 12.1K views"],
  ["05", "The Career Change Playbook", "15 min read · 9.7K views"],
];

const topics = ["Resume Writing", "ATS Tips", "LinkedIn", "Job Search", "Interviews", "Salary", "Career Change", "Executive", "Cover Letter", "Networking", "Remote Work", "Personal Brand"];

const filters = [
  ["all", "All Posts"],
  ["resume", "Resume Tips"],
  ["linkedin", "LinkedIn"],
  ["jobsearch", "Job Search"],
  ["interview", "Interviews"],
  ["career", "Career Growth"],
  ["salary", "Salary"],
];

export default function BlogContent() {
  useBlogFilter();

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <div className="hero-inner">
            <div>
              <span className="section-label">Career Insights</span>
              <h2 className="hero-title">The ProCareerVista <span>Career Blog</span></h2>
              <p className="hero-desc">Expert advice on resume writing, job searching, LinkedIn strategy, and career growth — published weekly by our certified writers and career coaches.</p>
              <div className="search-bar">
                <input className="search-input" type="text" placeholder="Search articles, tips, guides..." />
                <button className="search-btn">Search →</button>
              </div>
            </div>
            <div className="reveal">
              <div className="featured-article-preview">
                <div className="fa-category">✦ Featured Article</div>
                <div className="fa-title">&quot;Why 75% of Resumes Never Reach a Human — And How to Be in the 25%&quot;</div>
                <div className="fa-excerpt">ATS systems reject most resumes before a recruiter ever sees them. Here&apos;s exactly how to make your resume ATS-proof in 2025...</div>
                <div className="fa-meta">
                  <div className="fa-avatar">SR</div>
                  <span>Sarah Reynolds</span>
                  <span>·</span>
                  <span>8 min read</span>
                </div>
                <a href="#" className="fa-read">Read Article →</a>
              </div>
            </div>
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
              <div className="featured-post reveal" data-cat="resume">
                <div className="featured-post-image" style={{background: "linear-gradient(135deg,var(--navy),var(--navy-soft))"}}>
                  <span className="fp-category">Resume Tips</span>
                  <div style={{position: "relative", zIndex: 2}}>
                    <div style={{fontSize: "4rem", marginBottom: "12px"}}>📄</div>
                    <div className="fp-title">10 Resume Mistakes That Cost You the Interview (And How to Fix Them)</div>
                  </div>
                </div>
                <div className="featured-post-body">
                  <p className="fp-excerpt">From weak bullet points to missing keywords — these are the most common resume errors our writers see every day. Learn how to spot and fix them before your resume hits an ATS or a recruiter&apos;s desk.</p>
                  <div className="fp-meta">
                    <div className="author-avatar-sm" style={{background: "linear-gradient(135deg,var(--teal),var(--aqua))"}}>SR</div>
                    <span>Sarah Reynolds</span>
                    <span>·</span>
                    <span>Jan 28, 2025</span>
                    <span>·</span>
                    <span>12 min read</span>
                  </div>
                  <a href="#" className="read-more" style={{marginTop: "16px", display: "inline-flex"}}>Read Full Article →</a>
                </div>
              </div>

              <div className="posts-grid" id="postsGrid">
                {posts.map((post) => (
                  <div className={`post-card reveal ${post.delay}`} data-cat={post.cat} key={post.title}>
                    <div className="post-image" style={{background: post.bg}}>
                      <span className="post-cat">{post.catLabel}</span>
                      <div className="post-title">{post.title}</div>
                    </div>
                    <div className="post-body">
                      <p className="post-excerpt">{post.excerpt}</p>
                      <div className="post-meta"><span>{post.author}</span><span className="post-dot"></span><span>{post.date}</span><span className="post-dot"></span><span>{post.read}</span></div>
                      <a href="#" className="read-more">Read More →</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="load-more-section">
                <button className="btn btn-outline">Load More Articles</button>
              </div>
            </div>

            <div className="blog-sidebar reveal">
              <div className="sidebar-card">
                <div className="sidebar-title">🔥 Popular Posts</div>
                <div className="popular-posts">
                  {popularPosts.map(([num, title, meta]) => (
                    <div className="popular-post-item" key={num}><div className="pp-num">{num}</div><div><div className="pp-title">{title}</div><div className="pp-meta">{meta}</div></div></div>
                  ))}
                </div>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-title">📬 Free Weekly Tips</div>
                <p style={{fontSize: "14px", color: "var(--gray-500)", marginBottom: "16px", lineHeight: 1.6}}>Get career tips, resume advice, and job market insights every week.</p>
                <div className="newsletter-mini-form">
                  <input className="newsletter-mini-input" type="email" placeholder="your@email.com" />
                  <button className="newsletter-mini-btn">Subscribe Free →</button>
                </div>
                <p style={{fontSize: "11px", color: "var(--gray-500)", marginTop: "8px"}}>No spam. Unsubscribe anytime.</p>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-title">🏷️ Topics</div>
                <div className="tag-cloud">
                  {topics.map((topic) => <span className="blog-tag" key={topic}>{topic}</span>)}
                </div>
              </div>

              <div style={{background: "linear-gradient(135deg,var(--navy),var(--navy-mid))", borderRadius: "var(--radius-lg)", padding: "28px", textAlign: "center"}}>
                <div style={{fontSize: "2.5rem", marginBottom: "12px"}}>✦</div>
                <div style={{fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "white", marginBottom: "10px"}}>Ready to Work With Experts?</div>
                <p style={{fontSize: "13px", color: "var(--gray-300)", lineHeight: 1.6, marginBottom: "18px"}}>Let our certified writers transform your resume and get you more interviews.</p>
                <a href="/get-started" className="btn btn-primary" style={{width: "100%", justifyContent: "center", fontSize: "14px", padding: "12px"}}>Get Started →</a>
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
