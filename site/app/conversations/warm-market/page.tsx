"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp, Users, Lightbulb } from "lucide-react";

const phases = [
  {
    number: 1,
    title: "Catch Up & Reconnect Naturally",
    color: "sky",
    lines: [
      { speaker: "You", text: "Hey [Name], how's everything going? How have you been?" },
      { speaker: "Them", text: "(Standard catch-up about family, work, or what you usually talk about.)" },
      {
        speaker: "You",
        text: "That's awesome. I actually wanted to reach out to you because I've been going through a pretty exciting transition outside of my normal routine, and I really value your perspective / wanted to let you know what I've been up to.",
      },
    ],
    note: "Do not jump straight into business. Re-establish the normal relationship dynamic first.",
  },
  {
    number: 2,
    title: "The Direct & Honest Pivot",
    color: "indigo",
    lines: [
      {
        speaker: "You",
        text: "As you know, I'm always looking for ways to grow professionally. Recently, I partnered with a very successful entrepreneur and business strategist who has an incredible background in [Mentor's Industry, e.g., Accounting / Technology etc.].",
      },
      {
        speaker: "You",
        text: "I've actually been learning about some ways of creating leverage in the digital and social commerce space under their direct mentorship. It's focused on leveraging e-commerce and changing online consumer habits into asset-building skills. I'm learning a ton about leadership and business ownership.",
      },
    ],
    note: "Be direct about what you are doing. Don't hide it, but keep it high-level.",
  },
  {
    number: 3,
    title: "The Low-Pressure Ask",
    color: "fuchsia",
    options: [
      {
        label: "Option A — Referral Angle",
        subtitle: "Best for acquaintances, former coworkers, temple/volunteer peers",
        lines: [
          {
            speaker: "You",
            text: "My mentor's organization is looking to expand right now, and they are selectively looking for one or two sharp, ambitious people who might be looking to build a secondary revenue stream in their free time. Because you are someone who is [insert genuine compliment: e.g., so connected in the community / always so organized / very sharp], I wanted to ask: Do you know anyone — or yourself — who might be open-minded to looking at a professional, systems-driven business project outside of their day job?",
          },
        ],
      },
      {
        label: "Option B — Practice / Opinion Angle",
        subtitle: "Best for close friends, roommates, family",
        lines: [
          {
            speaker: "You",
            text: "Because I'm in the early stages of learning their project, I'm not necessarily looking for you to do this with me, but I would love to get your eyes on what I'm doing. My mentor's organization is looking to expand right now, and they are selectively looking for one or two sharp, ambitious people who might be looking to build a secondary revenue stream in their free time. Would you be open to sitting down for 15 minutes, or jumping on a quick call with my mentor, just so you can see what I'm building? Your feedback would mean a lot to me.",
          },
        ],
      },
    ],
    note: "Depending on how close you are to the person, select the angle that feels most comfortable.",
  },
  {
    number: 4,
    title: 'Handling the "What is it exactly?" Question',
    color: "purple",
    lines: [
      { speaker: "Them", text: "Well, I might know someone, or I might be interested myself... but what exactly do you guys do?" },
      {
        speaker: "You",
        text: "I love the curiosity! Because I am under direct mentorship, everything we do follows a very structured, multi-stage evaluation process to see if there's a mutual fit. I'd hate to give you a watered-down explanation over a casual text/chat and create any confusion. However, at a high-level, their focus is on converting user's online habits and shopping trends into a side-income opportunity for the same user.",
      },
      {
        speaker: "You",
        text: "The best way to see it is to actually speak with the person coaching me. If you're genuinely curious — either for yourself or to see who you could refer to me — I can see if they have 10 minutes for a quick introduction call. Would you be open to that?",
      },
    ],
    note: "Even with friends, do not explain the entire plan. Keep the posture professional.",
  },
  {
    number: 5,
    title: "Lock in the Step",
    color: "emerald",
    lines: [
      { speaker: "Them", text: "Yeah, I can do a quick call." },
      {
        speaker: "You",
        text: "Awesome. My mentor's schedule is usually packed, but I'm meeting with them later this week to sync up. Let's look at [Day] or [Day]. What time usually works best for you, mornings or evenings? I'll check their calendar and let you know what aligns.",
      },
    ],
    note: "If they agree, move immediately to scheduling.",
  },
];

