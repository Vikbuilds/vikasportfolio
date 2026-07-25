import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { TooltipProvider } from "@/components/ui/tooltip";

const GITHUB_USERNAME = "theadroitdev";
const GITHUB_PROFILE_URL = "https://github.com/theadroitdev";

export function GitHubGraph() {
  const contributions = getCachedContributions(GITHUB_USERNAME).then(
    (data) => {
      if (data.length === 0) return data;
      // Filter: start from Aug 3, 2025 (skip partial July weeks) to today
      // This ensures exactly ~52 weeks fit cleanly without horizontal scroll
      const today = new Date();
      const startDate = new Date(today);
      startDate.setFullYear(startDate.getFullYear() - 1);
      // Align to next Sunday to start on a clean week boundary
      const dayOfWeek = startDate.getDay();
      if (dayOfWeek !== 0) {
        startDate.setDate(startDate.getDate() + (7 - dayOfWeek));
      }
      const cutoff = startDate.toISOString().split("T")[0];
      const todayStr = today.toISOString().split("T")[0];
      
      return data.filter((d) => d.date >= cutoff && d.date <= todayStr);
    }
  );

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Contributions
        </h2>
        <p className="mt-1 text-md text-muted-foreground">
          My open-source activity over the past year.
        </p>
      </div>

      <div className="w-full">
        <TooltipProvider delay={200}>
          <Suspense fallback={<GitHubContributionsFallback />}>
            <GitHubContributions
              contributions={contributions}
              githubProfileUrl={GITHUB_PROFILE_URL}
            />
          </Suspense>
        </TooltipProvider>
      </div>
    </section>
  );
}
