import React from 'react';
import { 
  TrendingUp, 
  MapPin, 
  HelpCircle, 
  Lock, 
  UserCheck, 
  ShieldCheck,
  Wheat,
  Warehouse,
  MessageSquare,
  ArrowLeftRight,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { AdminUser } from '../types/agri';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  onOpenTutorial: () => void;
  adminUser: AdminUser | null;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedRole,
  setSelectedRole,
  onOpenTutorial,
  adminUser,
  onOpenAdminLogin
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Government Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-400 border-b border-slate-800/80 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            GOVERNMENT OF ASSAM
          </span>
          <span className="text-slate-600">|</span>
          <span>Department of Agriculture ● ASAMB ● AAU Jorhat AMIU</span>
          <span className="text-slate-600">|</span>
          <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono text-[10px] border border-emerald-800/60">
            NESFIC-D-35 Stream 1
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400">Assam State Data Centre (ASDC) • Agri-Intelligence Enclave</span>
          <button 
            onClick={onOpenTutorial}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold cursor-pointer underline decoration-dotted"
            title="Learn what the application is and how to use it"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tutorial: What It Is & How To Use</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('executive')}>
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl shadow-lg shadow-emerald-500/20 text-white flex items-center justify-center">
            <Wheat className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                KrishiDrishti <span className="text-emerald-400 font-normal text-sm">● কৃষি-দৃষ্টি</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/70 px-1.5 py-0.5 rounded">
                v2.6 AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Assam Agricultural Commodity Price Intelligence & Forecasting Sentinel
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('executive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'executive'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'forecast'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Forecaster</span>
          </button>

          <button
            onClick={() => setActiveTab('arbitrage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'arbitrage'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Hold / Sell / Route</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Mandi WebGIS</span>
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'storage'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            <span>Cold Storage / e-NWR</span>
          </button>

          <button
            onClick={() => setActiveTab('advisory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'advisory'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Farmer Advisory</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Directorate Command</span>
          </button>
        </nav>

        {/* User Role Switcher, Tutorial Guide & Auth */}
        <div className="flex items-center gap-2">
          {/* Prominent Header Tutorial Button */}
          <button
            onClick={onOpenTutorial}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            title="Open comprehensive tutorial & evaluator guide"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Tutorial & Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px]">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-transparent text-emerald-300 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="DIRECTORATE" className="bg-slate-900 text-slate-200">
                Directorate of Agriculture (State HQ)
              </option>
              <option value="ASAMB" className="bg-slate-900 text-slate-200">
                ASAMB Mandi Secretary (Market Committee)
              </option>
              <option value="FPO" className="bg-slate-900 text-slate-200">
                Farmer Producer Org (FPO Manager)
              </option>
            </select>
          </div>

          {adminUser ? (
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium cursor-pointer hover:bg-emerald-900/60 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{adminUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium cursor-pointer hover:bg-slate-700 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>State Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
