import Link from "next/link";
import { Users, MapPin, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/conversations/warm-market",
    icon: Users,
    label: "A/B List",
    title: "Warm Market",
    subtitle: "People you already know",
    description:
      "Friends, family, coworkers, and community members. The approach honors the existing relationship while being completely transparent about your new venture.",
    gradient: "from-sky-500 to-indigo-500",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-sky-200 dark:border-sky-800",
    iconBg: "bg-sky-100 dark:bg-sky-900",
    iconColor: "text-sky-600 dark:text-sky-400",
    buttonColor: "from-sky-500 to-indigo-500",
  },
  {
    href: "/conversations/out-and-about",
    icon: MapPin,
    label: "C List",
    title: "Out & About",
    subtitle: "Complete strangers you meet",
    description:
      "People you encounter in daily life — at a coffee shop, gym, or anywhere you happen to be. Build rapid connection, uncover a need, and use a professional takeaway posture.",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-600 dark:text-amber-400",
    buttonColor: "from-amber-500 to-orange-500",
  },
];

export default function ConversationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="bg-gradient-to-r from-sky-600 via-fuchsia-500 to-amber-500 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
          Conversations
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Scripts for dropping the message — choose your scenario.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {cards.map(({ href, icon: Icon, label, title, subtitle, description, gradient, bg, border, iconBg, iconColor, buttonColor }) => (
          <Link
            key={href}
            href={href}
            className={`group flex flex-col gap-5 rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${bg} ${border}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${gradient}`}>
                {label}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
              <p className="text-base font-medium text-slate-500 dark:text-slate-400">{subtitle}</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
            </div>

            <div className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-base font-bold text-white shadow-sm transition group-hover:shadow-md group-hover:brightness-105 ${buttonColor}`}>
              View Script
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
