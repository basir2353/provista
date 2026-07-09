"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, setToken } from "@/lib/api";
import { settingImageUrl, useSiteSettings } from "@/context/SiteSettingsContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const settings = useSiteSettings();
  const siteName = settings.site_name || "ProCareerVista";
  const logoSrc = settingImageUrl(settings.site_logo, "");
  const [email, setEmail] = useState("admin@procareervista.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await auth.login(email, password);
      setToken(token);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={siteName} style={{ height: 56, width: "auto", marginBottom: 12 }} />
          ) : (
            <div className="admin-login-logo-icon">✦</div>
          )}
          <h1 className="admin-login-title">Admin Panel</h1>
          <p className="admin-login-subtitle">{siteName} Content Management</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input
              className="admin-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@procareervista.com"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In to Admin Panel"}
          </button>
        </form>

        <p className="admin-login-hint">
          Default: admin@procareervista.com / Admin@123456
        </p>
      </div>
    </div>
  );
}
