import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Called after admin saves so public pages drop cached SSR data.
 * POST /api/revalidate  { secret?, paths?: string[] }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const expected = process.env.REVALIDATE_SECRET;
    if (expected && body.secret !== expected) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const paths: string[] = Array.isArray(body.paths) && body.paths.length
      ? body.paths
      : ["/", "/pricing", "/templates", "/services", "/team", "/blog", "/get-started", "/contact", "/about", "/free-consultation"];

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Revalidate failed" },
      { status: 500 }
    );
  }
}
