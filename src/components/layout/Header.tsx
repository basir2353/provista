"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <>
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <header id="header" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <nav className="nav-inner">
            <Logo variant="header" onClick={() => setMenuOpen(false)} />

            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="nav-item"
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <Link
                    href={link.href}
                    prefetch
                    className={isActive(link.href) ? "active" : ""}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav-cta">
              <Link href="/admin/login" className="btn btn-outline nav-btn admin-nav-btn" prefetch>
                Admin
              </Link>
              <Link href="/pricing" className="btn btn-outline nav-btn" prefetch>
                See Plans
              </Link>
              <Link href="/get-started" className="btn btn-primary nav-btn" prefetch>
                Get Started
              </Link>
            </div>

            <button
              type="button"
              className={`mobile-menu ${menuOpen ? "open" : ""}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
