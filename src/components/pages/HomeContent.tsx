"use client";

import { useHomeInteractivity } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { TeamAvatar, TeamMemberSocials } from "@/components/TeamMemberCard";
import { api } from "@/lib/api";
import { revealDelay } from "@/lib/cms";

export default function HomeContent() {
  const settings = useSiteSettings();
  const { data: industries } = useCmsData(() => api.industries.list(), [], []);
  const { data: testimonials } = useCmsData(() => api.testimonials.list(), [], []);
  const { data: faqs } = useCmsData(() => api.faqs.list(), [], []);
  const { data: teamMembers } = useCmsData(() => api.team.list(), [], []);
  useHomeInteractivity();

  const homeFaqs = faqs.filter((f) => f.page === "home" || f.page === "general").slice(0, 8);
  const homeTeam = teamMembers.slice(0, 4);

  return (
    <>
      <section id="hero">
        <div className="hero-bg-shape hero-bg-shape-1"></div>
        <div className="hero-bg-shape hero-bg-shape-2"></div>
        <div className="hero-grid-overlay"></div>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                <span>{settings.home_hero_badge}</span>
              </div>
              <h1 className="hero-headline">
                {settings.home_hero_line1} <span className="line-teal">{settings.home_hero_line1_highlight}</span><br />
                {settings.home_hero_line2} <span className="line-accent">{settings.home_hero_line2_highlight}</span><br />
                {settings.home_hero_line3}
              </h1>
              <p className="hero-desc">{settings.home_hero_description}</p>
              <div className="hero-actions">
                <a href="/get-started" className="btn btn-primary">{settings.home_hero_cta_primary}</a>
                <a href="/templates" className="btn btn-outline" style={{color: "white", borderColor: "rgba(255,255,255,0.3)"}}>{settings.home_hero_cta_secondary}</a>
              </div>
              <div className="hero-stats">
                <div>
                  <div
                    className="hero-stat-num"
                    data-count={settings.home_stat_1_value || "98"}
                    data-suffix={settings.home_stat_1_suffix || "%"}
                  >
                    0{settings.home_stat_1_suffix || "%"}
                  </div>
                  <div className="hero-stat-label">{settings.home_stat_1_label || "Interview Rate"}</div>
                </div>
                <div>
                  <div
                    className="hero-stat-num"
                    data-count={settings.home_stat_2_value || "12"}
                    data-suffix={settings.home_stat_2_suffix || "K+"}
                  >
                    0{settings.home_stat_2_suffix || "K+"}
                  </div>
                  <div className="hero-stat-label">{settings.home_stat_2_label || "Resumes Written"}</div>
                </div>
                <div>
                  <div
                    className="hero-stat-num"
                    data-count={settings.home_stat_3_value || "4.9"}
                    data-suffix={settings.home_stat_3_suffix || "★"}
                    data-format="rating"
                  >
                    {settings.home_stat_3_value || "4.9"}
                    {settings.home_stat_3_suffix || "★"}
                  </div>
                  <div className="hero-stat-label">{settings.home_stat_3_label || "Client Rating"}</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-badge-1">
                <span className="badge-icon">🎯</span>
                <div>
                  <div style={{fontSize: "11px", opacity: "0.7", fontFamily: "var(--font-mono)"}}>ATS SCORE</div>
                  <div>98 / 100</div>
                </div>
              </div>
              <div className="hero-resume-mockup">
                <div className="resume-header-mock">
                  <div className="resume-avatar">JD</div>
                  <div>
                    <div className="resume-name">Jane Doe</div>
                    <div className="resume-role">Senior Product Manager</div>
                  </div>
                </div>
                <div className="resume-section-mock">
                  <div className="resume-section-title-mock">Experience</div>
                  <div className="resume-line w-full highlight"></div>
                  <div className="resume-line w-3q"></div>
                  <div className="resume-line w-full"></div>
                  <div className="resume-line w-half"></div>
                </div>
                <div className="resume-section-mock">
                  <div className="resume-section-title-mock">Skills</div>
                  <div style={{display: "flex", gap: "6px", flexWrap: "wrap"}}>
                    <span style={{background: "var(--mint)", color: "var(--teal-dark)", fontSize: "10px", padding: "3px 10px", borderRadius: "50px", fontWeight: "600"}}>Strategy</span>
                    <span style={{background: "var(--mint)", color: "var(--teal-dark)", fontSize: "10px", padding: "3px 10px", borderRadius: "50px", fontWeight: "600"}}>Agile</span>
                    <span style={{background: "var(--mint)", color: "var(--teal-dark)", fontSize: "10px", padding: "3px 10px", borderRadius: "50px", fontWeight: "600"}}>Leadership</span>
                    <span style={{background: "var(--mint)", color: "var(--teal-dark)", fontSize: "10px", padding: "3px 10px", borderRadius: "50px", fontWeight: "600"}}>Analytics</span>
                  </div>
                </div>
                <div className="resume-section-mock">
                  <div className="resume-section-title-mock">Education</div>
                  <div className="resume-line w-full"></div>
                  <div className="resume-line w-half"></div>
                </div>
              </div>
              <div className="floating-badge-2">
                <span className="badge-icon">✅</span>
                <div>
                  <div style={{fontSize: "11px", opacity: "0.85", fontFamily: "var(--font-mono)"}}>INTERVIEW CALL</div>
                  <div>2 days after delivery!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="brands">
        <div className="container">
          <p className="brands-label">Clients hired at these leading companies</p>
        </div>
        <div style={{overflow: "hidden"}}>
          <div className="brands-track">
            <span className="brand-item">Google</span><span className="brand-dot"></span>
            <span className="brand-item">Microsoft</span><span className="brand-dot"></span>
            <span className="brand-item">Amazon</span><span className="brand-dot"></span>
            <span className="brand-item">McKinsey</span><span className="brand-dot"></span>
            <span className="brand-item">Goldman Sachs</span><span className="brand-dot"></span>
            <span className="brand-item">Apple</span><span className="brand-dot"></span>
            <span className="brand-item">Meta</span><span className="brand-dot"></span>
            <span className="brand-item">Deloitte</span><span className="brand-dot"></span>
            <span className="brand-item">JPMorgan</span><span className="brand-dot"></span>
            <span className="brand-item">Accenture</span><span className="brand-dot"></span>
            <span className="brand-item">IBM</span><span className="brand-dot"></span>
            <span className="brand-item">Salesforce</span><span className="brand-dot"></span>
            
            <span className="brand-item">Google</span><span className="brand-dot"></span>
            <span className="brand-item">Microsoft</span><span className="brand-dot"></span>
            <span className="brand-item">Amazon</span><span className="brand-dot"></span>
            <span className="brand-item">McKinsey</span><span className="brand-dot"></span>
            <span className="brand-item">Goldman Sachs</span><span className="brand-dot"></span>
            <span className="brand-item">Apple</span><span className="brand-dot"></span>
            <span className="brand-item">Meta</span><span className="brand-dot"></span>
            <span className="brand-item">Deloitte</span><span className="brand-dot"></span>
            <span className="brand-item">JPMorgan</span><span className="brand-dot"></span>
            <span className="brand-item">Accenture</span><span className="brand-dot"></span>
            <span className="brand-item">IBM</span><span className="brand-dot"></span>
            <span className="brand-item">Salesforce</span><span className="brand-dot"></span>
          </div>
        </div>
      </section>
      
      
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual reveal">
              <div className="about-main-card">
                <div className="about-card-pattern"></div>
                <div className="about-card-number">10</div>
                <div className="about-card-stat">
                  <div className="about-card-stat-num">10<span>+</span></div>
                  <div className="about-card-stat-label">Years helping professionals advance their careers globally</div>
                </div>
              </div>
              <div className="about-floating-stats">
                <div style={{fontSize: "11px", fontWeight: "700", color: "var(--navy)", marginBottom: "6px", fontFamily: "var(--font-mono)", letterSpacing: "1px", textTransform: "uppercase"}}>Live Stats</div>
                <div className="about-mini-stat">
                  <span className="about-mini-stat-label">Resumes Delivered</span>
                  <span className="about-mini-stat-val">12,400+</span>
                </div>
                <div className="about-mini-stat">
                  <span className="about-mini-stat-label">Avg. Response Rate</span>
                  <span className="about-mini-stat-val">3x Higher</span>
                </div>
                <div className="about-mini-stat">
                  <span className="about-mini-stat-label">Satisfaction Score</span>
                  <span className="about-mini-stat-val">4.9 / 5.0</span>
                </div>
                <div className="about-mini-stat">
                  <span className="about-mini-stat-label">Countries Served</span>
                  <span className="about-mini-stat-val">45+</span>
                </div>
              </div>
            </div>
            <div className="about-content">
              <span className="section-label">{settings.home_about_label}</span>
              <h2 className="section-title reveal">{settings.home_about_title} <span>{settings.home_about_highlight}</span></h2>
              <p className="about-intro reveal">ProCareerVista was founded with one mission: to ensure that talented professionals are never overlooked because of a poorly written resume. Our certified writers bring deep industry knowledge and a passion for storytelling to every document we create.</p>
              <ul className="about-features">
                <li className="about-feature-item reveal reveal-delay-1">
                  <div className="about-feature-icon">🏆</div>
                  <div>
                    <div className="about-feature-title">Certified Professional Resume Writers</div>
                    <div className="about-feature-desc">All writers hold CPRW certification with 5+ years of industry-specific expertise.</div>
                  </div>
                </li>
                <li className="about-feature-item reveal reveal-delay-2">
                  <div className="about-feature-icon">🎯</div>
                  <div>
                    <div className="about-feature-title">ATS Optimization Guaranteed</div>
                    <div className="about-feature-desc">Every resume is tested against leading ATS platforms to ensure maximum visibility.</div>
                  </div>
                </li>
                <li className="about-feature-item reveal reveal-delay-3">
                  <div className="about-feature-icon">⚡</div>
                  <div>
                    <div className="about-feature-title">48-Hour Turnaround</div>
                    <div className="about-feature-desc">Rush and standard delivery options available with unlimited revisions included.</div>
                  </div>
                </li>
              </ul>
              <div className="reveal"><a href="/get-started" className="btn btn-primary">Start Your Transformation</a></div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="industries">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{settings.home_industries_label}</span>
            <h2 className="section-title reveal">{settings.home_industries_title} <span>{settings.home_industries_highlight}</span></h2>
            <p className="section-sub reveal">Our writers have deep domain expertise across 20+ industries, ensuring your resume speaks the language of your target field.</p>
          </div>
          <div className="industries-grid">
            {industries.map((industry, i) => (
              <div className={`industry-card reveal ${revealDelay(i + 1)}`} key={industry.id}>
                <span className="industry-icon">{industry.icon || "✦"}</span>
                <div className="industry-name">{industry.name}</div>
                {industry.resumeCount && <div className="industry-count">{industry.resumeCount}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      
      <section id="start">
        <div className="start-bg-blob start-bg-blob-1"></div>
        <div className="start-bg-blob start-bg-blob-2"></div>
        <div className="container">
          <div className="start-inner">
            <div className="start-left">
              <span className="section-label">{settings.home_how_label}</span>
              <h2 className="section-title reveal">{settings.home_how_title} <span>{settings.home_how_highlight}</span></h2>
              <p className="start-desc reveal">From first consultation to final delivery — our streamlined process gets you an interview-winning resume fast.</p>
              <div className="start-actions reveal">
                <a href="/get-started" className="btn btn-primary">✦ Get Started Now</a>
                <a href="#video-section" className="btn btn-outline" style={{color: "white", borderColor: "rgba(255,255,255,0.3)"}}>Watch How It Works</a>
              </div>
            </div>
            <div className="start-steps">
              <div className="start-step reveal reveal-delay-1">
                <div className="step-number">01</div>
                <div>
                  <div className="step-content-title">Share Your Career Goals</div>
                  <div className="step-content-desc">Fill out a brief intake form about your background, target roles, and aspirations. Our team reviews your existing resume and job history.</div>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="start-step reveal reveal-delay-2">
                <div className="step-number">02</div>
                <div>
                  <div className="step-content-title">Get Matched with Your Writer</div>
                  <div className="step-content-desc">We pair you with a certified writer who specializes in your exact industry and career level for a personalized approach.</div>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="start-step reveal reveal-delay-3">
                <div className="step-number">03</div>
                <div>
                  <div className="step-content-title">Receive & Refine Your Resume</div>
                  <div className="step-content-desc">Receive your professionally written resume within 48 hours. Request unlimited revisions until it's exactly right.</div>
                </div>
              </div>
              <div className="step-connector"></div>
              <div className="start-step reveal reveal-delay-4">
                <div className="step-number">04</div>
                <div>
                  <div className="step-content-title">Land Your Dream Job</div>
                  <div className="step-content-desc">Apply with confidence. Our ATS-optimized resumes have helped 12,000+ professionals land roles at top companies worldwide.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="templates">
        <div className="container">
          <div className="templates-header">
            <div>
              <span className="section-label">{settings.home_templates_label}</span>
              <h2 className="section-title reveal">{settings.home_templates_title} <span>{settings.home_templates_highlight}</span></h2>
              <p style={{color: "var(--gray-500)", marginTop: "10px", fontSize: "15px", maxWidth: "480px"}} className="reveal">All templates are fully ATS-compatible and available in Word & PDF formats with your order.</p>
            </div>
            <a href="/pricing" className="btn btn-primary reveal" style={{flexShrink: "0"}}>Get All Templates</a>
          </div>
          <div className="templates-scroll">
            <div className="template-card tmpl-1">
              <div className="template-preview">
                <div className="template-preview-inner">
                  <div className="tmpl-header-bar"></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "80%"}}></div>
                  <div className="tmpl-line" style={{width: "90%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "70%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "60%"}}></div>
                  <div className="tmpl-line" style={{width: "80%"}}></div>
                </div>
              </div>
              <div className="template-card-info">
                <div className="template-card-name">Executive</div>
                <div className="template-card-tag">MOST POPULAR</div>
              </div>
              <div className="template-badge">★ Top Pick</div>
            </div>
            <div className="template-card tmpl-2">
              <div className="template-preview">
                <div className="template-preview-inner">
                  <div className="tmpl-header-bar"></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "75%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "90%"}}></div>
                  <div className="tmpl-line" style={{width: "65%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "55%"}}></div>
                </div>
              </div>
              <div className="template-card-info">
                <div className="template-card-name">Creative Pro</div>
                <div className="template-card-tag">DESIGN ROLES</div>
              </div>
            </div>
            <div className="template-card tmpl-3">
              <div className="template-preview">
                <div className="template-preview-inner">
                  <div className="tmpl-header-bar"></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "85%"}}></div>
                  <div className="tmpl-line" style={{width: "70%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "95%"}}></div>
                  <div className="tmpl-line" style={{width: "60%"}}></div>
                </div>
              </div>
              <div className="template-card-info">
                <div className="template-card-name">Corporate</div>
                <div className="template-card-tag">FINANCE & LAW</div>
              </div>
            </div>
            <div className="template-card tmpl-4">
              <div className="template-preview">
                <div className="template-preview-inner">
                  <div className="tmpl-header-bar"></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "80%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "90%"}}></div>
                  <div className="tmpl-line" style={{width: "75%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "65%"}}></div>
                </div>
              </div>
              <div className="template-card-info">
                <div className="template-card-name">Tech Stack</div>
                <div className="template-card-tag">IT & ENGINEERING</div>
              </div>
            </div>
            <div className="template-card tmpl-5">
              <div className="template-preview">
                <div className="template-preview-inner">
                  <div className="tmpl-header-bar"></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "70%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "85%"}}></div>
                  <div className="tmpl-line" style={{width: "60%"}}></div>
                </div>
              </div>
              <div className="template-card-info">
                <div className="template-card-name">Modern Edge</div>
                <div className="template-card-tag">ENTRY LEVEL</div>
              </div>
              <div className="template-badge" style={{background: "var(--accent)"}}>New</div>
            </div>
            <div className="template-card tmpl-6">
              <div className="template-preview">
                <div className="template-preview-inner">
                  <div className="tmpl-header-bar"></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "100%"}}></div>
                  <div className="tmpl-line" style={{width: "90%"}}></div>
                  <div className="tmpl-line" style={{width: "75%"}}></div>
                  <div className="tmpl-section-bar"></div>
                  <div className="tmpl-line" style={{width: "80%"}}></div>
                </div>
              </div>
              <div className="template-card-info">
                <div className="template-card-name">Minimalist</div>
                <div className="template-card-tag">SENIOR ROLES</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="video-section">
        <div className="container">
          <div className="video-inner">
            <span className="section-label" style={{display: "block", textAlign: "center"}}>See It In Action</span>
            <h2 className="section-title reveal" style={{color: "white"}}>How We Transform <span>Your Career Story</span></h2>
            <p className="section-sub reveal">Watch how our certified writers turn a plain resume into an interview-winning document in under 48 hours.</p>
            <div className="video-wrapper reveal">
              <div className="video-thumbnail" >
                <div className="video-bg-text">RESUME</div>
                <div className="video-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="video-preview-lines">
                  <div className="video-preview-title">Our Resume Writing Process</div>
                  <div className="video-preview-sub">3 min — How we craft interview-winning resumes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="pricing">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{settings.home_pricing_label}</span>
            <h2 className="section-title reveal">{settings.home_pricing_title} <span>{settings.home_pricing_highlight}</span></h2>
            <p className="section-sub reveal">No hidden fees. One-time payment. Unlimited revisions until you're 100% satisfied.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card reveal reveal-delay-1">
              <div className="pricing-plan-name">Starter</div>
              <div className="pricing-price"><span className="pricing-price-currency">$</span>99</div>
              <div className="pricing-period">one-time payment</div>
              <div className="pricing-desc">Perfect for entry-level professionals and recent graduates entering the job market.</div>
              <div className="pricing-divider"></div>
              <ul className="pricing-features">
                <li><span className="pricing-check">✓</span>Professional Resume Rewrite</li>
                <li><span className="pricing-check">✓</span>ATS Optimization</li>
                <li><span className="pricing-check">✓</span>2 Template Choices</li>
                <li><span className="pricing-check">✓</span>3 Revisions</li>
                <li><span className="pricing-check">✓</span>72-Hour Delivery</li>
                <li><span className="pricing-check">✓</span>Word & PDF Format</li>
              </ul>
              <a href="/get-started?plan=starter" className="btn btn-pricing-dark">Get Started</a>
            </div>
            <div className="pricing-card featured reveal reveal-delay-2">
              <div className="pricing-popular">Most Popular</div>
              <div className="pricing-plan-name">Professional</div>
              <div className="pricing-price"><span className="pricing-price-currency">$</span>199</div>
              <div className="pricing-period">one-time payment</div>
              <div className="pricing-desc">For mid-career professionals targeting roles at leading companies and higher salaries.</div>
              <div className="pricing-divider"></div>
              <ul className="pricing-features">
                <li><span className="pricing-check">✓</span>Expert Resume + Cover Letter</li>
                <li><span className="pricing-check">✓</span>LinkedIn Profile Optimization</li>
                <li><span className="pricing-check">✓</span>All Premium Templates</li>
                <li><span className="pricing-check">✓</span>Unlimited Revisions</li>
                <li><span className="pricing-check">✓</span>48-Hour Express Delivery</li>
                <li><span className="pricing-check">✓</span>Interview Coaching Guide</li>
                <li><span className="pricing-check">✓</span>60-Day Job Search Support</li>
              </ul>
              <a href="/get-started?plan=professional" className="btn btn-pricing-featured">Get Started — Best Value</a>
            </div>
            <div className="pricing-card reveal reveal-delay-3">
              <div className="pricing-plan-name">Executive</div>
              <div className="pricing-price"><span className="pricing-price-currency">$</span>349</div>
              <div className="pricing-period">one-time payment</div>
              <div className="pricing-desc">For senior leaders, C-suite executives, and those targeting six-figure positions.</div>
              <div className="pricing-divider"></div>
              <ul className="pricing-features">
                <li><span className="pricing-check">✓</span>Executive Resume + Bio</li>
                <li><span className="pricing-check">✓</span>Full LinkedIn Makeover</li>
                <li><span className="pricing-check">✓</span>Board Resume & Cover Letter</li>
                <li><span className="pricing-check">✓</span>Unlimited Revisions</li>
                <li><span className="pricing-check">✓</span>24-Hour Rush Delivery</li>
                <li><span className="pricing-check">✓</span>1:1 Strategy Call (30 min)</li>
                <li><span className="pricing-check">✓</span>90-Day Priority Support</li>
                <li><span className="pricing-check">✓</span>Career Branding Package</li>
              </ul>
              <a href="/get-started?plan=executive" className="btn btn-pricing-dark">Get Started</a>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{settings.home_testimonials_label}</span>
            <h2 className="section-title reveal">{settings.home_testimonials_title} <span>{settings.home_testimonials_highlight}</span></h2>
            <p className="section-sub reveal">Over 12,000 professionals have trusted ProCareerVista to advance their careers. Here's what some of them have to say.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className={`testimonial-card reveal ${revealDelay(i + 1)}`} key={t.id}>
                <div className="stars">
                  {Array.from({ length: t.rating || 5 }).map((_, si) => (
                    <span className="star" key={si}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">&quot;{t.quote}&quot;</p>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ background: t.gradient || "linear-gradient(135deg, var(--teal), var(--aqua))" }}>
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-title">{t.role}{t.company ? ` · ${t.company}` : ""}</div>
                  </div>
                  {t.result && (
                    <div className="author-result">
                      <div className="author-result-val">{t.result}</div>
                      <div className="author-result-label">Result</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      
      <section id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{settings.home_team_label}</span>
            <h2 className="section-title reveal">{settings.home_team_title} <span>{settings.home_team_highlight}</span></h2>
            <p className="section-sub reveal">Our certified resume writers have placed thousands of professionals at the world's best companies.</p>
          </div>
          <div className="team-grid">
            {homeTeam.map((member, i) => (
              <div className={`team-card reveal ${revealDelay(i + 1)}`} key={member.id}>
                <div className="team-card-header" style={{ background: member.topBg || "linear-gradient(135deg, var(--navy), var(--navy-mid))" }}>
                  <TeamAvatar
                    member={member}
                    className="team-avatar"
                    style={{ background: member.avatarBg || member.gradient || "linear-gradient(135deg, var(--teal), var(--aqua))" }}
                  />
                </div>
                <div className="team-card-body">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-exp">
                    {[member.badge, member.experience, member.speciality].filter(Boolean).join(" | ")}
                  </div>
                  <TeamMemberSocials member={member} className="team-socials" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      
      <section id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{settings.home_faq_label}</span>
            <h2 className="section-title reveal">{settings.home_faq_title} <span>{settings.home_faq_highlight}</span></h2>
          </div>
          <div className="faq-layout">
            <div className="faq-left reveal">
              <p className="faq-left-desc">Everything you need to know about our resume writing service. Can't find an answer? Contact us directly.</p>
              <div className="faq-categories">
                <div className="faq-cat active"><span className="faq-cat-dot"></span>General</div>
                <div className="faq-cat"><span className="faq-cat-dot"></span>Process</div>
                <div className="faq-cat"><span className="faq-cat-dot"></span>Delivery</div>
                <div className="faq-cat"><span className="faq-cat-dot"></span>Revisions</div>
                <div className="faq-cat"><span className="faq-cat-dot"></span>Pricing</div>
              </div>
              <div style={{marginTop: "32px"}}>
                <a href="/contact" className="btn btn-primary" style={{width: "100%", justifyContent: "center"}}>Still Have Questions?</a>
              </div>
            </div>
            <div className="faq-list" id="faqList">
              {homeFaqs.map((faq, i) => (
                <div className={`faq-item ${i === 0 ? "open" : ""}`} key={faq.id}>
                  <div className="faq-question">
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-toggle">+</span>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="newsletter">
        <div className="newsletter-bg"></div>
        <div className="container">
          <div className="newsletter-inner">
            <div className="reveal">
              <h2 className="newsletter-title">Stay Connected & Ahead</h2>
              <p className="newsletter-sub">Get free career tips, resume advice, and job market insights delivered weekly to your inbox. Join 40,000+ professionals.</p>
            </div>
            <div className="reveal">
              <div className="newsletter-form">
                <input type="email" className="newsletter-input" placeholder="Enter your email address..." />
                <button className="btn-newsletter">Subscribe Free →</button>
              </div>
              <p className="newsletter-note">✓ No spam. Unsubscribe anytime. Your privacy is respected.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
