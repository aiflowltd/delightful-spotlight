// The full text of Darren's essay, mirrored from Substack so it can be read on-site.
// Source: https://darrenyee.substack.com/p/the-discovery-ladder
// Text is kept as published; only Substack chrome (subscribe prompts, comments) is dropped.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "levels"; items: { label: string; text: string }[] }
  | { type: "dialogue"; lines: { speaker: string; text: string }[] }
  | { type: "tiers"; items: { name: string; text: string }[] };

export const discoveryLadderArticle = {
  slug: "the-discovery-ladder",
  title: "The Discovery Ladder",
  subtitle: "How to talk to customers in the age of AI",
  excerpt:
    "Building used to be the hard part. It isn't anymore. The expensive mistake has moved: it is no longer writing the wrong code, it is spending a year building something nobody wants because you heard what you wanted to hear.",
  substackUrl: "https://darrenyee.substack.com/p/the-discovery-ladder",
  author: "Darren Yee",
  date: "June 15, 2026",
  isoDate: "2026-06-15",
  readingTime: "20 min read",
  levels: ["Problem Discovery", "Jobs Discovery", "Value Discovery", "GTM Discovery"],
  body: [
    {
      "type": "p",
      "text": "Building used to be the hard part. It isn’t anymore. You can stand up a working product in a weekend now, which means the expensive mistake has moved. It is no longer writing the wrong code. It is spending a year building something nobody wants because you heard what you wanted to hear."
    },
    {
      "type": "p",
      "text": "I have watched founders do this for years. Any given year, I can name a handful of startups who are current in this trap. They talk to customers, tell them about the idea, show the product, the customers are polite, and a year later they are surprised that no one will pay. A saying formed in the back of my head:"
    },
    {
      "type": "pullquote",
      "text": "Happy ears waste years"
    },
    {
      "type": "p",
      "text": "Its a little corny, but compared to the risk of wasting actual years of effort, I’m hoping it will pay off in memorability what it lacks in poetic quality."
    },
    {
      "type": "p",
      "text": "The Discovery Ladder is the structure I use to keep that from happening. It is a sequence for customer discovery built for the moment we are actually in, where the constraint is not how fast you can build but whether you should build the thing at all. This article outlines the early framing. There is a lot left to develop and I will flag where as I go, but the spine is ready, and the early tests we are doing with startups are showing astounding results."
    },
    {
      "type": "h2",
      "text": "If you can build anything, what is worth building"
    },
    {
      "type": "p",
      "text": "For a decade, the binding constraint on a startup was execution. You had an idea, and the slow, expensive part was turning it into a product. That has flipped. The slow, expensive part is now judgment: figuring out what is real, what people will actually do, and what is worth your time. When anyone can build anything, the only scarce skill left is knowing what to build."
    },
    {
      "type": "p",
      "text": "AI does not solve this for you. It accelerates whatever direction you point it. Feed it your hopes and it will build your hopes faster. Garbage in, garbage out. The version of this I see most often is what I call an open loop. You have an idea, you ask a model to spec it, you build it, you ship it, and you wait for the market to tell you whether you were right. That feels like the fastest route to market. It is actually the slowest, because the part in the middle takes months, and during those months you live in a fantasy about how customers will respond."
    },
    {
      "type": "p",
      "text": "The alternative is a closed loop. Everything you put into the build has already touched reality. Before you write the spec, you have evidence. Before you commit to a feature, you can point to a customer who behaved in a way that justifies it. That is what I mean by evidence-based entrepreneurship, and it is the whole game now that building is cheap."
    },
    {
      "type": "p",
      "text": "It helps to be precise about what AI is and is not for here. It is very good at holding context, synthesizing raw notes, drafting first passes, generating hypotheses to test, and stress-testing your own thinking when you ask it to argue against you. It is not good at making the judgment call. It cannot make a business decision for you, and it cannot have the conversation for you. You can ask it what you talked about. You decide what it means."
    },
    {
      "type": "h2",
      "text": "Why a ladder"
    },
    {
      "type": "p",
      "text": "Most discovery advice comes off as a pile of tactics with no sequence. Ask open-ended questions. Don’t lead the witness. Talk to a lot of people. All true, and almost useless on their own, because they don’t tell a founder where they are or what to do next. The discovery books do lay out a sequence, but we arent in a world where founders start with original texts. Mentors and advisors, meaning well, do their best to summarize."
    },
    {
      "type": "p",
      "text": "Teams, meaning well, take the advice and talk to customers. But quickly they get stuck. They keep revalidating the safe, comfortable parts of their business model and never test the part that would actually kill them. I call this the Discovery Death Loop. It feels like progress because you are busy and you are talking to customers, but you are not learning anything that changes your decisions."
    },
    {
      "type": "p",
      "text": "The Discovery Ladder fixes this by giving discovery a structure, and provides scaffolding around what learning looks like and what the path to progress is. There are four levels, each one testing a higher-fidelity assumption, each one shipping a named artifact:"
    },
    {
      "type": "levels",
      "items": [
        {
          "label": "Level 1, Problem Discovery",
          "text": "Is there a painful problem, and who has it?"
        },
        {
          "label": "Level 2, Jobs Discovery",
          "text": "Of all the things they struggle with, which specific job is worth building for?"
        },
        {
          "label": "Level 3, Value Discovery",
          "text": "Does your thing actually deliver value, and will they fire their old way to get it?"
        },
        {
          "label": "Level 4, GTM Discovery",
          "text": "Can you reach these customers, and can you reach them at scale?"
        }
      ]
    },
    {
      "type": "p",
      "text": "The most important thing to understand about the ladder is that it is additive, not just vertical. You do not graduate off a level and leave it behind. You carry it. A Level 2 conversation opens by reconfirming Level 1. A Level 3 conversation opens by reconfirming Levels 1 and 2. The world changes underneath you, and the customer you validated in March may not be the customer in June. Earlier levels are the substrate of every conversation that comes after, not steps you clear and forget."
    },
    {
      "type": "p",
      "text": "One more thing about how to use it. The ladder is not a set of gates where a coach stamps you “ready.” It is a set of signals. Each level tells you what success looks like and what the evidence should sound like, and you diagnose yourself. If the signals aren’t there, you are not done, and no amount of moving on will fix that."
    },
    {
      "type": "h2",
      "text": "Level 1: Problem Discovery"
    },
    {
      "type": "p",
      "text": "The first level is about one question: is there a problem painful enough to build a company on, and who actually has it?"
    },
    {
      "type": "p",
      "text": "Startups are built on hair-on-fire problems, not nice-to-haves. The reason is that pain is the best evidence you have, and it is a leading indicator of the two things you care about most: whether someone will change their behavior, and whether they will pay. Willingness to pay is a lagging indicator. Stop trying to validate it directly this early. If the pain is real, the behavior and the money follow. If it isn’t, no clever pricing question saves you."
    },
    {
      "type": "p",
      "text": "Pain has a precondition that founders skip constantly: the person has to recognize the problem as a problem. I can talk for an hour about why I don’t get enough sleep, and how it affects my whole day. Then you ask what I did last week to sleep earlier, and the answer is nothing. I will keep scrolling until 3am and I have no intention of stopping. That is not a problem for me. I am not looking to solve it, and if you charged me twenty-five dollars to call me every night at ten to put my phone away, I would say no. “They have the problem, they just don’t know it yet” is one of the most expensive sentences in startups. It is a founder red flag, not a customer signal. You cannot convince someone they have a problem they do not feel, and you will spend years and a lot of money trying."
    },
    {
      "type": "p",
      "text": "So how do you actually find pain? You ask about past behavior, not future hypotheticals. Verifiable past behavior. Here is the conversation almost every founder has, and it teaches them nothing:"
    },
    {
      "type": "dialogue",
      "lines": [
        {
          "speaker": "Founder",
          "text": "We’re building a tool that automates your email campaigns. Would you use something like that?"
        },
        {
          "speaker": "Prospect",
          "text": "Yeah, totally, email is such a pain."
        },
        {
          "speaker": "Founder",
          "text": "Would you pay fifty bucks a month for it?"
        },
        {
          "speaker": "Prospect",
          "text": "Sure, if it works well."
        },
        {
          "speaker": "Founder",
          "text": "Great, thanks for your time."
        }
      ]
    },
    {
      "type": "p",
      "text": "Everyone walks away feeling good, and nothing was learned. “Would you” is a future-oriented hypothetical, and people say yes to those to be nice. Worse, the founder led with the solution, so the prospect is now reacting to a product instead of telling you the truth about their life. What you want instead is to ask them to walk you through the last time they did the thing, and then listen for evidence of pain: time spent, money spent, trying alternatives, building a workaround, making it a priority. If they haven’t done any of that, it isn’t painful, no matter how much they complain."
    },
    {
      "type": "p",
      "text": "To make this consistent, we score every customer-problem pair on a five-tier Pain Scale. It is a classification you apply to one customer’s relationship to one specific problem, read from their behavior:"
    },
    {
      "type": "tiers",
      "items": [
        {
          "name": "Hair on Fire",
          "text": "They have invested real, irreversible resources, built something, paid for something, hired someone, and they are still living with the problem. Investment without resolution. This is who you build for first."
        },
        {
          "name": "Incremental Improvement",
          "text": "Aware and actively doing something about it, researching, trialing tools, asking peers, but the investment is still reversible. When the free trial ends, they walk away."
        },
        {
          "name": "Nice to Have",
          "text": "They recognize the problem when you raise it and can describe it well, but there is no behavior behind the words. This is the happy-ears tier, the one that fools you."
        },
        {
          "name": "Latent",
          "text": "They have the problem by any outside measure but do not recognize it as one. A coaching flag for you, not a buying signal from them."
        },
        {
          "name": "Not a Problem",
          "text": "They don’t have it, or they have it and don’t care. A disqualification, useful mainly for sharpening who your customer actually is."
        }
      ]
    },
    {
      "type": "p",
      "text": "Your target zone is the top two tiers. Two rules keep founders honest here. When you are unsure, score lower, because founders systematically overrate pain and overrating propagates into bad build decisions. And when language and behavior disagree, classify by behavior. “This is killing me” with nothing behind it is performance."
    },
    {
      "type": "p",
      "text": "One pattern worth naming because it traps people in enterprise and bureaucratic settings: organizations don’t buy things, people do. You can find a massive, expensive, company-wide problem that everybody complains about and nobody owns. That is a systematic problem, and you cannot sell to it directly. Your job is to find the single human inside it who has agency over a slice of the workflow and a hair-on-fire relationship to their slice. The org might have the problem, but if the person in front of you doesn’t own it, it doesn’t matter. Frank is closer to your customer than the org chart is."
    },
    {
      "type": "p",
      "text": "You know you are doing Level 1 well when you can ask an open-ended question and predict roughly how this kind of person will answer, when you can disqualify someone who is outside your customer profile within a minute or two, and when people lean in and start doing what I call pain-point therapy because you clearly understand their world. I will be honest about the timeline: it took me about 250 interviews before I could do this in three minutes, and my first hundred interviews in construction were just mapping out who does what, who hires whom, and who actually feels which pain. You will get there faster than I did, because AI can hold your context straight in a way I never had. It still will not do the interviews for you."
    },
    {
      "type": "p",
      "text": "If you want one thing to try in your next interview, use this at the end: “Is there anything I should have asked you but didn’t?” People are often circling something they wish you would ask, and that question gives them permission to hand it to you."
    },
    {
      "type": "p",
      "text": "The artifact you ship at Level 1 is an evidence-backed Customer Persona. Not a guess about who the customer is, but a description grounded in quotes and behaviors from real conversations."
    },
    {
      "type": "h2",
      "text": "Level 2: Jobs Discovery"
    },
    {
      "type": "p",
      "text": "After enough Level 1 conversations, you end up with a long laundry list of everything people dislike about how they work today. This is good. You are uncovering the territory. The mistake, and founders make it constantly, is to take that whole list, turn each complaint into a feature, and build all of it. That is how you get a bloated first product that nobody can react to, because when you show someone twenty features you have no idea which one they care about."
    },
    {
      "type": "p",
      "text": "Level 2 is the work of getting specific. Instead of complaints and feature requests, you look at the world through jobs to be done. A job is the progress a customer is trying to make in a specific moment. Not a feature they wish they had, not a vague aspiration, but the actual thing a real person is trying to accomplish when they sit down at their desk."
    },
    {
      "type": "p",
      "text": "The difference matters, so here is the contrast. “I want to be more organized” is a wish, vague and future-oriented. “I want a dashboard that shows my invoices” is a feature request, still future-oriented and still not telling you what they are trying to do. A job sounds like this: “When split payments arrive Saturday morning, I need to match each deposit to the right invoice so I can close the books on time without staying up Sunday night.” Now I know exactly what they are trying to accomplish, I know the moment it happens, and I know why it matters. That job could be solved ten different ways, but I understand the progress they are after, which is what lets me design something instead of guessing."
    },
    {
      "type": "p",
      "text": "Jobs come in three buckets, not three layers: functional, emotional, and social. Most jobs surface as functional, because functional is what people say out loud. The real driver is often emotional or social, and that is usually the thing to build for. A clinician will tell you charting takes too many clicks, which sounds like a functional job about speed. Dig in and the real job is: “When I close the chart, I want to be sure I didn’t miss something that comes back to bite me clinically or in front of my peers.” That is emotional and social. If you build for the clicks, you give them faster charting and they still feel uncertain, so they don’t adopt."
    },
    {
      "type": "p",
      "text": "Not every job that comes up is real, so you qualify them. A job earns its place when there is behavior behind it, a named workaround, when the frequency is specific rather than “often,” when there is a real cost in time or money or social standing, when it lives at a specific moment you could point to in the workflow, and when the language is the customer’s, not yours. Then you rank what is left by frequency against consequence. High-frequency, high-consequence jobs are wedge gold."
    },
    {
      "type": "p",
      "text": "That word, wedge, is the point of the level. The wedge is the single job with the most evidence behind it, the one that justifies committing. You do not pick it because you like it. You pick it because the evidence forces it. And the other half of the deliverable is just as important: an explicit “say no” list of the jobs you are choosing not to solve, each with a customer-grounded reason. Cutting is progress here, not adding. The say-no list is your protection against the bloat you will be tempted toward later, when a customer offers you money to build something off-wedge."
    },
    {
      "type": "p",
      "text": "What you ship at Level 2 is an MVP Scope. Not a build, a single page: your top few ranked jobs with their evidence, the one job your first product will solve, and the jobs you are explicitly declining. Jobs Discovery earns the right to ship that scope. The next level starts when the wedge is real."
    },
    {
      "type": "h2",
      "text": "Level 3: Value Discovery"
    },
    {
      "type": "p",
      "text": "Now the question changes. Levels 1 and 2 asked whether the problem and the job are real. Level 3 asks whether your thing actually delivers the value, and whether someone will fire their old way of doing it for your new way, even once."
    },
    {
      "type": "p",
      "text": "The most important move at this level is to retire the word MVP. Ten years of misuse have hollowed it out, and founders hear “the first version of my product” no matter how many times you correct them. So we use MVE instead, a minimum viable experiment, a term I am borrowing from Frank and Giff Constable’s Testing with Humans. An MVE is a test, not a product. It has one hypothesis, a customer in front of it, and a kill criterion you write down before you build anything. An experiment without a written kill criterion is a product in disguise, because without it you will find a way to call any result a success."
    },
    {
      "type": "p",
      "text": "The prototype you build is a prop, not a product. You show it, and then you shut up. This is still a discovery call. The point of the artifact is to provoke better customer behavior than an empty whiteboard would, not to dazzle anyone. I have a rule I call the Delete Test for keeping this honest: if your prototype takes more than a few hours, you have probably overdone it, and if it takes more than two days, you are building a product. Stop and show what you have. Volume and variation beat one perfect run."
    },
    {
      "type": "p",
      "text": "One counterintuitive signal of health at this level: killed experiments are good. A team that has killed nothing is either not pushing hard enough or too attached to its idea. The whole point is to find out you were wrong while it is still cheap to be wrong."
    },
    {
      "type": "p",
      "text": "I will be straight that this is the level still most in development, and I will publish the full structure separately. In its complete form it is a ladder of its own, running from “does the framing even land” through to “will they trade something real and irreversible for it.” What I will commit to here is the spine: experiments, not products; a written kill criterion before you build; the discovery conversation as the medium; and a deliberate choice of vocabulary, because the outputs of this level should travel to the mentors, advisors, and investors who have never heard of the Discovery Ladder. Hypothesis, signal, kill criterion, decision. That language is universal on purpose."
    },
    {
      "type": "h2",
      "text": "Level 4: GTM Discovery"
    },
    {
      "type": "p",
      "text": "The last level is go-to-market, and the one-line version is that GTM is just advanced discovery. It is the same muscle you built at Level 1, pointed at a higher-stakes set of assumptions: can you reach these customers, and can you reach them repeatably and affordably enough to scale?"
    },
    {
      "type": "p",
      "text": "This is the level that behaves least like the others. It branches hard by industry, and it often runs in parallel with Level 3 rather than after it. An enterprise team is identifying its economic buyer while it is still testing value. A consumer team is treating acquisition channels as experiments alongside the product. A healthcare team started its regulatory path before it ran a single interview. This is also where the ladder deliberately hands you off to industry-specific expertise, because the discipline carries forward but the content becomes domain-specific. The architecture of this level is the most open part of the framework, and I am developing it in the open along with everything else."
    },
    {
      "type": "h2",
      "text": "The DRM: where the evidence lives"
    },
    {
      "type": "p",
      "text": "A framework like this only works if there is somewhere the evidence actually lives, and that place is the DRM."
    },
    {
      "type": "p",
      "text": "CRM is a category everyone knows: software for tracking customer relationships. A DRM, a Discovery Records Manager, is the same idea pointed at discovery. It is the canonical ledger of everything you have learned, and it follows two rules: quotes, not summaries, and behavior, not interpretation. You capture what the customer actually said and what they actually did, not your read on it. We build ours in Notion, and it gets introduced at Level 1, because without it every claim about what level you are on is just founder narration."
    },
    {
      "type": "p",
      "text": "The reason the DRM matters more than it looks is that it forces a clean separation between evidence and judgment, and that separation is the heart of doing this well with AI. The DRM holds the evidence. You make the call. AI sits in between, helping you read transcripts, organize what you find, and surface candidate problems and jobs and signals for you to confirm or reject. It does not get to decide what is true. This is also where garbage-in-garbage-out bites hardest. An AI-generated summary that paraphrases a conversation is not evidence, it is a paraphrase, and if you treat it as ground truth you will build on a distortion. When it matters, go back to the transcript and read what the person actually said."
    },
    {
      "type": "h2",
      "text": "Rubrics and skills"
    },
    {
      "type": "p",
      "text": "Another powerful way that we use AI is to apply very rigorous rubrics and to create skills that apply those rubrics to the founder’s work. As we develop the framework for the discovery ladder, the founders don’t actually have to understand it all to get the proper outcomes. We explain the inputs and the behaviors that they exhibit in interviews, what’s happening, and what success looks like, but largely we leave the interpretation and the actual grading to rubrics that we run through an LLM, in this case Claude. If our rubrics are rigorous enough and follow the framework, the founders don’t have to think as much to understand how the rubrics are applied to their interviews and instead just contend with the output."
    },
    {
      "type": "p",
      "text": "For example, the pain scale is a very long context document that we upload into the team’s repos. When we have them run it before they talk to coaches, it spits out for them again exactly how many interviews are at the hair-on-fire stage of pain and how many are at the lower levels. This measure helps start a very candid conversation with the coaches right off the bat and also forces the founders to contend with: “Is the pain that I thought was there actually there?”"
    },
    {
      "type": "p",
      "text": "Another example of an application of this is interview hygiene. At the early levels of discovery, there’s a lot of do’s and don’ts, and it’s really hard to remember them all. In the DRM, not only do we tell them immediately about how their interview went if they cross some lines (for example, we tell them not to sell or do demos on the first call), but it can spit out for coaches, based on all the interviews that they did, where they were generally following the guidelines or were they falling into selling every time? In which case they’re probably not learning much."
    },
    {
      "type": "p",
      "text": "Much of this framework is going to live in the rubrics and skills that we end up developing and testing, but this goes in line with the proper use of AI, not to replace the founders’ judgment but to synthesize and apply a rigorous framework. Founders are still allowed to disagree with it and often do, but just having the guideline is worth the application and saves coaches a conversation that can be had with Claude"
    },
    {
      "type": "h2",
      "text": "The principles underneath"
    },
    {
      "type": "p",
      "text": "If you strip the levels away, a handful of operating principles run through all of it. Happy ears waste years. Past actions, not future hypotheticals. Pain is leading, willingness to pay is lagging. Organizations don’t buy things, people do. With experiments, disposable code and durable learning."
    },
    {
      "type": "p",
      "text": "And one that ties the whole ladder together: treat the descent as the win. Because the levels are additive, later evidence will sometimes contradict an earlier-level assumption. You will be at Level 3 and discover the job you committed to is not the one that matters, or that the pain you scored as hair-on-fire was overstated. The instinct is to treat that as a setback. It is the opposite. Going back down a level because the evidence sent you there has just saved you a quarter of building the wrong thing. The whole framework is designed to surface that move early and make it feel like progress, because it is."
    },
    {
      "type": "h2",
      "text": "Theoretical foundations and lineage"
    },
    {
      "type": "p",
      "text": "The Discovery Ladder does not reinvent the core tenets of evidence-based entrepreneurship; rather, it synthesizes a lineage of validated, high-trust methodologies into a progressive framework. The foundational Problem Level owes its DNA directly to the customer development tradition established by Steve Blank (The Four Steps to the Epiphany) and codified for tactical execution by Giff Constable in Talking to Humans, alongside the conversational mechanics of Rob Fitzpatrick’s The Mom Test. To define the deep psychological and contextual drivers at this stage, the framework integrates Clayton Christensen’s Jobs-to-be-Done (JTBD) theory, mapping the specific functional, emotional, and social \"jobs\" customers are struggling to resolve."
    },
    {
      "type": "p",
      "text": "As the framework ascends to the Value Level, the focus shifts from qualitative problem validation to structural hypothesis testing, drawing heavily from the experimental design principles outlined by Giff Constable and Frank Rimalovski in Testing with Humans, as well as Eric Ries’s The Lean Startup loops. This transition is structurally organized using Alexander Osterwalder’s Value Proposition Canvas, ensuring that the discovered customer pains, gains, and jobs directly anchor the architecture of the solution before moving toward quantitative product-market fit."
    },
    {
      "type": "h2",
      "text": "Why I’m putting this out now"
    },
    {
      "type": "p",
      "text": "This framework can go a lot of places, and most of them are not built yet. In the weeks and months to come I will be posting case studies, additional explainers, and generally fleshing out the edges of this framework as it gets sharper. In fact I may entirely reconstruct the scaffolding if I find parts don’t work in practice. The core around Level 1, the levels, and the DRM + grading rubrics seem to work nicely. But there is a lot in connecting the dots forward. Ultimately, I’d like to build a complete guide that can get founders from idea, to knowing exactly when they have enough evidence to start prototyping and building. And along the way, help them capture an invaluable treasure trove of primary data from their customers, that will help them in the next phases of their journey."
    },
    {
      "type": "p",
      "text": "Ultimately, I hope the experience of climbing the ladder helps founders develop an innate sense of signal and more empathy for their customers. Entrepreneurship is and always has been human at the core. Solving problems is the most important part of starting a company, and while technology certainly helps, its humans who ultimately determine value. In the world of AI, I am hopeful we don’t lose sight of why its important to talk to humans, and maintain a focus of solving problems."
    }
  ] as ArticleBlock[],
};
