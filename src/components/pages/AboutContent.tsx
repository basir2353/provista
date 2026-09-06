"use client";

import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function AboutContent() {
  const settings = useSiteSettings();

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tag"><span className="hero-tag-dot"></span><span>{settings.about_hero_label}</span></div>
              <h1 className="hero-title">
                {settings.about_hero_title}{" "}
                <span>{settings.about_hero_highlight}</span>
              </h1>
              <p className="hero-desc">{settings.about_hero_description}</p>
              <div className="hero-actions">
                <a href="/get-started" className="btn btn-primary">{settings.about_hero_cta_primary}</a>
                <a href="/team" className="btn btn-outline" style={{color: "white", borderColor: "rgba(255,255,255,0.4)"}}>{settings.about_hero_cta_secondary}</a>
              </div>
            </div>
            <div className="reveal">
              <div className="hero-visual-card">
                <p className="mission-quote">Great resumes don't just list experience, they tell the story of someone who's ready to change the world.</p>
                <div className="mission-author">
                  <div className="mission-avatar">KU</div>
                  <div><div className="mission-name">Kaleem Ullah </div><div className="mission-role">Founder & Chief Resume Writer</div></div>
                </div>
                <div className="hero-stats-row">
                  <div className="hero-stat-box">
                    <div className="hero-stat-num">
                      {settings.home_stat_2_value || "3K"}
                      {settings.home_stat_2_suffix || "K+"}
                    </div>
                    <div className="hero-stat-label">{settings.home_stat_2_label || "Resumes Written"}</div>
                  </div>
                  <div className="hero-stat-box">
                    <div className="hero-stat-num">
                      {settings.home_stat_1_value || "98"}
                      {settings.home_stat_1_suffix || "%"}
                    </div>
                    <div className="hero-stat-label">{settings.home_stat_1_label || "Interview Rate"}</div>
                  </div>
                  <div className="hero-stat-box">
                    <div className="hero-stat-num">
                      {settings.home_stat_3_value || "4.9"}
                      {settings.home_stat_3_suffix || "★"}
                    </div>
                    <div className="hero-stat-label">{settings.home_stat_3_label || "Client Rating"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div>
              <span className="section-label">{settings.about_story_label}</span>
              <h2 className="section-title reveal">
                {settings.about_story_title}{" "}
                <span>{settings.about_story_highlight}</span>
              </h2>
              <p className="story-intro reveal">{settings.about_story_intro}</p>
              <div className="story-highlight reveal">"I started ProCareerVista after watching brilliant colleagues get passed over for jobs because their resumes didn't reflect their true capabilities. That injustice became my mission."</div>
              <p className="story-intro reveal" style={{fontSize: "15px"}}>Today, our team of certified writers serves clients from entry level graduates to Fortune 500 executives, spanning over 20+ industries and 25+ countries. We combine human expertise with cutting edge ATS technology to give every client the best possible chance at the job they deserve.</p>
              <div className="reveal" style={{marginTop: "28px"}}><a href="/team" className="btn btn-primary">Meet Our Full Team →</a></div>
            </div>
            <div className="story-timeline reveal">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year"></div>
                <div className="timeline-title">ProCareerVista Founded</div>
                <div className="timeline-desc">Kaleem Ullah launches the company from his home office, serving her first 50 clients with a 95% interview success rate.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year"></div>
                <div className="timeline-title">Team Expansion</div>
                <div className="timeline-desc">Grew to a team of certified writers, serving clients the Globe.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year"></div>
                <div className="timeline-title">ATS Technology Integration</div>
                <div className="timeline-desc">Introduced proprietary ATS scoring technology, raising average client interview rates from 72% to 94%.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year"></div>
                <div className="timeline-title">Global Expansion</div>
                <div className="timeline-desc">Now serving clients in 25 countries. Team of 4 specialist writers. Launched career coaching and interview prep programs.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year"></div>
                <div className="timeline-title">300+ Careers Transformed</div>
                <div className="timeline-desc">Celebrated a decade of impact. Rated #1 resume writing service with a 4.9/5 client satisfaction score.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="values-section">
        <div className="container">
          <div className="section-header" style={{textAlign: "center", maxWidth: "600px", margin: "0 auto 56px"}}>
            <span className="section-label">Our Core Values</span>
            <h2 className="section-title reveal">What Drives <span>Everything We Do</span></h2>
            <p className="reveal" style={{color: "var(--gray-500)", marginTop: "16px", fontSize: "16px", lineHeight: "1.7"}}>These aren't just words on a wall, they're the principles that guide every resume we write and every client we serve.</p>
          </div>
          <div className="values-grid">
            <div className="value-card reveal"><div className="value-icon">🎯</div><h3 className="value-title">Excellence in Every Word</h3><p className="value-desc">We treat every resume as a masterpiece. No shortcuts, no templates that weren't crafted with deep care and expertise for the specific industry and role.</p></div>
            <div className="value-card reveal rd1"><div className="value-icon">🤝</div><h3 className="value-title">Client Partnership</h3><p className="value-desc">We don't just write about you. we collaborate with you. Every project starts with deep listening to understand your story, goals, and unique strengths.</p></div>
            <div className="value-card reveal rd2"><div className="value-icon">🔬</div><h3 className="value-title">Data-Driven Results</h3><p className="value-desc">Our work is backed by ATS technology, keyword research, and industry data. We don't guess what works; we know, and our results prove it.</p></div>
            <div className="value-card reveal rd3"><div className="value-icon">💡</div><h3 className="value-title">Continuous Innovation</h3><p className="value-desc">The job market evolves constantly. We stay ahead of ATS updates, hiring trends, and industry shifts to ensure your resume always hits the mark.</p></div>
            <div className="value-card reveal rd1"><div className="value-icon">🌍</div><h3 className="value-title">Accessibility for All</h3><p className="value-desc">Everyone deserves great career representation. We serve professionals at every level, from fresh graduates to seasoned executives across all industries.</p></div>
            <div className="value-card reveal rd2"><div className="value-icon">🛡️</div><h3 className="value-title">Integrity Always</h3><p className="value-desc">We are honest about what we can deliver, transparent about our process, and fully committed to your satisfaction, guaranteed or your money back.</p></div>
          </div>
        </div>
      </section>
      
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal"><span className="stat-icon">📄</span><div className="stat-num">3k<sup>+</sup></div><div className="stat-label">Resumes Successfully Delivered</div></div>
            <div className="stat-item reveal rd1"><span className="stat-icon">🌍</span><div className="stat-num">25<sup>+</sup></div><div className="stat-label">Countries Served Worldwide</div></div>
            <div className="stat-item reveal rd2"><span className="stat-icon">📈</span><div className="stat-num">98<sup>%</sup></div><div className="stat-label">Client Interview Success Rate</div></div>
            <div className="stat-item reveal rd3"><span className="stat-icon">⭐</span><div className="stat-num">4.9<sup>/5</sup></div><div className="stat-label">Average Client Satisfaction</div></div>
          </div>
        </div>
      </section>
      
      
      <section className="awards-section">
        <div className="container">
          <div style={{textAlign: "center", maxWidth: "560px", margin: "0 auto 56px"}}>
            <span className="section-label">Recognition</span>
            <h2 className="section-title reveal">Award-Winning <span>Service</span></h2>
            <p className="reveal" style={{color: "var(--gray-500)", marginTop: "16px", fontSize: "15px", lineHeight: "1.7"}}>Our work has been recognized by leading career and business publications worldwide.</p>
          </div>
          <div className="awards-grid">
            <div className="award-card reveal"><span className="award-icon">🏆</span><div className="award-name">#1 Resume Writing Service</div><div className="award-org"></div><div className="award-year"></div></div>
            <div className="award-card reveal rd1"><span className="award-icon">🥇</span><div className="award-name">Best Career Service</div><div className="award-org"></div><div className="award-year"></div></div>
            <div className="award-card reveal rd2"><span className="award-icon">⭐</span><div className="award-name">Excellence in Client Service</div><div className="award-org"></div><div className="award-year"></div></div>
            <div className="award-card reveal rd3"><span className="award-icon">🎖️</span><div className="award-name">Top 10 Career Companies</div><div className="award-org"></div><div className="award-year"></div></div>
          </div>
        </div>
      </section>
      
      
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div>
              <span className="section-label">Why ProCareerVista</span>
              <h2 className="section-title reveal">What Sets Us <span>Apart From the Rest</span></h2>
              <p className="reveal" style={{color: "var(--gray-500)", fontSize: "16px", margin: "16px 0 36px", lineHeight: "1.7"}}>There are hundreds of resume services out there. Here's why 3000+ professionals chose us:</p>
              <div className="why-list">
                <div className="why-item reveal"><div className="why-icon">👤</div><div><div className="why-title">100% Human Written </div><div className="why-desc">Every resume is crafted by a certified human writer who specializes in your exact industry.</div></div></div>
                <div className="why-item reveal rd1"><div className="why-icon">🎯</div><div><div className="why-title">Industry Specialist Writers</div><div className="why-desc">We match you with a writer who has worked in your field, not a generalist. They understand your industry's language, expectations, and hiring patterns.</div></div></div>
                <div className="why-item reveal rd2"><div className="why-icon">📊</div><div><div className="why-title">ATS Score Guarantee of 90+</div><div className="why-desc">Every resume we deliver is tested against leading ATS platforms. If your resume scores below 90, we rewrite it free of charge.</div></div></div>
                <div className="why-item reveal rd3"><div className="why-icon">♾️</div><div><div className="why-title">Unlimited Revisions Until Perfect</div><div className="why-desc">We don't stop until you're completely happy. Unlike competitors who cap revisions at 2-3 rounds, we keep going until it's right.</div></div></div>
              </div>
            </div>
            <div className="why-visual reveal">
              <div className="why-main-box">
                <div className="why-box-icon">🏆</div>
                <div className="why-box-title">Rated #1 Resume Service </div>
                <div className="why-box-desc">Our clients land interviews at a rate 3x higher than the national average.</div>
                <div className="why-box-rating">
                  <div className="why-box-stars">★★★★★</div>
                  <div className="why-box-rating-text">4.9/5 from verified reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Write Your Next Chapter?</h2>
          <p>Join 3000+ professionals who trusted ProCareerVista to transform their careers. Your dream job is one great resume away.</p>
          <div className="cta-actions">
            <a href="/get-started" className="btn btn-white">✦ Get Started Today</a>
            <a href="/pricing" className="btn btn-outline-white">View Pricing</a>
          </div>
        </div>
      </section>
    </>
  );
}
