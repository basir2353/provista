import Link from "next/link";
import Logo from "@/components/layout/Logo";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="footer" />
            <p className="footer-tagline">
              Transforming careers through expert resume writing, ATS optimization,
              and professional storytelling since 2015.
            </p>
            <div className="footer-socials">
              <div className="footer-social">in</div>
              <div className="footer-social">𝕏</div>
              <div className="footer-social">f</div>
              <div className="footer-social">▶</div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li>
                <Link href="/services#resume-writing" prefetch>Resume Writing</Link>
              </li>
              <li>
                <Link href="/services#cover-letter" prefetch>Cover Letter</Link>
              </li>
              <li>
                <Link href="/services#linkedin" prefetch>LinkedIn Optimization</Link>
              </li>
              <li>
                <Link href="/services#executive-bio" prefetch>Executive Bio</Link>
              </li>
              <li>
                <Link href="/services#coaching" prefetch>Career Coaching</Link>
              </li>
              <li>
                <Link href="/services#interview-prep" prefetch>Interview Prep</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Industries</div>
            <ul className="footer-links">
              <li>
                <Link href="/#industries" prefetch>Technology</Link>
              </li>
              <li>
                <Link href="/#industries" prefetch>Finanace</Link>
              </li>
              <li>
                <Link href="/#industries" prefetch>Health Care</Link>
              </li>
              <li>
                <Link href="/#industries" prefetch>Engineering</Link>
              </li>
              <li>
                <Link href="/#industries" prefetch>Legal</Link>
              </li>
              <li>
                <Link href="/#industries" prefetch>Marketing</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li>
                <Link href="/about" prefetch>About Us</Link>
              </li>
              <li>
                <Link href="/team" prefetch>Our Team</Link>
              </li>
              <li>
                <Link href="/blog" prefetch>Blog</Link>
              </li>
              <li>
                <Link href="/templates" prefetch>Templates</Link>
              </li>
              <li>
                <Link href="/#testimonials" prefetch>Reviews</Link>
              </li>
              <li>
                <Link href="/pricing" prefetch>Pricing</Link>
              </li>
              <li>
                <Link href="/contact" prefetch>Contact</Link>
              </li>
              <li>
                <Link href="/admin/login" prefetch>Admin Login</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 ProCareerVista. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link href="/admin/login" className="btn btn-outline admin-footer-btn" prefetch>
              Admin Login
            </Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
