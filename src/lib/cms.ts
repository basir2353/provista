export function parseJsonArray<T>(value?: string | null): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function splitCsv(value?: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export function revealDelay(index: number, prefix = "reveal-delay"): string {
  const delays = ["", `${prefix}-1`, `${prefix}-2`, `${prefix}-3`, `${prefix}-4`];
  return delays[index % delays.length];
}

export function staggerDelay(index: number): string {
  const delays = ["", "rd1", "rd2", "rd3"];
  return delays[index % delays.length];
}

export function formatBlogDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isIncluded(value?: string): boolean {
  if (!value) return false;
  return value.includes("✓") || value.toLowerCase().includes("included");
}
