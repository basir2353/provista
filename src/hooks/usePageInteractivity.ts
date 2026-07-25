"use client";

import { useEffect } from "react";
import { api } from "@/lib/api";

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://backend-provista-production.up.railway.app"}/api/applications`, {
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
