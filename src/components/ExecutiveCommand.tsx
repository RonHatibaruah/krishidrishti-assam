import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Wheat, 
  Warehouse, 
  MessageSquare, 
  Zap, 
  Sparkles,
  DollarSign,
  Activity
} from 'lucide-react';
import { ASSAM_COMMODITIES, MOCK_ALERTS, ASSAM_MANDIS } from '../data/agri_price_data';
import { Commodity } from '../types/agri';

interface ExecutiveCommandProps {
  onSelectCommodity: (commodityId: string) => void;
  onNavigateTab: (tabName: string) => void;
}

export const ExecutiveCommand: React.FC<ExecutiveCommandProps> = ({
  onSelectCommodity,
  onNavigateTab
}) => {
  const mspDeficitCrops = ASSAM_COMMODITIES.filter(
    c => c.mspPerQuintal && c.currentModalPrice < c.mspPerQuintal
  );

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Live Telemetry Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assam State Agri-Market Intelligence Live Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Statewide Commodity Price Intelligence & Decision Cockpit
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Fusing Agmarknet & e-NAM mandis, AAU Jorhat AMIU field surveys, IMD weather patterns, and Copernicus Sentinel-2 satellite phenology to eliminate distress sales across Assam’s 35 districts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('arbitrage')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Run Hold vs. Sell Sandbox</span>
            </button>
            <button
              onClick={() => onNavigateTab('advisory')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Dispatch Farmer Alerts</span>
            </button>
          </div>
        </div>

        {/* 4 Core Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Statewide Coverage</div>
            <div className="text-xl font-bold text-white mt-1">35 Districts</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">65+ Regulated Mandis & Hats</div>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Farmgate Price Uplift</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">+18% to +26%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Target Net Realization</div>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Distress Sale Reduction</div>
            <div className="text-xl font-bold text-cyan-400 mt-1">35% Reduction</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Peak Harvest Windows</div>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">AI Model Accuracy</div>
            <div className="text-xl font-bold text-purple-400 mt-1">5.75% MAPE</div>
            <div className="text-[11px] text-slate-400 mt-0.5">7-Day Quantile TFT Engine</div>
          </div>
        </div>
      </div>

      {/* Critical Distress Alerts Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Live Market Alerts & Early Warning Signals</h2>
          </div>
          <span className="text-xs text-slate-400">Updated Real-Time via ASDC Ingestion Stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {MOCK_ALERTS.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                alert.severity === 'CRITICAL'
                  ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                  : alert.severity === 'WARNING'
                  ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                  : alert.severity === 'OPPORTUNITY'
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                  : 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      alert.severity === 'CRITICAL' ? 'bg-rose-900 text-rose-300' :
                      alert.severity === 'WARNING' ? 'bg-amber-900 text-amber-300' :
                      alert.severity === 'OPPORTUNITY' ? 'bg-emerald-900 text-emerald-300' : 'bg-cyan-900 text-cyan-300'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-semibold text-white">{alert.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {alert.message}
                  </p>
                  <p className="text-xs text-emerald-400/90 mt-1.5 font-medium italic">
                    {alert.titleAssamese} — {alert.messageAssamese}
                  </p>
                </div>
                <button
                  onClick={() => alert.actionableTarget && onNavigateTab(alert.actionableTarget)}
                  className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Inspect Advisory"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Commodities Live Ticker & Quick Forecast Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Wheat className="w-5 h-5 text-emerald-400" />
              <span>Assam Key Commodities — Daily Clearing Rates & Trends</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Wholesale modal transaction prices across primary assembly mandis (Kharupetia, Pamohi, Howly, Silchar, Nagaon)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Total Monitored Commodities:</span>
            <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
              {ASSAM_COMMODITIES.length} Varieties
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ASSAM_COMMODITIES.map((crop) => {
            const isMspDeficit = crop.mspPerQuintal && crop.currentModalPrice < crop.mspPerQuintal;
            return (
              <div
                key={crop.id}
                onClick={() => {
                  onSelectCommodity(crop.id);
                  onNavigateTab('forecast');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-lg ${
                  isMspDeficit
                    ? 'bg-rose-950/20 border-rose-800/50 hover:border-rose-600'
                    : 'bg-slate-950/60 border-slate-800 hover:border-emerald-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                      {crop.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{crop.assameseName}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    crop.perishability === 'HIGHLY_PERISHABLE'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : crop.perishability === 'SEMI_PERISHABLE'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {crop.perishability.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-white">
                      ₹{crop.currentModalPrice.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400">{crop.unit}</div>
                  </div>

                  <div className={`flex items-center gap-1 text-xs font-bold ${
                    crop.priceChange24hPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {crop.priceChange24hPct >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span>{crop.priceChange24hPct >= 0 ? `+${crop.priceChange24hPct}%` : `${crop.priceChange24hPct}%`}</span>
                  </div>
                </div>

                {crop.mspPerQuintal && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Statutory MSP:</span>
                    <span className={`font-mono font-semibold ${isMspDeficit ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                      ₹{crop.mspPerQuintal.toLocaleString()}
                      {isMspDeficit && ' (DEFICIT)'}
                    </span>
                  </div>
                )}

                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Daily Arrival:</span>
                  <span className="text-slate-300 font-medium">{crop.dailyArrivalTonnes} MT</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span className="font-medium text-[11px]">View AI Forecast</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Mandi Overview Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-emerald-400" />
              <span>Assam Primary Market Committees & Assembly Mandis</span>
            </h2>
            <p className="text-xs text-slate-400">
              Arrival volumes and physical market capacity across key regional distribution nodes
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('map')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Geospatial Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ASSAM_MANDIS.slice(0, 4).map((mandi) => (
            <div key={mandi.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{mandi.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  mandi.status === 'PEAK_GLUT' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  mandi.status === 'PRICE_CRASH_ALERT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {mandi.status.replace('_', ' ')}
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium mt-0.5">{mandi.assameseName}</div>
              <div className="text-xs text-slate-400 mt-2">District: {mandi.district}</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Arrival: {mandi.dailyArrivalTonnes} MT / day</div>
              <div className="text-[11px] text-slate-400 mt-1">Highway: {mandi.connectedHighway}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
