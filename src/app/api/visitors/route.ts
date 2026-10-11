import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const isDebug = req.nextUrl.searchParams.get("debug") === "1" || req.nextUrl.searchParams.get("debug") === "true";
  const BASE_VISITS = Number(process.env.NEXT_PUBLIC_BASE_VISITS) || 8144;

  const accessToken = process.env.VERCEL_ACCESS_TOKEN?.trim().replace(/^["']|["']$/g, "");
  const projectId = process.env.VERCEL_PROJECT_ID?.trim().replace(/^["']|["']$/g, "");
  const teamId = (process.env.VERCEL_TEAM_ID || process.env.VERCEL_ORG_ID)?.trim().replace(/^["']|["']$/g, "");

  const diagnostics: Record<string, unknown> = {
    hasAccessToken: Boolean(accessToken),
    hasProjectId: Boolean(projectId),
    projectId: projectId ? `${projectId.slice(0, 6)}...` : null,
    hasTeamId: Boolean(teamId),
  };

  // 1. Try Vercel Web Analytics API (v1 query endpoint)
  if (accessToken && projectId) {
    try {
      const vercelUrl = new URL("https://api.vercel.com/v1/query/web-analytics/visits/count");
      vercelUrl.searchParams.set("projectId", projectId);
      if (teamId) {
        vercelUrl.searchParams.set("teamId", teamId);
      }

      const res = await fetch(vercelUrl.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      diagnostics.vercelApiStatus = res.status;

      if (res.ok) {
        const data = await res.json();
        diagnostics.vercelData = data;

        // Vercel returns { data: { pageviews: number, visitors: number } }
        const count =
          typeof data?.data?.pageviews === "number"
            ? data.data.pageviews
            : typeof data?.data?.visitors === "number"
            ? data.data.visitors
            : typeof data?.pageviews === "number"
            ? data.pageviews
            : typeof data?.visitors === "number"
            ? data.visitors
            : null;

        if (typeof count === "number") {
          diagnostics.extractedCount = count;
          if (isDebug) {
            return NextResponse.json({ visits: count, source: "vercel", diagnostics });
          }
          return NextResponse.json({ visits: count });
        }
      } else {
        const errText = await res.text();
        diagnostics.vercelError = errText;
        console.error(`[Vercel Analytics API] HTTP ${res.status}:`, errText);
      }
    } catch (err: unknown) {
      diagnostics.vercelFetchException = String(err);
      console.error("[Vercel Analytics API] Fetch error:", err);
    }
  }

  // 2. Try Umami Cloud Analytics API
  const umamiApiKey = process.env.UMAMI_API_KEY?.trim();
  const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID?.trim() || "d92f05f0-3cf6-4d7e-b7f2-7066eef3dcad";

  if (umamiApiKey) {
    try {
      const now = Date.now();
      const res = await fetch(
        `https://api.umami.is/v1/websites/${umamiWebsiteId}/stats?startAt=0&endAt=${now}`,
        {
          headers: {
            Authorization: `Bearer ${umamiApiKey}`,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      diagnostics.umamiApiStatus = res.status;

      if (res.ok) {
        const data = await res.json();
        const visits = data?.pageviews?.value || data?.visitors?.value;
        if (typeof visits === "number") {
          if (isDebug) {
            return NextResponse.json({ visits, source: "umami", diagnostics });
          }
          return NextResponse.json({ visits });
        }
      } else {
        diagnostics.umamiError = await res.text();
      }
    } catch (err: unknown) {
      diagnostics.umamiFetchException = String(err);
    }
  }

  // 3. Fallback to baseline
  if (isDebug) {
    return NextResponse.json({ visits: BASE_VISITS, source: "fallback", diagnostics });
  }

  return NextResponse.json({ visits: BASE_VISITS });
}
