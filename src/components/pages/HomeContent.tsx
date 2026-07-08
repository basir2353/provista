"use client";

import { useHomeInteractivity } from "@/hooks/usePageInteractivity";

export default function HomeContent() {
  useHomeInteractivity();

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
                <span>✦ ATS-Optimized Resumes</span>
              </div>
              <h1 className="hero-headline">
                Land Your <span className="line-teal">Dream Job</span><br />
                with a <span className="line-accent">Winning</span><br />
                Resume
              </h1>
              <p className="hero-desc">
                Professional resume writers crafting career stories that get noticed. 
                ATS-optimized, industry-tailored, and designed to get you interviews.
              </p>
              <div className="hero-actions">
                <a href="/get-started" className="btn btn-primary">✦ Get My Resume Written</a>
                <a href="/templates" className="btn btn-outline" style={{color: "white", borderColor: "rgba(255,255,255,0.3)"}}>View Samples</a>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="hero-stat-num" data-count="98" data-suffix="%">0%</div>
                  <div className="hero-stat-label">Interview Rate</div>
                </div>
                <div>
                  <div className="hero-stat-num" data-count="12" data-suffix="K+">0K+</div>
                  <div className="hero-stat-label">Resumes Written</div>
                </div>
                <div>
                  <div className="hero-stat-num" data-count="49" data-format="rating">4.9★</div>
                  <div className="hero-stat-label">Client Rating</div>
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
              <span className="section-label">About ProCareerVista</span>
              <h2 className="section-title reveal">We Don't Just Write<br /><span>Resumes — We Build</span><br />Career Stories</h2>
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
            <span className="section-label">Industries We Serve</span>
            <h2 className="section-title reveal">Specialists Across <span>Every Sector</span></h2>
            <p className="section-sub reveal">Our writers have deep domain expertise across 20+ industries, ensuring your resume speaks the language of your target field.</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card reveal reveal-delay-1">
              <span className="industry-icon">💻</span>
              <div className="industry-name">Technology & IT</div>
              <div className="industry-count">3,200+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-2">
              <span className="industry-icon">🏦</span>
              <div className="industry-name">Finance & Banking</div>
              <div className="industry-count">1,800+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-3">
              <span className="industry-icon">🏥</span>
              <div className="industry-name">Healthcare</div>
              <div className="industry-count">1,500+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-4">
              <span className="industry-icon">⚙️</span>
              <div className="industry-name">Engineering</div>
              <div className="industry-count">2,100+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-1">
              <span className="industry-icon">📊</span>
              <div className="industry-name">Marketing & Sales</div>
              <div className="industry-count">1,400+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-2">
              <span className="industry-icon">⚖️</span>
              <div className="industry-name">Legal</div>
              <div className="industry-count">600+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-3">
              <span className="industry-icon">🎓</span>
              <div className="industry-name">Education</div>
              <div className="industry-count">900+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-4">
              <span className="industry-icon">🏗️</span>
              <div className="industry-name">Construction</div>
              <div className="industry-count">700+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-1">
              <span className="industry-icon">🎨</span>
              <div className="industry-name">Creative & Design</div>
              <div className="industry-count">850+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-2">
              <span className="industry-icon">🚀</span>
              <div className="industry-name">Startups & Venture</div>
              <div className="industry-count">550+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-3">
              <span className="industry-icon">🌐</span>
              <div className="industry-name">Non-Profit & NGO</div>
              <div className="industry-count">400+ resumes</div>
            </div>
            <div className="industry-card reveal reveal-delay-4">
              <span className="industry-icon">✈️</span>
              <div className="industry-name">Hospitality & Travel</div>
              <div className="industry-count">480+ resumes</div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="start">
        <div className="start-bg-blob start-bg-blob-1"></div>
        <div className="start-bg-blob start-bg-blob-2"></div>
        <div className="container">
          <div className="start-inner">
            <div className="start-left">
              <span className="section-label">How It Works</span>
              <h2 className="section-title reveal">Start Your Journey<br /><span>in 3 Simple Steps</span></h2>
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
              <span className="section-label">Resume Templates</span>
              <h2 className="section-title reveal">Designs That <span>Get Noticed</span></h2>
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
            <span className="section-label">Transparent Pricing</span>
            <h2 className="section-title reveal">Choose Your <span>Career Plan</span></h2>
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
            <span className="section-label">Client Reviews</span>
            <h2 className="section-title reveal">What Our Clients <span>Are Saying</span></h2>
            <p className="section-sub reveal">Over 12,000 professionals have trusted ProCareerVista to advance their careers. Here's what some of them have to say.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal reveal-delay-1">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-text">"I was applying for six months with zero callbacks. Two weeks after ProCareerVista rewrote my resume, I had 4 interviews lined up — including Google. The investment paid for itself 100x over."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{background: "linear-gradient(135deg, var(--teal), var(--aqua))"}}>AK</div>
                <div>
                  <div className="author-name">Ahmed Khan</div>
                  <div className="author-title">Software Engineer → Google</div>
                </div>
                <div className="author-result">
                  <div className="author-result-val">+40%</div>
                  <div className="author-result-label">Salary increase</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-2">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-text">"The writer truly understood my industry. She transformed my boring job descriptions into compelling achievement stories. I landed my dream role at McKinsey within 3 weeks of delivery!"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{background: "linear-gradient(135deg, #7c3aed, #4f46e5)"}}>SN</div>
                <div>
                  <div className="author-name">Sarah Nair</div>
                  <div className="author-title">Consultant → McKinsey & Company</div>
                </div>
                <div className="author-result">
                  <div className="author-result-val">3 wks</div>
                  <div className="author-result-label">Time to offer</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-3">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-text">"As a career changer from teaching to UX Design, I had no idea how to position my skills. My ProCareerVista writer made the pivot feel seamless. Hired within 6 weeks!"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{background: "linear-gradient(135deg, #ea580c, #f59e0b)"}}>JL</div>
                <div>
                  <div className="author-name">James Liu</div>
                  <div className="author-title">Teacher → UX Designer at Airbnb</div>
                </div>
                <div className="author-result">
                  <div className="author-result-val">6 wks</div>
                  <div className="author-result-label">Career change</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-1">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-text">"I've used three resume services before and none compare to ProCareerVista. The attention to detail, the ATS scoring, the templates — everything is top notch. Highly recommend for serious professionals."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{background: "linear-gradient(135deg, #0f766e, var(--teal))"}}>MA</div>
                <div>
                  <div className="author-name">Maria Alvarez</div>
                  <div className="author-title">Finance Director → JP Morgan</div>
                </div>
                <div className="author-result">
                  <div className="author-result-val">4.9★</div>
                  <div className="author-result-label">Would recommend</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-2">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-text">"The 48-hour delivery seemed impossible, but they nailed it. My resume went from average to exceptional. The LinkedIn optimization was a game-changer — recruiters are reaching out to me now!"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{background: "linear-gradient(135deg, #1d4ed8, #06b6d4)"}}>TR</div>
                <div>
                  <div className="author-name">Tom Rodriguez</div>
                  <div className="author-title">Product Manager → Amazon</div>
                </div>
                <div className="author-result">
                  <div className="author-result-val">8x</div>
                  <div className="author-result-label">More recruiter views</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal reveal-delay-3">
              <div className="stars">
                <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
              </div>
              <p className="testimonial-text">"As a C-suite executive, I needed something truly elevated. The Executive Package delivered beyond expectations — a polished narrative that showcases my leadership story powerfully."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{background: "linear-gradient(135deg, #374151, #1f2937)"}}>LP</div>
                <div>
                  <div className="author-name">Lisa Park</div>
                  <div className="author-title">VP → Chief Strategy Officer</div>
                </div>
                <div className="author-result">
                  <div className="author-result-val">$200K+</div>
                  <div className="author-result-label">New compensation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Meet the Team</span>
            <h2 className="section-title reveal">The <span>Experts</span> Behind<br />Your Success</h2>
            <p className="section-sub reveal">Our certified resume writers have placed thousands of professionals at the world's best companies.</p>
          </div>
          <div className="team-grid">
            <div className="team-card reveal reveal-delay-1">
              <div className="team-card-header" style={{background: "linear-gradient(135deg, var(--navy), var(--navy-mid))"}}>
                <div className="team-avatar" style={{background: "linear-gradient(135deg, var(--teal), var(--aqua))"}}>SR</div>
              </div>
              <div className="team-card-body">
                <div className="team-name">Sarah Reynolds</div>
                <div className="team-role">Chief Resume Writer</div>
                <div className="team-exp">CPRW | 12 yrs experience | Tech & Finance specialist</div>
                <div className="team-socials">
                  <a className="team-social" title="LinkedIn">in</a>
                  <a className="team-social" title="Email">✉</a>
                </div>
              </div>
            </div>
            <div className="team-card reveal reveal-delay-2">
              <div className="team-card-header" style={{background: "linear-gradient(135deg, #1d4ed8, #4f46e5)"}}>
                <div className="team-avatar" style={{background: "linear-gradient(135deg, #7c3aed, #4f46e5)"}}>MK</div>
              </div>
              <div className="team-card-body">
                <div className="team-name">Marcus Kim</div>
                <div className="team-role">Senior Writer</div>
                <div className="team-exp">CPRW | 8 yrs experience | Healthcare & Legal expert</div>
                <div className="team-socials">
                  <a className="team-social" title="LinkedIn">in</a>
                  <a className="team-social" title="Email">✉</a>
                </div>
              </div>
            </div>
            <div className="team-card reveal reveal-delay-3">
              <div className="team-card-header" style={{background: "linear-gradient(135deg, #7c2d12, #c2410c)"}}>
                <div className="team-avatar" style={{background: "linear-gradient(135deg, #ea580c, #f59e0b)"}}>AP</div>
              </div>
              <div className="team-card-body">
                <div className="team-name">Ananya Patel</div>
                <div className="team-role">Career Coach & Writer</div>
                <div className="team-exp">CPCC | 9 yrs experience | Executive & Leadership roles</div>
                <div className="team-socials">
                  <a className="team-social" title="LinkedIn">in</a>
                  <a className="team-social" title="Email">✉</a>
                </div>
              </div>
            </div>
            <div className="team-card reveal reveal-delay-4">
              <div className="team-card-header" style={{background: "linear-gradient(135deg, #064e3b, #065f46)"}}>
                <div className="team-avatar" style={{background: "linear-gradient(135deg, #059669, var(--teal))"}}>JW</div>
              </div>
              <div className="team-card-body">
                <div className="team-name">James Webb</div>
                <div className="team-role">ATS Optimization Lead</div>
                <div className="team-exp">CPRW | 7 yrs experience | Engineering & IT expert</div>
                <div className="team-socials">
                  <a className="team-social" title="LinkedIn">in</a>
                  <a className="team-social" title="Email">✉</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <section id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Frequently Asked</span>
            <h2 className="section-title reveal">Got <span>Questions?</span><br />We Have Answers</h2>
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
              <div className="faq-item open">
                <div className="faq-question" >
                  <span className="faq-q-text">How long does it take to receive my resume?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Our standard turnaround is 48 hours from when you submit your intake form. Rush orders (24 hours) are available on the Professional and Executive plans. All timelines are business day based. Once your resume is ready, you'll receive it via email in both Word and PDF formats.</div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" >
                  <span className="faq-q-text">What if I'm not satisfied with my resume?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Your satisfaction is our guarantee. We offer unlimited revisions on all plans until you're completely happy. If after the revision process you're still not satisfied, we offer a full refund within 30 days of purchase — no questions asked.</div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" >
                  <span className="faq-q-text">Who writes my resume — a human or AI?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Every resume is written by a certified, human resume writer (CPRW). We do use AI-assisted tools for ATS scoring and keyword analysis, but all writing, strategy, and content is crafted by your dedicated human writer who specializes in your industry.</div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" >
                  <span className="faq-q-text">Is my resume guaranteed to be ATS-compatible?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Absolutely. Every resume we write is tested against leading ATS platforms including Workday, Taleo, iCIMS, and Greenhouse. We achieve an average ATS score of 96+/100 and optimize keyword density based on your target role and industry.</div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" >
                  <span className="faq-q-text">Can you help with career changers?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Yes! Career transitions are one of our specialties. Our writers are skilled at identifying transferable skills and reframing your experience to align with your new target industry. We've helped hundreds of professionals successfully pivot their careers.</div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" >
                  <span className="faq-q-text">Do you offer LinkedIn profile optimization?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Yes — LinkedIn optimization is included in the Professional and Executive plans, and available as a standalone add-on ($79) for Starter plan clients. We optimize your headline, summary, experience sections, skills, and recommendations strategy to maximize recruiter visibility.</div>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question" >
                  <span className="faq-q-text">What information do I need to provide?</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">Simply complete our intake questionnaire, which takes about 15 minutes. You'll share your current resume (if any), your career goals, target roles, and key accomplishments. Your writer may follow up with clarifying questions via email before beginning your document.</div>
                </div>
              </div>
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
