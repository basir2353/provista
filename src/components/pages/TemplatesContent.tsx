"use client";

import { useTemplatesFilter } from "@/hooks/usePageInteractivity";

export default function TemplatesContent() {
  useTemplatesFilter();

  return (
    <>
      <section className="page-hero">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="container">
              <span className="section-label">Resume Templates</span>
              <h1>Designs That <span>Get You Hired</span></h1>
              <p>9 professionally designed, ATS-optimized templates included with every package. Available in Word & PDF
                  formats.</p>
              <a href="/get-started" className="btn btn-primary" style={{marginRight: "12px"}}>✦ Get All Templates</a>
              <a href="/pricing" className="btn btn-outline" style={{color: "white", borderColor: "rgba(255,255,255,0.4)"}}>View
                  Pricing</a>
          </div>
      </section>
      
      
      <div className="filter-bar">
          <div className="container">
              <div className="filter-tabs">
                <button className="filter-tab active" data-cat="all">All Templates</button>
                <button className="filter-tab" data-cat="executive">Executive</button>
                <button className="filter-tab" data-cat="professional">Professional</button>
                <button className="filter-tab" data-cat="creative">Creative</button>
                          </div>
          </div>
      </div>
      
      
      <section className="templates-section">
          <div className="container">
              <div className="templates-grid" id="templatesGrid">
      
                                      <div className="template-card reveal " data-cat="executive">
                              <div className="template-preview">
                                                                  <div className="tmpl-mockup">
                                          <div className="tmpl-top-bar"></div>
                                          <div className="tmpl-avatar-row">
                                              <div className="tmpl-avatar"></div>
                                              <div className="tmpl-name-block">
                                                  <div className="tmpl-line" style={{width: "70%"}}></div>
                                                  <div className="tmpl-line" style={{width: "50%"}}></div>
                                              </div>
                                          </div>
                                          <div className="tmpl-two-col">
                                              <div className="tmpl-col">
                                                  <div className="tmpl-section-label"></div>
                                                  <div className="tmpl-line" style={{width: "100%"}}></div>
                                                  <div className="tmpl-line" style={{width: "85%"}}></div>
                                                  <div className="tmpl-line" style={{width: "90%"}}></div>
                                                  <div className="tmpl-section-label"></div>
                                                  <div className="tmpl-line" style={{width: "100%"}}></div>
                                                  <div className="tmpl-line" style={{width: "70%"}}></div>
                                              </div>
                                              <div className="tmpl-sidebar">
                                                  <div className="tmpl-line" style={{width: "80%"}}></div>
                                                  <div className="tmpl-line" style={{width: "65%"}}></div>
                                                  <div className="tmpl-line" style={{width: "75%"}}></div>
                                              </div>
                                          </div>
                                      </div>
                                                                                              <span className="template-badge" style={{background: "#0d1b21"}}>Executive</span>
                                                          </div>
                              <div className="template-info">
                                  
                                  <div className="template-name">New</div>
                                  <div className="template-tag">
                                                                  </div>
                                  <div className="template-meta">
                                      <div className="template-formats">
      
                                          <span className="format-chip">Word</span>
                                          <span className="format-chip">PDF</span>
                                      </div>
                                      <span style={{fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--teal)"}}>ATS 98/100</span>
                                  </div>
                                  <div className="template-actions">
                                      <a href="https://procareervista.com/get-started?template=94" className="btn btn-primary btn-sm" style={{flex: "1", justifyContent: "center"}}>Use This
                                          Template</a>
                                      <a href="https://procareervista.com/pricing" className="btn btn-outline btn-sm">See Plans</a>
                                  </div>
                              </div>
                          </div>
      
                                          <div className="template-card reveal featured-card" data-cat="professional">
                              <div className="template-preview">
                                                                  <div className="tmpl-mockup">
                                          <div className="tmpl-top-bar"></div>
                                          <div className="tmpl-avatar-row">
                                              <div className="tmpl-avatar"></div>
                                              <div className="tmpl-name-block">
                                                  <div className="tmpl-line" style={{width: "70%"}}></div>
                                                  <div className="tmpl-line" style={{width: "50%"}}></div>
                                              </div>
                                          </div>
                                          <div className="tmpl-two-col">
                                              <div className="tmpl-col">
                                                  <div className="tmpl-section-label"></div>
                                                  <div className="tmpl-line" style={{width: "100%"}}></div>
                                                  <div className="tmpl-line" style={{width: "85%"}}></div>
                                                  <div className="tmpl-line" style={{width: "90%"}}></div>
                                                  <div className="tmpl-section-label"></div>
                                                  <div className="tmpl-line" style={{width: "100%"}}></div>
                                                  <div className="tmpl-line" style={{width: "70%"}}></div>
                                              </div>
                                              <div className="tmpl-sidebar">
                                                  <div className="tmpl-line" style={{width: "80%"}}></div>
                                                  <div className="tmpl-line" style={{width: "65%"}}></div>
                                                  <div className="tmpl-line" style={{width: "75%"}}></div>
                                              </div>
                                          </div>
                                      </div>
                                                                                              <span className="template-badge" style={{background: "#0d1b21"}}>Executive</span>
                                                          </div>
                              <div className="template-info">
                                  
                                  <div className="template-name"></div>
                                  <div className="template-tag">
                                      Professional .                             </div>
                                  <div className="template-meta">
                                      <div className="template-formats">
      
                                          <span className="format-chip">Word</span>
                                          <span className="format-chip">PDF</span>
                                      </div>
                                      <span style={{fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--teal)"}}>ATS 98/100</span>
                                  </div>
                                  <div className="template-actions">
                                      <a href="https://procareervista.com/get-started?template=88" className="btn btn-primary btn-sm" style={{flex: "1", justifyContent: "center"}}>Use This
                                          Template</a>
                                      <a href="https://procareervista.com/pricing" className="btn btn-outline btn-sm">See Plans</a>
                                  </div>
                              </div>
                          </div>
      
                                          <div className="template-card reveal featured-card" data-cat="professional">
                              <div className="template-preview">
                                                                  <div className="tmpl-mockup">
                                          <div className="tmpl-top-bar"></div>
                                          <div className="tmpl-avatar-row">
                                              <div className="tmpl-avatar"></div>
                                              <div className="tmpl-name-block">
                                                  <div className="tmpl-line" style={{width: "70%"}}></div>
                                                  <div className="tmpl-line" style={{width: "50%"}}></div>
                                              </div>
                                          </div>
                                          <div className="tmpl-two-col">
                                              <div className="tmpl-col">
                                                  <div className="tmpl-section-label"></div>
                                                  <div className="tmpl-line" style={{width: "100%"}}></div>
                                                  <div className="tmpl-line" style={{width: "85%"}}></div>
                                                  <div className="tmpl-line" style={{width: "90%"}}></div>
                                                  <div className="tmpl-section-label"></div>
                                                  <div className="tmpl-line" style={{width: "100%"}}></div>
                                                  <div className="tmpl-line" style={{width: "70%"}}></div>
                                              </div>
                                              <div className="tmpl-sidebar">
                                                  <div className="tmpl-line" style={{width: "80%"}}></div>
                                                  <div className="tmpl-line" style={{width: "65%"}}></div>
                                                  <div className="tmpl-line" style={{width: "75%"}}></div>
                                              </div>
                                          </div>
                                      </div>
                                                                                              <span className="template-badge" style={{background: "#00b8a9"}}>★ Most Popular</span>
                                                          </div>
                              <div className="template-info">
                                  
                                  <div className="template-name">Executive Classic</div>
                                  <div className="template-tag">
                                      Corporate . Finance . Professional .                             </div>
                                  <div className="template-meta">
                                      <div className="template-formats">
      
                                          <span className="format-chip">Word</span>
                                          <span className="format-chip">PDF</span>
                                      </div>
                                      <span style={{fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--teal)"}}>ATS 98/100</span>
                                  </div>
                                  <div className="template-actions">
                                      <a href="https://procareervista.com/get-started?template=38" className="btn btn-primary btn-sm" style={{flex: "1", justifyContent: "center"}}>Use This
                                          Template</a>
                                      <a href="https://procareervista.com/pricing" className="btn btn-outline btn-sm">See Plans</a>
                                  </div>
                              </div>
                          </div>
      
                                  
      
              </div>
          </div>
      </section>
      
      
      <section className="cta-banner">
          <div className="container">
              <h2>All Templates Included With Every Package</h2>
              <p>No extra charge — choose your template when you place your order.</p>
              <a href="/get-started" className="btn btn-white">✦ Start Your Order Today</a>
          </div>
      </section>
    </>
  );
}
