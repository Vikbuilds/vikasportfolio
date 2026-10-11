import { NextResponse } from "next/server";

export async function GET() {
  const now = Date.now();
  const BASE_VISITS = Number(process.env.NEXT_PUBLIC_BASE_VISITS) || 8144;

  // 1. Try Vercel Web Analytics API if credentials are provided in environment
  if (process.env.VERCEL_ACCESS_TOKEN && process.env.VERCEL_PROJECT_ID) {
    try {
      const res = await fetch(
        `https://api.vercel.com/v1/web-analytics/stats?projectId=${process.env.VERCEL_PROJECT_ID}&from=0&to=${now}&environment=production`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
            Accept: "application/json",
          },
          next: { revalidate: 60 },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const visits = data?.pageviews?.value || data?.visitors?.value || data?.total;
        if (typeof visits === "number" && visits > 0) {
          return NextResponse.json({ visits });
        }
      }
    } catch {
      // Fall through to other providers
    }
  }

  // 2. Try Umami Cloud Analytics API
  try {
    const websiteId = process.env.UMAMI_WEBSITE_ID || "d92f05f0-3cf6-4d7e-b7f2-7066eef3dcad";
    const headers: Record<string, string> = { Accept: "application/json" };
    if (process.env.UMAMI_API_KEY) {
      headers["Authorization"] = `Bearer ${process.env.UMAMI_API_KEY}`;
    }

    const res = await fetch(
      `https://cloud.umami.is/api/websites/${websiteId}/stats?startAt=0&endAt=${now}`,
      { headers, next: { revalidate: 60 } }
    );

    if (res.ok) {
      const data = await res.json();
      const visits = data?.pageviews?.value || data?.visitors?.value;
      if (typeof visits === "number" && visits > 0) {
        return NextResponse.json({ visits });
      }
    }
  } catch {
    // Fall through to fallback
  }

  // 3. Fallback baseline count
  return NextResponse.json({ visits: BASE_VISITS });
}
