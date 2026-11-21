import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Database, 
  Server, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  HardDrive,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { MOCK_ADMIN_LOGS, ASSAM_COMMODITIES } from '../data/agri_price_data';
import { AdminUser } from '../types/agri';

interface AdminConsoleProps {
  adminUser: AdminUser | null;
  onLogout: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  adminUser,
  onLogout
}) => {
  const [procurementTriggered, setProcurementTriggered] = useState<boolean>(false);

  const mspDeficits = ASSAM_COMMODITIES.filter(
    c => c.mspPerQuintal && c.currentModalPrice < c.mspPerQuintal
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Assam State Data Centre (ASDC) • Sovereign Governance Enclave</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Directorate of Agriculture & ASAMB State Command Console
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Real-time surveillance of statewide market price compliance against statutory MSP, automated distress liquidation triggers, and immutable SHA-256 audit trails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">
                {adminUser ? adminUser.name : 'Directorate Administrator'}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">
                {adminUser ? adminUser.role : 'STATE_COMMAND'}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* 4 ASDC Enclave Health Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>ASDC Cluster Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-1">Operational (99.98%)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Kubernetes K8s Enclave</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Kafka Ingestion Bus</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-300 mt-1">42,850 msgs / min</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Agmarknet, e-NAM, AWS</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>TFT Inference Latency</span>
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-300 mt-1">142 ms / query</div>
            <div className="text-[11px] text-slate-400 mt-0.5">NVIDIA L4 GPU Worker</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>DPDP Compliance</span>
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">100% Zero-PII</div>
            <div className="text-[11px] text-slate-400 mt-0.5">SHA-256 Pseudonymized</div>
          </div>
        </div>
      </div>

      {/* Distress Sale Surveillance & MSP Violation Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-bold text-white">Statewide Distress Sale & MSP Deficit Radar</h2>
          </div>
          <span className="text-xs text-slate-400">Trigger Threshold: Modal Rate &lt; Statutory MSP</span>
        </div>

        {mspDeficits.length > 0 ? (
          <div className="space-y-3">
            {mspDeficits.map(crop => (
              <div 
                key={crop.id}
                className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-300 uppercase px-2 py-0.5 rounded bg-rose-900/60">
                      MSP DEFICIT DETECTED
                    </span>
                    <h3 className="font-bold text-white text-sm">{crop.name} ({crop.assameseName})</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5">
                    Prevailing modal wholesale price is <strong className="text-rose-400 font-bold">₹{crop.currentModalPrice}/q</strong>, which is <strong>₹{(crop.mspPerQuintal! - crop.currentModalPrice)}/quintal below</strong> statutory Government of India MSP of <strong>₹{crop.mspPerQuintal}/q</strong>.
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Impacted Districts: {crop.majorDistricts.join(', ')} • Daily Volume at Risk: {crop.dailyArrivalTonnes} MT
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => setProcurementTriggered(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Issue ASAMB Procurement Directive</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs">
            All monitored commodities are currently clearing at or above statutory MSP benchmarks across Assam.
          </div>
        )}

        {procurementTriggered && (
          <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                Executive Directive #GOA-AGRI-2026-MSP-102 dispatched to ASAMB, FCI Regional Office Guwahati, and District Agricultural Officers!
              </span>
            </div>
            <button onClick={() => setProcurementTriggered(false)} className="underline cursor-pointer">Dismiss</button>
          </div>
        )}
      </div>

      {/* Immutable SHA-256 Audit Trail */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Immutable SHA-256 Administrative Audit Trail</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Blockchain Cryptographic Chaining</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Timestamp (IST)</th>
                <th className="py-3 px-3">Officer / Authority</th>
                <th className="py-3 px-3">Administrative Action</th>
                <th className="py-3 px-3 text-right">Cryptographic Verification Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {MOCK_ADMIN_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-mono font-bold text-cyan-300">{log.id}</td>
                  <td className="py-3 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-white">{log.admin}</td>
                  <td className="py-3 px-3 text-slate-200">{log.action}</td>
                  <td className="py-3 px-3 text-right font-mono text-[11px] text-emerald-400">
                    SHA256:{log.hash}
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
