// Icon components for each habit
const HabitIcon = ({ type, color }: { type: string; color: string }) => {
  const iconClasses = `w-8 h-8 ${color}`;

  const icons = {
    book: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        <path d="M3 4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4z" fillOpacity="0.3" />
      </svg>
    ),
    headphones: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1C6.48 1 2 5.48 2 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8c0-4.41 3.59-8 8-8s8 3.59 8 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8c0-5.52-4.48-10-10-10zm-4 12c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v-8h-2zm8 0h-2v8h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
    app: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
    people: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.64 2.23 1.72 2.73 3.05H23v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    checkmark: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    ),
    store: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 6h-2c0-2.21-1.79-4-4-4s-4 1.79-4 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm5 16H6V8h12v12zm-5-10c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
      </svg>
    ),
    megaphone: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
    chart: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
    chat: (
      <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </svg>
    ),
  };

  return icons[type as keyof typeof icons] || null;
};

export default function Habits() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
          9 Core Habits
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Build success through consistent daily practices organized into three essential pillars
        </p>
      </div>

      {/* Pillar 1 */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
            Pillar 1: Personal Growth &amp; Mindset
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic ml-4 text-sm">
          Develops leadership qualities and mental fortitude required for long-term success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                <HabitIcon type="book" color="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-blue-900 dark:text-blue-100 mb-1">1. Read Daily (15–30 Minutes)</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Consistently reading books on leadership, communication, and mindset helps you stay positive and equips you with the skills to lead a team.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                <HabitIcon type="headphones" color="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-blue-900 dark:text-blue-100 mb-1">2. Listen to Podcasts Daily</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Provides &ldquo;mental nutrition&rdquo; and practical strategies from successful leaders that you can apply to your business immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                <HabitIcon type="app" color="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-blue-900 dark:text-blue-100 mb-1">3. Podcasting App Subscription</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Ensures you have streamlined, consistent access to the latest training and motivational content shared within your organization.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                <HabitIcon type="people" color="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-blue-900 dark:text-blue-100 mb-1">4. Attend All Associations</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Whether weekly meetings or major conventions, these events build belief, provide training, and keep you connected to the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2 */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></div>
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
            Pillar 2: Product Integrity
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic ml-4 text-sm">
          Building a foundation of authenticity by becoming a direct advocate for the brand.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-green-600 dark:text-green-400">
                <HabitIcon type="store" color="text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-green-900 dark:text-green-100 mb-1">5. Be a Product of the Product</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Use the products yourself to build firsthand understanding and &ldquo;store loyalty,&rdquo; making your recommendations authentic and credible.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-green-600 dark:text-green-400">
                <HabitIcon type="people" color="text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-green-900 dark:text-green-100 mb-1">6. Develop a Retail Base</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Building a small, loyal group of customers ensures your business has consistent volume and proves market demand for your offerings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3 */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full"></div>
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            Pillar 3: Business Activity &amp; Strategy
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic ml-4 text-sm">
          Mechanical habits that drive growth and ensure you are duplicating a proven system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-purple-600 dark:text-purple-400">
                <HabitIcon type="megaphone" color="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-purple-900 dark:text-purple-100 mb-1">
                  7. Showing The Plan
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Actively add new people to your pipeline and master the art of introducing them to your coach. Focus on connecting your contacts to your experienced upline (coach), who will present the business plan on your behalf while you learn the process. Observe how your coach follows up professionally to move prospects toward a decision.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-purple-600 dark:text-purple-400">
                <HabitIcon type="chart" color="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-purple-900 dark:text-purple-100 mb-1">8. Staying Accountable</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Share daily takeaways from your learning, connect with your coach regularly, and manage your time and budget with discipline. Most importantly, be honest about your progress and feelings so you can be supported effectively.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-purple-600 dark:text-purple-400">
                <HabitIcon type="chat" color="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-purple-900 dark:text-purple-100 mb-1">9. Counseling</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-tight text-sm">
                  Regularly review your numbers, map, and progress with your active upline. This strategic &ldquo;check-up&rdquo; ensures your activity aligns with your goals while maintaining a humble, coachable attitude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Habit Frequency Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Habit Frequency Guide
        </h2>
        
        {/* Mobile Layout - Stacked */}
        <div className="block md:hidden space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-3">Daily</h3>
            <ul className="list-disc list-inside space-y-1 text-lg text-gray-600 dark:text-gray-400">
              <li>Reading (15–30 Minutes)</li>
              <li>Listening to Podcasts</li>
              <li>Staying Accountable</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-3">Weekly</h3>
            <ul className="list-disc list-inside space-y-1 text-lg text-gray-600 dark:text-gray-400">
              <li>Attend All Associations</li>
              <li>Showing The Plan</li>
              <li>Develop Customers</li>
              <li>Staying Accountable</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-3">Monthly</h3>
            <ul className="list-disc list-inside space-y-1 text-lg text-gray-600 dark:text-gray-400">
              <li>Podcasting App Subscription</li>
              <li>Redirect Shopping</li>
              <li>Counseling</li>
              <li>Staying Accountable</li>
            </ul>
          </div>
        </div>
        
        {/* Desktop Layout - Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-xl text-gray-700 dark:text-gray-300">Daily</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-xl text-gray-700 dark:text-gray-300">Weekly</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-xl text-gray-700 dark:text-gray-300">Monthly</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <ul className="list-disc list-inside space-y-1 text-lg">
                    <li>Read Daily (15–30 Minutes)</li>
                    <li>Listen to Audios/Podcasts Daily</li>
                    <li>Staying Accountable</li>
                  </ul>
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <ul className="list-disc list-inside space-y-1 text-lg">
                    <li>Attend All Associations</li>
                    <li>Showing The Plan</li>
                    <li>Develop a Retail Base</li>
                    <li>Staying Accountable</li>
                  </ul>
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <ul className="list-disc list-inside space-y-1 text-lg">
                    <li>Podcasting App Subscription</li>
                    <li>Redirect Shopping</li>
                    <li>Counseling</li>
                    <li>Staying Accountable</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Note & Pro Tip */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 border-l-4 border-amber-500 p-4 rounded-r-xl hover:shadow-lg transition-all duration-300">
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="font-bold text-lg text-amber-900 dark:text-amber-100 mb-2">Note</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  These nine habits create a balanced approach, ensuring that as your business grows (Pillar 3), your personal capacity (Pillar 1) and belief in the brand (Pillar 2) grow along with it.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-l-4 border-blue-500 p-4 rounded-r-xl hover:shadow-lg transition-all duration-300">
            <div className="flex gap-3">
              <div className="text-2xl">⭐</div>
              <div>
                <p className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">Pro Tip</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Mastery doesn&apos;t happen overnight. Most successful builders suggest picking one or two habits to master each month until the full routine becomes second nature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
