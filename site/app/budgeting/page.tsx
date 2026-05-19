"use client";

import React, { useMemo, useState } from "react";

type LineItem = {
  id: string;
  label: string;
  amount: number;
};

type Category = {
  title: string;
  description: string;
  items: LineItem[];
  color: string;
};

type BudgetData = {
  personalIncome: Category;
  businessIncome: Category;
  fixedExpenses: Category;
  discretionaryExpenses: Category;
  businessReinvestment: Category;
  businessOperations: Category;
};

function createInitialBudget(): BudgetData {
  return {
    personalIncome: {
      title: "Personal Income",
      description: "Baseline cash flow to fund life and initial business stages",
      color: "emerald",
      items: [
        { id: "pi-1", label: "Primary Job Salary", amount: 0 },
        { id: "pi-2", label: "Spouse Salary", amount: 0 },
        { id: "pi-3", label: "Miscellaneous Income", amount: 0 },
      ],
    },
    businessIncome: {
      title: "Business Income",
      description: "Track the growth of your asset",
      color: "indigo",
      items: [
        { id: "bi-1", label: "Retail Margin", amount: 0 },
        { id: "bi-2", label: "Monthly Bonus Pay", amount: 0 },
        { id: "bi-3", label: "Leadership Incentives", amount: 0 },
      ],
    },
    fixedExpenses: {
      title: "Fixed / Debt Expenses",
      description: "High-priority targets for business income to eventually offset",
      color: "red",
      items: [
        { id: "fe-1", label: "Mortgage / Rent", amount: 0 },
        { id: "fe-2", label: "Car Loans", amount: 0 },
        { id: "fe-3", label: "Student Loans", amount: 0 },
        { id: "fe-4", label: "Utilities & Minimum Bills", amount: 0 },
        { id: "fe-5", label: "Insurance", amount: 0 },
      ],
    },
    discretionaryExpenses: {
      title: "Discretionary Expenses",
      description: "Primary target for tightening to free up business capital",
      color: "amber",
      items: [
        { id: "de-1", label: "Dining Out", amount: 0 },
        { id: "de-2", label: "Entertainment", amount: 0 },
        { id: "de-3", label: "Personal Subscriptions", amount: 0 },
        { id: "de-4", label: "Shopping / Luxury / Non-Business Consumables", amount: 0 },
        { id: "de-5", label: "Other Discretionary", amount: 0 },
      ],
    },
    businessReinvestment: {
      title: "Business Reinvestment",
      description: "Investments in PV / Asset Building",
      color: "violet",
      items: [
        { id: "br-1", label: "Personal Use Products", amount: 0 },
        { id: "br-2", label: "Customer Samples", amount: 0 },
        { id: "br-3", label: "Downline Samples & Incentives", amount: 0 },
      ],
    },
    businessOperations: {
      title: "Business Operations",
      description: "Asset protection and professional education infrastructure",
      color: "sky",
      items: [
        { id: "bo-1", label: "System Subscriptions", amount: 0 },
        { id: "bo-2", label: "Meeting / Function Tickets", amount: 0 },
        { id: "bo-3", label: "Business Travel & Fuel", amount: 0 },
        { id: "bo-4", label: "Lodging", amount: 0 },
      ],
    },
  };
}

function sumCategory(cat: Category): number {
  return cat.items.reduce((s, i) => s + i.amount, 0);
}

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

type CategoryCardProps = {
  category: Category;
  onAmountChange: (itemId: string, value: number) => void;
  highlight?: boolean;
};

