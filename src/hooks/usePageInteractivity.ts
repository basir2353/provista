"use client";

import { useEffect } from "react";
import { api, PricingPlan } from "@/lib/api";

export function useHomeInteractivity() {
  useEffect(() => {
    const toggleFaq = (el: Element) => {
      const item = el.parentElement;
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    };

    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((q) => {
      q.addEventListener("click", () => toggleFaq(q));
    });

    const faqCats = document.querySelectorAll(".faq-cat");
    faqCats.forEach((cat) => {
      cat.addEventListener("click", function (this: Element) {
        faqCats.forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
      });
    });

    const videoThumb = document.querySelector(".video-thumbnail");
    const onVideoClick = () => {
      if (!videoThumb) return;
      videoThumb.innerHTML = `
        <div style="position:absolute;inset:0;background:#000;display:flex;align-items:center;justify-content:center;color:white;font-family:var(--font-body);font-size:16px;border-radius:var(--radius-lg)">
          <div style="text-align:center;">
            <div style="font-size:3rem;margin-bottom:12px;">▶</div>
            <div style="color:var(--teal);">Video player would appear here</div>
            <div style="font-size:13px;color:var(--gray-500);margin-top:8px;">Connect your video URL to embed</div>
          </div>
        </div>
      `;
    };
    videoThumb?.addEventListener("click", onVideoClick);

    return () => {
      faqQuestions.forEach((q) => {
        q.replaceWith(q.cloneNode(true));
      });
      videoThumb?.removeEventListener("click", onVideoClick);
    };
  }, []);
}

const fallbackPlanData: Record<string, { name: string; price: number; cover: string; linkedin: string; delivery: string; revisions: string }> = {
  starter: { name: "Starter", price: 99, cover: "Add-on +$49", linkedin: "Add-on +$79", delivery: "72 Hours", revisions: "3 Rounds" },
  professional: { name: "Professional", price: 199, cover: "✓ Included", linkedin: "✓ Included", delivery: "48 Hours", revisions: "Unlimited" },
  executive: { name: "Executive", price: 349, cover: "✓ Included", linkedin: "✓ Included", delivery: "24 Hours", revisions: "Unlimited" },
};

function plansToRecord(plans: PricingPlan[]) {
  const record: Record<string, { name: string; price: number; cover: string; linkedin: string; delivery: string; revisions: string }> = { ...fallbackPlanData };
  for (const plan of plans) {
    record[plan.slug] = {
      name: plan.name,
      price: plan.price,
      cover: plan.coverLetter,
      linkedin: plan.linkedin,
      delivery: plan.delivery,
      revisions: plan.revisions,
    };
  }
  return record;
}

