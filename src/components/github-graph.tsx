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
      // Filter to exactly 52 weeks (364 days) from today for a full 12-month display
      if (data.length === 0) return data;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 364);
      const cutoff = cutoffDate.toISOString().split("T")[0];
      return data.filter((d) => d.date >= cutoff);
    }
  );

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Contributions
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          My open-source activity over the past year.
        </p>
      </div>

      <div className="overflow-x-auto">
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
