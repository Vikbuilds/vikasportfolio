import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "theadroitdev";
const GITHUB_PROFILE_URL = "https://github.com/theadroitdev";

export function GitHubGraph() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

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

      <div className="overflow-hidden rounded-xl border border-border">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
          />
        </Suspense>
      </div>
    </section>
  );
}
