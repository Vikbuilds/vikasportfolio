"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";

export function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const storyParagraphs = [
    {
      id: "intro",
      content: (
        <>
          Honestly, I’ve just always loved making things.
        </>
      ),
    },
    {
      id: "origins",
      content: (
        <>
          I started out studying{" "}
          <span className="text-foreground font-medium">Bachelors in Computer Applications</span>,
          but I quickly realized that staring at textbooks wasn’t going to cut it. I learned way
          faster by actually getting my hands dirty - building random things, breaking them,
          figuring out why they broke, and putting stuff out on the internet for real people to use.
        </>
      ),
    },
    {
      id: "startups",
      content: (
        <>
          Over the last few years, my focus has been deeply rooted in the startup ecosystem. I
          launched <span className="text-foreground font-medium">WelBe</span>, a mental health
          startup, which taught me the hard realities of building something from scratch. Later on,
          I built digital marketplaces to help startups trade and liquidate dead assets (though it
          didn&apos;t work out as planned!). Along the way, making it to the top 15 at the{" "}
          <span className="text-foreground font-medium">IIM Bangalore Business Mastermind</span> was
          a cool validation that I actually knew what I was doing when it came to business strategy
          and execution.
        </>
      ),
    },
    {
      id: "community",
      content: (
        <>
          Somewhere in the middle of all this, I noticed something that bothered me - my college
          had zero culture around building things. No mentors, no hackathons, just textbooks and
          exams. I could see where that was heading: talented people finishing four years having
          built nothing, while people at bigger colleges had all of it handed to them. So I started{" "}
          <span className="text-foreground font-medium">Builtby.BCA</span> - brought in industry
          mentors, ran hackathons and technical sprints, built the ecosystem that should&apos;ve
          existed already. It&apos;s still running today, and it&apos;s proof that where you
          studied has very little to do with what you&apos;re capable of building.
        </>
      ),
    },
    {
      id: "philosophy",
      content: (
        <>
          When it comes to building, I don&apos;t pretend to be a traditional enterprise engineer
          typing out every single line of code by hand. Instead, I use{" "}
          <span className="text-foreground font-medium">modern AI as a leverage tool</span>. I
          understand how systems talk to each other, I know how to steer the AI effectively, and I
          use that to bridge the gap between a random idea in my head and a working product before I
          lose momentum.
        </>
      ),
    },
    {
      id: "conclusion",
      content: (
        <>
          I also like writing about the messy parts of this journey - what works, what totally fails,
          and what I&apos;m figuring out along the way. At the core of it all, I try to{" "}
          <span className="text-foreground font-medium">live by design, not by default</span>. When
          I&apos;m away from the screen, I&apos;m usually keeping my mind sharp with classical
          stuff or just exploring.
        </>
      ),
    },
  ];

  return (
    <motion.section
      className="space-y-3.5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        I create, build, and ship fast. As an indie Builder, I turn ideas into real products by
        leveraging modern AI and technical intuition to bring concepts from zero to one. When
        I&apos;m not building stuff, I keep my mind sharp through classical pursuits and constant
        exploration.{" "}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-0.5 text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide story" : "Wanna know more?"}</span>
          <ChevronDown
            size={12}
            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "text-muted-foreground"
              }`}
          />
        </button>
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground font-normal">
        Always open to interesting conversations about startups, AI, and building cool things.{" "}
        <a
          href="mailto:vikasacharyaaa@gmail.com"
          className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors"
        >
          Say hello
        </a>
        , or meet me in{" "}
        <a
          href="https://maps.google.com/?q=Bengaluru,+India"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 align-baseline text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors group"
        >
          <MapPin size={12} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 translate-y-[1px]" />
          <span>Bengaluru, India</span>
        </a>
        .
      </p>

      {/* Animated Story Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-2 border-l-2 border-primary/20 pl-4 space-y-3.5 py-1">
              {storyParagraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  className="text-sm leading-relaxed text-muted-foreground font-normal"
                >
                  {paragraph.content}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: storyParagraphs.length * 0.07 + 0.1 }}
                className="pt-1"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-xs font-medium text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  ↑ Collapse story
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
