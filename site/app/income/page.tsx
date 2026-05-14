"use client";

import React, { useMemo, useState } from "react";

type NodeType = {
  id: string;
  name: string;
  pv: number;
  legs: NodeType[];
};

const BV_RATIO = 3.43;

const BONUS_LEVELS = [
  { min: 7500, pct: 25 },
  { min: 6000, pct: 23 },
  { min: 4000, pct: 21 },
  { min: 2500, pct: 18 },
  { min: 1500, pct: 15 },
  { min: 1000, pct: 12 },
  { min: 600, pct: 9 },
  { min: 300, pct: 6 },
  { min: 100, pct: 3 },
  { min: 0, pct: 0 },
];

function getBonusPercent(groupPV: number): number {
  return BONUS_LEVELS.find((b) => groupPV >= b.min)?.pct ?? 0;
}

function uuid(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createNode(name: string): NodeType {
  return { id: uuid(), name, pv: 150, legs: [] };
}

function createInitialTree(): NodeType {
  return {
    id: "root",
    name: "YOU",
    pv: 150,
    legs: [1, 2, 3].map((i) => ({
      id: uuid(),
      name: `Leg ${i}`,
      pv: 150,
      legs: [1, 2].map((j) => ({
        id: uuid(),
        name: `Leg ${i}.${j}`,
        pv: 150,
        legs: [],
      })),
    })),
  };
}

function calculateGroupPV(node: NodeType): number {
  return node.pv + node.legs.reduce((sum, leg) => sum + calculateGroupPV(leg), 0);
}

function calculateIncome(node: NodeType): number {
  const groupPV = calculateGroupPV(node);
  const myPct = getBonusPercent(groupPV);

  const personalBV = node.pv * BV_RATIO;
  const verifiedBV = node.pv * 0.6 * BV_RATIO;
  const retailAndCSI = verifiedBV * 0.21;
  const personalPerformanceBonus = personalBV * (myPct / 100);

  const differential = node.legs.reduce((sum, leg) => {
    const legPV = calculateGroupPV(leg);
    const diffPct = Math.max(myPct - getBonusPercent(legPV), 0);
    return sum + legPV * BV_RATIO * (diffPct / 100);
  }, 0);

  return retailAndCSI + personalPerformanceBonus + differential;
}

function updateNode(
  node: NodeType,
  id: string,
  updater: (n: NodeType) => NodeType
): NodeType {
  if (node.id === id) return updater(node);
  return { ...node, legs: node.legs.map((leg) => updateNode(leg, id, updater)) };
}

function removeNode(
  node: NodeType,
  idToRemove: string
): NodeType {
  return {
    ...node,
    legs: node.legs
      .filter((leg) => leg.id !== idToRemove)
      .map((leg) => removeNode(leg, idToRemove)),
  };
}

function renumberTree(node: NodeType, prefix: string = ""): NodeType {
  return {
    ...node,
    name: node.id === "root" ? "YOU" : prefix,
    legs: node.legs.map((leg, index) => {
      const newPrefix = node.id === "root" ? `Leg ${index + 1}` : `${prefix}.${index + 1}`;
      return renumberTree(leg, newPrefix);
    }),
  };
}

type CardProps = {
  node: NodeType;
  rootPct: number;
  depth: number;
  onPVChange: (id: string, value: number) => void;
  onAddLeg: (id: string) => void;
  onDeleteLeg: (id: string) => void;
};

const DEPTH_COLORS = [
  "border-indigo-200 bg-indigo-50 dark:border-indigo-800/60 dark:bg-indigo-900/20",
  "border-violet-200 bg-violet-50 dark:border-violet-800/60 dark:bg-violet-900/20",
  "border-blue-200 bg-blue-50 dark:border-blue-800/60 dark:bg-blue-900/20",
  "border-cyan-200 bg-cyan-50 dark:border-cyan-800/60 dark:bg-cyan-900/20",
];

function NodeCard({ node, rootPct, depth, onPVChange, onAddLeg, onDeleteLeg }: CardProps) {
  const [inputValue, setInputValue] = React.useState<string>(String(node.pv));

  React.useEffect(() => {
    setInputValue(String(node.pv));
  }, [node.pv]);

  const groupPV = calculateGroupPV(node);
  const bonusPct = getBonusPercent(groupPV);
  const estimatedIncome = calculateIncome(node);
  const colorClass = DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];

  return (
    <div
      className={`border rounded-2xl p-4 shadow-md min-w-[260px] max-w-xs flex flex-col gap-3 ${colorClass} relative`}
    >
      {node.id !== "root" && (
        <button
          onClick={() => onDeleteLeg(node.id)}
          className="absolute -top-2 -right-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border border-red-200 transition-colors z-10"
          title="Remove Leg"
        >
          ✕
        </button>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">{node.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Group PV: <span className="font-semibold">{groupPV.toLocaleString()}</span>
          </p>
        </div>
        <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          {bonusPct}%
        </span>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Personal PV
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^\d+$/.test(val)) {
              setInputValue(val);
              if (val !== '') {
                onPVChange(node.id, Math.max(0, Number(val)));
              }
            }
          }}
          onFocus={(e) => e.target.select()}
          onBlur={() => {
            if (inputValue === '') {
              onPVChange(node.id, 0);
              setInputValue('0');
            }
          }}
          className="w-full mt-1 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-base font-semibold bg-white dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500">Est. Monthly Earnings</p>
        <p className="text-xl font-extrabold text-emerald-600 mt-0.5">
          ${estimatedIncome.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onAddLeg(node.id)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-bold py-2 rounded-xl transition-colors"
      >
        + Add Leg
      </button>

      {node.legs.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-3 pt-2 border-t border-slate-200">
          {node.legs.map((leg) => (
            <NodeCard
              key={leg.id}
              node={leg}
              rootPct={rootPct}
              depth={depth + 1}
              onPVChange={onPVChange}
              onAddLeg={onAddLeg}
              onDeleteLeg={onDeleteLeg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function IncomePage() {
  const [tree, setTree] = useState<NodeType>(createInitialTree);

  const totalPV = useMemo(() => calculateGroupPV(tree), [tree]);
  const totalIncome = useMemo(() => calculateIncome(tree), [tree]);
  const rootPct = getBonusPercent(totalPV);

  function handlePVChange(id: string, value: number) {
    setTree((prev) => updateNode(prev, id, (node) => ({ ...node, pv: value })));
  }

  function handleAddLeg(id: string) {
    setTree((prev) => {
      const newTree = updateNode(prev, id, (node) => ({
        ...node,
        legs: [...node.legs, createNode("")],
      }));
      return renumberTree(newTree);
    });
  }

  function handleDeleteLeg(id: string) {
    if (id === "root") return;
    setTree((prev) => {
      const newTree = removeNode(prev, id);
      return renumberTree(newTree);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50 dark:from-slate-950 dark:via-indigo-950 dark:to-emerald-950 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Income Calculator
          </h1>
          <p className="text-slate-500 text-base mt-2 max-w-2xl">
            Simulate your team structure, adjust PV values, and instantly see estimated
            monthly bonuses at every level.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Group PV", value: totalPV.toLocaleString(), color: "text-slate-900 dark:text-slate-100" },
            { label: "Performance Level", value: `${rootPct}%`, color: "text-indigo-600 dark:text-indigo-400" },
            { label: "Est. Monthly Income", value: `$${totalIncome.toFixed(2)}`, color: "text-emerald-600" },
            { label: "Verified Customer Sales", value: "60%", color: "text-orange-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 sm:p-5 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
              <p className={`text-xl sm:text-2xl md:text-3xl font-black mt-2 break-words ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Team Structure */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Team Structure</h2>
            <p className="text-slate-500 text-sm mt-1">
              Add legs and modify PV values to simulate income scenarios in real time.
            </p>
          </div>
          <div className="overflow-x-auto pb-2">
            <NodeCard
              node={tree}
              rootPct={rootPct}
              depth={0}
              onPVChange={handlePVChange}
              onAddLeg={handleAddLeg}
              onDeleteLeg={handleDeleteLeg}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
          <h3 className="font-bold text-base text-amber-900 mb-2">Compensation Logic Included</h3>
          <ul className="grid sm:grid-cols-2 gap-1 text-sm text-amber-800">
            {[
              "Personal retail + CSI earnings (21%)",
              "Performance bonus schedule up to 25%",
              "Differential bonus on frontline legs",
              "Recursive group PV calculations",
              "Instant live recalculation",
              "60% verified customer sales assumption",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="mt-0.5 text-amber-500">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-amber-600 mt-3 italic">
            Educational estimator only — not official Amway compensation software.
          </p>
        </div>
      </div>
    </div>
  );
}
