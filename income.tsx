```tsx
import React, { useMemo, useState } from "react";

/**
 * Amway / Network Marketing Income Simulator
 * -------------------------------------------------
 * Single-file React + TypeScript component
 * TailwindCSS compatible
 *
 * Features:
 * - Recursive editable leg structure
 * - Starts with 3 frontline legs, each with 2 legs
 * - Instant bonus calculation
 * - Performance bonus differential calculation
 * - Assumes Verified Customer Sales = 60% of PV
 * - Includes Customer Sales Incentive + Performance Bonus
 * - Beautiful live UI
 *
 * NOTE:
 * This is an educational estimator and not official compensation software.
 */

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

function getBonusPercent(groupPV: number) {
  return BONUS_LEVELS.find((b) => groupPV >= b.min)?.pct || 0;
}

function uuid() {
  return Math.random().toString(36).substring(2, 9);
}

function createNode(name: string): NodeType {
  return {
    id: uuid(),
    name,
    pv: 150,
    legs: [],
  };
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
  return (
    node.pv +
    node.legs.reduce((sum, leg) => sum + calculateGroupPV(leg), 0)
  );
}

function calculateIncome(node: NodeType): number {
  const groupPV = calculateGroupPV(node);
  const myPct = getBonusPercent(groupPV);

  const personalBV = node.pv * BV_RATIO;

  /**
   * Personal earnings:
   * 11% markup + 10% CSI on 60% verified sales
   * simplified:
   */
  const verifiedPV = node.pv * 0.6;
  const verifiedBV = verifiedPV * BV_RATIO;

  const retailAndCSI = verifiedBV * 0.21;

  const personalPerformanceBonus =
    personalBV * (myPct / 100);

  let differential = 0;

  node.legs.forEach((leg) => {
    const legPV = calculateGroupPV(leg);
    const legPct = getBonusPercent(legPV);

    const diffPct = Math.max(myPct - legPct, 0);

    const legBV = legPV * BV_RATIO;

    differential += legBV * (diffPct / 100);
  });

  return retailAndCSI + personalPerformanceBonus + differential;
}

function updateNode(
  node: NodeType,
  id: string,
  updater: (n: NodeType) => NodeType
): NodeType {
  if (node.id === id) {
    return updater(node);
  }

  return {
    ...node,
    legs: node.legs.map((leg) =>
      updateNode(leg, id, updater)
    ),
  };
}

type CardProps = {
  node: NodeType;
  rootPct: number;
  onPVChange: (id: string, value: number) => void;
  onAddLeg: (id: string) => void;
};

function NodeCard({
  node,
  rootPct,
  onPVChange,
  onAddLeg,
}: CardProps) {
  const groupPV = calculateGroupPV(node);
  const bonusPct = getBonusPercent(groupPV);

  const estimatedIncome = calculateIncome(node);

  return (
    <div className="border border-slate-200 rounded-3xl p-4 bg-white shadow-lg min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">{node.name}</h3>
          <p className="text-sm text-slate-500">
            Group PV: {groupPV.toLocaleString()}
          </p>
        </div>

        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
          {bonusPct}%
        </div>
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium text-slate-600">
          Personal PV
        </label>

        <input
          type="number"
          value={node.pv}
          min={0}
          onChange={(e) =>
            onPVChange(node.id, Number(e.target.value))
          }
          className="w-full mt-1 border border-slate-300 rounded-xl px-3 py-2 text-lg font-semibold"
        />
      </div>

      <div className="mb-4">
        <div className="text-sm text-slate-500">
          Estimated Monthly Earnings
        </div>

        <div className="text-2xl font-extrabold text-emerald-600">
          ${estimatedIncome.toFixed(2)}
        </div>
      </div>

      <button
        onClick={() => onAddLeg(node.id)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-2xl transition"
      >
        + Add Leg
      </button>

      {node.legs.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
          {node.legs.map((leg) => (
            <NodeCard
              key={leg.id}
              node={leg}
              rootPct={rootPct}
              onPVChange={onPVChange}
              onAddLeg={onAddLeg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tree, setTree] = useState<NodeType>(
    createInitialTree()
  );

  const totalPV = useMemo(
    () => calculateGroupPV(tree),
    [tree]
  );

  const totalIncome = useMemo(
    () => calculateIncome(tree),
    [tree]
  );

  const rootPct = getBonusPercent(totalPV);

  function handlePVChange(id: string, value: number) {
    setTree((prev) =>
      updateNode(prev, id, (node) => ({
        ...node,
        pv: value,
      }))
    );
  }

  function handleAddLeg(id: string) {
    setTree((prev) =>
      updateNode(prev, id, (node) => ({
        ...node,
        legs: [
          ...node.legs,
          createNode(
            `${node.name}.${node.legs.length + 1}`
          ),
        ],
      }))
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Network Marketing Income Simulator
          </h1>

          <p className="text-slate-600 text-lg mt-3">
            Simulate legs, PV growth, and estimated
            monthly bonuses instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-slate-500 text-sm">
              Total Group PV
            </div>

            <div className="text-4xl font-black mt-2">
              {totalPV.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-slate-500 text-sm">
              Performance Level
            </div>

            <div className="text-4xl font-black mt-2 text-indigo-600">
              {rootPct}%
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-slate-500 text-sm">
              Estimated Monthly Income
            </div>

            <div className="text-4xl font-black mt-2 text-emerald-600">
              ${totalIncome.toFixed(2)}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-slate-500 text-sm">
              Verified Customer Sales
            </div>

            <div className="text-4xl font-black mt-2 text-orange-500">
              60%
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-[32px] p-6 shadow-2xl border border-white">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-slate-900">
              Team Structure
            </h2>

            <p className="text-slate-600 mt-2">
              Add unlimited legs and modify PV values to
              instantly simulate income scenarios.
            </p>
          </div>

          <NodeCard
            node={tree}
            rootPct={rootPct}
            onPVChange={handlePVChange}
            onAddLeg={handleAddLeg}
          />
        </div>

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-3xl p-6">
          <h3 className="font-black text-xl mb-3">
            Current Compensation Logic Included
          </h3>

          <ul className="space-y-2 text-slate-700">
            <li>
              • Personal retail + CSI earnings (21%)
            </li>
            <li>
              • Performance bonus schedule up to 25%
            </li>
            <li>
              • Differential bonus on frontline legs
            </li>
            <li>
              • Recursive group PV calculations
            </li>
            <li>
              • Instant live recalculation
            </li>
            <li>
              • 60% verified customer sales assumption
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```
