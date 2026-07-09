"use client";

import { useServiceNav } from "@/hooks/usePageInteractivity";

export default function ServicesContent() {
  useServiceNav();

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">What We Offer</span>
          <h1>Every Service You Need to <span>Land Your Dream Job</span></h1>
          <p>From resume rewrites to interview coaching — we offer a complete suite of career services to give you a decisive competitive edge.</p>
          <a href="/get-started" className="btn btn-primary" style={{position: "relative", zIndex: 2, marginRight: "12px"}}>✦ Get Started</a>
          <a href="/pricing" className="btn btn-outline" style={{color: "white", borderColor: "rgba(255,255,255,0.4)", position: "relative", zIndex: 2}}>View Pricing</a>
        </div>
      </section>

      <div className="service-nav">
        <div className="container">
          <div className="service-nav-inner">
            <a href="#resume-writing" className="service-tab active">📄 Resume Writing</a>
            <a href="#cover-letter" className="service-tab">✉️ Cover Letter</a>
            <a href="#linkedin" className="service-tab">🔗 LinkedIn</a>
            <a href="#executive-bio" className="service-tab">👔 Executive Bio</a>
            <a href="#coaching" className="service-tab">🎯 Career Coaching</a>
            <a href="#interview-prep" className="service-tab">🎤 Interview Prep</a>
          </div>
        </div>
      </div>

      <section className="service-section" id="resume-writing">
        <div className="container">
          <div className="service-grid">
            <div className="reveal">
              <div className="service-icon-big" style={{background: "var(--mint)"}}>📄</div>
              <div className="service-price-badge">Starting at <span>$99</span> · One-Time Payment</div>
              <h2 className="service-title">Professional <span>Resume Writing</span></h2>
              <p className="service-desc">Our flagship service. A certified writer who specializes in your exact industry rewrites your resume from scratch — transforming your experience into a compelling, ATS-optimized career story that gets you noticed.</p>
              <div className="service-includes">
                <div className="service-includes-title">What&apos;s Included</div>
                <ul className="service-includes-list">
                  <li><span className="service-check">✓</span>Full resume rewrite by a CPRW-certified specialist</li>
                  <li><span className="service-check">✓</span>ATS optimization with 90+ score guarantee</li>
                  <li><span className="service-check">✓</span>Keyword research tailored to your target role</li>
                  <li><span className="service-check">✓</span>Achievement-focused bullet point writing</li>
                  <li><span className="service-check">✓</span>Choice of premium templates</li>
                  <li><span className="service-check">✓</span>Delivered in Word & PDF format</li>
                  <li><span className="service-check">✓</span>Multiple revision rounds until perfected</li>
                </ul>
              </div>
              <div className="service-actions">
                <a href="/get-started" className="btn btn-primary">✦ Order Resume Writing</a>
                <a href="/pricing" className="btn btn-outline">See Pricing</a>
              </div>
            </div>
            <div className="service-visual reveal rd1">
              <div className="service-card-mockup" style={{background: "white"}}>
                <div className="service-card-header" style={{background: "linear-gradient(135deg,var(--navy),var(--teal))"}}>
                  <div>
                    <div style={{fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "white"}}>Jane Cooper</div>
                    <div style={{fontSize: "12px", color: "rgba(255,255,255,0.7)"}}>Senior Product Manager</div>
                  </div>
                  <div style={{background: "rgba(255,255,255,0.15)", padding: "8px 14px", borderRadius: "50px", fontSize: "11px", color: "white", fontFamily: "var(--font-mono)"}}>ATS 98/100</div>
                </div>
                <div className="service-card-body" style={{paddingTop: "24px"}}>
                  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-mono)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px"}}>Experience</div>
                  <div className="service-result-bar"><div className="service-result-bar-fill" style={{width: "95%"}}></div></div>
                  <div className="service-result-label"><span>Keyword Match</span><span style={{color: "var(--teal)", fontWeight: 700}}>95%</span></div>
                  <div className="service-result-bar"><div className="service-result-bar-fill" style={{width: "88%"}}></div></div>
                  <div className="service-result-label"><span>Impact Score</span><span style={{color: "var(--teal)", fontWeight: 700}}>88%</span></div>
                  <div className="service-result-bar"><div className="service-result-bar-fill" style={{width: "100%"}}></div></div>
                  <div className="service-result-label"><span>Formatting</span><span style={{color: "var(--teal)", fontWeight: 700}}>100%</span></div>
                  <div className="service-stat-row">
                    <div className="service-stat-pill"><div className="service-stat-pill-num">3x</div><div className="service-stat-pill-label">More Interviews</div></div>
                    <div className="service-stat-pill"><div className="service-stat-pill-num">48h</div><div className="service-stat-pill-label">Delivery Time</div></div>
                    <div className="service-stat-pill"><div className="service-stat-pill-num">∞</div><div className="service-stat-pill-label">Revisions</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" id="cover-letter">
        <div className="container">
          <div className="service-grid reverse">
            <div className="reveal">
              <div className="service-icon-big" style={{background: "#fce7f3"}}>✉️</div>
              <div className="service-price-badge">Add-on <span>$49</span> · Included in Pro & Executive</div>
              <h2 className="service-title"><span>Cover Letter</span> Writing</h2>
              <p className="service-desc">A tailored cover letter that complements your resume and tells the story of why you&apos;re the perfect fit for a specific role. Our writers craft compelling narratives that make hiring managers want to meet you.</p>
              <div className="service-includes">
                <div className="service-includes-title">What&apos;s Included</div>
                <ul className="service-includes-list">
                  <li><span className="service-check">✓</span>Custom cover letter tailored to your target role & company</li>
                  <li><span className="service-check">✓</span>Compelling opening hook that grabs attention</li>
                  <li><span className="service-check">✓</span>Achievement-focused body paragraphs</li>
                  <li><span className="service-check">✓</span>Strong closing with clear call to action</li>
                  <li><span className="service-check">✓</span>Delivered in Word & PDF format</li>
                  <li><span className="service-check">✓</span>2 revision rounds included</li>
                </ul>
              </div>
              <div className="service-actions">
                <a href="/get-started" className="btn btn-primary">✦ Order Cover Letter</a>
                <a href="/pricing" className="btn btn-outline">See Pricing</a>
              </div>
            </div>
            <div className="service-visual reveal rd1">
              <div className="service-card-mockup" style={{background: "white", padding: "32px"}}>
                <div style={{fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--teal)", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase"}}>Cover Letter Preview</div>
                <div style={{height: "6px", background: "var(--mint)", borderRadius: "3px", width: "40%", marginBottom: "20px"}}></div>
                <div style={{fontStyle: "italic", fontSize: "14px", color: "var(--gray-700)", lineHeight: 1.7, marginBottom: "16px", padding: "16px", background: "var(--off-white)", borderRadius: "var(--radius)", borderLeft: "3px solid var(--teal)"}}>&quot;Dear Hiring Manager,<br /><br />When I led a cross-functional team of 24 to deliver a $4M product launch 3 weeks ahead of schedule...&quot;</div>
                <div style={{height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "100%", marginBottom: "8px"}}></div>
                <div style={{height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "85%", marginBottom: "8px"}}></div>
                <div style={{height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "90%", marginBottom: "8px"}}></div>
                <div style={{height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "60%", marginBottom: "24px"}}></div>
                <div style={{display: "flex", gap: "8px"}}><span style={{background: "var(--mint)", color: "var(--teal-dark)", padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: 700}}>Tailored</span><span style={{background: "var(--mint)", color: "var(--teal-dark)", padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: 700}}>Compelling</span><span style={{background: "var(--mint)", color: "var(--teal-dark)", padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: 700}}>ATS Ready</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" id="linkedin">
        <div className="container">
          <div className="service-grid">
            <div className="reveal">
              <div className="service-icon-big" style={{background: "#dbeafe"}}>🔗</div>
              <div className="service-price-badge">Add-on <span>$79</span> · Included in Pro & Executive</div>
              <h2 className="service-title">LinkedIn Profile <span>Optimization</span></h2>
              <p className="service-desc">Your LinkedIn profile is your digital resume — and 87% of recruiters use it to find candidates. We optimize every section to maximize your visibility and attract inbound opportunities from top companies.</p>
              <div className="service-includes">
                <div className="service-includes-title">What&apos;s Included</div>
                <ul className="service-includes-list">
                  <li><span className="service-check">✓</span>Keyword-optimized headline & summary section</li>
                  <li><span className="service-check">✓</span>All experience sections rewritten for impact</li>
                  <li><span className="service-check">✓</span>Skills section optimization for recruiter search</li>
                  <li><span className="service-check">✓</span>Featured section strategy & recommendations</li>
                  <li><span className="service-check">✓</span>Profile photo & banner guidance</li>
                  <li><span className="service-check">✓</span>Connection & engagement strategy tips</li>
                </ul>
              </div>
              <div className="service-actions">
                <a href="/get-started" className="btn btn-primary">✦ Optimize My LinkedIn</a>
                <a href="/pricing" className="btn btn-outline">See Pricing</a>
              </div>
            </div>
            <div className="service-visual reveal rd1">
              <div className="service-card-mockup" style={{background: "white"}}>
                <div style={{background: "#0077b5", padding: "24px 28px"}}>
                  <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
                    <div style={{width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg,var(--teal),var(--aqua))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", fontWeight: 700, color: "white", border: "3px solid white"}}>JC</div>
                    <div><div style={{color: "white", fontWeight: 700, fontSize: "16px"}}>Jane Cooper</div><div style={{color: "rgba(255,255,255,0.8)", fontSize: "13px"}}>Senior PM | Ex-Google | Building products that scale to millions</div></div>
                  </div>
                </div>
                <div style={{padding: "20px 24px"}}>
                  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-mono)", letterSpacing: "1px", marginBottom: "8px"}}>SEARCH APPEARANCE</div>
                  <div className="service-result-bar"><div className="service-result-bar-fill" style={{width: "92%"}}></div></div>
                  <div className="service-result-label"><span>Search Visibility</span><span style={{color: "var(--teal)", fontWeight: 700}}>92%</span></div>
                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px"}}>
                    <div className="service-stat-pill"><div className="service-stat-pill-num">8x</div><div className="service-stat-pill-label">More Views</div></div>
                    <div className="service-stat-pill"><div className="service-stat-pill-num">5x</div><div className="service-stat-pill-label">Recruiter Messages</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" id="executive-bio">
        <div className="container">
          <div className="service-grid reverse">
            <div className="reveal">
              <div className="service-icon-big" style={{background: "#ede9fe"}}>👔</div>
              <div className="service-price-badge">Included in <span>Executive Plan</span> · $349</div>
              <h2 className="service-title">Executive <span>Bio Writing</span></h2>
              <p className="service-desc">For senior leaders who need a compelling professional bio for board applications, speaking engagements, company websites, and media profiles. A polished narrative that positions you as a thought leader.</p>
              <div className="service-includes">
                <div className="service-includes-title">What&apos;s Included</div>
                <ul className="service-includes-list">
                  <li><span className="service-check">✓</span>First-person & third-person bio versions</li>
                  <li><span className="service-check">✓</span>Short (150-word) and long (400-word) formats</li>
                  <li><span className="service-check">✓</span>Board application bio version</li>
                  <li><span className="service-check">✓</span>Speaker bio for conference profiles</li>
                  <li><span className="service-check">✓</span>Company website / team page bio</li>
                  <li><span className="service-check">✓</span>2 revision rounds included</li>
                </ul>
              </div>
              <div className="service-actions">
                <a href="/get-started?plan=executive" className="btn btn-primary">✦ Order Executive Bio</a>
                <a href="/pricing" className="btn btn-outline">See Pricing</a>
              </div>
            </div>
            <div className="service-visual reveal rd1">
              <div className="service-card-mockup" style={{background: "linear-gradient(135deg,var(--navy),var(--navy-soft))", padding: "36px"}}>
                <div style={{fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--teal-light)", letterSpacing: "2px", marginBottom: "20px", textTransform: "uppercase"}}>Executive Bio — Board Version</div>
                <div style={{fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "white", marginBottom: "16px"}}>John Richardson</div>
                <div style={{fontStyle: "italic", fontSize: "14px", color: "var(--gray-300)", lineHeight: 1.75, marginBottom: "20px"}}>&quot;A visionary technology executive with 20+ years driving digital transformation across Fortune 100 organizations, John Richardson has led three successful IPOs and built teams that collectively generated over $2B in enterprise value...&quot;</div>
                <div style={{display: "flex", gap: "8px", flexWrap: "wrap"}}><span style={{background: "rgba(0,184,169,0.15)", border: "1px solid rgba(0,184,169,0.3)", color: "var(--teal-light)", padding: "4px 12px", borderRadius: "50px", fontSize: "11px"}}>Board-Ready</span><span style={{background: "rgba(0,184,169,0.15)", border: "1px solid rgba(0,184,169,0.3)", color: "var(--teal-light)", padding: "4px 12px", borderRadius: "50px", fontSize: "11px"}}>Speaker Profile</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" id="coaching">
        <div className="container">
          <div className="service-grid">
            <div className="reveal">
              <div className="service-icon-big" style={{background: "#dcfce7"}}>🎯</div>
              <div className="service-price-badge">From <span>$129</span> · 60-Min Session</div>
              <h2 className="service-title">Career <span>Coaching</span></h2>
              <p className="service-desc">One-on-one career strategy sessions with a certified coach. Whether you&apos;re navigating a career change, pursuing a promotion, or feeling stuck — we give you a clear roadmap to move forward with confidence.</p>
              <div className="service-includes">
                <div className="service-includes-title">Session Topics Available</div>
                <ul className="service-includes-list">
                  <li><span className="service-check">✓</span>Career change strategy & industry pivot roadmap</li>
                  <li><span className="service-check">✓</span>Promotion strategy & leadership positioning</li>
                  <li><span className="service-check">✓</span>Salary negotiation tactics & benchmarking</li>
                  <li><span className="service-check">✓</span>Job search strategy & networking plan</li>
                  <li><span className="service-check">✓</span>Personal branding & executive presence</li>
                  <li><span className="service-check">✓</span>Session recording & action plan provided</li>
                </ul>
              </div>
              <div className="service-actions">
                <a href="/get-started" className="btn btn-primary">✦ Book a Coaching Session</a>
                <a href="/pricing" className="btn btn-outline">See Pricing</a>
              </div>
            </div>
            <div className="service-visual reveal rd1">
              <div className="service-card-mockup" style={{background: "white", padding: "32px"}}>
                <div style={{fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--teal)", letterSpacing: "2px", marginBottom: "20px", textTransform: "uppercase"}}>Session Results</div>
                <div style={{display: "flex", flexDirection: "column", gap: "14px"}}>
                  <div style={{background: "var(--off-white)", borderRadius: "var(--radius)", padding: "16px", display: "flex", alignItems: "center", gap: "12px"}}><span style={{fontSize: "1.5rem"}}>🎯</span><div><div style={{fontWeight: 700, fontSize: "14px", color: "var(--navy)"}}>Clear Career Roadmap</div><div style={{fontSize: "12px", color: "var(--gray-500)"}}>90-day action plan delivered</div></div></div>
                  <div style={{background: "var(--off-white)", borderRadius: "var(--radius)", padding: "16px", display: "flex", alignItems: "center", gap: "12px"}}><span style={{fontSize: "1.5rem"}}>💰</span><div><div style={{fontWeight: 700, fontSize: "14px", color: "var(--navy)"}}>Salary Negotiation</div><div style={{fontSize: "12px", color: "var(--gray-500)"}}>Avg. 18% salary increase for clients</div></div></div>
                  <div style={{background: "var(--off-white)", borderRadius: "var(--radius)", padding: "16px", display: "flex", alignItems: "center", gap: "12px"}}><span style={{fontSize: "1.5rem"}}>🚀</span><div><div style={{fontWeight: 700, fontSize: "14px", color: "var(--navy)"}}>Career Acceleration</div><div style={{fontSize: "12px", color: "var(--gray-500)"}}>82% land new role within 60 days</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" id="interview-prep">
        <div className="container">
          <div className="service-grid reverse">
            <div className="reveal">
              <div className="service-icon-big" style={{background: "#ffedd5"}}>🎤</div>
              <div className="service-price-badge">From <span>$99</span> · Mock Interview Session</div>
              <h2 className="service-title">Interview <span>Preparation</span></h2>
              <p className="service-desc">The best resume in the world won&apos;t help if you can&apos;t ace the interview. Our coaches run realistic mock interviews, identify your weak spots, and teach you proven frameworks to answer any question with confidence.</p>
              <div className="service-includes">
                <div className="service-includes-title">What&apos;s Included</div>
                <ul className="service-includes-list">
                  <li><span className="service-check">✓</span>Full 60-minute mock interview session (video call)</li>
                  <li><span className="service-check">✓</span>Role-specific question preparation (STAR method)</li>
                  <li><span className="service-check">✓</span>Behavioral & competency-based question coaching</li>
                  <li><span className="service-check">✓</span>Salary negotiation conversation scripts</li>
                  <li><span className="service-check">✓</span>Detailed written feedback report after session</li>
                  <li><span className="service-check">✓</span>Session recording for self-review</li>
                </ul>
              </div>
              <div className="service-actions">
                <a href="/get-started" className="btn btn-primary">✦ Book Interview Coaching</a>
                <a href="/pricing" className="btn btn-outline">See Pricing</a>
              </div>
            </div>
            <div className="service-visual reveal rd1">
              <div className="service-card-mockup" style={{background: "var(--navy)", padding: "32px"}}>
                <div style={{fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--teal-light)", letterSpacing: "2px", marginBottom: "20px", textTransform: "uppercase"}}>Mock Interview Results</div>
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                  <div><div style={{display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px"}}><span style={{color: "var(--gray-300)"}}>Confidence Score</span><span style={{color: "var(--teal-light)", fontWeight: 700}}>Before: 42%</span></div><div style={{height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px"}}><div style={{height: "100%", width: "42%", background: "var(--gray-500)", borderRadius: "4px"}}></div></div></div>
                  <div><div style={{display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px"}}><span style={{color: "var(--gray-300)"}}>Confidence Score</span><span style={{color: "var(--teal-light)", fontWeight: 700}}>After: 91%</span></div><div style={{height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px"}}><div style={{height: "100%", width: "91%", background: "var(--teal)", borderRadius: "4px"}}></div></div></div>
                  <div style={{marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
                    <div style={{background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius)", padding: "14px", textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--teal-light)"}}>94%</div><div style={{fontSize: "10px", color: "var(--gray-500)", marginTop: "3px"}}>Offer Rate</div></div>
                    <div style={{background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius)", padding: "14px", textAlign: "center"}}><div style={{fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--teal-light)"}}>+21%</div><div style={{fontSize: "10px", color: "var(--gray-500)", marginTop: "3px"}}>Avg Salary</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Not Sure Which Service You Need?</h2>
          <p>Our team will recommend the right combination of services for your career goals — for free. Just reach out.</p>
          <div className="cta-actions">
            <a href="/get-started" className="btn btn-white">✦ Get Started</a>
            <a href="/contact" className="btn btn-ghost">Talk to an Expert</a>
          </div>
        </div>
      </section>
    </>
  );
}
