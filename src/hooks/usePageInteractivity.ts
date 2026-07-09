"use client";

import { useEffect } from "react";

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

const planData: Record<
  string,
  {
    name: string;
    price: number;
    cover: string;
    linkedin: string;
    delivery: string;
    revisions: string;
  }
> = {
  starter: {
    name: "Starter",
    price: 99,
    cover: "Add-on +$49",
    linkedin: "Add-on +$79",
    delivery: "72 Hours",
    revisions: "3 Rounds",
  },
  professional: {
    name: "Professional",
    price: 199,
    cover: "✓ Included",
    linkedin: "✓ Included",
    delivery: "48 Hours",
    revisions: "Unlimited",
  },
  executive: {
    name: "Executive",
    price: 349,
    cover: "✓ Included",
    linkedin: "✓ Included",
    delivery: "24 Hours",
    revisions: "Unlimited",
  },
};

export function useGetStartedForm() {
  useEffect(() => {
    let currentPlan = "professional";
    let addonTotal = 0;

    const updateSummary = () => {
      const p = planData[currentPlan];
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
    submitBtn?.addEventListener("click", () => {
      const main = document.getElementById("mainContent");
      const success = document.getElementById("successScreen");
      if (main) main.style.display = "none";
      if (success) success.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
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

    updateSummary();
  }, []);
}

export function usePricingToggle() {
  useEffect(() => {
    const prices: Record<string, [number, number]> = {
      starter: [99, 79],
      professional: [199, 159],
      executive: [349, 279],
    };

    const toggle = document.getElementById("billingToggle") as HTMLInputElement | null;
    const onToggle = () => {
      const on = toggle?.checked ?? false;
      const keys = Object.keys(prices);
      document.querySelectorAll(".price-val").forEach((el, i) => {
        const key = keys[i];
        if (key) el.textContent = String(on ? prices[key][1] : prices[key][0]);
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
    submitBtn?.addEventListener("click", () => {
      const success = document.getElementById("successMsg");
      if (success) success.style.display = "block";
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.textContent = "✓ Sent!";
        submitBtn.style.background = "var(--teal-dark)";
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
    const cards = document.querySelectorAll(".post-card");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const cat = chip.getAttribute("data-cat") || "all";
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        cards.forEach((card) => {
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
    submitBtn?.addEventListener("click", () => {
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.textContent = "✓ Application Submitted!";
        submitBtn.style.background = "var(--teal-dark)";
      }
    });
  }, []);
}

export function useTemplatesFilter() {
  useEffect(() => {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".template-card");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const cat = tab.getAttribute("data-cat") || "all";
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        cards.forEach((card) => {
          const htmlCard = card as HTMLElement;
          const match =
            cat === "all" || card.getAttribute("data-cat") === cat;
          htmlCard.style.display = match ? "" : "none";
          htmlCard.style.opacity = match ? "1" : "0";
          htmlCard.style.transform = match ? "translateY(0)" : "translateY(12px)";
        });
      });
    });
  }, []);
}
