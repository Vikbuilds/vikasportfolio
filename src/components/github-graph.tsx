import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { TooltipProvider } from "@/components/ui/tooltip";

const GITHUB_USERNAME = "Vikbuilds";
const GITHUB_PROFILE_URL = "https://github.com/Vikbuilds";

export function GitHubGraph() {
  const currentYear = new Date().getFullYear();
  const contributions = getCachedContributions(GITHUB_USERNAME, currentYear);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Contributions
        </h2>
        <p className="mt-1 text-sm text-muted-foreground font-normal">
          Building in public and open-source activity in {currentYear}.
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
