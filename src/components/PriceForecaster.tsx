import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Calendar, 
  HelpCircle,
  Zap,
  Warehouse
} from 'lucide-react';
import { ASSAM_COMMODITIES, MOCK_FORECASTS, ASSAM_MANDIS } from '../data/agri_price_data';
import { ForecastTrajectory, PricePoint, MarketAction } from '../types/agri';

interface PriceForecasterProps {
  selectedCommodityId: string;
  onSelectCommodity: (commodityId: string) => void;
  onNavigateTab: (tabName: string) => void;
}

export const PriceForecaster: React.FC<PriceForecasterProps> = ({
  selectedCommodityId,
  onSelectCommodity,
  onNavigateTab
}) => {
  const [horizon, setHorizon] = useState<'7d' | '30d' | '90d'>('7d');
  const [selectedMandi, setSelectedMandi] = useState<string>('kharupetia');

  // Find selected crop or default to mustard
  const crop = ASSAM_COMMODITIES.find(c => c.id === selectedCommodityId) || ASSAM_COMMODITIES[0];
  const forecast: ForecastTrajectory = MOCK_FORECASTS[crop.id] || MOCK_FORECASTS['mustard'];

  const currentPoints: PricePoint[] = 
    horizon === '7d' ? forecast.tactical7d :
    horizon === '30d' ? forecast.storage30d : forecast.preSowing90d;

  // Calculate chart boundaries
  const allPrices = currentPoints.flatMap(p => [p.p10, p.p50, p.p90]);
  const minPrice = Math.floor(Math.min(...allPrices) * 0.95);
  const maxPrice = Math.ceil(Math.max(...allPrices) * 1.05);
  const priceRange = maxPrice - minPrice || 1;

  const rec = forecast.recommendation;

  const getActionBadgeColor = (action: MarketAction) => {
    switch (action) {
      case 'HOLD':
        return 'bg-amber-950 border-amber-800 text-amber-300';
      case 'ROUTE_ARBITRAGE':
        return 'bg-emerald-950 border-emerald-800 text-emerald-300';
      case 'COLD_STORE':
        return 'bg-cyan-950 border-cyan-800 text-cyan-300';
      case 'SELL_IMMEDIATELY':
        return 'bg-rose-950 border-rose-800 text-rose-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deep Learning Quantile Sequence Engine (TFT)</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Multi-Horizon AI Price Forecaster & Decision Advisor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Predicting wholesale mandi prices with explicit P10 (downside floor), P50 (expected), and P90 (upside peak) confidence bounds
            </p>
          </div>

          {/* Commodity & Mandi Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Select Crop:</label>
              <select
                value={crop.id}
                onChange={(e) => onSelectCommodity(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {ASSAM_COMMODITIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.assameseName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Assembly Mandi:</label>
              <select
                value={selectedMandi}
                onChange={(e) => setSelectedMandi(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {ASSAM_MANDIS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.district})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Horizon Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-medium mr-2">Prediction Horizon:</span>
          <button
            onClick={() => setHorizon('7d')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              horizon === '7d'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>7-Day Tactical (Hold vs. Sell)</span>
          </button>

          <button
            onClick={() => setHorizon('30d')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              horizon === '30d'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            <span>30-Day Storage & e-NWR Horizon</span>
          </button>

          <button
            onClick={() => setHorizon('90d')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              horizon === '90d'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>90-Day Pre-Sowing Intelligence</span>
          </button>
        </div>
      </div>

      {/* Main Prediction & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Forecast Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{crop.name} — Quantile Price Trajectory</span>
                <span className="text-xs text-emerald-400 font-normal">({crop.assameseName})</span>
              </h2>
              <p className="text-xs text-slate-400">
                P10 Floor (90% statistical safety) • P50 Median Expected • P90 Upside Peak
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300">P50 Expected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-900 border border-emerald-600"></span>
                <span className="text-slate-400">P10-P90 Band</span>
              </div>
            </div>
          </div>

          {/* SVG / Visual Price Chart */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80">
            <div className="h-64 w-full flex items-end gap-3 sm:gap-6 pt-6 pb-2">
              {currentPoints.map((pt, idx) => {
                const heightPct = Math.round(((pt.p50 - minPrice) / priceRange) * 100);
                const p10Height = Math.round(((pt.p10 - minPrice) / priceRange) * 100);
                const p90Height = Math.round(((pt.p90 - minPrice) / priceRange) * 100);
                const bandHeight = Math.max(8, p90Height - p10Height);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Hover Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap border border-slate-700">
                      <div>P90 (Peak): ₹{pt.p90.toLocaleString()}</div>
                      <div className="font-bold text-emerald-300">P50 (Median): ₹{pt.p50.toLocaleString()}</div>
                      <div>P10 (Floor): ₹{pt.p10.toLocaleString()}</div>
                    </div>

                    {/* Quantile Band Bar */}
                    <div 
                      className="w-full max-w-[48px] rounded-t-lg bg-emerald-950/70 border border-emerald-700/80 relative flex items-center justify-center transition-all group-hover:bg-emerald-900/90"
                      style={{ height: `${bandHeight}%`, bottom: `${p10Height}%` }}
                    >
                      {/* P50 Median Indicator Line */}
                      <div className="w-full h-1 bg-emerald-400 rounded-full shadow-sm"></div>
                    </div>

                    {/* Numeric Value */}
                    <div className="text-[11px] font-bold text-slate-200 mt-2 font-mono">
                      ₹{pt.p50.toLocaleString()}
                    </div>

                    {/* Date Label */}
                    <div className="text-[10px] text-slate-400 mt-0.5 text-center truncate max-w-full">
                      {pt.label}
                    </div>

                    {/* Provenance Badge */}
                    <span className={`text-[8px] font-bold px-1 rounded mt-0.5 ${
                      pt.provenance === 'OBSERVED' ? 'bg-cyan-950 text-cyan-300' :
                      pt.provenance === 'FORECAST' ? 'bg-emerald-950 text-emerald-300' : 'bg-purple-950 text-purple-300'
                    }`}>
                      {pt.provenance}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Features Attribution */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div>
              <span className="font-semibold text-slate-300">Dominant Price Drivers:</span>{' '}
              {crop.keyDrivers.join(' • ')}
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TFT Validation MAPE: 5.75%</span>
            </div>
          </div>
        </div>

        {/* Right Col: AI Actionable Recommendation Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Actionable AI Directive
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getActionBadgeColor(rec.action)}`}>
                {rec.action.replace('_', ' ')}
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Current Mandi Rate</div>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                ₹{crop.currentModalPrice.toLocaleString()} <span className="text-xs text-slate-400 font-normal">{crop.unit}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Projected Delta:</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {rec.expectedPriceDelta > 0 ? `+₹${rec.expectedPriceDelta}/q` : `₹${rec.expectedPriceDelta}/q`}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">Statistical Confidence:</span>
                <span className="font-bold text-cyan-400">{rec.confidencePct}%</span>
              </div>

              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">Optimal Window:</span>
                <span className="font-bold text-amber-300">{rec.optimalDays} Days</span>
              </div>
            </div>

            {/* English Rationale */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Decision Rationale (EN)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                {rec.rationale}
              </p>
            </div>

            {/* Assamese Rationale */}
            <div className="mt-3">
              <div className="text-xs font-semibold text-emerald-400 mb-1">
                কৃষকৰ পৰামৰ্শ (অসমীয়া)
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed bg-emerald-950/30 p-3 rounded-lg border border-emerald-800/40 font-medium">
                {rec.assameseRationale}
              </p>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigateTab('arbitrage')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Calculate Mandi Arbitrage</span>
            </button>
            <button
              onClick={() => onNavigateTab('storage')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Warehouse className="w-4 h-4 text-emerald-400" />
              <span>Locate Cold Storage & e-NWR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
