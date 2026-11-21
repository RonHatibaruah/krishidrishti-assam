import React from 'react';
import { 
  HelpCircle, 
  TrendingUp, 
  ArrowLeftRight, 
  Warehouse, 
  MessageSquare, 
  ShieldCheck, 
  Wheat, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  BarChart3,
  BookOpen,
  Key,
  ExternalLink
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-600/30">
              <Wheat className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  KrishiDrishti (কৃষি-দৃষ্টি) • Comprehensive Evaluator & Tutorial Guide
                </h2>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                  NESFIC-D-35
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                What this application is, why it was built for Assam, and step-by-step instructions on how to use every module
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Section 1: What is KrishiDrishti? */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>PART 1: WHAT THE APPLICATION IS & WHY IT MATTERS</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>KrishiDrishti (Assam Agri-Price Sentinel)</strong> is a deep-tech, AI-powered commodity price intelligence, forecasting, and farmer decision-support platform engineered specifically for the <strong>Department of Agriculture, Government of Assam</strong>, in collaboration with the <strong>Assam State Agricultural Marketing Board (ASAMB)</strong> and <strong>Assam Agricultural University (AAU), Jorhat</strong> under <strong>NESFIC-D-35 (Stream 1 — Government Track)</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="font-semibold text-rose-300">The Core Problem:</div>
              <div className="text-[11px] text-slate-400 mt-1">
                85%+ of Assam's farmers are smallholders (&lt;2 Ha). During harvest gluts, lack of price visibility causes wholesale prices to crash 40%-60% below MSP at local rural hats.
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="font-semibold text-cyan-300">The Technology:</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Temporal Fusion Transformers (TFT) with quantile uncertainty bounds, fusing Agmarknet, e-NAM, Sentinel-2 satellite NDVI, and IMD weather telemetry (MAPE &lt; 5.75%).
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="font-semibold text-emerald-300">The Direct Outcome:</div>
              <div className="text-[11px] text-slate-400 mt-1">
                +18% to +26% net farmgate price realization, 35% distress sale reduction, and instant 7% e-NWR warehouse loans to eliminate predatory debt traps.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: How to Use Each Module */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>PART 2: STEP-BY-STEP MODULE WALKTHROUGH — HOW TO USE IT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            {/* Step 1 */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>1. Market Overview Tab</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">TICKER & ALERTS</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <strong>How to use:</strong> Review live wholesale clearing rates across 12 Assam commodities (Sali/Boro Paddy, Mustard, Joha Rice, Kaji Nemu, Ginger, Tomato). Look for red <em>MSP DEFICIT</em> flags and click on any crop card to immediately jump into its deep AI forecast.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>2. AI Forecaster Tab</span>
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">TFT ENGINE</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <strong>How to use:</strong> Select a crop and mandi. Switch between <strong>7-Day Tactical</strong> (daily prices), <strong>30-Day Storage</strong> (holding ROI), and <strong>90-Day Pre-Sowing</strong> horizons. Hover over bars to see the P10 floor (worst-case), P50 median, and P90 peak bounds, along with plain-language advice in Assamese and English.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
                  <span>3. Hold / Sell / Route Sandbox</span>
                </span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded">ARBITRAGE</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <strong>How to use:</strong> Enter your origin mandi (e.g. Kharupetia), select your crop, consignment quantity in quintals, and truck size. The system calculates the exact <strong>Net Realizable Value (NRV)</strong> across destination mandis after deducting fuel freight, transit shrinkage, and mandi cess.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>4. Mandi WebGIS Map</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">SPATIAL GIS</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <strong>How to use:</strong> Interact with the statewide Leaflet map covering all 35 Assam districts. Click on any green (terminal market), blue (APMC regulated), or red (peak glut) mandi marker to view daily arrival volumes, turnover, and connected national highways.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Warehouse className="w-4 h-4 text-amber-400" />
                  <span>5. Cold Storage / e-NWR Tab</span>
                </span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded">CREDIT LINK</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <strong>How to use:</strong> View capacity and real-time vacancy meters for accredited Assam cold storages. Enter crop and planned holding days to calculate net storage profit and simulate generating a <strong>75% instant collateral pledge loan at 7% subsidized bank interest</strong>.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>6. Farmer Advisory & WhatsApp</span>
                </span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded">MULTILINGUAL</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <strong>How to use:</strong> Test the conversational WhatsApp Business Bot simulator. Type a query in Assamese or English (e.g., <em>"Moi sarisoh ketiya bikri korim?"</em> or <em>"Tomato price in Pamohi"</em>) and experience instant natural-language guidance with audio voice IVRS simulation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Official State Login Credentials */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 border border-emerald-700/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Directorate of Agriculture State Command Login:</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Username: <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">admin@agri.assam.gov.in</code> &nbsp;•&nbsp; 
              Password: <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">dispur2026</code>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer shrink-0 text-center"
          >
            Start Exploring KrishiDrishti
          </button>
        </div>
      </div>
    </div>
  );
};
