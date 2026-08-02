import { NextResponse } from "next/server";

export async function GET() {
  try {
    const websiteId = "d92f05f0-3cf6-4d7e-b7f2-7066eef3dcad";
    const now = Date.now();
    const res = await fetch(
      `https://cloud.umami.is/api/websites/${websiteId}/stats?startAt=0&endAt=${now}`,
      { headers: { "Accept": "application/json" }, next: { revalidate: 10 } }
    );

    if (res.ok) {
      const data = await res.json();
      const visits = data?.pageviews?.value || data?.visitors?.value;
      if (typeof visits === "number" && visits > 0) {
        return NextResponse.json({ visits });
      }
    }
  } catch {
    // Fallthrough to base count fallback
  }

  return NextResponse.json({ visits: 8144 });
}
