'use client';

import { useState } from 'react';
import {
  BookOpen,
  Headphones,
  Smartphone,
  Users,
  ShoppingCart,
  Handshake,
  BarChart3,
  MessageCircle,
  Lightbulb,
  Sparkles,
  type LucideIcon
} from 'lucide-react';

// Icon components for each habit
const HabitIcon = ({ type, className }: { type: string; className: string }) => {
  const icons: Record<string, LucideIcon> = {
    book: BookOpen,
    headphones: Headphones,
    app: Smartphone,
    people: Users,
    cart: ShoppingCart,
    handshake: Handshake,
    chart: BarChart3,
    chat: MessageCircle,
  };

  const Icon = icons[type] || BookOpen;
  return <Icon className={className} />;
};

const pillarsData = [
  {
    id: 1,
    title: "Pillar 1: Personal Growth & Mindset",
    subtitle: "Develops leadership qualities and mental fortitude required for long-term success.",
    color: "blue",
    habits: [
      {
        id: 1,
        title: "Read Daily (15–30 Minutes)",
        icon: "book",
        description: "Consistently reading books on leadership, communication, and mindset helps you stay positive and equips you with the skills to lead a team.",
        frequency: "Daily"
      },
      {
        id: 2,
        title: "Listen to Podcasts Daily",
        icon: "headphones",
        description: "Provides \"mental nutrition\" and practical strategies from successful leaders that you can apply to your business immediately.",
        frequency: "Daily"
      },
      {
        id: 3,
        title: "Podcast App Subscription",
        icon: "app",
        description: "Ensures you have streamlined, consistent access to the latest training and motivational content shared within your organization.",
        frequency: "Monthly"
      },
      {
        id: 4,
        title: "Attend All Associations",
        icon: "people",
        description: "Whether weekly meetings or major conventions, these events build belief, provide training, and keep you connected to the community.",
        frequency: "Weekly"
      }
    ]
  },
  {
    id: 2,
    title: "Pillar 2: Product Integrity",
    subtitle: "Building a foundation of authenticity by becoming a direct advocate for the brand.",
    color: "green",
    habits: [
      {
        id: 5,
        title: "Redirect Shopping",
        icon: "cart",
        description: "Use the products yourself to build firsthand understanding and \"store loyalty,\" making your recommendations authentic and credible. In other words, Be a Product of the Product.",
        frequency: "Ongoing"
      },
      {
        id: 6,
        title: "Develop a Retail Base",
        icon: "people",
        description: "Building a small, loyal group of customers ensures your business has consistent volume and proves market demand for your offerings.",
        frequency: "Weekly"
      }
    ]
  },
  {
    id: 3,
    title: "Pillar 3: Business Activity & Strategy",
    subtitle: "Mechanical habits that drive growth and ensure you are duplicating a proven system.",
    color: "purple",
    habits: [
      {
        id: 7,
        title: "Make Introductions",
        icon: "handshake",
        description: "Actively add new people to your pipeline and master the art of introducing them to your coach. Focus on connecting your contacts to your experienced upline (coach), who will present the business plan on your behalf while you learn the process. Observe how your coach follows up professionally to move prospects toward a decision.",
        frequency: "Weekly"
      },
      {
        id: 8,
        title: "Staying Accountable",
        icon: "chart",
        description: "Share daily takeaways from your learning, connect with your coach regularly, and manage your time and budget with discipline. Most importantly, be honest about your progress and feelings so you can be supported effectively.",
        frequency: "Daily"
      },
      {
        id: 9,
        title: "Counseling",
        icon: "chat",
        description: "Regularly review your numbers, map, and progress with your active upline. This strategic \"check-up\" ensures your activity aligns with your goals while maintaining a humble, coachable attitude.",
        frequency: "Monthly"
      }
    ]
  }
];