function CategoryCard({ category, onAmountChange, highlight }: CategoryCardProps) {
  const total = sumCategory(category);
  const colorMap: Record<string, { border: string; bg: string; badge: string; ring: string }> = {
    emerald: { border: "border-emerald-200 dark:border-emerald-800/60", bg: "bg-emerald-50 dark:bg-emerald-900/20", badge: "bg-emerald-600", ring: "focus:ring-emerald-400" },
    indigo: { border: "border-indigo-200 dark:border-indigo-800/60", bg: "bg-indigo-50 dark:bg-indigo-900/20", badge: "bg-indigo-600", ring: "focus:ring-indigo-400" },
    red: { border: "border-red-200 dark:border-red-800/60", bg: "bg-red-50 dark:bg-red-900/20", badge: "bg-red-600", ring: "focus:ring-red-400" },
    amber: { border: "border-amber-200 dark:border-amber-800/60", bg: "bg-amber-50 dark:bg-amber-900/20", badge: "bg-amber-600", ring: "focus:ring-amber-400" },
    violet: { border: "border-violet-200 dark:border-violet-800/60", bg: "bg-violet-50 dark:bg-violet-900/20", badge: "bg-violet-600", ring: "focus:ring-violet-400" },
    sky: { border: "border-sky-200 dark:border-sky-800/60", bg: "bg-sky-50 dark:bg-sky-900/20", badge: "bg-sky-600", ring: "focus:ring-sky-400" },
  };
  const colors = colorMap[category.color] || colorMap.emerald;

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-5 shadow-sm ${highlight ? "ring-2 ring-indigo-400 shadow-lg" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{category.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{category.description}</p>
        </div>
        <span className={`${colors.badge} text-white text-base font-bold px-3 py-1 rounded-full`}>
          {formatCurrency(total)}
        </span>
      </div>
      <div className="space-y-3">
        {category.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <label className="flex-1 text-base font-medium text-slate-700 dark:text-slate-300">
              {item.label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={item.amount || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    onAmountChange(item.id, val === "" ? 0 : Number(val));
                  }
                }}
                onFocus={(e) => e.target.select()}
                placeholder="0"
                className={`w-32 border border-slate-300 dark:border-slate-600 rounded-xl pl-8 pr-3 py-2 text-base font-semibold bg-white dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 ${colors.ring}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ value, max, label, sublabel }: { value: number; max: number; label: string; sublabel?: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const barColor = pct >= 100 ? "bg-emerald-500" : pct >= 50 ? "bg-indigo-500" : "bg-amber-500";

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-base">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="font-bold text-slate-800 dark:text-slate-200">{pct.toFixed(0)}%</span>
      </div>
      {sublabel && <p className="text-sm text-slate-600 dark:text-slate-400">{sublabel}</p>}
      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function BudgetingPage() {
  const [budget, setBudget] = useState<BudgetData>(createInitialBudget);
  const [discretionaryBudgetTarget, setDiscretionaryBudgetTarget] = useState(0);

  function handleAmountChange(categoryKey: keyof BudgetData, itemId: string, value: number) {
    setBudget((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        items: prev[categoryKey].items.map((item) =>
          item.id === itemId ? { ...item, amount: value } : item
        ),
      },
    }));
  }

  const totals = useMemo(() => {
    const personalIncome = sumCategory(budget.personalIncome);
    const businessIncome = sumCategory(budget.businessIncome);
    const fixedExpenses = sumCategory(budget.fixedExpenses);
    const discretionaryActual = sumCategory(budget.discretionaryExpenses);
    const businessReinvestment = sumCategory(budget.businessReinvestment);
    const businessOperations = sumCategory(budget.businessOperations);
    const totalBusinessExpenses = businessReinvestment + businessOperations;
    const totalExpenses = fixedExpenses + discretionaryActual + totalBusinessExpenses;
    const totalIncome = personalIncome + businessIncome;
    const netCashFlow = totalIncome - totalExpenses;

    const capitalRedirectionRate = discretionaryBudgetTarget > 0
      ? Math.max(discretionaryActual - discretionaryBudgetTarget, 0)
      : 0;

    const selfSufficiency = totalBusinessExpenses > 0
      ? (businessIncome / totalBusinessExpenses) * 100
      : 0;

    return {
      personalIncome,
      businessIncome,
      fixedExpenses,
      discretionaryActual,
      businessReinvestment,
      businessOperations,
      totalBusinessExpenses,
      totalExpenses,
      totalIncome,
      netCashFlow,
      capitalRedirectionRate,
      selfSufficiency,
    };
  }, [budget, discretionaryBudgetTarget]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50 dark:from-slate-950 dark:via-indigo-950 dark:to-emerald-950 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Business Budget
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mt-2 max-w-2xl">
            Optimize cash flow, trim personal waste, and strategically reinvest freed capital into wealth-generating business activities.
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Net Cash Flow", value: formatCurrency(totals.netCashFlow), color: totals.netCashFlow >= 0 ? "text-emerald-600" : "text-red-600" },
            { label: "Capital Freed Up", value: formatCurrency(totals.capitalRedirectionRate), color: "text-indigo-600 dark:text-indigo-400" },
            { label: "Self-Sufficiency", value: `${totals.selfSufficiency.toFixed(0)}%`, color: totals.selfSufficiency >= 100 ? "text-emerald-600" : "text-amber-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 sm:p-5 border border-slate-100 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide">{label}</p>
              <p className={`text-xl sm:text-2xl md:text-3xl font-black mt-2 break-words ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Income Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            category={budget.personalIncome}
            onAmountChange={(id, val) => handleAmountChange("personalIncome", id, val)}
          />
          <CategoryCard
            category={budget.businessIncome}
            onAmountChange={(id, val) => handleAmountChange("businessIncome", id, val)}
            highlight
          />
        </div>

        {/* Expense Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            category={budget.fixedExpenses}
            onAmountChange={(id, val) => handleAmountChange("fixedExpenses", id, val)}
          />
          <CategoryCard
            category={budget.discretionaryExpenses}
            onAmountChange={(id, val) => handleAmountChange("discretionaryExpenses", id, val)}
          />
        </div>

        {/* Business Investment Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            category={budget.businessReinvestment}
            onAmountChange={(id, val) => handleAmountChange("businessReinvestment", id, val)}
          />
          <CategoryCard
            category={budget.businessOperations}
            onAmountChange={(id, val) => handleAmountChange("businessOperations", id, val)}
          />
        </div>

        {/* Tighten the Belt - Capital Redirection */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">Capital Redirection</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mb-4">
            Set your discretionary spending commitment for next month. Compare it to your current typical spending to see how much capital you can free up for business reinvestment.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <label className="text-base font-medium text-slate-700 dark:text-slate-300">
              Next Month&rsquo;s Target
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={discretionaryBudgetTarget || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    setDiscretionaryBudgetTarget(val === "" ? 0 : Number(val));
                  }
                }}
                onFocus={(e) => e.target.select()}
                placeholder="0"
                className="w-40 border border-slate-300 dark:border-slate-600 rounded-xl pl-8 pr-3 py-2 text-base font-semibold bg-white dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="text-base text-slate-700 dark:text-slate-300">
              Current Typical: <span className="font-bold">{formatCurrency(totals.discretionaryActual)}</span>
              {" | "}
              Will Free Up: <span className="font-bold text-emerald-600">{formatCurrency(totals.capitalRedirectionRate)}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            By hitting your target next month, you&rsquo;ll have <span className="font-bold text-emerald-600">{formatCurrency(totals.capitalRedirectionRate)}</span> available for business reinvestment.
          </p>
          <div className="mt-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-2">How this works</p>
            <p className="text-base text-slate-700 dark:text-slate-300">
              Say you currently spend <span className="font-semibold">$800/month</span> on discretionary items (dining out, entertainment, subscriptions).
              You commit to cutting back to <span className="font-semibold">$500</span> next month.
            </p>
            <p className="text-base text-slate-700 dark:text-slate-300 mt-2">
              <span className="font-semibold">$800 &minus; $500 = $300</span>{" "}you&rsquo;ll free up next month.
              That $300 can be redirected into business activities like personal volume redirection, samples, function tickets, or tools &mdash; turning lifestyle spending into asset-building capital.
            </p>
          </div>
        </div>

        {/* Milestone Tracker */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">Debt &amp; Bill Offset Tracker</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mb-6">
            Track how your business income progressively covers your expenses — from operational overhead to full financial freedom.
          </p>
          <div className="space-y-5">
            <ProgressBar
              value={totals.businessIncome}
              max={totals.totalBusinessExpenses}
              label="1. Business is Self-Sustaining"
              sublabel={`Business income covers operational overhead (${formatCurrency(totals.totalBusinessExpenses)})`}
            />
            <ProgressBar
              value={totals.businessIncome}
              max={totals.totalBusinessExpenses + totals.discretionaryActual}
              label="2. Covers Discretionary Expenses"
              sublabel={`Business income also covers personal discretionary spending (${formatCurrency(totals.totalBusinessExpenses + totals.discretionaryActual)})`}
            />
            <ProgressBar
              value={totals.businessIncome}
              max={totals.totalBusinessExpenses + totals.discretionaryActual + totals.fixedExpenses}
              label="3. Covers All Liabilities"
              sublabel={`Business income covers all fixed debts and bills (${formatCurrency(totals.totalBusinessExpenses + totals.discretionaryActual + totals.fixedExpenses)})`}
            />
            <ProgressBar
              value={totals.businessIncome}
              max={totals.totalBusinessExpenses + totals.discretionaryActual + totals.fixedExpenses + totals.personalIncome}
              label="4. Net-Positive / Full Replacement"
              sublabel={`Business income replaces personal income entirely (${formatCurrency(totals.totalBusinessExpenses + totals.discretionaryActual + totals.fixedExpenses + totals.personalIncome)})`}
            />
          </div>
        </div>

        {/* Business Self-Sufficiency Detail */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">Business Self-Sufficiency</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mb-4">
            At 100%, your business pays for its own tools, travel, and samples. Above 100% is net profit flowing back into your household.
          </p>
          <div className="flex items-center gap-6">
            <div className={`text-5xl font-black ${totals.selfSufficiency >= 100 ? "text-emerald-600" : "text-amber-600"}`}>
              {totals.selfSufficiency.toFixed(0)}%
            </div>
            <div className="text-base text-slate-700 dark:text-slate-300 space-y-1">
              <p>Business Income: <span className="font-bold">{formatCurrency(totals.businessIncome)}</span></p>
              <p>Total Business Expenses: <span className="font-bold">{formatCurrency(totals.totalBusinessExpenses)}</span></p>
              {totals.selfSufficiency >= 100 && (
                <p className="text-emerald-600 font-bold">
                  Net profit: {formatCurrency(totals.businessIncome - totals.totalBusinessExpenses)}/mo
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-4">Monthly Cash Flow Summary</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-base">
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">Personal Income</span>
                <span className="font-bold text-emerald-600">{formatCurrency(totals.personalIncome)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">Business Income</span>
                <span className="font-bold text-indigo-600">{formatCurrency(totals.businessIncome)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-600">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Total Income</span>
                <span className="font-black text-emerald-600">{formatCurrency(totals.totalIncome)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">Fixed Expenses</span>
                <span className="font-bold text-red-600">{formatCurrency(totals.fixedExpenses)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">Discretionary</span>
                <span className="font-bold text-amber-600">{formatCurrency(totals.discretionaryActual)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">Business Investment</span>
                <span className="font-bold text-violet-600">{formatCurrency(totals.totalBusinessExpenses)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-600">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Total Expenses</span>
                <span className="font-black text-red-600">{formatCurrency(totals.totalExpenses)}</span>
              </div>
            </div>
          </div>
          <div className={`mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between items-center`}>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">Net Monthly Cash Flow</span>
            <span className={`text-2xl font-black ${totals.netCashFlow >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {formatCurrency(totals.netCashFlow)}
            </span>
          </div>
        </div>

        {/* Mindset Note */}
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5">
          <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-200 mb-2">The Reinvestment Mindset</h3>
          <p className="text-base text-indigo-800 dark:text-indigo-300">
            Business expenses and sample purchasing are not losses &mdash; they are <span className="font-bold">Investments in PV / Asset Building</span>.
            Every dollar invested in volume generation today accelerates your path to the business fully covering all personal expenses.
          </p>
        </div>
      </div>
    </div>
  );
}
