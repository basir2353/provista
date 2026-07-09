const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-provista-production.up.railway.app";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("provista_admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("provista_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("provista_admin_token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
  };

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string>) },
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  const text = await res.text();

  if (!res.ok) {
    let err: { error?: string } = { error: res.statusText };
    if (text) {
      try {
        err = JSON.parse(text);
      } catch {
        err = { error: text || res.statusText };
      }
    }
    throw new Error(err.error || "Request failed");
  }

  if (!text) return {} as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid response from server");
  }
}

// Auth
export const auth = {
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string; role: string } }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    ),
  me: () => request<{ id: string; email: string; name: string; role: string }>("/api/auth/me"),
};

// Dashboard
export const dashboard = {
  get: () => request<DashboardData>("/api/dashboard"),
};

export interface DashboardData {
  stats: {
    orders: { total: number; new: number };
    contacts: { total: number; new: number };
    applications: { total: number; new: number };
    templates: number;
    blogPosts: number;
    teamMembers: number;
    newsletterSubscribers: number;
  };
  recent: {
    orders: Order[];
    contacts: ContactMessage[];
  };
}

// Generic CRUD helper
function crud<T>(basePath: string) {
  return {
    list: () => request<T[]>(basePath),
    listAdmin: () => request<T[]>(`${basePath}/admin/all`),
    create: (data: Partial<T> | FormData) =>
      request<T>(`${basePath}/admin`, {
        method: "POST",
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    update: (id: string, data: Partial<T> | FormData) =>
      request<T>(`${basePath}/admin/${id}`, {
        method: "PUT",
        body: data instanceof FormData ? data : JSON.stringify(data),
      }),
    delete: (id: string) =>
      request<{ message: string }>(`${basePath}/admin/${id}`, { method: "DELETE" }),
  };
}

// Types
export interface Template {
  id: string; name: string; slug: string; category: string;
  description?: string; tags?: string; atsScore: number;
  formats: string; badgeColor: string; featured: boolean;
  sortOrder: number; active: boolean;
  wordFile?: string; pdfFile?: string; previewImage?: string;
  createdAt: string; updatedAt: string;
}

export interface BlogPost {
  id: string; title: string; slug: string; excerpt: string;
  content?: string; category: string; categoryLabel: string;
  author: string; authorInitials?: string; readTime: string;
  coverGradient: string; featured: boolean; published: boolean;
  views: number; publishedAt: string;
}

export interface TeamMember {
  id: string; type: string; name: string; role: string;
  initials: string; badge?: string; bio?: string;
  certs?: string; stats?: string; industries?: string;
  speciality?: string; experience?: string; written?: string;
  writtenLabel?: string; gradient?: string; topBg?: string;
  avatarBg?: string; photoUrl?: string; sortOrder: number; active: boolean;
}

export interface PricingPlan {
  id: string; slug: string; name: string; price: number;
  bundlePrice?: number; description?: string; delivery: string;
  revisions: string; coverLetter: string; linkedin: string;
  features?: string; popular: boolean; sortOrder: number; active: boolean;
}

export interface Addon {
  id: string; name: string; slug: string; price: number;
  description?: string; sortOrder: number; active: boolean;
}

export interface Order {
  id: string; orderNumber: string; planSlug: string; planName: string;
  planPrice: number; addons?: string; addonTotal: number; totalAmount: number;
  firstName: string; lastName: string; email: string; phone?: string;
  currentRole?: string; targetRole?: string; industry?: string;
  experience?: string; linkedinUrl?: string; notes?: string;
  resumeFile?: string; templateId?: string; templateName?: string;
  status: string; paymentStatus: string; assignedTo?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string; name: string; email: string; phone?: string;
  subject: string; message: string; status: string; createdAt: string;
}

export interface TeamApplication {
  id: string; name: string; email: string; phone?: string;
  position: string; experience?: string; portfolio?: string;
  resumeFile?: string; coverLetter?: string; status: string; createdAt: string;
}

export interface NewsletterSub {
  id: string; email: string; source: string; active: boolean; createdAt: string;
}

export interface Service {
  id: string; slug: string; title: string; subtitle?: string;
  description: string; price?: string; delivery?: string;
  features?: string; anchorId?: string; sortOrder: number; active: boolean;
}

export interface FAQ {
  id: string; question: string; answer: string;
  category: string; page: string; sortOrder: number; active: boolean;
}

export interface Testimonial {
  id: string; name: string; role: string; company?: string;
  quote: string; rating: number; result?: string;
  initials?: string; gradient?: string; sortOrder: number; active: boolean;
}

export interface Industry {
  id: string; name: string; icon?: string; resumeCount?: string;
  description?: string; sortOrder: number; active: boolean;
}

export interface SiteSetting {
  id: string; key: string; value: string; group: string;
}

// API exports
export const api = {
  templates: crud<Template>("/api/templates"),
  blog: crud<BlogPost>("/api/blog"),
  team: crud<TeamMember>("/api/team"),
  services: crud<Service>("/api/services"),
  faqs: crud<FAQ>("/api/faqs"),
  testimonials: crud<Testimonial>("/api/testimonials"),
  industries: crud<Industry>("/api/industries"),

  pricing: {
    plans: {
      list: () => request<PricingPlan[]>("/api/pricing/plans"),
      listAdmin: () => request<PricingPlan[]>("/api/pricing/plans/admin/all"),
      create: (data: Partial<PricingPlan>) =>
        request<PricingPlan>("/api/pricing/plans/admin", { method: "POST", body: JSON.stringify(data) }),
      update: (id: string, data: Partial<PricingPlan>) =>
        request<PricingPlan>(`/api/pricing/plans/admin/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      delete: (id: string) =>
        request<{ message: string }>(`/api/pricing/plans/admin/${id}`, { method: "DELETE" }),
    },
    addons: {
      list: () => request<Addon[]>("/api/pricing/addons"),
      listAdmin: () => request<Addon[]>("/api/pricing/addons/admin/all"),
      create: (data: Partial<Addon>) =>
        request<Addon>("/api/pricing/addons/admin", { method: "POST", body: JSON.stringify(data) }),
      update: (id: string, data: Partial<Addon>) =>
        request<Addon>(`/api/pricing/addons/admin/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      delete: (id: string) =>
        request<{ message: string }>(`/api/pricing/addons/admin/${id}`, { method: "DELETE" }),
    },
  },

  orders: {
    listAdmin: (status?: string) =>
      request<Order[]>(`/api/orders/admin/all${status ? `?status=${status}` : ""}`),
    update: (id: string, data: Partial<Order>) =>
      request<Order>(`/api/orders/admin/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<{ message: string }>(`/api/orders/admin/${id}`, { method: "DELETE" }),
    submit: (formData: FormData) =>
      request<{ message: string; order: Order }>("/api/orders", { method: "POST", body: formData }),
  },

  contacts: {
    listAdmin: (status?: string) =>
      request<ContactMessage[]>(`/api/contacts/admin/all${status ? `?status=${status}` : ""}`),
    update: (id: string, data: { status: string }) =>
      request<ContactMessage>(`/api/contacts/admin/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<{ message: string }>(`/api/contacts/admin/${id}`, { method: "DELETE" }),
    submit: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
      request<{ message: string }>("/api/contacts", { method: "POST", body: JSON.stringify(data) }),
  },

  applications: {
    listAdmin: (status?: string) =>
      request<TeamApplication[]>(`/api/applications/admin/all${status ? `?status=${status}` : ""}`),
    update: (id: string, data: { status: string }) =>
      request<TeamApplication>(`/api/applications/admin/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<{ message: string }>(`/api/applications/admin/${id}`, { method: "DELETE" }),
  },

  newsletter: {
    listAdmin: () => request<NewsletterSub[]>("/api/newsletter/admin/all"),
    delete: (id: string) =>
      request<{ message: string }>(`/api/newsletter/admin/${id}`, { method: "DELETE" }),
    subscribe: (email: string, source?: string) =>
      request<{ message: string }>("/api/newsletter", { method: "POST", body: JSON.stringify({ email, source }) }),
  },

  settings: {
    getMap: () => request<Record<string, string>>("/api/settings"),
    listAdmin: () => request<SiteSetting[]>("/api/settings/admin/all"),
    updateBulk: (updates: { key: string; value: string; group?: string }[]) =>
      request<{ message: string }>("/api/settings/admin/bulk", { method: "PUT", body: JSON.stringify(updates) }),
    uploadFile: (key: "site_logo" | "favicon", file: File) => {
      const fd = new FormData();
      fd.append("key", key);
      fd.append("file", file);
      return request<SiteSetting>("/api/settings/admin/upload", { method: "POST", body: fd });
    },
  },
};

export function uploadUrl(path?: string | null): string {
  if (!path) return "";
  return `${API_URL}/uploads/${path}`;
}
