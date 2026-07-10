export function mergeSiteSettings(
  defaults: Record<string, string>,
  apiData: Record<string, string>
): Record<string, string> {
  const merged = { ...defaults };
  for (const [key, value] of Object.entries(apiData)) {
    if (value != null && String(value).trim() !== "") {
      merged[key] = value;
    }
  }
  return merged;
}
