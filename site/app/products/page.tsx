"use client";

import React, { useMemo, useState } from "react";
import { PRODUCTS, type Product } from "./data";
import {
  HOUSEHOLD_OPTIONS,
  PV_TIERS,
  BUNDLES,
  type HouseholdType,
  type PvTier,
} from "./bundles";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

type Step = "household" | "pv" | "results";

export default function ProductsPage() {
  const [household, setHousehold] = useState<HouseholdType | null>(null);
  const [pvTier, setPvTier] = useState<PvTier | null>(null);
  const [step, setStep] = useState<Step>("household");

  const bundleProducts = useMemo<Product[]>(() => {
    if (!household || !pvTier) return [];
    const skus = BUNDLES[household][pvTier];
    const productMap = new Map(PRODUCTS.map((p) => [p.sku, p]));
    return skus.map((sku) => productMap.get(sku)).filter(Boolean) as Product[];
  }, [household, pvTier]);

  const totals = useMemo(() => {
    let totalPv = 0;
    let totalIboCost = 0;
    let totalRetail = 0;
    for (const p of bundleProducts) {
      totalPv += p.pv;
      totalIboCost += p.iboCost;
      totalRetail += p.price;
    }
    return { totalPv, totalIboCost, totalRetail };
  }, [bundleProducts]);

  function selectHousehold(h: HouseholdType) {
    setHousehold(h);
    setStep("pv");
  }

  function selectPvTier(t: PvTier) {
    setPvTier(t);
    setStep("results");
  }

  function reset() {
    setHousehold(null);
    setPvTier(null);
    setStep("household");
  }

  function goBack() {
    if (step === "results") {
      setPvTier(null);
      setStep("pv");
    } else if (step === "pv") {
      setHousehold(null);
      setStep("household");
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Product Bundle Builder
          </h1>
          <p className="text-slate-500 text-base mt-2 max-w-2xl">
            Get a personalized product recommendation in two steps.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 text-sm">
          <StepIndicator
            number={1}
            label="Household"
            active={step === "household"}
            completed={household !== null}
          />
          <div className="h-px w-8 bg-slate-300 dark:bg-slate-600" />
          <StepIndicator
            number={2}
            label="PV Bundle"
            active={step === "pv"}
            completed={pvTier !== null}
          />
          <div className="h-px w-8 bg-slate-300 dark:bg-slate-600" />
          <StepIndicator
            number={3}
            label="Your List"
            active={step === "results"}
            completed={false}
          />
        </div>

        {/* Step 1: Household type */}
        {step === "household" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Who is this for?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {HOUSEHOLD_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectHousehold(opt.id)}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-indigo-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
                >
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: PV Tier */}
        {step === "pv" && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={goBack}
              className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              &larr; Back
            </button>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Choose your monthly PV target
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {PV_TIERS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => selectPvTier(tier)}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-indigo-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
                >
                  <span className="text-3xl font-black text-slate-800 dark:text-slate-200">
                    {tier}
                  </span>
                  <span className="block text-sm font-semibold text-slate-500 mt-1">
                    PV
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === "results" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={reset}
                className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
              >
                Start over
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                Your {pvTier} PV Bundle
              </h2>
              <p className="text-sm text-slate-500">
                {HOUSEHOLD_OPTIONS.find((o) => o.id === household)?.label} &middot;{" "}
                {bundleProducts.length} products
              </p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-4 text-center">
                <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                  {totals.totalPv.toFixed(1)}
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Total PV
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-center">
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(totals.totalIboCost)}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  IBO Cost
                </p>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700 p-4 text-center">
                <p className="text-2xl font-black text-slate-700 dark:text-slate-200">
                  {formatCurrency(totals.totalRetail)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Retail Price
                </p>
              </div>
            </div>

            {/* Product list */}
            <div className="space-y-3">
              {bundleProducts.map((product) => (
                <div
                  key={product.sku}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {product.brand}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight mt-0.5">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {product.details}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-base font-black text-slate-800 dark:text-slate-200">
                        {formatCurrency(product.iboCost)}
                      </p>
                      <p className="text-[10px] text-slate-400">IBO Cost</p>
                      <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {product.pv.toFixed(1)} PV
                      </p>
                    </div>
                  </div>
                  {product.competingBrand && (
                    <div className="mt-2 border-t border-slate-100 dark:border-slate-700 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Replaces: {product.competingBrand}{" "}
                          {product.competingProduct}
                        </span>
                        {product.competingPrice > 0 && (
                          <span className="text-xs font-semibold text-slate-500">
                            {formatCurrency(product.competingPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          active
            ? "bg-indigo-600 text-white"
            : completed
              ? "bg-emerald-500 text-white"
              : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
        }`}
      >
        {completed ? "✓" : number}
      </span>
      <span
        className={`text-sm font-medium ${
          active
            ? "text-slate-800 dark:text-slate-200"
            : "text-slate-400 dark:text-slate-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
