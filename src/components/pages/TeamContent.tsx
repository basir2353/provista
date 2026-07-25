"use client";

import { useTeamForm } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import CmsLoadState from "@/components/CmsLoadState";
import { TeamAvatar, TeamMemberSocials } from "@/components/TeamMemberCard";
import { api, TeamMember } from "@/lib/api";
import { parseJsonArray, splitCsv, staggerDelay } from "@/lib/cms";

function LeaderCard({ leader, delay }: { leader: TeamMember; delay: string }) {
  const certs = splitCsv(leader.certs);
  const stats = parseJsonArray<[string, string]>(leader.stats);
  const industries = splitCsv(leader.industries);

  return (
    <div className={`leader-card reveal ${delay}`} key={leader.id}>
      <div style={{ position: "relative" }}>
        <TeamAvatar
          member={leader}
          className="leader-avatar"
          style={{ background: leader.gradient || "linear-gradient(135deg,var(--teal),var(--aqua))" }}
        />
        {leader.badge && <span className="leader-badge">{leader.badge}</span>}
      </div>
      <div className="leader-info">
        <div className="leader-name">{leader.name}</div>
        <div className="leader-role">{leader.role}</div>
        {certs.length > 0 && (
          <div className="leader-cert">
            {certs.map((cert) => <span className="cert-tag" key={cert}>{cert}</span>)}
          </div>
        )}
        {leader.bio && <p className="leader-bio">{leader.bio}</p>}
        {stats.length > 0 && (
          <div className="leader-stats">
            {stats.map(([num, label]) => (
              <div className="leader-stat" key={label}><div className="leader-stat-num">{num}</div><div className="leader-stat-label">{label}</div></div>
            ))}
          </div>
        )}
        {industries.length > 0 && (
          <div className="leader-industries">
            {industries.map((tag) => <span className="industry-tag" key={tag}>{tag}</span>)}
          </div>
        )}
        <TeamMemberSocials member={leader} />
      </div>
    </div>
  );
}

function MemberCard({ member, delay }: { member: TeamMember; delay: string }) {
  return (
    <div className={`team-card reveal ${delay}`} key={member.id}>
      <div className="team-card-top" style={{ background: member.topBg || "linear-gradient(135deg,var(--navy),var(--navy-mid))" }}>
        <TeamAvatar
          member={member}
          className="team-avatar"
          style={{ background: member.avatarBg || "linear-gradient(135deg,var(--teal),var(--aqua))" }}
        />
      </div>
      <div className="team-card-body">
        <div className="team-name">{member.name}</div>
        <div className="team-role">{member.role}</div>
        {member.speciality && <div className="team-speciality">{member.speciality}</div>}
        <div className="team-stats-row">
          {member.experience && (
            <div className="mini-stat"><div className="mini-stat-num">{member.experience}</div><div className="mini-stat-label">Experience</div></div>
          )}
          {member.written && (
            <div className="mini-stat"><div className="mini-stat-num">{member.written}</div><div className="mini-stat-label">{member.writtenLabel || "Written"}</div></div>
          )}
        </div>
        <TeamMemberSocials member={member} className="team-socials" />
      </div>
    </div>
  );
}

