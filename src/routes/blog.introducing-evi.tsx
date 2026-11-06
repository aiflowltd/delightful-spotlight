import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SocialLinks } from "@/components/SocialLinks";
import { introducingEviArticle as article } from "@/content/introducing-evi-article";

const IMG = "/blog/introducing-evi";

export const Route = createFileRoute("/blog/introducing-evi")({
  head: () => ({
    meta: [
      { title: `${article.title}: ${article.subtitle}` },
      { name: "description", content: article.excerpt },
      { name: "author", content: article.author },
      { property: "og:title", content: `${article.title}: ${article.subtitle}` },
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
      className="font-display text-[1.75rem] sm:text-3xl leading-tight tracking-tight text-foreground !mt-14"
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
  width,
  height,
  narrow,
  wide,
  borderless,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  narrow?: boolean;
  wide?: boolean;
  borderless?: boolean;
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
        className={`w-full h-auto rounded-sm ${borderless ? "" : "border"} ${narrow ? "max-w-[39rem] mx-auto" : ""}`}
        style={{ borderColor: "var(--rule)" }}
      />
    </figure>
  );
}

function Bullets({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-3 marker:text-[var(--violet)]">{children}</ul>;
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
          <h1 className="font-display text-[2.6rem] sm:text-6xl leading-[1.03] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">{article.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">
              {article.author}, {article.affiliation}
            </span>
            <time dateTime={article.isoDate}>{article.date}</time>
            <span>{article.readingTime}</span>
          </div>
        </header>

        <div className="mt-10 space-y-6 text-[1.08rem] leading-[1.75] text-ink">
          <p
            className="italic rounded-sm p-6 text-[1rem]"
            style={{ background: "var(--violet-tint)" }}
          >
            This is a summary of a recent talk I gave at the 2026 Global Consortium of
            Entrepreneurial Centers (GCEC) conference in Tallahassee. The session kicked off with a
            lively discussion about what AI is doing to entrepreneurial classrooms and accelerator
            programs. Just about every instructor in the room resonated with the same problem: the
            growing difficulty of sorting through the noise in the age of AI. Teams building
            products instead of doing discovery, inflated claims of validation, hundreds of polished
            applications that all look the same; everyone agreed it was getting harder to tell who
            actually did the work. The highlight of the talk was the customer discovery interview
            grader we developed at NYU to solve that problem for our accelerator programs. To our
            surprise, it received a strong reaction from our colleagues, and several schools have
            since reached out about bringing it into their own programs.
          </p>

          <H2>The problem: feeding founders vegetables</H2>
          <p>
            AI made building cheap. That makes customer discovery more important than ever, and
            harder than ever to get first-time founders to actually do.
          </p>
          <p>
            Entrepreneurship classes and accelerator programs ask teams to do customer discovery
            before they’ve felt the payoff, so many treat it as homework instead of honest
            investigation. When the deliverable is a number, the number gets inflated. Even teams
            that commit to doing customer discovery often misread what they hear (what we call
            “happy ears”), so a coach or instructor has to dig into every conversation before
            trusting the conclusion every experiment rests on.
          </p>
          <p>
            Talking to humans is still the foundational activity every startup leader recommends.
            So instructors have little choice but to keep assigning interviews and keep doing the
            slow work of verifying them.
          </p>
          <p>
            In accelerators, that’s a triage problem. Hundreds of teams report big numbers,
            unverified problems, and polished stories, and it takes hours of staff time to find the
            ones actually doing the work, learning and solving real customer problems.
          </p>
          <p>
            Classrooms have the same problem at a smaller scale: surface-level homework,
            misreported, with AI filling in the gaps. That shaky evidence becomes the foundation for
            the rest of the semester.
          </p>
          <p>Three questions on every instructor’s mind:</p>
          <Bullets>
            <li>Did discovery happen?</li>
            <li>Was it done well?</li>
            <li>Did the team take away the right learning?</li>
          </Bullets>
          <p>
            If there were evidence that could reliably answer these questions with minimal human
            effort, accelerators and classrooms alike would produce better learning outcomes and
            better founders.
          </p>

          <H2>The insight: the quote is the evidence</H2>
          <p>
            Insights earned from customer discovery are still the foundational evidence, but with AI
            we can change what is counted as the record of it. An interview count is a claim. A
            summary is the founder’s interpretation.
          </p>
          <p
            className="font-display text-2xl sm:text-[1.7rem] leading-snug tracking-tight !my-10 pl-5 border-l-4"
            style={{ borderColor: "var(--violet)", color: "var(--violet)" }}
          >
            A verbatim customer line, tied to the transcript it came from, is something a coach or
            instructor can actually inspect.
          </p>
          <p>
            So we built a Discovery Records Manager (DRM): a CRM for discovery data, holding every
            interview transcript and how it scored. At NYU, we’re calling ours Evi, but eventually{" "}
            <em>we envision every startup’s AI stack will have a DRM.</em>
          </p>

          <H2>How Evi works</H2>
          <Figure
            src={`${IMG}/evi-pipeline.png`}
            alt="Every conversation becomes scored evidence: Interview (recorded) → Transcript (logged verbatim) → Scored (interview + pain) → Feedback (same day, with lines) → Dashboard (team and coaches). Evi scores and verifies. It writes nothing for the team."
            width={1344}
            height={331}
          />
          <p>
            Teams upload interview transcripts (not summaries!). Evi scores each one against two
            rubrics: how well the interview was run (can we trust this data?) and how strong the
            customer’s pain is, from “Not a Problem” up to “Hair on Fire” (is this worth building
            on?). Our rubrics hold years of coaching judgment in detailed criteria, and the model
            applies that judgment consistently to every transcript.
          </p>
          <p>
            For years we’ve told students to{" "}
            <strong className="text-foreground">
              find a Hair on Fire problem. We finally wrote down exactly what that means, in
              measurable detail.
            </strong>
          </p>
          <p>
            We teach the principles behind the rubrics in workshops, but the real learning happens
            when founders upload an interview and see those principles applied to their own
            transcript, verbatim. The feedback is private and line by line, without the pressure of
            presenting in front of a room.
          </p>
          <p>
            Coaches and instructors get clarity: a dashboard across every team, with verified
            interviews, specific guidance for improving technique, and cited evidence for each
            team’s claims about their customer (examples of both views below).
          </p>
          <p>
            Read together, the interview score and the pain score sort every interview into one of
            four places: build on it, coach the technique, find a bigger problem, or move on.
          </p>
          <Figure
            src={`${IMG}/evidence-quadrant.png`}
            alt="Measured quality of evidence: Interview Score (can you trust the data?) against Pain Score (what does it say?). High pain, poor interview: Selling, not listening — discard and re-interview. High pain, clean interview: Build from this — keep gathering. Low pain, poor interview: Stop — fix the interview first. Low pain, clean interview: Pivot — honest null."
            width={899}
            height={671}
            borderless
          />
          <p>
            The AI’s role is narrow. It doesn’t make decisions for the team, and the evidence is
            always a real customer’s words. It reads, scores, and verifies (something LLMs are very
            good at).
          </p>
          <Figure
            src={`${IMG}/founder-view.webp`}
            alt="Founder’s view in Evi: a sample scored interview with line-by-line feedback."
            caption="Founder’s View: Sample Scored Interview"
            width={1672}
            height={941}
            wide
          />
          <p>
            For founders, it’s a fast track to mastering customer discovery and gaining insight into
            their customers. Founders get precise, meaningful feedback from interview one, a bank of
            real customer evidence to build on, and a shared record their teammates and coaches can
            read instead of a secondhand summary.
          </p>

          <H2>Enhancing existing curricula and accelerators</H2>
          <p>
            Evi plugs into any class or accelerator that already assigns customer discovery
            interviews. We saw this firsthand when an NYU Stern professor used it to grade her
            students’ interviews. She found it raised accountability, cut down her investigative
            work, and improved what the student teams learned.
          </p>
          <p>
            Best of all, it doesn’t require reworking your curriculum. Most of the interaction
            happens outside the classroom, and the results reinforce what you’re already teaching,
            whether that’s Lean LaunchPad, I-Corps, or design thinking.
          </p>
          <p>By adding Evi, any program can benefit from:</p>
          <Bullets>
            <li>
              <strong className="text-foreground">Verified interviews.</strong> Know whether a team
              did the work at all. A transcript exists or it doesn’t.
            </li>
            <li>
              <strong className="text-foreground">Quality of discovery.</strong> See who is running
              the right process. Coaches and instructors know whose findings to trust, and founders
              see in their own words when they are selling or leading. Teams that are struggling can
              get coaching aimed at the specific discovery behaviors holding them back.
            </li>
            <li>
              <strong className="text-foreground">Evidence gating.</strong> Select on scored
              evidence instead of reported counts. Teams using Evi in our{" "}
              <A href="https://entrepreneur.nyu.edu/resource/bootcamps/">Startup Bootcamp</A> (600
              to 800 teams a year) can now help us assess their interview volume and quality when
              they apply to our{" "}
              <A href="https://entrepreneur.nyu.edu/resource/startup-sprint-student/">
                Startup Sprint
              </A>
              .
            </li>
            <li>
              <strong className="text-foreground">Smarter coaching.</strong> Spend scarce hours
              where they’ll move something, and run workshops that draw from each team’s logged
              evidence.
            </li>
            <li>
              <strong className="text-foreground">Metrics that motivate.</strong> Unlock resources
              at milestones, reward top performers, and make discovery social and celebrated.
            </li>
          </Bullets>
          <Figure
            src={`${IMG}/cohort-view.webp`}
            alt="Cohort view in Evi for instructors and accelerator managers: a dashboard across every team."
            caption="Cohort View for Instructors and Accelerator Managers"
            width={1672}
            height={941}
            wide
          />

          <H2>Early results</H2>
          <p>
            We first piloted Evi and the Discovery Ladder at NYU with student startup teams in our
            two-week Startup Sprint and nine-week{" "}
            <A href="https://entrepreneur.nyu.edu/resource/summer-launchpad/">Summer Launchpad</A>{" "}
            accelerator programs this past summer.
          </p>
          <Bullets>
            <li>
              In both programs, teams that were new to Evi rethought their problem statements and
              core assumptions after just 5 interviews.
            </li>
            <li>
              Several teams finished the Sprint or Summer Launchpad with zero Hair on Fire customers
              and still rated the programs 10 of 10. They learned the business wasn’t there and
              counted that as the win. We did too!
            </li>
            <li>
              About a third of teams that were not selected to participate in our Summer Launchpad
              kept using the tool afterward, unprompted.
            </li>
            <li>
              In an early validation check, Evi picked the same top two Summer Launchpad applicants
              we did after reading every application and interviewing every team.
            </li>
          </Bullets>
          <blockquote
            className="!my-10 pl-6 border-l-4 italic"
            style={{ borderColor: "var(--teal)" }}
          >
            <p className="font-display text-xl sm:text-2xl leading-snug text-foreground">
              “It’s a no BS way for me to ground myself in reality, because I know that my biases
              will always make me overestimate how much pain each person had.”
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              Yannick Bierens, Founder &amp; CEO of Binder, Summer Launchpad 2026
            </footer>
          </blockquote>

          <H2>What’s next</H2>
          <p>
            At the NYU Leslie Entrepreneurial Institute we are rolling Evi out across all of our
            accelerator programs, for both students and faculty/researchers. In the Spring we’ll be
            using it to triage 200+ startup applications to select for our flagship accelerator
            programs. We are also making it available to all entrepreneurial classes across multiple
            NYU schools and colleges.
          </p>
          <p>
            Evi is the first implementation of the Discovery Ladder, a new framework built on the
            customer development canon: an evidence-gated customer discovery methodology that uses
            AI to reinforce best practices. We are redesigning our accelerator curricula to follow
            the Discovery Ladder and are hard at work on the third iteration as of this writing. For
            an overview you can read this early explainer on{" "}
            <Link
              to="/blog/the-discovery-ladder"
              className="underline underline-offset-4 decoration-1 hover:text-[var(--violet)]"
              style={{ textDecorationColor: "var(--violet)" }}
            >
              The Discovery Ladder framework
            </Link>
            .
          </p>
          <p>
            Development continues on the framework, the program curricula, and the software behind
            the tool. Be sure to check back regularly for updates on{" "}
            <A href="https://entrepreneur.nyu.edu/blog/">our blog</A> in the coming weeks and
            months, or sign up for our{" "}
            <A href="https://entrepreneur.nyu.edu/newsletter/">Entrepreneurship @ NYU newsletter</A>{" "}
            to stay informed as we roll out new features and resources.
          </p>
          <p className="italic">
            Ever since GCEC, there has been growing interest in the framework and the tool from
            other universities and colleges for both their accelerators and classes. If you would
            like to join our efforts, please drop me an email at{" "}
            <A href="mailto:darren.yee@nyu.edu">darren.yee@nyu.edu</A> with details on your course
            or accelerator program.
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
