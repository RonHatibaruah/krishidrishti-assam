import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, X, Key, Wheat } from 'lucide-react';
import { AdminUser } from '../types/agri';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('admin@agri.assam.gov.in');
  const [password, setPassword] = useState<string>('dispur2026');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@agri.assam.gov.in' && password === 'dispur2026') {
      onLoginSuccess({
        name: 'Dr. B. K. Borah',
        email: 'admin@agri.assam.gov.in',
        role: 'DIRECTORATE',
        designation: 'Joint Director of Agriculture (Marketing & IT)',
        department: 'Department of Agriculture, Government of Assam'
      });
      onClose();
    } else {
      setError('Invalid official credentials. Use demo credentials provided below.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-700/50">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Department of Agriculture Authentication</h3>
            <span className="text-[11px] text-slate-400">Assam State Data Centre (ASDC) Secure Enclave</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-950/80 border border-red-800 text-red-300 p-3 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Official Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Command Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5" />
              <span>Demo State Credentials:</span>
            </div>
            <div>Username: <code className="text-slate-200">admin@agri.assam.gov.in</code></div>
            <div>Password: <code className="text-slate-200">dispur2026</code></div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Authenticate Command Access
          </button>
        </form>
      </div>
    </div>
  );
};
