/** Bust Next.js cached public pages after an admin mutation. */
export async function revalidatePublicSite(paths?: string[]) {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paths,
        secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET || undefined,
      }),
    });
  } catch {
    // Non-fatal — client refetch / force-dynamic still picks up changes
  }
}
