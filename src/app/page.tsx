import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Socials } from "@/components/socials";
import { Projects } from "@/components/projects";
import { GitHubGraph } from "@/components/github-graph";
import { Blogs } from "@/components/blogs";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-170 px-6 pb-16 pt-20">
        <div className="space-y-16">
          {/* Hero + About + Socials form the intro block */}
          <div className="space-y-6">
            <Hero />
            <About />
            <Socials />
          </div>

          {/* Separator */}
          <hr className="border-border" />

          {/* Projects */}
          <Projects />

          {/* GitHub Contributions */}
          <GitHubGraph />

          {/* Separator */}
          <hr className="border-border" />

          {/* Blogs */}
          <Blogs />
        </div>
      </main>
      <div className="mx-auto w-full max-w-170 px-6">
        <Footer />
      </div>
    </>
  );
}
