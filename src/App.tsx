import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExecutiveCommand } from './components/ExecutiveCommand';
import { PriceForecaster } from './components/PriceForecaster';
import { MandiArbitrage } from './components/MandiArbitrage';
import { MandiGeospatialMap } from './components/MandiGeospatialMap';
import { ColdStorageHub } from './components/ColdStorageHub';
import { AdvisoryConsole } from './components/AdvisoryConsole';
import { AdminConsole } from './components/AdminConsole';
import { AdminLogin } from './components/AdminLogin';
import { TutorialModal } from './components/TutorialModal';
import { ShieldCheck, Wheat, Sparkles } from 'lucide-react';
import { AdminUser } from './types/agri';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [selectedRole, setSelectedRole] = useState<string>('DIRECTORATE');
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>('mustard');
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Restore previous admin session if exists
  useEffect(() => {
    const saved = localStorage.getItem('krishidrishti_admin_session');
    if (saved) {
      try {
        setAdminUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('krishidrishti_admin_session');
      }
    }
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    localStorage.setItem('krishidrishti_admin_session', JSON.stringify(user));
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('krishidrishti_admin_session');
    setActiveTab('executive');
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    if (role === 'DIRECTORATE') {
      setActiveTab('executive');
    } else if (role === 'ASAMB') {
      setActiveTab('map');
    } else if (role === 'FPO') {
      setActiveTab('arbitrage');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedRole={selectedRole}
        setSelectedRole={handleRoleChange}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        adminUser={adminUser}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Role Indicator & Context Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Active Operations Horizon:</span>
          <span className="font-bold text-slate-200 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 shadow-sm flex items-center gap-1.5">
            {activeTab === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-300">
                  ASDC Directorate Command & Statutory MSP Violation Radar
                </span>
              </>
            ) : selectedRole === 'DIRECTORATE' ? (
              'Directorate of Agriculture, Dispur • Statewide Market Surveillance'
            ) : selectedRole === 'ASAMB' ? (
              'Assam State Agricultural Marketing Board (ASAMB) • Mandi Yard Operations'
            ) : (
              'Farmer Producer Organization (FPO/FPC) • Collective Marketing & Arbitrage'
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Agmarknet / e-NAM Live Ingestion Active
          </span>
        </div>
      </div>

      {/* Main Dynamic View Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex-1">
        {activeTab === 'executive' && (
          <ExecutiveCommand
            onSelectCommodity={(cid) => setSelectedCommodityId(cid)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'forecast' && (
          <PriceForecaster
            selectedCommodityId={selectedCommodityId}
            onSelectCommodity={(cid) => setSelectedCommodityId(cid)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'arbitrage' && (
          <MandiArbitrage />
        )}

        {activeTab === 'map' && (
          <MandiGeospatialMap />
        )}

        {activeTab === 'storage' && (
          <ColdStorageHub />
        )}

        {activeTab === 'advisory' && (
          <AdvisoryConsole />
        )}

        {activeTab === 'admin' && (
          <AdminConsole
            adminUser={adminUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};
