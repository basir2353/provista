export function mergeSiteSettings(
  defaults: Record<string, string>,
  apiData: Record<string, string>
): Record<string, string> {
  const merged = { ...defaults };
  for (const [key, value] of Object.entries(apiData)) {
    // Always prefer API/DB values when the key exists — including empty strings
    // so admin clears are not overwritten by code defaults.
    if (Object.prototype.hasOwnProperty.call(apiData, key) && value != null) {
      merged[key] = String(value);
    }
  }
  return merged;
}
