export default function Phases() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-1 pb-2">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-bold">Business Phases</h1>
      </div>

      {/* Phase cards - horizontal flow on large screens, vertical stack on small */}
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-4 xl:gap-0 mb-4">
        {/* Phase A */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden w-full xl:flex-1">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-2xl font-bold">Phase A</h2>
            <p className="text-base italic text-blue-100">Newly Launched In Business</p>
          </div>
          <div className="p-4 space-y-2 text-xl">
            <p className="font-semibold text-green-700 dark:text-green-400">Congrats!</p>
            <p>Stay <strong>H.A.S.H</strong></p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Hungry, Appreciative, Smart, Humble
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mx-4" />
          <div className="p-4">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              30-Day Core Run
            </p>
            <p className="text-base italic text-gray-600 dark:text-gray-400 mb-3">
              Create Successful Habits
            </p>
            <ul className="space-y-1 text-xl">
              <li>Read</li>
              <li>Listen</li>
              <li>Send Accountability Messages</li>
              <li>Use Products</li>
            </ul>
          </div>
        </div>

        {/* Arrow A to B */}
        <div className="flex flex-col xl:flex-col justify-center items-center xl:px-3 gap-1">
          <span className="text-sm text-gray-500 whitespace-nowrap hidden xl:block">30 DCR</span>
          <span className="text-sm text-gray-500 whitespace-nowrap xl:hidden">30 DCR</span>
          <svg className="w-8 h-8 text-blue-500 rotate-90 xl:rotate-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Phase B */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden w-full xl:flex-1">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-2xl font-bold">Phase B</h2>
            <p className="text-base italic text-blue-100">Honoring The Partnership</p>
          </div>
          <div className="p-4 space-y-2 text-lg">
            <p>Daily, Weekly, Monthly, Yearly Habits</p>
            <p>Zero-Based Budget</p>
            <p>Volume Standards</p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mx-4" />
          <div className="p-4">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              90-Day Core Run
            </p>
            <p className="text-base italic text-gray-600 dark:text-gray-400 mb-3">
              Gain confidence through developing consistent work-ethic
            </p>
            <ul className="space-y-1 text-lg">
              <li>Phase-B Habits</li>
              <li>Share your story with at least 1 person/day</li>
              <li>Communicate with your coach 2/3 times/week</li>
            </ul>
          </div>
        </div>

        {/* Arrow B to C */}
        <div className="flex flex-col xl:flex-col justify-center items-center xl:px-3 gap-1">
          <span className="text-sm text-gray-500 whitespace-nowrap hidden xl:block">90 DCR</span>
          <span className="text-sm text-gray-500 whitespace-nowrap xl:hidden">90 DCR</span>
          <svg className="w-8 h-8 text-blue-500 rotate-90 xl:rotate-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Phase C */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden w-full xl:flex-1">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-2xl font-bold">Phase C</h2>
            <p className="text-base italic text-blue-100">Consistent Results</p>
          </div>
          <div className="p-4 space-y-2 text-xl">
            <p>Solid Phase-B</p>
            <p>Make 2/3 Intros/week</p>
            <p>Launch 1–2 Partners/Month</p>
          </div>
        </div>

        {/* Arrow C to D */}
        <div className="flex justify-center items-center xl:px-3">
          <svg className="w-8 h-8 text-blue-500 rotate-90 xl:rotate-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Phase D */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden w-full xl:flex-1">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-2xl font-bold">Phase D</h2>
            <p className="text-base italic text-blue-100">Financial Success</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold">Founder's Platinum</p>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">$46,000/year</p>
              <p className="text-sm text-gray-500 italic">Published Average Income</p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="font-semibold text-base mb-2 text-center">
                The Earning Potential<br />& Path Ahead
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 text-left">
                <li>
                  <strong>Uncapped Growth:</strong> This is a baseline, not a ceiling. Higher income brackets are entirely possible, driven directly by your ambition and performance.
                </li>
                <li>
                  <strong>Your Timeline:</strong> Growth and timeframes are completely subject to your personal level of commitment and execution.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
