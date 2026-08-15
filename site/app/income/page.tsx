"use client";

import React, { useMemo, useRef, useState } from "react";

type NodeType = {
  id: string;
  name: string;
  pv: number;
  legs: NodeType[];
};

const BV_RATIO = 3.40;

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
  const personalPerformanceBonus = personalBV * (myPct / 100);
  const differential = node.legs.reduce((sum, leg) => {
    const legPV = calculateGroupPV(leg);
    const diffPct = Math.max(myPct - getBonusPercent(legPV), 0);
    return sum + legPV * BV_RATIO * (diffPct / 100);
  }, 0);
  return personalPerformanceBonus + differential;
}

function updateNode(
  node: NodeType,
  id: string,
  updater: (n: NodeType) => NodeType
): NodeType {
  if (node.id === id) return updater(node);
  return { ...node, legs: node.legs.map((leg) => updateNode(leg, id, updater)) };
}

function removeNode(node: NodeType, idToRemove: string): NodeType {
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

// --- CSV parsing ---

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === "," && !inQuotes) {
      fields.push(current); current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function clean(val: string): string {
  return val.replace(/^'/, "").trim();
}

function parsePV(val: string): number {
  return parseFloat(clean(val).replace(/,/g, "")) || 0;
}

type IBORecord = {
  level: number;
  sponsor: string;
  iboNum: string;
  name: string;
  gpv: number;
  ppv: number;
};

function parseAmwayCSV(text: string): { records: IBORecord[]; period: string } {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  let period = "";
  const records: IBORecord[] = [];
  for (const line of lines) {
    const fields = parseCSVLine(line);
    if (fields.length < 2) continue;
    const f0 = clean(fields[0]);
    if (f0 === "Bonus Period") { period = clean(fields[1]); continue; }
    const level = parseInt(f0, 10);
    if (isNaN(level) || fields.length < 12) continue;
    records.push({
      level,
      sponsor: clean(fields[1]),
      iboNum: clean(fields[2]),
      name: clean(fields[4]),
      gpv: parsePV(fields[10]),
      ppv: parsePV(fields[11]),
    });
  }
  return { records, period };
}

function displayName(fullName: string): string {
  const comma = fullName.indexOf(",");
  return comma > 0 ? fullName.substring(0, comma).trim() : fullName.split(" ")[0] || fullName;
}

function formatPeriod(period: string): string {
  if (period.length !== 6) return period;
  const year = period.substring(0, 4);
  const month = parseInt(period.substring(4, 6), 10);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[month - 1] ?? ""} ${year}`;
}

type CSVBuildResult = { tree: NodeType; period: string; rootName: string };

function buildTreeFromCSV(text: string): CSVBuildResult | string {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return "File is empty.";

  const firstFields = parseCSVLine(lines[0]);
  if (clean(firstFields[0]) !== "Amway")
    return "Not an Amway LOS report. Upload the Performance Bonus CSV from your Amway IBO portal.";

  if (!lines.some((l) => clean(parseCSVLine(l)[0]) === "Bonus Period"))
    return "Missing Bonus Period row — this doesn't look like an Amway LOS report.";

  if (!lines.some((l) => clean(parseCSVLine(l)[0]) === "IBO Level"))
    return "Unexpected column format — \"IBO Level\" header not found.";

  const { records, period } = parseAmwayCSV(text);
  if (!records.length) return "No IBO data rows found in this file.";
  const root = records.find((r) => r.level === 1);
  if (!root) return "No Level 1 IBO found — report may be filtered or truncated.";

  const hasActivity = (r: IBORecord) => r.ppv !== 0 || r.gpv !== 0;

  function buildNode(record: IBORecord): NodeType {
    return {
      id: `csv-leg-${record.iboNum}`,
      name: displayName(record.name),
      pv: record.ppv,
      legs: records.filter((r) => r.sponsor === record.iboNum && hasActivity(r)).map(buildNode),
    };
  }

  return {
    tree: {
      id: "csv-root",
      name: "YOU",
      pv: root.ppv,
      legs: records.filter((r) => r.sponsor === root.iboNum && hasActivity(r)).map(buildNode),
    },
    period,
    rootName: displayName(root.name),
  };
}

// --- Shared PV input ---

type PVInputProps = {
  nodeId: string;
  pv: number;
  label: string;
  onPVChange: (id: string, value: number) => void;
  className?: string;
};

function PVInput({ nodeId, pv, label, onPVChange, className = "" }: PVInputProps) {
  const [val, setVal] = React.useState(String(pv));
  const editing = React.useRef(false);

  React.useEffect(() => {
    if (!editing.current) setVal(String(pv));
  }, [pv]);

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={val}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || /^\d*\.?\d*$/.test(v)) {
            setVal(v);
            if (v !== "" && v !== ".") onPVChange(nodeId, Math.max(0, Number(v)));
          }
        }}
        onFocus={(e) => { editing.current = true; e.target.select(); }}
        onBlur={() => {
          editing.current = false;
          if (val === "" || val === ".") { onPVChange(nodeId, 0); setVal("0"); }
          else setVal(String(Number(val)));
        }}
        className={`w-full mt-1 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 text-base font-semibold bg-white dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
      />
    </div>
  );
}

