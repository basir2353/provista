type AdminAlertProps = {
  type?: "success" | "error";
  message: string;
  onClose?: () => void;
};

export default function AdminAlert({ type = "error", message, onClose }: AdminAlertProps) {
  if (!message) return null;

  return (
    <div className={`admin-alert ${type === "success" ? "success" : "error"}`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button type="button" className="admin-alert-close" onClick={onClose} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
}