const tips = [
  {
    title: "The Power of the Compliment",
    body: "In Phase 3 (Option A), ensure you use a real compliment. If it's someone from a place of volunteering, the compliment could be, \"Because you're someone who clearly cares about helping people and has a great work ethic...\" It makes the approach feel deeply personal, not robotic.",
  },
  {
    title: "Remove the Agenda",
    body: 'Detach yourself from the outcome. If a family member or friend says, "No thanks, not interested," the response should be completely casual: "No worries at all! Just wanted to share what I\'m up to. How\'s [Topic you discussed earlier] going?" Preserving the relationship is always priority number one.',
  },
  {
    title: "Don't Apologize",
    body: 'IBOs shouldn\'t say, "Sorry to bother you with business, but..." They are offering a connection to a high-level mentor and a legitimate professional opportunity. Speak with pride and enthusiasm about the new path.',
  },
  {
    title: "Don't Thank Them",
    body: "They should be thankful to you that you are connecting them with someone who's successful.",
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string; dot: string; speakerYou: string }> = {
  sky: {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-sky-200 dark:border-sky-800",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
    dot: "bg-sky-500",
    speakerYou: "text-sky-700 dark:text-sky-400",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    border: "border-indigo-200 dark:border-indigo-800",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    dot: "bg-indigo-500",
    speakerYou: "text-indigo-700 dark:text-indigo-400",
  },
  fuchsia: {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    border: "border-fuchsia-200 dark:border-fuchsia-800",
    badge: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300",
    dot: "bg-fuchsia-500",
    speakerYou: "text-fuchsia-700 dark:text-fuchsia-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    dot: "bg-purple-500",
    speakerYou: "text-purple-700 dark:text-purple-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    dot: "bg-emerald-500",
    speakerYou: "text-emerald-700 dark:text-emerald-400",
  },
};

export default function WarmMarketPage() {
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [selectedOption, setSelectedOption] = useState<Record<number, number>>({ 3: 0 });

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
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900">
          <Users className="h-6 w-6 text-sky-600 dark:text-sky-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="bg-gradient-to-r from-sky-600 to-indigo-500 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
              Warm Market
            </h2>
            <span className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1 text-xs font-semibold text-white">
              A/B List
            </span>
          </div>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            People you already know — honor the relationship, ask for feedback or referrals.
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

                  {phase.options ? (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {phase.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedOption((prev) => ({ ...prev, [phase.number]: i }))}
                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                              (selectedOption[phase.number] ?? 0) === i
                                ? `text-white ${c.dot}`
                                : "bg-white/70 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700"
                            }`}
                          >
                            {opt.label.split(" — ")[0]}
                          </button>
                        ))}
                      </div>
                      {(() => {
                        const opt = phase.options[selectedOption[phase.number] ?? 0];
                        return (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{opt.subtitle}</p>
                            {opt.lines.map((line, i) => (
                              <div key={i} className="flex gap-3">
                                <span className={`shrink-0 text-xs font-bold uppercase tracking-wide pt-0.5 w-10 ${line.speaker === "You" ? c.speakerYou : "text-slate-400"}`}>
                                  {line.speaker}
                                </span>
                                <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">{line.text}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {phase.lines?.map((line, i) => (
                        <div key={i} className="flex gap-3">
                          <span className={`shrink-0 text-xs font-bold uppercase tracking-wide pt-0.5 w-10 ${line.speaker === "You" ? c.speakerYou : "text-slate-400"}`}>
                            {line.speaker}
                          </span>
                          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">{line.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/40">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-bold text-amber-900 dark:text-amber-200">Tips for Success</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
