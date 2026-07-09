"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api, TeamApplication } from "@/lib/api";

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<TeamApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.applications.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.applications.update(id, { status });
    load();
  };

  return (
    <>
      <AdminHeader title="Job Applications" description="Review writer and coach job applications submitted through the team page." />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : items.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📋</div><div className="admin-empty-text">No applications yet</div></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Applicant</th><th>Position</th><th>Experience</th><th>Resume</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td><strong>{a.name}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{a.email}</span></td>
                  <td>{a.position}</td>
                  <td>{a.experience || "—"}</td>
                  <td>{a.resumeFile ? <a href={`${process.env.NEXT_PUBLIC_API_URL || "https://backend-provista-production.up.railway.app"}/uploads/${a.resumeFile}`} target="_blank" className="admin-btn admin-btn-secondary admin-btn-sm">View</a> : "—"}</td>
                  <td><span className={`admin-badge ${a.status === "new" ? "yellow" : a.status === "accepted" ? "green" : a.status === "rejected" ? "red" : "blue"}`}>{a.status}</span></td>
                  <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => updateStatus(a.id, "reviewing")}>Review</button>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => updateStatus(a.id, "accepted")}>Accept</button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => updateStatus(a.id, "rejected")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