export function useGetStartedForm(ready = true) {
  useEffect(() => {
    if (!ready) return;
    let currentPlan = "professional";
    let addonTotal = 0;
    let planData = { ...fallbackPlanData };

    const init = async () => {
      try {
        const plans = await api.pricing.plans.list();
        planData = plansToRecord(plans);
      } catch {
        planData = { ...fallbackPlanData };
      }

      const params = new URLSearchParams(window.location.search);
      const planParam = params.get("plan");
      if (planParam && planData[planParam]) {
        document.querySelectorAll(".plan-option").forEach((o) => {
          o.classList.remove("selected");
          if (o.getAttribute("data-plan") === planParam) o.classList.add("selected");
        });
        currentPlan = planParam;
      }

      updateSummary();
    };

    const updateSummary = () => {
      const p = planData[currentPlan] || planData.professional;
      const setText = (id: string, text: string) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };
      setText("summaryPlanName", p.name);
      setText("summaryPlanPrice", `$${p.price}`);
      setText("coverLetterStatus", p.cover);
      setText("linkedinStatus", p.linkedin);
      setText("deliveryTime", p.delivery);
      setText("totalPrice", `$${p.price + addonTotal}`);
    };

    const selectPlan = (el: Element) => {
      document
        .querySelectorAll(".plan-option")
        .forEach((o) => o.classList.remove("selected"));
      el.classList.add("selected");
      currentPlan = el.getAttribute("data-plan") || "professional";
      updateSummary();
    };

    const updateTotal = () => {
      addonTotal = 0;
      document.querySelectorAll(".addon-check input").forEach((cb) => {
        const input = cb as HTMLInputElement;
        if (input.checked) {
          addonTotal += Number(input.getAttribute("data-addon") || 0);
        }
      });
      updateSummary();
    };

    document.querySelectorAll(".plan-option").forEach((option) => {
      option.addEventListener("click", () => selectPlan(option));
    });

    document.querySelectorAll(".addon-check input").forEach((cb) => {
      cb.addEventListener("change", updateTotal);
    });

    const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
    fileInput?.addEventListener("change", () => {
      if (fileInput.files?.[0]) {
        const fn = document.getElementById("fileName");
        if (fn) {
          fn.style.display = "block";
          fn.textContent = `✓ Uploaded: ${fileInput.files[0].name}`;
        }
      }
    });

    const uploadArea = document.querySelector(".upload-area");
    uploadArea?.addEventListener("click", () => fileInput?.click());

    const submitBtn = document.querySelector(".btn-submit");
    submitBtn?.addEventListener("click", async () => {
      const form = document.getElementById("mainContent");
      if (!form) return;

      const val = (name: string) => (form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() || "";
      const p = planData[currentPlan] || planData.professional;

      const addons: { name: string; price: number }[] = [];
      document.querySelectorAll(".addon-check input:checked").forEach((cb) => {
        const input = cb as HTMLInputElement;
        const name = input.closest(".addon-check")?.querySelector(".addon-check-name")?.textContent || "Add-on";
        addons.push({ name, price: Number(input.getAttribute("data-addon") || 0) });
      });

      const achievements = val("achievements");
      const writerNotes = val("writerNotes");
      const targetCompanies = val("targetCompanies");
      const noteParts = [
        targetCompanies ? `Target companies: ${targetCompanies}` : "",
        achievements ? `Achievements:\n${achievements}` : "",
        writerNotes ? `Writer notes:\n${writerNotes}` : "",
      ].filter(Boolean);

      const params = new URLSearchParams(window.location.search);
      const templateId = params.get("template") || "";

      const fd = new FormData();
      fd.append("planSlug", currentPlan);
      fd.append("planName", p.name);
      fd.append("planPrice", String(p.price));
      fd.append("addons", JSON.stringify(addons));
      fd.append("firstName", val("firstName"));
      fd.append("lastName", val("lastName"));
      fd.append("email", val("email"));
      fd.append("phone", val("phone"));
      fd.append("industry", val("industry"));
      fd.append("experience", val("experience"));
      fd.append("targetRole", val("targetRole"));
      fd.append("notes", noteParts.join("\n\n"));
      if (templateId) {
        fd.append("templateId", templateId);
        fd.append("templateName", templateId);
      }
      const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
      if (fileInput?.files?.[0]) fd.append("resume", fileInput.files[0]);

      if (!val("firstName") || !val("lastName") || !val("email")) {
        alert("Please fill in your first name, last name, and email.");
        return;
      }

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-provista-production.up.railway.app";
        const res = await fetch(`${API_URL}/api/orders`, { method: "POST", body: fd });
        if (!res.ok) throw new Error("Order submission failed");
        const main = document.getElementById("mainContent");
        const success = document.getElementById("successScreen");
        if (main) main.style.display = "none";
        if (success) success.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        alert("Failed to submit order. Please ensure the backend is running and try again.");
      }
    });

    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    if (planParam && planData[planParam]) {
      document.querySelectorAll(".plan-option").forEach((o) => {
        o.classList.remove("selected");
        if (o.getAttribute("data-plan") === planParam) o.classList.add("selected");
      });
      currentPlan = planParam;
    }

    void init();
  }, [ready]);
}

export function usePricingToggle() {
  useEffect(() => {
    const toggle = document.getElementById("billingToggle") as HTMLInputElement | null;
    const onToggle = () => {
      const on = toggle?.checked ?? false;
      document.querySelectorAll(".pricing-card[data-price]").forEach((card) => {
        const price = card.getAttribute("data-price");
        const bundlePrice = card.getAttribute("data-bundle-price");
        const val = on ? bundlePrice : price;
        const el = card.querySelector(".price-val");
        if (el && val) el.textContent = val;
      });
    };

    toggle?.addEventListener("change", onToggle);
    return () => toggle?.removeEventListener("change", onToggle);
  }, []);
}

