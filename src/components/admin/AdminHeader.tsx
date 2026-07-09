"use client";

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="admin-page-header">
      <div>
        <h1 className="admin-page-title">{title}</h1>
        {description && <p className="admin-page-desc">{description}</p>}
      </div>
      {action && <div className="admin-page-action">{action}</div>}
    </div>
  );
}
