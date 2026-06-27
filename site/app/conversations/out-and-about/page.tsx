"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp, MapPin, Lightbulb } from "lucide-react";

const phases = [
  {
    number: 1,
    title: "Form a Casual Connection",
    color: "amber",
    lines: [
      { speaker: "IBO", text: "Hey, I love that jacket, where did you get it? OR Hey, quick question — do you know if there's a good coffee shop around here?" },
      { speaker: "Them", text: "(Responds naturally)" },
      { speaker: "IBO", text: "Awesome, thanks! By the way, I'm [Your Name], what's your name?" },
      { speaker: "Them", text: "I'm [Prospect Name]." },
      { speaker: "IBO", text: "Nice to meet you! Do you live or work right around this area?" },
    ],
    note: "Simply be a friendly human and find common ground. Do not rush into business.",
  },
  {
    number: 2,
    title: "Uncover the Need — The Occupation Pivot",
    color: "orange",
    lines: [
      { speaker: "IBO", text: "So, what keeps you busy during the week? What do you do for work?" },
      { speaker: "Them", text: "Oh, I work in [Industry / Job, e.g., retail, accounting, hospitality]." },
      { speaker: "IBO", text: "Oh, nice! How do you like that?" },
      { speaker: "Them", text: "(Most people give a mixed answer: \"It pays the bills,\" \"It's busy,\" or \"It's okay.\")" },
      { speaker: "IBO", text: "I totally get that. Is that what you want to do long-term, or do you have other projects or goals you're looking to pursue outside of that?" },
    ],
    note: "Transition into finding out what the prospect does and — more importantly — how they feel about it.",
  },
  {
    number: 3,
    title: "Plant the Seed & Edify the Mentor",
    color: "rose",
    lines: [
      { speaker: "Them", text: "Yeah, I'd love to do something else eventually, but I don't know what yet." },
      {
        speaker: "IBO",
        text: "That makes complete sense. I actually felt a similar way. Outside of my day-to-day, I've been collaborating with a senior business leader / entrepreneur who has an incredible professional background in (mention their industry) [accounting, technology, etc.].",
      },
      {
        speaker: "IBO",
        text: "Through some common connections, I was fortunate enough to get under their mentorship. Right now, I'm learning how they leverage digital commerce to build automated, secondary revenue streams in their free time. It's been an amazing learning experience for me.",
      },
      { speaker: "Them", text: "Oh wow. What exactly is it?" },
    ],
    note: "Once the prospect indicates they are open to more, or aren't completely satisfied with their current job, drop the message.",
  },
  {
    number: 4,
    title: "Setting the Boundary & The Posture Takeaway",
    color: "fuchsia",
    lines: [
      {
        speaker: "IBO",
        text: "You know, I'm still in the early stages of learning the systems myself, so I don't want to confuse you or give you the wrong impression. But at a high level, it's about shifting consumer habits into asset-building skills.",
      },
      {
        speaker: "IBO",
        text: "My mentor is incredibly busy, but I know they are currently looking to coach and expand their team with just one or two sharp, ambitious people this quarter. I can't promise anything at all because their vetting process is very thorough, but you seem like a sharp person.",
      },
      {
        speaker: "IBO",
        text: "If you're genuinely open-minded to looking at something outside of your normal routine, I could see if they'd be open to a quick 10-minute introduction call down the road. Would you be open to that?",
      },
      { speaker: "Them", text: "Yeah, sure, I'd be open to checking it out." },
    ],
    note: "Do NOT try to explain the business here. Protect the information and position the mentor's time as valuable.",
  },
  {
    number: 5,
    title: "Book the Follow-Up & Exit",
    color: "emerald",
    lines: [
      { speaker: "IBO", text: "Great. Let's exchange numbers so I can keep you posted. What's the best cell for you?" },
      { speaker: "Them", text: "(Shares number)" },
      {
        speaker: "IBO",
        text: "Perfect, got it. I'll shoot you a text so you have my contact info. I actually have to run to an appointment right now, but I'll reach out in a couple of days once I check my mentor's schedule. Great meeting you, [Prospect Name]!",
      },
    ],
    note: "Get the contact info and leave immediately. Never linger and chat about the business after getting the number.",
  },
];

const tips = [
  {
    title: "The 80/20 Rule",
    body: "Listen 80% of the time, talk 20% of the time. The more the prospect talks about their own life, the more they will trust you.",
  },
  {
    title: "Don't Fictionalize the Mentor",
    body: "If the mentor's actual background is in financial services, manufacturing, or healthcare, use that specific industry when you say \"background in [Industry].\" It maintains absolute integrity.",
  },
  {
    title: "The Urgent Exit",
    body: "As soon as you get the phone number, you must leave. Staying to chat invites the prospect to ask 20 more questions, which leads to over-explaining.",
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string; dot: string; speakerIBO: string }> = {
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    dot: "bg-amber-500",
    speakerIBO: "text-amber-700 dark:text-amber-400",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    dot: "bg-orange-500",
    speakerIBO: "text-orange-700 dark:text-orange-400",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
    dot: "bg-rose-500",
    speakerIBO: "text-rose-700 dark:text-rose-400",
  },
  fuchsia: {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    border: "border-fuchsia-200 dark:border-fuchsia-800",
    badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300",
    dot: "bg-fuchsia-500",
    speakerIBO: "text-fuchsia-700 dark:text-fuchsia-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    dot: "bg-emerald-500",
    speakerIBO: "text-emerald-700 dark:text-emerald-400",
  },
};

export default function OutAndAboutPage() {
  const [expanded, setExpanded] = useState<number[]>([1]);

  function toggle(n: number) {
    setExpanded((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900 dark:ring-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <ChevronLeft className="h-4 w-4" /> Conversations
        </Link>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900">
          <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
              Out & About
            </h2>
            <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white">
              C List
            </span>
          </div>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Complete strangers — build rapid connection, uncover a need, use a professional takeaway.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => {
          const c = colorMap[phase.color];
          const isOpen = expanded.includes(phase.number);
          return (
            <div key={phase.number} className={`rounded-2xl border ${c.bg} ${c.border} overflow-hidden shadow-sm`}>
              <button
                type="button"
                onClick={() => toggle(phase.number)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${c.dot}`}>
                    {phase.number}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{phase.title}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="space-y-4 px-5 pb-5">
                  {phase.note && (
                    <p className={`rounded-xl px-4 py-2.5 text-base font-medium ${c.badge}`}>
                      {phase.note}
                    </p>
                  )}
                  <div className="space-y-3">
                    {phase.lines.map((line, i) => (
                      <div key={i} className="flex gap-3">
                        <span className={`shrink-0 text-xs font-bold uppercase tracking-wide pt-0.5 w-10 ${line.speaker === "IBO" ? c.speakerIBO : "text-slate-400"}`}>
                          {line.speaker}
                        </span>
                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/40">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-bold text-amber-900 dark:text-amber-200">Key Tips</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tips.map((tip, i) => (
            <div key={i} className="rounded-xl bg-white/70 p-4 dark:bg-slate-800/50">
              <p className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">{tip.title}</p>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{tip.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
