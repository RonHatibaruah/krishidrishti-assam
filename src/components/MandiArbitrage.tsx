import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Truck, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  Printer, 
  Share2,
  Sparkles
} from 'lucide-react';
import { ASSAM_COMMODITIES, ASSAM_MANDIS } from '../data/agri_price_data';
import { ArbitrageOption } from '../types/agri';

export const MandiArbitrage: React.FC = () => {
  const [originMandiId, setOriginMandiId] = useState<string>('kharupetia');
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [quantityQ, setQuantityQ] = useState<number>(100);
  const [vehicleType, setVehicleType] = useState<'MINI_TRUCK' | 'MEDIUM_TRUCK' | 'HEAVY_CARRIER'>('MEDIUM_TRUCK');
  const [isDispatched, setIsDispatched] = useState<boolean>(false);

  const originMandi = ASSAM_MANDIS.find(m => m.id === originMandiId) || ASSAM_MANDIS[0];
  const crop = ASSAM_COMMODITIES.find(c => c.id === selectedCropId) || ASSAM_COMMODITIES[0];

  // Base freight cost per km based on vehicle capacity
  const vehicleCostPerKm = vehicleType === 'MINI_TRUCK' ? 22 : vehicleType === 'MEDIUM_TRUCK' ? 32 : 48;
  const vehicleCapacityQ = vehicleType === 'MINI_TRUCK' ? 25 : vehicleType === 'MEDIUM_TRUCK' ? 60 : 120;

  // Transit shrinkage rate per transit hour (% loss)
  const shrinkagePerHour = 
    crop.perishability === 'HIGHLY_PERISHABLE' ? 0.0015 :
    crop.perishability === 'SEMI_PERISHABLE' ? 0.0005 : 0.0;

  // Destination candidates
  const destinationDistances: Record<string, { km: number; hours: number; priceMultiplier: number }> = {
    pamohi: { km: 85, hours: 2.5, priceMultiplier: 2.34 }, // Guwahati terminal demand
    silchar: { km: 340, hours: 10.5, priceMultiplier: 2.98 }, // Barak valley premium
    howly: { km: 120, hours: 3.5, priceMultiplier: 1.45 },
    nagaon: { km: 95, hours: 2.8, priceMultiplier: 1.35 },
    jorhat: { km: 280, hours: 7.5, priceMultiplier: 1.85 },
    dhubri: { km: 240, hours: 6.8, priceMultiplier: 1.25 }
  };

  const originPrice = crop.currentModalPrice;

  // Calculate options
  const arbitrageOptions: ArbitrageOption[] = ASSAM_MANDIS
    .filter(m => m.id !== originMandiId)
    .map(dest => {
      const distInfo = destinationDistances[dest.id] || { km: 150, hours: 4.5, priceMultiplier: 1.3 };
      
      // Destination wholesale price
      const destPrice = Math.round(originPrice * distInfo.priceMultiplier);

      // Freight cost per quintal
      const totalTruckCost = distInfo.km * vehicleCostPerKm;
      const freightPerQ = Math.round(totalTruckCost / Math.min(quantityQ, vehicleCapacityQ));

      // Shrinkage loss in rupees per quintal
      const shrinkageLossPerQ = Math.round(destPrice * (shrinkagePerHour * distInfo.hours));

      // Mandi cess (1.0% in Assam)
      const mandiCessPerQ = Math.round(destPrice * 0.01);

      // Handling / Hamali charge
      const handlingCostPerQ = 25;

      // Net Realizable Value per quintal
      const nrv = destPrice - freightPerQ - shrinkageLossPerQ - mandiCessPerQ - handlingCostPerQ;
      const netProfitOverOrigin = nrv - originPrice;
      const roiPct = Math.round((netProfitOverOrigin / originPrice) * 100);

      return {
        destinationMandiId: dest.id,
        destinationName: dest.name,
        district: dest.district,
        distanceKm: distInfo.km,
        transitHours: distInfo.hours,
        destinationPrice: destPrice,
        freightCostPerQ: freightPerQ,
        shrinkageLossPerQ: shrinkageLossPerQ,
        mandiCessPerQ: mandiCessPerQ,
        handlingCostPerQ: handlingCostPerQ,
        netRealizableValue: nrv,
        netProfitOverOriginPerQ: netProfitOverOrigin,
        roiPct: roiPct,
        recommended: netProfitOverOrigin > 150, // Recommend if net gain exceeds ₹150/q
        transitRiskNote: distInfo.hours > 8 ? 'High transit exposure; refrigerated reefer advised' : 'Normal road transit'
      };
    })
    .sort((a, b) => b.netProfitOverOriginPerQ - a.netProfitOverOriginPerQ);

  const bestOption = arbitrageOptions[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spatial Arbitrage & Logistics Net Realizable Value (NRV) Engine</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              "Hold vs. Sell vs. Route" Inter-Mandi Arbitrage Sandbox
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Calculate exact net profits of routing produce to alternative regional mandis versus local selling, factoring truck freight, highway tolls, APMC cess, and perishability transit shrinkage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              NRV Formula = P_dest - Freight - Shrinkage - Cess - Handling
            </span>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              1. Origin Assembly Mandi:
            </label>
            <select
              value={originMandiId}
              onChange={(e) => setOriginMandiId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ASSAM_MANDIS.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.district})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 mt-1">Local Price: ₹{originPrice}/q</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              2. Commodity Variety:
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ASSAM_COMMODITIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.assameseName})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 mt-1">Tier: {crop.perishability}</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              3. Lot Consignment Quantity:
            </label>
            <input
              type="number"
              min="10"
              max="1000"
              step="10"
              value={quantityQ}
              onChange={(e) => setQuantityQ(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
            />
            <div className="text-[11px] text-slate-400 mt-1">Total Weight: {quantityQ} Quintals ({(quantityQ * 0.1).toFixed(1)} MT)</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              4. Logistics Truck Type:
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="MINI_TRUCK">Tata Ace Mini (Up to 25 Quintals)</option>
              <option value="MEDIUM_TRUCK">Eicher 407 (Up to 60 Quintals)</option>
              <option value="HEAVY_CARRIER">10-Tonne Multi-Axle (120+ Quintals)</option>
            </select>
            <div className="text-[11px] text-slate-400 mt-1">Rate: ₹{vehicleCostPerKm}/km</div>
          </div>
        </div>
      </div>

      {/* Best Recommendation Callout */}
      {bestOption && bestOption.recommended && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-600 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Optimal Arbitrage Route Identified
                </span>
                <span className="text-xs bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  +{bestOption.roiPct}% Net Margin
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Route {quantityQ}q {crop.name} to {bestOption.destinationName} ({bestOption.distanceKm} km, {bestOption.transitHours}h)
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Selling locally yields <span className="font-semibold text-rose-300">₹{(originPrice * quantityQ).toLocaleString()}</span>. Routing to {bestOption.destinationName} yields Net Realizable Value of <span className="font-semibold text-emerald-300">₹{(bestOption.netRealizableValue * quantityQ).toLocaleString()}</span>. Total Extra FPO Profit: <span className="font-extrabold text-emerald-400 text-sm">₹{(bestOption.netProfitOverOriginPerQ * quantityQ).toLocaleString()}</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsDispatched(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Truck className="w-4 h-4" />
              <span>Authorize FPO Dispatch</span>
            </button>
          </div>
        </div>
      )}

      {/* Dispatched Notification Modal / Alert */}
      {isDispatched && (
        <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">
              Consignment Authorization #ASAMB-2026-FPO-991 generated! WhatsApp dispatch route sent to FPO transport driver.
            </span>
          </div>
          <button 
            onClick={() => setIsDispatched(false)}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Comparative Mandi Arbitrage Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span>Mandi Arbitrage Matrix — Net Realizable Value (NRV) Analysis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked by net economic gain per quintal over selling at {originMandi.name} (Base: ₹{originPrice}/q)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3 px-3">Destination Mandi</th>
                <th className="py-3 px-3">Distance & Time</th>
                <th className="py-3 px-3">Terminal Price</th>
                <th className="py-3 px-3">Freight / q</th>
                <th className="py-3 px-3">Transit Shrinkage</th>
                <th className="py-3 px-3">Net NRV / q</th>
                <th className="py-3 px-3">Net Gain / q</th>
                <th className="py-3 px-3">FPO Consignment Profit</th>
                <th className="py-3 px-3 text-right">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {/* Origin Row */}
              <tr className="bg-slate-950/40 font-medium">
                <td className="py-3 px-3 text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>{originMandi.name} (Origin)</span>
                </td>
                <td className="py-3 px-3 text-slate-400">0 km (Local)</td>
                <td className="py-3 px-3 text-slate-200">₹{originPrice}</td>
                <td className="py-3 px-3 text-slate-400">₹0</td>
                <td className="py-3 px-3 text-slate-400">₹0 (0.0%)</td>
                <td className="py-3 px-3 font-mono font-bold text-slate-200">₹{originPrice}</td>
                <td className="py-3 px-3 text-slate-400">Baseline</td>
                <td className="py-3 px-3 text-slate-300 font-mono">₹{(originPrice * quantityQ).toLocaleString()}</td>
                <td className="py-3 px-3 text-right">
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">LOCAL SALE</span>
                </td>
              </tr>

              {/* Destination Rows */}
              {arbitrageOptions.map((opt) => (
                <tr 
                  key={opt.destinationMandiId}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    opt.recommended ? 'bg-emerald-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-white">
                    {opt.destinationName}
                    <div className="text-[10px] text-slate-400">{opt.district}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    <div>{opt.distanceKm} km</div>
                    <div className="text-[10px] text-slate-400">{opt.transitHours} hrs transit</div>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    ₹{opt.destinationPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono">
                    -₹{opt.freightCostPerQ}
                  </td>
                  <td className="py-3 px-3 text-rose-300 font-mono">
                    -₹{opt.shrinkageLossPerQ}
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-emerald-300">
                    ₹{opt.netRealizableValue.toLocaleString()}
                  </td>
                  <td className={`py-3 px-3 font-bold ${opt.netProfitOverOriginPerQ >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {opt.netProfitOverOriginPerQ >= 0 ? `+₹${opt.netProfitOverOriginPerQ}` : `-₹${Math.abs(opt.netProfitOverOriginPerQ)}`}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-white">
                    ₹{(opt.netRealizableValue * quantityQ).toLocaleString()}
                    <div className="text-[10px] text-emerald-400 font-semibold">
                      (+₹{(opt.netProfitOverOriginPerQ * quantityQ).toLocaleString()})
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      opt.recommended
                        ? 'bg-emerald-900 text-emerald-200 border border-emerald-600'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {opt.recommended ? 'ROUTE DISPATCH' : 'UNVIABLE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