// --- NodeCard ---

type CardProps = {
  node: NodeType;
  rootPct: number;
  depth: number;
  onPVChange: (id: string, value: number) => void;
  onAddLeg: (id: string) => void;
  onDeleteLeg: (id: string) => void;
  isCSVMode?: boolean;
};

const DEPTH_COLORS = [
  "border-indigo-200 bg-indigo-50 dark:border-indigo-800/60 dark:bg-indigo-900/20",
  "border-violet-200 bg-violet-50 dark:border-violet-800/60 dark:bg-violet-900/20",
  "border-blue-200 bg-blue-50 dark:border-blue-800/60 dark:bg-blue-900/20",
  "border-cyan-200 bg-cyan-50 dark:border-cyan-800/60 dark:bg-cyan-900/20",
];

function NodeCard({ node, rootPct, depth, onPVChange, onAddLeg, onDeleteLeg, isCSVMode }: CardProps) {
  const groupPV = calculateGroupPV(node);
  const bonusPct = getBonusPercent(groupPV);
  const estimatedIncome = calculateIncome(node);
  const colorClass = DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];

  return (
    <div className={`border rounded-2xl p-4 shadow-md min-w-[260px] max-w-xs flex flex-col gap-3 ${colorClass} relative`}>
      {node.id !== "root" && !isCSVMode && (
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
            Group PV: <span className="font-semibold">{groupPV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </p>
        </div>
        <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">{bonusPct}%</span>
      </div>

      <PVInput nodeId={node.id} pv={node.pv} label="Personal PV" onPVChange={onPVChange} />

      <div className="bg-white dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500">Est. Performance Bonus</p>
        <p className="text-xl font-extrabold text-emerald-600 mt-0.5">${estimatedIncome.toFixed(2)}</p>
      </div>

      {!isCSVMode && (
        <button
          onClick={() => onAddLeg(node.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-bold py-2 rounded-xl transition-colors"
        >
          + Add Leg
        </button>
      )}

      {node.legs.length > 0 && (
        isCSVMode && depth >= 1 ? (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 space-y-1">
            {node.legs.map((leg) => {
              const legGPV = calculateGroupPV(leg);
              const legPct = getBonusPercent(legGPV);
              return (
                <div key={leg.id} className="flex items-center justify-between text-xs text-slate-500">
                  <span>{leg.name}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {legGPV.toFixed(2)} PV{legPct > 0 ? ` · ${legPct}%` : ""}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
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
                isCSVMode={isCSVMode}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

// --- Page ---

export default function IncomePage() {
  const [tree, setTree] = useState<NodeType>(createInitialTree);
  const totalPV = useMemo(() => calculateGroupPV(tree), [tree]);
  const totalIncome = useMemo(() => calculateIncome(tree), [tree]);
  const rootPct = getBonusPercent(totalPV);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvTree, setCSVTree] = useState<NodeType | null>(null);
  const [csvMeta, setCSVMeta] = useState<{ period: string; rootName: string } | null>(null);
  const [csvFileName, setCSVFileName] = useState("");
  const [csvError, setCsvError] = useState<string | null>(null);

  const csvTotalPV = useMemo(() => (csvTree ? calculateGroupPV(csvTree) : 0), [csvTree]);
  const csvTotalIncome = useMemo(() => (csvTree ? calculateIncome(csvTree) : 0), [csvTree]);
  const csvRootPct = csvTree ? getBonusPercent(csvTotalPV) : 0;

  function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCSVFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = buildTreeFromCSV(ev.target?.result as string);
      if (typeof result === "string") {
        setCsvError(result);
        setCSVTree(null);
        setCSVMeta(null);
      } else {
        setCsvError(null);
        setCSVTree(result.tree);
        setCSVMeta({ period: result.period, rootName: result.rootName });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleClearCSV() {
    setCSVTree(null); setCSVMeta(null); setCSVFileName(""); setCsvError(null);
  }

  function handleCSVPVChange(id: string, value: number) {
    setCSVTree((prev) => prev ? updateNode(prev, id, (n) => ({ ...n, pv: value })) : prev);
  }

  function handlePVChange(id: string, value: number) {
    setTree((prev) => updateNode(prev, id, (n) => ({ ...n, pv: value })));
  }

  function handleAddLeg(id: string) {
    setTree((prev) => renumberTree(updateNode(prev, id, (n) => ({ ...n, legs: [...n.legs, createNode("")] }))));
  }

  function handleDeleteLeg(id: string) {
    if (id === "root") return;
    setTree((prev) => renumberTree(removeNode(prev, id)));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50 dark:from-slate-950 dark:via-indigo-950 dark:to-emerald-950 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">Income Calculator</h1>
          <p className="text-slate-500 text-base mt-2 max-w-2xl">
            Simulate your team structure, adjust PV values, and instantly see estimated monthly bonuses at every level.
          </p>
        </div>

        {/* CSV Import */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Import from LOS Report</h2>
              <p className="text-slate-500 text-sm mt-1">Upload your Amway Performance Bonus CSV to auto-populate your team structure.</p>
            </div>
            {csvTree && (
              <div className="flex gap-2 sm:mt-1 shrink-0">
                <button onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors">Replace</button>
                <button onClick={handleClearCSV} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">Clear</button>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />

          {!csvTree ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-2 transition-colors ${
                csvError
                  ? "border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/30 hover:border-red-400 text-red-600 dark:text-red-400"
                  : "border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-slate-500 hover:text-indigo-600"
              }`}
            >
              {csvError ? (
                <>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-semibold">{csvError}</span>
                  <span className="text-xs opacity-70">Click to try a different file</span>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm font-semibold">Upload Performance Bonus CSV</span>
                  <span className="text-xs">Amway LOS report (.csv)</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg">
                  <span className="text-slate-500">Period:</span>
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">{csvMeta ? formatPeriod(csvMeta.period) : ""}</span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg">
                  <span className="text-slate-500">IBO:</span>
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">{csvMeta?.rootName}</span>
                </div>
                {csvFileName && (
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/30 px-3 py-1.5 rounded-lg">
                    <span className="text-slate-400 text-xs">{csvFileName}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Group PV", value: csvTotalPV.toLocaleString(undefined, { maximumFractionDigits: 2 }), color: "text-slate-900 dark:text-slate-100" },
                  { label: "Performance Level", value: `${csvRootPct}%`, color: "text-indigo-600 dark:text-indigo-400" },
                  { label: "Est. Performance Bonus", value: `$${csvTotalIncome.toFixed(2)}`, color: "text-emerald-600" },
                  { label: "BV/PV Ratio Used", value: `${BV_RATIO}×`, color: "text-orange-500" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 border border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
                    <p className={`text-xl font-black mt-2 break-words ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto pb-2">
                <NodeCard
                  node={csvTree}
                  rootPct={csvRootPct}
                  depth={0}
                  onPVChange={handleCSVPVChange}
                  onAddLeg={() => {}}
                  onDeleteLeg={() => {}}
                  isCSVMode={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* Manual Simulator */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">Manual Simulator</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Group PV", value: totalPV.toLocaleString(), color: "text-slate-900 dark:text-slate-100" },
            { label: "Performance Level", value: `${rootPct}%`, color: "text-indigo-600 dark:text-indigo-400" },
            { label: "Est. Performance Bonus", value: `$${totalIncome.toFixed(2)}`, color: "text-emerald-600" },
            { label: "BV/PV Ratio Used", value: `${BV_RATIO}×`, color: "text-orange-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 sm:p-5 border border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
              <p className={`text-xl sm:text-2xl md:text-3xl font-black mt-2 break-words ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Team Structure</h2>
            <p className="text-slate-500 text-sm mt-1">Add legs and modify PV values to simulate income scenarios in real time.</p>
          </div>
          <div className="overflow-x-auto pb-2">
            <NodeCard node={tree} rootPct={rootPct} depth={0} onPVChange={handlePVChange} onAddLeg={handleAddLeg} onDeleteLeg={handleDeleteLeg} />
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
          <h3 className="font-bold text-base text-amber-900 mb-2">Performance Bonus Logic</h3>
          <ul className="grid sm:grid-cols-2 gap-1 text-sm text-amber-800">
            {[
              "Performance bonus schedule up to 25%",
              "Differential bonus on frontline legs",
              "Recursive group PV calculations",
              "BV estimated at 3.40× PV (actual varies by product mix)",
              "Retail profit is earned separately at point of sale",
              "Legs with non-qualifying products may show lower BV than PV implies",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="mt-0.5 text-amber-500">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-amber-600 mt-3 italic">Educational estimator only — not official Amway compensation software.</p>
        </div>

      </div>
    </div>
  );
}
