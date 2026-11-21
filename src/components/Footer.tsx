import React from 'react';
import { Wheat, ShieldCheck, Database, Satellite, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
                <Wheat className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm">KrishiDrishti (কৃষি-দৃষ্টি)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              AI-Powered Agricultural Commodity Price Intelligence, Multi-Horizon Forecasting and Farmer Decision Platform for the Government of Assam.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NESFIC-D-35 Stream 1 • Government Track</span>
            </div>
          </div>

          {/* Sponsoring Bodies */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-2 text-xs uppercase tracking-wider">Challenge Owners</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>Department of Agriculture, Government of Assam</li>
              <li>Assam State Agricultural Marketing Board (ASAMB)</li>
              <li>Agricultural Market Intelligence Unit (AMIU) - AAU Jorhat</li>
              <li>Assam Agribusiness and Rural Transformation Project (APART)</li>
            </ul>
          </div>

          {/* Data Infrastructure */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-2 text-xs uppercase tracking-wider">Data Ingestion Partners</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Agmarknet & e-NAM Mandi Transformed Feeds</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Satellite className="w-3 h-3 text-cyan-400" />
                <span>Copernicus Sentinel-2 Crop NDVI Phenology</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-blue-400" />
                <span>IMD Automatic Weather Station (AWS) Grids</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-purple-400" />
                <span>WDRA Certified Cold Storage & e-NWR Registries</span>
              </li>
            </ul>
          </div>

          {/* Statutory Mandate Notice */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-2 text-xs uppercase tracking-wider">Regulatory Compliance</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Engineered for deployment within the secure Assam State Data Centre (ASDC). Strictly compliant with the Digital Personal Data Protection (DPDP) Act 2023 with SHA-256 pseudonymized farmer telemetry.
            </p>
            <div className="mt-3 text-[11px] text-emerald-400 font-mono">
              Built for North-East Seva First Innovation Challenge (NESFIC 2026)
            </div>
          </div>
        </div>

        {/* Prominent Statutory & Operational Disclaimer Box */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="uppercase tracking-wider text-[10px]">Official Prototype & Technology Demonstration Disclaimer</span>
          </div>
          <p>
            <strong>KrishiDrishti (কৃষি-দৃষ্টি)</strong> is a verified working prototype and technical proposal developed by <strong>Ron Hatibaruah</strong> for the <strong>North-East Seva First Innovation Challenge (NESFIC 2026)</strong> under the Government of Assam, Department of Agriculture (Problem Statement ID: <code>NESFIC-D-35</code>). Price forecasting trajectories, quantile uncertainty bounds ($P_{10}, P_{50}, P_{90}$), and spatial mandi arbitrage calculations are simulated and benchmarked using deep learning sequence neural networks (Temporal Fusion Transformers) trained on historical Agmarknet, e-NAM, and AAU Jorhat AMIU datasets. Commercial procurement directives, statutory MSP enforcement, and e-NWR warehouse pledge loans are subject to administrative ratification by the Assam State Agricultural Marketing Board (ASAMB) and participating financial institutions.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Department of Agriculture, Government of Assam. Developed by <strong>Ron Hatibaruah</strong> (Lead Innovator & AI Systems Architect).
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy Policy (DPDP 2023)</span>
            <span>•</span>
            <span className="hover:text-slate-300">ASAMB Open Data Portal</span>
            <span>•</span>
            <span className="hover:text-slate-300">ASDC Enclave SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