export default function Habits() {
  const [expandedHabit, setExpandedHabit] = useState<number | null>(null);

  const toggleHabit = (habitNumber: number) => {
    setExpandedHabit(expandedHabit === habitNumber ? null : habitNumber);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hoverBg: string; pillarBg: string }> = {
      blue: {
        bg: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
        border: "border-blue-200 dark:border-blue-700/50",
        text: "text-blue-600 dark:text-blue-400",
        hoverBg: "hover:bg-blue-100/50 dark:hover:bg-blue-800/30",
        pillarBg: "bg-gradient-to-b from-blue-600 to-blue-400"
      },
      green: {
        bg: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20",
        border: "border-green-200 dark:border-green-700/50",
        text: "text-green-600 dark:text-green-400",
        hoverBg: "hover:bg-green-100/50 dark:hover:bg-green-800/30",
        pillarBg: "bg-gradient-to-b from-green-600 to-green-400"
      },
      purple: {
        bg: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20",
        border: "border-purple-200 dark:border-purple-700/50",
        text: "text-purple-600 dark:text-purple-400",
        hoverBg: "hover:bg-purple-100/50 dark:hover:bg-purple-800/30",
        pillarBg: "bg-gradient-to-b from-purple-600 to-purple-400"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
          9 Core Habits
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          Build success through consistent daily practices organized into three essential pillars
        </p>
      </div>

      {/* All 9 Habits - 3 Columns Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pillarsData.map((pillar) => {
          const colors = getColorClasses(pillar.color);
          return (
            <section key={pillar.id} className="space-y-3">
              {/* Pillar Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-8 ${colors.pillarBg} rounded-full`}></div>
                  <h2 className={`text-3xl font-bold ${colors.text}`}>
                    Pillar {pillar.id}
                  </h2>
                </div>
                <p className={`text-base ${colors.text} font-semibold pl-3`}>
                  {pillar.title.replace(/^Pillar \d+: /, '')}
                </p>
              </div>

              {/* Habits in this Pillar */}
              <div className="space-y-2">
                {pillar.habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`bg-gradient-to-br ${colors.bg} rounded-lg border ${colors.border} overflow-hidden transition-all duration-300`}
                  >
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-full flex items-start gap-3 p-4 ${colors.hoverBg} transition-colors`}
                    >
                      <div className={`flex-shrink-0`}>
                        <HabitIcon type={habit.icon} className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h3 className={`font-bold text-2xl ${colors.text} flex-1 text-left leading-tight`}>
                        {habit.id}. {habit.title}
                      </h3>
                      <svg
                        className={`w-5 h-5 ${colors.text} transition-transform duration-300 flex-shrink-0 ${
                          expandedHabit === habit.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedHabit === habit.id && (
                      <div className={`px-4 pb-4 pt-2 border-t ${colors.border}`}>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                          {habit.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Habit Frequency Guide */}
      <section className="mb-8 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Habit Frequency Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
              <h3 className="font-semibold text-2xl text-blue-700 dark:text-blue-400">Daily</h3>
            </div>
            <ul className="space-y-3">
              {["Read daily (15–30 minutes)", "Listen to podcasts daily", "Staying accountable"].map((item) => (
                <li key={item} className="flex items-start gap-2 font-semibold text-lg text-gray-700 dark:text-gray-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-5 border border-green-200 dark:border-green-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></div>
              <h3 className="font-semibold text-2xl text-green-700 dark:text-green-400">Weekly</h3>
            </div>
            <ul className="space-y-3">
              {["Attend all associations", "Make Introductions", "Develop a retail base", "Staying accountable"].map((item) => (
                <li key={item} className="flex items-start gap-2 font-semibold text-lg text-gray-700 dark:text-gray-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Monthly */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full"></div>
              <h3 className="font-semibold text-2xl text-purple-700 dark:text-purple-400">Monthly</h3>
            </div>
            <ul className="space-y-3">
              {["Podcast App Subscription", "Redirect shopping", "Counseling", "Staying accountable"].map((item) => (
                <li key={item} className="flex items-start gap-2 font-semibold text-lg text-gray-700 dark:text-gray-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

  {/* Note & Pro Tip */ }
  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 border-l-4 border-amber-500 p-4 rounded-r-xl hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-3 mb-2">
          <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="font-bold text-lg text-amber-900 dark:text-amber-100">Note</p>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          These nine habits create a balanced approach, ensuring that as your business grows (Pillar 3), your personal capacity (Pillar 1) and belief in the brand (Pillar 2) grow along with it and vice versa.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-l-4 border-blue-500 p-4 rounded-r-xl hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="font-bold text-lg text-blue-900 dark:text-blue-100">Pro Tip</p>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
          Mastery doesn&apos;t happen overnight. Most successful builders suggest picking one or two habits to master each month until the full routine becomes second nature.
        </p>
      </div>
    </div>
  </div>
    </div >
  );
}
