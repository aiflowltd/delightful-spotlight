import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import { theSlideArticle as article } from "@/content/the-slide-article";

const IMG = "/blog/the-slide";

export const Route = createFileRoute("/blog/the-slide")({
  head: () => ({
    meta: [
      { title: article.title },
      { name: "description", content: article.excerpt },
      { name: "author", content: article.author },
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.excerpt },
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: article.isoDate },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: ArticlePage,
});

function H2({ children }: { children: string }) {
  const id = children
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (
    <h2
      id={id}
      className="font-display text-[1.75rem] sm:text-3xl leading-tight tracking-tight text-foreground !mt-14 first:!mt-0"
    >
      {children}
    </h2>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="underline underline-offset-4 decoration-1 hover:text-[var(--violet)]"
      style={{ textDecorationColor: "var(--violet)" }}
    >
      {children}
    </a>
  );
}

function Figure({
  src,
  alt,
  caption,
  note,
  width,
  height,
  wide,
}: {
  src: string;
  alt: string;
  caption?: string;
  note?: string;
  width: number;
  height: number;
  wide?: boolean;
}) {
  return (
    <figure className={`!my-10 ${wide ? "md:-mx-12 lg:-mx-[11rem]" : ""}`}>
      {caption && (
        <figcaption className="mb-3 font-display italic text-lg text-foreground">
          {caption}
        </figcaption>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="w-full h-auto rounded-sm border"
        style={{ borderColor: "var(--rule)" }}
      />
      {note && (
        <p className="mt-3 text-[0.95rem] leading-relaxed italic text-muted-foreground">{note}</p>
      )}
    </figure>
  );
}

function ArticlePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <article className="mx-auto max-w-[44rem] px-6 pt-12 pb-20">
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← All essays
        </Link>

        <header className="mt-8 pb-10 border-b" style={{ borderColor: "var(--rule)" }}>
          <h1 className="font-display text-[2.4rem] sm:text-5xl leading-[1.05] tracking-tight [text-wrap:balance]">
            {article.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">
              {article.author}, {article.affiliation}
            </span>
            <time dateTime={article.isoDate}>{article.date}</time>
            <span>{article.readingTime}</span>
          </div>
        </header>

        <div className="mt-10 space-y-6 text-[1.08rem] leading-[1.75] text-ink">
          <H2>We bet the Sprint on one slide</H2>
          <p>
            Ten minutes before the first team presented, I was sitting in a coaching room with my
            laptop open, not reading a word on it.
          </p>
          <p>
            The{" "}
            <A href="https://entrepreneur.nyu.edu/resource/startup-sprint-student/">
              Startup Sprint
            </A>{" "}
            runs twice a year. We call it two of the most productive weeks of your life: 50 customer
            interviews per team in two weeks, with feedback presentations every other day.
          </p>
          <p>
            This time we had changed the one thing the whole program runs on. Teams no longer told
            us what customers said. They handed over their transcripts, and an AI had read and
            scored every one. Now eighteen teams had to stand up and present what it found.
          </p>
          <p>
            I had no idea how they would take it. Founders don’t like hearing that customers aren’t
            excited, and they like hearing it from software even less (or so I thought). Elsewhere
            in the building, three other rooms were starting at the same moment. I imagined every
            one of them erupting into arguments against the AI instead of the only question that
            mattered: is this startup moving in the right direction?
          </p>
          <p>
            If this failed to change anything for the teams, we would be back to the conversation we
            had been stuck in for years.
          </p>

          <H2>Discovery is the easiest thing to fake</H2>
          <p>Here is how a presentation used to go.</p>
          <p>
            A typical team gets up in front of the room and proudly announces they did ten
            interviews. “The feedback was really good,” they say. “The customers love it.”
          </p>
          <p>
            Behind them is the brief the program assigned: what we thought, who we spoke to, what we
            found, what we’ll do next. On a good day, it looks like this.
          </p>
          <Figure
            src={`${IMG}/summary-findings-brief.webp`}
            alt="Summary Findings check-in brief for Nestwell, a fictional startup, across twelve interviews: a four-column table of what we thought, who we spoke to and what we asked, what we found, and what this means for our business and what we’ll do next."
            caption="Sample brief (older version)"
            width={1672}
            height={941}
            wide
          />
          <p>
            It looks rigorous. The questions are open-ended. The findings sound like learning. And
            none of it can be checked.
          </p>
          <p>
            “Strong pain appears when issues drag on”: for how many of the twelve? In whose words?
            Did they ask about the last time it happened, or describe the product and wait for a
            nod? Every cell is the team’s interpretation of conversations nobody else heard.
          </p>
          <p>
            So the coaches dig, and fifteen minutes later the real answer comes out. More often than
            not, they weren’t discovering. They were selling. We tell them to stop pitching, ask
            about the past, and go again. Three days later they’re back with ten more interviews. If
            we are lucky, the team tweaked their ICP, but usually not much changes.
          </p>
          <p>
            I would spend whole afternoons repeating the same five sentences: don’t sell, dig in on
            the pain, are they showing past behavior, do they recognize it as a problem? Each one
            was a verdict on hours of work, delivered in front of the team’s peers. So they defended
            the story, and the harder we pushed, the tighter many of them held on. It was
            frustrating for us, and difficult for them to feel like they were making progress.
          </p>
          <p>
            Every cohort had a few teams who figured it out on their own, and some excellent
            founders came through those rooms. The trouble was the average team, and how long it
            took to raise it.
          </p>
          <p>
            In a classroom it’s worse. The instructor has a room full of teams and a syllabus to
            keep moving, and discovery shrinks to a single number: we talked to ten people. You
            can’t grade an interview you never heard. AI is making it easier to fake, too.
          </p>
          <p>
            Frank Rimalovski, our executive director,{" "}
            <A href="https://entrepreneur.nyu.edu/blog/2026/07/13/great-founders-chase-insight-ai-makes-customer-discovery-their-force-multiplier/">
              has written
            </A>{" "}
            that AI can make a founder sharper and more honest in discovery, or simply help them
            fool themselves faster.
          </p>
          <p>
            You can make the case for discovery in lecture as forcefully as you like. Then the
            students walk out the door, and you are left to hope they absorbed some of the material.
          </p>

          <H2>Five seconds, one screen</H2>
          <p>
            There were four teams in my room. The first walked up, plugged in, and put their slide
            on the screen. I sat forward in my chair. Within five seconds I knew more about where
            they stood than twenty minutes with the old brief had ever told me.
          </p>
          <p>This is what that slide looks like.</p>
          <Figure
            src={`${IMG}/problem-discovery-dashboard.webp`}
            alt="Problem Discovery Dashboard for Nestwell, a fictional startup: twelve interviews sorted into five pain tiers from Hair on Fire down to Not a Problem, split by customer segment with a verbatim customer quote and a count in each cell, plus key learnings since the last check-in, one new Hair on Fire since the last presentation, a yellow Interview Score, and a row of context clues."
            caption="The Problem Discovery Dashboard"
            note="Same fictional startup, same twelve interviews as the brief above. Every interview sorted by how much the problem hurts, split by customer segment, with the customer’s own words as proof."
            width={1672}
            height={941}
            wide
          />
          <p>
            Look at what you can see now. Four of the twelve interviews are Hair on Fire, and three
            of those come from one segment, self-managed renters. The pain isn’t logging a repair.
            It’s chasing one that never gets fixed, in the customer’s own words. One new Hair on
            Fire since the last check-in. And a yellow light in the corner, saying the interviews
            themselves need work. The old brief claimed all of this. The dashboard shows it.
          </p>
          <p>
            The first team’s slide was emptier. Nothing in the top two rows. The founders looked at
            it, then at the floor.
          </p>
          <p>
            “We did five interviews,” they said. “They all came back as nice-to-have. Here’s why we
            think that is, and here’s what we’re changing.”
          </p>
          <p>
            I couldn’t believe my ears. We were straight into the real question: do you have the
            wrong customer, or the wrong problem? In past cohorts it took a dozen questions to get
            there, if we got there at all. This team arrived on its own, before we said a word.
          </p>
          <p>
            Not every team got there. A couple still came in with a story to sell. But the average
            team that morning was more honest than any first check-in I can remember. They had built
            their slides the night before from verified evidence instead of memory, and it’s hard to
            argue with your own transcript. For the first time, coach and founder were looking at
            the same facts. The teams were quieter than first-week teams usually are. Inside, I was
            celebrating. We count it as a win if a team questions its customer by the end of two
            weeks. Many of these teams were doing it at the first check-in.
          </p>

          <H2>What sits underneath the slide</H2>
          <p>
            Looking at the slide more closely, no individual element on it is new. What’s new is
            that every part is the visible end of something underneath it: a rubric, a transcript, a
            score the team didn’t get to write for itself.
          </p>
          <p>
            Every interview sits on the Pain Scale, five tiers from Hair on Fire down to Not a
            Problem, split into columns by customer segment, with a count and a verbatim quote in
            each tier. A light, green, yellow or red, indicates the Interview Score: how well the
            interviews were run. Key learnings and a row of context clues sum up what has changed
            since the last check-in.
          </p>
          <p>
            The Pain Scale was the bigger shift. We used to send teams out to “find a hair-on-fire
            problem” and leave the definition to them. Now we sit them down first and show them what
            one looks like, and what separates it from a nice-to-have. The difference is subtle. A
            problem existing isn’t enough. A hair-on-fire customer is already acting on it: spending
            money, building workarounds, chasing a fix. Founders tend to miss those details because
            they’re thrilled by any sign that someone likes the idea.
          </p>
          <p>
            The night before each check-in, teams built the slide by hand from what the AI found in
            their transcripts. They had to stand behind every word on it.
          </p>

          <H2>A second reader for every interview</H2>
          <p>
            Every cell on that slide traces back to a transcript. We asked teams to turn in
            interview transcripts, not summaries. Then we built a set of Claude skills that read
            each transcript and applied our rubrics to it.
          </p>
          <p>
            Each time a team uploaded an interview, it went through those skills. The Pain Scale
            skill scored the customer’s relationship to the team’s focal problem. It does that by
            looking at four things: whether the customer recognized the problem on their own, the
            language they used, what they had already spent or built to deal with it, and how they
            behave as a buyer. The Interview Score skill checked the interview itself. Were the
            quotes verbatim? Did the founder ask about past behavior or only about future intent?
            Were there leading questions? Did the interviewee actually fit the team’s target
            customer? Founders read the output for every interview they ran.
          </p>
          <p>
            Before each check-in, a second skill pulled all of a team’s scored interviews together.
            It drafted a picture of where the team stood and then started a conversation with them:
            this is what your evidence seems to show, do you agree, and here is what we’d look at
            next.
          </p>
          <p>
            This fall, those skills became a platform. You can read about it in{" "}
            <Link
              to="/blog/introducing-evi"
              className="underline underline-offset-4 decoration-1 hover:text-[var(--violet)]"
              style={{ textDecorationColor: "var(--violet)" }}
            >
              Introducing Evi
            </Link>
            .
          </p>

          <H2>Grading the interviewer, not just the idea</H2>
          <p>
            The Interview Score, that small light in the corner of the slide, was what I had worried
            about most. We know most teams run weak interviews at this stage. I didn’t think
            founders would put harsh feedback about their own technique on a slide, so I shrank it
            to a single traffic light to soften the blow.
          </p>
          <p>
            They put it up anyway, honestly, and it became the best conversation starter we had.
            Most teams scored yellow, and a few scored red. In room after room, a coach asked the
            same question: why yellow? The team would explain, a little sheepishly, what the AI had
            flagged. One founder kept swapping stories with interviewees about their own experience
            in the industry. Another introduced themselves as an industry peer, which changed what
            people were willing to say.
          </p>
          <p>
            From there the coaching was simple. This part is fair. Here you were selling. Ask about
            the last time it happened instead. Can you come back next time with a green? Most said
            yes. Teams felt in control, because they got feedback after every interview and could
            see whether they were improving.
          </p>
          <p>
            When my session ended I was buzzing, but I didn’t want to put words in anyone’s mouth. I
            went back to my office and waited. A few minutes later Frank came through the door
            grinning and said, “That was incredible.” I let myself grin back.
          </p>

          <H2>Let the evidence deliver the bad news</H2>
          <p>
            At the coaches’ meeting that afternoon we discussed the impact of the new format. The
            coaches agreed the format had headed off happy ears, surfaced problems in a form teams
            could take in, and brought in stronger business theses. The Interview Score, most of
            them said, made the hard conversations possible.
          </p>
          <p>
            Looking back, the AI being clever wasn’t what made the difference. The slide was. It
            changed four things in the room.
          </p>
          <p>
            The conversation started in the right place. Coach and founder were looking at the same
            evidence, so most check-ins opened with “wrong customer or wrong problem?” instead of
            arriving there twenty minutes later, if at all.
          </p>
          <p>
            The feedback loop shrank from days to a single interview. Teams learned they had been
            selling the night they ran the interview, not three days later in front of a room.
          </p>
          <p>
            The bad news came from the evidence, not the coach. Teams had already faced their scores
            before they walked in, so there was far less of a story to defend. Coaches could stop
            playing detective and spend their time on judgment: what to test next, and who to talk
            to.
          </p>
          <p>
            And the coaching started to scale. No coach can sit in on fifty interviews per team.
            Something can now read every one of them, line by line, and the coach can step in
            wherever it matters.
          </p>
          <p>
            None of this turned weak teams into great ones. Strong teams were strong before, and
            some teams still struggled after. What moved was the floor. The average team reached the
            real question faster and stayed more honest about the answer.
          </p>
          <p>Together, those shifts led to the result we least expected.</p>

          <H2>The honest null</H2>
          <p>
            The biggest surprise came at the end of the Sprint. At the final check-in, more than one
            team put up a slide with an empty Hair on Fire row: an honest null. And they were happy
            about it.
          </p>
          <p>
            That surprised us, because the usual pattern is the opposite. Most founders cling to
            their idea, build every story around why it will win, and want to go straight to
            building and selling. This time most teams left knowing where they stood and what they
            needed to find next. They had a roadmap, and they knew what a real Hair on Fire
            interview would look like when they got one.
          </p>
          <p>
            One founder ended the Sprint without a single Hair on Fire interview and rated the
            program 10 out of 10.
          </p>
          <p>
            A program that produces honest nulls is doing its job. Most teams in any cohort don’t
            have a validated problem after two weeks. What matters is whether they leave knowing
            that, and knowing why.
          </p>

          <H2>Rebuilding every program around it</H2>
          <p>
            After that Sprint we decided to redesign all of our programs around this approach. That
            runs from{" "}
            <A href="https://entrepreneur.nyu.edu/resource/bootcamps/">Startup Bootcamp</A>, where
            600 to 800 teams will take part, to{" "}
            <A href="https://entrepreneur.nyu.edu/resource/summer-launchpad/">Summer Launchpad</A>,
            our most selective accelerator, to the{" "}
            <A href="https://entrepreneur.nyu.edu/resource/tech-venture-program/">
              Tech Venture Program
            </A>{" "}
            for faculty and researchers. Every one of them gets evidence teams can check, a slide
            they build themselves, and a neutral reader of every interview. The larger framework
            behind it is called the Discovery Ladder, and it gets its own post.
          </p>
          <p>
            When we put the Problem Discovery Dashboard up during a talk at GCEC (Global Consortium
            of Entrepreneurship Centers), phones went up across the room to photograph it. We think
            those educators saw what we saw in May: the whole state of a team’s discovery on one
            screen, in a form you can meaningfully engage with.
          </p>
          <p>
            We still can’t sit in on every customer conversation. Now every one of them shows up on
            the slide.
          </p>
        </div>
      </article>

      <footer className="border-t" style={{ borderColor: "var(--rule)" }}>
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} New York University. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <span className="hidden sm:block h-4 w-px" style={{ background: "var(--rule)" }} />
            <SocialLinks />
          </div>
        </div>
      </footer>
    </div>
  );
}