export default function TeamContent({ initialMembers }: { initialMembers?: TeamMember[] } = {}) {
  const settings = useSiteSettings();
  const { data: members, loading, error, retry } = useCmsData(
    () => api.team.list(),
    [],
    [],
    initialMembers
  );
  useTeamForm();

  const leaders = members.filter((m) => m.type === "leader");
  const teamMembers = members.filter((m) => m.type !== "leader");

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">{settings.team_hero_label}</span>
          <h1>
            {settings.team_hero_title}{" "}
            <span>{settings.team_hero_highlight}</span>
          </h1>
          <p>{settings.team_hero_description}</p>
          <a href="/get-started" className="btn btn-primary" style={{ position: "relative", zIndex: 2 }}>
            {settings.team_hero_cta_primary}
          </a>
        </div>
      </section>

      <section className="leadership-section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
            <span className="section-label">{settings.team_leadership_label}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--navy)" }} className="reveal">
              {settings.team_leadership_title}{" "}
              <span style={{ color: "var(--teal)" }}>{settings.team_leadership_highlight}</span>
            </h2>
          </div>
          <div className="leadership-grid">
            <CmsLoadState
              loading={loading}
              error={error}
              empty={!loading && !error && leaders.length === 0}
              loadingLabel="Loading team…"
              emptyLabel="No team members available yet."
              onRetry={retry}
              variant="cards"
              count={2}
            />
            {!loading && !error && leaders.map((leader, i) => (
              <LeaderCard leader={leader} delay={staggerDelay(i)} key={leader.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
            <span className="section-label">{settings.team_writers_label}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--navy)" }} className="reveal">
              {settings.team_writers_title}{" "}
              <span style={{ color: "var(--teal)" }}>{settings.team_writers_highlight}</span>
            </h2>
            <p className="reveal" style={{ color: "var(--gray-500)", marginTop: "14px", fontSize: "15px", lineHeight: 1.7 }}>{settings.team_writers_description}</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <MemberCard member={member} delay={staggerDelay(i)} key={member.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="container">
          <div className="join-grid">
            <div>
              <span className="section-label">Work With Us</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--navy)" }} className="reveal">Join Our <span style={{ color: "var(--teal)" }}>Growing Team</span></h2>
              <p className="reveal" style={{ color: "var(--gray-500)", fontSize: "16px", marginTop: "14px", lineHeight: 1.7 }}>We&apos;re always looking for talented certified resume writers and career coaches to join our mission. Work remotely, on your schedule.</p>
              <div className="join-perks">
                <div className="join-perk reveal"><div className="join-perk-icon">🌍</div><div><div className="join-perk-title">100% Remote Work</div><div className="join-perk-desc">Work from anywhere in the world on a flexible schedule that fits your life.</div></div></div>
                <div className="join-perk reveal rd1"><div className="join-perk-icon">💰</div><div><div className="join-perk-title">Competitive Pay Per Resume</div><div className="join-perk-desc">Earn $25–$80 per resume depending on complexity and your experience level.</div></div></div>
                <div className="join-perk reveal rd2"><div className="join-perk-icon">📚</div><div><div className="join-perk-title">Ongoing Training & Support</div><div className="join-perk-desc">Access our writer resource library, ATS tools, and monthly team training sessions.</div></div></div>
                <div className="join-perk reveal rd3"><div className="join-perk-icon">🚀</div><div><div className="join-perk-title">Grow With Us</div><div className="join-perk-desc">Top writers advance to Senior Writer, Team Lead, and specialty coaching roles.</div></div></div>
              </div>
            </div>
            <div className="join-form-card reveal">
              <div className="join-form-title">Apply to Join Our Team</div>
              <div className="join-form-sub">We review all applications within 3 business days.</div>
              <div className="form-group"><label>Full Name *</label><input type="text" placeholder="Your name" /></div>
              <div className="form-group"><label>Email Address *</label><input type="email" placeholder="you@email.com" /></div>
              <div className="form-group"><label>Your Speciality *</label>
                <select defaultValue="">
                  <option value="">Select your industry...</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Engineering</option>
                  <option>Legal</option>
                  <option>Marketing</option>
                  <option>Executive / C-Suite</option>
                  <option>Creative & Design</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group"><label>Certifications (CPRW, CPCC, etc.)</label><input type="text" placeholder="e.g. CPRW, PHR, MBA" /></div>
              <div className="form-group"><label>Tell Us About Yourself *</label><textarea placeholder="Years of experience, background, why you want to join ProCareerVista..."></textarea></div>
              <button className="btn-submit btn-submit-team">✦ Submit Application →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Work With Our Team?</h2>
          <p>Get matched with the perfect writer for your industry and career level within 2 hours of placing your order.</p>
          <div className="cta-actions">
            <a href="/get-started" className="btn btn-white">✦ Get Started Today</a>
            <a href="/pricing" className="btn btn-ghost">View Pricing</a>
          </div>
        </div>
      </section>
    </>
  );
}
