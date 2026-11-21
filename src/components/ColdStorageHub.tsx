import React, { useState } from 'react';
import { 
  Warehouse, 
  DollarSign, 
  ShieldCheck, 
  Percent, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { ASSAM_COLD_STORAGES, ASSAM_COMMODITIES } from '../data/agri_price_data';
import { ColdStorageFacility } from '../types/agri';

export const ColdStorageHub: React.FC = () => {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('cs_darrang_01');
  const [selectedCropId, setSelectedCropId] = useState<string>('mustard');
  const [quantityQ, setQuantityQ] = useState<number>(100);
  const [holdingDays, setHoldingDays] = useState<number>(30);
  const [loanPledged, setLoanPledged] = useState<boolean>(false);

  const facility = ASSAM_COLD_STORAGES.find(f => f.id === selectedFacilityId) || ASSAM_COLD_STORAGES[0];
  const crop = ASSAM_COMMODITIES.find(c => c.id === selectedCropId) || ASSAM_COMMODITIES[0];

  // Storage economics
  const currentValuation = crop.currentModalPrice * quantityQ;
  const totalStorageRent = Math.round(facility.dailyRentPerQ * holdingDays * quantityQ);

  // Projected price recovery: 8% on 30 days storable crops
  const projectedPricePerQ = Math.round(crop.currentModalPrice * 1.10);
  const projectedGrossValuation = projectedPricePerQ * quantityQ;

  // Shrinkage loss ~1.0% in cold storage over 30 days
  const shrinkageLossAmt = Math.round(projectedGrossValuation * 0.01);

  // e-NWR subsidized interest: 7% p.a.
  const maxLoanAmt = Math.round(currentValuation * 0.75);
  const loanInterestAmt = Math.round(maxLoanAmt * (0.07 / 365) * holdingDays);

  // Informal moneylender comparison (36% p.a.)
  const informalInterestAmt = Math.round(maxLoanAmt * (0.36 / 365) * holdingDays);
  const interestSaved = informalInterestAmt - loanInterestAmt;

  // Net storage profit
  const netStorageProfit = (projectedGrossValuation - shrinkageLossAmt) - currentValuation - totalStorageRent - loanInterestAmt;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>WDRA-Accredited Warehouse Network & e-NWR Credit Enclave</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Cold Storage Economics & Electronic Negotiable Warehouse Receipts (e-NWR)
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Prevent distress sales during post-harvest harvest gluts. Store produce in certified Assam warehouses and unlock instant institutional pledge loans up to 75% of commodity valuation at 7% subsidized interest.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-emerald-300 font-semibold">
              Assam Gramin Vikash Bank (AGVB) e-NWR Facility Live
            </span>
          </div>
        </div>
      </div>

      {/* 2 Column Interactive Grid: Directory & Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Facilities Directory */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-cyan-400" />
              <span>Certified Storage Units</span>
            </h2>
            <span className="text-xs text-slate-400">Assam Network</span>
          </div>

          <div className="space-y-3">
            {ASSAM_COLD_STORAGES.map((fac) => (
              <div
                key={fac.id}
                onClick={() => setSelectedFacilityId(fac.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  fac.id === selectedFacilityId
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white text-xs leading-snug">{fac.name}</h3>
                  <span className="text-[10px] bg-slate-800 text-cyan-300 font-semibold px-2 py-0.5 rounded">
                    {fac.district}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Occupancy:</span>
                    <span className="font-semibold text-white">{fac.occupancyPct}% Full</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-cyan-400 h-full rounded-full transition-all"
                      style={{ width: `${fac.occupancyPct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Available: <strong className="text-emerald-400">{fac.availableCapacityTonnes} MT</strong></span>
                  <span>Rent: <strong className="text-slate-200">₹{fac.dailyRentPerQ}/q/day</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-Time Storage ROI & e-NWR Loan Calculator */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Storage Holding ROI & e-NWR Pledge Credit Engine</span>
            </h2>
            <span className="text-xs text-slate-400">Selected Facility: {facility.name}</span>
          </div>

          {/* Calculator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Commodity to Store:
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
              >
                {ASSAM_COMMODITIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.assameseName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Quantity (Quintals):
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                step="10"
                value={quantityQ}
                onChange={(e) => setQuantityQ(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Planned Holding (Days):
              </label>
              <input
                type="number"
                min="7"
                max={facility.maxSafeHoldingDays}
                step="7"
                value={holdingDays}
                onChange={(e) => setHoldingDays(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Calculation Economics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Current Harvest Valuation</div>
              <div className="text-lg font-bold text-white mt-1">₹{currentValuation.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Based on ₹{crop.currentModalPrice}/q spot</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Total Storage Rent ({holdingDays}d)</div>
              <div className="text-lg font-bold text-amber-300 mt-1">₹{totalStorageRent.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">₹{facility.dailyRentPerQ}/q per day</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Projected Value After {holdingDays}d</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">₹{projectedGrossValuation.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-400/90 mt-0.5">AI Target: ₹{projectedPricePerQ}/q</div>
            </div>
          </div>

          {/* e-NWR Instant Pledge Loan Banner */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-950 to-teal-950/60 border border-emerald-700/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-sm">
                    Instant e-NWR Collateral Credit Eligibility
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-300 mt-1">
                  ₹{maxLoanAmt.toLocaleString()}{' '}
                  <span className="text-xs text-slate-300 font-normal">(75% of commodity market value)</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Subsidized institutional bank loan at <strong>7% per annum</strong> through Assam Gramin Vikash Bank. Interest for {holdingDays} days: <strong>₹{loanInterestAmt.toLocaleString()}</strong>.
                </p>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  Saved vs. Informal Moneylenders (36% p.a.): ₹{interestSaved.toLocaleString()} in interest payments!
                </div>
              </div>

              <button
                onClick={() => setLoanPledged(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Pledge e-NWR Receipt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loanPledged && (
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>
                  Electronic Negotiable Warehouse Receipt #eNWR-AS-2026-881 generated! Loan application sent to Assam Gramin Vikash Bank.
                </span>
              </div>
              <button onClick={() => setLoanPledged(false)} className="underline cursor-pointer">Close</button>
            </div>
          )}

          {/* Bottom Net ROI Summary */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400">Net Additional Storage Profit (After Rent & Interest):</div>
              <div className="text-xl font-extrabold text-emerald-400">
                +₹{netStorageProfit.toLocaleString()} <span className="text-xs text-slate-300 font-normal">(+₹{(netStorageProfit / quantityQ).toFixed(0)}/quintal)</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-right">
              Recommendation: <strong className="text-emerald-400">HOLD IN COLD STORAGE</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