export function useContactForm() {
  useEffect(() => {
    document.querySelectorAll(".subject-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document
          .querySelectorAll(".subject-chip")
          .forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });

    const submitBtn = document.querySelector(".btn-submit-contact");
    submitBtn?.addEventListener("click", async () => {
      const form = submitBtn.closest(".contact-form-card");
      if (!form) return;

      const inputs = form.querySelectorAll("input");
      const textarea = form.querySelector("textarea") as HTMLTextAreaElement | null;
      const activeChip = document.querySelector(".subject-chip.active");

      const contactData = {
        name: `${(inputs[0] as HTMLInputElement)?.value || ""} ${(inputs[1] as HTMLInputElement)?.value || ""}`.trim(),
        email: (inputs[2] as HTMLInputElement)?.value || "",
        subject: (inputs[3] as HTMLInputElement)?.value || activeChip?.textContent?.trim() || "General Inquiry",
        message: textarea?.value || "",
        source: "contact",
      };

      if (!contactData.name || !contactData.email || !contactData.message) {
        alert("Please fill in your name, email, and message.");
        return;
      }

      try {
        await api.contacts.submit(contactData);
        const success = document.getElementById("successMsg");
        if (success) success.style.display = "block";
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.textContent = "✓ Sent!";
          submitBtn.style.background = "var(--teal-dark)";
        }
      } catch {
        alert("Failed to send message. Please try again.");
      }
    });
  }, []);
}

export function useServiceNav() {
  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll(".service-tab").forEach((tab) => {
        const href = tab.getAttribute("href");
        if (!href?.startsWith("#")) return;
        const target = document.querySelector(href);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          document.querySelectorAll(".service-tab").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export function useBlogFilter() {
  useEffect(() => {
    const chips = document.querySelectorAll(".filter-chip");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const cat = chip.getAttribute("data-cat") || "all";
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        document.querySelectorAll(".post-card").forEach((card) => {
          const htmlCard = card as HTMLElement;
          const match = cat === "all" || card.getAttribute("data-cat") === cat;
          htmlCard.style.display = match ? "" : "none";
        });
      });
    });
  }, []);
}

export function useTeamForm() {
  useEffect(() => {
    const submitBtn = document.querySelector(".btn-submit-team");
    submitBtn?.addEventListener("click", async () => {
      const form = submitBtn.closest("form") || submitBtn.closest(".apply-form") || document;
      const inputs = form.querySelectorAll("input");
      const textarea = form.querySelector("textarea") as HTMLTextAreaElement | null;
      const select = form.querySelector("select") as HTMLSelectElement | null;

      const data = {
        name: (inputs[0] as HTMLInputElement)?.value || "",
        email: (inputs[1] as HTMLInputElement)?.value || "",
        position: select?.value || "Resume Writer",
        experience: (inputs[2] as HTMLInputElement)?.value || "",
        coverLetter: textarea?.value || "",
      };

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-provista-production.up.railway.app";
        const res = await fetch(`${API_URL}/api/applications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed");
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.textContent = "✓ Application Submitted!";
          submitBtn.style.background = "var(--teal-dark)";
        }
      } catch {
        alert("Failed to submit application. Please ensure the backend is running.");
      }
    });
  }, []);
}

export function useTemplatesFilter() {
  useEffect(() => {
    const tabs = document.querySelectorAll(".filter-tab");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const cat = tab.getAttribute("data-cat") || "all";
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        document.querySelectorAll(".template-card").forEach((card) => {
          const htmlCard = card as HTMLElement;
          const match = cat === "all" || card.getAttribute("data-cat") === cat;
          htmlCard.style.display = match ? "" : "none";
          htmlCard.style.opacity = match ? "1" : "0";
          htmlCard.style.transform = match ? "translateY(0)" : "translateY(12px)";
        });
      });
    });
  }, []);
}
