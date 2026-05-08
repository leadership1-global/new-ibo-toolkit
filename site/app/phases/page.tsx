export default function Phases() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">Business Phases</h1>
        <p className="text-xl md:text-3xl font-semibold text-gray-400 mt-1">A–B–C–D</p>
      </div>

      {/* Phase cards - horizontal flow on large screens, vertical stack on small */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {/* Phase A */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-xl font-bold">Phase A</h2>
            <p className="text-sm italic text-blue-100">Newly Launched In Business</p>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <p className="font-semibold text-green-700 dark:text-green-400">Congrats!</p>
            <p>Stay <strong>H.A.S.H</strong></p>
            <p className="text-gray-600 dark:text-gray-400 text-xs ml-2">
              Hungry, Appreciative, Smart, Humble
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mx-4" />
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              30-Day Core Run
            </p>
            <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-3">
              Create Successful Habits
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Read
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Listen
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Send Accountability Messages
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Use Products
              </li>
            </ul>
          </div>
        </div>

        {/* Phase B */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-xl font-bold">Phase B</h2>
            <p className="text-sm italic text-blue-100">Honoring The Partnership</p>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <p>Daily, Weekly, Monthly, Yearly Habits</p>
            <p>Zero-Based Budget</p>
            <p>Volume Standards</p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mx-4" />
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              90-Day Core Run
            </p>
            <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-3">
              Gain confidence through developing consistent work-ethic
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Phase-B Habits
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Share your story with at least 1 person/day
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />Communicate with your coach 2/3 times/week
              </li>
            </ul>
          </div>
        </div>

        {/* Phase C */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-xl font-bold">Phase C</h2>
            <p className="text-sm italic text-blue-100">Consistent Results</p>
          </div>
          <div className="p-4 space-y-2 text-sm">
            <p>Solid Phase-B</p>
            <p>2/3 MGs/week</p>
            <p>Launch 1–2 Partners/Month</p>
          </div>
        </div>

        {/* Phase D */}
        <div className="border-2 border-blue-600 rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h2 className="text-xl font-bold">Phase D</h2>
            <p className="text-sm italic text-blue-100">Financial Independence</p>
          </div>
          <div className="p-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 whitespace-nowrap w-20">1–2 Years</span>
                <span className="flex-1 border-t border-dashed border-gray-300" />
                <span className="font-semibold text-right">Q12 Platinum<br /><span className="text-xs font-normal text-gray-500">60k/year</span></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 whitespace-nowrap w-20">2–3 Years</span>
                <span className="flex-1 border-t border-dashed border-gray-300" />
                <span className="font-semibold text-right">Q12 Ruby<br /><span className="text-xs font-normal text-gray-500">80k–100k/year</span></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 whitespace-nowrap w-20">3–4 Years</span>
                <span className="flex-1 border-t border-dashed border-gray-300" />
                <span className="font-semibold text-right">Founders Emerald<br /><span className="text-xs font-normal text-gray-500">160k–200k/year</span></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 whitespace-nowrap w-20">5–7 Years</span>
                <span className="flex-1 border-t border-dashed border-gray-300" />
                <span className="font-semibold text-right">Founders Diamond</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow arrows / timeline */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-center">Progression Timeline</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg text-center text-sm font-medium">
            Phase A
          </div>
          <div className="hidden sm:flex items-center">
            <div className="w-12 h-0.5 bg-blue-400" />
            <span className="text-xs text-gray-500 -mt-5 block text-center w-12">30 DCR</span>
            <svg className="w-3 h-3 text-blue-400 -ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l8 6-8 6V4z" />
            </svg>
          </div>
          <div className="sm:hidden text-blue-400 text-lg">↓ <span className="text-xs text-gray-500">30 DCR</span></div>

          <div className="bg-blue-200 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg text-center text-sm font-medium">
            Phase B
          </div>
          <div className="hidden sm:flex items-center">
            <div className="w-12 h-0.5 bg-blue-400" />
            <span className="text-xs text-gray-500 -mt-5 block text-center w-12">90 DCR</span>
            <svg className="w-3 h-3 text-blue-400 -ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l8 6-8 6V4z" />
            </svg>
          </div>
          <div className="sm:hidden text-blue-400 text-lg">↓ <span className="text-xs text-gray-500">90 DCR</span></div>

          <div className="bg-blue-300 dark:bg-blue-800/60 text-blue-900 dark:text-blue-200 px-4 py-2 rounded-lg text-center text-sm font-medium">
            Phase C
          </div>
          <div className="hidden sm:flex items-center">
            <div className="w-16 h-0.5 bg-blue-400" />
            <span className="text-xs text-gray-500 -mt-5 block text-center w-16 leading-tight">2–5 Yrs</span>
            <svg className="w-3 h-3 text-blue-400 -ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l8 6-8 6V4z" />
            </svg>
          </div>
          <div className="sm:hidden text-blue-400 text-lg">↓ <span className="text-xs text-gray-500">2–5 Yrs Consistency</span></div>

          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium">
            Phase D
          </div>
        </div>
      </div>
    </div>
  );
}
